import { ResolveServiceDocumentContext } from "../../application/resolve-service-document-context";
import { getContractLibraryModel } from "../../domain/contract-library";
import {
  ELECTRICIAN_PROFESSION_FORM_LAYER,
  ELECTRICIAN_SERVICE_FORM_FIELD_REGISTRY,
} from "./electrician/electrician-service-form-fields";
import { GENERIC_SERVICE_FORM_LAYER } from "./generic-service-form-fields";
import { SERVICE_CATALOG } from "./service-catalog";

export const SERVICE_DOCUMENT_CONTEXT = new ResolveServiceDocumentContext({
  documentDefinitions: [
    {
      categorySlug: "contratos-gerais",
      definitionId: "proposta-comercial-com-aceite",
      document: "proposal",
    },
  ],
  genericFormLayer: GENERIC_SERVICE_FORM_LAYER,
  getContractDefinition: getContractLibraryModel,
  professionFormConfigurations: [
    {
      fieldRegistry: ELECTRICIAN_SERVICE_FORM_FIELD_REGISTRY,
      professionId: "electrician",
      professionLayer: ELECTRICIAN_PROFESSION_FORM_LAYER,
    },
  ],
  serviceSource: SERVICE_CATALOG,
});
