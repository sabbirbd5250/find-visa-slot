import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    // Only bypass auth check in development without valid Clerk keys
    if (process.env.NODE_ENV === 'development' && 
        (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 
         !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith('pk_'))) {
      return;
    }
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
