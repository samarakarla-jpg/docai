import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

import type {
  ContractContent,
  ContractType,
} from "../domain/contract-models";
import type {
  ContractCreationResult,
  CreateContractInput,
} from "./contract-creation-service";

const requireModule = createRequire(import.meta.url);
const {
  RequestContractCreation,
}: typeof import("./request-contract-creation") = requireModule(
  "./request-contract-creation.ts",
);

function contentFor(type: ContractType): ContractContent {
  const parties = [{ name: "First party" }, { name: "Second party" }];

  switch (type) {
    case "services":
      return { type, parties, scope: "Consulting", compensation: "Fixed", term: "One year" };
    case "sale":
      return { type, parties, subject: "Equipment", price: "100", delivery: "Immediate" };
    case "rental":
      return { type, parties, property: "Office", rent: "1000", term: "One year" };
    case "loan":
      return { type, parties, subject: "Funds", repayment: "Monthly", term: "One year" };
  }
}

function requestFor(type: ContractType): Record<string, unknown> {
  return {
    id: `${type}-draft`,
    title: `${type} draft`,
    type,
    templateId: `${type}-template`,
    content: contentFor(type),
  };
}

function creationResult(type: ContractType): ContractCreationResult {
  return {
    draft: {
      id: `${type}-draft`,
      title: `${type} draft`,
      content: contentFor(type),
      contractType: type,
    },
    generation: { type, output: `${type} output` },
    template: {
      id: `${type}-template`,
      name: `${type} template`,
      content: {
        type,
        title: `${type} template`,
        instructions: "Generate a neutral draft.",
      },
    },
  };
}

describe("RequestContractCreation", () => {
  it("accepts all four models, transforms input, and delegates once", async () => {
    for (const type of ["services", "sale", "rental", "loan"] as const) {
      const received: CreateContractInput[] = [];
      const service = new RequestContractCreation({
        creationService: {
          create: async (command) => {
            received.push(command);
            return creationResult(type);
          },
        },
      });

      const result = await service.execute(requestFor(type));

      assert.equal(result.success, true);
      if (result.success) {
        assert.equal(result.data.draft.contractType, type);
      }
      assert.equal(received.length, 1);
      assert.deepEqual(received[0], requestFor(type));
    }
  });

  it("rejects invalid input before calling the application service", async () => {
    let calls = 0;
    const service = new RequestContractCreation({
      creationService: {
        create: async () => {
          calls += 1;
          return creationResult("sale");
        },
      },
    });

    const result = await service.execute({
      ...requestFor("sale"),
      content: { ...contentFor("sale"), parties: [] },
    });

    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.error.code, "INVALID_INPUT");
    }
    assert.equal(calls, 0);
  });

  it("returns a stable service error without exposing internal details", async () => {
    const service = new RequestContractCreation({
      creationService: {
        create: async () => {
          throw new Error("private infrastructure detail");
        },
      },
    });

    const result = await service.execute(requestFor("sale"));

    assert.equal(result.success, false);
    if (!result.success) {
      assert.equal(result.error.code, "INTERNAL_FAILURE");
      assert.equal(result.error.message, "Unable to request contract creation.");
      assert.doesNotMatch(result.error.message, /private infrastructure detail/);
    }
  });
});
