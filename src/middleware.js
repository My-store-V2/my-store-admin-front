import { NextResponse } from "next/server";
import { deleteCookie, getCookie } from "cookies-next";

export async function middleware(request) {
    const token = getCookie("token", { req: request });

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url).toString());
    }

    try {
        const session = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }
        );
        if (session.status !== 200) {
            // logout
            deleteCookie("token", { req: request });
            return NextResponse.redirect(
                new URL("/login", request.url).toString()
            );
        }

        // Si le token est valide, continuer avec la requête
        return NextResponse.next();
    } catch (error) {
        console.error("Error fetching: ", error);
        deleteCookie("token", { req: request });

        // Rediriger vers la page de connexion en cas d'erreur
        return NextResponse.redirect(new URL("/login", request.url).toString());
    }

}

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
