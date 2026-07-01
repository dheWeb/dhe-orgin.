import { NextRequest, NextResponse } from "next/server";
import { logServerError } from "@/lib/monitoring/log-error";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const limit = await checkRateLimit(`errors:${ip}`);
  if (!limit.allowed) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const message = String(body.message ?? "Client error");
  await logServerError({
    message,
    stack: body.stack ? String(body.stack) : undefined,
    path: body.path ? String(body.path) : req.headers.get("referer") ?? undefined,
    digest: body.digest ? String(body.digest) : undefined,
    metadata: { source: "client" },
  });

  return NextResponse.json({ ok: true });
}
