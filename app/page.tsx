import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <nav
          aria-label="Navegação principal"
          className="mx-auto flex min-h-[4.5rem] w-full max-w-6xl items-center justify-between gap-4 px-6 sm:px-10"
        >
          <Link
            className="font-semibold text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            href="/"
          >
            SaaS Starter Kit
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link
              className="text-slate-700 underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              href="/login"
            >
              Entrar
            </Link>
            <Link
              className="rounded-lg bg-slate-950 px-3 py-2 text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              href="/cadastro"
            >
              Criar conta
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex min-h-[calc(100vh-4.5rem)] items-center justify-center px-6 py-16 sm:px-10">
        <section
          aria-labelledby="starter-kit-title"
          className="w-full max-w-2xl rounded-2xl border border-black/10 bg-white p-8 shadow-sm sm:p-12"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Fundação reutilizável
          </p>
          <h1
            id="starter-kit-title"
            className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl"
          >
            SaaS Starter Kit
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Uma base simples, confiável e neutra para iniciar aplicações SaaS e
            evoluir somente a partir de necessidades reais.
          </p>
        </section>
      </main>
    </div>
  );
}
