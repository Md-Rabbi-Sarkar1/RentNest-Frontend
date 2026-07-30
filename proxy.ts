// import { cookies } from 'next/headers';
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { jwtUtils } from "./utils/jwt";
import { getNewAccessToken } from "./service/refreshToken";



const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/posts"]

export async function proxy(request: NextRequest) {

    const pathname = request.nextUrl.pathname;
    const cookieStore = await cookies();

    let accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    let decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;

    const decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null;

    let isTokenRefreshed = false;
    if(!decodedAccessToken?.success && decodedRefreshToken?.success){
        
        const result = await getNewAccessToken();
        console.log(result)
        if(result.success){
            const newAccessToken = result.data.accessToken;

            cookieStore.set("accessToken", newAccessToken , {
                httpOnly : true,
                maxAge : 60 * 60 * 24,
                sameSite : "lax",
            });

            accessToken = newAccessToken;
            decodedAccessToken = jwtUtils.verifyToken(accessToken!, process.env.JWT_ACCESS_SECRET as string);
            isTokenRefreshed = true;
        }
    }

    let userRole = null;

    if(!decodedAccessToken?.success){

        cookieStore.delete("accessToken");
    }

    if(decodedAccessToken?.success && decodedAccessToken.data){
        userRole = (decodedAccessToken.data as JwtPayload).role;
        // console.log(userRole)
    }

    if(accessToken && AUTH_ROUTES.includes(pathname)){
        if(userRole === "LANDLORD"){
            return NextResponse.redirect(new URL('/landlord-dashboard', request.url));
        }else if(userRole === "ADMIN"){
            return NextResponse.redirect(new URL('/admin-dashboard', request.url));
        }else if(userRole === "TENANT"){
            return NextResponse.redirect(new URL('/tenant-dashboard', request.url));
        }else{
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/posts/'));

    const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));

    if(!accessToken && !isPublicRoute && !isAuthRoute){
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set("redirectTo",pathname)
        return NextResponse.redirect(loginUrl);
    }

    if(pathname.startsWith("/landlord-dashboard") && userRole !== "LANDLORD"){
        return NextResponse.redirect(new URL('/not-found', request.url));
    }else if(pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN"){
        return NextResponse.redirect(new URL('/not-found', request.url));
    }else if(pathname.startsWith("/tenant-dashboard") && userRole !== "TENANT"){
        return NextResponse.redirect(new URL('/not-found', request.url));
    }

    if (isTokenRefreshed && accessToken) {
        const requestHeaders = new Headers(request.headers);

        requestHeaders.set('Cookie', `accessToken=${accessToken}; refreshToken=${refreshToken || ''}`);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'
    ],
}