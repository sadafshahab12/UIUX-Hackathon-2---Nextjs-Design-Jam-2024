import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/cart(.*)",
  "/checkout(.*)",
  "/user(.*)",
  "/rental-cart(.*)",
  "/rental-checkout(.*)"

]);
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect(); //agr is route pr request ai h jo k protected route agr h to kia kro auth.protect() ka use krty huye sign in k page pr redirect krdo
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
