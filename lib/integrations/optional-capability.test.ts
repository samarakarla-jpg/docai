import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

const requireModule = createRequire(import.meta.url);
const {
  createAdapterFailureError,
  createInvalidConfigurationError,
  OptionalCapabilityError,
  resolveOptionalCapabilityStatus,
}: typeof import("./optional-capability") = requireModule(
  "./optional-capability.ts",
);

describe("optional capability state", () => {
  it("is disabled unless explicitly enabled", () => {
    assert.equal(resolveOptionalCapabilityStatus({}), "disabled");
    assert.equal(
      resolveOptionalCapabilityStatus({ enabled: false, configured: true }),
      "disabled",
    );
    assert.equal(
      resolveOptionalCapabilityStatus({ enabled: true, configured: false }),
      "invalid",
    );
    assert.equal(
      resolveOptionalCapabilityStatus({ enabled: true, configured: true }),
      "enabled",
    );
  });

  it("uses stable errors without exposing adapter details", () => {
    const invalid = createInvalidConfigurationError("AI");
    assert.ok(invalid instanceof OptionalCapabilityError);
    assert.equal(invalid.code, "INVALID_CONFIGURATION");
    assert.equal(invalid.message, "AI capability configuration is invalid.");

    const internalFailure = new Error("private adapter detail");
    const failure = createAdapterFailureError("Storage", internalFailure);
    assert.equal(failure.code, "ADAPTER_FAILURE");
    assert.equal(failure.message, "Storage capability failed.");
    assert.equal(failure.cause, internalFailure);
    assert.doesNotMatch(failure.message, /private adapter detail/);
  });
});
