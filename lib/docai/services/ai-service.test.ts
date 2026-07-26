import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

import type { AiAdapter } from "../../integrations/ai";
import type { ContractContent } from "../domain/contract-models";

const requireModule = createRequire(import.meta.url);
const { AIService, AIServiceError }: typeof import("./ai-service") =
  requireModule("./ai-service.ts");

const content: ContractContent = {
  type: "sale",
  parties: [{ name: "Seller" }, { name: "Buyer" }],
  subject: "Equipment",
  price: "100",
  delivery: "Immediate",
};

describe("AIService", () => {
  it("uses the generic adapter without a provider dependency", async () => {
    let received: unknown;
    const adapter: AiAdapter = {
      status: "enabled",
      generate: async (request) => {
        received = request.input;
        return { output: "draft" };
      },
    };
    const service = new AIService(adapter);

    const result = await service.generateContract({ type: "sale", content });

    assert.equal(result.type, "sale");
    assert.equal(result.output, "draft");
    assert.deepEqual(received, { type: "sale", content });
  });

  it("translates adapter failures without exposing provider details", async () => {
    const service = new AIService({
      status: "enabled",
      generate: async () => {
        throw new Error("private provider detail");
      },
    });

    await assert.rejects(
      service.generateContract({ type: "sale", content }),
      (error: unknown) => {
        assert.ok(error instanceof AIServiceError);
        assert.equal(error.code, "ADAPTER_FAILURE");
        assert.doesNotMatch(error.message, /private provider detail/);
        return true;
      },
    );
  });
});
