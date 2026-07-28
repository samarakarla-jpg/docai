import type {
  ContractDefinition,
  ContractFormFieldSchema,
  ContractFormSectionSchema,
  ContractGenerationContentBinding,
} from "./contract-definition";
import type { ContractGenerationSection, ContractType } from "./contract-models";

type GeneralContractConfiguration = Readonly<{
  contractType?: ContractType;
  coreFields?: GeneralContractCoreFields;
  description: string;
  detailFields: readonly ContractFormFieldSchema[];
  engineBindings?: readonly ContractGenerationContentBinding[];
  id: string;
  name: string;
  objective: string;
  partyTitles?: readonly [string, string];
  sections: readonly ContractGenerationSection[];
  version?: number;
}>;

type GeneralContractCoreField = Readonly<{
  defaultValue?: string;
  helpText?: string;
  label: string;
  required?: boolean;
}>;

type GeneralContractCoreFields = Readonly<{
  contractObject: GeneralContractCoreField;
  startDate: GeneralContractCoreField;
  term: GeneralContractCoreField;
  value: GeneralContractCoreField;
}>;

const standardEngineBindings: Readonly<
  Record<ContractType, readonly ContractGenerationContentBinding[]>
> = {
  loan: [
    binding("contractObject", "subject"),
    binding("value", "repayment"),
    binding("term", "term"),
  ],
  rental: [
    binding("contractObject", "property"),
    binding("value", "rent"),
    binding("term", "term"),
  ],
  sale: [
    binding("contractObject", "subject"),
    binding("value", "price"),
    binding("startDate", "delivery"),
  ],
  services: [
    binding("contractObject", "scope"),
    binding("value", "compensation"),
    binding("term", "term"),
  ],
};

export const GENERAL_CONTRACT_DEFINITIONS: readonly ContractDefinition<"contratos-gerais">[] = [
  defineGeneralContract({
    coreFields: {
      contractObject: {
        helpText: "Ex.: manutenção mensal, criação de um site ou aulas particulares.",
        label: "Qual serviço será realizado?",
      },
      startDate: { label: "Quando o serviço começa?" },
      term: {
        helpText: "Ex.: entrega em 15 dias ou atendimento mensal por 6 meses.",
        label: "Qual é o prazo ou a frequência do serviço?",
      },
      value: { label: "Qual o valor combinado?" },
    },
    description:
      "Organiza a contratação de serviços, com escopo, entregas, remuneração e condições de execução.",
    detailFields: [
      textarea("deliverables", "O que será entregue?"),
      textarea("scopeExclusions", "O que não está incluído no serviço?", false),
      textarea(
        "acceptanceCriteria",
        "Como o cliente confirmará que a entrega está correta?",
      ),
      text("paymentSchedule", "Como e quando o pagamento será feito?"),
      text("cancellationNotice", "Como qualquer parte poderá cancelar?"),
      select("expensesResponsibility", "Quem pagará as despesas do serviço?", [
        option("Cada parte arca com suas despesas", "own-expenses"),
        option("Contratante", "contractor"),
        option("Contratado, com reembolso aprovado", "contracted-reimbursed"),
      ]),
    ],
    id: "prestacao-de-servicos",
    name: "Contrato de Prestação de Serviços",
    objective:
      "Registrar com clareza o serviço contratado, as entregas, responsabilidades, remuneração e condições de encerramento.",
    sections: [
      generationSection("parties", "Identificação das partes", "Identificar contratante e contratado."),
      generationSection("object", "Objeto e escopo", "Delimitar os serviços e o que não está incluído."),
      generationSection("deliveries", "Entregas e aceite", "Organizar entregas, prazos e critérios de aceite."),
      generationSection(
        "payment",
        "Preço, pagamento e despesas",
        "Registrar valor, vencimentos, despesas e consequências proporcionais do atraso, sem inventar percentuais não informados.",
      ),
      generationSection(
        "responsibilities",
        "Responsabilidades das partes",
        "Distribuir deveres de colaboração, execução, comunicação e aceite de forma equilibrada.",
      ),
      generationSection(
        "termination",
        "Prazo e encerramento",
        "Organizar cancelamento, aviso, pagamento do que já foi realizado e devoluções necessárias.",
      ),
    ],
    version: 2,
  }),
  defineGeneralContract({
    coreFields: {
      contractObject: {
        helpText: "Ex.: criação de identidade visual, manutenção mensal ou consultoria financeira.",
        label: "Qual serviço ou solução você está oferecendo?",
      },
      startDate: { label: "Quando o serviço poderá começar?" },
      term: {
        helpText: "Ex.: entrega em 15 dias ou execução mensal por 6 meses.",
        label: "Quando o serviço será entregue ou concluído?",
      },
      value: { label: "Qual é o valor da proposta?" },
    },
    description:
      "Apresenta uma oferta comercial clara, com solução, escopo, investimento, prazo, validade e aceite.",
    detailFields: [
      textarea("clientNeed", "Qual necessidade do cliente será atendida?"),
      textarea("deliverables", "O que está incluído na proposta?"),
      textarea("scopeExclusions", "O que não está incluído na proposta?", false),
      text("paymentSchedule", "Como o pagamento será feito?"),
      date("proposalValidity", "Até quando esta proposta é válida?"),
      select("acceptanceMethod", "Como o cliente poderá aceitar a proposta?", [
        option("Assinatura desta proposta", "signed-proposal"),
        option("Aceite por e-mail", "email"),
        option("Aceite por mensagem escrita", "written-message"),
      ]),
    ],
    id: "proposta-comercial-com-aceite",
    name: "Proposta Comercial com Aceite",
    objective:
      "Registrar uma oferta compreensível e verificável, com solução, escopo, investimento, prazo, validade e aceite sem promessas não informadas.",
    partyTitles: ["Cliente", "Prestador"],
    sections: [
      generationSection(
        "parties",
        "Identificação das partes e da proposta",
        "Identificar cliente, prestador e proposta sem inventar dados ou representantes.",
      ),
      generationSection(
        "need",
        "Necessidade e solução oferecida",
        "Relacionar a necessidade informada à solução oferecida sem garantir resultado não declarado.",
      ),
      generationSection(
        "scope",
        "Escopo, inclusões e exclusões",
        "Delimitar entregas, itens incluídos e exclusões exclusivamente conforme as respostas.",
      ),
      generationSection(
        "commercial",
        "Investimento e pagamento",
        "Registrar preço e forma de pagamento sem criar vencimentos, encargos ou condições ausentes.",
      ),
      generationSection(
        "schedule",
        "Início e prazo",
        "Registrar início possível e prazo de entrega ou execução sem prometer cronograma não informado.",
      ),
      generationSection(
        "acceptance",
        "Validade e aceite",
        "Definir validade e meio de aceite expresso, sem tratar silêncio como concordância.",
      ),
      generationSection(
        "relationship",
        "Relação com contrato posterior",
        "Explicar que a proposta aceita registra a oferta e pode ser detalhada por contrato posterior, sem substituição ou alteração silenciosa do que foi aceito.",
      ),
    ],
  }),
  defineGeneralContract({
    coreFields: {
      contractObject: {
        helpText: "Informe o nome, a data ou outra referência do contrato ou proposta original.",
        label: "Qual contrato ou proposta será alterado?",
      },
      startDate: { label: "Quando a alteração começa a valer?" },
      term: {
        helpText: "Deixe em branco se o prazo continuar igual.",
        label: "Qual será o novo prazo, se houver?",
        required: false,
      },
      value: {
        helpText: "Informe somente o acréscimo, desconto ou novo valor combinado.",
        label: "Qual é o impacto no valor?",
        required: false,
      },
    },
    description:
      "Registra uma mudança de escopo e seus impactos em preço ou prazo sem substituir o acordo original.",
    detailFields: [
      textarea("scopeChange", "O que será alterado?"),
      textarea("removedScope", "O que deixará de fazer parte do serviço?", false),
      textarea("changeReason", "Por que a alteração foi solicitada?"),
      select("priceImpactType", "Como a alteração afeta o preço?", [
        option("Não altera o preço", "unchanged"),
        option("Aumenta o preço", "increase"),
        option("Reduz o preço", "decrease"),
      ]),
      text("scheduleImpact", "Como a alteração afeta o cronograma?"),
    ],
    id: "termo-de-alteracao-de-escopo",
    name: "Termo de Alteração de Escopo",
    objective:
      "Formalizar uma mudança específica e seus impactos, preservando todas as condições do acordo original que não foram expressamente alteradas.",
    partyTitles: ["Cliente", "Prestador"],
    sections: [
      generationSection(
        "parties",
        "Identificação das partes e do acordo",
        "Identificar as partes e o documento original sem inventar referências.",
      ),
      generationSection(
        "change",
        "Alteração de escopo",
        "Descrever apenas inclusões, exclusões ou modificações expressamente informadas e registrar o motivo apresentado.",
      ),
      generationSection(
        "price",
        "Impacto no preço e pagamento",
        "Distinguir aumento, redução ou ausência de impacto no preço sem criar valor, vencimento ou encargo ausente.",
      ),
      generationSection(
        "schedule",
        "Impacto no prazo e cronograma",
        "Registrar a data de eficácia, o impacto real no cronograma e o novo prazo somente quando informado.",
      ),
      generationSection(
        "preservation",
        "Condições preservadas",
        "Manter as demais condições do acordo original e evitar substituição integral ou novação presumida.",
      ),
      generationSection(
        "acceptance",
        "Aceite e disposições finais",
        "Registrar concordância de ambas as partes e impedir alteração unilateral do acordo.",
      ),
    ],
  }),
  defineGeneralContract({
    description:
      "Estrutura um trabalho autônomo por projeto, com entregáveis, revisões, aceite e arquivos finais.",
    detailFields: [
      textarea("deliverables", "Quais são os entregáveis do projeto?"),
      number("revisionRounds", "Quantas rodadas de revisão estão incluídas?", "2", 0),
      textarea("acceptanceCriteria", "Quais serão os critérios de aprovação?"),
      text("finalFiles", "Quais arquivos ou formatos finais serão entregues?"),
      select("intellectualProperty", "Como será tratado o uso do trabalho produzido?", [
        option("Licença de uso", "license"),
        option("Cessão a definir após revisão", "assignment-review"),
        option("Uso restrito ao projeto", "project-only"),
      ]),
    ],
    id: "freelancer",
    name: "Freelancer por Projeto",
    objective:
      "Definir um projeto autônomo com entregáveis verificáveis, limites de revisão, aprovação e tratamento inicial dos direitos sobre o trabalho.",
    sections: [
      generationSection("parties", "Identificação das partes", "Identificar cliente e profissional autônomo."),
      generationSection("project", "Projeto e entregáveis", "Descrever escopo, exclusões e resultados esperados."),
      generationSection("schedule", "Cronograma, revisões e aceite", "Organizar etapas, revisões e aprovação."),
      generationSection("payment", "Remuneração e despesas", "Registrar preço, vencimentos e custos autorizados."),
      generationSection("rights", "Arquivos e direitos de uso", "Registrar formatos entregues e destinação inicial dos direitos."),
      generationSection("closure", "Autonomia e encerramento", "Registrar autonomia operacional, prazo e hipóteses de encerramento para revisão."),
    ],
  }),
  defineGeneralContract({
    description:
      "Define objetivos, diagnóstico, recomendações e limites de uma consultoria profissional.",
    detailFields: [
      textarea("consultingObjectives", "Quais resultados a consultoria pretende apoiar?"),
      textarea("informationAccess", "Quais informações e acessos serão fornecidos?"),
      textarea("deliverables", "Quais diagnósticos ou recomendações serão entregues?"),
      select("implementationIncluded", "A execução das recomendações está incluída?", [
        option("Não, apenas diagnóstico e recomendações", "advisory-only"),
        option("Sim, conforme atividades descritas", "implementation-included"),
        option("Será contratada separadamente", "separate-engagement"),
      ]),
    ],
    id: "consultoria-geral",
    name: "Consultoria",
    objective:
      "Organizar uma consultoria sem confundir recomendações profissionais com garantia de resultado ou execução não contratada.",
    sections: [
      generationSection("parties", "Identificação das partes", "Identificar cliente e consultor."),
      generationSection("objectives", "Objetivos e escopo", "Definir problemas, objetivos e limites da consultoria."),
      generationSection("method", "Informações e metodologia", "Organizar acessos, colaboração e método de trabalho."),
      generationSection("deliverables", "Diagnóstico e entregáveis", "Descrever análises, recomendações e apresentação."),
      generationSection("payment", "Remuneração, prazo e despesas", "Registrar preço, cronograma e custos."),
      generationSection("limits", "Responsabilidades e encerramento", "Distinguir recomendação, decisão do cliente e término da relação."),
    ],
  }),
  defineGeneralContract({
    contractType: "sale",
    description:
      "Registra a venda de um bem ou produto, seu estado, preço, pagamento e entrega.",
    detailFields: [
      textarea("itemDetails", "Descreva características, quantidade e estado do bem."),
      textarea("includedItems", "Quais acessórios, documentos ou itens acompanham a venda?", false),
      select("inspectionStatus", "Como ocorrerá a conferência do bem?", [
        option("Conferência na entrega", "at-delivery"),
        option("Conferência antes da entrega", "before-delivery"),
        option("Procedimento específico descrito", "specific-procedure"),
      ]),
      textarea("deliveryConditions", "Informe local e condições de entrega."),
    ],
    id: "compra-e-venda",
    name: "Compra e Venda",
    objective:
      "Documentar a negociação de um bem com identificação suficiente, preço, entrega, conferência e responsabilidades iniciais.",
    partyTitles: ["Comprador", "Vendedor"],
    sections: [
      generationSection("parties", "Identificação das partes", "Identificar comprador e vendedor."),
      generationSection("asset", "Descrição e estado do bem", "Individualizar o bem, quantidade, estado e itens incluídos."),
      generationSection("price", "Preço e pagamento", "Registrar valor, forma e condições de pagamento."),
      generationSection("delivery", "Entrega e conferência", "Organizar data, local, documentos e inspeção."),
      generationSection("responsibilities", "Responsabilidades e garantias", "Registrar declarações e responsabilidades sujeitas a revisão."),
      generationSection("termination", "Inadimplemento e encerramento", "Organizar consequências de descumprimento e disposições finais."),
    ],
  }),
  defineGeneralContract({
    contractType: "sale",
    description:
      "Organiza fornecimento recorrente de produtos, pedidos, preços, entrega e conferência.",
    detailFields: [
      textarea("productCatalog", "Quais produtos e especificações fazem parte do fornecimento?"),
      text("orderFrequency", "Qual será a frequência ou forma de emissão dos pedidos?"),
      textarea("quantityRules", "Existem quantidades mínimas, máximas ou estimadas?"),
      textarea("deliveryConditions", "Informe locais, prazos e condições de entrega."),
      textarea("replacementRules", "Como serão tratadas divergências ou substituições?"),
    ],
    id: "fornecimento-de-produtos",
    name: "Fornecimento de Produtos",
    objective:
      "Estabelecer uma relação recorrente de fornecimento com produtos, pedidos, quantidades, preços, logística e conferência definidos.",
    partyTitles: ["Comprador", "Fornecedor"],
    sections: [
      generationSection("parties", "Identificação das partes", "Identificar comprador e fornecedor."),
      generationSection("products", "Produtos e especificações", "Definir catálogo, qualidade e substituições permitidas."),
      generationSection("orders", "Pedidos e quantidades", "Organizar emissão, confirmação e volumes."),
      generationSection("price", "Preços, pagamento e revisão", "Registrar valores, cobrança e critérios de alteração."),
      generationSection("logistics", "Entrega e conferência", "Organizar prazos, locais, riscos e divergências."),
      generationSection("duration", "Vigência e encerramento", "Definir duração, inadimplemento e transição após encerramento."),
    ],
  }),
  defineGeneralContract({
    contractType: "rental",
    description:
      "Organiza a locação de bens móveis ou equipamentos, com estado, uso, manutenção e devolução.",
    detailFields: [
      textarea("assetInventory", "Identifique o bem, acessórios e números de série."),
      textarea("conditionReport", "Descreva o estado de conservação inicial."),
      text("permittedUse", "Qual será a finalidade autorizada do bem?"),
      textarea("maintenanceRules", "Quem realizará manutenção e reparos?"),
      text("securityDeposit", "Existe caução ou outra garantia?", false),
      textarea("returnConditions", "Como e onde ocorrerá a devolução?"),
    ],
    id: "locacao",
    name: "Locação de Bens e Equipamentos",
    objective:
      "Registrar a cessão temporária de um bem móvel com uso permitido, conservação, remuneração e devolução verificáveis.",
    partyTitles: ["Locatário", "Locador"],
    sections: [
      generationSection("parties", "Identificação das partes", "Identificar locador e locatário conforme os papéis informados."),
      generationSection("asset", "Bem, acessórios e estado", "Individualizar o bem e registrar sua condição inicial."),
      generationSection("use", "Finalidade e uso permitido", "Definir local, finalidade e restrições de uso."),
      generationSection("payment", "Aluguel, encargos e garantia", "Registrar valor, vencimentos, despesas e caução."),
      generationSection("care", "Conservação, manutenção e danos", "Distribuir deveres de cuidado e reparação."),
      generationSection("return", "Prazo, devolução e encerramento", "Organizar vigência, inspeção de retorno e término."),
    ],
  }),
  defineGeneralContract({
    description:
      "Estrutura o compartilhamento protegido de informações para uma finalidade determinada.",
    detailFields: [
      select("ndaMode", "Quem compartilhará informações confidenciais?", [
        option("Ambas as partes", "mutual"),
        option("Somente o contratante", "contractor-only"),
        option("Somente o contratado", "contracted-only"),
      ]),
      textarea("confidentialInformation", "Quais informações devem ser protegidas?"),
      textarea("permittedPurpose", "Para qual finalidade as informações poderão ser usadas?"),
      textarea("authorizedRecipients", "Quem poderá acessar as informações?"),
      textarea("confidentialityExceptions", "Quais exceções devem ser consideradas?", false),
      textarea("returnOrDeletion", "Como ocorrerá devolução ou eliminação das informações?"),
    ],
    id: "confidencialidade-nda",
    name: "Confidencialidade — NDA",
    objective:
      "Delimitar informações confidenciais, finalidade autorizada, acesso, exceções e duração da proteção para revisão humana.",
    partyTitles: ["Parte A", "Parte B"],
    sections: [
      generationSection("parties", "Identificação das partes", "Identificar partes e direção do compartilhamento."),
      generationSection("information", "Informações confidenciais", "Delimitar categorias protegidas sem ampliar fatos não informados."),
      generationSection("purpose", "Finalidade e uso permitido", "Restringir uso e acesso à finalidade declarada."),
      generationSection("exceptions", "Exceções e divulgações necessárias", "Organizar exclusões e comunicações obrigatórias para revisão."),
      generationSection("protection", "Proteção, devolução e eliminação", "Descrever cuidados e destinação das informações."),
      generationSection("term", "Prazo e disposições finais", "Registrar duração, sobrevivência e encerramento."),
    ],
  }),
  defineGeneralContract({
    description:
      "Organiza cooperação comercial, indicações e remuneração sem criar sociedade ou representação automática.",
    detailFields: [
      textarea("partnerContributions", "O que cada parte contribuirá para a parceria?"),
      textarea("commercialActivities", "Quais atividades ou oportunidades estão incluídas?"),
      textarea("commissionRule", "Como será calculada e paga eventual remuneração?"),
      textarea("leadOwnership", "Como serão registrados e atribuídos clientes ou oportunidades?"),
      textarea("authorityLimits", "Quais atos uma parte não poderá praticar em nome da outra?"),
    ],
    id: "parceria-comercial",
    name: "Parceria Comercial sem Constituição de Sociedade",
    objective:
      "Definir cooperação comercial e remuneração sem presumir sociedade, vínculo trabalhista, representação ou poderes não concedidos.",
    partyTitles: ["Parceiro A", "Parceiro B"],
    sections: [
      generationSection("parties", "Identificação e independência", "Identificar as partes e registrar a natureza independente para revisão."),
      generationSection("object", "Objetivo e contribuições", "Descrever atividades, recursos e limites da cooperação."),
      generationSection("opportunities", "Clientes e oportunidades", "Organizar indicação, registro e acompanhamento."),
      generationSection("payment", "Remuneração e prestação de informações", "Definir cálculo, condição e pagamento."),
      generationSection("limits", "Limites de atuação", "Impedir obrigações ou declarações sem autorização expressa."),
      generationSection("termination", "Vigência e encerramento", "Organizar duração, término e oportunidades em andamento."),
    ],
  }),
  defineGeneralContract({
    description:
      "Coleta os limites iniciais de licença ou cessão de direitos sobre uma obra identificada.",
    detailFields: [
      textarea("workDescription", "Identifique a obra ou criação abrangida."),
      select("transferMode", "Qual modalidade será analisada?", [
        option("Licença de uso", "license"),
        option("Cessão parcial", "partial-assignment"),
        option("Cessão total sujeita a revisão", "full-assignment-review"),
      ]),
      textarea("authorizedUses", "Quais modalidades de uso serão autorizadas?"),
      text("territory", "Em qual território o uso será permitido?"),
      select("exclusivity", "A autorização será exclusiva?", [
        option("Não exclusiva", "non-exclusive"),
        option("Exclusiva sujeita a revisão", "exclusive-review"),
      ]),
      textarea("creditsAndAdaptations", "Como serão tratados créditos e adaptações?"),
    ],
    id: "direitos-autorais",
    name: "Licença ou Cessão de Direitos Autorais",
    objective:
      "Identificar a obra e coletar modalidade, usos, território, prazo, exclusividade e remuneração para posterior revisão jurídica.",
    partyTitles: ["Licenciado ou cessionário", "Autor ou titular"],
    sections: [
      generationSection("parties", "Identificação das partes e titularidade", "Identificar titular e beneficiário sem presumir direitos não informados."),
      generationSection("work", "Obra abrangida", "Individualizar a criação e materiais incluídos."),
      generationSection("rights", "Modalidade e usos autorizados", "Registrar licença ou cessão e modalidades de exploração."),
      generationSection("limits", "Território, prazo e exclusividade", "Delimitar alcance temporal e territorial."),
      generationSection("payment", "Remuneração, créditos e adaptações", "Organizar contraprestação e condições de utilização."),
      generationSection("termination", "Término e disposições para revisão", "Registrar encerramento e efeitos sobre usos já autorizados."),
    ],
  }),
  defineGeneralContract({
    description:
      "Formaliza parâmetros iniciais para o encerramento consensual de um contrato existente.",
    detailFields: [
      text("originalContractDate", "Qual é a data do contrato original?"),
      textarea("terminationReason", "Qual é o contexto do encerramento?", false),
      textarea("pendingDeliveries", "Existem entregas ou obrigações pendentes?"),
      textarea("pendingPayments", "Existem valores pendentes e datas de pagamento?"),
      textarea("returns", "Existem bens, acessos, documentos ou informações a devolver?", false),
      textarea("continuingObligations", "Quais obrigações devem continuar após o encerramento?", false),
    ],
    id: "distrato",
    name: "Distrato de Contrato",
    objective:
      "Organizar o encerramento consensual de um contrato, suas pendências e obrigações remanescentes sem presumir quitação ampla.",
    partyTitles: ["Parte A", "Parte B"],
    sections: [
      generationSection("parties", "Identificação das partes e do contrato", "Identificar partes e instrumento encerrado."),
      generationSection("termination", "Encerramento consensual", "Registrar data de eficácia e contexto informado."),
      generationSection("deliveries", "Entregas e devoluções", "Organizar obrigações materiais e acessos pendentes."),
      generationSection("payments", "Valores pendentes", "Registrar pagamentos e prazos sem presumir quitação."),
      generationSection("survival", "Obrigações remanescentes", "Indicar confidencialidade ou outros deveres que continuam."),
      generationSection("final", "Declarações finais para revisão", "Sinalizar reservas, quitação informada e necessidade de revisão."),
    ],
  }),
] as const;

function defineGeneralContract(
  configuration: GeneralContractConfiguration,
): ContractDefinition<"contratos-gerais"> {
  const contractType = configuration.contractType ?? "services";
  const formSchema = {
    sections: [
      ...partySections(configuration.partyTitles),
      contractDetails(
        configuration.name,
        configuration.detailFields,
        configuration.coreFields,
      ),
    ],
  } as const;

  return {
    categorySlug: "contratos-gerais",
    contractType,
    description: configuration.description,
    formSchema,
    generationSchema: {
      answerFieldIds: formSchema.sections.flatMap((section) =>
        section.fields.map((field) => field.id),
      ),
      contentBindings: [
        binding("contractorAddress", "contractorAddress"),
        binding("contractedAddress", "contractedAddress"),
        binding("startDate", "startDate"),
        ...(configuration.engineBindings ?? standardEngineBindings[contractType]),
      ],
      contractType,
      documentTitle: configuration.name,
      partyBindings: [
        {
          addressFieldId: "contractorAddress",
          identifierFieldId: "contractorDocument",
          nameFieldId: "contractorName",
          role: configuration.partyTitles?.[0] ?? "Contratante",
        },
        {
          addressFieldId: "contractedAddress",
          identifierFieldId: "contractedDocument",
          nameFieldId: "contractedName",
          role: configuration.partyTitles?.[1] ?? "Contratado",
        },
      ],
      reviewStatus: "initial-validation",
      sections: configuration.sections,
    },
    id: configuration.id,
    name: configuration.name,
    objective: configuration.objective,
    structure: configuration.sections.map((section) => section.title),
    version: configuration.version ?? 1,
  };
}

function partySections(
  titles: readonly [string, string] = ["Contratante", "Contratado"],
): readonly ContractFormSectionSchema[] {
  return [
    {
      fields: [
        text("contractorName", `Nome — ${titles[0]}`),
        text("contractorDocument", `CPF/CNPJ — ${titles[0]}`),
        text("contractorAddress", `Endereço — ${titles[0]}`, true, "full"),
      ],
      id: "contractor",
      title: titles[0],
    },
    {
      fields: [
        text("contractedName", `Nome — ${titles[1]}`),
        text("contractedDocument", `CPF/CNPJ — ${titles[1]}`),
        text("contractedAddress", `Endereço — ${titles[1]}`, true, "full"),
      ],
      id: "contracted",
      title: titles[1],
    },
  ];
}

function contractDetails(
  contractName: string,
  specificFields: readonly ContractFormFieldSchema[],
  configuredCoreFields?: GeneralContractCoreFields,
): ContractFormSectionSchema {
  const coreFields = configuredCoreFields ?? {
    contractObject: {
      defaultValue: contractName,
      label: "Objeto principal do contrato",
    },
    startDate: { label: "Data de início, eficácia ou entrega" },
    term: { label: "Prazo, duração ou frequência" },
    value: { label: "Valor ou condição econômica principal" },
  };

  return {
    fields: [
      text(
        "contractObject",
        coreFields.contractObject.label,
        coreFields.contractObject.required ?? true,
        "full",
        coreFields.contractObject.defaultValue,
        coreFields.contractObject.helpText,
      ),
      money(
        "value",
        coreFields.value.label,
        coreFields.value.required ?? true,
        coreFields.value.helpText,
      ),
      date(
        "startDate",
        coreFields.startDate.label,
        coreFields.startDate.required ?? true,
        coreFields.startDate.helpText,
      ),
      text(
        "term",
        coreFields.term.label,
        coreFields.term.required ?? true,
        "half",
        coreFields.term.defaultValue,
        coreFields.term.helpText,
      ),
      ...specificFields,
    ],
    id: "contract-details",
    title: "Dados específicos do contrato",
  };
}

function text(
  id: string,
  label: string,
  required = true,
  layout: "full" | "half" = "half",
  defaultValue?: string,
  helpText?: string,
): ContractFormFieldSchema {
  return { defaultValue, helpText, id, label, layout, required, type: "text" };
}

function textarea(
  id: string,
  label: string,
  required = true,
): ContractFormFieldSchema {
  return { id, label, layout: "full", required, rows: 4, type: "textarea" };
}

function date(
  id: string,
  label: string,
  required = true,
  helpText?: string,
): ContractFormFieldSchema {
  return { helpText, id, label, layout: "half", required, type: "date" };
}

function money(
  id: string,
  label: string,
  required = true,
  helpText?: string,
): ContractFormFieldSchema {
  return {
    currency: "BRL",
    helpText,
    id,
    label,
    layout: "half",
    required,
    type: "money",
  };
}

function number(
  id: string,
  label: string,
  defaultValue: string,
  min: number,
): ContractFormFieldSchema {
  return {
    defaultValue,
    id,
    label,
    layout: "half",
    min,
    required: true,
    type: "number",
  };
}

function select(
  id: string,
  label: string,
  options: readonly Readonly<{ label: string; value: string }>[],
): ContractFormFieldSchema {
  return { id, label, layout: "half", options, required: true, type: "select" };
}

function option(label: string, value: string) {
  return { label, value } as const;
}

function binding(
  sourceFieldId: string,
  target: ContractGenerationContentBinding["target"],
): ContractGenerationContentBinding {
  return { sourceFieldId, target };
}

function generationSection(
  id: string,
  title: string,
  objective: string,
): ContractGenerationSection {
  return { id, objective, title };
}
