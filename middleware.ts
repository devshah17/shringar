import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host") || "";
  const pathname = url.pathname;

  // 1. Skip static assets, internal Next.js assets, and backend API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 2. Platform Admin Subdomain (e.g. admin.shringar.com, admin.localhost:3000, admin-shringar.vercel.app)
  if (hostname.startsWith("admin.") || hostname.startsWith("admin-")) {
    if (!pathname.startsWith("/admin")) {
      url.pathname = `/admin${pathname === "/" ? "" : pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // 3. Salon Owner Subdomain (e.g. owner.shringar.com, partner.shringar.com, owner.localhost:3000)
  if (
    hostname.startsWith("owner.") ||
    hostname.startsWith("partner.") ||
    hostname.startsWith("owner-") ||
    hostname.startsWith("partner-")
  ) {
    if (!pathname.startsWith("/owner")) {
      url.pathname = `/owner${pathname === "/" ? "" : pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // 4. If accessing direct paths for local development convenience (e.g. localhost:3000/owner or /admin or /theme)
  if (
    pathname.startsWith("/owner") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/customer") ||
    pathname.startsWith("/theme") ||
    pathname.startsWith("/dashboard")
  ) {
    return NextResponse.next();
  }

  // 5. Main Customer Website (e.g. shringar.com, localhost:3000)
  url.pathname = `/customer${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
