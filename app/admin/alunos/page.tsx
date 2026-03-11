'use client';

import { useEffect, useState } from 'react';

type Student = {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  serie?: string | null;
  turno?: string | null;
};

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    serie: '',
    turno: '',
  });

  useEffect(() => {
    fetch('/api/admin/students')
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.students ?? []);
        setLoading(false);
      })
      .catch(() => {
        setError('Não foi possível carregar alunos.');
        setLoading(false);
      });
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const res = await fetch('/api/admin/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Erro ao criar aluno');
      return;
    }
    const data = await res.json();
    setStudents((prev) => [...prev, data.user.student ? { ...data.user.student, user: data.user } : null].filter(Boolean) as Student[]);
    setForm({ name: '', email: '', password: '', serie: '', turno: '' });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-red-700 mb-4">Alunos</h1>

      <section className="mb-8 p-6 bg-white rounded shadow">
        <h2 className="font-semibold mb-2">Cadastrar novo aluno</h2>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2"
            required
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border p-2"
            required
          />
          <input
            placeholder="Senha"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border p-2"
            required
          />
          <input
            placeholder="Série / Turma"
            value={form.serie}
            onChange={(e) => setForm({ ...form, serie: e.target.value })}
            className="border p-2"
          />
          <input
            placeholder="Turno"
            value={form.turno}
            onChange={(e) => setForm({ ...form, turno: e.target.value })}
            className="border p-2"
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded md:col-span-2"
          >
            Cadastrar aluno
          </button>
        </form>
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </section>

      <section className="p-6 bg-white rounded shadow">
        <h2 className="font-semibold mb-4">Lista de alunos</h2>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-red-50">
                  <th className="px-4 py-2 text-left text-sm font-semibold">Nome</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Série</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Turno</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-t">
                    <td className="px-4 py-2">{student.user.name}</td>
                    <td className="px-4 py-2">{student.user.email}</td>
                    <td className="px-4 py-2">{student.serie || '-'}</td>
                    <td className="px-4 py-2">{student.turno || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
