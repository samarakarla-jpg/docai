import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";
import type { ServiceDefinition } from "../../domain/service-definition";

const requireModule = createRequire(import.meta.url);
const {
  createInMemoryServiceDefinitionSource,
}: typeof import("./in-memory-service-definition-source") = requireModule(
  "./in-memory-service-definition-source.ts",
);

const definitions: readonly ServiceDefinition[] = [
  {
    active: true,
    category: { id: "installation", name: "Instalação" },
    description: "Serviço oficial ativo.",
    id: "official-service",
    kind: "standard",
    name: "Serviço oficial",
    origin: "official",
    profession: { id: "electrician", name: "Eletricista" },
    supportedDocuments: ["budget", "warranty"],
  },
  {
    active: false,
    description: "Serviço personalizado inativo.",
    freeTextPolicy: { guidance: "Revisar.", reviewRequired: true },
    id: "custom-service-id",
    kind: "custom",
    name: "Serviço personalizado",
    origin: "custom",
    owner: { id: "user-1", type: "user" },
    profession: { id: "electrician", name: "Eletricista" },
    supportedDocuments: ["proposal"],
  },
];

describe("in-memory service definition source", () => {
  it("returns definitions by ID from an isolated snapshot", async () => {
    const mutableDefinitions = [...definitions];
    const source = createInMemoryServiceDefinitionSource(
      "test-source",
      mutableDefinitions,
    );
    mutableDefinitions.length = 0;

    assert.equal((await source.getById("official-service"))?.name, "Serviço oficial");
    assert.equal(await source.getById("unknown-service"), undefined);
    assert.equal((await source.list()).length, 2);
  });

  it("filters definitions using the catalog query", async () => {
    const source = createInMemoryServiceDefinitionSource(
      "test-source",
      definitions,
    );

    assert.equal((await source.list({ active: false })).length, 1);
    assert.equal((await source.list({ categoryId: "installation" })).length, 1);
    assert.equal((await source.list({ kind: "standard" })).length, 1);
    assert.equal((await source.list({ origin: "official" })).length, 1);
    assert.equal((await source.list({ professionId: "electrician" })).length, 2);
    assert.equal((await source.list({ supportedDocument: "warranty" })).length, 1);
  });
});
