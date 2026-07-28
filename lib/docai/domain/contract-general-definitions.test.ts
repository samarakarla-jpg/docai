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
  "Contrato de Prestação de Serviços",
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

const serviceSpecificFieldIds = [
  "deliverables",
  "scopeExclusions",
  "acceptanceCriteria",
  "paymentSchedule",
  "cancellationNotice",
  "expensesResponsibility",
] as const;

const serviceRiskTerms = [
  "escopo",
  "pagamento",
  "atraso",
  "cancelamento",
  "responsabilidades",
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
      assert.equal(
        definition.version,
        definition.id === "prestacao-de-servicos" ? 2 : 1,
      );
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
      const contractObject = fields.find(
        (field) => field.id === "contractObject",
      );
      assert.equal(
        contractObject?.defaultValue,
        definition.id === "prestacao-de-servicos"
          ? undefined
          : definition.name,
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

  it("implements the approved service fields without duplicating questions", () => {
    const definition = findDefinition("prestacao-de-servicos");
    const fields = definition.formSchema.sections.flatMap(
      (section) => section.fields,
    );
    const specificFieldIds = fields
      .map((field) => field.id)
      .filter(
        (fieldId) =>
          !compatibilityFieldIds.includes(
            fieldId as (typeof compatibilityFieldIds)[number],
          ),
      );

    assert.deepEqual(specificFieldIds, serviceSpecificFieldIds);
    assert.deepEqual(
      fields.filter((field) => !field.required).map((field) => field.id),
      ["scopeExclusions"],
    );
  });

  it("applies simple language and the three-minute structural limit", () => {
    const businessFields = findDefinition("prestacao-de-servicos")
      .formSchema.sections.flatMap((section) => section.fields)
      .filter(
        (field) =>
          !compatibilityFieldIds
            .slice(0, 6)
            .includes(
              field.id as (typeof compatibilityFieldIds)[number],
            ),
      );

    assert.equal(businessFields.length, 10);
    assert.ok(businessFields.every((field) => field.label.endsWith("?")));
    assert.ok(
      businessFields.every(
        (field) =>
          !/(objeto principal|condição econômica|inadimplemento|rescisão|vigência|novação)/i.test(
            field.label,
          ),
      ),
    );
  });

  it("covers the approved service risks in generation guidance", () => {
    const guidance = findDefinition("prestacao-de-servicos")
      .generationSchema.sections.flatMap((section) => [
        section.title,
        section.objective,
      ])
      .join(" ")
      .toLocaleLowerCase("pt-BR");

    for (const term of serviceRiskTerms) {
      assert.ok(guidance.includes(term), term);
    }
  });
});

function findDefinition(id: string) {
  const definition = GENERAL_CONTRACT_DEFINITIONS.find(
    (candidate) => candidate.id === id,
  );
  assert.ok(definition, id);
  return definition;
}
