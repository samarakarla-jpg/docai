import type { OptionalCapabilityState } from "./optional-capability";

class DisabledMailCapabilityError extends Error {
  readonly code = "DISABLED" as const;

  constructor() {
    super("Mail capability is disabled.");
    this.name = "OptionalCapabilityError";
  }
}

export interface MailMessage {
  readonly recipients: readonly string[];
  readonly subject: string;
  readonly body: string;
}

export interface MailResult {
  readonly accepted: boolean;
}

export interface MailAdapter extends OptionalCapabilityState {
  send(message: MailMessage): Promise<MailResult>;
}

export function createDisabledMailAdapter(): MailAdapter {
  return {
    status: "disabled",
    send: async () => {
      throw new DisabledMailCapabilityError();
    },
  };
}
