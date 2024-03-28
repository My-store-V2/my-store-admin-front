import { NextResponse } from "next/server";
import { getCookie } from "cookies-next";

// This function can be marked `async` if using `await` inside,
// but in this case, it's not necessary since you're not using any asynchronous operations.
export function middleware(request) {
    // You correctly check for the cookie in the request.
    // However, to improve clarity and maintainability, you could assign the result to a variable.
    const token = getCookie("token", { req: request });

    // Use the token to decide whether to redirect or proceed.
    if (!token) {
        // Ensure that the URL redirection is constructed correctly.
        // The use of new URL() here is correct and a good practice for constructing absolute URLs.
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Proceed with the request if the token exists.
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
