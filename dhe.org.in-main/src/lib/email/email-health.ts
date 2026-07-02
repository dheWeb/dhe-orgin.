import { getSmtpConfig, isSmtpConfigured } from "@/lib/env/server";
import { getBrevoApiKeyInfo, isBrevoApiConfigured } from "@/lib/email/send-via-brevo-api";

export type EmailHealth = {
  configured: boolean;
  brevoApiConfigured: boolean;
  brevoApiKeySource: string | null;
  smtpRelayConfigured: boolean;
  fromAddress: string | null;
  brevoAccountOk: boolean;
  errors: string[];
};

/** Non-secret email subsystem checks for /api/health and admin diagnostics. */
export async function getEmailHealth(): Promise<EmailHealth> {
  const errors: string[] = [];
  const smtp = getSmtpConfig();
  const fromAddress =
    process.env.SMTP_FROM?.trim() ||
    process.env.SMTP_USER?.trim() ||
    smtp?.from ||
    null;

  const brevoInfo = getBrevoApiKeyInfo();
  const brevoApiConfigured = isBrevoApiConfigured();
  const smtpRelayConfigured = isSmtpConfigured();

  if (!fromAddress) {
    errors.push("SMTP_FROM is not configured");
  }

  if (!brevoApiConfigured) {
    if (smtpRelayConfigured) {
      errors.push(
        "Only Brevo SMTP relay (xsmtpsib) is set — blocked on Vercel. Add BREVO_API_KEY (xkeysib-) for receipt emails."
      );
    } else {
      errors.push("Email not configured — set BREVO_API_KEY and SMTP_FROM");
    }
  }

  let brevoAccountOk = false;

  if (brevoInfo.key) {
    try {
      const res = await fetch("https://api.brevo.com/v3/account", {
        headers: { "api-key": brevoInfo.key, accept: "application/json" },
      });
      if (res.ok) {
        brevoAccountOk = true;
      } else {
        const body = await res.text();
        if (res.status === 401 && body.includes("unrecognised IP")) {
          errors.push(
            "Brevo API IP blocked — disable Authorized IPs in Brevo → Security (required for Vercel)."
          );
        } else if (res.status === 401) {
          errors.push("Brevo API key invalid or revoked");
        } else {
          errors.push(`Brevo account check failed (${res.status})`);
        }
      }
    } catch (e) {
      errors.push(
        e instanceof Error ? e.message : "Brevo account check failed"
      );
    }
  }

  const configured =
    Boolean(fromAddress) &&
    brevoApiConfigured &&
    brevoAccountOk;

  return {
    configured,
    brevoApiConfigured,
    brevoApiKeySource: brevoInfo.source,
    smtpRelayConfigured,
    fromAddress,
    brevoAccountOk,
    errors,
  };
}
