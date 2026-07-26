import type { OptionalCapabilityState } from "./optional-capability";

class DisabledAiCapabilityError extends Error {
  readonly code = "DISABLED" as const;

  constructor() {
    super("AI capability is disabled.");
    this.name = "OptionalCapabilityError";
  }
}

export interface AiRequest {
  readonly input: unknown;
}

export interface AiResult {
  readonly output: unknown;
}

export interface AiAdapter extends OptionalCapabilityState {
  generate(request: AiRequest): Promise<AiResult>;
}

export function createDisabledAiAdapter(): AiAdapter {
  return {
    status: "disabled",
    generate: async () => {
      throw new DisabledAiCapabilityError();
    },
  };
}
