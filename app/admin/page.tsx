import Link from 'next/link';
import { getPrisma } from '@/lib/prisma';

export const revalidate = 0; // always server-side

export default async function AdminPage() {
  const prisma = getPrisma();

  const [studentCount, courseCount, announcementCount, imageCount] = await Promise.all([
    prisma.student.count(),
    prisma.course.count(),
    prisma.announcement.count(),
    prisma.galleryImage.count(),
  ]);

  return (
    <main>
      <h1 className="text-3xl font-bold text-red-700 mb-4">Painel do Admin</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link href="/admin/alunos" className="p-6 bg-white rounded shadow hover:shadow-lg">
          <p className="text-sm text-gray-500">Alunos cadastrados</p>
          <p className="text-3xl font-bold text-red-600">{studentCount}</p>
        </Link>

        <Link href="/admin/cursos" className="p-6 bg-white rounded shadow hover:shadow-lg">
          <p className="text-sm text-gray-500">Cursos</p>
          <p className="text-3xl font-bold text-red-600">{courseCount}</p>
        </Link>

        <Link href="/admin/informativos" className="p-6 bg-white rounded shadow hover:shadow-lg">
          <p className="text-sm text-gray-500">Informativos</p>
          <p className="text-3xl font-bold text-red-600">{announcementCount}</p>
        </Link>

        <Link href="/admin/galeria" className="p-6 bg-white rounded shadow hover:shadow-lg">
          <p className="text-sm text-gray-500">Imagens na galeria</p>
          <p className="text-3xl font-bold text-red-600">{imageCount}</p>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link
          href="/admin/notas"
          className="p-6 bg-white rounded shadow hover:shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-2">Lançar notas</h2>
          <p className="text-sm text-gray-600">
            Adicione ou edite notas dos alunos por curso e avaliação.
          </p>
        </Link>

        <Link
          href="/admin/presenca"
          className="p-6 bg-white rounded shadow hover:shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-2">Lançar presença</h2>
          <p className="text-sm text-gray-600">
            Marque presença em uma data para os alunos.
          </p>
        </Link>

        <Link
          href="/admin/informativos"
          className="p-6 bg-white rounded shadow hover:shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-2">Criar informativos</h2>
          <p className="text-sm text-gray-600">
            Envie avisos para uma turma ou aluno específico.
          </p>
        </Link>

        <Link
          href="/admin/galeria"
          className="p-6 bg-white rounded shadow hover:shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-2">Adicionar imagens</h2>
          <p className="text-sm text-gray-600">
            Faça upload de imagens para a galeria do site.
          </p>
        </Link>
      </div>
    </main>
  );
}
