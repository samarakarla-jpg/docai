import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

import type { ContractDefinition } from "../domain/contract-definition";

const requireModule = createRequire(import.meta.url);
const {
  InvalidContractDefinitionError,
  createSchemaGenerationRequest,
}: typeof import("./create-schema-generation-request") = requireModule(
  "./create-schema-generation-request.ts",
);
const {
  GENERAL_CONTRACT_DEFINITIONS,
}: typeof import("../domain/contract-general-definitions") = requireModule(
  "../domain/contract-general-definitions.ts",
);

const definition: ContractDefinition<"contratos-gerais"> = {
  categorySlug: "contratos-gerais",
  contractType: "services",
  description: "Definição de teste.",
  formSchema: {
    sections: [
      {
        fields: [
          field("contractorName", "Contratante"),
          field("contractedName", "Contratado"),
          field("scope", "Escopo"),
          field("value", "Valor"),
          field("term", "Prazo"),
          field("specificAnswer", "Resposta específica", false),
        ],
        id: "test",
        title: "Teste",
      },
    ],
  },
  generationSchema: {
    answerFieldIds: ["scope", "specificAnswer"],
    contentBindings: [
      { sourceFieldId: "scope", target: "scope" },
      { sourceFieldId: "value", target: "compensation" },
      { sourceFieldId: "term", target: "term" },
    ],
    contractType: "services",
    documentTitle: "Contrato de teste",
    partyBindings: [
      { nameFieldId: "contractorName", role: "Contratante" },
      { nameFieldId: "contractedName", role: "Contratado" },
    ],
    reviewStatus: "initial-validation",
    sections: [
      { id: "object", objective: "Organizar o objeto.", title: "Objeto" },
    ],
  },
  id: "test",
  name: "Teste",
  objective: "Testar o interpretador.",
  structure: ["Objeto"],
  version: 1,
};

describe("createSchemaGenerationRequest", () => {
  it("builds a typed request exclusively from the definition schemas", () => {
    const formData = validFormData();
    formData.set("specificAnswer", "Resposta declarativa");
    formData.set("undeclared", "Não deve atravessar a fronteira");

    const result = createSchemaGenerationRequest(definition, formData);

    assert.equal(result.valid, true);
    if (!result.valid) return;

    assert.equal(result.documentTitle, "Contrato de teste");
    assert.equal(result.request.type, "services");
    const { definitionContext, ...legacyContent } = result.request.content;

    assert.deepEqual(legacyContent, {
      compensation: "R$ 100,00",
      parties: [{ name: "Cliente" }, { name: "Profissional" }],
      scope: "Projeto piloto",
      term: "30 dias",
      type: "services",
    });
    assert.deepEqual(definitionContext?.answers, [
      { fieldId: "scope", label: "Escopo", value: "Projeto piloto" },
      {
        fieldId: "specificAnswer",
        label: "Resposta específica",
        value: "Resposta declarativa",
      },
    ]);
    assert.equal(
      definitionContext?.reviewStatus,
      "initial-validation",
    );
  });

  it("validates required fields from formSchema", () => {
    const formData = validFormData();
    formData.delete("scope");

    const result = createSchemaGenerationRequest(definition, formData);

    assert.deepEqual(result, {
      fieldErrors: { scope: "Preencha este campo." },
      valid: false,
    });
  });

  it("rejects a definition that references an unknown field", () => {
    const invalidDefinition: ContractDefinition = {
      ...definition,
      generationSchema: {
        ...definition.generationSchema,
        answerFieldIds: ["unknown"],
      },
    };

    assert.throws(
      () => createSchemaGenerationRequest(invalidDefinition, validFormData()),
      InvalidContractDefinitionError,
    );
  });

  it("builds a generation request for every pilot definition", () => {
    for (const pilotDefinition of GENERAL_CONTRACT_DEFINITIONS) {
      const formData = new FormData();

      for (const field of pilotDefinition.formSchema.sections.flatMap(
        (section) => section.fields,
      )) {
        if (!field.required) continue;

        if (field.type === "select") {
          formData.set(field.id, field.options[0].value);
        } else if (field.type === "date") {
          formData.set(field.id, "2026-01-15");
        } else if (field.type === "number") {
          formData.set(field.id, field.defaultValue ?? "1");
        } else if (field.type === "checkbox") {
          formData.set(field.id, "true");
        } else {
          formData.set(field.id, field.defaultValue ?? `Resposta para ${field.id}`);
        }
      }

      const result = createSchemaGenerationRequest(pilotDefinition, formData);

      assert.equal(result.valid, true, pilotDefinition.id);
      if (!result.valid) continue;
      assert.equal(
        result.request.content.definitionContext?.definitionId,
        pilotDefinition.id,
      );
      assert.equal(
        result.request.content.definitionContext?.answers.length,
        pilotDefinition.generationSchema.answerFieldIds.length,
      );
    }
  });

  it("validates select, number, and date constraints from formSchema", () => {
    const constrainedDefinition: ContractDefinition = {
      ...definition,
      formSchema: {
        sections: [
          ...definition.formSchema.sections,
          {
            fields: [
              {
                id: "choice",
                label: "Escolha",
                layout: "half",
                options: [{ label: "Permitida", value: "allowed" }],
                required: true,
                type: "select",
              },
              {
                id: "amount",
                label: "Quantidade",
                layout: "half",
                min: 1,
                required: true,
                type: "number",
              },
              {
                id: "date",
                label: "Data",
                layout: "half",
                required: true,
                type: "date",
              },
            ],
            id: "constraints",
            title: "Restrições",
          },
        ],
      },
    };
    const formData = validFormData();
    formData.set("choice", "invalid");
    formData.set("amount", "0");
    formData.set("date", "2026-02-31");

    const result = createSchemaGenerationRequest(constrainedDefinition, formData);

    assert.deepEqual(result, {
      fieldErrors: {
        amount: "Informe um valor maior ou igual a 1.",
        choice: "Selecione uma opção válida.",
        date: "Informe uma data válida.",
      },
      valid: false,
    });
  });
});

function field(id: string, label: string, required = true) {
  return {
    id,
    label,
    layout: "half" as const,
    required,
    type: "text" as const,
  };
}

function validFormData(): FormData {
  const formData = new FormData();
  formData.set("contractorName", "Cliente");
  formData.set("contractedName", "Profissional");
  formData.set("scope", "Projeto piloto");
  formData.set("value", "R$ 100,00");
  formData.set("term", "30 dias");
  return formData;
}
