import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// protected routes
const adminRoutes = ["/admin"];
const customerRoutes = ["/customer"];

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const path = req.nextUrl.pathname;

  const token = req.cookies.get("auth-token")?.value; // Sanctum or token

  if (!token) {
    if (adminRoutes.some((r) => path.startsWith(r))) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    if (customerRoutes.some((r) => path.startsWith(r))) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/customer/:path*"],
};
