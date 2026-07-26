"use client";

import type { ContractType } from "@/lib/docai/domain/contract-models";

type ContractFormProps = Readonly<{ type: ContractType | ""; fieldErrors?: Readonly<Record<string, string>>; disabled?: boolean }>;

const fields: Record<ContractType, ReadonlyArray<{ name: string; label: string }>> = {
  services: [{ name: "scope", label: "Escopo do serviço" }, { name: "compensation", label: "Remuneração" }, { name: "term", label: "Prazo" }],
  sale: [{ name: "subject", label: "Objeto da compra e venda" }, { name: "price", label: "Preço" }, { name: "delivery", label: "Entrega" }],
  rental: [{ name: "property", label: "Bem ou imóvel" }, { name: "rent", label: "Valor do aluguel" }, { name: "term", label: "Prazo" }],
  loan: [{ name: "subject", label: "Objeto ou valor emprestado" }, { name: "repayment", label: "Forma de devolução" }, { name: "term", label: "Prazo" }],
};

export function ContractForm({ type, fieldErrors, disabled }: ContractFormProps) {
  return (
    <fieldset className="space-y-5" disabled={disabled}>
      <legend className="sr-only">Dados do contrato</legend>
      <TextField error={fieldErrors?.title} label="Título do contrato" name="title" />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField error={fieldErrors?.["party-1"]} label="Primeira parte" name="party-1" />
        <TextField error={fieldErrors?.["party-2"]} label="Segunda parte (opcional)" name="party-2" />
      </div>
      {fieldErrors?.parties ? <p className="text-sm text-red-700">{fieldErrors.parties}</p> : null}
      {type ? <div className="space-y-5 rounded-xl border border-slate-200 bg-slate-50 p-5"><h2 className="text-base font-semibold text-slate-950">Informações do contrato</h2>{fields[type].map((field) => <TextField key={field.name} error={fieldErrors?.[field.name]} label={field.label} name={field.name} />)}</div> : <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">Selecione um tipo para preencher os campos.</p>}
    </fieldset>
  );
}

function TextField({ error, label, name }: { error?: string; label: string; name: string }) {
  const errorId = `${name}-error`;
  return <div><label className="text-sm font-medium text-slate-800" htmlFor={name}>{label}</label><input aria-describedby={error ? errorId : undefined} aria-invalid={Boolean(error)} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200" id={name} name={name} required={name !== "party-2"} type="text" />{error ? <p className="mt-2 text-sm text-red-700" id={errorId}>{error}</p> : null}</div>;
}
