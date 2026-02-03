import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  // Check if it's a subdomain by looking for a dot before localhost
  // e.g., gold.localhost:3001 has a subdomain "gold"
  // but localhost:3001 does not
  const parts = hostname.split(".");

  // Only process if there are multiple parts (subdomain exists)
  // and the request is to a localhost domain
  if (parts.length > 1 && hostname.includes("localhost")) {
    const subdomain = parts[0];

    // Make sure it's not www
    if (subdomain && subdomain !== "www") {
      const url = request.nextUrl.clone();

      // Rewrite to tenant-specific path
      const pathname = url.pathname;
      url.pathname = `/tenant/${subdomain}${pathname === "/" ? "" : pathname}`;

      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
