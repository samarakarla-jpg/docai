import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

const requireModule = createRequire(import.meta.url);
const { CONTRACT_TYPES }: typeof import("./contract-models") = requireModule(
  "./contract-models.ts",
);

describe("DocAI contract models", () => {
  it("defines the four approved contract types", () => {
    assert.deepEqual(CONTRACT_TYPES, ["services", "sale", "rental", "loan"]);
  });
});
