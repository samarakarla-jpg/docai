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

function contentWithoutField(
  type: ContractType,
  field: string,
): Record<string, unknown> {
  const content = contentFor(type) as unknown as Record<string, unknown>;
  const { [field]: _removed, ...remaining } = content;
  return remaining;
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
    const { parties: _parties, ...contentWithoutParties } = contentFor("sale");
    const invalidRequests: Array<[string, unknown]> = [
      ["null input", null],
      ["non-object input", "request"],
      ["invalid contract type", { ...requestFor("sale"), type: "other" }],
      ["empty id", { ...requestFor("sale"), id: "" }],
      ["empty title", { ...requestFor("sale"), title: " " }],
      ["empty template id", { ...requestFor("sale"), templateId: "" }],
      ["missing content", { ...requestFor("sale"), content: undefined }],
      [
        "mismatched content type",
        { ...requestFor("sale"), content: contentFor("rental") },
      ],
      [
        "parties not an array",
        { ...requestFor("sale"), content: { ...contentFor("sale"), parties: {} } },
      ],
      [
        "missing parties",
        { ...requestFor("sale"), content: contentWithoutParties },
      ],
      [
        "party is not an object",
        { ...requestFor("sale"), content: { ...contentFor("sale"), parties: [null] } },
      ],
      [
        "unnamed party",
        {
          ...requestFor("sale"),
          content: { ...contentFor("sale"), parties: [{ name: "" }] },
        },
      ],
      [
        "empty services scope",
        {
          ...requestFor("services"),
          content: { ...contentFor("services"), scope: "" },
        },
      ],
      [
        "missing services scope",
        {
          ...requestFor("services"),
          content: contentWithoutField("services", "scope"),
        },
      ],
      [
        "empty services compensation",
        {
          ...requestFor("services"),
          content: { ...contentFor("services"), compensation: "" },
        },
      ],
      [
        "empty services term",
        {
          ...requestFor("services"),
          content: { ...contentFor("services"), term: "" },
        },
      ],
      [
        "empty sale subject",
        { ...requestFor("sale"), content: { ...contentFor("sale"), subject: "" } },
      ],
      [
        "missing sale subject",
        {
          ...requestFor("sale"),
          content: contentWithoutField("sale", "subject"),
        },
      ],
      [
        "empty sale price",
        { ...requestFor("sale"), content: { ...contentFor("sale"), price: "" } },
      ],
      [
        "empty sale delivery",
        { ...requestFor("sale"), content: { ...contentFor("sale"), delivery: "" } },
      ],
      [
        "empty rental property",
        {
          ...requestFor("rental"),
          content: { ...contentFor("rental"), property: "" },
        },
      ],
      [
        "missing rental property",
        {
          ...requestFor("rental"),
          content: contentWithoutField("rental", "property"),
        },
      ],
      [
        "empty rental rent",
        { ...requestFor("rental"), content: { ...contentFor("rental"), rent: "" } },
      ],
      [
        "empty rental term",
        { ...requestFor("rental"), content: { ...contentFor("rental"), term: "" } },
      ],
      [
        "empty loan subject",
        { ...requestFor("loan"), content: { ...contentFor("loan"), subject: "" } },
      ],
      [
        "empty loan repayment",
        {
          ...requestFor("loan"),
          content: { ...contentFor("loan"), repayment: "" },
        },
      ],
      [
        "missing loan repayment",
        {
          ...requestFor("loan"),
          content: contentWithoutField("loan", "repayment"),
        },
      ],
      [
        "empty loan term",
        { ...requestFor("loan"), content: { ...contentFor("loan"), term: "" } },
      ],
    ];

    for (const [name, input] of invalidRequests) {
      let calls = 0;
      const service = new RequestContractCreation({
        creationService: {
          create: async () => {
            calls += 1;
            return creationResult("sale");
          },
        },
      });

      const result = await service.execute(input);

      assert.equal(result.success, false, name);
      if (!result.success) {
        assert.equal(result.error.code, "INVALID_INPUT", name);
      }
      assert.equal(calls, 0, name);
    }
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
