import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value || 
                request.headers.get('authorization');

  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/register');
  const isTaskPage = request.nextUrl.pathname.startsWith('/tasks');

  // Check localStorage token on client side
  const hasToken = request.nextUrl.searchParams.get('token') === 'true';

  if (isTaskPage && !token && !hasToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthPage && (token || hasToken)) {
    return NextResponse.redirect(new URL('/tasks', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/tasks/:path*', '/login', '/register'],
};