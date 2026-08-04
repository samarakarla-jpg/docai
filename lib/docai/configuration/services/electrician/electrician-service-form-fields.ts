import type { ContractFormFieldSchema } from "../../../domain/contract-definition";
import {
  recommendedFormField,
  ServiceFormFieldRegistry,
  type ServiceFormSchemaLayer,
} from "../../../domain/service-form-schema";
import { GENERIC_SERVICE_FORM_FIELDS } from "../generic-service-form-fields";

export const ELECTRICIAN_FORM_FIELD_IDS = {
  breakerRating: "electrician-breaker-rating-amps",
  ceilingStructure: "electrician-ceiling-structure",
  dedicatedCircuit: "electrician-dedicated-circuit-available",
  electricalPoint: "electrician-electrical-point-available",
  equipmentPower: "electrician-equipment-power-watts",
  freeDescription: "electrician-free-service-description",
  supplyVoltage: "electrician-supply-voltage",
  wallControl: "electrician-wall-control-required",
} as const;

const electricianFormFields: readonly ContractFormFieldSchema[] = [
  {
    helpText: "Explique de forma simples o que deverá ser feito.",
    id: ELECTRICIAN_FORM_FIELD_IDS.freeDescription,
    label: "Descreva o serviço elétrico",
    layout: "full",
    placeholder: "Ex.: Revisar duas tomadas que estão aquecendo na sala.",
    required: false,
    rows: 4,
    type: "textarea",
  },
  {
    helpText: "Escolha a voltagem do local. Se não souber, selecione a opção de verificação.",
    id: ELECTRICIAN_FORM_FIELD_IDS.supplyVoltage,
    label: "Qual é a voltagem do local?",
    layout: "half",
    options: [
      { label: "127 V (110 V)", value: "127v" },
      { label: "220 V", value: "220v" },
      { label: "Ainda precisa verificar", value: "unknown" },
    ],
    required: false,
    type: "select",
  },
  {
    helpText: "Procure no equipamento ou no manual o valor indicado em W.",
    id: ELECTRICIAN_FORM_FIELD_IDS.equipmentPower,
    label: "Qual é a potência indicada no equipamento?",
    layout: "half",
    min: 0,
    placeholder: "Ex.: 5500",
    required: false,
    type: "number",
  },
  {
    helpText: "Um circuito exclusivo atende somente esse equipamento.",
    id: ELECTRICIAN_FORM_FIELD_IDS.dedicatedCircuit,
    label: "Existe um circuito exclusivo para o equipamento?",
    layout: "half",
    options: yesNoUnknownOptions(),
    required: false,
    type: "select",
  },
  {
    helpText: "Procure no disjuntor o valor indicado em A. Se não souber, deixe em branco.",
    id: ELECTRICIAN_FORM_FIELD_IDS.breakerRating,
    label: "Qual é a amperagem do disjuntor?",
    layout: "half",
    min: 1,
    placeholder: "Ex.: 32",
    required: false,
    type: "number",
  },
  {
    helpText: "Selecione “Sim” se já houver tomada, caixa ou saída de fios no ponto da instalação.",
    id: ELECTRICIAN_FORM_FIELD_IDS.electricalPoint,
    label: "Já existe um ponto elétrico no local?",
    layout: "half",
    options: yesNoUnknownOptions(),
    required: false,
    type: "select",
  },
  {
    id: ELECTRICIAN_FORM_FIELD_IDS.wallControl,
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
    helpText: "Ex.: laje de concreto, madeira, gesso ou estrutura metálica.",
    id: ELECTRICIAN_FORM_FIELD_IDS.ceilingStructure,
    label: "Qual é a estrutura do teto?",
    layout: "half",
    required: false,
    type: "text",
  },
];

export const ELECTRICIAN_SERVICE_FORM_FIELD_REGISTRY =
  new ServiceFormFieldRegistry([
    ...GENERIC_SERVICE_FORM_FIELDS,
    ...electricianFormFields,
  ]);

export const ELECTRICIAN_PROFESSION_FORM_LAYER: ServiceFormSchemaLayer = {
  fields: [
    recommendedFormField(ELECTRICIAN_FORM_FIELD_IDS.supplyVoltage),
  ],
  id: "electrician-profession-form",
  scope: "profession",
  section: {
    description: "Preencha o que souber. As informações ajudam a preparar o serviço.",
    id: "service-form-electrician",
    title: "Informações elétricas",
  },
};

function yesNoUnknownOptions() {
  return [
    { label: "Sim", value: "yes" },
    { label: "Não", value: "no" },
    { label: "Ainda precisa verificar", value: "unknown" },
  ] as const;
}
