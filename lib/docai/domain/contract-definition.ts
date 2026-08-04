import type {
  ContractDefinitionReviewStatus,
  ContractGenerationSection,
  ContractType,
} from "./contract-models";

export type FormFieldLayout = "full" | "half";

type BaseFormFieldSchema = Readonly<{
  defaultValue?: string;
  helpText?: string;
  id: string;
  label: string;
  layout: FormFieldLayout;
  placeholder?: string;
  required: boolean;
}>;

export type TextFormFieldSchema = BaseFormFieldSchema &
  Readonly<{
    autocomplete?: string;
    type: "text";
  }>;

export type TextAreaFormFieldSchema = BaseFormFieldSchema &
  Readonly<{
    rows?: number;
    type: "textarea";
  }>;

export type DateFormFieldSchema = BaseFormFieldSchema &
  Readonly<{
    type: "date";
  }>;

export type MoneyFormFieldSchema = BaseFormFieldSchema &
  Readonly<{
    currency: string;
    type: "money";
  }>;

export type NumberFormFieldSchema = BaseFormFieldSchema &
  Readonly<{
    max?: number;
    min?: number;
    type: "number";
  }>;

export type SelectFormFieldSchema = BaseFormFieldSchema &
  Readonly<{
    options: readonly Readonly<{ label: string; value: string }>[];
    type: "select";
  }>;

export type CheckboxFormFieldSchema = BaseFormFieldSchema &
  Readonly<{
    type: "checkbox";
  }>;

export type ContractFormFieldSchema =
  | TextFormFieldSchema
  | TextAreaFormFieldSchema
  | DateFormFieldSchema
  | MoneyFormFieldSchema
  | NumberFormFieldSchema
  | SelectFormFieldSchema
  | CheckboxFormFieldSchema;

export type ContractFormSectionSchema = Readonly<{
  description?: string;
  fields: readonly ContractFormFieldSchema[];
  id: string;
  title: string;
}>;

export type ContractFormSchema = Readonly<{
  sections: readonly ContractFormSectionSchema[];
}>;

export type ContractGenerationContentTarget =
  | "compensation"
  | "contractedAddress"
  | "contractorAddress"
  | "delivery"
  | "price"
  | "property"
  | "rent"
  | "repayment"
  | "scope"
  | "startDate"
  | "subject"
  | "term";

export type ContractGenerationContentBinding = Readonly<{
  sourceFieldId: string;
  target: ContractGenerationContentTarget;
}>;

export type ContractGenerationPartyBinding = Readonly<{
  addressFieldId?: string;
  identifierFieldId?: string;
  nameFieldId: string;
  role: string;
}>;

export type ContractGenerationSchema = Readonly<{
  answerFieldIds: readonly string[];
  contentBindings: readonly ContractGenerationContentBinding[];
  contractType: ContractType;
  documentTitle: string;
  partyBindings: readonly ContractGenerationPartyBinding[];
  reviewStatus: ContractDefinitionReviewStatus;
  sections: readonly ContractGenerationSection[];
}>;

export type ContractDefinition<TCategoryId extends string = string> = Readonly<{
  categorySlug: TCategoryId;
  contractType: ContractType;
  description: string;
  formSchema: ContractFormSchema;
  generationSchema: ContractGenerationSchema;
  id: string;
  name: string;
  objective: string;
  structure: readonly string[];
  version: number;
}>;
