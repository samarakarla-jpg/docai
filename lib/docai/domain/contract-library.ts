import type { ContractType } from "./contract-models";
import type { ContractDefinition } from "./contract-definition";
import {
  createStandardContractFormSchema,
  listFormSchemaFieldIds,
} from "./contract-form-schema";
import { GENERAL_CONTRACT_DEFINITIONS } from "./contract-general-definitions";

const categoryDefinitions = [
  {
    description: "Modelos para relações e acordos de uso amplo.",
    name: "Contratos Gerais",
    slug: "contratos-gerais",
  },
  {
    description: "Modelos para obras, reformas e serviços de construção.",
    name: "Construção",
    slug: "construcao",
  },
  {
    description: "Modelos para desenvolvimento, suporte e serviços digitais.",
    name: "Tecnologia",
    slug: "tecnologia",
  },
  {
    description: "Modelos para campanhas, conteúdo e divulgação de marcas.",
    name: "Marketing",
    slug: "marketing",
  },
  {
    description: "Modelos para projetos de design e produção criativa.",
    name: "Design e Criativos",
    slug: "design-e-criativos",
  },
  {
    description: "Modelos para prestação de serviços na área da saúde.",
    name: "Saúde",
    slug: "saude",
  },
  {
    description: "Modelos para aulas, cursos e serviços educacionais.",
    name: "Educação",
    slug: "educacao",
  },
  {
    description: "Modelos para organização, produção e apoio a eventos.",
    name: "Eventos",
    slug: "eventos",
  },
  {
    description: "Modelos para manutenção, limpeza e atividades recorrentes.",
    name: "Serviços Gerais",
    slug: "servicos-gerais",
  },
  {
    description: "Modelos para consultorias especializadas e empresariais.",
    name: "Consultoria",
    slug: "consultoria",
  },
] as const;

export type ContractCategorySlug =
  (typeof categoryDefinitions)[number]["slug"];

export type ContractCategory = Readonly<{
  description: string;
  name: string;
  slug: ContractCategorySlug;
}>;

export type ContractLibraryModel = ContractDefinition<ContractCategorySlug>;

export const CONTRACT_CATEGORIES: readonly ContractCategory[] =
  categoryDefinitions;

type ContractLibraryModelDefinition = Omit<
  ContractLibraryModel,
  | "categorySlug"
  | "contractType"
  | "formSchema"
  | "generationSchema"
  | "objective"
  | "version"
> &
  Readonly<{
    contractType?: ContractType;
  }>;

const closingSections = [
  "Preço, pagamento e despesas",
  "Prazo, encerramento e rescisão",
  "Responsabilidades e disposições finais",
] as const;

const standardContentBindings = {
  loan: [
    { sourceFieldId: "contractObject", target: "subject" },
    { sourceFieldId: "value", target: "repayment" },
    { sourceFieldId: "term", target: "term" },
  ],
  rental: [
    { sourceFieldId: "contractObject", target: "property" },
    { sourceFieldId: "value", target: "rent" },
    { sourceFieldId: "term", target: "term" },
  ],
  sale: [
    { sourceFieldId: "contractObject", target: "subject" },
    { sourceFieldId: "value", target: "price" },
    { sourceFieldId: "startDate", target: "delivery" },
  ],
  services: [
    { sourceFieldId: "contractObject", target: "scope" },
    { sourceFieldId: "value", target: "compensation" },
    { sourceFieldId: "term", target: "term" },
  ],
} as const;

function serviceStructure(
  scope: string,
  execution: string,
): readonly string[] {
  return [
    "Identificação das partes",
    scope,
    execution,
    ...closingSections,
  ];
}

function defineModels(
  categorySlug: ContractCategorySlug,
  models: readonly ContractLibraryModelDefinition[],
): readonly ContractLibraryModel[] {
  return models.map((model) => {
    const contractType = model.contractType ?? "services";
    const formSchema = createStandardContractFormSchema(model.name);

    return {
      ...model,
      categorySlug,
      contractType,
      formSchema,
      generationSchema: {
        answerFieldIds: listFormSchemaFieldIds(formSchema),
        contentBindings: [
          { sourceFieldId: "contractorAddress", target: "contractorAddress" },
          { sourceFieldId: "contractedAddress", target: "contractedAddress" },
          { sourceFieldId: "startDate", target: "startDate" },
          ...standardContentBindings[contractType],
        ],
        contractType,
        documentTitle: model.name,
        partyBindings: [
          {
            addressFieldId: "contractorAddress",
            identifierFieldId: "contractorDocument",
            nameFieldId: "contractorName",
            role: "Contratante",
          },
          {
            addressFieldId: "contractedAddress",
            identifierFieldId: "contractedDocument",
            nameFieldId: "contractedName",
            role: "Contratado",
          },
        ],
        reviewStatus: "initial-validation",
        sections: model.structure.map((title, index) => ({
          id: `section-${index + 1}`,
          objective: `Organizar as informações de ${title.toLocaleLowerCase("pt-BR")} para validação inicial.`,
          title,
        })),
      },
      objective: model.description,
      version: 1,
    };
  });
}

export const CONTRACT_LIBRARY_MODELS: readonly ContractLibraryModel[] = [
  ...GENERAL_CONTRACT_DEFINITIONS,
  ...defineModels("construcao", [
    {
      description: "Define preparação, materiais, áreas e acabamento de serviços de pintura.",
      id: "pintura",
      name: "Pintura",
      structure: serviceStructure("Áreas, superfícies e padrão de acabamento", "Preparação, tintas, materiais e proteção do local"),
    },
    {
      description: "Organiza uma reforma com etapas, materiais, cronograma e responsabilidades.",
      id: "reforma",
      name: "Reforma",
      structure: serviceStructure("Ambientes, intervenções e escopo da reforma", "Etapas, materiais, cronograma e alterações"),
    },
    {
      description: "Delimita instalações, reparos e testes de serviços elétricos.",
      id: "eletrica",
      name: "Elétrica",
      structure: serviceStructure("Pontos, circuitos e serviços elétricos", "Materiais, normas, testes e segurança"),
    },
    {
      description: "Define instalação ou reparo de tubulações, pontos hidráulicos e equipamentos.",
      id: "encanamento",
      name: "Encanamento",
      structure: serviceStructure("Pontos hidráulicos, tubulações e reparos", "Materiais, testes de vedação e condições do local"),
    },
    {
      description: "Organiza aplicação de gesso, acabamento e preparação das superfícies.",
      id: "gesso",
      name: "Gesso",
      structure: serviceStructure("Superfícies e elementos em gesso", "Materiais, acabamento, secagem e limpeza"),
    },
    {
      description: "Define montagem de paredes, forros e estruturas leves em drywall.",
      id: "drywall",
      name: "Drywall",
      structure: serviceStructure("Paredes, divisórias e forros previstos", "Perfis, placas, isolamento e acabamento"),
    },
    {
      description: "Estabelece instalação ou substituição de revestimentos de piso.",
      id: "piso",
      name: "Piso",
      structure: serviceStructure("Áreas e tipo de revestimento", "Preparação da base, assentamento, rejunte e acabamento"),
    },
    {
      description: "Organiza implantação ou manutenção de jardins e áreas verdes.",
      id: "jardinagem",
      name: "Jardinagem",
      structure: serviceStructure("Áreas verdes e serviços de jardinagem", "Plantas, insumos, manutenção e descarte"),
    },
    {
      description: "Define limpeza detalhada e retirada de resíduos após obra ou reforma.",
      id: "limpeza-pos-obra",
      name: "Limpeza Pós-Obra",
      structure: serviceStructure("Ambientes e nível de limpeza esperado", "Produtos, equipamentos, resíduos e entrega do local"),
    },
  ]),
  ...defineModels("tecnologia", [
    {
      description: "Estrutura o desenvolvimento de um sistema, suas funcionalidades e entregas.",
      id: "desenvolvimento-de-software",
      name: "Desenvolvimento de Software",
      structure: serviceStructure("Requisitos, funcionalidades e escopo técnico", "Etapas, homologação, código-fonte e implantação"),
    },
    {
      description: "Define criação de site, conteúdo, integrações e publicação.",
      id: "desenvolvimento-de-site",
      name: "Desenvolvimento de Site",
      structure: serviceStructure("Páginas, funcionalidades e conteúdo", "Design, desenvolvimento, revisões e publicação"),
    },
    {
      description: "Organiza a criação de uma loja virtual, catálogo e meios de compra.",
      id: "desenvolvimento-de-ecommerce",
      name: "Desenvolvimento de E-commerce",
      structure: serviceStructure("Catálogo, checkout e integrações", "Configuração, testes, conteúdo e lançamento"),
    },
    {
      description: "Define escopo, plataformas e entregas de um aplicativo.",
      id: "desenvolvimento-de-aplicativo",
      name: "Desenvolvimento de Aplicativo",
      structure: serviceStructure("Plataformas, jornadas e funcionalidades", "Protótipo, desenvolvimento, testes e publicação"),
    },
    {
      description: "Estabelece atendimento, canais, prazos e limites de suporte técnico.",
      id: "suporte-tecnico",
      name: "Suporte Técnico",
      structure: serviceStructure("Sistemas, usuários e canais cobertos", "Chamados, prioridades, prazos e escalonamento"),
    },
    {
      description: "Organiza manutenção preventiva e corretiva de sistemas ou equipamentos.",
      id: "manutencao-tecnologia",
      name: "Manutenção",
      structure: serviceStructure("Ativos e rotinas de manutenção", "Atendimento preventivo, corretivo e registro de ocorrências"),
    },
    {
      description: "Define diagnóstico e recomendações especializadas em tecnologia da informação.",
      id: "consultoria-de-ti",
      name: "Consultoria de TI",
      structure: serviceStructure("Objetivos, ambiente e escopo da análise", "Diagnóstico, recomendações e plano de ação"),
    },
  ]),
  ...defineModels("marketing", [
    {
      description: "Organiza planejamento, criação e publicação em redes sociais.",
      id: "social-media",
      name: "Social Media",
      structure: serviceStructure("Canais, público e objetivos", "Calendário, conteúdo, aprovações e relatórios"),
    },
    {
      description: "Define planejamento e operação de campanhas de mídia paga.",
      id: "gestao-de-trafego",
      name: "Gestão de Tráfego",
      structure: serviceStructure("Plataformas, campanhas e metas", "Verba de mídia, otimização, acessos e relatórios"),
    },
    {
      description: "Estrutura melhorias de posicionamento orgânico em mecanismos de busca.",
      id: "seo",
      name: "SEO",
      structure: serviceStructure("Sites, páginas e objetivos de busca", "Auditoria, otimizações, conteúdo e acompanhamento"),
    },
    {
      description: "Define criação de textos publicitários para canais e objetivos determinados.",
      id: "copywriting",
      name: "Copywriting",
      structure: serviceStructure("Peças, canais e objetivos de comunicação", "Pesquisa, redação, revisões e aprovação"),
    },
    {
      description: "Organiza estratégia e posicionamento de uma marca.",
      id: "branding",
      name: "Branding",
      structure: serviceStructure("Contexto, público e objetivos da marca", "Pesquisa, estratégia, posicionamento e entregáveis"),
    },
    {
      description: "Define formatos, pautas e calendário para produção de conteúdo.",
      id: "producao-de-conteudo",
      name: "Produção de Conteúdo",
      structure: serviceStructure("Formatos, temas, canais e volume", "Produção, revisão, aprovação e publicação"),
    },
  ]),
  ...defineModels("design-e-criativos", [
    {
      description: "Organiza a criação de peças gráficas para meios digitais ou impressos.",
      id: "design-grafico",
      name: "Design Gráfico",
      structure: serviceStructure("Peças, formatos e aplicações", "Briefing, criação, revisões e arquivos finais"),
    },
    {
      description: "Define o desenvolvimento do sistema visual completo de uma marca.",
      id: "identidade-visual",
      name: "Identidade Visual",
      structure: serviceStructure("Conceito, público e aplicações da marca", "Pesquisa, elementos visuais, manual e arquivos finais"),
    },
    {
      description: "Estrutura a criação de símbolo e assinatura visual de uma marca.",
      id: "logotipo",
      name: "Logotipo",
      structure: serviceStructure("Briefing e requisitos do logotipo", "Propostas, revisões, versões e arquivos finais"),
    },
    {
      description: "Define pesquisa, fluxos e interfaces para um produto digital.",
      id: "ux-ui",
      name: "UX/UI",
      structure: serviceStructure("Usuários, jornadas e telas previstas", "Pesquisa, wireframes, protótipo e interface final"),
    },
    {
      description: "Organiza ensaio fotográfico, tratamento e entrega das imagens.",
      id: "fotografia",
      name: "Fotografia",
      structure: serviceStructure("Finalidade, local e quantidade de imagens", "Captação, seleção, tratamento e entrega"),
    },
    {
      description: "Define captação audiovisual, equipe, equipamentos e material entregue.",
      id: "filmagem",
      name: "Filmagem",
      structure: serviceStructure("Roteiro, locais e duração da captação", "Equipe, equipamentos, arquivos brutos e entrega"),
    },
    {
      description: "Organiza produção de animações gráficas e suas aplicações.",
      id: "motion-design",
      name: "Motion Design",
      structure: serviceStructure("Peças, duração, formatos e referências", "Roteiro, storyboard, animação, revisões e entrega"),
    },
    {
      description: "Define montagem, tratamento e finalização de material audiovisual.",
      id: "edicao-de-video",
      name: "Edição de Vídeo",
      structure: serviceStructure("Material de origem, duração e formatos", "Montagem, trilha, legendas, revisões e exportação"),
    },
  ]),
  ...defineModels("saude", [
    {
      description: "Organiza acompanhamento nutricional, frequência e responsabilidades do atendimento.",
      id: "nutricionista",
      name: "Nutricionista",
      structure: serviceStructure("Objetivo e modalidade do acompanhamento", "Avaliações, consultas, plano e acompanhamento"),
    },
    {
      description: "Define condições administrativas para prestação de serviços psicológicos.",
      id: "psicologo",
      name: "Psicólogo",
      structure: serviceStructure("Modalidade, frequência e finalidade do atendimento", "Sessões, remarcações, confidencialidade e encaminhamentos"),
    },
    {
      description: "Organiza avaliação e acompanhamento de treinamento físico individual.",
      id: "personal-trainer",
      name: "Personal Trainer",
      structure: serviceStructure("Objetivos, local e frequência dos treinos", "Avaliação, planejamento, acompanhamento e segurança"),
    },
    {
      description: "Define plano de sessões e condições administrativas de fisioterapia.",
      id: "fisioterapia",
      name: "Fisioterapia",
      structure: serviceStructure("Objetivo, modalidade e frequência do atendimento", "Avaliação, sessões, evolução e orientações"),
    },
    {
      description: "Organiza sessões de massoterapia, frequência e condições de atendimento.",
      id: "massoterapia",
      name: "Massoterapia",
      structure: serviceStructure("Modalidade, objetivo e frequência das sessões", "Avaliação inicial, atendimento, cuidados e contraindicações"),
    },
    {
      description: "Define aulas ou sessões de Pilates, frequência e responsabilidades.",
      id: "pilates",
      name: "Pilates",
      structure: serviceStructure("Modalidade, local e frequência das sessões", "Avaliação, acompanhamento, equipamentos e segurança"),
    },
  ]),
  ...defineModels("educacao", [
    {
      description: "Organiza aulas individuais, conteúdo, frequência e acompanhamento.",
      id: "professor-particular",
      name: "Professor Particular",
      structure: serviceStructure("Disciplina, objetivos e nível do aluno", "Plano de aulas, materiais, frequência e acompanhamento"),
    },
    {
      description: "Define objetivos, encontros e limites de um programa de mentoria.",
      id: "mentoria",
      name: "Mentoria",
      structure: serviceStructure("Objetivos, temas e duração da mentoria", "Encontros, materiais, acompanhamento e limites"),
    },
    {
      description: "Organiza oferta de curso remoto, acesso, conteúdo e suporte.",
      id: "curso-online",
      name: "Curso Online",
      structure: serviceStructure("Conteúdo, carga horária e plataforma", "Acesso, materiais, suporte, avaliação e certificado"),
    },
    {
      description: "Define realização de curso presencial, agenda, local e materiais.",
      id: "curso-presencial",
      name: "Curso Presencial",
      structure: serviceStructure("Conteúdo, carga horária, local e turma", "Agenda, materiais, presença, avaliação e certificado"),
    },
    {
      description: "Organiza acompanhamento escolar por disciplina e período.",
      id: "reforco-escolar",
      name: "Reforço Escolar",
      structure: serviceStructure("Disciplinas, dificuldades e objetivos", "Plano de estudos, aulas, materiais e acompanhamento"),
    },
  ]),
  ...defineModels("eventos", [
    {
      description: "Define apresentação musical de DJ, duração, equipamentos e repertório.",
      id: "dj",
      name: "DJ",
      structure: serviceStructure("Evento, duração e estilo musical", "Repertório, equipamentos, montagem e apresentação"),
    },
    {
      description: "Organiza apresentação de banda, formação, repertório e estrutura técnica.",
      id: "banda",
      name: "Banda",
      structure: serviceStructure("Evento, formação e duração da apresentação", "Repertório, rider técnico, passagem de som e apresentação"),
    },
    {
      description: "Define alimentos, bebidas, equipe e operação de buffet para evento.",
      id: "buffet",
      name: "Buffet",
      structure: serviceStructure("Evento, cardápio e quantidade de convidados", "Produção, equipe, serviço, montagem e descarte"),
    },
    {
      description: "Organiza planejamento e condução protocolar de um evento.",
      id: "cerimonial",
      name: "Cerimonial",
      structure: serviceStructure("Tipo de evento, roteiro e participantes", "Planejamento, fornecedores, ensaio e coordenação"),
    },
    {
      description: "Define conceito, itens e montagem da decoração de um evento.",
      id: "decoracao",
      name: "Decoração",
      structure: serviceStructure("Conceito, ambientes e itens decorativos", "Criação, locação, montagem, manutenção e desmontagem"),
    },
    {
      description: "Organiza cobertura fotográfica, momentos previstos e entrega das imagens.",
      id: "fotografia-de-eventos",
      name: "Fotografia de Eventos",
      structure: serviceStructure("Evento, duração e momentos da cobertura", "Equipe, captação, seleção, tratamento e entrega"),
    },
    {
      description: "Define cobertura audiovisual do evento e produtos finais entregues.",
      id: "filmagem-de-eventos",
      name: "Filmagem de Eventos",
      structure: serviceStructure("Evento, duração e momentos da cobertura", "Equipe, captação, edição, versões e entrega"),
    },
  ]),
  ...defineModels("servicos-gerais", [
    {
      description: "Define ambientes, frequência e padrão esperado de serviços de limpeza.",
      id: "limpeza",
      name: "Limpeza",
      structure: serviceStructure("Ambientes, atividades e frequência", "Produtos, equipamentos, acesso e padrão de entrega"),
    },
    {
      description: "Organiza controle de pragas, áreas tratadas e cuidados posteriores.",
      id: "dedetizacao",
      name: "Dedetização",
      structure: serviceStructure("Pragas, áreas e método de tratamento", "Produtos, preparação, segurança, garantia e retorno"),
    },
    {
      description: "Define coleta, transporte e entrega de bens em uma mudança.",
      id: "mudancas",
      name: "Mudanças",
      structure: serviceStructure("Origem, destino e relação de bens", "Embalagem, desmontagem, transporte, entrega e avarias"),
    },
    {
      description: "Organiza transporte de carga, rota, prazos e responsabilidades.",
      id: "frete",
      name: "Frete",
      structure: serviceStructure("Carga, origem, destino e condições de transporte", "Coleta, documentação, entrega, espera e avarias"),
    },
    {
      description: "Define abertura, troca ou reparo de fechaduras e chaves.",
      id: "chaveiro",
      name: "Chaveiro",
      structure: serviceStructure("Local, fechadura e serviço solicitado", "Autorização, materiais, execução, entrega e garantia"),
    },
    {
      description: "Organiza diagnóstico e reparo de equipamento ou produto técnico.",
      id: "assistencia-tecnica",
      name: "Assistência Técnica",
      structure: serviceStructure("Equipamento, defeito informado e escopo", "Diagnóstico, orçamento, peças, reparo e garantia"),
    },
  ]),
  ...defineModels("consultoria", [
    {
      description: "Define diagnóstico e recomendações para gestão e operação empresarial.",
      id: "consultoria-empresarial",
      name: "Empresarial",
      structure: serviceStructure("Objetivos, áreas e desafios empresariais", "Diagnóstico, plano de ação, entregáveis e acompanhamento"),
    },
    {
      description: "Organiza análise e planejamento financeiro para pessoa ou empresa.",
      id: "consultoria-financeira",
      name: "Financeira",
      structure: serviceStructure("Objetivos, dados e período da análise", "Diagnóstico, projeções, recomendações e acompanhamento"),
    },
    {
      description: "Define apoio à estratégia, processos e desempenho comercial.",
      id: "consultoria-comercial",
      name: "Comercial",
      structure: serviceStructure("Mercado, canais e objetivos de vendas", "Diagnóstico, processo comercial, metas e plano de ação"),
    },
    {
      description: "Organiza consultoria de recursos humanos, pessoas e processos internos.",
      id: "consultoria-rh",
      name: "RH",
      structure: serviceStructure("Equipes, processos e objetivos de pessoas", "Diagnóstico, políticas, desenvolvimento e entregáveis"),
    },
    {
      description: "Define orientação contábil e análise de rotinas e informações financeiras.",
      id: "consultoria-contabil",
      name: "Contábil",
      structure: serviceStructure("Contexto, períodos e temas contábeis", "Análise documental, orientações, entregáveis e responsabilidades"),
    },
    {
      description: "Organiza diagnóstico e recomendações sobre gestão e conformidade ambiental.",
      id: "consultoria-ambiental",
      name: "Ambiental",
      structure: serviceStructure("Atividade, local e objetivos ambientais", "Levantamento, análise, recomendações e relatórios"),
    },
    {
      description: "Define análise e orientação profissional relacionada a imóveis.",
      id: "consultoria-imobiliaria",
      name: "Imobiliária",
      structure: serviceStructure("Imóvel, operação e objetivos da consultoria", "Pesquisa, análise, recomendações e entregáveis"),
    },
  ]),
];

export function getContractCategory(
  slug: string,
): ContractCategory | undefined {
  return CONTRACT_CATEGORIES.find((category) => category.slug === slug);
}

export function listContractModelsByCategory(
  categorySlug: ContractCategorySlug,
): readonly ContractLibraryModel[] {
  return CONTRACT_LIBRARY_MODELS.filter(
    (model) => model.categorySlug === categorySlug,
  );
}

export function getContractLibraryModel(
  categorySlug: string,
  modelId: string,
): ContractLibraryModel | undefined {
  return CONTRACT_LIBRARY_MODELS.find(
    (model) =>
      model.categorySlug === categorySlug && model.id === modelId,
  );
}
