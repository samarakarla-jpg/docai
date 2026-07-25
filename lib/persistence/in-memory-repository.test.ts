import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

import type { RepositoryErrorCode } from "./repository";

const requireModule = createRequire(import.meta.url);
const {
  InMemoryRepository,
}: typeof import("./in-memory-repository") = requireModule(
  "./in-memory-repository.ts"
);
const {
  RepositoryError,
}: typeof import("./repository") = requireModule("./repository.ts");
const {
  runRepositoryContract,
}: typeof import("./repository-contract.test-support") = requireModule(
  "./repository-contract.test-support.ts"
);

interface NamedEntity {
  readonly key: string;
  readonly label: string;
  readonly payload: {
    readonly enabled: boolean;
  };
}

interface SequencedEntity {
  readonly sequence: number;
  readonly values: readonly number[];
}

runRepositoryContract<NamedEntity, string>({
  name: "InMemoryRepository with string identifiers",
  createRepository: () =>
    new InMemoryRepository<NamedEntity, string>((entity) => entity.key),
  getIdentifier: (entity) => entity.key,
  firstEntity: {
    key: "first",
    label: "Original",
    payload: { enabled: true },
  },
  updatedFirstEntity: {
    key: "first",
    label: "Updated",
    payload: { enabled: false },
  },
  duplicateFirstEntity: {
    key: "first",
    label: "private-duplicate-value",
    payload: { enabled: false },
  },
  secondEntity: {
    key: "second",
    label: "Second",
    payload: { enabled: false },
  },
  missingIdentifier: "missing",
  sensitivePattern: /private-duplicate-value/,
});

runRepositoryContract<SequencedEntity, number>({
  name: "InMemoryRepository with numeric identifiers",
  createRepository: () =>
    new InMemoryRepository<SequencedEntity, number>(
      (entity) => entity.sequence,
    ),
  getIdentifier: (entity) => entity.sequence,
  firstEntity: { sequence: 10, values: [1, 2] },
  updatedFirstEntity: { sequence: 10, values: [3, 4] },
  duplicateFirstEntity: { sequence: 10, values: [987654321] },
  secondEntity: { sequence: 20, values: [5] },
  missingIdentifier: 999,
  sensitivePattern: /987654321/,
});

describe("InMemoryRepository", () => {
  it("isolates state between repository instances", async () => {
    const getIdentifier = (entity: NamedEntity) => entity.key;
    const firstRepository = new InMemoryRepository(getIdentifier);
    const secondRepository = new InMemoryRepository(getIdentifier);
    const entity: NamedEntity = {
      key: "isolated",
      label: "Only in first",
      payload: { enabled: true },
    };

    await firstRepository.create(entity);

    assert.deepEqual(await firstRepository.list(), [entity]);
    assert.deepEqual(await secondRepository.list(), []);
    assert.equal(await secondRepository.findById(entity.key), null);
  });

  it("lists by insertion order and does not reposition updated entities", async () => {
    const repository = new InMemoryRepository<NamedEntity, string>(
      (entity) => entity.key,
    );
    const first: NamedEntity = {
      key: "first",
      label: "First",
      payload: { enabled: true },
    };
    const second: NamedEntity = {
      key: "second",
      label: "Second",
      payload: { enabled: false },
    };
    const updatedFirst: NamedEntity = {
      key: "first",
      label: "Updated first",
      payload: { enabled: false },
    };
    await repository.create(first);
    await repository.create(second);

    await repository.update(updatedFirst);

    assert.deepEqual(await repository.list(), [updatedFirst, second]);
  });

  it("preserves causes on stable storage failures", () => {
    const cause = new Error("private infrastructure detail");
    const error = new RepositoryError(
      "STORAGE_FAILURE",
      "The storage operation could not be completed.",
      { cause },
    );

    assert.equal(error.code satisfies RepositoryErrorCode, "STORAGE_FAILURE");
    assert.equal(error.cause, cause);
    assert.doesNotMatch(error.message, /private infrastructure detail/);
  });
});
