"use client";

import type { ContractType } from "@/lib/docai/domain/contract-models";

const types: ReadonlyArray<{ value: ContractType; label: string }> = [
  { value: "services", label: "Prestação de Serviços" },
  { value: "sale", label: "Compra e Venda" },
  { value: "rental", label: "Aluguel" },
  { value: "loan", label: "Empréstimo" },
];

type ContractTypeSelectorProps = Readonly<{
  value: ContractType | "";
  onChange: (value: ContractType) => void;
  error?: string;
}>;

export function ContractTypeSelector({ value, onChange, error }: ContractTypeSelectorProps) {
  const errorId = "contract-type-error";

  return (
    <div>
      <label className="text-sm font-medium text-slate-800" htmlFor="type">Tipo de contrato</label>
      <select aria-describedby={error ? errorId : undefined} aria-invalid={Boolean(error)} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200" id="type" name="type" onChange={(event) => onChange(event.target.value as ContractType)} required value={value}>
        <option value="">Selecione um tipo</option>
        {types.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
      </select>
      {error ? <p className="mt-2 text-sm text-red-700" id={errorId}>{error}</p> : null}
    </div>
  );
}
