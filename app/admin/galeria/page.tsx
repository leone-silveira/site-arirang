'use client';

import { useState } from 'react';

export default function AdminGalleryPage() {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!file) {
      setError('Selecione um arquivo de imagem.');
      return;
    }

    const form = new FormData();
    form.append('image', file);
    form.append('title', title);
    form.append('caption', caption);

    const res = await fetch('/api/admin/gallery', {
      method: 'POST',
      body: form,
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Erro ao enviar imagem');
      return;
    }

    setSuccess('Imagem enviada com sucesso!');
    setTitle('');
    setCaption('');
    setFile(null);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-red-700 mb-4">Galeria</h1>

      <div className="p-6 bg-white rounded shadow">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            placeholder="Título da imagem"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2"
            required
          />

          <input
            placeholder="Legenda (opcional)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="border p-2"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="border p-2"
          />

          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Enviar imagem
          </button>
        </form>

        {success && <p className="mt-3 text-green-700">{success}</p>}
        {error && <p className="mt-3 text-red-700">{error}</p>}
      </div>
    </div>
  );
}
