import type {
  ContractCreationResult,
  ContractCreationService,
  CreateContractInput,
} from "./contract-creation-service";
import type {
  ContractContent,
  ContractParty,
  ContractType,
} from "../domain/contract-models";

export type ContractCreationRequestErrorCode =
  | "INVALID_INPUT"
  | "TEMPLATE_FAILURE"
  | "GENERATION_FAILURE"
  | "CREATION_FAILURE"
  | "INTERNAL_FAILURE";

export interface ContractCreationRequestError {
  readonly code: ContractCreationRequestErrorCode;
  readonly message: string;
}

export type ContractCreationRequestResult =
  | { readonly success: true; readonly data: ContractCreationResult }
  | {
      readonly success: false;
      readonly error: ContractCreationRequestError;
    };

export type ContractCreationRequester = Pick<
  ContractCreationService,
  "create"
>;

export interface RequestContractCreationDependencies {
  readonly creationService: ContractCreationRequester;
}

export class RequestContractCreation {
  private readonly creationService: ContractCreationRequester;

  constructor(dependencies: RequestContractCreationDependencies) {
    this.creationService = dependencies.creationService;
  }

  async execute(input: unknown): Promise<ContractCreationRequestResult> {
    let command: CreateContractInput;

    try {
      command = toCreateContractInput(input);
    } catch (error) {
      return this.failureFrom(error);
    }

    try {
      return {
        success: true,
        data: await this.creationService.create(command),
      };
    } catch (error) {
      return this.failureFrom(error);
    }
  }

  private failureFrom(error: unknown): ContractCreationRequestResult {
    if (isContractCreationError(error)) {
      return {
        success: false,
        error: {
          code: error.code,
          message: error.message,
        },
      };
    }

    return {
      success: false,
      error: {
        code: "INTERNAL_FAILURE",
        message: "Unable to request contract creation.",
      },
    };
  }
}

function toCreateContractInput(value: unknown): CreateContractInput {
  if (!isRecord(value)) {
    throw invalidInput("Contract creation request is required.");
  }

  const id = readRequiredString(value.id, "Contract id");
  const title = readRequiredString(value.title, "Contract title");
  const templateId = readRequiredString(value.templateId, "Template id");
  const type = readContractType(value.type);
  const content = readContractContent(value.content, type);

  return { id, title, templateId, type, content };
}

function readContractContent(
  value: unknown,
  type: ContractType,
): ContractContent {
  if (!isRecord(value)) {
    throw invalidInput("Contract content is required.");
  }

  if (value.type !== type) {
    throw invalidInput("Contract type must match the contract content type.");
  }

  const parties = readParties(value.parties);
  const jurisdiction = readOptionalString(value.jurisdiction, "Jurisdiction");
  const common = {
    type,
    parties,
    ...(jurisdiction === undefined ? {} : { jurisdiction }),
  };

  switch (type) {
    case "services":
      return {
        ...common,
        type,
        scope: readRequiredString(value.scope, "Contract scope"),
        compensation: readRequiredString(
          value.compensation,
          "Contract compensation",
        ),
        term: readRequiredString(value.term, "Contract term"),
      };
    case "sale":
      return {
        ...common,
        type,
        subject: readRequiredString(value.subject, "Contract subject"),
        price: readRequiredString(value.price, "Contract price"),
        delivery: readRequiredString(value.delivery, "Contract delivery"),
      };
    case "rental":
      return {
        ...common,
        type,
        property: readRequiredString(value.property, "Contract property"),
        rent: readRequiredString(value.rent, "Contract rent"),
        term: readRequiredString(value.term, "Contract term"),
      };
    case "loan":
      return {
        ...common,
        type,
        subject: readRequiredString(value.subject, "Contract subject"),
        repayment: readRequiredString(value.repayment, "Contract repayment"),
        term: readRequiredString(value.term, "Contract term"),
      };
  }
}

function readParties(value: unknown): readonly ContractParty[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw invalidInput("A contract must include at least one named party.");
  }

  return value.map((party) => {
    if (!isRecord(party)) {
      throw invalidInput("Each contract party must be an object.");
    }

    const name = readRequiredString(party.name, "Contract party name");
    const identifier = readOptionalString(
      party.identifier,
      "Contract party identifier",
    );

    return identifier === undefined ? { name } : { name, identifier };
  });
}

function readContractType(value: unknown): ContractType {
  if (
    value !== "services" &&
    value !== "sale" &&
    value !== "rental" &&
    value !== "loan"
  ) {
    throw invalidInput("Unsupported contract type.");
  }

  return value;
}

function readRequiredString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw invalidInput(`${field} must be a non-empty string.`);
  }

  return value;
}

function readOptionalString(value: unknown, field: string): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return readRequiredString(value, field);
}

function invalidInput(message: string): RequestInputError {
  return new RequestInputError(message);
}

class RequestInputError extends Error {
  readonly code = "INVALID_INPUT" as const;

  constructor(message: string) {
    super(message);
    this.name = "RequestInputError";
  }
}

function isContractCreationError(
  error: unknown,
): error is { readonly code: ContractCreationRequestErrorCode; readonly message: string } {
  if (!isRecord(error) || typeof error.code !== "string") {
    return false;
  }

  return (
    error.code === "INVALID_INPUT" ||
    error.code === "TEMPLATE_FAILURE" ||
    error.code === "GENERATION_FAILURE" ||
    error.code === "CREATION_FAILURE"
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
