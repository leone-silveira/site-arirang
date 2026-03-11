import { getCurrentStudent } from '@/lib/auth';
import { getPrisma } from '@/lib/prisma';

export default async function NotasPage() {
  const student = await getCurrentStudent();
  if (!student) return null;

  const prisma = getPrisma();
  const grades = await prisma.grade.findMany({
    where: { studentId: student.student?.id },
    include: { course: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-red-700 mb-4">Minhas Notas</h1>

      {grades.length === 0 ? (
        <p className="text-gray-600">Nenhuma nota registrada ainda.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-red-50">
                <th className="px-4 py-2 text-sm font-semibold">Curso</th>
                <th className="px-4 py-2 text-sm font-semibold">Avaliação</th>
                <th className="px-4 py-2 text-sm font-semibold">Nota</th>
                <th className="px-4 py-2 text-sm font-semibold">Peso</th>
                <th className="px-4 py-2 text-sm font-semibold">Data</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade) => (
                <tr key={grade.id} className="border-t">
                  <td className="px-4 py-3">{grade.course?.name ?? '-'}</td>
                  <td className="px-4 py-3">{grade.title}</td>
                  <td className="px-4 py-3">{grade.score.toFixed(1)} / {grade.maxScore}</td>
                  <td className="px-4 py-3">{grade.weight}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(grade.createdAt).toLocaleDateString('pt-BR')}
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
