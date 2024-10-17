/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    // if user have token then he should be redirected to which pages
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  if (token && (
    url.pathname.startsWith("/sign-in") ||
    url.pathname.startsWith("/") ||
    url.pathname.startsWith("/verify")

)) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["sign-in", "sign-up", "/", "/dashboard/:path*", "verify/:path*"],
};
