import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    
    const token = request.cookies.get("token")?.value || ""
   
    let isPublicPath = path === "/login" || path === "/signup" || path.includes("verifyemail") || path.includes("resetpassword")
    let protectedPaths =  path.startsWith("/profile") 


    if(isPublicPath && token){
        return NextResponse.redirect(new URL("/profile", request.nextUrl))
    }
    
    if(token==="" && protectedPaths ){
        return NextResponse.redirect( new URL("/login",request.nextUrl) )
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        "/login",
        "/signup",
        "/profile",
        "/profile/:path*",
        "/verifyemail",
        "/resetpassword"
    ]
};
