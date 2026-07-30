"use client";

import Link from "next/link";

import { useGeneratedContract } from "@/components/docai/contracts/generated-contract-context";
import { StatusState } from "@/components/ui/status-state";

export default function GeneratedContractPage() {
  const { contract } = useGeneratedContract();

  if (!contract) {
    return (
      <div className="mx-auto w-full max-w-3xl">
        <StatusState
          description="Gere um contrato para visualizar o resultado nesta página."
          title="Nenhum contrato gerado"
          variant="empty"
        >
          <Link
            className="inline-flex rounded-lg bg-slate-950 px-4 py-2.5 font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            href="/dashboard/contracts/new"
          >
            Nova Proposta
          </Link>
        </StatusState>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="generated-contract-title"
      className="mx-auto w-full max-w-4xl"
    >
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-900">
          Contrato gerado
        </p>
        <h1
          className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
          id="generated-contract-title"
        >
          {contract.title}
        </h1>
      </div>

      <article className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="whitespace-pre-wrap text-base leading-8 text-slate-800">
          {contract.output}
        </div>
      </article>
    </section>
  );
}
