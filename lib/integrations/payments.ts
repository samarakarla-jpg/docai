import type { OptionalCapabilityState } from "./optional-capability";

class DisabledPaymentsCapabilityError extends Error {
  readonly code = "DISABLED" as const;

  constructor() {
    super("Payments capability is disabled.");
    this.name = "OptionalCapabilityError";
  }
}

export interface PaymentRequest {
  readonly input: unknown;
}

export interface PaymentResult {
  readonly reference: string;
  readonly status: "pending" | "succeeded" | "failed";
}

export interface PaymentsAdapter extends OptionalCapabilityState {
  createPayment(request: PaymentRequest): Promise<PaymentResult>;
}

export function createDisabledPaymentsAdapter(): PaymentsAdapter {
  return {
    status: "disabled",
    createPayment: async () => {
      throw new DisabledPaymentsCapabilityError();
    },
  };
}
