import type { ContractFormFieldSchema } from "./contract-definition";
import {
  type ChecklistLayer,
  recommendedQuestion,
} from "./service-checklist";

export const GENERIC_SERVICE_CHECKLIST_QUESTION_IDS = {
  serviceNotes: "service-additional-notes",
  workLocation: "service-work-location",
} as const;

export const GENERIC_SERVICE_CHECKLIST_QUESTIONS:
  readonly ContractFormFieldSchema[] = [
  {
    helpText: "Informe o endereço ou descreva onde o serviço será realizado.",
    id: GENERIC_SERVICE_CHECKLIST_QUESTION_IDS.workLocation,
    label: "Onde o serviço será realizado?",
    layout: "full",
    required: false,
    type: "text",
  },
  {
    helpText: "Inclua somente informações que afetem a execução do serviço.",
    id: GENERIC_SERVICE_CHECKLIST_QUESTION_IDS.serviceNotes,
    label: "Existe alguma observação importante sobre o serviço?",
    layout: "full",
    required: false,
    rows: 3,
    type: "textarea",
  },
];

export const GENERIC_SERVICE_CHECKLIST_LAYER: ChecklistLayer = {
  id: "generic-service-checklist",
  questions: [
    recommendedQuestion(GENERIC_SERVICE_CHECKLIST_QUESTION_IDS.workLocation),
    recommendedQuestion(GENERIC_SERVICE_CHECKLIST_QUESTION_IDS.serviceNotes),
  ],
  scope: "generic",
  section: {
    description: "Informações práticas que ajudam a definir a execução.",
    id: "service-checklist-general",
    title: "Detalhes do serviço",
  },
};
