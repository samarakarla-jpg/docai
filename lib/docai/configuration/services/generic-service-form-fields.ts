import type { ContractFormFieldSchema } from "../../domain/contract-definition";
import {
  recommendedFormField,
  type ServiceFormSchemaLayer,
} from "../../domain/service-form-schema";

export const GENERIC_SERVICE_FORM_FIELD_IDS = {
  serviceNotes: "service-additional-notes",
  workLocation: "service-work-location",
} as const;

export const GENERIC_SERVICE_FORM_FIELDS:
  readonly ContractFormFieldSchema[] = [
  {
    helpText: "Informe o endereço completo ou explique como encontrar o local.",
    id: GENERIC_SERVICE_FORM_FIELD_IDS.workLocation,
    label: "Onde o serviço será realizado?",
    layout: "full",
    placeholder: "Ex.: Rua das Flores, nº 100, apartamento 20.",
    required: false,
    type: "text",
  },
  {
    helpText: "Informe detalhes de acesso, horários ou cuidados necessários no local.",
    id: GENERIC_SERVICE_FORM_FIELD_IDS.serviceNotes,
    label: "Há alguma orientação sobre o local? (opcional)",
    layout: "full",
    placeholder:
      "Ex.: O quadro elétrico fica na garagem e o porteiro precisa liberar a entrada.",
    required: false,
    rows: 3,
    type: "textarea",
  },
];

export const GENERIC_SERVICE_FORM_LAYER: ServiceFormSchemaLayer = {
  fields: [
    recommendedFormField(GENERIC_SERVICE_FORM_FIELD_IDS.workLocation),
    recommendedFormField(GENERIC_SERVICE_FORM_FIELD_IDS.serviceNotes),
  ],
  id: "generic-service-form",
  scope: "generic",
  section: {
    description: "Informe onde o serviço será feito e como acessar o local.",
    id: "service-form-general",
    title: "Detalhes do serviço",
  },
};
