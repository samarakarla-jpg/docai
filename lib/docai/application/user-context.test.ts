import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

const requireModule = createRequire(import.meta.url);
const {
  createUserContext,
  UserContextError,
}: typeof import("./user-context") = requireModule("./user-context.ts");

describe("DocAI user context", () => {
  it("creates a minimal context from a valid identity", () => {
    const context = createUserContext({
      id: "user-1",
      authProvider: "supabase",
      email: "person@example.com",
    });

    assert.deepEqual(context, {
      authenticated: true,
      user: {
        id: "user-1",
        authProvider: "supabase",
        email: "person@example.com",
      },
    });
  });

  it("rejects a missing identity without creating an anonymous context", () => {
    assert.throws(
      () => createUserContext(null),
      (error: unknown) => {
        assert.ok(error instanceof UserContextError);
        assert.equal(error.code, "UNAUTHENTICATED");
        return true;
      },
    );
  });

  it("rejects invalid identity values", () => {
    assert.throws(
      () =>
        createUserContext({
          id: " ",
          authProvider: "supabase",
        }),
      (error: unknown) => {
        assert.ok(error instanceof UserContextError);
        assert.equal(error.code, "INVALID_IDENTITY");
        return true;
      },
    );
  });

  it("does not include credentials or provider details in the context", () => {
    const context = createUserContext({
      id: "user-1",
      authProvider: "supabase",
    });

    assert.deepEqual(Object.keys(context.user).sort(), ["authProvider", "id"]);
  });
});
