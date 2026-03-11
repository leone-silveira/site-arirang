import { getCurrentStudent } from '@/lib/auth';
import { getPrisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const studentUser = await getCurrentStudent();
  if (!studentUser) return null;

  const prisma = getPrisma();

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: studentUser.student?.id },
    include: { course: true },
  });

  const grades = await prisma.grade.findMany({
    where: { studentId: studentUser.student?.id },
  });

  const attendances = await prisma.attendance.findMany({
    where: { studentId: studentUser.student?.id },
  });

  const averageGrade =
    grades.length > 0
      ? grades.reduce((sum, g) => sum + (g.score / g.maxScore) * 10 * g.weight, 0) /
        grades.reduce((sum, g) => sum + g.weight, 0)
      : null;

  const attendanceRate =
    attendances.length > 0
      ?
        (attendances.filter((a) => a.present).length / attendances.length) * 100
      : null;

  return (
    <div>
      <header className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold text-red-700">Olá, {studentUser.name}</h1>
        <p className="text-gray-700">
          Bem-vindo à sua área de estudos. Aqui você encontra suas notas, presenças e novidades.
        </p>
      </header>

      <section className="grid lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Cursos inscritos</h2>
          {!enrollments.length ? (
            <p className="text-sm text-gray-600">Nenhum curso encontrado.</p>
          ) : (
            <ul className="space-y-2">
              {enrollments.map((en) => (
                <li key={en.id} className="text-sm">
                  <span className="font-medium">{en.course.name}</span>
                  {en.status ? ` — ${en.status}` : ''}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Média de notas</h2>
          {averageGrade === null ? (
            <p className="text-sm text-gray-600">Ainda não há notas lançadas.</p>
          ) : (
            <p className="text-4xl font-bold text-red-600">
              {averageGrade.toFixed(1)} / 10
            </p>
          )}
          <p className="text-xs text-gray-500 mt-2">A média é ponderada pelo peso das avaliações.</p>
        </div>

        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Presença</h2>
          {attendanceRate === null ? (
            <p className="text-sm text-gray-600">Ainda não há registros de presença.</p>
          ) : (
            <p className="text-4xl font-bold text-red-600">
              {attendanceRate.toFixed(0)}%
            </p>
          )}
          <p className="text-xs text-gray-500 mt-2">
            Percentual de presença nas aulas registradas.
          </p>
        </div>
      </section>

      <section className="mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Próximos passos</h2>
        <ul className="list-disc list-inside text-sm">
          <li>Verifique seus <a className="text-red-600" href="/dashboard/notas">relatórios de notas</a>.</li>
          <li>Confirme suas <a className="text-red-600" href="/dashboard/presenca">presenças</a>.</li>
          <li>Leia os <a className="text-red-600" href="/dashboard/informativos">informativos</a> da turma.</li>
          <li>Pratique <a className="text-red-600" href="/dashboard/aprender">coreano</a> todos os dias.</li>
        </ul>
      </section>
    </div>
  );
}
