export type OptionalCapabilityStatus =
  | "disabled"
  | "enabled"
  | "invalid";

export type OptionalCapabilityErrorCode =
  | "DISABLED"
  | "INVALID_CONFIGURATION"
  | "ADAPTER_FAILURE";

export class OptionalCapabilityError extends Error {
  readonly code: OptionalCapabilityErrorCode;

  constructor(
    code: OptionalCapabilityErrorCode,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "OptionalCapabilityError";
    this.code = code;
  }
}

export interface OptionalCapabilityConfiguration {
  readonly enabled?: boolean;
  readonly configured?: boolean;
}

export interface OptionalCapabilityState {
  readonly status: OptionalCapabilityStatus;
}

export function resolveOptionalCapabilityStatus(
  configuration: OptionalCapabilityConfiguration,
): OptionalCapabilityStatus {
  if (configuration.enabled !== true) {
    return "disabled";
  }

  return configuration.configured === true ? "enabled" : "invalid";
}

export function createInvalidConfigurationError(
  capabilityName: string,
): OptionalCapabilityError {
  return new OptionalCapabilityError(
    "INVALID_CONFIGURATION",
    `${capabilityName} capability configuration is invalid.`,
  );
}

export function createAdapterFailureError(
  capabilityName: string,
  cause: unknown,
): OptionalCapabilityError {
  return new OptionalCapabilityError(
    "ADAPTER_FAILURE",
    `${capabilityName} capability failed.`,
    { cause },
  );
}
