import type { AIService } from "./ai-service";
import type {
  ContractContent,
  ContractGenerationResult,
  ContractTemplateContent,
  ContractType,
} from "../domain/contract-models";

export interface ContractGenerationInput {
  readonly type: ContractType;
  readonly content: ContractContent;
  readonly template: ContractTemplateContent;
}

export type ContractGenerationServiceResult = ContractGenerationResult;

export interface ContractGenerator {
  generate(
    input: ContractGenerationInput,
  ): Promise<ContractGenerationServiceResult>;
}

export type ContractGenerationAi = Pick<AIService, "generateContract">;

export type ContractGenerationErrorCode = "INVALID_INPUT" | "AI_FAILURE";

export class ContractGenerationError extends Error {
  readonly code: ContractGenerationErrorCode;

  constructor(
    code: ContractGenerationErrorCode,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "ContractGenerationError";
    this.code = code;
  }
}

export class ContractGenerationService implements ContractGenerator {
  private readonly ai: ContractGenerationAi;

  constructor(ai: ContractGenerationAi) {
    this.ai = ai;
  }

  async generate(
    input: ContractGenerationInput,
  ): Promise<ContractGenerationServiceResult> {
    this.validateInput(input);

    try {
      return await this.ai.generateContract({
        type: input.type,
        content: input.content,
      });
    } catch {
      throw new ContractGenerationError(
        "AI_FAILURE",
        "Unable to generate the contract draft.",
      );
    }
  }

  private validateInput(input: ContractGenerationInput): void {
    if (!isRecord(input)) {
      throw this.invalidInput("Contract generation input is required.");
    }

    if (!isContractType(input.type)) {
      throw this.invalidInput("Unsupported contract type.");
    }

    if (!isRecord(input.content) || input.content.type !== input.type) {
      throw this.invalidInput(
        "Contract type must match the contract content type.",
      );
    }

    if (!isRecord(input.template) || input.template.type !== input.type) {
      throw this.invalidInput(
        "Contract type must match the contract template type.",
      );
    }

    if (
      !isNonBlankString(input.template.title) ||
      !isNonBlankString(input.template.instructions)
    ) {
      throw this.invalidInput(
        "Contract template title and instructions must be non-empty strings.",
      );
    }

    if (
      !Array.isArray(input.content.parties) ||
      input.content.parties.length === 0 ||
      input.content.parties.some(
        (party) => !isRecord(party) || !isNonBlankString(party.name),
      )
    ) {
      throw this.invalidInput(
        "A contract must include at least one named party.",
      );
    }

    const requiredFields =
      input.type === "services"
        ? [input.content.scope, input.content.compensation, input.content.term]
        : input.type === "sale"
          ? [input.content.subject, input.content.price, input.content.delivery]
          : input.type === "rental"
            ? [input.content.property, input.content.rent, input.content.term]
            : [input.content.subject, input.content.repayment, input.content.term];

    if (requiredFields.some((field) => !isNonBlankString(field))) {
      throw this.invalidInput("Contract content contains an empty required field.");
    }
  }

  private invalidInput(message: string): ContractGenerationError {
    return new ContractGenerationError("INVALID_INPUT", message);
  }
}

function isContractType(value: unknown): value is ContractType {
  return (
    value === "services" ||
    value === "sale" ||
    value === "rental" ||
    value === "loan"
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNonBlankString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
