export type AuthProvider = "supabase";

export interface AuthenticatedIdentity {
  readonly id: string;
  readonly authProvider: AuthProvider;
  readonly email?: string;
}

export interface UserContext {
  readonly authenticated: true;
  readonly user: AuthenticatedIdentity;
}

export type UserContextErrorCode = "UNAUTHENTICATED" | "INVALID_IDENTITY";

export class UserContextError extends Error {
  readonly code: UserContextErrorCode;

  constructor(code: UserContextErrorCode, message: string) {
    super(message);
    this.name = "UserContextError";
    this.code = code;
  }
}

export function createUserContext(
  identity: AuthenticatedIdentity | null,
): UserContext {
  if (identity === null) {
    throw new UserContextError(
      "UNAUTHENTICATED",
      "An authenticated user is required.",
    );
  }

  if (
    identity.authProvider !== "supabase" ||
    identity.id.trim().length === 0 ||
    (identity.email !== undefined && identity.email.trim().length === 0)
  ) {
    throw new UserContextError(
      "INVALID_IDENTITY",
      "The authenticated identity is invalid.",
    );
  }

  return {
    authenticated: true,
    user: {
      id: identity.id,
      authProvider: identity.authProvider,
      ...(identity.email === undefined ? {} : { email: identity.email }),
    },
  };
}
