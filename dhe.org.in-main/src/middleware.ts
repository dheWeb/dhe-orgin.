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

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="DHE Admin", charset="UTF-8"',
    },
  });
}

export const config = {
  matcher: ["/WD", "/donationdatadekh", "/noticeboarddata", "/api/sendMail"],
};
