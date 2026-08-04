import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

import type { SupabaseClient } from "@supabase/supabase-js";

const requireModule = createRequire(import.meta.url);
const registerHooks = Reflect.get(requireModule("node:module"), "registerHooks");

if (typeof registerHooks === "function") {
  registerHooks({
    resolve(
      specifier: string,
      context: unknown,
      nextResolve: (specifier: string, context: unknown) => unknown,
    ) {
      if (specifier === "../../../auth/server") {
        return {
          format: "module",
          shortCircuit: true,
          url: "data:text/javascript,export async function createReadOnlyAuthClient() {}",
        };
      }

      if (specifier.startsWith(".") && !specifier.endsWith(".ts")) {
        return nextResolve(`${specifier}.ts`, context);
      }

      return nextResolve(specifier, context);
    },
  });
}

const {
  SupabaseContractRepository,
}: typeof import("./supabase-contract-repository") = requireModule(
  "./supabase-contract-repository.ts",
);

const legacyRow = {
  conteudo: "Conteúdo legado",
  created_at: "2026-07-29T10:00:00.000Z",
  id: "legacy-contract",
  tipo: "services",
  titulo: "Prestação de Serviços",
  user_id: "user-1",
};

test("creates and reads a proposal with resolved document metadata", async () => {
  const row = {
    ...legacyRow,
    client_name: "Cliente Exemplo",
    contract_definition_id: "proposta-comercial-com-aceite",
    document_kind: "proposal",
    id: "proposal-1",
    profession_id: "electrician",
    profession_name: "Eletricista",
    provider_name: "Prestador Exemplo",
    service_id: "electrician-rcd-installation",
    service_ids: [
      "electrician-rcd-installation",
      "electrician-surge-protection-device-installation",
    ],
    service_name: "Instalação de DR",
    service_names: ["Instalação de DR", "Instalação de DPS"],
    titulo: "Proposta Comercial com Aceite",
  };
  const database = createDatabaseDouble(row);
  const repository = new SupabaseContractRepository(database.client);

  const saved = await repository.create({
    clientName: "Cliente Exemplo",
    content: "Conteúdo legado",
    contractDefinitionId: "proposta-comercial-com-aceite",
    documentKind: "proposal",
    professionId: "electrician",
    professionName: "Eletricista",
    providerName: "Prestador Exemplo",
    serviceId: "electrician-rcd-installation",
    serviceIds: [
      "electrician-rcd-installation",
      "electrician-surge-protection-device-installation",
    ],
    serviceName: "Instalação de DR",
    serviceNames: ["Instalação de DR", "Instalação de DPS"],
    title: "Proposta Comercial com Aceite",
    type: "services",
    userId: "user-1",
  });

  assert.deepEqual(database.inserted, {
    client_name: "Cliente Exemplo",
    conteudo: "Conteúdo legado",
    contract_definition_id: "proposta-comercial-com-aceite",
    document_kind: "proposal",
    profession_id: "electrician",
    profession_name: "Eletricista",
    provider_name: "Prestador Exemplo",
    service_id: "electrician-rcd-installation",
    service_ids: [
      "electrician-rcd-installation",
      "electrician-surge-protection-device-installation",
    ],
    service_name: "Instalação de DR",
    service_names: ["Instalação de DR", "Instalação de DPS"],
    tipo: "services",
    titulo: "Proposta Comercial com Aceite",
    user_id: "user-1",
  });
  assert.equal(saved.documentKind, "proposal");
  assert.equal(saved.serviceName, "Instalação de DR");
  assert.deepEqual(saved.serviceNames, ["Instalação de DR", "Instalação de DPS"]);
  assert.equal(saved.clientName, "Cliente Exemplo");
  assert.equal(saved.providerName, "Prestador Exemplo");
});

test("accepts optional document metadata independently", async () => {
  const database = createDatabaseDouble({
    ...legacyRow,
    document_kind: "proposal",
    service_name: "Instalação de DR",
  });
  const repository = new SupabaseContractRepository(database.client);

  const contracts = await repository.listByUser("user-1");

  assert.equal(contracts[0]?.documentKind, "proposal");
  assert.equal(contracts[0]?.serviceName, "Instalação de DR");
  assert.equal(contracts[0]?.professionName, undefined);
});

test("keeps rows created before the metadata migration readable", async () => {
  const database = createDatabaseDouble(legacyRow);
  const repository = new SupabaseContractRepository(database.client);

  const contract = await repository.findByIdForUser(
    "legacy-contract",
    "user-1",
  );

  assert.deepEqual(contract, {
    content: "Conteúdo legado",
    createdAt: "2026-07-29T10:00:00.000Z",
    id: "legacy-contract",
    title: "Prestação de Serviços",
    type: "services",
    userId: "user-1",
  });
});

test("rejects inconsistent persisted service lists", async () => {
  const database = createDatabaseDouble({
    ...legacyRow,
    service_ids: ["service-a", "service-b"],
    service_names: ["Serviço A"],
  });
  const repository = new SupabaseContractRepository(database.client);

  await assert.rejects(repository.listByUser("user-1"));
});

function createDatabaseDouble(row: Record<string, unknown>) {
  const state: { inserted?: unknown } = {};
  const response = { data: row, error: null };
  const query = {
    eq: () => query,
    insert: (value: unknown) => {
      state.inserted = value;
      return query;
    },
    maybeSingle: async () => response,
    order: async () => ({ data: [row], error: null }),
    select: () => query,
    single: async () => response,
  };
  const client = {
    from: () => query,
  } as unknown as SupabaseClient;

  return {
    client,
    get inserted() {
      return state.inserted;
    },
  };
}
