import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_PROTECTED_PATHS,
  isAdminAuthorized,
  isAdminGateConfigured,
} from "@/lib/auth/admin-gate";
import { isEmailAdminAllowed } from "@/lib/auth/admin-email-allowlist";

function isProtectedPath(pathname: string): boolean {
  if (pathname === "/admin/login") return false;
  if (pathname === "/api/admin/auth/logout") return false;
  return ADMIN_PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

async function hasSupabaseAdminSession(request: NextRequest): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !key) return false;

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email && isEmailAdminAllowed(user.email)) {
    return true;
  }

  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  if (!isAdminGateConfigured() && process.env.NODE_ENV !== "development") {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
    if (!supabaseUrl) {
      return new NextResponse(
        "Admin access is not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD, or Supabase Auth with ADMIN_EMAIL_ALLOWLIST.",
        { status: 503 }
      );
    }
  }

  if (isAdminAuthorized(request.headers.get("authorization"))) {
    return NextResponse.next();
  }

  if (await hasSupabaseAdminSession(request)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/WD",
    "/admin/:path*",
    "/donationdatadekh",
    "/noticeboarddata",
    "/api/admin/:path*",
  ],
};
