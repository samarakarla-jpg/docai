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
    helpText: "Informe o endereço ou descreva onde o serviço será realizado.",
    id: GENERIC_SERVICE_FORM_FIELD_IDS.workLocation,
    label: "Onde o serviço será realizado?",
    layout: "full",
    required: false,
    type: "text",
  },
  {
    helpText: "Inclua somente informações que afetem a execução do serviço.",
    id: GENERIC_SERVICE_FORM_FIELD_IDS.serviceNotes,
    label: "Existe alguma observação importante sobre o serviço?",
    layout: "full",
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
    description: "Informações práticas que ajudam a definir a execução.",
    id: "service-form-general",
    title: "Detalhes do serviço",
  },
};
