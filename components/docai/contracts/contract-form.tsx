"use client";

import type { ContractType } from "@/lib/docai/domain/contract-models";

type ContractFormProps = Readonly<{
  type: ContractType | "";
  fieldErrors?: Readonly<Record<string, string>>;
  disabled?: boolean;
}>;

export function ContractForm({
  fieldErrors,
  disabled,
}: ContractFormProps) {
  return (
    <fieldset className="space-y-8" disabled={disabled}>
      <legend className="sr-only">Dados do contrato</legend>

      <section aria-labelledby="contractor-title">
        <h2
          className="text-lg font-semibold text-slate-950"
          id="contractor-title"
        >
          Contratante (seus dados)
        </h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <TextField
            error={fieldErrors?.contractorName}
            label="Nome do contratante"
            name="contractorName"
          />
          <TextField
            error={fieldErrors?.contractorDocument}
            label="CPF/CNPJ do contratante"
            name="contractorDocument"
          />
          <div className="sm:col-span-2">
            <TextField
              error={fieldErrors?.contractorAddress}
              label="Endereço do contratante"
              name="contractorAddress"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="contracted-title">
        <h2
          className="text-lg font-semibold text-slate-950"
          id="contracted-title"
        >
          Contratado (dados da pessoa que realizará o serviço)
        </h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <TextField
            error={fieldErrors?.contractedName}
            label="Nome do contratado"
            name="contractedName"
          />
          <TextField
            error={fieldErrors?.contractedDocument}
            label="CPF/CNPJ do contratado"
            name="contractedDocument"
          />
          <div className="sm:col-span-2">
            <TextField
              error={fieldErrors?.contractedAddress}
              label="Endereço do contratado"
              name="contractedAddress"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="contract-details-title">
        <h2
          className="text-lg font-semibold text-slate-950"
          id="contract-details-title"
        >
          Dados do contrato
        </h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <TextField
              description="Ex.: pintura de uma casa, instalação de ar-condicionado, criação de um site, aulas particulares ou consultoria."
              error={fieldErrors?.contractObject}
              label="Qual é o serviço?"
              name="contractObject"
            />
          </div>
          <TextField
            description="Ex.: 1500"
            error={fieldErrors?.value}
            inputMode="decimal"
            label="Qual é o valor do serviço?"
            name="value"
          />
          <TextField
            error={fieldErrors?.startDate}
            label="Data de início"
            name="startDate"
            type="date"
          />
          <TextField
            description="Ex.: serviço único em 15 dias; 1 vez por semana durante 3 meses; mensal por 12 meses."
            error={fieldErrors?.term}
            label="Qual é a duração ou frequência do serviço?"
            name="term"
          />
        </div>
      </section>
    </fieldset>
  );
}

type TextFieldProps = Readonly<{
  description?: string;
  error?: string;
  inputMode?: "decimal";
  label: string;
  name: string;
  type?: "date" | "text";
}>;

function TextField({
  description,
  error,
  inputMode,
  label,
  name,
  type = "text",
}: TextFieldProps) {
  const errorId = `${name}-error`;

  return (
    <div>
      <label className="text-sm font-medium text-slate-800" htmlFor={name}>
        {label}
      </label>
      <input
        aria-describedby={
          [description ? `${name}-description` : undefined, error ? errorId : undefined]
            .filter(Boolean)
            .join(" ") || undefined
        }
        aria-invalid={Boolean(error)}
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200"
        id={name}
        inputMode={inputMode}
        name={name}
        required
        type={type}
      />
      {description ? (
        <p className="mt-2 text-sm text-slate-600" id={`${name}-description`}>
          {description}
        </p>
      ) : null}
      {error ? (
        <p className="mt-2 text-sm text-red-700" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
