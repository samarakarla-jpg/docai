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
            Início
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
            Crie propostas para seus serviços elétricos e consulte as que já foram geradas.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-slate-950">
            Como o DocAI funciona
          </h2>
          <ol className="mt-5 space-y-4">
            {[
              "Escolha um ou mais serviços.",
              "Informe os dados do cliente, do eletricista e dos serviços.",
              "Crie e confira a proposta.",
              "Baixe, imprima ou compartilhe com o cliente.",
            ].map((step, index) => (
              <li className="flex gap-3 text-slate-700" key={step}>
                <span
                  aria-hidden="true"
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white"
                >
                  {index + 1}
                </span>
                <span className="pt-0.5 leading-6">{step}</span>
              </li>
            ))}
          </ol>
        </div>

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
