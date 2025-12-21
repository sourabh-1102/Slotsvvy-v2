import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Always allow auth routes to prevent redirect loops
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // 2. Always allow login page
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // 3. Define protected routes (add paths that require login)
  const isProtectedRoute = 
    pathname.startsWith('/staff') || 
    pathname.startsWith('/sender') || 
    pathname.startsWith('/receiver');

  if (isProtectedRoute) {
    // Check for NextAuth token (works with secure cookies too)
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring static files and images
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
