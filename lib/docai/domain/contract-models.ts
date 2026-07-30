export const CONTRACT_TYPES = [
  "services",
  "sale",
  "rental",
  "loan",
] as const;

export type ContractType = (typeof CONTRACT_TYPES)[number];

export interface ContractParty {
  readonly name: string;
  readonly identifier?: string;
}

interface BaseContractContent {
  readonly definitionContext?: ContractGenerationDefinitionContext;
  readonly type: ContractType;
  readonly parties: readonly ContractParty[];
  readonly jurisdiction?: string;
}

export interface ServicesContractContent extends BaseContractContent {
  readonly type: "services";
  readonly scope: string;
  readonly compensation: string;
  readonly term: string;
}

export interface SaleContractContent extends BaseContractContent {
  readonly type: "sale";
  readonly subject: string;
  readonly price: string;
  readonly delivery: string;
}

export interface RentalContractContent extends BaseContractContent {
  readonly type: "rental";
  readonly property: string;
  readonly rent: string;
  readonly term: string;
}

export interface LoanContractContent extends BaseContractContent {
  readonly type: "loan";
  readonly subject: string;
  readonly repayment: string;
  readonly term: string;
}

export type ContractContent =
  | ServicesContractContent
  | SaleContractContent
  | RentalContractContent
  | LoanContractContent;

export interface ContractTemplateContent {
  readonly type: ContractType;
  readonly title: string;
  readonly instructions: string;
}

export type ContractDefinitionReviewStatus = "initial-validation" | "reviewed";

export interface ContractGenerationAnswer {
  readonly fieldId: string;
  readonly label: string;
  readonly value: string;
}

export interface ContractGenerationSection {
  readonly id: string;
  readonly objective: string;
  readonly title: string;
}

export interface ContractGenerationContextParty extends ContractParty {
  readonly address?: string;
  readonly role: string;
}

export interface ContractGenerationServiceContext {
  readonly description: string;
  readonly profession: Readonly<{
    id: string;
    name: string;
  }>;
  readonly serviceId: string;
  readonly serviceName: string;
}

export interface ContractGenerationDefinitionContext {
  readonly answers: readonly ContractGenerationAnswer[];
  readonly definitionId: string;
  readonly definitionVersion: number;
  readonly documentTitle: string;
  readonly objective: string;
  readonly parties: readonly ContractGenerationContextParty[];
  readonly reviewStatus: ContractDefinitionReviewStatus;
  readonly sections: readonly ContractGenerationSection[];
  readonly service?: ContractGenerationServiceContext;
}

export interface ContractGenerationRequest {
  readonly type: ContractType;
  readonly content: ContractContent;
}

export interface ContractGenerationResult {
  readonly type: ContractType;
  readonly output: unknown;
}
