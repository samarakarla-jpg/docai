import type {
  AuthenticatedIdentity,
  AuthProvider,
} from "../../application/user-context";

async function createDefaultAuthClient(): Promise<AuthSessionReader> {
  const { createRequire } = await import("node:module");
  const requireModule = createRequire(import.meta.url);
  const {
    createReadOnlyAuthClient,
  }: typeof import("../../../auth/server") = requireModule(
    "../../../auth/server.ts",
  );

  const client = await createReadOnlyAuthClient();
  return {
    getClaims: () => client.auth.getClaims(),
  };
}

export interface AuthClaims {
  readonly sub?: unknown;
  readonly email?: unknown;
}

export interface AuthSessionReader {
  getClaims(): Promise<{
    readonly data?: { readonly claims?: AuthClaims } | null;
    readonly error?: unknown;
  }>;
}

export type AuthSessionClientFactory = () => Promise<AuthSessionReader>;

export type SupabaseAuthErrorCode = "AUTH_UNAVAILABLE";

export class SupabaseAuthError extends Error {
  readonly code: SupabaseAuthErrorCode;

  constructor(message: string) {
    super(message);
    this.name = "SupabaseAuthError";
    this.code = "AUTH_UNAVAILABLE";
  }
}

export class SupabaseAuthAdapter {
  private readonly createClient: AuthSessionClientFactory;

  constructor(
    createClient: AuthSessionClientFactory = createDefaultAuthClient,
  ) {
    this.createClient = createClient;
  }

  async getIdentity(): Promise<AuthenticatedIdentity | null> {
    let result: Awaited<ReturnType<AuthSessionReader["getClaims"]>>;

    try {
      const client = await this.createClient();
      result = await client.getClaims();
    } catch {
      throw new SupabaseAuthError(
        "The authentication service is unavailable.",
      );
    }

    if (result.error) {
      throw new SupabaseAuthError(
        "The authentication service is unavailable.",
      );
    }

    const subject = result.data?.claims?.sub;
    if (typeof subject !== "string" || subject.trim().length === 0) {
      return null;
    }

    const email = result.data?.claims?.email;
    return {
      id: subject,
      authProvider: "supabase" satisfies AuthProvider,
      ...(typeof email === "string" && email.trim().length > 0
        ? { email: email.trim().toLowerCase() }
        : {}),
    };
  }
}
