import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

const requireModule = createRequire(import.meta.url);
const {
  SupabaseAuthAdapter,
  SupabaseAuthError,
}: typeof import("./supabase-auth") = requireModule("./supabase-auth.ts");

describe("DocAI Supabase auth adapter", () => {
  it("maps valid claims to the internal identity", async () => {
    const adapter = new SupabaseAuthAdapter(async () => ({
      getClaims: async () => ({
        data: {
          claims: {
            sub: "user-1",
            email: "PERSON@EXAMPLE.COM",
          },
        },
      }),
    }));

    assert.deepEqual(await adapter.getIdentity(), {
      id: "user-1",
      authProvider: "supabase",
      email: "person@example.com",
    });
  });

  it("returns no identity when the session is absent", async () => {
    const adapter = new SupabaseAuthAdapter(async () => ({
      getClaims: async () => ({ data: { claims: {} } }),
    }));

    assert.equal(await adapter.getIdentity(), null);
  });

  it("translates provider errors without exposing details", async () => {
    const adapter = new SupabaseAuthAdapter(async () => ({
      getClaims: async () => ({ error: new Error("private provider detail") }),
    }));

    await assert.rejects(
      adapter.getIdentity(),
      (error: unknown) => {
        assert.ok(error instanceof SupabaseAuthError);
        assert.equal(error.code, "AUTH_UNAVAILABLE");
        assert.equal(
          error.message,
          "The authentication service is unavailable.",
        );
        assert.doesNotMatch(error.message, /private provider detail/);
        return true;
      },
    );
  });

  it("does not expose tokens or raw provider claims", async () => {
    const adapter = new SupabaseAuthAdapter(async () => ({
      getClaims: async () => ({
        data: {
          claims: {
            sub: "user-1",
            access_token: "secret",
            refresh_token: "secret",
          },
        },
      }),
    }));

    const identity = await adapter.getIdentity();
    assert.deepEqual(identity, {
      id: "user-1",
      authProvider: "supabase",
    });
  });
});
