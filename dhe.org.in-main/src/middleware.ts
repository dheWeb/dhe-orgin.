import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_PROTECTED_PATHS,
  isAdminAuthorized,
  isAdminGateConfigured,
} from "@/lib/auth/admin-gate";

function isProtectedPath(pathname: string): boolean {
  return ADMIN_PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  if (!isAdminGateConfigured() && process.env.NODE_ENV !== "development") {
    return new NextResponse(
      "Admin access is not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD.",
      { status: 503 }
    );
  }

  if (isAdminAuthorized(request.headers.get("authorization"))) {
    return NextResponse.next();
  }

  return new NextResponse(
    `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Admin login</title></head>
<body style="font-family:system-ui,sans-serif;max-width:32rem;margin:3rem auto;padding:0 1rem;color:#111">
<h1>Admin login required</h1>
<p>Use your browser login prompt when visiting <strong>/admin</strong>.</p>
<ul>
<li><strong>Username:</strong> value of <code>ADMIN_USERNAME</code> in <code>dhe.org.in-main/.env.local</code> (not the root folder file)</li>
<li><strong>Password:</strong> <code>ADMIN_PASSWORD</code> in the same file</li>
</ul>
<p>After rotation, credentials are only in <code>dhe.org.in-main/.env.local</code> and Vercel — not the root <code>.env.local</code> (that file only has Vercel tokens).</p>
</body></html>`,
    {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="DHE Admin", charset="UTF-8"',
        "Content-Type": "text/html; charset=utf-8",
      },
    }
  );
}

export const config = {
  matcher: [
    "/WD",
    "/admin",
    "/donationdatadekh",
    "/noticeboarddata",
    "/api/admin/:path*",
  ],
};
