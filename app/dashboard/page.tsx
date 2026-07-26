import { redirect } from "next/navigation";

import { StatusState } from "@/components/ui/status-state";
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
    <section aria-labelledby="dashboard-title" className="mx-auto w-full max-w-4xl">
      <div className="mb-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <h1
            className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
            id="dashboard-title"
          >
            Dashboard
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
            Gerencie seus contratos.
          </p>
        </div>

        <button
          className="rounded-lg bg-slate-950 px-4 py-2.5 font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          type="button"
        >
          Novo contrato
        </button>
      </div>

      <div className="space-y-4">
        <StatusState
          description="Crie seu primeiro contrato para começar."
          title="Você ainda não possui contratos."
          variant="empty"
        >
          <button
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            type="button"
          >
            Criar primeiro contrato
          </button>
        </StatusState>

        {logout === "error" ? (
          <StatusState
            description="Não foi possível encerrar a sessão. Tente novamente."
            title="Logout não concluído"
            variant="error"
          />
        ) : null}
      </div>
    </section>
  );
}
