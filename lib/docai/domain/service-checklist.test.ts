import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";
import type { ContractFormSchema } from "./contract-definition";

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
        specifier === "./electrician-service-checklist" ||
        specifier === "./service-checklist" ||
        specifier === "./service-checklist-questions"
      ) {
        return nextResolve(`${specifier}.ts`, context);
      }

      return nextResolve(specifier, context);
    },
  });
}

const {
  ChecklistCompositionConflictError,
  ChecklistQuestionRegistry,
  DuplicateChecklistQuestionIdError,
  UnknownChecklistQuestionIdError,
  composeServiceChecklist,
}: typeof import("./service-checklist") = requireModule(
  "./service-checklist.ts",
);
const {
  ELECTRICIAN_CHECKLIST_QUESTION_IDS,
  ELECTRICIAN_PROFESSION_CHECKLIST_LAYER,
  ELECTRICIAN_SERVICE_CHECKLIST_QUESTION_REGISTRY,
}: typeof import("./electrician-service-checklist") = requireModule(
  "./electrician-service-checklist.ts",
);
const {
  GENERIC_SERVICE_CHECKLIST_LAYER,
}: typeof import("./service-checklist-questions") = requireModule(
  "./service-checklist-questions.ts",
);
const {
  recommendedQuestion,
  requiredQuestion,
}: typeof import("./service-checklist") = requireModule(
  "./service-checklist.ts",
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

describe("service checklist", () => {
  it("composes base, generic, profession and service layers in order", () => {
    const serviceLayer = {
      id: "electric-shower-checklist",
      questions: [
        requiredQuestion(ELECTRICIAN_CHECKLIST_QUESTION_IDS.supplyVoltage),
        recommendedQuestion(ELECTRICIAN_CHECKLIST_QUESTION_IDS.equipmentPower),
      ],
      scope: "service" as const,
      section: {
        id: "service-checklist-electric-shower",
        title: "Chuveiro elétrico",
      },
    };

    const composed = composeServiceChecklist({
      baseFormSchema,
      layers: [
        GENERIC_SERVICE_CHECKLIST_LAYER,
        ELECTRICIAN_PROFESSION_CHECKLIST_LAYER,
        serviceLayer,
      ],
      questionRegistry: ELECTRICIAN_SERVICE_CHECKLIST_QUESTION_REGISTRY,
    });

    assert.deepEqual(
      composed.sections.map((section) => section.id),
      [
        "contract-details",
        "service-checklist-general",
        "service-checklist-electrician",
        "service-checklist-electric-shower",
      ],
    );
    assert.deepEqual(
      composed.sections.flatMap((section) =>
        section.fields.map((field) => field.id),
      ),
      [
        "contractScope",
        "service-work-location",
        "service-additional-notes",
        "electrician-supply-voltage",
        "electrician-equipment-power-watts",
      ],
    );

    const voltage = composed.sections
      .flatMap((section) => section.fields)
      .find(
        (field) =>
          field.id === ELECTRICIAN_CHECKLIST_QUESTION_IDS.supplyVoltage,
      );
    assert.equal(voltage?.required, true);
  });

  it("keeps the base schema immutable", () => {
    const snapshot = structuredClone(baseFormSchema);

    const composed = composeServiceChecklist({
      baseFormSchema,
      layers: [GENERIC_SERVICE_CHECKLIST_LAYER],
      questionRegistry: ELECTRICIAN_SERVICE_CHECKLIST_QUESTION_REGISTRY,
    });

    assert.deepEqual(baseFormSchema, snapshot);
    assert.notEqual(composed, baseFormSchema);
    assert.notEqual(composed.sections[0], baseFormSchema.sections[0]);
  });

  it("rejects duplicate canonical IDs and unknown references", () => {
    const duplicatedQuestion = {
      id: "duplicated-question",
      label: "Pergunta",
      layout: "full" as const,
      required: false,
      type: "text" as const,
    };

    assert.throws(
      () =>
        new ChecklistQuestionRegistry([
          duplicatedQuestion,
          duplicatedQuestion,
        ]),
      DuplicateChecklistQuestionIdError,
    );
    assert.throws(
      () =>
        composeServiceChecklist({
          baseFormSchema,
          layers: [
            {
              id: "unknown-question-layer",
              questions: [recommendedQuestion("unknown-question")],
              scope: "service",
              section: { id: "unknown-section", title: "Desconhecida" },
            },
          ],
          questionRegistry: ELECTRICIAN_SERVICE_CHECKLIST_QUESTION_REGISTRY,
        }),
      UnknownChecklistQuestionIdError,
    );
  });

  it("rejects collisions with the base form and duplicate layer IDs", () => {
    const conflictingRegistry = new ChecklistQuestionRegistry([
      {
        id: "contractScope",
        label: "Escopo duplicado",
        layout: "full",
        required: false,
        type: "text",
      },
    ]);

    assert.throws(
      () =>
        composeServiceChecklist({
          baseFormSchema,
          layers: [
            {
              id: "conflicting-layer",
              questions: [recommendedQuestion("contractScope")],
              scope: "service",
              section: { id: "new-section", title: "Nova" },
            },
          ],
          questionRegistry: conflictingRegistry,
        }),
      ChecklistCompositionConflictError,
    );

    assert.throws(
      () =>
        composeServiceChecklist({
          baseFormSchema,
          layers: [
            GENERIC_SERVICE_CHECKLIST_LAYER,
            {
              ...GENERIC_SERVICE_CHECKLIST_LAYER,
              section: {
                id: "another-section",
                title: "Outra",
              },
            },
          ],
          questionRegistry: ELECTRICIAN_SERVICE_CHECKLIST_QUESTION_REGISTRY,
        }),
      ChecklistCompositionConflictError,
    );
  });
});
