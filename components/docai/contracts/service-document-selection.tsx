"use client";

import { useState } from "react";

import type { ContractType } from "@/lib/docai/domain/contract-models";

type ServiceDocumentSelectionProps = Readonly<{
  definition: Readonly<{
    categorySlug: string;
    contractType: ContractType;
    id: string;
    name: string;
  }>;
  professions: readonly Readonly<{
    id: string;
    name: string;
  }>[];
  services: readonly Readonly<{
    categoryName?: string;
    description: string;
    id: string;
    name: string;
    professionId: string;
  }>[];
}>;

export function ServiceDocumentSelection({
  definition,
  professions,
  services,
}: ServiceDocumentSelectionProps) {
  const [professionId, setProfessionId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const availableServices = professionId
    ? services.filter((service) => service.professionId === professionId)
    : [];
  const selectedService = availableServices.find(
    (service) => service.id === serviceId,
  );

  return (
    <form
      action={`/dashboard/contracts/new/${definition.contractType}`}
      className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      method="get"
    >
      <input name="category" type="hidden" value={definition.categorySlug} />
      <input name="document" type="hidden" value="proposal" />
      <input name="model" type="hidden" value={definition.id} />
      <input name="name" type="hidden" value={definition.name} />

      <fieldset>
        <legend className="text-lg font-semibold text-slate-950">
          Qual serviço você quer propor?
        </legend>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          A profissão e o serviço ajustam automaticamente as perguntas da
          proposta.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label
              className="text-sm font-medium text-slate-800"
              htmlFor="profession"
            >
              Profissão
            </label>
            <select
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200"
              id="profession"
              name="profession"
              onChange={(event) => {
                setProfessionId(event.target.value);
                setServiceId("");
              }}
              required
              value={professionId}
            >
              <option value="">Selecione sua profissão</option>
              {professions.map((profession) => (
                <option key={profession.id} value={profession.id}>
                  {profession.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="text-sm font-medium text-slate-800"
              htmlFor="service"
            >
              Serviço
            </label>
            <select
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
              disabled={!professionId}
              id="service"
              name="service"
              onChange={(event) => setServiceId(event.target.value)}
              required
              value={serviceId}
            >
              <option value="">
                {professionId
                  ? "Selecione o serviço"
                  : "Selecione primeiro a profissão"}
              </option>
              {availableServices.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.categoryName
                    ? `${service.categoryName} — ${service.name}`
                    : service.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {selectedService ? (
          <p className="mt-5 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            {selectedService.description}
          </p>
        ) : null}
      </fieldset>

      <button
        className="mt-8 w-full rounded-lg bg-slate-950 px-4 py-3 font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={!professionId || !serviceId}
        type="submit"
      >
        Continuar proposta
      </button>
    </form>
  );
}
