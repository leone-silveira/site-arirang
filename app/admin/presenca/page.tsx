'use client';

import { useEffect, useState } from 'react';

type Student = { id: string; user: { id: string; name: string } };
type Course = { id: string; name: string };

export default function AdminAttendancePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState({
    studentId: '',
    courseId: '',
    date: new Date().toISOString().slice(0, 10),
    present: true,
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
      date: form.date,
      present: form.present,
    };

    const res = await fetch('/api/admin/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Erro ao salvar presença');
      return;
    }

    setSuccess('Presença registrada com sucesso!');
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-red-700 mb-4">Lançar Presença</h1>

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
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="border p-2"
            required
          />

          <select
            value={String(form.present)}
            onChange={(e) =>
              setForm({ ...form, present: e.target.value === 'true' })
            }
            className="border p-2"
            required
          >
            <option value="true">Presente</option>
            <option value="false">Faltou</option>
          </select>

          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded md:col-span-2"
          >
            Registrar presença
          </button>
        </form>

        {success && <p className="mt-3 text-green-700">{success}</p>}
        {error && <p className="mt-3 text-red-700">{error}</p>}
      </div>
    </div>
  );
}
