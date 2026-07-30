import { notFound } from "next/navigation";

import { ContractDetailsForm } from "@/components/docai/contracts/contract-details-form";
import { InvalidServiceDocumentContextError } from "@/lib/docai/application/resolve-service-document-context";
import type { ContractType } from "@/lib/docai/domain/contract-models";
import {
  getContractCategory,
  getContractLibraryModel,
} from "@/lib/docai/domain/contract-library";
import { createStandardContractFormSchema } from "@/lib/docai/domain/contract-form-schema";
import { SERVICE_DOCUMENT_CONTEXT } from "@/lib/docai/configuration/services/service-document-context";
import type { SupportedServiceDocument } from "@/lib/docai/domain/service-definition";

const contractTypeLabels: Record<ContractType, string> = {
  services: "Prestação de Serviços",
  sale: "Compra e Venda",
  rental: "Aluguel",
  loan: "Empréstimo",
};

type ContractFormPageProps = {
  params: Promise<{
    type: string;
  }>;
  searchParams: Promise<{
    category?: string | string[];
    document?: string | string[];
    model?: string | string[];
    name?: string | string[];
    profession?: string | string[];
    service?: string | string[];
  }>;
};

export default async function ContractFormPage({
  params,
  searchParams,
}: ContractFormPageProps) {
  const { type: requestedType } = await params;

  if (!(requestedType in contractTypeLabels)) {
    notFound();
  }

  const type = requestedType as ContractType;
  const query = await searchParams;
  const hasLibraryContext =
    query.category !== undefined ||
    query.model !== undefined ||
    query.name !== undefined;
  const hasServiceContext =
    query.document !== undefined ||
    query.profession !== undefined ||
    query.service !== undefined;
  const categorySlug = readSingleQueryValue(query.category);
  const document = readSupportedServiceDocument(query.document);
  const modelId = readSingleQueryValue(query.model);
  const modelName = readSingleQueryValue(query.name);
  const professionId = readSingleQueryValue(query.profession);
  const serviceId = readSingleQueryValue(query.service);
  const resolvedServiceContext =
    hasServiceContext && document && professionId && serviceId
      ? await resolveServiceContext(document, professionId, serviceId)
      : undefined;
  const selectedModel = resolvedServiceContext
    ? resolvedServiceContext.contractDefinition
    : categorySlug && modelId
      ? getContractLibraryModel(categorySlug, modelId)
      : undefined;
  const selectedCategory = selectedModel
    ? getContractCategory(selectedModel.categorySlug)
    : undefined;

  if (
    (hasServiceContext && !resolvedServiceContext) ||
    (hasLibraryContext &&
      (!categorySlug ||
        !modelId ||
        !modelName ||
        !selectedModel ||
        !selectedCategory ||
        selectedModel.name !== modelName ||
        selectedModel.contractType !== type))
  ) {
    notFound();
  }

  return (
    <section
      aria-labelledby="contract-form-title"
      className="mx-auto w-full max-w-3xl"
    >
      <div className="max-w-2xl">
        <h1
          className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
          id="contract-form-title"
        >
          {resolvedServiceContext ? "Nova Proposta" : contractTypeLabels[type]}
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
          {resolvedServiceContext
            ? "Preencha os dados para apresentar seu serviço ao cliente."
            : "Preencha os dados do contrato."}
        </p>
      </div>

      <ContractDetailsForm
        formSchema={
          selectedModel?.formSchema ?? createStandardContractFormSchema()
        }
        model={
          selectedModel && selectedCategory
            ? {
                categoryName: selectedCategory.name,
                categorySlug: selectedModel.categorySlug,
                id: selectedModel.id,
                name: selectedModel.name,
              }
            : undefined
        }
        service={
          resolvedServiceContext
            ? {
                document: resolvedServiceContext.document,
                id: resolvedServiceContext.serviceDefinition.id,
                name: resolvedServiceContext.serviceDefinition.name,
                professionId:
                  resolvedServiceContext.serviceDefinition.profession.id,
                professionName:
                  resolvedServiceContext.serviceDefinition.profession.name,
              }
            : undefined
        }
        type={type}
      />
    </section>
  );
}

async function resolveServiceContext(
  document: SupportedServiceDocument,
  professionId: string,
  serviceId: string,
) {
  try {
    return await SERVICE_DOCUMENT_CONTEXT.resolve({
      document,
      professionId,
      serviceId,
    });
  } catch (error) {
    if (error instanceof InvalidServiceDocumentContextError) {
      return undefined;
    }

    throw error;
  }
}

function readSupportedServiceDocument(
  value: string | string[] | undefined,
): SupportedServiceDocument | undefined {
  const document = readSingleQueryValue(value);
  return document === "proposal" ? document : undefined;
}

function readSingleQueryValue(
  value: string | string[] | undefined,
): string | undefined {
  return typeof value === "string" && value.trim().length > 0
    ? value
    : undefined;
}
