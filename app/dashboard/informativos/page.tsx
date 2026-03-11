import { getCurrentStudent } from '@/lib/auth';
import { getPrisma } from '@/lib/prisma';

export default async function InformativosPage() {
  const student = await getCurrentStudent();
  if (!student) return null;

  const prisma = getPrisma();

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: student.student?.id },
  });

  const courseIds = enrollments.map((en) => en.courseId);

  const announcements = await prisma.announcement.findMany({
    where: {
      OR: [
        { studentId: student.student?.id || undefined },
        { courseId: { in: courseIds.length ? courseIds : undefined } },
      ],
    },
    orderBy: { createdAt: 'desc' },
    include: { teacher: true, course: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-red-700 mb-4">Informativos</h1>

      {announcements.length === 0 ? (
        <p className="text-gray-600">Nenhum informativo por enquanto.</p>
      ) : (
        <div className="space-y-5">
          {announcements.map((news) => (
            <article
              key={news.id}
              className="p-5 bg-white rounded shadow"
            >
              <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold">{news.title}</h2>
                  <p className="text-xs text-gray-500">
                    {new Date(news.createdAt).toLocaleDateString('pt-BR')} ·{' '}
                    {news.course ? `${news.course.name}` : 'Geral'}
                    {news.teacher ? ` · ${news.teacher.user.name}` : ''}
                  </p>
                </div>
              </header>
              <p className="mt-3 text-sm text-gray-700 whitespace-pre-line">
                {news.content}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
