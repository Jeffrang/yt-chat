import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

export default clerkMiddleware(async (auth: any, req: NextRequest) => {
  if (req.nextUrl.pathname === '/api/alive') return;

  await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}