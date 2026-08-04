import type {
  ContractDefinition,
  ContractFormFieldSchema,
  ContractFormSectionSchema,
  ContractGenerationContentBinding,
} from "./contract-definition";
import type { ContractGenerationSection, ContractType } from "./contract-models";

type GeneralContractConfiguration = Readonly<{
  additionalFormSections?: readonly ContractFormSectionSchema[];
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
  contractObject?: GeneralContractCoreField;
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
    additionalFormSections: [
      {
        description: "Escolha como e quando o cliente fará o pagamento.",
        fields: [
          select("paymentMethod", "Forma de pagamento", [
            option("PIX", "pix"),
            option("Dinheiro", "cash"),
            option("Cartão", "card"),
            option("Transferência", "bank-transfer"),
            option("Boleto", "bank-slip"),
            option("Outro", "other"),
          ]),
          select("paymentCondition", "Quando o cliente fará o pagamento?", [
            option("À vista antes do início", "upfront-before-start"),
            option("À vista na conclusão", "upfront-on-completion"),
            option(
              "50% de entrada e 50% na conclusão",
              "half-upfront-half-on-completion",
            ),
            option("Parcelado", "installments"),
            option("Outro", "other"),
          ]),
          textarea(
            "paymentDetails",
            "Detalhes do pagamento (opcional)",
            false,
            "Ex.: Entrada de R$ 500,00 via PIX antes do início e saldo restante na conclusão.",
          ),
        ],
        id: "proposal-payment",
        title: "Pagamento",
      },
    ],
    coreFields: {
      startDate: { label: "Qual é a previsão para começar?" },
      term: {
        helpText: "Ex.: concluir em 15 dias ou até 30/08/2026.",
        label: "Qual é o prazo para concluir o serviço?",
      },
      value: { label: "Qual é o valor total da proposta?" },
    },
    description:
      "Apresenta uma oferta comercial clara, com solução, escopo, investimento, prazo, validade e aceite.",
    detailFields: [
      {
        helpText: "Descreva informações específicas sobre este serviço.",
        id: "clientNeed",
        label: "Observações sobre o serviço",
        layout: "full",
        placeholder:
          "Ex.: Instalar luminária somente na cozinha. Trocar apenas o disjuntor da área de serviço. Reutilizar a fiação existente sempre que possível.",
        required: true,
        rows: 4,
        type: "textarea",
      },
      textarea(
        "deliverables",
        "O que está incluído no valor?",
        true,
        "Ex.: Instalação do plafon, conexões elétricas, testes de funcionamento e limpeza do local.",
      ),
      textarea(
        "scopeExclusions",
        "O que não está incluído no valor? (opcional)",
        false,
        "Ex.: Fornecimento do plafon, pintura, reparos em alvenaria ou serviços não descritos nesta proposta.",
      ),
      date("proposalValidity", "Até que dia o cliente poderá aceitar a proposta?"),
      select("acceptanceMethod", "Como o cliente confirmará a proposta?", [
        option("Assinando a proposta", "signed-proposal"),
        option("Respondendo por e-mail", "email"),
        option("Confirmando por mensagem", "written-message"),
      ]),
    ],
    id: "proposta-comercial-com-aceite",
    engineBindings: [
      binding("clientNeed", "scope"),
      binding("value", "compensation"),
      binding("term", "term"),
    ],
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
    coreFields: {
      contractObject: {
        helpText: "Informe o nome, a data ou outra referência do contrato, proposta ou projeto.",
        label: "Qual serviço, contrato ou projeto está sendo entregue?",
      },
      startDate: { label: "Quando a entrega foi realizada?" },
      term: {
        helpText: "Deixe em branco se não houver pendências.",
        label: "Até quando as pendências serão resolvidas?",
        required: false,
      },
      value: {
        helpText: "Informe somente o valor que ainda depende desta entrega.",
        label: "Qual é o saldo relacionado à entrega, se houver?",
        required: false,
      },
    },
    description:
      "Registra a entrega de um serviço, o resultado da conferência e eventuais ressalvas ou pendências.",
    detailFields: [
      textarea("deliveredItems", "O que foi entregue?"),
      select("acceptanceStatus", "Qual foi o resultado da conferência?", [
        option("Entrega aceita", "accepted"),
        option("Aceita com ressalvas", "accepted-with-reservations"),
        option("Aguardando conferência", "pending-verification"),
      ]),
      textarea("reservations", "Existe alguma ressalva sobre a entrega?", false),
      textarea("pendingItems", "Ficou alguma pendência?", false),
      text(
        "deliveryEvidence",
        "Existe algum link, arquivo ou comprovante da entrega?",
        false,
        "full",
      ),
      text(
        "supportOrWarrantyStart",
        "Quando começa o suporte ou a garantia contratual, se houver?",
        false,
        "full",
      ),
    ],
    id: "termo-de-entrega-e-aceite",
    name: "Termo de Entrega e Aceite",
    objective:
      "Comprovar o que foi entregue e registrar o resultado da conferência, as ressalvas e as pendências sem presumir quitação geral.",
    partyTitles: ["Cliente", "Prestador"],
    sections: [
      generationSection(
        "parties",
        "Identificação das partes e do serviço",
        "Identificar cliente, prestador e o contrato, proposta ou projeto relacionado sem inventar referências.",
      ),
      generationSection(
        "delivery",
        "Entrega realizada",
        "Descrever os itens entregues, a data da entrega e as evidências informadas sem acrescentar materiais não declarados.",
      ),
      generationSection(
        "verification",
        "Conferência, aceite e ressalvas",
        "Distinguir aceite integral, aceite com ressalvas e conferência pendente, sem tratar silêncio como concordância.",
      ),
      generationSection(
        "pending-items",
        "Pendências e prazo",
        "Registrar somente as pendências e o prazo informados, sem presumir que a ausência de resposta confirma a conclusão integral.",
      ),
      generationSection(
        "balance",
        "Saldo relacionado à entrega",
        "Registrar eventual saldo vinculado à entrega sem inventar vencimentos, encargos ou declaração de pagamento.",
      ),
      generationSection(
        "support-and-warranty",
        "Suporte e garantia contratual",
        "Registrar o início informado de suporte ou garantia contratual sem limitar garantias legais ou direitos obrigatórios.",
      ),
      generationSection(
        "final-provisions",
        "Disposições finais",
        "Formalizar o resultado da entrega sem criar quitação geral, renúncia de direitos ou alteração das condições não tratadas neste termo.",
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
    coreFields: {
      contractObject: {
        helpText: "Ex.: negociação comercial, desenvolvimento de software ou consultoria.",
        label: "Qual negociação, projeto ou relação este acordo protege?",
      },
      startDate: { label: "Quando o dever de sigilo começa?" },
      term: {
        helpText: "Ex.: 2 anos após o fim do projeto.",
        label: "Por quanto tempo as informações devem ser protegidas?",
      },
      value: {
        helpText: "Deixe em branco se nenhuma penalidade financeira foi combinada.",
        label: "Existe alguma penalidade financeira combinada?",
        required: false,
      },
    },
    description:
      "Protege informações compartilhadas em uma negociação ou projeto, com finalidade, acesso e prazo definidos.",
    detailFields: [
      select("ndaMode", "Quem compartilhará informações confidenciais?", [
        option("Ambas as partes", "mutual"),
        option("Somente a Parte A", "contractor-only"),
        option("Somente a Parte B", "contracted-only"),
      ]),
      textarea("confidentialInformation", "Quais informações devem ser protegidas?"),
      textarea("permittedPurpose", "Para que essas informações poderão ser usadas?"),
      textarea("authorizedRecipients", "Quem poderá receber ou acessar essas informações?"),
      textarea("returnOrDeletion", "O que deverá acontecer com as informações ao final?"),
      textarea("confidentialityExceptions", "Existe alguma exceção adicional?", false),
    ],
    id: "confidencialidade-nda",
    name: "Acordo de Sigilo (NDA)",
    objective:
      "Proteger informações compartilhadas, delimitando finalidade, acesso, exceções, duração e destinação final sem transferir direitos ou substituir obrigações legais.",
    partyTitles: ["Parte A", "Parte B"],
    sections: [
      generationSection(
        "parties",
        "Identificação das partes e compartilhamento",
        "Identificar as partes e distinguir se uma ou ambas compartilharão informações confidenciais.",
      ),
      generationSection(
        "context-and-purpose",
        "Contexto e finalidade permitida",
        "Relacionar o acordo à negociação, projeto ou relação informada e limitar o uso à finalidade declarada.",
      ),
      generationSection(
        "confidential-information",
        "Informações confidenciais",
        "Delimitar somente as informações e categorias indicadas, sem ampliar fatos ou criar sigilo sobre informação pública.",
      ),
      generationSection(
        "permitted-access",
        "Uso permitido e pessoas autorizadas",
        "Restringir acesso às pessoas informadas e exigir que recebam apenas o necessário para a finalidade permitida.",
      ),
      generationSection(
        "protection",
        "Deveres de proteção",
        "Estabelecer cuidados proporcionais contra uso, acesso ou divulgação não autorizados e prever comunicação de incidente conhecido.",
      ),
      generationSection(
        "exceptions",
        "Exceções e divulgação obrigatória",
        "Registrar as exceções informadas e permitir divulgação exigida por lei ou autoridade competente, com comunicação quando juridicamente permitida.",
      ),
      generationSection(
        "return-or-deletion",
        "Devolução, eliminação e cópias",
        "Organizar a destinação informada sem prometer eliminação tecnicamente impossível de cópias de segurança sujeitas a retenção legítima.",
      ),
      generationSection(
        "term-and-penalty",
        "Prazo e penalidade",
        "Registrar o início, a duração e eventual penalidade financeira somente quando informada, sem inventar indenização ou presumir sigilo eterno.",
      ),
      generationSection(
        "final-provisions",
        "Propriedade intelectual, LGPD e disposições finais",
        "Esclarecer que o acordo não transfere propriedade intelectual, não concede licença além da finalidade declarada e não substitui obrigações próprias da LGPD.",
      ),
    ],
    version: 2,
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
      ...(configuration.additionalFormSections ?? []),
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
      ...(coreFields.contractObject
        ? [
            text(
              "contractObject",
              coreFields.contractObject.label,
              coreFields.contractObject.required ?? true,
              "full",
              coreFields.contractObject.defaultValue,
              coreFields.contractObject.helpText,
            ),
          ]
        : []),
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
  placeholder?: string,
): ContractFormFieldSchema {
  return {
    id,
    label,
    layout: "full",
    placeholder,
    required,
    rows: 4,
    type: "textarea",
  };
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
