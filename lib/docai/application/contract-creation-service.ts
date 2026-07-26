import type {
  ContractDraft,
  ContractService,
} from "../services/contract-service";
import type {
  ContractTemplate,
  TemplateService,
} from "../services/template-service";
import type { AIService } from "../services/ai-service";
import type {
  ContractContent,
  ContractGenerationResult,
  ContractType,
} from "../domain/contract-models";

export interface CreateContractInput {
  readonly id: string;
  readonly title: string;
  readonly type: ContractType;
  readonly templateId: string;
  readonly content: ContractContent;
}

export interface ContractCreationResult {
  readonly draft: ContractDraft;
  readonly generation: ContractGenerationResult;
  readonly template: ContractTemplate;
}

export type ContractTemplateReader = Pick<TemplateService, "getById">;
export type ContractGenerator = Pick<AIService, "generateContract">;
export type ContractDraftCreator = Pick<ContractService, "createDraft">;

export interface ContractCreationDependencies {
  readonly templates: ContractTemplateReader;
  readonly generator: ContractGenerator;
  readonly contracts: ContractDraftCreator;
}

export type ContractCreationErrorCode =
  | "INVALID_INPUT"
  | "TEMPLATE_FAILURE"
  | "GENERATION_FAILURE"
  | "CREATION_FAILURE";

export class ContractCreationError extends Error {
  readonly code: ContractCreationErrorCode;

  constructor(
    code: ContractCreationErrorCode,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "ContractCreationError";
    this.code = code;
  }
}

export class ContractCreationService {
  private readonly templates: ContractTemplateReader;
  private readonly generator: ContractGenerator;
  private readonly contracts: ContractDraftCreator;

  constructor(dependencies: ContractCreationDependencies) {
    this.templates = dependencies.templates;
    this.generator = dependencies.generator;
    this.contracts = dependencies.contracts;
  }

  async create(input: CreateContractInput): Promise<ContractCreationResult> {
    this.validateInput(input);

    let template: ContractTemplate;
    try {
      template = await this.templates.getById(input.templateId);
    } catch (error) {
      throw new ContractCreationError(
        "TEMPLATE_FAILURE",
        "Unable to load the contract template.",
        { cause: error },
      );
    }

    if (template.content.type !== input.type) {
      throw new ContractCreationError(
        "TEMPLATE_FAILURE",
        "The contract template type does not match the requested contract type.",
      );
    }

    let generation: ContractGenerationResult;
    try {
      generation = await this.generator.generateContract({
        type: input.type,
        content: input.content,
      });
    } catch (error) {
      throw new ContractCreationError(
        "GENERATION_FAILURE",
        "Unable to generate the contract draft.",
        { cause: error },
      );
    }

    let draft: ContractDraft;
    try {
      draft = await this.contracts.createDraft({
        id: input.id,
        title: input.title,
        content: input.content,
      });
    } catch (error) {
      throw new ContractCreationError(
        "CREATION_FAILURE",
        "Unable to create the contract draft.",
        { cause: error },
      );
    }

    return { draft, generation, template };
  }

  private validateInput(input: CreateContractInput): void {
    if (!isRecord(input)) {
      throw this.invalidInput("Contract creation input is required.");
    }

    this.assertNonBlank(input.id, "Contract id");
    this.assertNonBlank(input.title, "Contract title");
    this.assertNonBlank(input.templateId, "Template id");

    if (!isContractType(input.type)) {
      throw this.invalidInput("Unsupported contract type.");
    }

    if (!isRecord(input.content) || input.content.type !== input.type) {
      throw this.invalidInput(
        "Contract type must match the contract content type.",
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

  private assertNonBlank(value: unknown, field: string): void {
    if (!isNonBlankString(value)) {
      throw this.invalidInput(`${field} must be a non-empty string.`);
    }
  }

  private invalidInput(message: string): ContractCreationError {
    return new ContractCreationError("INVALID_INPUT", message);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNonBlankString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isContractType(value: unknown): value is ContractType {
  return (
    value === "services" ||
    value === "sale" ||
    value === "rental" ||
    value === "loan"
  );
}
