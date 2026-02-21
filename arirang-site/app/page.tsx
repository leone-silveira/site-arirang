import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />

      <section className="text-center py-20 bg-red-50">
        <h1 className="text-5xl font-bold mb-6">
          Aprenda Coreano de Verdade 🇰🇷
        </h1>

        <p className="text-xl mb-8">
          Método moderno para falar coreano com confiança
        </p>

        <a
          href="/contato"
          className="bg-red-600 text-white px-6 py-3 rounded text-lg"
        >
          Começar Agora
        </a>
      </section>

      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">
          Por que estudar conosco?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 px-10">
          <div className="p-6 shadow rounded">
            Professores Qualificados
          </div>
          <div className="p-6 shadow rounded">
            Método Comunicativo
          </div>
          <div className="p-6 shadow rounded">
            Certificado Reconhecido
          </div>
        </div>
      </section>
    </main>
  );
}