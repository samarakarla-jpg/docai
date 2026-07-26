import type { OptionalCapabilityState } from "./optional-capability";

class DisabledPdfCapabilityError extends Error {
  readonly code = "DISABLED" as const;

  constructor() {
    super("PDF capability is disabled.");
    this.name = "OptionalCapabilityError";
  }
}

export interface PdfRequest {
  readonly input: unknown;
}

export interface PdfResult {
  readonly content: Uint8Array;
}

export interface PdfAdapter extends OptionalCapabilityState {
  generate(request: PdfRequest): Promise<PdfResult>;
}

export function createDisabledPdfAdapter(): PdfAdapter {
  return {
    status: "disabled",
    generate: async () => {
      throw new DisabledPdfCapabilityError();
    },
  };
}
