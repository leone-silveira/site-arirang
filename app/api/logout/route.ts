import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL('/login', req.url));
  res.cookies.set({
    name: 'student',
    value: '',
    path: '/',
    maxAge: 0,
  });
  return res;
}
