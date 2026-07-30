import Link from "next/link";
import { redirect } from "next/navigation";

import { StatusState } from "@/components/ui/status-state";
import { createReadOnlyAuthClient } from "@/lib/auth/server";
import type { ContractType } from "@/lib/docai/domain/contract-models";
import { createSupabaseContractRepository } from "@/lib/docai/infrastructure/persistence/supabase-contract-repository";

const contractTypeLabels: Record<ContractType, string> = {
  services: "Prestação de Serviços",
  sale: "Compra e Venda",
  rental: "Aluguel",
  loan: "Empréstimo",
};

export default async function ContractsPage() {
  const supabase = await createReadOnlyAuthClient();
  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims.sub;

  if (error || typeof userId !== "string" || !userId.trim()) {
    redirect("/login");
  }

  const repository = await createSupabaseContractRepository();
  const contracts = await repository.listByUser(userId);

  return (
    <section
      aria-labelledby="contracts-title"
      className="mx-auto w-full max-w-5xl"
    >
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <h1
            className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
            id="contracts-title"
          >
            Meus Contratos
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Consulte os contratos gerados anteriormente.
          </p>
        </div>
        <Link
          className="rounded-lg bg-slate-950 px-4 py-2.5 font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          href="/dashboard/contracts/new"
        >
          Nova Proposta
        </Link>
      </div>

      {contracts.length === 0 ? (
        <div className="mt-8">
          <StatusState
            description="Crie seu primeiro contrato para visualizá-lo aqui."
            title="Você ainda não possui contratos."
            variant="empty"
          />
        </div>
      ) : (
        <ul className="mt-8 grid gap-4">
          {contracts.map((contract) => (
            <li
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-6"
              key={contract.id}
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-blue-900">
                  {contractTypeLabels[contract.type]}
                </p>
                <h2 className="mt-1 truncate text-lg font-semibold text-slate-950">
                  {contract.title}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Criado em {formatDate(contract.createdAt)}
                </p>
              </div>
              <Link
                className="mt-4 inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 sm:mt-0"
                href={`/dashboard/contracts/${contract.id}`}
              >
                Abrir
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
