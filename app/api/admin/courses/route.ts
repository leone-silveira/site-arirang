import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const prisma = getPrisma();
  const courses = await prisma.course.findMany({ include: { teacher: { include: { user: true } } } });
  return NextResponse.json({ courses });
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { name, description, teacherId } = body ?? {};

  if (!name) {
    return NextResponse.json({ error: 'Nome do curso é obrigatório' }, { status: 400 });
  }

  const prisma = getPrisma();
  const course = await prisma.course.create({
    data: {
      name,
      description: description ?? null,
      teacherId: teacherId ?? null,
    },
  });

  return NextResponse.json({ course });
}
