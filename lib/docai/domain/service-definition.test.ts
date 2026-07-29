import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

const requireModule = createRequire(import.meta.url);
const {
  SUPPORTED_SERVICE_DOCUMENTS,
  createCustomServiceDefinition,
}: typeof import("./service-definition") = requireModule(
  "./service-definition.ts",
);

describe("service definition", () => {
  it("creates custom services with secure unique identifiers and ownership", () => {
    const input = {
      category: { id: "repairs", name: "Reparos" },
      defaultPrice: { amountInMinorUnits: 15_000, currency: "BRL" },
      description: "  Serviço personalizado para o imóvel.  ",
      metadata: { imported: false, tags: ["residencial"] },
      name: "  Ajuste elétrico personalizado  ",
      notes: ["Confirmar o acesso ao local."],
      owner: { id: "user-123", type: "user" as const },
      profession: { id: "electrician", name: "Eletricista" },
    };

    const first = createCustomServiceDefinition(input);
    const second = createCustomServiceDefinition(input);

    assert.match(
      first.id,
      /^custom-service-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
    assert.notEqual(first.id, second.id);
    assert.equal(first.origin, "custom");
    assert.equal(first.kind, "custom");
    assert.deepEqual(first.checklist, { mode: "generic-only" });
    assert.equal(first.active, true);
    assert.equal(first.name, "Ajuste elétrico personalizado");
    assert.equal(first.description, "Serviço personalizado para o imóvel.");
    assert.deepEqual(first.owner, { id: "user-123", type: "user" });
    assert.deepEqual(first.defaultPrice, {
      amountInMinorUnits: 15_000,
      currency: "BRL",
    });
    assert.deepEqual(first.supportedDocuments, SUPPORTED_SERVICE_DOCUMENTS);
    assert.equal(first.freeTextPolicy.reviewRequired, true);
  });

  it("supports organization ownership and an optional category", () => {
    const definition = createCustomServiceDefinition({
      description: "Serviço cadastrado pela organização.",
      name: "Serviço interno",
      owner: { id: "organization-456", type: "organization" },
      profession: { id: "electrician", name: "Eletricista" },
      supportedDocuments: ["budget", "proposal"],
    });

    assert.equal(definition.category, undefined);
    assert.deepEqual(definition.owner, {
      id: "organization-456",
      type: "organization",
    });
    assert.deepEqual(definition.supportedDocuments, ["budget", "proposal"]);
  });

  it("rejects invalid custom service identity and price data", () => {
    assert.throws(
      () =>
        createCustomServiceDefinition({
          description: "Descrição válida.",
          name: "   ",
          owner: { id: "user-123", type: "user" },
          profession: { id: "electrician", name: "Eletricista" },
        }),
      TypeError,
    );
    assert.throws(
      () =>
        createCustomServiceDefinition({
          defaultPrice: { amountInMinorUnits: 10.5, currency: "BRL" },
          description: "Descrição válida.",
          name: "Serviço válido",
          owner: { id: "user-123", type: "user" },
          profession: { id: "electrician", name: "Eletricista" },
        }),
      TypeError,
    );
  });
});
