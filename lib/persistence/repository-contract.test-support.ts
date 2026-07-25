import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

import type { Repository } from "./repository";

const requireModule = createRequire(import.meta.url);
const {
  RepositoryError,
}: typeof import("./repository") = requireModule("./repository.ts");

export interface RepositoryContractOptions<TEntity, TIdentifier> {
  readonly name: string;
  readonly createRepository: () => Repository<TEntity, TIdentifier>;
  readonly getIdentifier: (entity: TEntity) => TIdentifier;
  readonly firstEntity: TEntity;
  readonly updatedFirstEntity: TEntity;
  readonly duplicateFirstEntity: TEntity;
  readonly secondEntity: TEntity;
  readonly missingIdentifier: TIdentifier;
  readonly sensitivePattern: RegExp;
}

export function runRepositoryContract<TEntity, TIdentifier>(
  options: RepositoryContractOptions<TEntity, TIdentifier>,
): void {
  const {
    name,
    createRepository,
    getIdentifier,
    firstEntity,
    updatedFirstEntity,
    duplicateFirstEntity,
    secondEntity,
    missingIdentifier,
    sensitivePattern,
  } = options;
  const firstIdentifier = getIdentifier(firstEntity);
  const secondIdentifier = getIdentifier(secondEntity);

  describe(`${name} repository contract`, () => {
    it("represents an empty repository without ambiguity", async () => {
      const repository = createRepository();

      assert.equal(await repository.findById(missingIdentifier), null);
      assert.deepEqual(await repository.list(), []);
    });

    it("creates, finds, and lists an entity without transforming it", async () => {
      const repository = createRepository();

      assert.deepEqual(await repository.create(firstEntity), firstEntity);
      assert.deepEqual(
        await repository.findById(firstIdentifier),
        firstEntity,
      );
      assert.deepEqual(await repository.list(), [firstEntity]);
    });

    it("rejects a duplicate identifier and preserves the original entity", async () => {
      const repository = createRepository();
      await repository.create(firstEntity);

      await assert.rejects(
        repository.create(duplicateFirstEntity),
        matchesRepositoryError("CONFLICT", sensitivePattern),
      );
      assert.deepEqual(
        await repository.findById(firstIdentifier),
        firstEntity,
      );
    });

    it("replaces an existing entity during update", async () => {
      const repository = createRepository();
      await repository.create(firstEntity);

      assert.deepEqual(
        await repository.update(updatedFirstEntity),
        updatedFirstEntity,
      );
      assert.deepEqual(
        await repository.findById(firstIdentifier),
        updatedFirstEntity,
      );
    });

    it("rejects an update for an absent identifier without creating it", async () => {
      const repository = createRepository();

      await assert.rejects(
        repository.update(updatedFirstEntity),
        matchesRepositoryError("NOT_FOUND", sensitivePattern),
      );
      assert.equal(await repository.findById(firstIdentifier), null);
      assert.deepEqual(await repository.list(), []);
    });

    it("removes an existing entity", async () => {
      const repository = createRepository();
      await repository.create(firstEntity);

      await repository.remove(firstIdentifier);

      assert.equal(await repository.findById(firstIdentifier), null);
      assert.deepEqual(await repository.list(), []);
    });

    it("rejects removal of an absent identifier without side effects", async () => {
      const repository = createRepository();

      await assert.rejects(
        repository.remove(missingIdentifier),
        matchesRepositoryError("NOT_FOUND", sensitivePattern),
      );
      assert.deepEqual(await repository.list(), []);
    });

    it("lists every stored entity without interpreting its fields", async () => {
      const repository = createRepository();
      await repository.create(firstEntity);
      await repository.create(secondEntity);

      const identifiers = (await repository.list()).map(getIdentifier);

      assert.deepEqual(
        new Set(identifiers),
        new Set([firstIdentifier, secondIdentifier]),
      );
      assert.deepEqual(
        await repository.findById(firstIdentifier),
        firstEntity,
      );
      assert.deepEqual(
        await repository.findById(secondIdentifier),
        secondEntity,
      );
    });
  });
}

function matchesRepositoryError(
  code: "CONFLICT" | "NOT_FOUND",
  sensitivePattern: RegExp,
) {
  return (error: unknown): boolean => {
    assert.ok(error instanceof RepositoryError);
    assert.equal(error.code, code);
    assert.doesNotMatch(error.message, sensitivePattern);
    return true;
  };
}
