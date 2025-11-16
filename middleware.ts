import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth(req => {
  const isLoggedIn = !!req.auth

  if (req.nextUrl.pathname.startsWith("/") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/signin", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|signin|signup).*)"],
}