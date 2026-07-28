import type {
  ContractFormFieldSchema,
  ContractFormSchema,
} from "./contract-definition";

export const CURRENT_CONTRACT_FORM_FIELD_IDS = [
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

export type CurrentContractFormFieldId =
  (typeof CURRENT_CONTRACT_FORM_FIELD_IDS)[number];

export function createStandardContractFormSchema(
  initialContractContext?: string,
): ContractFormSchema {
  return {
    sections: [
      {
        fields: [
          textField("contractorName", "Nome do contratante"),
          textField("contractorDocument", "CPF/CNPJ do contratante"),
          textField(
            "contractorAddress",
            "Endereço do contratante",
            "full",
          ),
        ],
        id: "contractor",
        title: "Contratante (seus dados)",
      },
      {
        fields: [
          textField("contractedName", "Nome do contratado"),
          textField("contractedDocument", "CPF/CNPJ do contratado"),
          textField(
            "contractedAddress",
            "Endereço do contratado",
            "full",
          ),
        ],
        id: "contracted",
        title: "Contratado (dados da pessoa que realizará o serviço)",
      },
      {
        fields: [
          {
            defaultValue: initialContractContext,
            helpText:
              "Ex.: pintura de uma casa, instalação de ar-condicionado, criação de um site, aulas particulares ou consultoria.",
            id: "contractObject",
            label: "Qual é o serviço?",
            layout: "full",
            required: true,
            type: "text",
          },
          {
            currency: "BRL",
            helpText: "Ex.: R$ 1.500,00",
            id: "value",
            label: "Qual é o valor do serviço?",
            layout: "half",
            required: true,
            type: "money",
          },
          {
            id: "startDate",
            label: "Data de início",
            layout: "half",
            required: true,
            type: "date",
          },
          {
            helpText:
              "Ex.: serviço único em 15 dias; 1 vez por semana durante 3 meses; mensal por 12 meses.",
            id: "term",
            label: "Qual é a duração ou frequência do serviço?",
            layout: "half",
            required: true,
            type: "text",
          },
        ],
        id: "contract-details",
        title: "Dados do contrato",
      },
    ],
  };
}

export function listFormSchemaFieldIds(
  schema: ContractFormSchema,
): readonly string[] {
  return schema.sections.flatMap((section) =>
    section.fields.map((field) => field.id),
  );
}

function textField(
  id: CurrentContractFormFieldId,
  label: string,
  layout: "full" | "half" = "half",
): ContractFormFieldSchema {
  return {
    id,
    label,
    layout,
    required: true,
    type: "text",
  };
}
