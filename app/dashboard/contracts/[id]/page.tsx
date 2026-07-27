import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { createUserContext } from "@/lib/docai/application/user-context";
import type { ContractType } from "@/lib/docai/domain/contract-models";
import { SupabaseAuthAdapter } from "@/lib/docai/infrastructure/auth/supabase-auth";
import { createSupabaseContractRepository } from "@/lib/docai/infrastructure/persistence/supabase-contract-repository";

const contractTypeLabels: Record<ContractType, string> = {
  services: "Prestação de Serviços",
  sale: "Compra e Venda",
  rental: "Aluguel",
  loan: "Empréstimo",
};

type ContractPageProps = Readonly<{
  params: Promise<{
    id: string;
  }>;
}>;

export default async function ContractPage({ params }: ContractPageProps) {
  const identity = await new SupabaseAuthAdapter().getIdentity();

  if (!identity) {
    redirect("/login");
  }

  const context = createUserContext(identity);
  const repository = await createSupabaseContractRepository();
  const { id } = await params;
  const contract = await repository.findByIdForUser(id, context.user.id);

  if (!contract) {
    notFound();
  }

  return (
    <section
      aria-labelledby="saved-contract-title"
      className="mx-auto w-full max-w-5xl"
    >
      <Link
        className="inline-flex items-center rounded-lg px-1 py-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        href="/dashboard/contracts"
      >
        <span aria-hidden="true" className="mr-2">
          ←
        </span>
        Meus contratos
      </Link>

      <header className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-3 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
            Contrato salvo
          </p>
        </div>

        <div className="p-5 sm:p-8">
          <h1
            className="break-words text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
            id="saved-contract-title"
          >
            {contract.title}
          </h1>

          <dl className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:gap-10">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Tipo
              </dt>
              <dd className="mt-1 text-sm font-semibold text-blue-900">
                {contractTypeLabels[contract.type]}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Data de criação
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-700">
                <time dateTime={contract.createdAt}>
                  {formatDate(contract.createdAt)}
                </time>
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <article
        aria-labelledby="contract-content-title"
        className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="border-b border-slate-200 px-5 py-4 sm:px-8">
          <h2
            className="text-sm font-semibold text-slate-950"
            id="contract-content-title"
          >
            Conteúdo do contrato
          </h2>
        </div>
        <div className="whitespace-pre-wrap break-words px-5 py-7 text-base leading-8 text-slate-800 sm:px-8 sm:py-9 lg:px-12 lg:py-10">
          {contract.content}
        </div>
      </article>
    </section>
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
