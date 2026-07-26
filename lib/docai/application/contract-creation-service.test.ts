import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

import type {
  ContractContent,
  ContractType,
} from "../domain/contract-models";
import type { ContractDraft } from "../services/contract-service";
import type { ContractTemplate } from "../services/template-service";

const requireModule = createRequire(import.meta.url);
const {
  ContractCreationError,
  ContractCreationService,
}: typeof import("./contract-creation-service") = requireModule(
  "./contract-creation-service.ts",
);

function contentFor(type: ContractType): ContractContent {
  const parties = [{ name: "First party" }, { name: "Second party" }];

  switch (type) {
    case "services":
      return {
        type,
        parties,
        scope: "Consulting",
        compensation: "Fixed fee",
        term: "One year",
      };
    case "sale":
      return {
        type,
        parties,
        subject: "Equipment",
        price: "100",
        delivery: "Immediate",
      };
    case "rental":
      return {
        type,
        parties,
        property: "Office",
        rent: "1000",
        term: "One year",
      };
    case "loan":
      return {
        type,
        parties,
        subject: "Funds",
        repayment: "Monthly",
        term: "One year",
      };
  }
}

function inputFor(type: ContractType) {
  return {
    id: `${type}-draft`,
    title: `${type} draft`,
    type,
    templateId: `${type}-template`,
    content: contentFor(type),
  };
}

function templateFor(type: ContractType): ContractTemplate {
  return {
    id: `${type}-template`,
    name: `${type} template`,
    content: {
      type,
      title: `${type} template`,
      instructions: "Generate a neutral draft.",
    },
  };
}

function draftFor(type: ContractType): ContractDraft {
  return {
    id: `${type}-draft`,
    title: `${type} draft`,
    content: contentFor(type),
    contractType: type,
  };
}

describe("DocAI ContractCreationService", () => {
  it("creates a draft for each supported contract type in order", async () => {
    for (const type of ["services", "sale", "rental", "loan"] as const) {
      const events: string[] = [];
      const input = inputFor(type);
      const template = templateFor(type);
      const generation = { type, output: `${type} generated output` };
      const service = new ContractCreationService({
        templates: {
          getById: async (id) => {
            events.push(`template:${id}`);
            return template;
          },
        },
        generator: {
          generateContract: async (request) => {
            events.push(`generation:${request.type}`);
            assert.deepEqual(request.content, input.content);
            return generation;
          },
        },
        contracts: {
          createDraft: async (request) => {
            events.push(`creation:${request.id}`);
            assert.deepEqual(request.content, input.content);
            return draftFor(type);
          },
        },
      });

      const result = await service.create(input);

      assert.equal(result.draft.contractType, type);
      assert.deepEqual(result.generation, generation);
      assert.equal(result.template.id, template.id);
      assert.deepEqual(events, [
        `template:${input.templateId}`,
        `generation:${type}`,
        `creation:${input.id}`,
      ]);
    }
  });

  it("rejects invalid input before calling any dependency", async () => {
    const calls: string[] = [];
    const service = new ContractCreationService({
      templates: { getById: async () => { calls.push("template"); return templateFor("sale"); } },
      generator: { generateContract: async () => { calls.push("generation"); return { type: "sale", output: "draft" }; } },
      contracts: { createDraft: async () => { calls.push("creation"); return draftFor("sale"); } },
    });

    await assert.rejects(
      service.create({ ...inputFor("sale"), content: { ...contentFor("sale"), parties: [] } }),
      (error: unknown) => {
        assert.ok(error instanceof ContractCreationError);
        assert.equal(error.code, "INVALID_INPUT");
        return true;
      },
    );
    assert.deepEqual(calls, []);
  });

  it("rejects a template with a different contract type", async () => {
    const service = new ContractCreationService({
      templates: { getById: async () => templateFor("services") },
      generator: { generateContract: async () => ({ type: "sale", output: "draft" }) },
      contracts: { createDraft: async () => draftFor("sale") },
    });

    await assert.rejects(
      service.create(inputFor("sale")),
      (error: unknown) => {
        assert.ok(error instanceof ContractCreationError);
        assert.equal(error.code, "TEMPLATE_FAILURE");
        return true;
      },
    );
  });

  it("does not create a draft when generation fails", async () => {
    let created = false;
    const service = new ContractCreationService({
      templates: { getById: async () => templateFor("sale") },
      generator: { generateContract: async () => { throw new Error("adapter failure"); } },
      contracts: { createDraft: async () => { created = true; return draftFor("sale"); } },
    });

    await assert.rejects(
      service.create(inputFor("sale")),
      (error: unknown) => {
        assert.ok(error instanceof ContractCreationError);
        assert.equal(error.code, "GENERATION_FAILURE");
        return true;
      },
    );
    assert.equal(created, false);
  });

  it("returns a stable creation error when ContractService fails", async () => {
    const service = new ContractCreationService({
      templates: { getById: async () => templateFor("sale") },
      generator: { generateContract: async () => ({ type: "sale", output: "draft" }) },
      contracts: { createDraft: async () => { throw new Error("storage failure"); } },
    });

    await assert.rejects(
      service.create(inputFor("sale")),
      (error: unknown) => {
        assert.ok(error instanceof ContractCreationError);
        assert.equal(error.code, "CREATION_FAILURE");
        assert.equal(error.message, "Unable to create the contract draft.");
        return true;
      },
    );
  });
});
