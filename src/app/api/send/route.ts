import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { addNotification } from "@/lib/kv-storage";

interface ContactFormData {
  name: string;
  surname: string;
  email: string;
  subject: string;
  body: string;
  category?: string;
  tags?: string[];
}

export async function POST(request: Request) {
  console.log("[API] POST /api/send - Request received");

  try {
    console.log("[API] Getting Cloudflare context");
    const { env } = await getCloudflareContext();
    console.log("[API] Cloudflare context obtained", {
      hasKV: !!env.ADMIN_NOTIFICATIONS,
      hasEmailAdmin: !!env.EMAIL_ADMIN,
    });

    console.log("[API] Parsing request body");
    const formData: ContactFormData = await request.json();
    console.log("[API] Form data parsed:", {
      hasName: !!formData.name,
      hasSurname: !!formData.surname,
      hasEmail: !!formData.email,
      hasSubject: !!formData.subject,
      hasBody: !!formData.body,
    });

    const { name, surname, email, subject, body, category, tags } = formData;

    if (!name || !surname || !email || !subject || !body) {
      console.log("[API] Validation failed - missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("[API] Adding notification to KV storage");
    await addNotification(env.ADMIN_NOTIFICATIONS, {
      name,
      surname,
      email,
      subject,
      body,
      category,
      tags,
      timestamp: Date.now(),
    });
    console.log("[API] Notification stored successfully");

    const categoryInfo = category
      ? `<p><strong>Categoría:</strong> ${category}</p>`
      : "";

    const userConfirmationContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #333; border-bottom: 3px solid #0066cc; padding-bottom: 10px; margin-top: 0;">
            Hemos Recibido Tu Consulta
          </h2>
          
          <p style="color: #333; line-height: 1.6; margin: 20px 0;">
            Hola ${name},
          </p>
          
          <p style="color: #333; line-height: 1.6; margin: 20px 0;">
            Gracias por ponerte en contacto con nosotros. Hemos recibido tu mensaje y te responderemos lo antes posible.
          </p>

          <div style="background-color: #f0f7ff; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #0066cc; margin-top: 0; margin-bottom: 15px;">Resumen de tu consulta:</h3>
            <p style="margin: 8px 0; color: #333;"><strong>Asunto:</strong> ${subject}</p>
            ${categoryInfo}
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #d0e4f7;">
              <p style="margin: 0 0 8px 0; color: #555; font-weight: 600;">Tu mensaje:</p>
              <p style="margin: 0; color: #333; white-space: pre-wrap; line-height: 1.6;">${body}</p>
            </div>
          </div>

          <p style="color: #333; line-height: 1.6; margin: 20px 0;">
            Nuestro equipo revisará tu consulta y te contactaremos pronto. Si tu asunto es urgente, no dudes en llamarnos directamente.
          </p>

          <p style="color: #333; line-height: 1.6; margin: 20px 0;">
            Saludos cordiales,<br>
            <strong>Equipo de Consulta Legal Gratuita</strong>
          </p>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px;">
            <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
            <p>Si necesitas ayuda inmediata, contáctanos a través de nuestro sitio web.</p>
          </div>
        </div>
      </div>
    `;

    console.log("[API] Sending confirmation email to user");
    await sendEmail({
      to: email,
      toName: `${name} ${surname}`,
      subject: `Confirmación: Hemos recibido tu consulta - ${subject}`,
      html: userConfirmationContent,
      azureConfig: {
        tenantId: process.env.AZURE_TENANT_ID!,
        clientId: process.env.AZURE_CLIENT_ID!,
        clientSecret: process.env.AZURE_CLIENT_SECRET!,
        emailSender: process.env.EMAIL_SENDER!,
      },
    });
    console.log("[API] Confirmation email sent successfully");

    console.log("[API] Request completed successfully");
    return NextResponse.json({
      status: "sent",
      message: "Confirmation email sent and notification queued",
    });
  } catch (error) {
    console.error("[API] Error in POST /api/send:", error);
    console.error("[API] Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      type: typeof error,
    });

    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
