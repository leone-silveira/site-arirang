import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getPrisma } from '@/lib/prisma';

export const revalidate = 0; // always server-side

export default async function AdminPage() {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get('admin')?.value === 'true';
  if (!isAdmin) {
    // redirect to login form
    redirect('/admin/login');
  }

  const prisma = getPrisma();
  const students = await prisma.student.findMany({
    include: { user: true },
    orderBy: { createdAt: 'asc' },
  });

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>List of students:</p>
      <ul className="list-disc pl-5">
        {students.map((s) => (
          <li key={s.id}>{s.user.name} ({s.user.email})</li>
        ))}
      </ul>
      <form action="/api/admin/logout" method="post" className="mt-6">
        <button
          type="submit"
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </form>
    </main>
  );
}
