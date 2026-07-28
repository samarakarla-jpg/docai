import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

const requireModule = createRequire(import.meta.url);
const {
  CURRENT_CONTRACT_FORM_FIELD_IDS,
  createStandardContractFormSchema,
  listFormSchemaFieldIds,
}: typeof import("./contract-form-schema") = requireModule(
  "./contract-form-schema.ts",
);

describe("DocAI contract form schema", () => {
  it("preserves the current sections and field identifiers in order", () => {
    const schema = createStandardContractFormSchema();

    assert.deepEqual(
      schema.sections.map((section) => section.id),
      ["contractor", "contracted", "contract-details"],
    );
    assert.deepEqual(
      listFormSchemaFieldIds(schema),
      CURRENT_CONTRACT_FORM_FIELD_IDS,
    );
  });

  it("keeps field identifiers unique and all current fields required", () => {
    const schema = createStandardContractFormSchema();
    const fields = schema.sections.flatMap((section) => section.fields);

    assert.equal(new Set(fields.map((field) => field.id)).size, fields.length);
    assert.ok(fields.every((field) => field.required));
  });

  it("applies only the supplied model context as a default value", () => {
    const schema = createStandardContractFormSchema("Pintura");
    const fields = schema.sections.flatMap((section) => section.fields);

    assert.equal(
      fields.find((field) => field.id === "contractObject")?.defaultValue,
      "Pintura",
    );
    assert.ok(
      fields
        .filter((field) => field.id !== "contractObject")
        .every((field) => field.defaultValue === undefined),
    );
  });

  it("preserves the current field types and layout", () => {
    const fields = createStandardContractFormSchema().sections.flatMap(
      (section) => section.fields,
    );

    assert.equal(fields.find((field) => field.id === "value")?.type, "money");
    assert.equal(
      fields.find((field) => field.id === "startDate")?.type,
      "date",
    );
    assert.equal(
      fields.find((field) => field.id === "contractorAddress")?.layout,
      "full",
    );
  });
});
