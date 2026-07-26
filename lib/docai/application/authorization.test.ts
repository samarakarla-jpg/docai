import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

const requireModule = createRequire(import.meta.url);
const {
  assertAuthenticated,
  assertOwner,
  AuthorizationError,
}: typeof import("./authorization") = requireModule("./authorization.ts");
import type { UserContext } from "./user-context";

const context: UserContext = {
  authenticated: true,
  user: {
    id: "user-1",
    authProvider: "supabase",
  },
};

describe("DocAI authorization", () => {
  it("accepts an authenticated context", () => {
    assert.equal(assertAuthenticated(context), context);
  });

  it("rejects an unauthenticated context", () => {
    assert.throws(
      () => assertAuthenticated(null),
      (error: unknown) => {
        assert.ok(error instanceof AuthorizationError);
        assert.equal(error.code, "UNAUTHENTICATED");
        return true;
      },
    );
  });

  it("allows the authenticated owner", () => {
    assert.doesNotThrow(() => assertOwner(context, "user-1"));
  });

  it("hides cross-account resources as not found", () => {
    assert.throws(
      () => assertOwner(context, "user-2"),
      (error: unknown) => {
        assert.ok(error instanceof AuthorizationError);
        assert.equal(error.code, "RESOURCE_NOT_FOUND");
        assert.equal(error.message, "The requested resource was not found.");
        return true;
      },
    );
  });
});
