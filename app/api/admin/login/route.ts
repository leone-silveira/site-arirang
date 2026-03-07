import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { password } = await req.json();
  console.log('Admin login attempt with password:', password, process.env.ADMIN_PASSWORD);
  if (password === process.env.ADMIN_PASSWORD) {
    const res = NextResponse.redirect(new URL('/admin', req.url));
    res.cookies.set({
      name: 'admin',
      value: 'true',
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });
    return res;
  }

  return NextResponse.json({ error: 'bad credentials' }, { status: 401 });
}
