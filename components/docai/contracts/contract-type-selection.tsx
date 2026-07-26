import Link from "next/link";

import type { ContractType } from "@/lib/docai/domain/contract-models";

const contractTypes: ReadonlyArray<{
  label: string;
  value: ContractType;
}> = [
  {
    label: "Prestação de Serviços",
    value: "services",
  },
  {
    label: "Compra e Venda",
    value: "sale",
  },
  {
    label: "Aluguel",
    value: "rental",
  },
  {
    label: "Empréstimo",
    value: "loan",
  },
];

export function ContractTypeSelection() {
  return (
    <section
      aria-labelledby="contract-type-selection-title"
      className="mx-auto w-full max-w-4xl"
    >
      <div className="max-w-2xl">
        <h1
          className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
          id="contract-type-selection-title"
        >
          Novo contrato
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
          Selecione e clique no tipo de contrato que deseja criar.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {contractTypes.map((contractType) => (
          <Link
            className="group flex min-h-28 items-center justify-between gap-4 rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-950 hover:bg-blue-950 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 active:translate-y-0 active:border-blue-800 active:bg-blue-800"
            href={`/dashboard/contracts/new/${contractType.value}`}
            key={contractType.value}
          >
            <span className="text-lg font-semibold text-slate-950 transition-colors group-hover:text-white group-active:text-white">
              {contractType.label}
            </span>
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-slate-300 text-lg text-slate-700 transition-colors group-hover:border-blue-200 group-hover:bg-white group-hover:text-blue-950 group-active:border-blue-100 group-active:bg-white group-active:text-blue-900"
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
