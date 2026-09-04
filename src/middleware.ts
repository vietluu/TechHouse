import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value;

  // If already logged in, redirect away from signIn and signUp
  if (path.startsWith('/signIn') || path.startsWith('/signUp')) {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Redirect malformed category urls
  if (path.startsWith('/category') && path.endsWith('/category')) {
    return NextResponse.redirect(new URL('/product', request.url));
  }

  // Require login to access cart
  if (path.startsWith('/cart')) {
    if (!token) {
      return NextResponse.redirect(new URL('/signIn?callbackUrl=/cart', request.url));
    }
  }

  return NextResponse.next();
}
