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
  const singleProfession =
    professions.length === 1 ? professions[0] : undefined;
  const [professionId, setProfessionId] = useState(singleProfession?.id ?? "");
  const [serviceId, setServiceId] = useState("");
  const [selectedServiceIds, setSelectedServiceIds] = useState<
    readonly string[]
  >([]);
  const availableServices = professionId
    ? services.filter((service) => service.professionId === professionId)
    : [];
  const selectedService = availableServices.find(
    (service) => service.id === serviceId,
  );
  const selectedServices = selectedServiceIds.flatMap((selectedId) => {
    const service = services.find((candidate) => candidate.id === selectedId);
    return service ? [service] : [];
  });

  function addSelectedService() {
    if (!serviceId || selectedServiceIds.includes(serviceId)) return;

    setSelectedServiceIds([...selectedServiceIds, serviceId]);
    setServiceId("");
  }

  function removeSelectedService(selectedId: string) {
    setSelectedServiceIds(
      selectedServiceIds.filter((candidate) => candidate !== selectedId),
    );
  }

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
      {singleProfession ? (
        <input name="profession" type="hidden" value={singleProfession.id} />
      ) : null}
      {selectedServiceIds.map((selectedId) => (
        <input key={selectedId} name="service" type="hidden" value={selectedId} />
      ))}

      <fieldset>
        <legend className="text-lg font-semibold text-slate-950">
          Quais serviços serão realizados?
        </legend>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Escolha um serviço por vez e clique em Adicionar.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {!singleProfession ? (
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
                  setSelectedServiceIds([]);
                }}
                required
                value={professionId}
              >
                <option value="">Escolha sua profissão</option>
                {professions.map((profession) => (
                  <option key={profession.id} value={profession.id}>
                    {profession.name}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <div className={singleProfession ? "sm:col-span-2" : undefined}>
            <label
              className="text-sm font-medium text-slate-800"
              htmlFor="service"
            >
              Serviço
            </label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-stretch">
              <select
                className="min-w-0 w-full flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
                disabled={!professionId}
                id="service"
                onChange={(event) => setServiceId(event.target.value)}
                value={serviceId}
              >
                <option value="">
                  {professionId
                    ? "Escolha um serviço"
                    : "Escolha primeiro sua profissão"}
                </option>
                {availableServices.map((service) => (
                  <option
                    disabled={selectedServiceIds.includes(service.id)}
                    key={service.id}
                    value={service.id}
                  >
                    {service.categoryName
                      ? `${service.categoryName} — ${service.name}`
                      : service.name}
                  </option>
                ))}
              </select>
              <button
                className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 sm:w-auto"
                disabled={!selectedService}
                onClick={addSelectedService}
                type="button"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
        {selectedService ? (
          <p className="mt-5 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            {selectedService.description}
          </p>
        ) : null}
      </fieldset>

      <section aria-labelledby="selected-services-title" className="mt-8">
        <h2
          className="text-base font-semibold text-slate-950"
          id="selected-services-title"
        >
          Serviços selecionados
        </h2>
        {selectedServices.length > 0 ? (
          <ul className="mt-3 space-y-3">
            {selectedServices.map((service, index) => (
              <li
                className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4"
                key={service.id}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {index + 1}. {service.name}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {service.description}
                  </p>
                </div>
                <button
                  className="shrink-0 rounded-md px-2 py-1 text-sm font-semibold text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={() => removeSelectedService(service.id)}
                  type="button"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-600">
            Nenhum serviço selecionado.
            <br />
            Escolha um serviço acima e clique em Adicionar.
          </p>
        )}
      </section>

      <button
        className="mt-8 w-full rounded-lg bg-slate-950 px-4 py-3 font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={!professionId || selectedServiceIds.length === 0}
        type="submit"
      >
        Continuar para os detalhes
      </button>
    </form>
  );
}
