import { createRequire } from "node:module";

import type { Repository } from "./repository";

const requireModule = createRequire(import.meta.url);
const {
  RepositoryError,
}: typeof import("./repository") = requireModule("./repository.ts");

export type EntityIdentifier<TEntity, TIdentifier> = (
  entity: TEntity,
) => TIdentifier;

/**
 * Non-durable repository for tests and local development.
 * Each instance owns its state, which is lost when the instance is discarded.
 */
export class InMemoryRepository<TEntity, TIdentifier>
  implements Repository<TEntity, TIdentifier>
{
  private readonly entities = new Map<TIdentifier, TEntity>();
  private readonly getIdentifier: EntityIdentifier<TEntity, TIdentifier>;

  constructor(getIdentifier: EntityIdentifier<TEntity, TIdentifier>) {
    this.getIdentifier = getIdentifier;
  }

  async create(entity: TEntity): Promise<TEntity> {
    const id = this.getIdentifier(entity);

    if (this.entities.has(id)) {
      throw new RepositoryError(
        "CONFLICT",
        "An entity with this identifier already exists.",
      );
    }

    this.entities.set(id, entity);
    return entity;
  }

  async findById(id: TIdentifier): Promise<TEntity | null> {
    if (!this.entities.has(id)) {
      return null;
    }

    return this.entities.get(id) as TEntity;
  }

  async list(): Promise<readonly TEntity[]> {
    return [...this.entities.values()];
  }

  async update(entity: TEntity): Promise<TEntity> {
    const id = this.getIdentifier(entity);

    if (!this.entities.has(id)) {
      throw new RepositoryError(
        "NOT_FOUND",
        "The entity to update was not found.",
      );
    }

    this.entities.set(id, entity);
    return entity;
  }

  async remove(id: TIdentifier): Promise<void> {
    if (!this.entities.delete(id)) {
      throw new RepositoryError(
        "NOT_FOUND",
        "The entity to remove was not found.",
      );
    }
  }
}
