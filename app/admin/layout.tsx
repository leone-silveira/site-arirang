import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth';

export const metadata = {
  title: 'Admin - Arirang',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await isAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-6 bg-red-600 text-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Painel do Admin</h1>
            <p className="text-sm text-red-100">Gerencie alunos, notas, presença, informativos e galeria.</p>
          </div>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="rounded bg-white text-red-600 px-4 py-2 font-semibold"
            >
              Sair
            </button>
          </form>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-6">{children}</main>
    </div>
  );
}
