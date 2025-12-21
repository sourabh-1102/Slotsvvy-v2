import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if accessing a staff route
  if (request.nextUrl.pathname.startsWith('/staff')) {
    const token = request.cookies.get('staff_token');

    // If no token exists, redirect to login
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      // Optional: Add a 'next' query param to redirect back after login
      // loginUrl.searchParams.set('next', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Config matcher to only run on relevant paths
export const config = {
  matcher: '/staff/:path*',
};
