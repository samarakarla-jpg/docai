import { notFound } from "next/navigation";

import { ContractDetailsForm } from "@/components/docai/contracts/contract-details-form";
import type { ContractType } from "@/lib/docai/domain/contract-models";

const contractTypeLabels: Record<ContractType, string> = {
  services: "Prestação de Serviços",
  sale: "Compra e Venda",
  rental: "Aluguel",
  loan: "Empréstimo",
};

type ContractFormPageProps = {
  params: Promise<{
    type: string;
  }>;
};

export default async function ContractFormPage({
  params,
}: ContractFormPageProps) {
  const { type: requestedType } = await params;

  if (!(requestedType in contractTypeLabels)) {
    notFound();
  }

  const type = requestedType as ContractType;

  return (
    <section
      aria-labelledby="contract-form-title"
      className="mx-auto w-full max-w-3xl"
    >
      <div className="max-w-2xl">
        <h1
          className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
          id="contract-form-title"
        >
          {contractTypeLabels[type]}
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
          Preencha os dados do contrato.
        </p>
      </div>

      <ContractDetailsForm type={type} />
    </section>
  );
}
