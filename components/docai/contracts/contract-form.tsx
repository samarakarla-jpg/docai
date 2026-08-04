"use client";

import type { ChangeEvent } from "react";

import type {
  CheckboxFormFieldSchema,
  ContractFormFieldSchema,
  ContractFormSchema,
  SelectFormFieldSchema,
  TextAreaFormFieldSchema,
} from "@/lib/docai/domain/contract-definition";
import { createStandardContractFormSchema } from "@/lib/docai/domain/contract-form-schema";
import type { ContractType } from "@/lib/docai/domain/contract-models";

type ContractFormProps = Readonly<{
  disabled?: boolean;
  fieldErrors?: Readonly<Record<string, string>>;
  schema?: ContractFormSchema;
  sectionTitleOverrides?: Readonly<Record<string, string>>;
  type: ContractType | "";
}>;

export function ContractForm({
  disabled,
  fieldErrors,
  schema,
  sectionTitleOverrides,
}: ContractFormProps) {
  const formSchema = schema ?? createStandardContractFormSchema();

  return (
    <fieldset className="space-y-8" disabled={disabled}>
      <legend className="sr-only">Dados do contrato</legend>

      {formSchema.sections.map((section) => {
        const titleId = `contract-form-section-${section.id}`;

        return (
          <section aria-labelledby={titleId} key={section.id}>
            <h2
              className="text-lg font-semibold text-slate-950"
              id={titleId}
            >
              {sectionTitleOverrides?.[section.id] ?? section.title}
            </h2>
            {section.description ? (
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {section.description}
              </p>
            ) : null}
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              {section.fields.map((field) => (
                <div
                  className={field.layout === "full" ? "sm:col-span-2" : undefined}
                  key={field.id}
                >
                  <FormField
                    error={fieldErrors?.[field.id]}
                    field={field}
                  />
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </fieldset>
  );
}

type FormFieldProps = Readonly<{
  error?: string;
  field: ContractFormFieldSchema;
}>;

function FormField({ error, field }: FormFieldProps) {
  switch (field.type) {
    case "textarea":
      return <TextAreaField error={error} field={field} />;
    case "select":
      return <SelectField error={error} field={field} />;
    case "checkbox":
      return <CheckboxField error={error} field={field} />;
    case "money":
      return (
        <InputField
          error={error}
          field={field}
          inputMode="decimal"
          onChange={formatCurrencyInput}
          type="text"
        />
      );
    case "number":
      return (
        <InputField
          error={error}
          field={field}
          max={field.max}
          min={field.min}
          type="number"
        />
      );
    case "date":
      return (
        <InputField
          error={error}
          field={field}
          inputMode="numeric"
          maxLength={10}
          onChange={formatDateInput}
          placeholder="dd/mm/aaaa"
          type="text"
        />
      );
    case "text":
      return (
        <InputField
          autoComplete={field.autocomplete}
          error={error}
          field={field}
          type="text"
        />
      );
  }
}

type InputFieldProps = Readonly<{
  autoComplete?: string;
  error?: string;
  field: Exclude<
    ContractFormFieldSchema,
    TextAreaFormFieldSchema | SelectFormFieldSchema | CheckboxFormFieldSchema
  >;
  inputMode?: "decimal" | "numeric";
  max?: number;
  maxLength?: number;
  min?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: "number" | "text";
}>;

function InputField({
  autoComplete,
  error,
  field,
  inputMode,
  max,
  maxLength,
  min,
  onChange,
  placeholder,
  type,
}: InputFieldProps) {
  const descriptionId = field.helpText ? `${field.id}-description` : undefined;
  const errorId = error ? `${field.id}-error` : undefined;

  return (
    <>
      <label className="text-sm font-medium text-slate-800" htmlFor={field.id}>
        {field.label}
      </label>
      <input
        aria-describedby={joinIds(descriptionId, errorId)}
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200"
        defaultValue={
          field.type === "date"
            ? formatDateInputValue(field.defaultValue ?? "")
            : field.defaultValue
        }
        id={field.id}
        inputMode={inputMode}
        max={max}
        maxLength={maxLength}
        min={min}
        name={field.id}
        onChange={onChange}
        placeholder={placeholder ?? field.placeholder}
        required={field.required}
        type={type}
      />
      <FieldMessages error={error} field={field} />
    </>
  );
}

function TextAreaField({
  error,
  field,
}: Readonly<{ error?: string; field: TextAreaFormFieldSchema }>) {
  const descriptionId = field.helpText ? `${field.id}-description` : undefined;
  const errorId = error ? `${field.id}-error` : undefined;

  return (
    <>
      <label className="text-sm font-medium text-slate-800" htmlFor={field.id}>
        {field.label}
      </label>
      <textarea
        aria-describedby={joinIds(descriptionId, errorId)}
        aria-invalid={Boolean(error)}
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200"
        defaultValue={field.defaultValue}
        id={field.id}
        name={field.id}
        placeholder={field.placeholder}
        required={field.required}
        rows={field.rows ?? 4}
      />
      <FieldMessages error={error} field={field} />
    </>
  );
}

function SelectField({
  error,
  field,
}: Readonly<{ error?: string; field: SelectFormFieldSchema }>) {
  const descriptionId = field.helpText ? `${field.id}-description` : undefined;
  const errorId = error ? `${field.id}-error` : undefined;

  return (
    <>
      <label className="text-sm font-medium text-slate-800" htmlFor={field.id}>
        {field.label}
      </label>
      <select
        aria-describedby={joinIds(descriptionId, errorId)}
        aria-invalid={Boolean(error)}
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200"
        defaultValue={field.defaultValue ?? ""}
        id={field.id}
        name={field.id}
        required={field.required}
      >
        <option value="">Selecione uma opção</option>
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldMessages error={error} field={field} />
    </>
  );
}

function CheckboxField({
  error,
  field,
}: Readonly<{ error?: string; field: CheckboxFormFieldSchema }>) {
  const descriptionId = field.helpText ? `${field.id}-description` : undefined;
  const errorId = error ? `${field.id}-error` : undefined;

  return (
    <>
      <div className="flex items-start gap-3">
        <input
          aria-describedby={joinIds(descriptionId, errorId)}
          aria-invalid={Boolean(error)}
          className="mt-1 size-4 rounded border-slate-300 text-slate-950 focus:ring-2 focus:ring-slate-500"
          defaultChecked={field.defaultValue === "true"}
          id={field.id}
          name={field.id}
          required={field.required}
          type="checkbox"
          value="true"
        />
        <label className="text-sm font-medium text-slate-800" htmlFor={field.id}>
          {field.label}
        </label>
      </div>
      <FieldMessages error={error} field={field} />
    </>
  );
}

function FieldMessages({
  error,
  field,
}: Readonly<{ error?: string; field: ContractFormFieldSchema }>) {
  return (
    <>
      {field.helpText ? (
        <p className="mt-2 text-sm text-slate-600" id={`${field.id}-description`}>
          {field.helpText}
        </p>
      ) : null}
      {error ? (
        <p className="mt-2 text-sm text-red-700" id={`${field.id}-error`}>
          {error}
        </p>
      ) : null}
    </>
  );
}

function joinIds(...ids: readonly (string | undefined)[]): string | undefined {
  const value = ids.filter((id): id is string => id !== undefined).join(" ");
  return value || undefined;
}

function formatCurrencyInput(event: ChangeEvent<HTMLInputElement>): void {
  const digits = event.currentTarget.value.replace(/\D/g, "");

  if (!digits) {
    event.currentTarget.value = "";
    return;
  }

  event.currentTarget.value = (Number(digits) / 100).toLocaleString("pt-BR", {
    currency: "BRL",
    minimumFractionDigits: 2,
    style: "currency",
  });
}

function formatDateInput(event: ChangeEvent<HTMLInputElement>): void {
  event.currentTarget.value = formatDateInputValue(event.currentTarget.value);
}

function formatDateInputValue(value: string): string {
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (isoMatch) {
    return `${isoMatch[3]}/${isoMatch[2]}/${isoMatch[1]}`;
  }

  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}
