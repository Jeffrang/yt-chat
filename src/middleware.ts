import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse, NextRequest } from 'next/server';

// Create custom middleware
export default function middleware(req: NextRequest) {
  // Skip auth for /api/keep-alive
  if (req.nextUrl.pathname === '/api/keep-alive') {
    return NextResponse.next()
  }

  // Apply clerk auth for all other routes
  return clerkMiddleware(req)
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}