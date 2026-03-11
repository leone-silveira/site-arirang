'use client';

import { useEffect, useState } from 'react';

type Course = {
  id: string;
  name: string;
  description?: string | null;
};

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', description: '' });

  useEffect(() => {
    fetch('/api/admin/courses')
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses ?? []);
        setLoading(false);
      })
      .catch(() => {
        setError('Não foi possível carregar cursos.');
        setLoading(false);
      });
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const res = await fetch('/api/admin/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Erro ao cadastrar curso');
      return;
    }

    const data = await res.json();
    setCourses((prev) => [...prev, data.course]);
    setForm({ name: '', description: '' });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-red-700 mb-4">Cursos</h1>

      <section className="mb-8 p-6 bg-white rounded shadow">
        <h2 className="font-semibold mb-2">Cadastrar novo curso</h2>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Nome do curso"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2"
            required
          />
          <input
            placeholder="Descrição (opcional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2"
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded md:col-span-2"
          >
            Criar curso
          </button>
        </form>
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </section>

      <section className="p-6 bg-white rounded shadow">
        <h2 className="font-semibold mb-4">Lista de cursos</h2>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <ul className="space-y-3">
            {courses.map((course) => (
              <li key={course.id} className="border rounded p-4">
                <p className="font-semibold">{course.name}</p>
                <p className="text-sm text-gray-600">{course.description || 'Sem descrição'}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
