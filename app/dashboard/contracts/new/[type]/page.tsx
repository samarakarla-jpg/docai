import { notFound } from "next/navigation";

import { ContractDetailsForm } from "@/components/docai/contracts/contract-details-form";
import type { ContractType } from "@/lib/docai/domain/contract-models";
import {
  getContractCategory,
  getContractLibraryModel,
} from "@/lib/docai/domain/contract-library";
import { createStandardContractFormSchema } from "@/lib/docai/domain/contract-form-schema";

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
    model?: string | string[];
    name?: string | string[];
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
  const categorySlug = readSingleQueryValue(query.category);
  const modelId = readSingleQueryValue(query.model);
  const modelName = readSingleQueryValue(query.name);
  const selectedModel =
    categorySlug && modelId
      ? getContractLibraryModel(categorySlug, modelId)
      : undefined;
  const selectedCategory = selectedModel
    ? getContractCategory(selectedModel.categorySlug)
    : undefined;

  if (
    hasLibraryContext &&
    (!categorySlug ||
      !modelId ||
      !modelName ||
      !selectedModel ||
      !selectedCategory ||
      selectedModel.name !== modelName ||
      selectedModel.contractType !== type)
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
          {contractTypeLabels[type]}
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
          Preencha os dados do contrato.
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
        type={type}
      />
    </section>
  );
}

function readSingleQueryValue(
  value: string | string[] | undefined,
): string | undefined {
  return typeof value === "string" && value.trim().length > 0
    ? value
    : undefined;
}
