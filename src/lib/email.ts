import { Client } from "@microsoft/microsoft-graph-client";
import { ClientSecretCredential } from "@azure/identity";

interface SendEmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  toName?: string;
}

/**
 * Sends an email using Microsoft Graph API
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
  toName,
}: SendEmailOptions): Promise<void> {
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

  const emailMessage = {
    message: {
      subject,
      body: {
        contentType: html ? "HTML" : "Text",
        content: html || text || "",
      },
      toRecipients: [
        {
          emailAddress: {
            address: to,
            ...(toName && { name: toName }),
          },
        },
      ],
    },
    saveToSentItems: true,
  };

  await graph
    .api(`/users/${process.env.EMAIL_SENDER}/sendMail`)
    .post(emailMessage);
}
