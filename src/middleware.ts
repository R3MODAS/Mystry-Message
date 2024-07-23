import { NextResponse, NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // get the token
  const token = await getToken({ req: request });

  // get the current url
  const url = request.nextUrl;

  // set the auth routes
  const authRoutes = ["/login", "/signup", "/verify-otp"];

  // if the user has token and he is trying to visit the auth routes
  if (token && authRoutes.includes(url.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // if the user has no token and he is trying to visit the dashboard route
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/verify-otp/:path*",
    "/dashboard/:path*",
  ],
};
