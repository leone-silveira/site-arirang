import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { studentId, courseId, title, score, maxScore, weight } = body ?? {};

  if (!studentId || !courseId || !title || typeof score !== 'number') {
    return NextResponse.json({ error: 'Dados faltando' }, { status: 400 });
  }

  const prisma = getPrisma();
  const grade = await prisma.grade.create({
    data: {
      studentId,
      courseId,
      title,
      score,
      maxScore: maxScore ?? 10,
      weight: weight ?? 1,
    },
  });

  return NextResponse.json({ grade });
}
