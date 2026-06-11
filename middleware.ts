import { NextRequest, NextResponse } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";

const protectedRoutes = [
  "/dashboard",
  "/saved",
  "/recently-viewed",
  "/map",
  "/listing",
  "/properties",
];
const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

function isProtectedRoute(pathname: string) {
  return protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function isAuthRoute(pathname: string) {
  return authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function isMobile(userAgent: string | null) {
  return /Mobile|Android|iPhone/i.test(userAgent || "");
}

export async function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent");
  const mobile = isMobile(userAgent);

  const {
    response,
    hasSession: hasSupabaseSession,
    role,
  } = await updateSession(request);

  const pathname = request.nextUrl.pathname;

  if (mobile && hasSupabaseSession && (role === "admin" || role === "staff")) {
    return NextResponse.redirect(new URL("/not-allowed", request.url));
  }

  if (isProtectedRoute(pathname) && !hasSupabaseSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute(pathname) && hasSupabaseSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/saved/:path*",
    "/recently-viewed/:path*",
    "/map/:path*",
    "/listing/:path*",
    "/properties/:path*",

    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};
