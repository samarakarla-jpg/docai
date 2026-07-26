import type { OptionalCapabilityState } from "./optional-capability";

class DisabledStorageCapabilityError extends Error {
  readonly code = "DISABLED" as const;

  constructor() {
    super("External storage capability is disabled.");
    this.name = "OptionalCapabilityError";
  }
}

export interface ExternalObject {
  readonly key: string;
  readonly content: Uint8Array;
  readonly metadata?: Readonly<Record<string, string>>;
}

export interface ExternalStorageAdapter extends OptionalCapabilityState {
  put(object: ExternalObject): Promise<void>;
  get(key: string): Promise<ExternalObject | null>;
  remove(key: string): Promise<void>;
}

export function createDisabledExternalStorageAdapter(): ExternalStorageAdapter {
  const disabled = async (): Promise<never> => {
    throw new DisabledStorageCapabilityError();
  };

  return {
    status: "disabled",
    put: disabled,
    get: disabled,
    remove: disabled,
  };
}
