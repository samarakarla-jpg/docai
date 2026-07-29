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
] as const;

const deliveryAcceptanceSpecificFieldIds = [
  "deliveredItems",
  "acceptanceStatus",
  "reservations",
  "pendingItems",
  "deliveryEvidence",
  "supportOrWarrantyStart",
] as const;

const deliveryAcceptanceRiskTerms = [
  "entrega",
  "aceite",
  "ressalvas",
  "pendências",
  "saldo",
  "garantia",
  "quitação geral",
  "silêncio",
] as const;

const ndaSpecificFieldIds = [
  "ndaMode",
  "confidentialInformation",
  "permittedPurpose",
  "authorizedRecipients",
  "returnOrDeletion",
  "confidentialityExceptions",
] as const;

const ndaRiskTerms = [
  "finalidade",
  "acesso",
  "divulgação",
  "lei",
  "eliminação",
  "cópias de segurança",
  "penalidade",
  "sigilo eterno",
  "propriedade intelectual",
  "lgpd",
] as const;

const scopeChangeSpecificFieldIds = [
  "scopeChange",
  "removedScope",
  "changeReason",
  "priceImpactType",
  "scheduleImpact",
] as const;

const scopeChangeRiskTerms = [
  "escopo",
  "preço",
  "prazo",
  "aceite",
  "unilateral",
  "novação",
] as const;

const proposalSpecificFieldIds = [
  "clientNeed",
  "deliverables",
  "scopeExclusions",
  "paymentSchedule",
  "proposalValidity",
  "acceptanceMethod",
] as const;

const proposalRiskTerms = [
  "solução",
  "escopo",
  "preço",
  "prazo",
  "validade",
  "aceite",
  "contrato posterior",
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
  it("registers the essential contracts in order and preserves prior contracts", () => {
    assert.equal(GENERAL_CONTRACT_DEFINITIONS.length, 13);
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
        ["prestacao-de-servicos", "confidencialidade-nda"].includes(
          definition.id,
        )
          ? 2
          : 1,
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
        [
          "prestacao-de-servicos",
          "proposta-comercial-com-aceite",
          "termo-de-alteracao-de-escopo",
          "termo-de-entrega-e-aceite",
          "confidencialidade-nda",
        ].includes(definition.id)
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

  it("implements the approved proposal fields without duplicating questions", () => {
    const definition = findDefinition("proposta-comercial-com-aceite");
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

    assert.deepEqual(specificFieldIds, proposalSpecificFieldIds);
    assert.deepEqual(
      fields.filter((field) => !field.required).map((field) => field.id),
      ["scopeExclusions"],
    );
  });

  it("keeps the proposal within the simple-language three-minute limit", () => {
    const businessFields = findDefinition("proposta-comercial-com-aceite")
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

  it("covers the approved commercial risks in proposal guidance", () => {
    const definition = findDefinition("proposta-comercial-com-aceite");
    const guidance = definition.generationSchema.sections
      .flatMap((section) => [section.title, section.objective])
      .join(" ")
      .toLocaleLowerCase("pt-BR");

    for (const term of proposalRiskTerms) {
      assert.ok(guidance.includes(term), term);
    }

    const acceptanceMethod = definition.formSchema.sections
      .flatMap((section) => section.fields)
      .find((field) => field.id === "acceptanceMethod");
    assert.equal(acceptanceMethod?.type, "select");
    assert.deepEqual(
      acceptanceMethod.options.map((option) => option.value),
      ["signed-proposal", "email", "written-message"],
    );
  });

  it("implements only the approved scope-change questions", () => {
    const definition = findDefinition("termo-de-alteracao-de-escopo");
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

    assert.deepEqual(specificFieldIds, scopeChangeSpecificFieldIds);
    assert.deepEqual(
      fields.filter((field) => !field.required).map((field) => field.id),
      ["value", "term", "removedScope"],
    );
  });

  it("keeps scope changes within the simple-language three-minute limit", () => {
    const businessFields = findDefinition("termo-de-alteracao-de-escopo")
      .formSchema.sections.flatMap((section) => section.fields)
      .filter(
        (field) =>
          !compatibilityFieldIds
            .slice(0, 6)
            .includes(
              field.id as (typeof compatibilityFieldIds)[number],
            ),
      );

    assert.equal(businessFields.length, 9);
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

  it("covers scope-change risks with explicit price choices", () => {
    const definition = findDefinition("termo-de-alteracao-de-escopo");
    const guidance = definition.generationSchema.sections
      .flatMap((section) => [section.title, section.objective])
      .join(" ")
      .toLocaleLowerCase("pt-BR");

    for (const term of scopeChangeRiskTerms) {
      assert.ok(guidance.includes(term), term);
    }

    const priceImpactType = definition.formSchema.sections
      .flatMap((section) => section.fields)
      .find((field) => field.id === "priceImpactType");
    assert.equal(priceImpactType?.type, "select");
    assert.deepEqual(
      priceImpactType.options.map((option) => option.value),
      ["unchanged", "increase", "decrease"],
    );
  });

  it("implements only the approved delivery-and-acceptance questions", () => {
    const definition = findDefinition("termo-de-entrega-e-aceite");
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

    assert.deepEqual(specificFieldIds, deliveryAcceptanceSpecificFieldIds);
    assert.deepEqual(
      fields.filter((field) => !field.required).map((field) => field.id),
      [
        "value",
        "term",
        "reservations",
        "pendingItems",
        "deliveryEvidence",
        "supportOrWarrantyStart",
      ],
    );
  });

  it("keeps delivery and acceptance within the simple-language three-minute limit", () => {
    const businessFields = findDefinition("termo-de-entrega-e-aceite")
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
    assert.equal(
      businessFields.filter((field) => field.required).length,
      4,
    );
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

  it("covers delivery-and-acceptance risks with explicit review choices", () => {
    const definition = findDefinition("termo-de-entrega-e-aceite");
    const guidance = definition.generationSchema.sections
      .flatMap((section) => [section.title, section.objective])
      .join(" ")
      .toLocaleLowerCase("pt-BR");

    for (const term of deliveryAcceptanceRiskTerms) {
      assert.ok(guidance.includes(term), term);
    }

    const acceptanceStatus = definition.formSchema.sections
      .flatMap((section) => section.fields)
      .find((field) => field.id === "acceptanceStatus");
    assert.equal(acceptanceStatus?.type, "select");
    assert.deepEqual(
      acceptanceStatus.options.map((option) => option.value),
      ["accepted", "accepted-with-reservations", "pending-verification"],
    );
  });

  it("evolves only the existing NDA definition with the approved questions", () => {
    const definition = findDefinition("confidencialidade-nda");
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

    assert.equal(definition.version, 2);
    assert.equal(definition.name, "Acordo de Sigilo (NDA)");
    assert.deepEqual(specificFieldIds, ndaSpecificFieldIds);
    assert.deepEqual(
      fields.filter((field) => !field.required).map((field) => field.id),
      ["value", "confidentialityExceptions"],
    );
  });

  it("keeps the NDA within the simple-language three-minute limit", () => {
    const businessFields = findDefinition("confidencialidade-nda")
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
    assert.equal(
      businessFields.filter((field) => field.required).length,
      8,
    );
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

  it("covers NDA risks with an explicit sharing direction", () => {
    const definition = findDefinition("confidencialidade-nda");
    const guidance = definition.generationSchema.sections
      .flatMap((section) => [section.title, section.objective])
      .join(" ")
      .toLocaleLowerCase("pt-BR");

    for (const term of ndaRiskTerms) {
      assert.ok(guidance.includes(term), term);
    }

    const ndaMode = definition.formSchema.sections
      .flatMap((section) => section.fields)
      .find((field) => field.id === "ndaMode");
    assert.equal(ndaMode?.type, "select");
    assert.deepEqual(
      ndaMode.options.map((option) => option.value),
      ["mutual", "contractor-only", "contracted-only"],
    );
  });
});

function findDefinition(id: string) {
  const definition = GENERAL_CONTRACT_DEFINITIONS.find(
    (candidate) => candidate.id === id,
  );
  assert.ok(definition, id);
  return definition;
}
