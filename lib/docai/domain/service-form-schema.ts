import type {
  ContractFormFieldSchema,
  ContractFormSchema,
  ContractFormSectionSchema,
} from "./contract-definition";

export type ServiceFormFieldRequirement = "recommended" | "required";

export type ServiceFormFieldReference = Readonly<{
  fieldId: string;
  requirement: ServiceFormFieldRequirement;
}>;

export function recommendedFormField(
  fieldId: string,
): ServiceFormFieldReference {
  return { fieldId, requirement: "recommended" };
}

export function requiredFormField(fieldId: string): ServiceFormFieldReference {
  return { fieldId, requirement: "required" };
}

export type ServiceFormConfiguration =
  | Readonly<{
      mode: "configured";
      fields: readonly ServiceFormFieldReference[];
    }>
  | Readonly<{
      mode: "generic-only";
    }>;

export type ServiceFormSchemaLayer = Readonly<{
  id: string;
  fields: readonly ServiceFormFieldReference[];
  scope: "generic" | "profession" | "service";
  section: Readonly<{
    description?: string;
    id: string;
    title: string;
  }>;
}>;

export class DuplicateServiceFormFieldIdError extends Error {
  constructor(id: string) {
    super(`Service form field ID "${id}" is duplicated.`);
    this.name = "DuplicateServiceFormFieldIdError";
  }
}

export class UnknownServiceFormFieldIdError extends Error {
  constructor(id: string) {
    super(`Service form field ID "${id}" is not registered.`);
    this.name = "UnknownServiceFormFieldIdError";
  }
}

export class ServiceFormSchemaConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServiceFormSchemaConflictError";
  }
}

export class ServiceFormFieldRegistry {
  private readonly fieldsById: ReadonlyMap<
    string,
    ContractFormFieldSchema
  >;

  constructor(fields: readonly ContractFormFieldSchema[]) {
    const fieldsById = new Map<string, ContractFormFieldSchema>();

    for (const field of fields) {
      if (fieldsById.has(field.id)) {
        throw new DuplicateServiceFormFieldIdError(field.id);
      }

      fieldsById.set(field.id, field);
    }

    this.fieldsById = fieldsById;
  }

  get(id: string): ContractFormFieldSchema | undefined {
    return this.fieldsById.get(id);
  }

  resolve(id: string): ContractFormFieldSchema {
    const field = this.get(id);

    if (!field) {
      throw new UnknownServiceFormFieldIdError(id);
    }

    return field;
  }
}

export type ComposeServiceFormSchemaInput = Readonly<{
  baseFormSchema: ContractFormSchema;
  fieldRegistry: ServiceFormFieldRegistry;
  layers: readonly ServiceFormSchemaLayer[];
}>;

export function composeServiceFormSchema({
  baseFormSchema,
  fieldRegistry,
  layers,
}: ComposeServiceFormSchemaInput): ContractFormSchema {
  const baseFieldIds = new Set<string>();
  const sectionIds = new Set<string>();

  for (const section of baseFormSchema.sections) {
    if (sectionIds.has(section.id)) {
      throw new ServiceFormSchemaConflictError(
        `Base form section ID "${section.id}" is duplicated.`,
      );
    }
    sectionIds.add(section.id);

    for (const field of section.fields) {
      if (baseFieldIds.has(field.id)) {
        throw new ServiceFormSchemaConflictError(
          `Base form field ID "${field.id}" is duplicated.`,
        );
      }
      baseFieldIds.add(field.id);
    }
  }

  const layerIds = new Set<string>();
  const composedFieldLocations = new Map<
    string,
    Readonly<{ fieldIndex: number; sectionIndex: number }>
  >();
  const composedSections: ContractFormSectionSchema[] = baseFormSchema.sections.map(
    (section) => ({ ...section, fields: [...section.fields] }),
  );

  for (const layer of layers) {
    if (layerIds.has(layer.id)) {
      throw new ServiceFormSchemaConflictError(
        `Service form layer ID "${layer.id}" is duplicated.`,
      );
    }
    layerIds.add(layer.id);

    if (sectionIds.has(layer.section.id)) {
      throw new ServiceFormSchemaConflictError(
        `Service form section ID "${layer.section.id}" conflicts with another section.`,
      );
    }
    sectionIds.add(layer.section.id);

    const layerFields: ContractFormFieldSchema[] = [];
    const sectionIndex = composedSections.length;

    for (const reference of layer.fields) {
      if (baseFieldIds.has(reference.fieldId)) {
        throw new ServiceFormSchemaConflictError(
          `Service form field ID "${reference.fieldId}" conflicts with the base form.`,
        );
      }

      const canonicalField = fieldRegistry.resolve(reference.fieldId);
      const existingLocation = composedFieldLocations.get(reference.fieldId);

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
        canonicalField.required || reference.requirement === "required"
          ? { ...canonicalField, required: true }
          : canonicalField;
      composedFieldLocations.set(reference.fieldId, {
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
