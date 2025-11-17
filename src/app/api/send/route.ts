import { NextResponse } from "next/server";
import { Client } from "@microsoft/microsoft-graph-client";
import { ClientSecretCredential } from "@azure/identity";
import { randomInt } from "crypto";

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
  try {
    const formData: ContactFormData = await request.json();

    const { name, surname, email, subject, body, category, tags } = formData;

    if (!name || !surname || !email || !subject || !body) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const credential = new ClientSecretCredential(
      process.env.AZURE_TENANT_ID!,
      process.env.AZURE_CLIENT_ID!,
      process.env.AZURE_CLIENT_SECRET!
    );

    const graph = Client.initWithMiddleware({
      authProvider: {
        getAccessToken: async () =>
          credential
            .getToken("https://graph.microsoft.com/.default")
            .then((t) => t.token),
      },
    });

    const categoryInfo = category
      ? `<p><strong>Categoría:</strong> ${category}</p>`
      : "";
    const tagsInfo =
      tags && tags.length > 0
        ? `<p><strong>Etiquetas:</strong> ${tags.join(", ")}</p>`
        : "";

    const lawyerEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #333; border-bottom: 3px solid #0066cc; padding-bottom: 10px; margin-top: 0;">
            Nueva Consulta desde el Formulario de Contacto
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #0066cc; margin-bottom: 10px;">Información de Contacto</h3>
            <p style="margin: 5px 0;"><strong>Nombre:</strong> ${name} ${surname}</p>
            <p style="margin: 5px 0;"><strong>Correo Electrónico:</strong> <a href="mailto:${email}" style="color: #0066cc;">${email}</a></p>
            ${categoryInfo}
            ${tagsInfo}
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #0066cc; margin-bottom: 10px;">Asunto</h3>
            <p style="margin: 5px 0; color: #333;">${subject}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #0066cc; margin-bottom: 10px;">Mensaje</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #0066cc; border-radius: 4px;">
              <p style="white-space: pre-wrap; color: #333; line-height: 1.6; margin: 0;">${body}</p>
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px;">
            <p>Este correo fue enviado automáticamente desde el formulario de contacto de tu sitio web.</p>
            <p>Recibido el ${new Date().toLocaleString("es-ES", {
              dateStyle: "long",
              timeStyle: "short",
            })}</p>
          </div>
        </div>
      </div>
    `;

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

    const lawyerAddress = process.env.EMAIL_ADMIN;

    const lawyerEmailMessage = {
      message: {
        subject: `Nueva Consulta: ${subject}`,
        body: {
          contentType: "HTML",
          content: lawyerEmailContent,
        },
        toRecipients: [
          {
            emailAddress: {
              address: lawyerAddress,
            },
          },
        ],
      },
      saveToSentItems: true,
    };

    const userEmailMessage = {
      message: {
        subject: `Confirmación: Hemos recibido tu consulta - ${subject}`,
        body: {
          contentType: "HTML",
          content: userConfirmationContent,
        },
        toRecipients: [
          {
            emailAddress: {
              address: email,
              name: `${name} ${surname}`,
            },
          },
        ],
        internetMessageHeaders: [
          { name: "X-Auto-Response-Suppress", value: "All" },
          { name: "X-Precedence", value: "bulk" },
        ],
      },
      saveToSentItems: true,
    };

    await graph
      .api(`/users/${process.env.EMAIL_SENDER}/sendMail`)
      .post(lawyerEmailMessage);

    await new Promise((r) => setTimeout(r, randomInt(500, 700)));

    await graph
      .api(`/users/${process.env.EMAIL_SENDER}/sendMail`)
      .post(userEmailMessage);

    return NextResponse.json({
      status: "sent",
      message: "Email sent successfully",
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
