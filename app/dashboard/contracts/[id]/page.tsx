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
      className="mx-auto w-full max-w-4xl"
    >
      <div className="max-w-2xl">
        <p className="text-sm font-semibold text-blue-900">
          {contractTypeLabels[contract.type]}
        </p>
        <h1
          className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
          id="saved-contract-title"
        >
          {contract.title}
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Criado em {formatDate(contract.createdAt)}
        </p>
      </div>

      <article className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="whitespace-pre-wrap text-base leading-8 text-slate-800">
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
