import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - auth
     * - favicon.ico (favicon file)
     * - robots.txt
     * - images
     * - login
     * - homepage (represented with $ after beginning /)
     */
    '/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|login|home|register|$).*)',
  ],
};

export const middleware = async (req: NextRequest) => {
  const token = await getToken({
    req,
    secret: process.env.JWT_ACCESS_SECRET_KEY,
    raw: true,
  });

  if (!token) {
    console.log(token);
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
};
