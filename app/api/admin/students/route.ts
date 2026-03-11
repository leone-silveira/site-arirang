import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const prisma = getPrisma();
  const students = await prisma.student.findMany({ include: { user: true } });
  return NextResponse.json({ students });
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { name, email, password, serie, turno } = body ?? {};

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Dados faltando' }, { status: 400 });
  }

  const prisma = getPrisma();
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
      role: 'STUDENT',
      student: {
        create: {
          serie: serie ?? null,
          turno: turno ?? null,
        },
      },
    },
    include: { student: true },
  });

  return NextResponse.json({ user });
}
