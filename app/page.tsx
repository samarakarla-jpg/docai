export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16 sm:px-10">
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
  );
}
