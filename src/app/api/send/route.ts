import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { randomInt } from "crypto";
import { getCloudflareContext } from "@opennextjs/cloudflare";

interface ContactFormData {
  name: string;
  surname: string;
  email: string;
  subject: string;
  body: string;
  category?: string;
  tags?: string[];
}

interface NotificationPayload {
  name: string;
  surname: string;
  email: string;
  subject: string;
  body: string;
  category?: string;
  tags?: string[];
  timestamp: number;
}

export async function POST(request: Request) {
  try {
    const { env } = await getCloudflareContext();
    const formData: ContactFormData = await request.json();

    const { name, surname, email, subject, body, category, tags } = formData;

    if (!name || !surname || !email || !subject || !body) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const notificationPayload: NotificationPayload = {
      name,
      surname,
      email,
      subject,
      body,
      category,
      tags,
      timestamp: Date.now(),
    };

    const notificationKey = `notification:${Date.now()}:${randomInt(
      1000,
      9999
    )}`;

    await env.ADMIN_NOTIFICATIONS.put(
      notificationKey,
      JSON.stringify(notificationPayload)
    );

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

    await sendEmail({
      to: email,
      toName: `${name} ${surname}`,
      subject: `Confirmación: Hemos recibido tu consulta - ${subject}`,
      html: userConfirmationContent,
    });

    return NextResponse.json({
      status: "sent",
      message: "Confirmation email sent and notification queued",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
