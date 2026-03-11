import Link from 'next/link';

interface SidebarProps {
  active?: string;
  links?: { href: string; label: string }[];
}

export default function Sidebar({ active, links }: SidebarProps) {
  const defaultLinks = [
    { href: '/dashboard', label: 'Painel' },
    { href: '/dashboard/notas', label: 'Notas' },
    { href: '/dashboard/presenca', label: 'Presença' },
    { href: '/dashboard/informativos', label: 'Informativos' },
    { href: '/dashboard/aprender', label: 'Aprender Coreano' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-0">
      <div className="px-6 py-7 border-b border-gray-200">
        <h2 className="text-xl font-bold text-red-600">Arirang</h2>
        <p className="text-xs text-gray-500">Área do aluno</p>
      </div>

      <nav className="px-4 py-6">
        {(links ?? defaultLinks).map((link) => {
          const isActive = active === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded px-3 py-2 mb-1 text-sm font-medium hover:bg-red-50 ${
                isActive ? 'bg-red-100 text-red-700' : 'text-gray-700'
              }`}
            >
              {link.label}
            </Link>
          );
        })}

        <div className="mt-8 pt-4 border-t border-gray-200">
          <Link
            href="/"
            className="block text-xs text-gray-500 hover:text-gray-700"
          >
            Voltar para home
          </Link>
          <form action="/api/logout" method="post">
            <button
              type="submit"
              className="mt-3 w-full text-left text-sm text-red-600 hover:text-red-800"
            >
              Sair
            </button>
          </form>
        </div>
      </nav>
    </aside>
  );
}
