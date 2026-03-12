import { cookies } from 'next/headers';
import { getPrisma } from './prisma';

export async function getCurrentStudent() {
  const cookieStore = await cookies();
  const studentCookie = cookieStore.get('student')?.value;
  if (!studentCookie) return null;

  const prisma = getPrisma();
  const user = await prisma.user.findUnique({
    where: { id: studentCookie },
    include: { student: true },
  });
  if (!user || user.role !== 'STUDENT' || !user.student) return null;
  return user;
}

export async function requireStudent() {
  const student = await getCurrentStudent();
  if (!student) {
    return null;
  }
  return student;
}

export async function isAdmin() {
  const cookieStore = await cookies();
  return true; // cookieStore.get('admin')?.value === 'true';
}
