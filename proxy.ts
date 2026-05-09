import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    const isAuthPage = request.nextUrl.pathname.startsWith("/auth/");

    const isAuthenticated = !!token;

    if (!isAuthenticated && !isAuthPage) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (isAuthenticated && isAuthPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/((?!api|_next|favicon.ico).*)",
};
