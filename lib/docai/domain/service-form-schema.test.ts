import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";
import type {
  ContractFormFieldSchema,
  ContractFormSchema,
} from "./contract-definition";

const requireModule = createRequire(import.meta.url);
const {
  DuplicateServiceFormFieldIdError,
  ServiceFormFieldRegistry,
  ServiceFormSchemaConflictError,
  UnknownServiceFormFieldIdError,
  composeServiceFormSchema,
  recommendedFormField,
  requiredFormField,
}: typeof import("./service-form-schema") = requireModule(
  "./service-form-schema.ts",
);

const baseFormSchema: ContractFormSchema = {
  sections: [
    {
      fields: [
        {
          id: "contractScope",
          label: "Qual é o escopo?",
          layout: "full",
          required: true,
          type: "textarea",
        },
      ],
      id: "contract-details",
      title: "Contrato",
    },
  ],
};

const serviceFormFields: readonly ContractFormFieldSchema[] = [
  {
    id: "service-work-location",
    label: "Onde o serviço será realizado?",
    layout: "full",
    required: false,
    type: "text",
  },
  {
    id: "electrician-supply-voltage",
    label: "Qual é a tensão disponível no local?",
    layout: "half",
    options: [
      { label: "127 V", value: "127v" },
      { label: "220 V", value: "220v" },
    ],
    required: false,
    type: "select",
  },
  {
    id: "electrician-equipment-power-watts",
    label: "Qual é a potência do equipamento em watts?",
    layout: "half",
    min: 0,
    required: false,
    type: "number",
  },
];

const fieldRegistry = new ServiceFormFieldRegistry(serviceFormFields);

describe("service form schema", () => {
  it("composes base, generic, profession and service layers in order", () => {
    const composed = composeServiceFormSchema({
      baseFormSchema,
      fieldRegistry,
      layers: [
        {
          fields: [recommendedFormField("service-work-location")],
          id: "generic-service-form",
          scope: "generic",
          section: { id: "service-form-general", title: "Serviço" },
        },
        {
          fields: [recommendedFormField("electrician-supply-voltage")],
          id: "electrician-profession-form",
          scope: "profession",
          section: { id: "service-form-electrician", title: "Elétrica" },
        },
        {
          fields: [
            requiredFormField("electrician-supply-voltage"),
            recommendedFormField("electrician-equipment-power-watts"),
          ],
          id: "electric-shower-form",
          scope: "service",
          section: {
            id: "service-form-electric-shower",
            title: "Chuveiro elétrico",
          },
        },
      ],
    });

    assert.deepEqual(
      composed.sections.map((section) => section.id),
      [
        "contract-details",
        "service-form-general",
        "service-form-electrician",
        "service-form-electric-shower",
      ],
    );
    assert.deepEqual(
      composed.sections.flatMap((section) =>
        section.fields.map((field) => field.id),
      ),
      [
        "contractScope",
        "service-work-location",
        "electrician-supply-voltage",
        "electrician-equipment-power-watts",
      ],
    );
    assert.equal(
      composed.sections
        .flatMap((section) => section.fields)
        .find((field) => field.id === "electrician-supply-voltage")
        ?.required,
      true,
    );
  });

  it("keeps the base schema immutable", () => {
    const snapshot = structuredClone(baseFormSchema);

    const composed = composeServiceFormSchema({
      baseFormSchema,
      fieldRegistry,
      layers: [
        {
          fields: [recommendedFormField("service-work-location")],
          id: "generic-service-form",
          scope: "generic",
          section: { id: "service-form-general", title: "Serviço" },
        },
      ],
    });

    assert.deepEqual(baseFormSchema, snapshot);
    assert.notEqual(composed, baseFormSchema);
    assert.notEqual(composed.sections[0], baseFormSchema.sections[0]);
  });

  it("rejects duplicate canonical field IDs and unknown references", () => {
    const duplicatedField = serviceFormFields[0];

    assert.throws(
      () => new ServiceFormFieldRegistry([duplicatedField, duplicatedField]),
      DuplicateServiceFormFieldIdError,
    );
    assert.throws(
      () =>
        composeServiceFormSchema({
          baseFormSchema,
          fieldRegistry,
          layers: [
            {
              fields: [recommendedFormField("unknown-field")],
              id: "unknown-field-layer",
              scope: "service",
              section: { id: "unknown-section", title: "Desconhecida" },
            },
          ],
        }),
      UnknownServiceFormFieldIdError,
    );
  });

  it("rejects collisions with the base form and duplicate layer IDs", () => {
    const conflictingRegistry = new ServiceFormFieldRegistry([
      {
        id: "contractScope",
        label: "Escopo duplicado",
        layout: "full",
        required: false,
        type: "text",
      },
    ]);
    const genericLayer = {
      fields: [recommendedFormField("service-work-location")],
      id: "generic-service-form",
      scope: "generic" as const,
      section: { id: "service-form-general", title: "Serviço" },
    };

    assert.throws(
      () =>
        composeServiceFormSchema({
          baseFormSchema,
          fieldRegistry: conflictingRegistry,
          layers: [
            {
              fields: [recommendedFormField("contractScope")],
              id: "conflicting-layer",
              scope: "service",
              section: { id: "new-section", title: "Nova" },
            },
          ],
        }),
      ServiceFormSchemaConflictError,
    );
    assert.throws(
      () =>
        composeServiceFormSchema({
          baseFormSchema,
          fieldRegistry,
          layers: [
            genericLayer,
            {
              ...genericLayer,
              section: { id: "another-section", title: "Outra" },
            },
          ],
        }),
      ServiceFormSchemaConflictError,
    );
  });
});
