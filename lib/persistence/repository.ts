export interface Repository<TEntity, TIdentifier> {
  create(entity: TEntity): Promise<TEntity>;
  findById(id: TIdentifier): Promise<TEntity | null>;
  list(): Promise<readonly TEntity[]>;
  update(entity: TEntity): Promise<TEntity>;
  remove(id: TIdentifier): Promise<void>;
}

export type RepositoryErrorCode =
  | "CONFLICT"
  | "NOT_FOUND"
  | "STORAGE_FAILURE";

export class RepositoryError extends Error {
  readonly code: RepositoryErrorCode;

  constructor(
    code: RepositoryErrorCode,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "RepositoryError";
    this.code = code;
  }
}
