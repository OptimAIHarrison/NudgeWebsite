import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "NUDGE <hello@nudgedigital.com.au>";
const TO_EMAIL   = "hello@nudgedigital.com.au";

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

/** Convenience: build a clean HTML table from a key/value record */
export function buildEmailHtml(rows: Record<string, string>): string {
  const tableRows = Object.entries(rows)
    .map(([k, v]) => `
      <tr>
        <td style="padding:8px 12px;font-weight:600;color:#555;width:160px;vertical-align:top;border-bottom:1px solid #eee">${k}</td>
        <td style="padding:8px 12px;color:#222;vertical-align:top;border-bottom:1px solid #eee">${v.replace(/\n/g, "<br>")}</td>
      </tr>`)
    .join("");

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:32px 24px">
      <div style="background:#8040B2;border-radius:10px 10px 0 0;padding:20px 24px">
        <p style="color:#fff;font-size:20px;font-weight:800;margin:0;letter-spacing:1px">NUDGE</p>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #eee;border-top:none;border-radius:0 0 10px 10px">
        ${tableRows}
      </table>
      <p style="font-size:12px;color:#999;text-align:center;margin-top:24px">
        nudgedigital.com.au
      </p>
    </div>`;
}
