import type { SupabaseClient } from "@supabase/supabase-js";

import type { ContractType } from "../../domain/contract-models";
import { createReadOnlyAuthClient } from "../../../auth/server";

export type SavedContract = Readonly<{
  content: string;
  createdAt: string;
  id: string;
  title: string;
  type: ContractType;
  userId: string;
}>;

export type CreateSavedContractInput = Readonly<{
  content: string;
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
        conteudo: input.content,
        tipo: input.type,
        titulo: input.title,
        user_id: input.userId,
      })
      .select("id, user_id, tipo, titulo, conteudo, created_at")
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
      .select("id, user_id, tipo, titulo, conteudo, created_at")
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
      .select("id, user_id, tipo, titulo, conteudo, created_at")
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
    content: value.conteudo,
    createdAt: value.created_at,
    id: value.id,
    title: value.titulo,
    type: value.tipo,
    userId: value.user_id,
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
