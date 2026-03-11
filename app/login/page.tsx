'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.replace('/dashboard');
    } else {
      const data = await res.json();
      setError(data.error || 'Não foi possível acessar');
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-red-50">
      <div className="p-8 shadow rounded w-96 bg-white">
        <h1 className="text-2xl mb-4 font-bold text-red-700">
          Área do Aluno
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
          />

          <input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="bg-red-600 text-white w-full p-2 rounded"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
