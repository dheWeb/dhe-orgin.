import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/auth/admin-gate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** @deprecated Legacy 2024 workshop QR mail — use receipt API + Brevo instead. */
export async function POST(req: NextRequest) {
  if (!isAdminAuthorized(req.headers.get("authorization"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(
    {
      error:
        "Legacy workshop QR email is retired. Use POST /api/admin/donations/{id}/receipt for donation receipts.",
    },
    { status: 410 }
  );
}
