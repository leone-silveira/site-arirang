import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-col md:flex-row md:items-center md:justify-between p-4 shadow bg-white">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-red-600">Arirang 🇰🇷</h1>
        <span className="text-sm text-gray-600">Curso de Coreano</span>
      </div>

      <div className="flex flex-wrap gap-4 mt-3 md:mt-0">
        <Link href="/" className="text-sm hover:text-red-600">
          Home
        </Link>
        <Link href="/dashboard" className="text-sm hover:text-red-600">
          Área do Aluno
        </Link>
        <Link href="/admin" className="text-sm hover:text-red-600">
          Admin
        </Link>
        <Link href="/contato" className="text-sm hover:text-red-600">
          Contato
        </Link>
      </div>
    </nav>
  );
}