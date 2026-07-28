import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

const requireModule = createRequire(import.meta.url);
const {
  GENERAL_CONTRACT_DEFINITIONS,
}: typeof import("./contract-general-definitions") = requireModule(
  "./contract-general-definitions.ts",
);

const expectedNames = [
  "Prestação de Serviços",
  "Freelancer por Projeto",
  "Consultoria",
  "Compra e Venda",
  "Fornecimento de Produtos",
  "Locação de Bens e Equipamentos",
  "Confidencialidade — NDA",
  "Parceria Comercial sem Constituição de Sociedade",
  "Licença ou Cessão de Direitos Autorais",
  "Distrato de Contrato",
] as const;

const compatibilityFieldIds = [
  "contractorName",
  "contractorDocument",
  "contractorAddress",
  "contractedName",
  "contractedDocument",
  "contractedAddress",
  "contractObject",
  "value",
  "startDate",
  "term",
] as const;

const requiredTargets = {
  loan: ["subject", "repayment", "term"],
  rental: ["property", "rent", "term"],
  sale: ["subject", "price", "delivery"],
  services: ["scope", "compensation", "term"],
} as const;

describe("general contract definitions", () => {
  it("defines the ten approved pilot contracts in order", () => {
    assert.equal(GENERAL_CONTRACT_DEFINITIONS.length, 10);
    assert.deepEqual(
      GENERAL_CONTRACT_DEFINITIONS.map((definition) => definition.name),
      expectedNames,
    );
    assert.equal(
      new Set(GENERAL_CONTRACT_DEFINITIONS.map((definition) => definition.id))
        .size,
      GENERAL_CONTRACT_DEFINITIONS.length,
    );
  });

  it("keeps every definition complete and marked for initial validation", () => {
    for (const definition of GENERAL_CONTRACT_DEFINITIONS) {
      assert.equal(definition.categorySlug, "contratos-gerais");
      assert.equal(definition.version, 1);
      assert.ok(definition.description.trim());
      assert.ok(definition.objective.trim());
      assert.equal(
        definition.generationSchema.reviewStatus,
        "initial-validation",
      );
      assert.equal(
        definition.generationSchema.contractType,
        definition.contractType,
      );
      assert.deepEqual(
        definition.structure,
        definition.generationSchema.sections.map((section) => section.title),
      );
      assert.ok(
        definition.generationSchema.sections.every(
          (section) => section.id && section.title && section.objective,
        ),
      );
    }
  });

  it("preserves compatibility fields and adds contract-specific questions", () => {
    for (const definition of GENERAL_CONTRACT_DEFINITIONS) {
      const fields = definition.formSchema.sections.flatMap(
        (section) => section.fields,
      );
      const fieldIds = fields.map((field) => field.id);

      assert.equal(new Set(fieldIds).size, fieldIds.length);
      assert.ok(compatibilityFieldIds.every((fieldId) => fieldIds.includes(fieldId)));
      assert.ok(fieldIds.length > compatibilityFieldIds.length);
      assert.deepEqual(definition.generationSchema.answerFieldIds, fieldIds);
      assert.equal(
        fields.find((field) => field.id === "contractObject")?.defaultValue,
        definition.name,
      );
    }
  });

  it("references only declared fields and binds the current engine shape", () => {
    for (const definition of GENERAL_CONTRACT_DEFINITIONS) {
      const fieldIds = new Set(
        definition.formSchema.sections.flatMap((section) =>
          section.fields.map((field) => field.id),
        ),
      );
      const referencedIds = [
        ...definition.generationSchema.answerFieldIds,
        ...definition.generationSchema.contentBindings.map(
          (binding) => binding.sourceFieldId,
        ),
        ...definition.generationSchema.partyBindings.flatMap((binding) => [
          binding.nameFieldId,
          ...(binding.identifierFieldId ? [binding.identifierFieldId] : []),
          ...(binding.addressFieldId ? [binding.addressFieldId] : []),
        ]),
      ];
      const targets = new Set(
        definition.generationSchema.contentBindings.map(
          (binding) => binding.target,
        ),
      );

      assert.ok(referencedIds.every((fieldId) => fieldIds.has(fieldId)));
      assert.ok(
        requiredTargets[definition.contractType].every((target) =>
          targets.has(target),
        ),
      );
    }
  });

  it("uses an editable default only where the pilot explicitly defines one", () => {
    const freelancer = GENERAL_CONTRACT_DEFINITIONS.find(
      (definition) => definition.id === "freelancer",
    );
    const revisionRounds = freelancer?.formSchema.sections
      .flatMap((section) => section.fields)
      .find((field) => field.id === "revisionRounds");

    assert.equal(revisionRounds?.defaultValue, "2");
    assert.equal(revisionRounds?.type, "number");
  });
});
