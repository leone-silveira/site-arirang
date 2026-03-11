import Navbar from "./components/Navbar";
import { getPrisma } from "@/lib/prisma";

export default async function Home() {
  const prisma = getPrisma();
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: 'desc' },
    take: 6,
  });

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
        <h2 className="text-3xl font-bold mb-8">Galeria de Aulas</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {images.map((image) => {
            const url = `data:${image.mimeType};base64,${Buffer.from(
              image.data
            ).toString('base64')}`;
            return (
              <div
                key={image.id}
                className="rounded overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={url}
                  alt={image.caption || image.title}
                  className="w-full h-52 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-lg">{image.title}</h3>
                  {image.caption ? (
                    <p className="text-sm text-gray-600 mt-1">{image.caption}</p>
                  ) : null}
                </div>
              </div>
            );
          })}
          {images.length === 0 ? (
            <p className="text-gray-600 col-span-full">
              Ainda não há imagens na galeria. Faça login como admin para adicionar.
            </p>
          ) : null}
        </div>
      </section>

      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8">Por que estudar conosco?</h2>

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