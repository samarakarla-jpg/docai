import type { UserContext } from "./user-context";

export type AuthorizationErrorCode = "UNAUTHENTICATED" | "RESOURCE_NOT_FOUND";

export class AuthorizationError extends Error {
  readonly code: AuthorizationErrorCode;

  constructor(code: AuthorizationErrorCode, message: string) {
    super(message);
    this.name = "AuthorizationError";
    this.code = code;
  }
}

export function assertAuthenticated(context: UserContext | null): UserContext {
  if (context === null || context.authenticated !== true) {
    throw new AuthorizationError(
      "UNAUTHENTICATED",
      "An authenticated user is required.",
    );
  }

  return context;
}

export function assertOwner(
  context: UserContext | null,
  ownerId: string,
): void {
  const authenticated = assertAuthenticated(context);

  if (
    ownerId.trim().length === 0 ||
    authenticated.user.id !== ownerId
  ) {
    throw new AuthorizationError(
      "RESOURCE_NOT_FOUND",
      "The requested resource was not found.",
    );
  }
}
