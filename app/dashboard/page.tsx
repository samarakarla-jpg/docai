import { redirect } from "next/navigation";

import { signOut } from "@/app/actions/auth";
import { createReadOnlyAuthClient } from "@/lib/auth/server";

type DashboardPageProps = {
  searchParams: Promise<{
    logout?: string;
  }>;
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const supabase = await createReadOnlyAuthClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims.sub) {
    redirect("/login");
  }

  const { logout } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16 sm:px-10">
      <section
        aria-labelledby="dashboard-title"
        className="w-full max-w-2xl rounded-2xl border border-black/10 bg-white p-8 shadow-sm sm:p-12"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
          Sessão autenticada
        </p>
        <h1
          id="dashboard-title"
          className="mt-3 text-4xl font-semibold tracking-tight text-slate-950"
        >
          Dashboard protegido
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
          Esta área confirma que a sessão está válida. Funcionalidades de
          produto permanecem fora desta Sprint.
        </p>

        {logout === "error" ? (
          <p
            className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-800"
            role="alert"
          >
            Não foi possível encerrar a sessão. Tente novamente.
          </p>
        ) : null}

        <form action={signOut} className="mt-8">
          <button
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-medium text-slate-950 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            type="submit"
          >
            Sair
          </button>
        </form>
      </section>
    </main>
  );
}
