import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  if (request.nextUrl.pathname.startsWith('/signIn')) {
    const token = requestHeaders.get('cookie'); // Get cookies object
    if (token) {
      return NextResponse.redirect(new URL('/', request.url));
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
