interface SendEmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  toName?: string;
  azureConfig: {
    tenantId: string;
    clientId: string;
    clientSecret: string;
    emailSender: string;
  };
}

interface GraphTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

/**
 * Gets an access token for Microsoft Graph API using client credentials flow
 * Compatible with Cloudflare Workers runtime
 */
async function getGraphAccessToken(
  tenantId: string,
  clientId: string,
  clientSecret: string
): Promise<string> {
  console.log("[Email] Requesting access token from Microsoft Graph");

  const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });

  try {
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Email] Token request failed:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      throw new Error(
        `Failed to get access token: ${response.status} ${response.statusText}`
      );
    }

    const data: GraphTokenResponse = await response.json();
    console.log("[Email] Access token obtained successfully");
    return data.access_token;
  } catch (error) {
    console.error("[Email] Error getting access token:", error);
    throw error;
  }
}

/**
 * Sends an email using Microsoft Graph API
 * Uses direct fetch API calls compatible with Cloudflare Workers
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
  toName,
  azureConfig,
}: SendEmailOptions): Promise<void> {
  console.log("[Email] Starting email send process", {
    to,
    subject,
    hasHtml: !!html,
    hasText: !!text,
  });

  const { tenantId, clientId, clientSecret, emailSender } = azureConfig;

  if (!tenantId || !clientId || !clientSecret || !emailSender) {
    console.error("[Email] Missing required Azure configuration:", {
      hasTenantId: !!tenantId,
      hasClientId: !!clientId,
      hasClientSecret: !!clientSecret,
      hasEmailSender: !!emailSender,
    });
    throw new Error("Missing required Azure configuration");
  }

  const accessToken = await getGraphAccessToken(
    tenantId,
    clientId,
    clientSecret
  );

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

  console.log("[Email] Sending email via Microsoft Graph API");

  try {
    const response = await fetch(
      `https://graph.microsoft.com/v1.0/users/${emailSender}/sendMail`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailMessage),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Email] Send mail request failed:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      throw new Error(
        `Failed to send email: ${response.status} ${response.statusText}`
      );
    }

    console.log("[Email] Email sent successfully");
  } catch (error) {
    console.error("[Email] Error sending email:", error);
    throw error;
  }
}
