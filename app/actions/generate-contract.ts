"use server";

import { createReadOnlyAuthClient } from "@/lib/auth/server";
import { createSchemaGenerationRequest } from "@/lib/docai/application/create-schema-generation-request";
import { InvalidServiceDocumentContextError } from "@/lib/docai/application/resolve-service-document-context";
import { SERVICE_DOCUMENT_CONTEXT } from "@/lib/docai/configuration/services/service-document-context";
import { getContractLibraryModel } from "@/lib/docai/domain/contract-library";
import type { SupportedServiceDocument } from "@/lib/docai/domain/service-definition";
import { createGeminiAdapterFromEnvironment } from "@/lib/docai/infrastructure/ai/gemini-adapter";
import { createSupabaseContractRepository } from "@/lib/docai/infrastructure/persistence/supabase-contract-repository";
import type {
  ContractContent,
  ContractGenerationRequest,
  ContractType,
} from "@/lib/docai/domain/contract-models";
import { AIService } from "@/lib/docai/services/ai-service";

export type GenerateContractActionState = Readonly<{
  fieldErrors?: Readonly<Record<string, string>>;
  message?: string;
  result?: Readonly<{
    id: string;
  }>;
  status: "idle" | "error" | "success";
}>;

const FIELD_NAMES = [
  "contractorName",
  "contractorDocument",
  "contractorAddress",
  "contractedName",
  "contractedDocument",
  "contractedAddress",
  "contractObject",
  "value",
  "startDate",
  "term",
] as const;

const contractTypeLabels: Record<ContractType, string> = {
  services: "Prestação de Serviços",
  sale: "Compra e Venda",
  rental: "Aluguel",
  loan: "Empréstimo",
};

export async function generateContract(
  _previousState: GenerateContractActionState,
  formData: FormData,
): Promise<GenerateContractActionState> {
  let stage = "validation";

  try {
    const parsed = await parseFormData(formData);

    if (!parsed.valid) {
      return {
        fieldErrors: parsed.fieldErrors,
        message: "Preencha todos os campos obrigatórios.",
        status: "error",
      };
    }

    stage = "gemini";
    const aiAdapter = createGeminiAdapterFromEnvironment();
    const aiService = new AIService(aiAdapter);
    const result = await aiService.generateContract(parsed.request);

    if (typeof result.output !== "string" || !result.output.trim()) {
      return {
        message: "O Gemini não retornou um contrato válido.",
        status: "error",
      };
    }

    stage = "authentication";
    const supabase = await createReadOnlyAuthClient();
    const { data, error } = await supabase.auth.getClaims();
    const userId = data?.claims.sub;

    if (error || typeof userId !== "string" || !userId.trim()) {
      throw new Error("Authenticated user is unavailable.", {
        cause: error ?? undefined,
      });
    }

    stage = "persistence";
    const repository = await createSupabaseContractRepository();
    const savedContract = await repository.create({
      content: result.output.trim(),
      title: parsed.documentTitle,
      type: parsed.request.type,
      userId,
    });

    return {
      result: {
        id: savedContract.id,
      },
      status: "success",
    };
  } catch (error) {
    console.error("[generateContract] generation failed", {
      error: describeSafeError(error),
      stage,
    });

    return {
      message:
        "Não foi possível gerar e salvar o contrato. Verifique a configuração e tente novamente.",
      status: "error",
    };
  }
}

function describeSafeError(error: unknown): Readonly<{
  causes?: readonly Readonly<Record<string, unknown>>[];
  code?: string;
  message: string;
  name: string;
  providerMessage?: string;
  status?: number;
}> {
  const causes: Array<Readonly<Record<string, unknown>>> = [];
  let current: unknown = error;
  let first:
    | Readonly<{
        code?: string;
        message: string;
        name: string;
        providerMessage?: string;
        providerCode?: string;
        status?: number;
      }>
    | undefined;

  for (let depth = 0; depth < 3 && current instanceof Error; depth += 1) {
    const details: {
      code?: string;
      message: string;
      name: string;
      providerMessage?: string;
      providerCode?: string;
      status?: number;
    } = {
      message: current.message,
      name: current.name,
    };

    if ("code" in current && typeof current.code === "string") {
      details.code = current.code;
    }

    if ("status" in current && typeof current.status === "number") {
      details.status = current.status;
    }

    if (
      "providerMessage" in current &&
      typeof current.providerMessage === "string"
    ) {
      details.providerMessage = current.providerMessage;
    }

    if (
      "providerCode" in current &&
      typeof current.providerCode === "string"
    ) {
      details.providerCode = current.providerCode;
    }

    if (!first) {
      first = details;
    } else {
      causes.push(details);
    }

    current = "cause" in current ? current.cause : undefined;
  }

  return {
    ...(first ?? { message: "Unknown error", name: "UnknownError" }),
    ...(causes.length > 0 ? { causes } : {}),
  };
}

type FormValues = Record<(typeof FIELD_NAMES)[number], string>;

type ParsedForm =
  | Readonly<{
      fieldErrors: Readonly<Record<string, string>>;
      valid: false;
    }>
  | Readonly<{
      documentTitle: string;
      request: ContractGenerationRequest;
      valid: true;
    }>;

async function parseFormData(formData: FormData): Promise<ParsedForm> {
  const definitionCategory = readText(formData.get("definitionCategory"));
  const definitionId = readText(formData.get("definitionId"));
  const rawServiceDocument = formData.get("serviceDocument");
  const rawServiceProfessionId = formData.get("serviceProfessionId");
  const rawServiceId = formData.get("serviceId");
  const serviceDocument = readSupportedServiceDocument(rawServiceDocument);
  const serviceProfessionId = readText(rawServiceProfessionId);
  const serviceId = readText(rawServiceId);
  const hasServiceContext = Boolean(
    rawServiceDocument !== null ||
      rawServiceProfessionId !== null ||
      rawServiceId !== null,
  );

  if (hasServiceContext) {
    return parseServiceDefinitionFormData(
      definitionCategory,
      definitionId,
      serviceDocument,
      serviceProfessionId,
      serviceId,
      formData,
    );
  }

  if (definitionCategory || definitionId) {
    return parseDefinitionFormData(definitionCategory, definitionId, formData);
  }

  return parseLegacyFormData(formData);
}

async function parseServiceDefinitionFormData(
  category: string,
  definitionId: string,
  document: SupportedServiceDocument | undefined,
  professionId: string,
  serviceId: string,
  formData: FormData,
): Promise<ParsedForm> {
  const type = parseContractType(formData.get("type"));

  if (
    !category ||
    !definitionId ||
    !document ||
    !professionId ||
    !serviceId ||
    !type
  ) {
    return invalidServiceSelection();
  }

  try {
    const context = await SERVICE_DOCUMENT_CONTEXT.resolve({
      document,
      professionId,
      serviceId,
    });
    const definition = context.contractDefinition;

    if (
      definition.categorySlug !== category ||
      definition.id !== definitionId ||
      definition.contractType !== type
    ) {
      return invalidServiceSelection();
    }

    return createSchemaGenerationRequest(definition, formData, {
      service: context.generationServiceContext,
    });
  } catch (error) {
    if (error instanceof InvalidServiceDocumentContextError) {
      return invalidServiceSelection();
    }

    throw error;
  }
}

function invalidServiceSelection(): ParsedForm {
  return {
    fieldErrors: {
      serviceId: "Selecione uma profissão e um serviço válidos.",
    },
    valid: false,
  };
}

function parseDefinitionFormData(
  category: string,
  definitionId: string,
  formData: FormData,
): ParsedForm {
  const type = parseContractType(formData.get("type"));
  const definition = getContractLibraryModel(category, definitionId);

  if (!type || !definition || definition.contractType !== type) {
    return {
      fieldErrors: {
        type: "Selecione um modelo de contrato válido.",
      },
      valid: false,
    };
  }

  return createSchemaGenerationRequest(definition, formData);
}

function parseLegacyFormData(formData: FormData): ParsedForm {
  const type = parseContractType(formData.get("type"));
  const values = Object.fromEntries(
    FIELD_NAMES.map((fieldName) => [fieldName, readText(formData.get(fieldName))]),
  ) as FormValues;
  const fieldErrors: Record<string, string> = {};

  for (const fieldName of FIELD_NAMES) {
    if (!values[fieldName]) {
      fieldErrors[fieldName] = "Preencha este campo.";
    }
  }

  if (!type) {
    fieldErrors.type = "Selecione um tipo de contrato válido.";
  }

  if (!type || Object.keys(fieldErrors).length > 0) {
    return { fieldErrors, valid: false };
  }

  return {
    documentTitle: contractTypeLabels[type],
    request: {
      content: createContractContent(type, values),
      type,
    },
    valid: true,
  };
}

function createContractContent(
  type: ContractType,
  values: FormValues,
): ContractContent {
  const common = {
    contractedAddress: values.contractedAddress,
    contractorAddress: values.contractorAddress,
    parties: [
      {
        identifier: values.contractorDocument,
        name: values.contractorName,
      },
      {
        identifier: values.contractedDocument,
        name: values.contractedName,
      },
    ],
    startDate: values.startDate,
  };

  if (type === "services") {
    return {
      ...common,
      compensation: values.value,
      scope: values.contractObject,
      term: values.term,
      type,
    };
  }

  if (type === "sale") {
    return {
      ...common,
      delivery: values.startDate,
      price: values.value,
      subject: values.contractObject,
      type,
    };
  }

  if (type === "rental") {
    return {
      ...common,
      property: values.contractObject,
      rent: values.value,
      term: values.term,
      type,
    };
  }

  return {
    ...common,
    repayment: values.value,
    subject: values.contractObject,
    term: values.term,
    type,
  };
}

function parseContractType(value: FormDataEntryValue | null): ContractType | null {
  return value === "services" ||
    value === "sale" ||
    value === "rental" ||
    value === "loan"
    ? value
    : null;
}

function readSupportedServiceDocument(
  value: FormDataEntryValue | null,
): SupportedServiceDocument | undefined {
  return value === "proposal" ? value : undefined;
}

function readText(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}
