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
        specifier === "./electrician-service-definitions" ||
        specifier === "./electrician-service-form-fields" ||
        specifier === "../generic-service-form-fields" ||
        specifier === "../../domain/service-form-schema" ||
        specifier === "../../../domain/service-definition" ||
        specifier === "../../../domain/service-form-schema"
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
}: typeof import("./electrician-service-definitions") = requireModule(
  "./electrician-service-definitions.ts",
);
const {
  ELECTRICIAN_SERVICE_FORM_FIELD_REGISTRY,
}: typeof import("./electrician-service-form-fields") = requireModule(
  "./electrician-service-form-fields.ts",
);
const {
  SUPPORTED_SERVICE_DOCUMENTS,
}: typeof import("../../../domain/service-definition") = requireModule(
  "../../../domain/service-definition.ts",
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

describe("electrician service definitions", () => {
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

      const fieldIds =
        definition.formConfiguration?.mode === "configured"
          ? definition.formConfiguration.fields.map((field) => field.fieldId)
          : [];
      assert.equal(new Set(fieldIds).size, fieldIds.length);
      for (const fieldId of fieldIds) {
        assert.ok(
          ELECTRICIAN_SERVICE_FORM_FIELD_REGISTRY.resolve(fieldId),
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

  it("shows familiar voltage labels without changing internal values", () => {
    const voltage = ELECTRICIAN_SERVICE_FORM_FIELD_REGISTRY.resolve(
      "electrician-supply-voltage",
    );

    assert.equal(voltage.type, "select");
    if (voltage.type !== "select") return;
    assert.deepEqual(voltage.options, [
      { label: "127 V (110 V)", value: "127v" },
      { label: "220 V", value: "220v" },
      { label: "Ainda precisa verificar", value: "unknown" },
    ]);
  });

  it("models Other as data with free-text review instead of name-based logic", () => {
    const other = ELECTRICIAN_SERVICE_DEFINITIONS.find(
      (definition) => definition.kind === "free-form",
    );

    assert.ok(other);
    assert.equal(other.id, "electrician-other-service");
    assert.equal(other.category, undefined);
    assert.equal(other.freeTextPolicy.reviewRequired, true);
    assert.deepEqual(other.formConfiguration, {
      fields: [
        {
          fieldId: "electrician-free-service-description",
          requirement: "required",
        },
      ],
      mode: "configured",
    });
  });

  it("references canonical fields for shower and ceiling fan services", () => {
    const shower = ELECTRICIAN_SERVICE_DEFINITIONS.find(
      (definition) =>
        definition.id === "electrician-electric-shower-installation",
    );
    const ceilingFan = ELECTRICIAN_SERVICE_DEFINITIONS.find(
      (definition) => definition.id === "electrician-ceiling-fan-installation",
    );

    assert.ok(shower?.formConfiguration?.mode === "configured");
    assert.deepEqual(
      shower.formConfiguration.fields.map((field) => field.fieldId),
      [
        "electrician-supply-voltage",
        "electrician-equipment-power-watts",
        "electrician-dedicated-circuit-available",
        "electrician-breaker-rating-amps",
      ],
    );
    assert.ok(ceilingFan?.formConfiguration?.mode === "configured");
    assert.deepEqual(
      ceilingFan.formConfiguration.fields.map((field) => field.fieldId),
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

});
