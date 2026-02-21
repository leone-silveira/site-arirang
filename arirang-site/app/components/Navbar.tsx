export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 shadow">
      <h1 className="text-2xl font-bold text-red-600">
        Arirang 🇰🇷
      </h1>

      <div className="flex gap-6">
        <a href="/">Home</a>
        <a href="/cursos">Cursos</a>
        <a href="/sobre">Sobre</a>
        <a href="/contato">Contato</a>
        <a
          href="/login"
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Login
        </a>
      </div>
    </nav>
  );
}