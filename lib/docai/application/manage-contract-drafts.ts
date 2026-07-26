import type {
  ContractDraft,
  ContractService,
  UpdateContractDraftInput,
} from "../services/contract-service";
import type {
  ContractContent,
  ContractParty,
  ContractType,
} from "../domain/contract-models";

export interface UpdateContractDraftCommand {
  readonly id: string;
  readonly input: UpdateContractDraftInput;
}

export type DraftManagementErrorCode =
  | "INVALID_INPUT"
  | "NOT_FOUND"
  | "STORAGE_FAILURE"
  | "INTERNAL_FAILURE";

export interface DraftManagementError {
  readonly code: DraftManagementErrorCode;
  readonly message: string;
}

export type DraftManagementResult<T> =
  | { readonly success: true; readonly data: T }
  | { readonly success: false; readonly error: DraftManagementError };

export type ContractDraftManager = Pick<
  ContractService,
  "getDraft" | "listDrafts" | "updateDraft" | "removeDraft"
>;

export class ManageContractDrafts {
  private readonly contracts: ContractDraftManager;

  constructor(contracts: ContractDraftManager) {
    this.contracts = contracts;
  }

  async get(id: unknown): Promise<DraftManagementResult<ContractDraft>> {
    if (!isNonBlankString(id)) {
      return failure("INVALID_INPUT", "Contract draft id must be a non-empty string.");
    }

    return this.run(() => this.contracts.getDraft(id));
  }

  async list(): Promise<DraftManagementResult<readonly ContractDraft[]>> {
    return this.run(() => this.contracts.listDrafts());
  }

  async update(
    command: unknown,
  ): Promise<DraftManagementResult<ContractDraft>> {
    const parsed = parseUpdateCommand(command);
    if (parsed === null) {
      return failure("INVALID_INPUT", "Contract draft update is invalid.");
    }

    return this.run(() => this.contracts.updateDraft(parsed.id, parsed.input));
  }

  async remove(id: unknown): Promise<DraftManagementResult<{ readonly id: string }>> {
    if (!isNonBlankString(id)) {
      return failure("INVALID_INPUT", "Contract draft id must be a non-empty string.");
    }

    return this.run(async () => {
      await this.contracts.removeDraft(id);
      return { id };
    });
  }

  private async run<T>(operation: () => Promise<T>): Promise<DraftManagementResult<T>> {
    try {
      return { success: true, data: await operation() };
    } catch (error) {
      return {
        success: false,
        error: mapError(error),
      };
    }
  }
}

function parseUpdateCommand(value: unknown): UpdateContractDraftCommand | null {
  if (!isRecord(value) || !isNonBlankString(value.id) || !isRecord(value.input)) {
    return null;
  }

  const hasTitle = Object.hasOwn(value.input, "title");
  const hasContent = Object.hasOwn(value.input, "content");
  if (!hasTitle && !hasContent) {
    return null;
  }

  let title: string | undefined;
  if (hasTitle) {
    if (!isNonBlankString(value.input.title)) {
      return null;
    }
    title = value.input.title;
  }

  let content: ContractContent | undefined;
  if (hasContent) {
    if (!isContractContent(value.input.content)) {
      return null;
    }
    content = value.input.content;
  }

  return {
    id: value.id,
    input: {
      ...(title === undefined ? {} : { title }),
      ...(content === undefined ? {} : { content }),
    },
  };
}

function isContractContent(value: unknown): value is ContractContent {
  if (!isRecord(value) || !isContractType(value.type)) {
    return false;
  }

  if (
    !Array.isArray(value.parties) ||
    value.parties.length === 0 ||
    value.parties.some((party) => !isContractParty(party))
  ) {
    return false;
  }

  switch (value.type) {
    case "services":
      return hasNonBlankFields(value, ["scope", "compensation", "term"]);
    case "sale":
      return hasNonBlankFields(value, ["subject", "price", "delivery"]);
    case "rental":
      return hasNonBlankFields(value, ["property", "rent", "term"]);
    case "loan":
      return hasNonBlankFields(value, ["subject", "repayment", "term"]);
  }
}

function hasNonBlankFields(
  value: Record<string, unknown>,
  fields: readonly string[],
): boolean {
  return fields.every((field) => isNonBlankString(value[field]));
}

function isContractParty(value: unknown): value is ContractParty {
  return isRecord(value) && isNonBlankString(value.name);
}

function isContractType(value: unknown): value is ContractType {
  return (
    value === "services" ||
    value === "sale" ||
    value === "rental" ||
    value === "loan"
  );
}

function isNonBlankString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function mapError(error: unknown): DraftManagementError {
  if (isKnownErrorCode(error)) {
    return {
      code: error.code,
      message:
        error.code === "NOT_FOUND"
          ? "Contract draft not found."
          : error.code === "INVALID_INPUT"
            ? "Contract draft input is invalid."
            : "Contract draft storage failed.",
    };
  }

  return {
    code: "INTERNAL_FAILURE",
    message: "Unable to manage the contract draft.",
  };
}

function isKnownErrorCode(
  error: unknown,
): error is { readonly code: Exclude<DraftManagementErrorCode, "INTERNAL_FAILURE"> } {
  if (!isRecord(error) || typeof error.code !== "string") {
    return false;
  }

  return (
    error.code === "INVALID_INPUT" ||
    error.code === "NOT_FOUND" ||
    error.code === "STORAGE_FAILURE"
  );
}

function failure(
  code: DraftManagementErrorCode,
  message: string,
): DraftManagementResult<never> {
  return { success: false, error: { code, message } };
}
