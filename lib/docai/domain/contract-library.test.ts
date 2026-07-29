import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

const requireModule = createRequire(import.meta.url);
const registerHooks = Reflect.get(requireModule("node:module"), "registerHooks");

if (typeof registerHooks === "function") {
  registerHooks({
    resolve(
      specifier: string,
      context: unknown,
      nextResolve: (specifier: string, context: unknown) => unknown,
    ) {
      if (
        specifier === "./contract-form-schema" ||
        specifier === "./contract-general-definitions"
      ) {
        return nextResolve(`${specifier}.ts`, context);
      }

      return nextResolve(specifier, context);
    },
  });
}

const {
  CONTRACT_CATEGORIES,
  CONTRACT_LIBRARY_MODELS,
  getContractCategory,
  getContractLibraryModel,
  listContractModelsByCategory,
}: typeof import("./contract-library") = requireModule(
  "./contract-library.ts",
);

const expectedModelNames = {
  "contratos-gerais": [
    "Contrato de Prestação de Serviços",
    "Proposta Comercial com Aceite",
    "Termo de Alteração de Escopo",
    "Termo de Entrega e Aceite",
    "Freelancer por Projeto",
    "Consultoria",
    "Compra e Venda",
    "Fornecimento de Produtos",
    "Locação de Bens e Equipamentos",
    "Acordo de Sigilo (NDA)",
    "Parceria Comercial sem Constituição de Sociedade",
    "Licença ou Cessão de Direitos Autorais",
    "Distrato de Contrato",
  ],
  construcao: [
    "Pintura",
    "Reforma",
    "Elétrica",
    "Encanamento",
    "Gesso",
    "Drywall",
    "Piso",
    "Jardinagem",
    "Limpeza Pós-Obra",
  ],
  tecnologia: [
    "Desenvolvimento de Software",
    "Desenvolvimento de Site",
    "Desenvolvimento de E-commerce",
    "Desenvolvimento de Aplicativo",
    "Suporte Técnico",
    "Manutenção",
    "Consultoria de TI",
  ],
  marketing: [
    "Social Media",
    "Gestão de Tráfego",
    "SEO",
    "Copywriting",
    "Branding",
    "Produção de Conteúdo",
  ],
  "design-e-criativos": [
    "Design Gráfico",
    "Identidade Visual",
    "Logotipo",
    "UX/UI",
    "Fotografia",
    "Filmagem",
    "Motion Design",
    "Edição de Vídeo",
  ],
  saude: [
    "Nutricionista",
    "Psicólogo",
    "Personal Trainer",
    "Fisioterapia",
    "Massoterapia",
    "Pilates",
  ],
  educacao: [
    "Professor Particular",
    "Mentoria",
    "Curso Online",
    "Curso Presencial",
    "Reforço Escolar",
  ],
  eventos: [
    "DJ",
    "Banda",
    "Buffet",
    "Cerimonial",
    "Decoração",
    "Fotografia de Eventos",
    "Filmagem de Eventos",
  ],
  "servicos-gerais": [
    "Limpeza",
    "Dedetização",
    "Mudanças",
    "Frete",
    "Chaveiro",
    "Assistência Técnica",
  ],
  consultoria: [
    "Empresarial",
    "Financeira",
    "Comercial",
    "RH",
    "Contábil",
    "Ambiental",
    "Imobiliária",
  ],
} as const;

describe("DocAI contract library", () => {
  it("defines the ten approved categories with unique slugs", () => {
    assert.deepEqual(
      CONTRACT_CATEGORIES.map((category) => category.name),
      [
        "Contratos Gerais",
        "Construção",
        "Tecnologia",
        "Marketing",
        "Design e Criativos",
        "Saúde",
        "Educação",
        "Eventos",
        "Serviços Gerais",
        "Consultoria",
      ],
    );

    assert.equal(
      new Set(CONTRACT_CATEGORIES.map((category) => category.slug)).size,
      CONTRACT_CATEGORIES.length,
    );
  });

  it("associates every model with an existing category", () => {
    const categorySlugs = new Set(
      CONTRACT_CATEGORIES.map((category) => category.slug),
    );

    assert.equal(CONTRACT_LIBRARY_MODELS.length, 74);
    assert.ok(
      CONTRACT_LIBRARY_MODELS.every((model) =>
        categorySlugs.has(model.categorySlug),
      ),
    );
  });

  it("provides the approved models for each category in order", () => {
    for (const category of CONTRACT_CATEGORIES) {
      const models = listContractModelsByCategory(category.slug);

      assert.deepEqual(
        models.map((model) => model.name),
        expectedModelNames[category.slug],
      );
    }
  });

  it("keeps model identifiers unique and metadata complete", () => {
    assert.equal(
      new Set(CONTRACT_LIBRARY_MODELS.map((model) => model.id)).size,
      CONTRACT_LIBRARY_MODELS.length,
    );

    for (const model of CONTRACT_LIBRARY_MODELS) {
      assert.ok(model.name.trim().length > 0);
      assert.ok(model.description.trim().length > 0);
      assert.ok(model.objective.trim().length > 0);
      assert.ok(model.structure.length > 0);
      assert.ok(model.structure.every((section) => section.trim().length > 0));
      assert.ok(
        model.contractType === "services" ||
          model.contractType === "sale" ||
          model.contractType === "rental" ||
          model.contractType === "loan",
      );
      assert.equal(
        model.version,
        ["prestacao-de-servicos", "confidencialidade-nda"].includes(model.id)
          ? 2
          : 1,
      );

      const formFields = model.formSchema.sections.flatMap(
        (section) => section.fields,
      );
      assert.equal(
        formFields.find((field) => field.id === "contractObject")
          ?.defaultValue,
        [
          "prestacao-de-servicos",
          "proposta-comercial-com-aceite",
          "termo-de-alteracao-de-escopo",
          "termo-de-entrega-e-aceite",
          "confidencialidade-nda",
        ].includes(model.id)
          ? undefined
          : model.name,
      );
      assert.deepEqual(
        model.generationSchema.answerFieldIds,
        formFields.map((field) => field.id),
      );
      assert.equal(
        model.generationSchema.contractType,
        model.contractType,
      );
      assert.equal(model.generationSchema.documentTitle, model.name);
      assert.equal(
        model.generationSchema.reviewStatus,
        "initial-validation",
      );
      assert.deepEqual(
        model.generationSchema.sections.map((section) => section.title),
        model.structure,
      );
      assert.equal(model.generationSchema.partyBindings.length, 2);
      assert.ok(model.generationSchema.contentBindings.length >= 6);
    }
  });

  it("maps the compatible general models to the existing contract types", () => {
    const nda = getContractLibraryModel(
      "contratos-gerais",
      "confidencialidade-nda",
    );
    assert.equal(nda?.name, "Acordo de Sigilo (NDA)");
    assert.equal(nda?.version, 2);
    assert.equal(nda?.contractType, "services");
    assert.equal(
      getContractLibraryModel(
        "contratos-gerais",
        "termo-de-entrega-e-aceite",
      )?.contractType,
      "services",
    );
    assert.equal(
      getContractLibraryModel("contratos-gerais", "compra-e-venda")
        ?.contractType,
      "sale",
    );
    assert.equal(
      getContractLibraryModel("contratos-gerais", "locacao")?.contractType,
      "rental",
    );
    assert.equal(
      getContractLibraryModel("tecnologia", "desenvolvimento-de-site")
        ?.contractType,
      "services",
    );
  });

  it("finds a model only within its declared category", () => {
    assert.equal(
      getContractLibraryModel("tecnologia", "desenvolvimento-de-site")?.name,
      "Desenvolvimento de Site",
    );
    assert.equal(
      getContractLibraryModel("marketing", "desenvolvimento-de-site"),
      undefined,
    );
    assert.equal(
      getContractLibraryModel("categoria-inexistente", "modelo-inexistente"),
      undefined,
    );
  });

  it("finds a category by slug without accepting an unknown category", () => {
    assert.equal(getContractCategory("tecnologia")?.name, "Tecnologia");
    assert.equal(getContractCategory("categoria-inexistente"), undefined);
  });
});
