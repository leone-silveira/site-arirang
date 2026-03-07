"use client";

import { useState } from "react";

export default function Contato() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log('Submitting form:', form);
    await fetch('/api/contato', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(form),
     });

     alert('Mensagem enviada!');
   }

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Contato
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          placeholder="Nome"
          className="border p-2"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          className="border p-2"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <textarea
          placeholder="Mensagem"
          className="border p-2"
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />

        <button className="bg-red-600 text-white p-2 rounded">
          Enviar
        </button>
      </form>
    </div>
  );
}