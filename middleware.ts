import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico") || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const origin = request.nextUrl.origin;
  const response = await fetch(`${origin}/api/me`, {
    headers: request.headers,
    credentials: "include",
    redirect: "manual",
  });

  if (response.ok) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/sign-in", request.url));
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
