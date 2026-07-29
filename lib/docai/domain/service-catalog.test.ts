import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";
import type { ServiceDefinition } from "./service-definition";

const requireModule = createRequire(import.meta.url);
const {
  DuplicateServiceDefinitionIdError,
  ServiceCatalog,
}: typeof import("./service-catalog") = requireModule("./service-catalog.ts");

const definition: ServiceDefinition = {
  active: true,
  category: { id: "repairs", name: "Reparos" },
  description: "Serviço de teste.",
  id: "test-service",
  kind: "standard",
  name: "Serviço de teste",
  origin: "official",
  profession: { id: "test-profession", name: "Profissão" },
  supportedDocuments: ["budget"],
};

describe("service catalog", () => {
  it("aggregates independent sources", async () => {
    const catalog = new ServiceCatalog([
      source("first", [definition]),
      source("second", [{ ...definition, id: "another-service" }]),
    ]);

    assert.deepEqual(
      (await catalog.list()).map((service) => service.id),
      ["test-service", "another-service"],
    );
    assert.equal((await catalog.getById(" test-service "))?.id, definition.id);
    assert.equal(await catalog.getById("   "), undefined);
  });

  it("rejects ID collisions across independent sources", async () => {
    const catalog = new ServiceCatalog([
      source("first", [definition]),
      source("second", [definition]),
    ]);

    await assert.rejects(
      () => catalog.list(),
      DuplicateServiceDefinitionIdError,
    );
    await assert.rejects(
      () => catalog.getById(definition.id),
      DuplicateServiceDefinitionIdError,
    );
  });
});

function source(id: string, definitions: readonly ServiceDefinition[]) {
  return {
    id,
    getById: async (definitionId: string) =>
      definitions.find((item) => item.id === definitionId),
    list: async () => definitions,
  };
}
