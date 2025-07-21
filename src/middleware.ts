import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Routes open to everyone
const publicRoutes = createRouteMatcher([
  "/contact(.*)",
  "/terms(.*)",
  "/privacy(.*)",
]);

// Routes only for unauthenticated users
const nonLoginRoutes = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

// Routes only for authenticated users
const protectedRoutes = createRouteMatcher(["/job(.*)", "/profile(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (publicRoutes(req)) return;

  if (nonLoginRoutes(req)) {
    if (userId) {
      return NextResponse.redirect(new URL("/job", req.url));
    }
    return;
  }

  if (protectedRoutes(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    return;
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
