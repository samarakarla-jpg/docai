import type { NextRequest } from "next/server";

import { updateAuthSession } from "@/lib/auth/middleware";

export async function middleware(request: NextRequest) {
  return updateAuthSession(request);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
