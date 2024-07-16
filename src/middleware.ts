import { NextResponse, NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

// Middleware function
export async function middleware(request: NextRequest) {
  // get the token
  const token = await getToken({ req: request });

  // get the current url
  const url = request.nextUrl;

  // Redirect to dashboard if the user is already authenticated and trying to access signin, signup, verify or home page
  if (
    token &&
    (url.pathname.startsWith("/login") ||
      url.pathname.startsWith("/signup") ||
      url.pathname.startsWith("/verify") ||
      url.pathname.startsWith("/"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect to signin if the user is not authenticated and trying to access dashboard page
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Paths or routes
export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard/:path*", "/verify/:path*"],
};
