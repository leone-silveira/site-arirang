import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { title, content, courseId, studentId } = body ?? {};

  if (!title || !content) {
    return NextResponse.json({ error: 'Dados faltando' }, { status: 400 });
  }

  const prisma = getPrisma();
  const announcement = await prisma.announcement.create({
    data: {
      title,
      content,
      courseId: courseId || undefined,
      studentId: studentId || undefined,
    },
  });

  return NextResponse.json({ announcement });
}
