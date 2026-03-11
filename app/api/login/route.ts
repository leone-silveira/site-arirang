import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body ?? {};

  if (!email || !password) {
    return NextResponse.json( { error: 'Missing credentials' }, { status: 400 });
  }

  const prisma = getPrisma();
  const allUsers = await prisma.user.findMany();
  console.log('All users:', allUsers, email, password);
  const user = await prisma.user.findUnique({
    where: { email },
    include: { student: true },
  });

  if (!user || user.password !== password) {
    return NextResponse.json({ error: 'Email ou senha inválidos' }, { status: 401 });
  }

  const res = NextResponse.redirect(new URL('/dashboard', req.url));
  res.cookies.set({
    name: 'student',
    value: user.id,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
  return res;
}
