// @ts-ignore `.open-next/worker.ts` is generated at build time
import { default as handler } from "./.open-next/worker.js";
import { sendEmail } from "./src/lib/email";

export default {
  fetch: handler.fetch,

  /**
   * Scheduled Handler
   *
   * Aggregates and sends pending admin notifications from KV storage.
   * Runs every 15 minutes as configured in wrangler.jsonc.
   *
   * Can be tested with:
   * - `wrangler dev --test-scheduled`
   * - `curl "http://localhost:8787/__scheduled?cron=*+*+*+*+*"`
   */
  async scheduled(
    controller: ScheduledController,
    env: CloudflareEnv,
    ctx: ExecutionContext
  ) {
    console.log("[Scheduled] Event triggered:", controller.cron);

    try {
      console.log("[Scheduled] Listing notifications from KV");
      const listResult = await env.ADMIN_NOTIFICATIONS.list({
        prefix: "notification:",
      });

      if (!listResult.keys || listResult.keys.length === 0) {
        console.log("[Scheduled] No pending notifications to send");
        return;
      }

      console.log(
        `[Scheduled] Processing ${listResult.keys.length} pending notification(s)`
      );

      console.log("[Scheduled] Reading notifications from KV");
      const pending = await Promise.all(
        listResult.keys.map(async (key) => {
          const value = await env.ADMIN_NOTIFICATIONS.get(key.name, "json");
          return value;
        })
      );

      const validNotifications = pending.filter(
        (item): item is any => item !== null
      );

      console.log(
        `[Scheduled] Found ${validNotifications.length} valid notifications`
      );

      if (validNotifications.length === 0) {
        console.log("[Scheduled] No valid notifications to process");
        return;
      }

      console.log("[Scheduled] Building email digest");
      const notificationLines = validNotifications.map((item: any) => {
        const date = new Date(item.timestamp).toLocaleString("es-ES", {
          dateStyle: "long",
          timeStyle: "short",
        });

        const categoryInfo = item.category
          ? `<p style="margin: 5px 0;"><strong>Categoría:</strong> ${item.category}</p>`
          : "";
        const tagsInfo =
          item.tags && item.tags.length > 0
            ? `<p style="margin: 5px 0;"><strong>Etiquetas:</strong> ${item.tags.join(
                ", "
              )}</p>`
            : "";

        return `
          <div style="background-color: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; border-left: 4px solid #0066cc;">
            <div style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #f0f0f0;">
              <p style="margin: 5px 0; color: #666; font-size: 12px;">${date}</p>
              <h3 style="color: #0066cc; margin: 10px 0;">Asunto: ${item.subject}</h3>
            </div>
            
            <div style="margin: 10px 0;">
              <h4 style="color: #333; margin-bottom: 5px;">Información de Contacto</h4>
              <p style="margin: 5px 0;"><strong>Nombre:</strong> ${item.name} ${item.surname}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${item.email}" style="color: #0066cc;">${item.email}</a></p>
              ${categoryInfo}
              ${tagsInfo}
            </div>

            <div style="margin: 15px 0;">
              <h4 style="color: #333; margin-bottom: 5px;">Mensaje</h4>
              <div style="background-color: #f9f9f9; padding: 12px; border-radius: 4px;">
                <p style="white-space: pre-wrap; color: #333; line-height: 1.6; margin: 0;">${item.body}</p>
              </div>
            </div>
          </div>
        `;
      });

      const emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: #0066cc; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Resumen de Consultas</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px;">
              ${validNotifications.length} nueva(s) consulta(s) recibida(s)
            </p>
          </div>
          
          <div style="background-color: white; padding: 20px;">
            ${notificationLines.join("")}
          </div>

          <div style="background-color: #f0f0f0; padding: 15px; border-radius: 0 0 8px 8px; text-align: center; color: #666; font-size: 12px;">
            <p style="margin: 0;">Este correo fue generado automáticamente por el sistema de notificaciones.</p>
            <p style="margin: 5px 0 0 0;">Generado el ${new Date().toLocaleString(
              "es-ES",
              {
                dateStyle: "long",
                timeStyle: "short",
              }
            )}</p>
          </div>
        </div>
      `;

      console.log("[Scheduled] Sending digest email to admin");
      await sendEmail({
        to: env.EMAIL_ADMIN || process.env.EMAIL_ADMIN || "",
        subject: `📬 Resumen de Consultas (${validNotifications.length} nuevas)`,
        html: emailContent,
        azureConfig: {
          tenantId: env.AZURE_TENANT_ID || "",
          clientId: env.AZURE_CLIENT_ID || "",
          clientSecret: env.AZURE_CLIENT_SECRET || "",
          emailSender: env.EMAIL_SENDER || "",
        },
      });
      console.log("[Scheduled] Digest email sent successfully");

      console.log("[Scheduled] Deleting processed notifications from KV");
      await Promise.all(
        listResult.keys.map((key) => env.ADMIN_NOTIFICATIONS.delete(key.name))
      );

      console.log(
        `[Scheduled] Successfully sent digest email and cleared ${validNotifications.length} notification(s)`
      );
    } catch (error) {
      console.error(
        "[Scheduled] Error processing scheduled notifications:",
        error
      );
      console.error("[Scheduled] Error details:", {
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
  },
} satisfies ExportedHandler<CloudflareEnv>;

// @ts-ignore `.open-next/worker.ts` is generated at build time
export { DOQueueHandler, DOShardedTagCache } from "./.open-next/worker.js";
