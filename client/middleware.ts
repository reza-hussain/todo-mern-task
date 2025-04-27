import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { deleteCookie } from "cookies-next/server";

const publicPaths = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;

  if (!token) {
    if (publicPaths.some((path) => pathname.startsWith(path))) {
      return res;
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);

    if (publicPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return res;
  } catch (err) {
    console.log({ err });

    const res = NextResponse.redirect(new URL("/login", req.url));
    deleteCookie("token", { req, res });

    return res;
  }
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/", "/login", "/register"],
};
