import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { studentId, courseId, date, present } = body ?? {};

  if (!studentId || !courseId || !date || typeof present !== 'boolean') {
    return NextResponse.json({ error: 'Dados faltando' }, { status: 400 });
  }

  const prisma = getPrisma();
  const attendance = await prisma.attendance.upsert({
    where: {
      studentId_courseId_date: {
        studentId,
        courseId,
        date: new Date(date),
      },
    },
    update: { present },
    create: {
      studentId,
      courseId,
      date: new Date(date),
      present,
    },
  });

  return NextResponse.json({ attendance });
}
