import type { SupabaseClient } from "@supabase/supabase-js";

import type { ContractType } from "../../domain/contract-models";
import {
  SUPPORTED_SERVICE_DOCUMENTS,
  type SupportedServiceDocument,
} from "../../domain/service-definition";
import { createReadOnlyAuthClient } from "../../../auth/server";

const CONTRACT_COLUMNS =
  "id, user_id, tipo, titulo, conteudo, created_at, document_kind, contract_definition_id, service_id, service_name, service_ids, service_names, profession_id, profession_name, client_name, provider_name";

export type SavedContract = Readonly<{
  content: string;
  clientName?: string;
  contractDefinitionId?: string;
  createdAt: string;
  documentKind?: SupportedServiceDocument;
  id: string;
  professionId?: string;
  professionName?: string;
  providerName?: string;
  serviceId?: string;
  serviceIds?: readonly string[];
  serviceName?: string;
  serviceNames?: readonly string[];
  title: string;
  type: ContractType;
  userId: string;
}>;

export type CreateSavedContractInput = Readonly<{
  content: string;
  clientName?: string;
  contractDefinitionId?: string;
  documentKind?: SupportedServiceDocument;
  professionId?: string;
  professionName?: string;
  providerName?: string;
  serviceId?: string;
  serviceIds?: readonly string[];
  serviceName?: string;
  serviceNames?: readonly string[];
  title: string;
  type: ContractType;
  userId: string;
}>;

export class ContractPersistenceError extends Error {
  readonly code = "STORAGE_FAILURE" as const;
  readonly providerCode?: string;
  readonly providerMessage?: string;
  readonly status?: number;

  constructor(
    message: string,
    details?: Readonly<{
      code?: string;
      message?: string;
      status?: number;
    }>,
  ) {
    super(message);
    this.name = "ContractPersistenceError";
    this.providerCode = details?.code;
    this.providerMessage = details?.message;
    this.status = details?.status;
  }
}

export class SupabaseContractRepository {
  private readonly client: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.client = client;
  }

  async create(input: CreateSavedContractInput): Promise<SavedContract> {
    const { data, error } = await this.client
      .from("contracts")
      .insert({
        client_name: input.clientName,
        conteudo: input.content,
        contract_definition_id: input.contractDefinitionId,
        document_kind: input.documentKind,
        profession_id: input.professionId,
        profession_name: input.professionName,
        provider_name: input.providerName,
        service_id: input.serviceId,
        service_ids: input.serviceIds,
        service_name: input.serviceName,
        service_names: input.serviceNames,
        tipo: input.type,
        titulo: input.title,
        user_id: input.userId,
      })
      .select(CONTRACT_COLUMNS)
      .single();

    if (error) {
      throw new ContractPersistenceError("Unable to save the contract.", {
        code: error.code,
        message: error.message,
        status: readStatus(error),
      });
    }

    return parseContractRow(data);
  }

  async listByUser(userId: string): Promise<readonly SavedContract[]> {
    const { data, error } = await this.client
      .from("contracts")
      .select(CONTRACT_COLUMNS)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new ContractPersistenceError("Unable to list contracts.");
    }

    return (data ?? []).map(parseContractRow);
  }

  async findByIdForUser(
    id: string,
    userId: string,
  ): Promise<SavedContract | null> {
    const { data, error } = await this.client
      .from("contracts")
      .select(CONTRACT_COLUMNS)
      .eq("id", id)
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      throw new ContractPersistenceError("Unable to read the contract.");
    }

    return data ? parseContractRow(data) : null;
  }
}

export async function createSupabaseContractRepository(): Promise<SupabaseContractRepository> {
  return new SupabaseContractRepository(await createReadOnlyAuthClient());
}

function parseContractRow(value: unknown): SavedContract {
  if (
    !isRecord(value) ||
    !isNonBlankString(value.id) ||
    !isNonBlankString(value.user_id) ||
    !isContractType(value.tipo) ||
    !isNonBlankString(value.titulo) ||
    !isNonBlankString(value.conteudo) ||
    !isNonBlankString(value.created_at)
  ) {
    throw new ContractPersistenceError("The stored contract is invalid.");
  }

  return {
    ...readOptionalStringProperty(value, "client_name", "clientName"),
    content: value.conteudo,
    ...readOptionalStringProperty(
      value,
      "contract_definition_id",
      "contractDefinitionId",
    ),
    createdAt: value.created_at,
    ...readOptionalDocumentKind(value),
    id: value.id,
    ...readOptionalStringProperty(value, "profession_id", "professionId"),
    ...readOptionalStringProperty(value, "profession_name", "professionName"),
    ...readOptionalStringProperty(value, "provider_name", "providerName"),
    ...readOptionalStringProperty(value, "service_id", "serviceId"),
    ...readOptionalStringProperty(value, "service_name", "serviceName"),
    ...readOptionalServiceLists(value),
    title: value.titulo,
    type: value.tipo,
    userId: value.user_id,
  };
}

function readOptionalDocumentKind(
  value: Record<string, unknown>,
): Readonly<{ documentKind?: SupportedServiceDocument }> {
  const documentKind = value.document_kind;

  if (documentKind === undefined || documentKind === null) {
    return {};
  }

  if (!isSupportedServiceDocument(documentKind)) {
    throw new ContractPersistenceError("The stored contract is invalid.");
  }

  return { documentKind };
}

function readOptionalStringProperty<
  TProperty extends
    | "clientName"
    | "contractDefinitionId"
    | "professionId"
    | "professionName"
    | "providerName"
    | "serviceId"
    | "serviceName",
>(
  value: Record<string, unknown>,
  databaseProperty: string,
  property: TProperty,
): Partial<Record<TProperty, string>> {
  const storedValue = value[databaseProperty];

  if (storedValue === undefined || storedValue === null) {
    return {};
  }

  if (!isNonBlankString(storedValue)) {
    throw new ContractPersistenceError("The stored contract is invalid.");
  }

  return { [property]: storedValue } as Partial<Record<TProperty, string>>;
}

function readOptionalServiceLists(value: Record<string, unknown>): Readonly<{
  serviceIds?: readonly string[];
  serviceNames?: readonly string[];
}> {
  const serviceIds = value.service_ids;
  const serviceNames = value.service_names;

  if (
    (serviceIds === undefined || serviceIds === null) &&
    (serviceNames === undefined || serviceNames === null)
  ) {
    return {};
  }

  if (
    !Array.isArray(serviceIds) ||
    !Array.isArray(serviceNames) ||
    serviceIds.length === 0 ||
    serviceIds.length !== serviceNames.length ||
    serviceIds.some((item) => !isNonBlankString(item)) ||
    serviceNames.some((item) => !isNonBlankString(item))
  ) {
    throw new ContractPersistenceError("The stored contract is invalid.");
  }

  return {
    serviceIds: [...serviceIds],
    serviceNames: [...serviceNames],
  };
}

function isContractType(value: unknown): value is ContractType {
  return (
    value === "services" ||
    value === "sale" ||
    value === "rental" ||
    value === "loan"
  );
}

function isSupportedServiceDocument(
  value: unknown,
): value is SupportedServiceDocument {
  return (
    typeof value === "string" &&
    SUPPORTED_SERVICE_DOCUMENTS.some((document) => document === value)
  );
}

function isNonBlankString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readStatus(value: unknown): number | undefined {
  if (!isRecord(value) || typeof value.status !== "number") {
    return undefined;
  }

  return value.status;
}
