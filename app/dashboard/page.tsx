import { redirect } from "next/navigation";

import { createReadOnlyAuthClient } from "@/lib/auth/server";
import { StatusState } from "@/components/ui/status-state";

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
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
          Ambiente protegido
        </p>
        <h1
          className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
          id="dashboard-title"
        >
          Dashboard protegido
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
          Esta área confirma que a sessão está válida. Funcionalidades de
          produto permanecem fora desta Sprint.
        </p>
      </div>

      <div className="space-y-4">
        <StatusState
          description="A sessão atual foi validada com sucesso."
          title="Sessão autenticada"
          variant="success"
        />

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
