import type { ContractFormFieldSchema } from "./contract-definition";
import {
  ChecklistQuestionRegistry,
  type ChecklistLayer,
  recommendedQuestion,
} from "./service-checklist";
import { GENERIC_SERVICE_CHECKLIST_QUESTIONS } from "./service-checklist-questions";

export const ELECTRICIAN_CHECKLIST_QUESTION_IDS = {
  breakerRating: "electrician-breaker-rating-amps",
  ceilingStructure: "electrician-ceiling-structure",
  dedicatedCircuit: "electrician-dedicated-circuit-available",
  electricalPoint: "electrician-electrical-point-available",
  equipmentPower: "electrician-equipment-power-watts",
  freeDescription: "electrician-free-service-description",
  supplyVoltage: "electrician-supply-voltage",
  wallControl: "electrician-wall-control-required",
} as const;

const electricianQuestions: readonly ContractFormFieldSchema[] = [
  {
    helpText: "Explique o resultado esperado sem incluir instruções inseguras.",
    id: ELECTRICIAN_CHECKLIST_QUESTION_IDS.freeDescription,
    label: "Qual serviço elétrico você precisa descrever?",
    layout: "full",
    required: false,
    rows: 4,
    type: "textarea",
  },
  {
    helpText: "Escolha a tensão disponível ou indique que ainda precisa verificar.",
    id: ELECTRICIAN_CHECKLIST_QUESTION_IDS.supplyVoltage,
    label: "Qual é a tensão disponível no local?",
    layout: "half",
    options: [
      { label: "127 V", value: "127v" },
      { label: "220 V", value: "220v" },
      { label: "Ainda precisa verificar", value: "unknown" },
    ],
    required: false,
    type: "select",
  },
  {
    helpText: "Use a potência indicada pelo fabricante do equipamento.",
    id: ELECTRICIAN_CHECKLIST_QUESTION_IDS.equipmentPower,
    label: "Qual é a potência do equipamento em watts?",
    layout: "half",
    min: 0,
    required: false,
    type: "number",
  },
  {
    id: ELECTRICIAN_CHECKLIST_QUESTION_IDS.dedicatedCircuit,
    label: "Existe um circuito exclusivo para o equipamento?",
    layout: "half",
    options: yesNoUnknownOptions(),
    required: false,
    type: "select",
  },
  {
    helpText: "Informe a corrente indicada no disjuntor, se souber.",
    id: ELECTRICIAN_CHECKLIST_QUESTION_IDS.breakerRating,
    label: "Qual é a corrente do disjuntor em amperes?",
    layout: "half",
    min: 1,
    required: false,
    type: "number",
  },
  {
    id: ELECTRICIAN_CHECKLIST_QUESTION_IDS.electricalPoint,
    label: "Já existe um ponto elétrico no local?",
    layout: "half",
    options: yesNoUnknownOptions(),
    required: false,
    type: "select",
  },
  {
    id: ELECTRICIAN_CHECKLIST_QUESTION_IDS.wallControl,
    label: "O ventilador terá controle de parede?",
    layout: "half",
    options: [
      { label: "Sim", value: "yes" },
      { label: "Não", value: "no" },
      { label: "Ainda não foi definido", value: "unknown" },
    ],
    required: false,
    type: "select",
  },
  {
    helpText: "Exemplos: concreto, madeira, gesso ou estrutura metálica.",
    id: ELECTRICIAN_CHECKLIST_QUESTION_IDS.ceilingStructure,
    label: "Qual é a estrutura do teto?",
    layout: "half",
    required: false,
    type: "text",
  },
];

export const ELECTRICIAN_SERVICE_CHECKLIST_QUESTION_REGISTRY =
  new ChecklistQuestionRegistry([
    ...GENERIC_SERVICE_CHECKLIST_QUESTIONS,
    ...electricianQuestions,
  ]);

export const ELECTRICIAN_PROFESSION_CHECKLIST_LAYER: ChecklistLayer = {
  id: "electrician-profession-checklist",
  questions: [
    recommendedQuestion(ELECTRICIAN_CHECKLIST_QUESTION_IDS.supplyVoltage),
  ],
  scope: "profession",
  section: {
    description: "Informações elétricas que podem afetar o serviço.",
    id: "service-checklist-electrician",
    title: "Condições elétricas",
  },
};

function yesNoUnknownOptions() {
  return [
    { label: "Sim", value: "yes" },
    { label: "Não", value: "no" },
    { label: "Ainda precisa verificar", value: "unknown" },
  ] as const;
}
