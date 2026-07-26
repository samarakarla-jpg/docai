import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

import type {
  ContractContent,
  ContractTemplateContent,
  ContractType,
} from "../domain/contract-models";

const requireModule = createRequire(import.meta.url);
const {
  ContractGenerationError,
  ContractGenerationService,
}: typeof import("./contract-generation-service") = requireModule(
  "./contract-generation-service.ts",
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

function templateFor(type: ContractType): ContractTemplateContent {
  return {
    type,
    title: `${type} template`,
    instructions: "Generate a neutral draft.",
  };
}

function inputFor(type: ContractType) {
  return {
    type,
    content: contentFor(type),
    template: templateFor(type),
  };
}

describe("DocAI ContractGenerationService", () => {
  it("generates each supported contract type through the injected AI service", async () => {
    for (const type of ["services", "sale", "rental", "loan"] as const) {
      let received: unknown;
      const input = inputFor(type);
      const service = new ContractGenerationService({
        generateContract: async (request) => {
          received = request;
          return { type, output: `${type} generated output` };
        },
      });

      const result = await service.generate(input);

      assert.deepEqual(received, {
        type,
        content: input.content,
      });
      assert.deepEqual(result, {
        type,
        output: `${type} generated output`,
      });
    }
  });

  it("rejects a content type mismatch before calling AI", async () => {
    let called = false;
    const service = new ContractGenerationService({
      generateContract: async () => {
        called = true;
        return { type: "sale", output: "draft" };
      },
    });

    await assert.rejects(
      service.generate({
        ...inputFor("sale"),
        content: contentFor("rental"),
      }),
      (error: unknown) => {
        assert.ok(error instanceof ContractGenerationError);
        assert.equal(error.code, "INVALID_INPUT");
        return true;
      },
    );
    assert.equal(called, false);
  });

  it("rejects a template type mismatch before calling AI", async () => {
    let called = false;
    const service = new ContractGenerationService({
      generateContract: async () => {
        called = true;
        return { type: "sale", output: "draft" };
      },
    });

    await assert.rejects(
      service.generate({
        ...inputFor("sale"),
        template: templateFor("services"),
      }),
      /contract template type/,
    );
    assert.equal(called, false);
  });

  it("rejects invalid content and incomplete templates before calling AI", async () => {
    let called = false;
    const saleContent = contentFor("sale") as Extract<
      ContractContent,
      { type: "sale" }
    >;
    const service = new ContractGenerationService({
      generateContract: async () => {
        called = true;
        return { type: "sale", output: "draft" };
      },
    });

    await assert.rejects(
      service.generate({
        ...inputFor("sale"),
        content: { ...saleContent, price: " " },
      }),
      /empty required field/,
    );
    await assert.rejects(
      service.generate({
        ...inputFor("sale"),
        template: { ...templateFor("sale"), instructions: " " },
      }),
      /template title and instructions/,
    );
    assert.equal(called, false);
  });

  it("translates AI failures without exposing adapter details", async () => {
    const service = new ContractGenerationService({
      generateContract: async () => {
        throw new Error("private provider detail");
      },
    });

    await assert.rejects(
      service.generate(inputFor("sale")),
      (error: unknown) => {
        assert.ok(error instanceof ContractGenerationError);
        assert.equal(error.code, "AI_FAILURE");
        assert.equal(error.message, "Unable to generate the contract draft.");
        assert.doesNotMatch(error.message, /private provider detail/);
        return true;
      },
    );
  });

  it("preserves an unknown AI output without transforming it", async () => {
    const output = { sections: ["intro", "terms"] };
    const service = new ContractGenerationService({
      generateContract: async () => ({ type: "loan", output }),
    });

    const result = await service.generate(inputFor("loan"));

    assert.equal(result.output, output);
  });
});
