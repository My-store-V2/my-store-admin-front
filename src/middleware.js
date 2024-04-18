import { NextResponse } from "next/server";
import { getCookie } from "cookies-next";

// This function can be marked `async` if using `await` inside,
// but in this case, it's not necessary since you're not using any asynchronous operations.
export function middleware(request) {

  const token = getCookie("token", { req: request });

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Your config object is correct. It specifies which paths the middleware should apply to.
// Including both "/products" and "/products/:path*" is a good practice to cover the base path and any subpaths.
export const config = {
  matcher: [
    "/products/:path*",
    "/users/:path*",
    "/products",
    "/users",
    "/",
    "/orders/:path*",
    "/orders",
  ],
};
