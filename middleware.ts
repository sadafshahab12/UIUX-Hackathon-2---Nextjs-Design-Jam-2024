import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isUserRoute = createRouteMatcher(["/user(.*)"]);
const isProtectedRoute = createRouteMatcher(["/cart(.*)"]);
export default clerkMiddleware(async (auth, req) => {
  const { user } = auth;
  if (isAdminRoute(req)) {
    if (!user || !user.roles.includes("admin")) {
      return new Response("Not Authorize", { status: 403 });
    }
  }
  if (isUserRoute(req) && !user) {
    return new Response("Please sign in", { status: 401 });
  }
  

  if (isProtectedRoute(req) && isAdminRoute(req)) await auth.protect(); //agr is route pr request ai h jo k protected route agr h to kia kro auth.protect() ka use krty huye sign in k page pr redirect krdo
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
