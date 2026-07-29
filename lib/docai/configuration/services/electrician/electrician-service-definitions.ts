import type {
  OfficialFreeFormServiceDefinition,
  OfficialStandardServiceDefinition,
  ServiceCategoryReference,
  ServiceProfessionReference,
} from "../../../domain/service-definition";
import { SUPPORTED_SERVICE_DOCUMENTS } from "../../../domain/service-definition";
import {
  ELECTRICIAN_FORM_FIELD_IDS,
} from "./electrician-service-form-fields";
import {
  recommendedFormField,
  requiredFormField,
  type ServiceFormFieldReference,
} from "../../../domain/service-form-schema";

export const ELECTRICIAN_PROFESSION: ServiceProfessionReference = {
  id: "electrician",
  name: "Eletricista",
};

export const ELECTRICIAN_SERVICE_CATEGORIES = [
  defineServiceCategory("basic-installations", "Instalações básicas"),
  defineServiceCategory("lighting", "Iluminação"),
  defineServiceCategory("equipment", "Equipamentos"),
  defineServiceCategory("panels-and-protection", "Quadros e proteção"),
  defineServiceCategory("wiring-and-circuits", "Fiação e circuitos"),
  defineServiceCategory("diagnostics-and-maintenance", "Diagnóstico e manutenção"),
  defineServiceCategory("construction-and-renovation", "Obras e reformas"),
  defineServiceCategory("specialized-services", "Serviços especializados"),
] as const;

const [
  basicInstallations,
  lighting,
  equipment,
  panelsAndProtection,
  wiringAndCircuits,
  diagnosticsAndMaintenance,
  constructionAndRenovation,
  specializedServices,
] = ELECTRICIAN_SERVICE_CATEGORIES;

const standardServices: readonly OfficialStandardServiceDefinition[] = [
  defineElectricianService(
    "electrician-outlet-installation",
    "Instalação de tomada",
    "Instala uma nova tomada em ponto elétrico preparado ou conforme o escopo informado.",
    basicInstallations,
  ),
  defineElectricianService(
    "electrician-outlet-replacement",
    "Troca de tomada",
    "Substitui uma tomada existente e verifica as condições básicas da ligação.",
    basicInstallations,
  ),
  defineElectricianService(
    "electrician-switch-installation",
    "Instalação de interruptor",
    "Instala um interruptor para comando de iluminação ou carga compatível.",
    basicInstallations,
  ),
  defineElectricianService(
    "electrician-switch-replacement",
    "Troca de interruptor",
    "Substitui um interruptor existente e confere sua ligação.",
    basicInstallations,
  ),
  defineElectricianService(
    "electrician-electrical-point-creation",
    "Criação de ponto elétrico",
    "Cria um novo ponto elétrico conforme local, carga e condições informadas.",
    basicInstallations,
  ),
  defineElectricianService(
    "electrician-light-fixture-installation",
    "Instalação de luminária",
    "Instala luminária em ponto elétrico existente ou previamente preparado.",
    lighting,
  ),
  defineElectricianService(
    "electrician-ceiling-light-installation",
    "Instalação de plafon",
    "Instala plafon e realiza as conexões elétricas necessárias no ponto indicado.",
    lighting,
  ),
  defineElectricianService(
    "electrician-pendant-light-installation",
    "Instalação de pendente",
    "Instala luminária pendente considerando fixação, altura e alimentação disponíveis.",
    lighting,
  ),
  defineElectricianService(
    "electrician-spotlight-installation",
    "Instalação de spot",
    "Instala um ou mais spots conforme os pontos e o acabamento previstos.",
    lighting,
  ),
  defineElectricianService(
    "electrician-led-strip-installation",
    "Instalação de fita LED",
    "Instala fita LED, alimentação e acessórios compatíveis com o projeto informado.",
    lighting,
  ),
  defineElectricianService(
    "electrician-floodlight-installation",
    "Instalação de refletor",
    "Instala refletor em local e circuito adequados às condições declaradas.",
    lighting,
  ),
  defineElectricianService(
    "electrician-motion-sensor-installation",
    "Instalação de sensor de presença",
    "Instala e configura sensor de presença para o circuito indicado.",
    lighting,
  ),
  defineElectricianService(
    "electrician-electric-shower-installation",
    "Instalação de chuveiro elétrico",
    "Instala chuveiro elétrico compatível com a alimentação e a proteção disponíveis.",
    equipment,
    [
      requiredFormField(ELECTRICIAN_FORM_FIELD_IDS.supplyVoltage),
      recommendedFormField(ELECTRICIAN_FORM_FIELD_IDS.equipmentPower),
      recommendedFormField(ELECTRICIAN_FORM_FIELD_IDS.dedicatedCircuit),
      recommendedFormField(ELECTRICIAN_FORM_FIELD_IDS.breakerRating),
    ],
  ),
  defineElectricianService(
    "electrician-shower-heating-element-replacement",
    "Troca de resistência de chuveiro",
    "Substitui a resistência por componente compatível e verifica o funcionamento.",
    equipment,
  ),
  defineElectricianService(
    "electrician-ceiling-fan-installation",
    "Instalação de ventilador de teto",
    "Instala ventilador de teto, comando e conexões conforme o equipamento informado.",
    equipment,
    [
      recommendedFormField(ELECTRICIAN_FORM_FIELD_IDS.electricalPoint),
      recommendedFormField(ELECTRICIAN_FORM_FIELD_IDS.wallControl),
      recommendedFormField(ELECTRICIAN_FORM_FIELD_IDS.ceilingStructure),
    ],
  ),
  defineElectricianService(
    "electrician-air-conditioner-electrical-preparation",
    "Preparação elétrica para ar-condicionado",
    "Prepara alimentação e proteção elétrica para o equipamento especificado.",
    equipment,
  ),
  defineElectricianService(
    "electrician-doorbell-installation",
    "Instalação de campainha",
    "Instala campainha e sua alimentação conforme o modelo e o local.",
    equipment,
  ),
  defineElectricianService(
    "electrician-electronic-gate-power-supply",
    "Alimentação elétrica para portão eletrônico",
    "Prepara alimentação elétrica para o sistema de portão eletrônico informado.",
    equipment,
  ),
  defineElectricianService(
    "electrician-circuit-breaker-replacement",
    "Troca de disjuntor",
    "Substitui disjuntor após avaliação de compatibilidade com o circuito.",
    panelsAndProtection,
  ),
  defineElectricianService(
    "electrician-rcd-installation",
    "Instalação de DR",
    "Instala dispositivo diferencial residual conforme o quadro e os circuitos atendidos.",
    panelsAndProtection,
  ),
  defineElectricianService(
    "electrician-surge-protection-device-installation",
    "Instalação de DPS",
    "Instala dispositivo de proteção contra surtos conforme as condições do quadro.",
    panelsAndProtection,
  ),
  defineElectricianService(
    "electrician-distribution-board-assembly",
    "Montagem de quadro de distribuição",
    "Monta quadro de distribuição com circuitos e proteções definidos no escopo.",
    panelsAndProtection,
  ),
  defineElectricianService(
    "electrician-electrical-panel-renovation",
    "Reforma de quadro elétrico",
    "Reorganiza ou substitui componentes do quadro conforme diagnóstico e escopo aprovados.",
    panelsAndProtection,
  ),
  defineElectricianService(
    "electrician-circuit-load-balancing",
    "Balanceamento de circuitos",
    "Avalia e redistribui cargas entre circuitos ou fases quando tecnicamente aplicável.",
    panelsAndProtection,
  ),
  defineElectricianService(
    "electrician-cable-routing",
    "Passagem de cabos",
    "Realiza passagem de cabos pelos trajetos e condutos definidos.",
    wiringAndCircuits,
  ),
  defineElectricianService(
    "electrician-wiring-replacement",
    "Troca de fiação",
    "Substitui fiação em circuitos identificados conforme o escopo e a avaliação técnica.",
    wiringAndCircuits,
  ),
  defineElectricianService(
    "electrician-conduit-installation",
    "Instalação de eletroduto",
    "Instala eletroduto no trajeto e com o método definidos para a infraestrutura elétrica.",
    wiringAndCircuits,
  ),
  defineElectricianService(
    "electrician-electrical-circuit-creation",
    "Criação de circuito elétrico",
    "Cria circuito elétrico para a carga e os pontos especificados.",
    wiringAndCircuits,
  ),
  defineElectricianService(
    "electrician-electrical-connection-correction",
    "Correção de ligação elétrica",
    "Corrige ligação elétrica identificada como inadequada após avaliação do local.",
    wiringAndCircuits,
  ),
  defineElectricianService(
    "electrician-short-circuit-diagnosis",
    "Diagnóstico de curto-circuito",
    "Investiga a origem provável de curto-circuito e registra a correção separadamente quando necessária.",
    diagnosticsAndMaintenance,
  ),
  defineElectricianService(
    "electrician-power-outage-diagnosis",
    "Diagnóstico de queda de energia",
    "Investiga interrupções de energia na instalação e identifica ações recomendadas.",
    diagnosticsAndMaintenance,
  ),
  defineElectricianService(
    "electrician-leakage-current-identification",
    "Identificação de fuga de corrente",
    "Realiza verificações para localizar possível fuga de corrente na instalação.",
    diagnosticsAndMaintenance,
  ),
  defineElectricianService(
    "electrician-loose-connection-repair",
    "Correção de mau contato",
    "Localiza e corrige mau contato no ponto ou circuito indicado.",
    diagnosticsAndMaintenance,
  ),
  defineElectricianService(
    "electrician-electrical-installation-inspection",
    "Revisão da instalação elétrica",
    "Inspeciona os itens definidos da instalação e registra problemas ou recomendações.",
    diagnosticsAndMaintenance,
  ),
  defineElectricianService(
    "electrician-preventive-maintenance",
    "Manutenção preventiva",
    "Executa verificações e intervenções preventivas previstas para a instalação.",
    diagnosticsAndMaintenance,
  ),
  defineElectricianService(
    "electrician-residential-electrical-installation",
    "Instalação elétrica residencial",
    "Executa instalação elétrica residencial conforme projeto, ambientes e escopo informados.",
    constructionAndRenovation,
  ),
  defineElectricianService(
    "electrician-electrical-renovation",
    "Reforma elétrica",
    "Reforma partes definidas da instalação elétrica conforme levantamento e escopo aprovados.",
    constructionAndRenovation,
  ),
  defineElectricianService(
    "electrician-electrical-system-expansion",
    "Ampliação da instalação elétrica",
    "Amplia pontos, circuitos ou capacidade conforme avaliação e escopo informados.",
    constructionAndRenovation,
  ),
  defineElectricianService(
    "electrician-service-entrance-upgrade",
    "Adequação do padrão de entrada",
    "Adequa o padrão de entrada conforme condições técnicas e exigências aplicáveis ao local.",
    constructionAndRenovation,
  ),
  defineElectricianService(
    "electrician-grounding-installation",
    "Instalação de aterramento",
    "Instala sistema de aterramento conforme avaliação e escopo técnico definidos.",
    specializedServices,
  ),
  defineElectricianService(
    "electrician-home-automation-installation",
    "Instalação de automação residencial",
    "Instala componentes de automação residencial e realiza configurações previstas.",
    specializedServices,
  ),
  defineElectricianService(
    "electrician-smart-outlet-installation",
    "Instalação de tomada inteligente",
    "Instala e configura tomada inteligente compatível com o ponto indicado.",
    specializedServices,
  ),
  defineElectricianService(
    "electrician-smart-switch-installation",
    "Instalação de interruptor inteligente",
    "Instala e configura interruptor inteligente conforme a ligação disponível.",
    specializedServices,
  ),
  defineElectricianService(
    "electrician-ev-charger-preparation",
    "Preparação para carregador de veículo elétrico",
    "Prepara circuito e proteção para futuro carregador conforme carga e condições informadas.",
    specializedServices,
  ),
];

const electricianOtherServiceDefinition: OfficialFreeFormServiceDefinition = {
  active: true,
  description: "Permite descrever um serviço elétrico que não aparece na lista.",
  freeTextPolicy: {
    guidance:
      "A descrição deve ser revisada. Solicitações envolvendo fraude, desvio de energia, violação de medidores ou risco grave não são suportadas.",
    reviewRequired: true,
  },
  id: "electrician-other-service",
  kind: "free-form",
  name: "Outro serviço",
  notes: [
    "Esta opção não representa um serviço oficial comum e exige descrição livre.",
  ],
  origin: "official",
  profession: ELECTRICIAN_PROFESSION,
  formConfiguration: {
    mode: "configured",
    fields: [
      requiredFormField(ELECTRICIAN_FORM_FIELD_IDS.freeDescription),
    ],
  },
  risks: ["A descrição livre pode exigir orientação técnica ou de segurança."],
  supportedDocuments: SUPPORTED_SERVICE_DOCUMENTS,
};

export const ELECTRICIAN_SERVICE_DEFINITIONS = [
  ...standardServices,
  electricianOtherServiceDefinition,
] as const;

function defineServiceCategory(id: string, name: string): ServiceCategoryReference {
  return { id, name };
}

function defineElectricianService(
  id: string,
  name: string,
  description: string,
  serviceCategory: ServiceCategoryReference,
  fields?: readonly ServiceFormFieldReference[],
): OfficialStandardServiceDefinition {
  return {
    active: true,
    category: serviceCategory,
    ...(fields
      ? { formConfiguration: { fields, mode: "configured" as const } }
      : {}),
    description,
    id,
    kind: "standard",
    name,
    origin: "official",
    profession: ELECTRICIAN_PROFESSION,
    supportedDocuments: SUPPORTED_SERVICE_DOCUMENTS,
  };
}
