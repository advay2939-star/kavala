import { NextRequest, NextResponse } from "next/server";

/**
 * Production fence for /admin: without an authenticated Payload
 * session cookie, the operations dashboard does not exist. Full
 * role checks happen server-side per page; this stops casual access
 * at the edge. In development the fence is open for local work.
 */
export function middleware(req: NextRequest) {
  if (process.env.NODE_ENV !== "production") return NextResponse.next();
  const hasSession = req.cookies.has("payload-token");
  if (!hasSession) return new NextResponse(null, { status: 404 });
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
