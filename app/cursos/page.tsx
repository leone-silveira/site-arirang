import Navbar from '../components/Navbar';

export default function CursosPage() {
  return (
    <main>
      <Navbar />

      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-red-700 mb-6">Nossos Cursos</h1>
        <p className="text-gray-700 mb-4">
          Aqui você encontrará os cursos disponíveis para aprender coreano.
          Acesse a área do aluno para ver suas turmas e materiais.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Coreano para Iniciantes</h2>
            <p className="text-gray-600">
              Curso básico com foco em pronúncia (한글), frases úteis e gramática.
            </p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Coreano para Viagens</h2>
            <p className="text-gray-600">
              Aprenda o essencial para viajar e se comunicar com confiança na Coreia.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
