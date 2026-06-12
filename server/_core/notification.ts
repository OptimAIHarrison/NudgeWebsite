import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "NUDGE <hello@nudgedigital.com.au>";
const TO_EMAIL   = "hello@nudgedigital.com.au";

const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663450259077/HbZCzrQQJzoEYBqv.png";

export interface EmailPayload {
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Send a transactional email via Resend.
 * Returns true on success, false on failure (never throws — callers log and move on).
 */
export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to:   TO_EMAIL,
      replyTo: payload.replyTo,
      subject: payload.subject,
      html:    payload.html,
    });

    if (error) {
      console.error("[Resend] Failed to send email:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[Resend] Unexpected error:", err);
    return false;
  }
}

/** Convenience: build a styled HTML email from a title and key/value record */
export function buildEmailHtml(title: string, rows: Record<string, string>): string {
  const tableRows = Object.entries(rows)
    .map(([k, v]) => `
        <tr>
          <td style="padding:10px 16px;background:#f9f7ff;font-weight:600;color:#8040B2;font-size:13px;width:25%;border-bottom:1px solid #ede9fe;white-space:nowrap;vertical-align:top;">${k}</td>
          <td style="padding:10px 16px;background:#ffffff;color:#1f1f2e;font-size:13px;border-bottom:1px solid #ede9fe;vertical-align:top;line-height:1.6;">${v.replace(/\n/g, "<br/>")}</td>
        </tr>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f0ff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f0ff;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(128,64,178,0.10);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#8040B2 0%,#b366e0 100%);padding:24px 28px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:middle;">
                  <img src="${LOGO_URL}" alt="Nudge Digital" height="36" style="display:block;height:36px;width:auto;" />
                </td>
                <td align="right" style="vertical-align:middle;">
                  <span style="color:rgba(255,255,255,0.85);font-size:12px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;">${title}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Table -->
        <tr>
          <td style="padding:0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              ${tableRows}
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f7ff;padding:16px 24px;border-top:1px solid #ede9fe;">
            <p style="margin:0;font-size:11px;color:#9ca3af;text-align:center;">
              This email was sent automatically by Nudge Digital &mdash; <a href="https://nudgedigital.com.au" style="color:#8040B2;text-decoration:none;">nudgedigital.com.au</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
