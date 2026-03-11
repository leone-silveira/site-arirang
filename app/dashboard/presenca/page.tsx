import { getCurrentStudent } from '@/lib/auth';
import { getPrisma } from '@/lib/prisma';

export default async function PresencaPage() {
  const student = await getCurrentStudent();
  if (!student) return null;

  const prisma = getPrisma();
  const attendances = await prisma.attendance.findMany({
    where: { studentId: student.student?.id },
    include: { course: true },
    orderBy: { date: 'desc' },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-red-700 mb-4">Minhas Presenças</h1>

      {attendances.length === 0 ? (
        <p className="text-gray-600">Ainda não há registros de presença.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-red-50">
                <th className="px-4 py-2 text-sm font-semibold">Data</th>
                <th className="px-4 py-2 text-sm font-semibold">Curso</th>
                <th className="px-4 py-2 text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-3">
                    {new Date(item.date).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-4 py-3">{item.course?.name ?? '-'}</td>
                  <td className="px-4 py-3">
                    {item.present ? (
                      <span className="text-green-700 font-semibold">Presente</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Faltou</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
