// import { clerkMiddleware } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// const publicRoutes = ["/", "/api/webhooks", "/sign-in", "/sign-up"];

// export default clerkMiddleware({
//   publicRoutes,
//   async afterAuth(auth, req) {
//     if (!auth.userId && !publicRoutes.includes(req.nextUrl.pathname)) {
//       return NextResponse.redirect(new URL("/sign-in", req.url));
//     }
//     if (auth.userId && publicRoutes.includes(req.nextUrl.pathname)) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//   },
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };

import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRoutes = ["/api/webhooks", "/sign-in", "/sign-up"];

export default authMiddleware({
  publicRoutes,
  async afterAuth(auth, req) {
    if (!auth.userId && !publicRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    if (auth.userId && publicRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
});

export const config = {
  matcher: [
    // Exclude Next.js internals and static files by pattern
    "/((?!_next/static|_next/image|favicon.ico|public|.*\\.(?:css|js|json|jpg|jpeg|png|gif|svg|ico|woff|woff2|ttf|webp)).*)",
    // Include API and trpc routes
    "/api/(.*)",
    "/trpc/(.*)",
  ],
};
