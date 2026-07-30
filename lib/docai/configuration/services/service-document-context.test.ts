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
        !specifier.endsWith(".ts") &&
        (specifier.startsWith("../../") ||
          specifier.startsWith("../") ||
          specifier.startsWith("./"))
      ) {
        return nextResolve(`${specifier}.ts`, context);
      }

      return nextResolve(specifier, context);
    },
  });
}

const {
  SERVICE_DOCUMENT_CONTEXT,
}: typeof import("./service-document-context") = requireModule(
  "./service-document-context.ts",
);
const {
  createSchemaGenerationRequest,
}: typeof import("../../application/create-schema-generation-request") =
  requireModule("../../application/create-schema-generation-request.ts");

describe("configured service document context", () => {
  it("lists the proposal definition and configured electrician services", async () => {
    const selection = await SERVICE_DOCUMENT_CONTEXT.listSelection("proposal");

    assert.equal(
      selection.contractDefinition.id,
      "proposta-comercial-com-aceite",
    );
    assert.deepEqual(selection.professions, [
      { id: "electrician", name: "Eletricista" },
    ]);
    assert.equal(selection.services.length, 45);
  });

  it("resolves a configured service into the proposal schema", async () => {
    const context = await SERVICE_DOCUMENT_CONTEXT.resolve({
      document: "proposal",
      professionId: "electrician",
      serviceId: "electrician-electric-shower-installation",
    });
    const fieldIds = context.contractDefinition.formSchema.sections.flatMap(
      (section) => section.fields.map((field) => field.id),
    );

    assert.ok(fieldIds.includes("service-work-location"));
    assert.ok(fieldIds.includes("electrician-supply-voltage"));
    assert.ok(fieldIds.includes("electrician-equipment-power-watts"));
    assert.deepEqual(
      context.contractDefinition.generationSchema.answerFieldIds,
      fieldIds,
    );
  });

  it("sends composed service answers through the canonical generation context", async () => {
    const context = await SERVICE_DOCUMENT_CONTEXT.resolve({
      document: "proposal",
      professionId: "electrician",
      serviceId: "electrician-electric-shower-installation",
    });
    const formData = new FormData();

    for (const field of context.contractDefinition.formSchema.sections.flatMap(
      (section) => section.fields,
    )) {
      if (field.type === "select") {
        formData.set(field.id, field.options[0].value);
      } else if (field.type === "date") {
        formData.set(field.id, "2026-08-01");
      } else if (field.type === "number") {
        formData.set(field.id, String(field.min ?? 1));
      } else if (field.type === "checkbox") {
        formData.set(field.id, "true");
      } else {
        formData.set(field.id, field.defaultValue ?? `Resposta para ${field.id}`);
      }
    }

    const result = createSchemaGenerationRequest(
      context.contractDefinition,
      formData,
      { service: context.generationServiceContext },
    );

    assert.equal(result.valid, true);
    if (!result.valid) return;

    assert.ok(
      result.request.content.definitionContext?.answers.some(
        (answer) => answer.fieldId === "electrician-supply-voltage",
      ),
    );
    assert.equal(
      result.request.content.definitionContext?.service?.serviceId,
      "electrician-electric-shower-installation",
    );
  });
});
