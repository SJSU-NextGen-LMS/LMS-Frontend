import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// List of public routes that don't require authentication
const publicPaths = ["/", "/sign-in", "/sign-up"];

export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl;

  // Allow unauthenticated access to homepage and auth routes
  if (pathname === "/" || pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
    return NextResponse.next();
  }

  // Enforce authentication for all other routes
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};