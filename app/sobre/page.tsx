import Navbar from '../components/Navbar';

export default function SobrePage() {
  return (
    <main>
      <Navbar />

      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-red-700 mb-6">Sobre Nós</h1>
        <p className="text-gray-700 mb-4">
          Arirang é uma escola de coreano focada em aprendizado prático e comunicação.
          Aqui você encontra turmas para todos os níveis, atividades interativas e
          suporte personalizado.
        </p>
        <p className="text-gray-700">
          Nosso método combina conteúdo cultural com prática diária. Vamos juntos
          aprimorar seu coreano e ampliar suas oportunidades!
        </p>
      </section>
    </main>
  );
}
