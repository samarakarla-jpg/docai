"use client";

import type { FormEvent } from "react";

import { ContractForm } from "@/components/docai/contracts/contract-form";
import type { ContractType } from "@/lib/docai/domain/contract-models";

type ContractDetailsFormProps = Readonly<{
  type: ContractType;
}>;

export function ContractDetailsForm({ type }: ContractDetailsFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form
      className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      onSubmit={handleSubmit}
    >
      <ContractForm type={type} />
      <button
        className="mt-8 w-full rounded-lg bg-slate-950 px-4 py-3 font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        type="submit"
      >
        Gerar contrato
      </button>
    </form>
  );
}
