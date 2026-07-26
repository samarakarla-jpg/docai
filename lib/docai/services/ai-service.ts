import type { AiAdapter } from "../../integrations/ai";
import type {
  ContractGenerationRequest,
  ContractGenerationResult,
} from "../domain/contract-models";

export type AIServiceErrorCode = "INVALID_INPUT" | "ADAPTER_FAILURE";

export class AIServiceError extends Error {
  readonly code: AIServiceErrorCode;

  constructor(code: AIServiceErrorCode, message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "AIServiceError";
    this.code = code;
  }
}

export class AIService {
  private readonly adapter: AiAdapter;

  constructor(adapter: AiAdapter) {
    this.adapter = adapter;
  }

  async generateContract(
    request: ContractGenerationRequest,
  ): Promise<ContractGenerationResult> {
    this.assertRequest(request);

    try {
      const result = await this.adapter.generate({ input: request });
      return {
        type: request.type,
        output: result.output,
      };
    } catch (error) {
      throw new AIServiceError(
        "ADAPTER_FAILURE",
        "Unable to generate the contract with the configured AI capability.",
        { cause: error },
      );
    }
  }

  private assertRequest(request: ContractGenerationRequest): void {
    if (request.content.type !== request.type) {
      throw new AIServiceError(
        "INVALID_INPUT",
        "Contract generation type must match its content type.",
      );
    }
  }
}
