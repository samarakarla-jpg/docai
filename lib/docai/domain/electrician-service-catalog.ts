import type {
  OfficialFreeFormServiceDefinition,
  OfficialStandardServiceDefinition,
  ServiceCategoryReference,
  ServiceProfessionReference,
} from "./service-definition";
import { SUPPORTED_SERVICE_DOCUMENTS } from "./service-definition";
import {
  ELECTRICIAN_CHECKLIST_QUESTION_IDS,
} from "./electrician-service-checklist";
import {
  type ChecklistQuestionReference,
  recommendedQuestion,
  requiredQuestion,
} from "./service-checklist";

export const ELECTRICIAN_PROFESSION: ServiceProfessionReference = {
  id: "electrician",
  name: "Eletricista",
};

export const ELECTRICIAN_SERVICE_CATEGORIES = [
  category("basic-installations", "Instalações básicas"),
  category("lighting", "Iluminação"),
  category("equipment", "Equipamentos"),
  category("panels-and-protection", "Quadros e proteção"),
  category("wiring-and-circuits", "Fiação e circuitos"),
  category("diagnostics-and-maintenance", "Diagnóstico e manutenção"),
  category("construction-and-renovation", "Obras e reformas"),
  category("specialized-services", "Serviços especializados"),
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
  service(
    "electrician-outlet-installation",
    "Instalação de tomada",
    "Instala uma nova tomada em ponto elétrico preparado ou conforme o escopo informado.",
    basicInstallations,
  ),
  service(
    "electrician-outlet-replacement",
    "Troca de tomada",
    "Substitui uma tomada existente e verifica as condições básicas da ligação.",
    basicInstallations,
  ),
  service(
    "electrician-switch-installation",
    "Instalação de interruptor",
    "Instala um interruptor para comando de iluminação ou carga compatível.",
    basicInstallations,
  ),
  service(
    "electrician-switch-replacement",
    "Troca de interruptor",
    "Substitui um interruptor existente e confere sua ligação.",
    basicInstallations,
  ),
  service(
    "electrician-electrical-point-creation",
    "Criação de ponto elétrico",
    "Cria um novo ponto elétrico conforme local, carga e condições informadas.",
    basicInstallations,
  ),
  service(
    "electrician-light-fixture-installation",
    "Instalação de luminária",
    "Instala luminária em ponto elétrico existente ou previamente preparado.",
    lighting,
  ),
  service(
    "electrician-ceiling-light-installation",
    "Instalação de plafon",
    "Instala plafon e realiza as conexões elétricas necessárias no ponto indicado.",
    lighting,
  ),
  service(
    "electrician-pendant-light-installation",
    "Instalação de pendente",
    "Instala luminária pendente considerando fixação, altura e alimentação disponíveis.",
    lighting,
  ),
  service(
    "electrician-spotlight-installation",
    "Instalação de spot",
    "Instala um ou mais spots conforme os pontos e o acabamento previstos.",
    lighting,
  ),
  service(
    "electrician-led-strip-installation",
    "Instalação de fita LED",
    "Instala fita LED, alimentação e acessórios compatíveis com o projeto informado.",
    lighting,
  ),
  service(
    "electrician-floodlight-installation",
    "Instalação de refletor",
    "Instala refletor em local e circuito adequados às condições declaradas.",
    lighting,
  ),
  service(
    "electrician-motion-sensor-installation",
    "Instalação de sensor de presença",
    "Instala e configura sensor de presença para o circuito indicado.",
    lighting,
  ),
  service(
    "electrician-electric-shower-installation",
    "Instalação de chuveiro elétrico",
    "Instala chuveiro elétrico compatível com a alimentação e a proteção disponíveis.",
    equipment,
    [
      requiredQuestion(ELECTRICIAN_CHECKLIST_QUESTION_IDS.supplyVoltage),
      recommendedQuestion(ELECTRICIAN_CHECKLIST_QUESTION_IDS.equipmentPower),
      recommendedQuestion(ELECTRICIAN_CHECKLIST_QUESTION_IDS.dedicatedCircuit),
      recommendedQuestion(ELECTRICIAN_CHECKLIST_QUESTION_IDS.breakerRating),
    ],
  ),
  service(
    "electrician-shower-heating-element-replacement",
    "Troca de resistência de chuveiro",
    "Substitui a resistência por componente compatível e verifica o funcionamento.",
    equipment,
  ),
  service(
    "electrician-ceiling-fan-installation",
    "Instalação de ventilador de teto",
    "Instala ventilador de teto, comando e conexões conforme o equipamento informado.",
    equipment,
    [
      recommendedQuestion(ELECTRICIAN_CHECKLIST_QUESTION_IDS.electricalPoint),
      recommendedQuestion(ELECTRICIAN_CHECKLIST_QUESTION_IDS.wallControl),
      recommendedQuestion(ELECTRICIAN_CHECKLIST_QUESTION_IDS.ceilingStructure),
    ],
  ),
  service(
    "electrician-air-conditioner-electrical-preparation",
    "Preparação elétrica para ar-condicionado",
    "Prepara alimentação e proteção elétrica para o equipamento especificado.",
    equipment,
  ),
  service(
    "electrician-doorbell-installation",
    "Instalação de campainha",
    "Instala campainha e sua alimentação conforme o modelo e o local.",
    equipment,
  ),
  service(
    "electrician-electronic-gate-power-supply",
    "Alimentação elétrica para portão eletrônico",
    "Prepara alimentação elétrica para o sistema de portão eletrônico informado.",
    equipment,
  ),
  service(
    "electrician-circuit-breaker-replacement",
    "Troca de disjuntor",
    "Substitui disjuntor após avaliação de compatibilidade com o circuito.",
    panelsAndProtection,
  ),
  service(
    "electrician-rcd-installation",
    "Instalação de DR",
    "Instala dispositivo diferencial residual conforme o quadro e os circuitos atendidos.",
    panelsAndProtection,
  ),
  service(
    "electrician-surge-protection-device-installation",
    "Instalação de DPS",
    "Instala dispositivo de proteção contra surtos conforme as condições do quadro.",
    panelsAndProtection,
  ),
  service(
    "electrician-distribution-board-assembly",
    "Montagem de quadro de distribuição",
    "Monta quadro de distribuição com circuitos e proteções definidos no escopo.",
    panelsAndProtection,
  ),
  service(
    "electrician-electrical-panel-renovation",
    "Reforma de quadro elétrico",
    "Reorganiza ou substitui componentes do quadro conforme diagnóstico e escopo aprovados.",
    panelsAndProtection,
  ),
  service(
    "electrician-circuit-load-balancing",
    "Balanceamento de circuitos",
    "Avalia e redistribui cargas entre circuitos ou fases quando tecnicamente aplicável.",
    panelsAndProtection,
  ),
  service(
    "electrician-cable-routing",
    "Passagem de cabos",
    "Realiza passagem de cabos pelos trajetos e condutos definidos.",
    wiringAndCircuits,
  ),
  service(
    "electrician-wiring-replacement",
    "Troca de fiação",
    "Substitui fiação em circuitos identificados conforme o escopo e a avaliação técnica.",
    wiringAndCircuits,
  ),
  service(
    "electrician-conduit-installation",
    "Instalação de eletroduto",
    "Instala eletroduto no trajeto e com o método definidos para a infraestrutura elétrica.",
    wiringAndCircuits,
  ),
  service(
    "electrician-electrical-circuit-creation",
    "Criação de circuito elétrico",
    "Cria circuito elétrico para a carga e os pontos especificados.",
    wiringAndCircuits,
  ),
  service(
    "electrician-electrical-connection-correction",
    "Correção de ligação elétrica",
    "Corrige ligação elétrica identificada como inadequada após avaliação do local.",
    wiringAndCircuits,
  ),
  service(
    "electrician-short-circuit-diagnosis",
    "Diagnóstico de curto-circuito",
    "Investiga a origem provável de curto-circuito e registra a correção separadamente quando necessária.",
    diagnosticsAndMaintenance,
  ),
  service(
    "electrician-power-outage-diagnosis",
    "Diagnóstico de queda de energia",
    "Investiga interrupções de energia na instalação e identifica ações recomendadas.",
    diagnosticsAndMaintenance,
  ),
  service(
    "electrician-leakage-current-identification",
    "Identificação de fuga de corrente",
    "Realiza verificações para localizar possível fuga de corrente na instalação.",
    diagnosticsAndMaintenance,
  ),
  service(
    "electrician-loose-connection-repair",
    "Correção de mau contato",
    "Localiza e corrige mau contato no ponto ou circuito indicado.",
    diagnosticsAndMaintenance,
  ),
  service(
    "electrician-electrical-installation-inspection",
    "Revisão da instalação elétrica",
    "Inspeciona os itens definidos da instalação e registra problemas ou recomendações.",
    diagnosticsAndMaintenance,
  ),
  service(
    "electrician-preventive-maintenance",
    "Manutenção preventiva",
    "Executa verificações e intervenções preventivas previstas para a instalação.",
    diagnosticsAndMaintenance,
  ),
  service(
    "electrician-residential-electrical-installation",
    "Instalação elétrica residencial",
    "Executa instalação elétrica residencial conforme projeto, ambientes e escopo informados.",
    constructionAndRenovation,
  ),
  service(
    "electrician-electrical-renovation",
    "Reforma elétrica",
    "Reforma partes definidas da instalação elétrica conforme levantamento e escopo aprovados.",
    constructionAndRenovation,
  ),
  service(
    "electrician-electrical-system-expansion",
    "Ampliação da instalação elétrica",
    "Amplia pontos, circuitos ou capacidade conforme avaliação e escopo informados.",
    constructionAndRenovation,
  ),
  service(
    "electrician-service-entrance-upgrade",
    "Adequação do padrão de entrada",
    "Adequa o padrão de entrada conforme condições técnicas e exigências aplicáveis ao local.",
    constructionAndRenovation,
  ),
  service(
    "electrician-grounding-installation",
    "Instalação de aterramento",
    "Instala sistema de aterramento conforme avaliação e escopo técnico definidos.",
    specializedServices,
  ),
  service(
    "electrician-home-automation-installation",
    "Instalação de automação residencial",
    "Instala componentes de automação residencial e realiza configurações previstas.",
    specializedServices,
  ),
  service(
    "electrician-smart-outlet-installation",
    "Instalação de tomada inteligente",
    "Instala e configura tomada inteligente compatível com o ponto indicado.",
    specializedServices,
  ),
  service(
    "electrician-smart-switch-installation",
    "Instalação de interruptor inteligente",
    "Instala e configura interruptor inteligente conforme a ligação disponível.",
    specializedServices,
  ),
  service(
    "electrician-ev-charger-preparation",
    "Preparação para carregador de veículo elétrico",
    "Prepara circuito e proteção para futuro carregador conforme carga e condições informadas.",
    specializedServices,
  ),
];

const otherService: OfficialFreeFormServiceDefinition = {
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
  checklist: {
    mode: "configured",
    questions: [
      requiredQuestion(ELECTRICIAN_CHECKLIST_QUESTION_IDS.freeDescription),
    ],
  },
  risks: ["A descrição livre pode exigir orientação técnica ou de segurança."],
  supportedDocuments: SUPPORTED_SERVICE_DOCUMENTS,
};

export const ELECTRICIAN_SERVICE_DEFINITIONS = [
  ...standardServices,
  otherService,
] as const;

function category(id: string, name: string): ServiceCategoryReference {
  return { id, name };
}

function service(
  id: string,
  name: string,
  description: string,
  serviceCategory: ServiceCategoryReference,
  questions?: readonly ChecklistQuestionReference[],
): OfficialStandardServiceDefinition {
  return {
    active: true,
    category: serviceCategory,
    ...(questions
      ? { checklist: { mode: "configured" as const, questions } }
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
