import "./globals.css";

export const metadata = {
  title: "Arirang Curso de Coreano",
  description: "Aprenda coreano de forma simples e eficiente",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-white text-gray-800">
        {children}
      </body>
    </html>
  );
}