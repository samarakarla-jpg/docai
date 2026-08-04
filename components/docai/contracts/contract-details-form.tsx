"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import {
  generateContract,
  type GenerateContractActionState,
} from "@/app/actions/generate-contract";
import { ContractForm } from "@/components/docai/contracts/contract-form";
import type { ContractType } from "@/lib/docai/domain/contract-models";
import type { ContractFormSchema } from "@/lib/docai/domain/contract-definition";
import type { SupportedServiceDocument } from "@/lib/docai/domain/service-definition";

type ContractDetailsFormProps = Readonly<{
  formSchema: ContractFormSchema;
  model?: Readonly<{
    categoryName: string;
    categorySlug: string;
    id: string;
    name: string;
  }>;
  services?: readonly Readonly<{
    document: SupportedServiceDocument;
    id: string;
    name: string;
    professionId: string;
    professionName: string;
  }>[];
  type: ContractType;
}>;

const INITIAL_STATE: GenerateContractActionState = {
  status: "idle",
};

export function ContractDetailsForm({
  formSchema,
  model,
  services,
  type,
}: ContractDetailsFormProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    generateContract,
    INITIAL_STATE,
  );

  useEffect(() => {
    if (state.status === "success" && state.result) {
      router.push(`/dashboard/contracts/${state.result.id}`);
    }
  }, [router, state]);
  const submitLabel = pending
    ? services
      ? "Criando sua proposta..."
      : "Gerando contrato..."
    : services
      ? "Criar proposta"
      : "Gerar contrato";

  return (
    <form
      action={formAction}
      className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <input name="type" type="hidden" value={type} />
      {model ? (
        <>
          <input
            name="definitionCategory"
            type="hidden"
            value={model.categorySlug}
          />
          <input name="definitionId" type="hidden" value={model.id} />
        </>
      ) : null}
      {services ? (
        <>
          <input
            name="serviceDocument"
            type="hidden"
            value={services[0]?.document}
          />
          <input
            name="serviceProfessionId"
            type="hidden"
            value={services[0]?.professionId}
          />
          {services.map((service) => (
            <input
              key={service.id}
              name="serviceId"
              type="hidden"
              value={service.id}
            />
          ))}
        </>
      ) : null}
      {model ? (
        <section
          aria-labelledby="selected-library-model-title"
          className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-4"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-800">
            {services ? "Serviços selecionados" : "Modelo selecionado"}
          </p>
          <h2
            className="mt-1 text-lg font-semibold text-slate-950"
            id="selected-library-model-title"
          >
            {services
              ? services.map((service) => service.name).join(" · ")
              : model.name}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {services
              ? `${services.length} ${services.length === 1 ? "serviço selecionado" : "serviços selecionados"} · ${services[0]?.professionName}`
              : `Categoria: ${model.categoryName}`}
          </p>
        </section>
      ) : null}
      <ContractForm
        disabled={pending}
        fieldErrors={state.fieldErrors}
        schema={formSchema}
        sectionTitleOverrides={
          services
            ? {
                contractor: "Cliente — quem contrata o serviço",
                "contract-details": "Dados da proposta",
                contracted: "Eletricista — quem fará o serviço",
                "service-form-general": "Local e orientações do serviço",
              }
            : undefined
        }
        type={type}
      />
      {state.message ? (
        <p
          className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-800"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}
      <button
        className="mt-8 w-full rounded-lg bg-slate-950 px-4 py-3 font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pending}
        type="submit"
      >
        {submitLabel}
      </button>
    </form>
  );
}
