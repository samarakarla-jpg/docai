"use server";

import { createGeminiAdapterFromEnvironment } from "@/lib/docai/infrastructure/ai/gemini-adapter";
import type {
  ContractContent,
  ContractType,
} from "@/lib/docai/domain/contract-models";
import { AIService } from "@/lib/docai/services/ai-service";

export type GenerateContractActionState = Readonly<{
  fieldErrors?: Readonly<Record<string, string>>;
  message?: string;
  result?: Readonly<{
    output: string;
    title: string;
    type: ContractType;
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
  const parsed = parseFormData(formData);

  if (!parsed.valid) {
    return {
      fieldErrors: parsed.fieldErrors,
      message: "Preencha todos os campos obrigatórios.",
      status: "error",
    };
  }

  try {
    const aiService = new AIService(createGeminiAdapterFromEnvironment());
    const result = await aiService.generateContract({
      content: createContractContent(parsed.type, parsed.values),
      type: parsed.type,
    });

    if (typeof result.output !== "string" || !result.output.trim()) {
      return {
        message: "O Gemini não retornou um contrato válido.",
        status: "error",
      };
    }

    return {
      result: {
        output: result.output.trim(),
        title: contractTypeLabels[parsed.type],
        type: parsed.type,
      },
      status: "success",
    };
  } catch {
    return {
      message:
        "Não foi possível gerar o contrato. Verifique a configuração e tente novamente.",
      status: "error",
    };
  }
}

type FormValues = Record<(typeof FIELD_NAMES)[number], string>;

type ParsedForm =
  | Readonly<{
      fieldErrors: Readonly<Record<string, string>>;
      valid: false;
    }>
  | Readonly<{
      type: ContractType;
      valid: true;
      values: FormValues;
    }>;

function parseFormData(formData: FormData): ParsedForm {
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

  return type && Object.keys(fieldErrors).length === 0
    ? { type, valid: true, values }
    : { fieldErrors, valid: false };
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

function readText(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}
