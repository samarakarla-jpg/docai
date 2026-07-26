"use server";

import { createUserContext } from "@/lib/docai/application/user-context";
import { SupabaseAuthAdapter } from "@/lib/docai/infrastructure/auth/supabase-auth";
import {
  ContractCreationError,
  ContractCreationService,
} from "@/lib/docai/application/contract-creation-service";
import {
  ContractService,
  type ContractDraft,
} from "@/lib/docai/services/contract-service";
import { ContractGenerationService } from "@/lib/docai/services/contract-generation-service";
import { AIService } from "@/lib/docai/services/ai-service";
import {
  TemplateService,
  type ContractTemplate,
} from "@/lib/docai/services/template-service";
import type {
  ContractContent,
  ContractGenerationRequest,
  ContractType,
} from "@/lib/docai/domain/contract-models";
import { InMemoryRepository } from "@/lib/persistence/in-memory-repository";
import {
  DocumentService,
  type Document,
} from "@/lib/documents/document-service";

export type ContractActionState = {
  readonly status: "idle" | "error" | "success";
  readonly message?: string;
  readonly fieldErrors?: Readonly<Record<string, string>>;
  readonly result?: {
    readonly type: ContractType;
    readonly title: string;
    readonly output: string;
  };
};

const INITIAL_TEMPLATE_INSTRUCTIONS =
  "Organize the supplied facts into a neutral contract draft. Do not invent facts.";

export async function createContract(
  _previousState: ContractActionState,
  formData: FormData,
): Promise<ContractActionState> {
  const parsed = parseFormData(formData);
  if (!parsed.valid) {
    return {
      status: "error",
      fieldErrors: parsed.fieldErrors,
      message: "Revise os campos indicados.",
    };
  }

  try {
    const identity = await new SupabaseAuthAdapter().getIdentity();
    createUserContext(identity);

    const services = createServices();
    const result = await services.creation.create({
      id: `draft-${crypto.randomUUID()}`,
      title: parsed.data.title,
      type: parsed.data.type,
      templateId: `${parsed.data.type}-template`,
      content: parsed.data.content,
    });

    const output = result.generation.output;
    if (typeof output !== "string" || output.trim().length === 0) {
      return {
        status: "error",
        message: "A geração não retornou um rascunho revisável.",
      };
    }

    return {
      status: "success",
      message: "Rascunho gerado. Revise o conteúdo antes de utilizá-lo.",
      result: {
        type: parsed.data.type,
        title: result.draft.title,
        output,
      },
    };
  } catch (error) {
    if (error instanceof ContractCreationError && error.code === "INVALID_INPUT") {
      return {
        status: "error",
        message: "Revise os dados do contrato antes de gerar novamente.",
      };
    }

    return {
      status: "error",
      message: "Não foi possível gerar o rascunho. Tente novamente.",
    };
  }
}

function createServices() {
  const templateStorage = new InMemoryRepository<ContractTemplate, string>(
    (template) => template.id,
  );
  const documentStorage = new InMemoryRepository<
    Document<ContractContent>,
    string
  >((document) => document.id);
  const templates = new TemplateService(templateStorage);
  const documents = new DocumentService(documentStorage);
  const contracts = new ContractService(documents);
  const ai = new AIService({
    status: "enabled",
    generate: async (request) => ({
      output: createLocalDraft(request.input),
    }),
  });
  const generator = new ContractGenerationService(ai);

  return {
    creation: new ContractCreationService({
      templates: {
        getById: async (id) => {
          const type = id.replace(/-template$/, "") as ContractType;
          return templates.create({
            id,
            type,
            title: `${type} template`,
            instructions: INITIAL_TEMPLATE_INSTRUCTIONS,
          });
        },
      },
      generator,
      contracts,
    }),
  };
}

function createLocalDraft(input: unknown): string {
  const request = input as ContractGenerationRequest;
  const lines = Object.entries(request.content)
    .filter(([key]) => key !== "type" && key !== "parties")
    .map(([key, value]) => `${key}: ${String(value)}`);
  const parties = request.content.parties
    .map((party) => party.name)
    .join("; ");

  return [
    `Rascunho de contrato (${request.type})`,
    `Partes: ${parties}`,
    ...lines,
    "",
    "Este rascunho foi organizado pelo serviço local de demonstração e exige revisão humana.",
  ].join("\n");
}

type ParsedForm =
  | { readonly valid: true; readonly data: { readonly title: string; readonly type: ContractType; readonly content: ContractContent } }
  | { readonly valid: false; readonly fieldErrors: Readonly<Record<string, string>> };

function parseFormData(formData: FormData): ParsedForm {
  const type = readType(formData.get("type"));
  const title = readText(formData.get("title"));
  const parties = ["party-1", "party-2"]
    .map((name) => readText(formData.get(name)))
    .filter((name) => name.length > 0)
    .map((name) => ({ name }));
  const fieldErrors: Record<string, string> = {};

  if (type === null) fieldErrors.type = "Selecione um tipo de contrato.";
  if (title.length === 0) fieldErrors.title = "Informe um título.";
  if (parties.length === 0) fieldErrors.parties = "Informe ao menos uma parte.";

  if (type === null) return { valid: false, fieldErrors };

  const values = {
    scope: readText(formData.get("scope")),
    compensation: readText(formData.get("compensation")),
    term: readText(formData.get("term")),
    subject: readText(formData.get("subject")),
    price: readText(formData.get("price")),
    delivery: readText(formData.get("delivery")),
    property: readText(formData.get("property")),
    rent: readText(formData.get("rent")),
    repayment: readText(formData.get("repayment")),
  };

  const content =
    type === "services"
      ? { type, parties, scope: values.scope, compensation: values.compensation, term: values.term }
      : type === "sale"
        ? { type, parties, subject: values.subject, price: values.price, delivery: values.delivery }
        : type === "rental"
          ? { type, parties, property: values.property, rent: values.rent, term: values.term }
          : { type, parties, subject: values.subject, repayment: values.repayment, term: values.term };

  for (const [key, value] of Object.entries(content)) {
    if (key !== "type" && key !== "parties" && typeof value === "string" && value.trim().length === 0) {
      fieldErrors[key] = "Preencha este campo.";
    }
  }

  return Object.keys(fieldErrors).length > 0
    ? { valid: false, fieldErrors }
    : { valid: true, data: { title, type, content } };
}

function readText(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function readType(value: FormDataEntryValue | null): ContractType | null {
  return value === "services" || value === "sale" || value === "rental" || value === "loan"
    ? value
    : null;
}
