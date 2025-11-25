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

interface GraphUser {
  id: string;
  displayName: string;
  userPrincipalName: string;
  mail: string;
  accountEnabled: boolean;
}

interface TodoList {
  id: string;
  displayName: string;
  isOwner: boolean;
  isShared: boolean;
  wellknownListName: string;
}

interface TodoTask {
  title: string;
  body?: {
    contentType: string;
    content: string;
  };
  dueDateTime?: {
    dateTime: string;
    timeZone: string;
  };
}

interface CalendarEvent {
  subject: string;
  body: {
    contentType: string;
    content: string;
  };
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  isReminderOn?: boolean;
  allowNewTimeProposals?: boolean;
}

interface BatchRequest {
  id: string;
  method: string;
  url: string;
  headers?: Record<string, string>;
  body?: unknown;
}

interface BatchResponse {
  responses: Array<{
    id: string;
    status: number;
    headers?: Record<string, string>;
    body?: unknown;
  }>;
}

interface NotificationData {
  name: string;
  surname: string;
  email: string;
  subject: string;
  body: string;
  category?: string;
  tags?: string[];
  timestamp: number;
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
 * Lists all active users from the organization, excluding noreply accounts
 */
export async function listActiveUsers(
  accessToken: string,
  excludeEmail: string
): Promise<GraphUser[]> {
  console.log("[Graph] Listing active users from organization");

  try {
    const response = await fetch(
      "https://graph.microsoft.com/v1.0/users?$select=id,displayName,userPrincipalName,mail,accountEnabled&$filter=accountEnabled eq true",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Graph] Failed to list users:", {
        status: response.status,
        error: errorText,
      });
      throw new Error(`Failed to list users: ${response.status}`);
    }

    const data = await response.json();
    const users = ((data as { value: GraphUser[] }).value || []).filter(
      (user) => user.accountEnabled // &&
      // user.userPrincipalName.toLowerCase() !== excludeEmail.toLowerCase() &&
      // user.mail?.toLowerCase() !== excludeEmail.toLowerCase()
    );

    console.log(
      `[Graph] Found ${users.length} active users (excluding ${excludeEmail})`
    );
    return users;
  } catch (error) {
    console.error("[Graph] Error listing users:", error);
    throw error;
  }
}

/**
 * Gets or creates a To-Do list for a user
 */
export async function getOrCreateTodoList(
  accessToken: string,
  userId: string,
  listName: string = "Notificaciones Automáticas"
): Promise<string> {
  console.log(
    `[Graph] Getting/creating To-Do list "${listName}" for user ${userId}`
  );

  try {
    const response = await fetch(
      `https://graph.microsoft.com/v1.0/users/${userId}/todo/lists`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Graph] Failed to get To-Do lists:", {
        status: response.status,
        error: errorText,
      });
      throw new Error(`Failed to get To-Do lists: ${response.status}`);
    }

    const data = await response.json();
    const existingList = ((data as { value: TodoList[] }).value || []).find(
      (list) => list.displayName === listName
    );

    if (existingList) {
      console.log(`[Graph] Found existing list: ${existingList.id}`);
      return existingList.id;
    }

    console.log(`[Graph] Creating new To-Do list "${listName}"`);
    const createResponse = await fetch(
      `https://graph.microsoft.com/v1.0/users/${userId}/todo/lists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ displayName: listName }),
      }
    );

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error("[Graph] Failed to create To-Do list:", {
        status: createResponse.status,
        error: errorText,
      });
      throw new Error(`Failed to create To-Do list: ${createResponse.status}`);
    }

    const newList = (await createResponse.json()) as {
      id: string;
      displayName: string;
    };
    console.log(`[Graph] Created new list: ${newList.id}`);
    return newList.id;
  } catch (error) {
    console.error("[Graph] Error getting/creating To-Do list:", error);
    throw error;
  }
}

/**
 * Executes a batch request to Microsoft Graph API
 * Supports up to 20 requests per batch
 */
export async function executeBatch(
  accessToken: string,
  requests: BatchRequest[]
): Promise<BatchResponse> {
  console.log(`[Graph] Executing batch with ${requests.length} requests`);

  if (requests.length > 20) {
    throw new Error("Batch requests cannot exceed 20 items");
  }

  try {
    const response = await fetch("https://graph.microsoft.com/v1.0/$batch", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requests }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Graph] Batch request failed:", {
        status: response.status,
        error: errorText,
      });
      throw new Error(`Batch request failed: ${response.status}`);
    }

    const data: BatchResponse = await response.json();
    console.log(`[Graph] Batch executed successfully`);

    const failedRequests = data.responses.filter((r) => r.status >= 400);
    if (failedRequests.length > 0) {
      console.warn(
        `[Graph] ${failedRequests.length} requests in batch failed:`,
        failedRequests
      );
    }

    return data;
  } catch (error) {
    console.error("[Graph] Error executing batch:", error);
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

/**
 * Processes a notification by:
 * 1. Sending a single email to a notification group
 * 2. Creating To-Do tasks for all active users
 * 3. Creating calendar events for all active users
 */
export async function processNotification(
  notificationData: NotificationData,
  azureConfig: {
    tenantId: string;
    clientId: string;
    clientSecret: string;
    emailSender: string;
    notificationGroup: string;
  }
): Promise<void> {
  console.log("[Notification] Starting notification process");

  const { tenantId, clientId, clientSecret, emailSender, notificationGroup } =
    azureConfig;

  const accessToken = await getGraphAccessToken(
    tenantId,
    clientId,
    clientSecret
  );

  const correlationId = `notification-${notificationData.timestamp}`;
  const eventDateTime = new Date(notificationData.timestamp);
  const eventEndDateTime = new Date(
    notificationData.timestamp + 10 * 60 * 1000
  );

  const formatDateTime = (date: Date) => {
    return date.toISOString().slice(0, 19);
  };

  console.log("[Notification] Step 1: Sending email to notification group");
  const notificationEmailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; border-bottom: 3px solid #0066cc; padding-bottom: 10px;">Nueva Consulta Recibida</h2>
      
      <div style="background-color: #f0f7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 8px 0;"><strong>Nombre:</strong> ${
          notificationData.name
        } ${notificationData.surname}</p>
        <p style="margin: 8px 0;"><strong>Email:</strong> ${
          notificationData.email
        }</p>
        <p style="margin: 8px 0;"><strong>Asunto:</strong> ${
          notificationData.subject
        }</p>
        ${
          notificationData.category
            ? `<p style="margin: 8px 0;"><strong>Categoría:</strong> ${notificationData.category}</p>`
            : ""
        }
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #d0e4f7;">
          <p style="margin: 0 0 8px 0; font-weight: 600;">Mensaje:</p>
          <p style="margin: 0; white-space: pre-wrap;">${
            notificationData.body
          }</p>
        </div>
      </div>
      
      <p style="color: #666; font-size: 12px;">ID de correlación: ${correlationId}</p>
      <p style="color: #666; font-size: 12px;">Fecha: ${eventDateTime.toLocaleString(
        "es-ES",
        { timeZone: "Europe/Madrid" }
      )}</p>
    </div>
  `;

  await sendEmail({
    to: notificationGroup,
    subject: `Nueva consulta: ${notificationData.subject}`,
    html: notificationEmailContent,
    azureConfig: {
      tenantId,
      clientId,
      clientSecret,
      emailSender,
    },
  });

  console.log("[Notification] Step 2: Getting active users");
  const users = await listActiveUsers(accessToken, emailSender);
  console.log(`[Notification] Processing ${users.length} users`);

  console.log(
    "[Notification] Step 3: Creating To-Do tasks and calendar events in batches"
  );

  const BATCH_SIZE = 6;
  const batches: GraphUser[][] = [];
  for (let i = 0; i < users.length; i += BATCH_SIZE) {
    batches.push(users.slice(i, i + BATCH_SIZE));
  }

  console.log(`[Notification] Processing ${batches.length} batches of users`);

  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex];
    console.log(
      `[Notification] Processing batch ${batchIndex + 1}/${batches.length}`
    );

    const batchRequests: BatchRequest[] = [];

    for (const user of batch) {
      try {
        const listId = await getOrCreateTodoList(accessToken, user.id);

        const taskBody: TodoTask = {
          title: `Nueva consulta: ${notificationData.subject}`,
          body: {
            contentType: "text",
            content: `De: ${notificationData.name} ${notificationData.surname} (${notificationData.email})\n\nAsunto: ${notificationData.subject}\n\nMensaje:\n${notificationData.body}\n\nID: ${correlationId}`,
          },
        };

        const eventBody: CalendarEvent = {
          subject: `Consulta recibida: ${notificationData.subject}`,
          body: {
            contentType: "HTML",
            content: `<p><strong>Nueva consulta de:</strong> ${notificationData.name} ${notificationData.surname}</p><p><strong>Email:</strong> ${notificationData.email}</p><p><strong>Asunto:</strong> ${notificationData.subject}</p>`,
          },
          start: {
            dateTime: formatDateTime(eventDateTime),
            timeZone: "Europe/Madrid",
          },
          end: {
            dateTime: formatDateTime(eventEndDateTime),
            timeZone: "Europe/Madrid",
          },
          isReminderOn: true,
          allowNewTimeProposals: false,
        };

        batchRequests.push({
          id: `${user.id}-task`,
          method: "POST",
          url: `/users/${user.id}/todo/lists/${listId}/tasks`,
          headers: { "Content-Type": "application/json" },
          body: taskBody,
        });

        batchRequests.push({
          id: `${user.id}-event`,
          method: "POST",
          url: `/users/${user.id}/events`,
          headers: { "Content-Type": "application/json" },
          body: eventBody,
        });
      } catch (error) {
        console.error(
          `[Notification] Error preparing requests for user ${user.id}:`,
          error
        );
      }
    }

    if (batchRequests.length > 0) {
      try {
        const batchResult = await executeBatch(accessToken, batchRequests);
        const successCount = batchResult.responses.filter(
          (r) => r.status < 400
        ).length;
        console.log(
          `[Notification] Batch ${batchIndex + 1} completed: ${successCount}/${
            batchRequests.length
          } successful`
        );
      } catch (error) {
        console.error(
          `[Notification] Error executing batch ${batchIndex + 1}:`,
          error
        );
      }
    }
  }

  console.log("[Notification] Notification process completed");
}
