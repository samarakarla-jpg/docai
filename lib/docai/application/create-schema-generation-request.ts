import type {
  ContractDefinition,
  ContractFormFieldSchema,
} from "../domain/contract-definition";
import type {
  ContractContent,
  ContractGenerationDefinitionContext,
  ContractParty,
  ContractGenerationContextParty,
  ContractGenerationRequest,
  ContractType,
} from "../domain/contract-models";

const requiredContentTargets: Readonly<
  Record<ContractType, readonly string[]>
> = {
  loan: ["subject", "repayment", "term"],
  rental: ["property", "rent", "term"],
  sale: ["subject", "price", "delivery"],
  services: ["scope", "compensation", "term"],
};

const contentFactories: Readonly<
  Record<
    ContractType,
    (
      values: Readonly<Record<string, string>>,
      parties: readonly ContractParty[],
      definitionContext: ContractGenerationDefinitionContext,
    ) => ContractContent
  >
> = {
  loan: (values, parties, definitionContext) => ({
    ...values,
    definitionContext,
    parties,
    repayment: values.repayment,
    subject: values.subject,
    term: values.term,
    type: "loan",
  }),
  rental: (values, parties, definitionContext) => ({
    ...values,
    definitionContext,
    parties,
    property: values.property,
    rent: values.rent,
    term: values.term,
    type: "rental",
  }),
  sale: (values, parties, definitionContext) => ({
    ...values,
    definitionContext,
    delivery: values.delivery,
    parties,
    price: values.price,
    subject: values.subject,
    type: "sale",
  }),
  services: (values, parties, definitionContext) => ({
    ...values,
    definitionContext,
    compensation: values.compensation,
    parties,
    scope: values.scope,
    term: values.term,
    type: "services",
  }),
};

export type SchemaGenerationRequestResult =
  | Readonly<{
      fieldErrors: Readonly<Record<string, string>>;
      valid: false;
    }>
  | Readonly<{
      documentTitle: string;
      request: ContractGenerationRequest;
      valid: true;
    }>;

export class InvalidContractDefinitionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidContractDefinitionError";
  }
}

export function createSchemaGenerationRequest(
  definition: ContractDefinition,
  formData: FormData,
): SchemaGenerationRequestResult {
  const fields = definition.formSchema.sections.flatMap(
    (section) => section.fields,
  );
  const fieldsById = new Map(fields.map((field) => [field.id, field]));

  if (fieldsById.size !== fields.length) {
    throw new InvalidContractDefinitionError(
      `Contract definition ${definition.id} contains duplicate field identifiers.`,
    );
  }

  const values = Object.fromEntries(
    fields.map((field) => [field.id, readFieldValue(field.type, formData.get(field.id))]),
  ) as Readonly<Record<string, string>>;
  const fieldErrors: Record<string, string> = {};

  for (const field of fields) {
    if (field.required && isMissingRequiredValue(field.type, values[field.id])) {
      fieldErrors[field.id] = "Preencha este campo.";
      continue;
    }

    const validationError = validateFieldValue(field, values[field.id]);
    if (validationError) {
      fieldErrors[field.id] = validationError;
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors, valid: false };
  }

  validateGenerationSchema(definition, fieldsById);

  const parties = definition.generationSchema.partyBindings.map(
    (binding): ContractGenerationContextParty => ({
      ...(binding.addressFieldId
        ? { address: values[binding.addressFieldId] }
        : {}),
      ...(binding.identifierFieldId
        ? { identifier: values[binding.identifierFieldId] }
        : {}),
      name: values[binding.nameFieldId],
      role: binding.role,
    }),
  );
  const boundContent = Object.fromEntries(
    definition.generationSchema.contentBindings.map((binding) => [
      binding.target,
      values[binding.sourceFieldId],
    ]),
  );

  for (const target of requiredContentTargets[definition.contractType]) {
    if (!(target in boundContent)) {
      throw new InvalidContractDefinitionError(
        `Contract definition ${definition.id} does not bind the required ${target} engine field.`,
      );
    }
  }

  const contractParties = parties.map(
    ({ identifier, name }): ContractParty => ({
      ...(identifier ? { identifier } : {}),
      name,
    }),
  );
  const definitionContext: ContractGenerationDefinitionContext = {
    answers: definition.generationSchema.answerFieldIds.map((fieldId) => ({
      fieldId,
      label: fieldsById.get(fieldId)?.label ?? fieldId,
      value: values[fieldId],
    })),
    definitionId: definition.id,
    definitionVersion: definition.version,
    documentTitle: definition.generationSchema.documentTitle,
    objective: definition.objective,
    parties,
    reviewStatus: definition.generationSchema.reviewStatus,
    sections: definition.generationSchema.sections,
  };
  const content = contentFactories[definition.contractType](
    boundContent,
    contractParties,
    definitionContext,
  );
  const request: ContractGenerationRequest = {
    content,
    type: definition.contractType,
  };

  return {
    documentTitle: definition.generationSchema.documentTitle,
    request,
    valid: true,
  };
}

function validateGenerationSchema(
  definition: ContractDefinition,
  fieldsById: ReadonlyMap<string, Readonly<{ id: string; label: string }>>,
): void {
  const referencedFieldIds = [
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

  for (const fieldId of referencedFieldIds) {
    if (!fieldsById.has(fieldId)) {
      throw new InvalidContractDefinitionError(
        `Contract definition ${definition.id} references unknown field ${fieldId}.`,
      );
    }
  }

  if (definition.generationSchema.contractType !== definition.contractType) {
    throw new InvalidContractDefinitionError(
      `Contract definition ${definition.id} has incompatible contract types.`,
    );
  }
}

function readFieldValue(
  type: string,
  value: FormDataEntryValue | null,
): string {
  if (type === "checkbox") {
    return value === null ? "false" : "true";
  }

  return typeof value === "string" ? value.trim() : "";
}

function isMissingRequiredValue(type: string, value: string): boolean {
  return type === "checkbox" ? value !== "true" : !value;
}

function validateFieldValue(
  field: ContractFormFieldSchema,
  value: string,
): string | undefined {
  if (!value || (field.type === "checkbox" && value === "false")) {
    return undefined;
  }

  if (
    field.type === "select" &&
    !field.options.some((option) => option.value === value)
  ) {
    return "Selecione uma opção válida.";
  }

  if (field.type === "number") {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return "Informe um número válido.";
    }

    if (field.min !== undefined && numericValue < field.min) {
      return `Informe um valor maior ou igual a ${field.min}.`;
    }

    if (field.max !== undefined && numericValue > field.max) {
      return `Informe um valor menor ou igual a ${field.max}.`;
    }
  }

  if (field.type === "date" && !isIsoDate(value)) {
    return "Informe uma data válida.";
  }

  return undefined;
}

function isIsoDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}
