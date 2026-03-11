import { redirect } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import { getCurrentStudent } from '@/lib/auth';

export const metadata = {
  title: 'Dashboard - Arirang',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const student = await getCurrentStudent();

  if (!student) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-red-50">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
