import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = cookies().get("token")?.value;

  if (!cookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
