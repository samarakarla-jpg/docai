import type {
  ContractFormFieldSchema,
  ContractFormSchema,
  ContractFormSectionSchema,
} from "./contract-definition";

export type ChecklistQuestionRequirement = "recommended" | "required";

export type ChecklistQuestionReference = Readonly<{
  questionId: string;
  requirement: ChecklistQuestionRequirement;
}>;

export function recommendedQuestion(
  questionId: string,
): ChecklistQuestionReference {
  return { questionId, requirement: "recommended" };
}

export function requiredQuestion(
  questionId: string,
): ChecklistQuestionReference {
  return { questionId, requirement: "required" };
}

export type ServiceChecklistConfiguration =
  | Readonly<{
      mode: "configured";
      questions: readonly ChecklistQuestionReference[];
    }>
  | Readonly<{
      mode: "generic-only";
    }>;

export type ChecklistLayer = Readonly<{
  id: string;
  questions: readonly ChecklistQuestionReference[];
  scope: "generic" | "profession" | "service";
  section: Readonly<{
    description?: string;
    id: string;
    title: string;
  }>;
}>;

export class DuplicateChecklistQuestionIdError extends Error {
  constructor(id: string) {
    super(`Checklist question ID "${id}" is duplicated.`);
    this.name = "DuplicateChecklistQuestionIdError";
  }
}

export class UnknownChecklistQuestionIdError extends Error {
  constructor(id: string) {
    super(`Checklist question ID "${id}" is not registered.`);
    this.name = "UnknownChecklistQuestionIdError";
  }
}

export class ChecklistCompositionConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChecklistCompositionConflictError";
  }
}

export class ChecklistQuestionRegistry {
  private readonly questionsById: ReadonlyMap<
    string,
    ContractFormFieldSchema
  >;

  constructor(questions: readonly ContractFormFieldSchema[]) {
    const questionsById = new Map<string, ContractFormFieldSchema>();

    for (const question of questions) {
      if (questionsById.has(question.id)) {
        throw new DuplicateChecklistQuestionIdError(question.id);
      }

      questionsById.set(question.id, question);
    }

    this.questionsById = questionsById;
  }

  get(id: string): ContractFormFieldSchema | undefined {
    return this.questionsById.get(id);
  }

  resolve(id: string): ContractFormFieldSchema {
    const question = this.get(id);

    if (!question) {
      throw new UnknownChecklistQuestionIdError(id);
    }

    return question;
  }
}

export type ComposeServiceChecklistInput = Readonly<{
  baseFormSchema: ContractFormSchema;
  layers: readonly ChecklistLayer[];
  questionRegistry: ChecklistQuestionRegistry;
}>;

export function composeServiceChecklist({
  baseFormSchema,
  layers,
  questionRegistry,
}: ComposeServiceChecklistInput): ContractFormSchema {
  const baseFieldIds = new Set<string>();
  const sectionIds = new Set<string>();

  for (const section of baseFormSchema.sections) {
    if (sectionIds.has(section.id)) {
      throw new ChecklistCompositionConflictError(
        `Base form section ID "${section.id}" is duplicated.`,
      );
    }
    sectionIds.add(section.id);

    for (const field of section.fields) {
      if (baseFieldIds.has(field.id)) {
        throw new ChecklistCompositionConflictError(
          `Base form field ID "${field.id}" is duplicated.`,
        );
      }
      baseFieldIds.add(field.id);
    }
  }

  const layerIds = new Set<string>();
  const composedQuestionLocations = new Map<
    string,
    Readonly<{ fieldIndex: number; sectionIndex: number }>
  >();
  const composedSections: ContractFormSectionSchema[] = baseFormSchema.sections.map(
    (section) => ({ ...section, fields: [...section.fields] }),
  );

  for (const layer of layers) {
    if (layerIds.has(layer.id)) {
      throw new ChecklistCompositionConflictError(
        `Checklist layer ID "${layer.id}" is duplicated.`,
      );
    }
    layerIds.add(layer.id);

    if (sectionIds.has(layer.section.id)) {
      throw new ChecklistCompositionConflictError(
        `Checklist section ID "${layer.section.id}" conflicts with another section.`,
      );
    }
    sectionIds.add(layer.section.id);

    const layerFields: ContractFormFieldSchema[] = [];
    const sectionIndex = composedSections.length;

    for (const reference of layer.questions) {
      if (baseFieldIds.has(reference.questionId)) {
        throw new ChecklistCompositionConflictError(
          `Checklist question ID "${reference.questionId}" conflicts with the base form.`,
        );
      }

      const canonicalQuestion = questionRegistry.resolve(reference.questionId);
      const existingLocation = composedQuestionLocations.get(reference.questionId);

      if (existingLocation) {
        if (reference.requirement === "required") {
          const existingSection = composedSections[existingLocation.sectionIndex];
          const existingField = existingSection.fields[existingLocation.fieldIndex];

          if (!existingField.required) {
            composedSections[existingLocation.sectionIndex] = {
              ...existingSection,
              fields: existingSection.fields.map((field, fieldIndex) =>
                fieldIndex === existingLocation.fieldIndex
                  ? { ...field, required: true }
                  : field,
              ),
            };
          }
        }

        continue;
      }

      const field =
        canonicalQuestion.required || reference.requirement === "required"
          ? { ...canonicalQuestion, required: true }
          : canonicalQuestion;
      composedQuestionLocations.set(reference.questionId, {
        fieldIndex: layerFields.length,
        sectionIndex,
      });
      layerFields.push(field);
    }

    if (layerFields.length > 0) {
      composedSections.push({
        ...layer.section,
        fields: layerFields,
      });
    }
  }

  return { sections: composedSections };
}
