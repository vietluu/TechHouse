import { NextURL } from 'next/dist/server/web/next-url';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const path = request.nextUrl.pathname;
  if (path.startsWith('/signIn')) {
    const token = requestHeaders.get('cookie'); // Get cookies object
    if (token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  if (path.startsWith('/category') && path.endsWith('/category')) {
    return NextResponse.redirect(new URL('/product', request.url));
  }
  if (path.startsWith('/cart')) {
    const token = requestHeaders.get('cookie'); // Get cookies object
    if (!token) {
      console.log('run');
      return NextResponse.redirect(new URL('/signIn', request.url));
    }
  }
  requestHeaders.set('cookie', '');
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}
