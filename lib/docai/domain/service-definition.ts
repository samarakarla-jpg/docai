import type { ServiceChecklistConfiguration } from "./service-checklist";

export const SUPPORTED_SERVICE_DOCUMENTS = [
  "budget",
  "proposal",
  "contract",
  "scope_change",
  "delivery_acceptance",
  "warranty",
] as const;

export type SupportedServiceDocument =
  (typeof SUPPORTED_SERVICE_DOCUMENTS)[number];

export type ServiceOrigin = "official" | "custom";

export type ServiceKind = "standard" | "free-form" | "custom";

export type ServiceProfessionReference = Readonly<{
  id: string;
  name: string;
}>;

export type ServiceCategoryReference = Readonly<{
  id: string;
  name: string;
}>;

export type ServiceMaterialDefinition = Readonly<{
  id: string;
  name: string;
  unit?: string;
}>;

export type ServiceFreeTextPolicy = Readonly<{
  guidance: string;
  reviewRequired: boolean;
}>;

export type ServiceMetadataValue =
  | boolean
  | number
  | string
  | null
  | readonly ServiceMetadataValue[]
  | Readonly<{ [key: string]: ServiceMetadataValue }>;

export type ServiceMetadata = Readonly<{
  [key: string]: ServiceMetadataValue;
}>;

type BaseServiceDefinition = Readonly<{
  active: boolean;
  checklist?: ServiceChecklistConfiguration;
  commonMaterials?: readonly ServiceMaterialDefinition[];
  description: string;
  freeTextPolicy?: ServiceFreeTextPolicy;
  id: string;
  metadata?: ServiceMetadata;
  name: string;
  notes?: readonly string[];
  profession: ServiceProfessionReference;
  risks?: readonly string[];
  supportedDocuments: readonly SupportedServiceDocument[];
}>;

export type OfficialStandardServiceDefinition = BaseServiceDefinition &
  Readonly<{
    category: ServiceCategoryReference;
    kind: "standard";
    origin: "official";
  }>;

export type OfficialFreeFormServiceDefinition = BaseServiceDefinition &
  Readonly<{
    category?: ServiceCategoryReference;
    freeTextPolicy: ServiceFreeTextPolicy;
    kind: "free-form";
    origin: "official";
  }>;

export type OfficialServiceDefinition =
  | OfficialStandardServiceDefinition
  | OfficialFreeFormServiceDefinition;

export type ServiceOwner = Readonly<{
  id: string;
  type: "organization" | "user";
}>;

export type ServiceDefaultPrice = Readonly<{
  amountInMinorUnits: number;
  currency: string;
}>;

export type CustomServiceDefinition = BaseServiceDefinition &
  Readonly<{
    category?: ServiceCategoryReference;
    defaultPrice?: ServiceDefaultPrice;
    freeTextPolicy: ServiceFreeTextPolicy;
    kind: "custom";
    origin: "custom";
    owner: ServiceOwner;
  }>;

export type ServiceDefinition =
  | OfficialServiceDefinition
  | CustomServiceDefinition;

export type CreateCustomServiceDefinitionInput = Readonly<{
  active?: boolean;
  category?: ServiceCategoryReference;
  commonMaterials?: readonly ServiceMaterialDefinition[];
  defaultPrice?: ServiceDefaultPrice;
  description: string;
  metadata?: ServiceMetadata;
  name: string;
  notes?: readonly string[];
  owner: ServiceOwner;
  profession: ServiceProfessionReference;
  risks?: readonly string[];
  supportedDocuments?: readonly SupportedServiceDocument[];
}>;

const CUSTOM_SERVICE_FREE_TEXT_POLICY: ServiceFreeTextPolicy = {
  guidance:
    "A descrição livre deve ser revisada antes de alimentar automações ou documentos.",
  reviewRequired: true,
};

export function createCustomServiceDefinition(
  input: CreateCustomServiceDefinitionInput,
): CustomServiceDefinition {
  const name = requireNonBlank(input.name, "Custom service name");
  const description = requireNonBlank(
    input.description,
    "Custom service description",
  );
  const owner = {
    ...input.owner,
    id: requireNonBlank(input.owner.id, "Custom service owner id"),
  } as const;

  if (
    input.defaultPrice &&
    (!Number.isSafeInteger(input.defaultPrice.amountInMinorUnits) ||
      input.defaultPrice.amountInMinorUnits < 0)
  ) {
    throw new TypeError(
      "Custom service price must use a non-negative safe integer.",
    );
  }

  return {
    active: input.active ?? true,
    checklist: { mode: "generic-only" },
    ...(input.category ? { category: input.category } : {}),
    ...(input.commonMaterials
      ? { commonMaterials: input.commonMaterials }
      : {}),
    ...(input.defaultPrice ? { defaultPrice: input.defaultPrice } : {}),
    description,
    freeTextPolicy: CUSTOM_SERVICE_FREE_TEXT_POLICY,
    id: `custom-service-${globalThis.crypto.randomUUID()}`,
    kind: "custom",
    ...(input.metadata ? { metadata: input.metadata } : {}),
    name,
    ...(input.notes ? { notes: input.notes } : {}),
    origin: "custom",
    owner,
    profession: input.profession,
    ...(input.risks ? { risks: input.risks } : {}),
    supportedDocuments:
      input.supportedDocuments ?? SUPPORTED_SERVICE_DOCUMENTS,
  };
}

function requireNonBlank(value: string, label: string): string {
  const normalized = value.trim();

  if (!normalized) {
    throw new TypeError(`${label} must be a non-empty string.`);
  }

  return normalized;
}
