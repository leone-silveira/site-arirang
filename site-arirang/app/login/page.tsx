export default function Login() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-8 shadow rounded w-96">
        <h1 className="text-2xl mb-4 font-bold">
          Área do Aluno
        </h1>

        <input
          placeholder="Email"
          className="border p-2 w-full mb-3"
        />

        <input
          placeholder="Senha"
          type="password"
          className="border p-2 w-full mb-4"
        />

        <button className="bg-red-600 text-white w-full p-2 rounded">
          Entrar
        </button>
      </div>
    </div>
  );
}