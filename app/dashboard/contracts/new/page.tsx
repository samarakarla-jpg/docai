import { ServiceDocumentSelection } from "@/components/docai/contracts/service-document-selection";
import { SERVICE_DOCUMENT_CONTEXT } from "@/lib/docai/configuration/services/service-document-context";

export default async function NewContractPage() {
  const selection = await SERVICE_DOCUMENT_CONTEXT.listSelection("proposal");

  return (
    <section
      aria-labelledby="new-proposal-title"
      className="mx-auto w-full max-w-3xl"
    >
      <div className="max-w-2xl">
        <h1
          className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
          id="new-proposal-title"
        >
          Nova Proposta
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
          Comece pelo serviço. O DocAI organizará as perguntas necessárias para
          criar sua proposta.
        </p>
      </div>

      <ServiceDocumentSelection
        definition={{
          categorySlug: selection.contractDefinition.categorySlug,
          contractType: selection.contractDefinition.contractType,
          id: selection.contractDefinition.id,
          name: selection.contractDefinition.name,
        }}
        professions={selection.professions}
        services={selection.services.map((service) => ({
          ...(service.category ? { categoryName: service.category.name } : {}),
          description: service.description,
          id: service.id,
          name: service.name,
          professionId: service.profession.id,
        }))}
      />
    </section>
  );
}
