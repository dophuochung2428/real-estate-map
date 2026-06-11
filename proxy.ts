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

function hasSession(request: NextRequest) {
  return request.cookies
    .getAll()
    .some((cookie) => cookie.name.startsWith("sb-"));
}

export async function proxy(request: NextRequest) {
  const { response, hasSession: hasSupabaseSession } =
    await updateSession(request);
  const pathname = request.nextUrl.pathname;

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
