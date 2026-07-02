import { NextRequest, NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "@/lib/auth/authorize-admin-request";
import { getEmailHealth } from "@/lib/email/email-health";
import { sendBrevoEmail } from "@/lib/email/send-via-brevo-api";
import { getSmtpConfig } from "@/lib/env/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!(await isAdminRequestAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const health = await getEmailHealth();
  return NextResponse.json({
    ...health,
    fix:
      health.errors.length > 0
        ? "Brevo → Settings → SMTP & API → API Keys → create v3 key (xkeysib-). Set BREVO_API_KEY on Vercel Production. Disable API IP blocking in Brevo → Security."
        : null,
  });
}

export async function POST(req: NextRequest) {
  if (!(await isAdminRequestAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let to = process.env.ADMIN_USERNAME?.trim();
  try {
    const body = (await req.json()) as { to?: string };
    if (body.to?.trim()) to = body.to.trim();
  } catch {
    // use admin username
  }

  if (!to) {
    return NextResponse.json({ error: "No recipient email." }, { status: 400 });
  }

  const health = await getEmailHealth();
  if (!health.brevoApiConfigured || !health.fromAddress) {
    return NextResponse.json(
      { error: "Email not configured", health },
      { status: 503 }
    );
  }

  const smtp = getSmtpConfig() ?? {
    service: "brevo",
    user: "",
    pass: "",
    from: health.fromAddress,
  };

  try {
    await sendBrevoEmail(smtp, {
      to,
      subject: "DHE email test — receipt pipeline",
      html: "<p>If you receive this, donation receipt emails should work on production.</p>",
    });
    return NextResponse.json({ success: true, sentTo: to });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Send failed";
    return NextResponse.json({ error: message, health }, { status: 500 });
  }
}
