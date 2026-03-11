'use client';

import { useState } from 'react';

const question = {
  prompt: 'O que significa "안녕하세요"?',
  options: [
    { id: 'a', label: 'Obrigado', correct: false },
    { id: 'b', label: 'Olá', correct: true },
    { id: 'c', label: 'Adeus', correct: false },
    { id: 'd', label: 'Por favor', correct: false },
  ],
};

export default function Quiz() {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const isCorrect =
    selected != null && question.options.find((opt) => opt.id === selected)?.correct;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="font-semibold">{question.prompt}</p>
      <div className="grid gap-2">
        {question.options.map((opt) => (
          <label
            key={opt.id}
            className="flex items-center gap-3 p-3 border rounded hover:bg-red-50"
          >
            <input
              type="radio"
              name="quiz"
              value={opt.id}
              checked={selected === opt.id}
              onChange={() => setSelected(opt.id)}
              className="form-radio"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>

      <button
        type="submit"
        disabled={!selected}
        className="mt-2 inline-flex items-center justify-center rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
      >
        Verificar
      </button>

      {submitted && selected && (
        <p className={`mt-3 font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
          {isCorrect
            ? 'Correto! 안녕하세요 significa "Olá".'
            : 'Ops, tente novamente. 안녕하세요 significa "Olá".'}
        </p>
      )}
    </form>
  );
}
