import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 shadow">
      <h1 className="text-2xl font-bold text-red-600">
        Arirang 🇰🇷
      </h1>

      <div className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/cursos">Cursos</Link>
        <Link href="/sobre">Sobre</Link>
        <Link href="/contato">Contato</Link>
        <Link
          href="/login"
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}