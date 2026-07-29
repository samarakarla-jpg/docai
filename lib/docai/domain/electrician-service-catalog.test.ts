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
        specifier === "./electrician-service-catalog" ||
        specifier === "./electrician-service-checklist" ||
        specifier === "./service-checklist" ||
        specifier === "./service-checklist-questions" ||
        specifier === "./service-definition"
      ) {
        return nextResolve(`${specifier}.ts`, context);
      }

      return nextResolve(specifier, context);
    },
  });
}

const {
  ELECTRICIAN_PROFESSION,
  ELECTRICIAN_SERVICE_CATEGORIES,
  ELECTRICIAN_SERVICE_DEFINITIONS,
}: typeof import("./electrician-service-catalog") = requireModule(
  "./electrician-service-catalog.ts",
);
const {
  SERVICE_CATALOG,
  DuplicateServiceDefinitionIdError,
  ServiceCatalog,
  createLocalServiceDefinitionSource,
}: typeof import("./service-catalog") = requireModule("./service-catalog.ts");
const {
  ELECTRICIAN_SERVICE_CHECKLIST_QUESTION_REGISTRY,
}: typeof import("./electrician-service-checklist") = requireModule(
  "./electrician-service-checklist.ts",
);
const {
  SUPPORTED_SERVICE_DOCUMENTS,
}: typeof import("./service-definition") = requireModule(
  "./service-definition.ts",
);

const expectedCategoryNames = [
  "Instalações básicas",
  "Iluminação",
  "Equipamentos",
  "Quadros e proteção",
  "Fiação e circuitos",
  "Diagnóstico e manutenção",
  "Obras e reformas",
  "Serviços especializados",
] as const;

const expectedStandardServiceNames = [
  "Instalação de tomada",
  "Troca de tomada",
  "Instalação de interruptor",
  "Troca de interruptor",
  "Criação de ponto elétrico",
  "Instalação de luminária",
  "Instalação de plafon",
  "Instalação de pendente",
  "Instalação de spot",
  "Instalação de fita LED",
  "Instalação de refletor",
  "Instalação de sensor de presença",
  "Instalação de chuveiro elétrico",
  "Troca de resistência de chuveiro",
  "Instalação de ventilador de teto",
  "Preparação elétrica para ar-condicionado",
  "Instalação de campainha",
  "Alimentação elétrica para portão eletrônico",
  "Troca de disjuntor",
  "Instalação de DR",
  "Instalação de DPS",
  "Montagem de quadro de distribuição",
  "Reforma de quadro elétrico",
  "Balanceamento de circuitos",
  "Passagem de cabos",
  "Troca de fiação",
  "Instalação de eletroduto",
  "Criação de circuito elétrico",
  "Correção de ligação elétrica",
  "Diagnóstico de curto-circuito",
  "Diagnóstico de queda de energia",
  "Identificação de fuga de corrente",
  "Correção de mau contato",
  "Revisão da instalação elétrica",
  "Manutenção preventiva",
  "Instalação elétrica residencial",
  "Reforma elétrica",
  "Ampliação da instalação elétrica",
  "Adequação do padrão de entrada",
  "Instalação de aterramento",
  "Instalação de automação residencial",
  "Instalação de tomada inteligente",
  "Instalação de interruptor inteligente",
  "Preparação para carregador de veículo elétrico",
] as const;

describe("electrician service catalog", () => {
  it("defines the approved profession and categories in order", () => {
    assert.deepEqual(ELECTRICIAN_PROFESSION, {
      id: "electrician",
      name: "Eletricista",
    });
    assert.deepEqual(
      ELECTRICIAN_SERVICE_CATEGORIES.map((category) => category.name),
      expectedCategoryNames,
    );
    assert.equal(
      new Set(
        ELECTRICIAN_SERVICE_CATEGORIES.map((category) => category.id),
      ).size,
      8,
    );
  });

  it("registers 44 standard services and one free-form option", () => {
    const standardServices = ELECTRICIAN_SERVICE_DEFINITIONS.filter(
      (definition) => definition.kind === "standard",
    );
    const freeFormServices = ELECTRICIAN_SERVICE_DEFINITIONS.filter(
      (definition) => definition.kind === "free-form",
    );

    assert.equal(ELECTRICIAN_SERVICE_DEFINITIONS.length, 45);
    assert.equal(standardServices.length, 44);
    assert.equal(freeFormServices.length, 1);
    assert.deepEqual(
      standardServices.map((definition) => definition.name),
      expectedStandardServiceNames,
    );
    assert.equal(
      new Set(
        ELECTRICIAN_SERVICE_DEFINITIONS.map((definition) => definition.id),
      ).size,
      45,
    );

    for (const definition of ELECTRICIAN_SERVICE_DEFINITIONS) {
      assert.match(definition.id, /^electrician-[a-z0-9-]+$/);
      assert.equal(definition.origin, "official");
      assert.equal(definition.active, true);
      assert.equal(definition.profession.id, "electrician");
      assert.ok(definition.name.trim());
      assert.ok(definition.description.trim());
      assert.deepEqual(
        definition.supportedDocuments,
        SUPPORTED_SERVICE_DOCUMENTS,
      );

      const questionIds =
        definition.checklist?.mode === "configured"
          ? definition.checklist.questions.map((question) => question.questionId)
          : [];
      assert.equal(new Set(questionIds).size, questionIds.length);
      for (const questionId of questionIds) {
        assert.ok(
          ELECTRICIAN_SERVICE_CHECKLIST_QUESTION_REGISTRY.resolve(questionId),
        );
      }
    }
  });

  it("organizes every standard service in a declared category", () => {
    const categoryIds = new Set(
      ELECTRICIAN_SERVICE_CATEGORIES.map((category) => category.id),
    );

    for (const definition of ELECTRICIAN_SERVICE_DEFINITIONS) {
      if (definition.kind !== "standard") continue;
      assert.ok(categoryIds.has(definition.category.id));
    }

    const categoryCounts = Object.fromEntries(
      ELECTRICIAN_SERVICE_CATEGORIES.map((category) => [
        category.id,
        ELECTRICIAN_SERVICE_DEFINITIONS.filter(
          (definition) => definition.category?.id === category.id,
        ).length,
      ]),
    );

    assert.deepEqual(categoryCounts, {
      "basic-installations": 5,
      "construction-and-renovation": 4,
      "diagnostics-and-maintenance": 6,
      equipment: 6,
      lighting: 7,
      "panels-and-protection": 6,
      "specialized-services": 5,
      "wiring-and-circuits": 5,
    });
  });

  it("models Other as data with free-text review instead of name-based logic", () => {
    const other = ELECTRICIAN_SERVICE_DEFINITIONS.find(
      (definition) => definition.kind === "free-form",
    );

    assert.ok(other);
    assert.equal(other.id, "electrician-other-service");
    assert.equal(other.category, undefined);
    assert.equal(other.freeTextPolicy.reviewRequired, true);
    assert.deepEqual(other.checklist, {
      mode: "configured",
      questions: [
        {
          questionId: "electrician-free-service-description",
          requirement: "required",
        },
      ],
    });
  });

  it("references canonical questions for shower and ceiling fan services", () => {
    const shower = ELECTRICIAN_SERVICE_DEFINITIONS.find(
      (definition) =>
        definition.id === "electrician-electric-shower-installation",
    );
    const ceilingFan = ELECTRICIAN_SERVICE_DEFINITIONS.find(
      (definition) => definition.id === "electrician-ceiling-fan-installation",
    );

    assert.ok(shower?.checklist?.mode === "configured");
    assert.deepEqual(
      shower.checklist.questions.map((question) => question.questionId),
      [
        "electrician-supply-voltage",
        "electrician-equipment-power-watts",
        "electrician-dedicated-circuit-available",
        "electrician-breaker-rating-amps",
      ],
    );
    assert.ok(ceilingFan?.checklist?.mode === "configured");
    assert.deepEqual(
      ceilingFan.checklist.questions.map((question) => question.questionId),
      [
        "electrician-electrical-point-available",
        "electrician-wall-control-required",
        "electrician-ceiling-structure",
      ],
    );
  });

  it("does not catalog unsafe or illegal activities as standard services", () => {
    const standardCatalogText = ELECTRICIAN_SERVICE_DEFINITIONS.filter(
      (definition) => definition.kind === "standard",
    )
      .flatMap((definition) => [definition.name, definition.description])
      .join(" ");

    assert.doesNotMatch(
      standardCatalogText,
      /ligação clandestina|adulteração de medidor|furto de energia/i,
    );
  });

  it("queries the local source through the generic asynchronous catalog", async () => {
    assert.equal(
      (await SERVICE_CATALOG.list({ professionId: "electrician" })).length,
      45,
    );
    assert.equal(
      (await SERVICE_CATALOG.list({ active: false })).length,
      0,
    );
    assert.equal(
      (await SERVICE_CATALOG.list({ origin: "official" })).length,
      45,
    );
    assert.equal(
      (await SERVICE_CATALOG.list({ supportedDocument: "warranty" })).length,
      45,
    );
    assert.equal(
      (
        await SERVICE_CATALOG.list({
          categoryId: "basic-installations",
          kind: "standard",
        })
      ).length,
      5,
    );
    assert.equal(
      (await SERVICE_CATALOG.getById("electrician-rcd-installation"))?.name,
      "Instalação de DR",
    );
    assert.equal(await SERVICE_CATALOG.getById("unknown-service"), undefined);
  });

  it("rejects ID collisions across independent data sources", async () => {
    const duplicatedDefinition = ELECTRICIAN_SERVICE_DEFINITIONS[0];
    const catalog = new ServiceCatalog([
      createLocalServiceDefinitionSource("first", [duplicatedDefinition]),
      createLocalServiceDefinitionSource("second", [duplicatedDefinition]),
    ]);

    await assert.rejects(
      () => catalog.list(),
      DuplicateServiceDefinitionIdError,
    );
    await assert.rejects(
      () => catalog.getById(duplicatedDefinition.id),
      DuplicateServiceDefinitionIdError,
    );
  });
});
