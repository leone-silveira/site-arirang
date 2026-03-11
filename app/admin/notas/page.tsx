'use client';

import { useEffect, useState } from 'react';

type Student = { id: string; user: { id: string; name: string } };
type Course = { id: string; name: string };

export default function AdminGradesPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [form, setForm] = useState({
    studentId: '',
    courseId: '',
    title: '',
    score: '',
    maxScore: '10',
    weight: '1',
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
      studentId: form.studentId,
      courseId: form.courseId,
      title: form.title,
      score: Number(form.score),
      maxScore: Number(form.maxScore),
      weight: Number(form.weight),
    };

    const res = await fetch('/api/admin/grades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Erro ao salvar nota');
      return;
    }

    setSuccess('Nota lançada com sucesso!');
    setForm({ ...form, title: '', score: '', weight: '1' });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-red-700 mb-4">Lançar Notas</h1>

      <div className="p-6 bg-white rounded shadow">
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <select
            value={form.studentId}
            onChange={(e) => setForm({ ...form, studentId: e.target.value })}
            className="border p-2"
            required
          >
            <option value="">Selecionar aluno</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.user.name}
              </option>
            ))}
          </select>

          <select
            value={form.courseId}
            onChange={(e) => setForm({ ...form, courseId: e.target.value })}
            className="border p-2"
            required
          >
            <option value="">Selecionar curso</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Nome da avaliação"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border p-2"
            required
          />

          <div className="grid grid-cols-3 gap-2">
            <input
              placeholder="Nota"
              type="number"
              value={form.score}
              onChange={(e) => setForm({ ...form, score: e.target.value })}
              className="border p-2"
              required
            />
            <input
              placeholder="Máx"
              type="number"
              value={form.maxScore}
              onChange={(e) => setForm({ ...form, maxScore: e.target.value })}
              className="border p-2"
            />
            <input
              placeholder="Peso"
              type="number"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
              className="border p-2"
            />
          </div>

          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded md:col-span-2"
          >
            Salvar nota
          </button>
        </form>

        {success && <p className="mt-3 text-green-700">{success}</p>}
        {error && <p className="mt-3 text-red-700">{error}</p>}
      </div>
    </div>
  );
}
