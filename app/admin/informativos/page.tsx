'use client';

import { useEffect, useState } from 'react';

type Student = { id: string; user: { id: string; name: string } };
type Course = { id: string; name: string };

export default function AdminAnnouncementsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    content: '',
    courseId: '',
    studentId: '',
  });

  useEffect(() => {
    async function load() {
      try {
        const [studentsRes, coursesRes] = await Promise.all([
          fetch('/api/admin/students'),
          fetch('/api/admin/courses'),
        ]);
        const studentsData = await studentsRes.json();
        const coursesData = await coursesRes.json();

        setStudents(studentsData.students ?? []);
        setCourses(coursesData.courses ?? []);
      } catch (err) {
        setError('Erro ao carregar dados.');
      }
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const body = {
      title: form.title,
      content: form.content,
      courseId: form.courseId || undefined,
      studentId: form.studentId || undefined,
    };

    const res = await fetch('/api/admin/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Erro ao criar informativo');
      return;
    }

    setSuccess('Informativo criado com sucesso!');
    setForm({ title: '', content: '', courseId: '', studentId: '' });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-red-700 mb-4">Criar Informativo</h1>

      <div className="p-6 bg-white rounded shadow">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            placeholder="Título"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border p-2"
            required
          />
          <textarea
            placeholder="Mensagem (use \n para pular linhas)"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="border p-2 h-28"
            required
          />

          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={form.courseId}
              onChange={(e) => setForm({ ...form, courseId: e.target.value })}
              className="border p-2"
            >
              <option value="">Para toda a turma</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>

            <select
              value={form.studentId}
              onChange={(e) => setForm({ ...form, studentId: e.target.value })}
              className="border p-2"
            >
              <option value="">Para nenhum aluno específico</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.user.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Publicar
          </button>
        </form>

        {success && <p className="mt-3 text-green-700">{success}</p>}
        {error && <p className="mt-3 text-red-700">{error}</p>}
      </div>
    </div>
  );
}
