import Quiz from './Quiz';

export default function AprenderPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-red-700 mb-4">Aprender Coreano</h1>

      <section className="mb-8 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Vocabulário Básico</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded border p-4">
            <p className="text-2xl font-semibold">안녕하세요</p>
            <p className="text-sm text-gray-600">Olá / Bom dia</p>
          </div>
          <div className="rounded border p-4">
            <p className="text-2xl font-semibold">감사합니다</p>
            <p className="text-sm text-gray-600">Obrigado(a)</p>
          </div>
          <div className="rounded border p-4">
            <p className="text-2xl font-semibold">사랑해요</p>
            <p className="text-sm text-gray-600">Eu te amo</p>
          </div>
          <div className="rounded border p-4">
            <p className="text-2xl font-semibold">죄송합니다</p>
            <p className="text-sm text-gray-600">Desculpe / Peço desculpas</p>
          </div>
        </div>
      </section>

      <section className="mb-8 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Frases úteis</h2>
        <ul className="list-disc list-inside space-y-3 text-sm text-gray-700">
          <li>
            <span className="font-semibold">어디에 있어요?</span> — Onde fica?
          </li>
          <li>
            <span className="font-semibold">얼마예요?</span> — Quanto custa?
          </li>
          <li>
            <span className="font-semibold">네 / 아니요</span> — Sim / Não
          </li>
        </ul>
      </section>

      <section className="p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Quiz rápido</h2>
        <p className="text-sm text-gray-600 mb-4">
          Teste seu conhecimento com uma pequena pergunta.
        </p>

        <Quiz />
      </section>
    </div>
  );
}
