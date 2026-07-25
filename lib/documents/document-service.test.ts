import type {
  Document,
  DocumentServiceErrorCode,
  DocumentStorage,
} from "./document-service";

const assert: typeof import("node:assert/strict") = require(
  "node:assert/strict"
);
const { describe, it }: typeof import("node:test") = require("node:test");
const {
  DocumentService,
  DocumentServiceError,
}: typeof import("./document-service") = require("./document-service.ts");

class InMemoryDocumentStorage<TContent>
  implements DocumentStorage<TContent>
{
  readonly documents = new Map<string, Document<TContent>>();
  createCalls = 0;
  updateCalls = 0;

  async findById(id: string): Promise<Document<TContent> | null> {
    return this.documents.get(id) ?? null;
  }

  async list(): Promise<readonly Document<TContent>[]> {
    return [...this.documents.values()];
  }

  async create(
    document: Document<TContent>,
  ): Promise<Document<TContent>> {
    this.createCalls += 1;
    this.documents.set(document.id, document);
    return document;
  }

  async update(
    document: Document<TContent>,
  ): Promise<Document<TContent>> {
    this.updateCalls += 1;
    this.documents.set(document.id, document);
    return document;
  }

  async remove(id: string): Promise<void> {
    this.documents.delete(id);
  }
}

class FailingDocumentStorage<TContent>
  implements DocumentStorage<TContent>
{
  private readonly failure: Error;

  constructor(failure: Error) {
    this.failure = failure;
  }

  async findById(): Promise<Document<TContent> | null> {
    throw this.failure;
  }

  async list(): Promise<readonly Document<TContent>[]> {
    throw this.failure;
  }

  async create(): Promise<Document<TContent>> {
    throw this.failure;
  }

  async update(): Promise<Document<TContent>> {
    throw this.failure;
  }

  async remove(): Promise<void> {
    throw this.failure;
  }
}

function matchesServiceError(code: DocumentServiceErrorCode) {
  return (error: unknown): boolean => {
    assert.ok(error instanceof DocumentServiceError);
    assert.equal(error.code, code);
    return true;
  };
}

describe("DocumentService", () => {
  it("creates and returns a document with opaque content", async () => {
    const storage = new InMemoryDocumentStorage<string>();
    const service = new DocumentService(storage);
    const input = {
      id: "welcome",
      title: "Welcome",
      content: "Hello",
    };

    const createdDocument = await service.create(input);

    assert.deepEqual(createdDocument, input);
    assert.equal(storage.createCalls, 1);
  });

  it("rejects blank ids and titles before writing", async () => {
    const storage = new InMemoryDocumentStorage<string>();
    const service = new DocumentService(storage);

    await assert.rejects(
      service.create({ id: " ", title: "Valid", content: "Content" }),
      matchesServiceError("INVALID_INPUT"),
    );
    await assert.rejects(
      service.create({ id: "valid", title: "\t", content: "Content" }),
      matchesServiceError("INVALID_INPUT"),
    );

    assert.equal(storage.createCalls, 0);
  });

  it("rejects duplicate document ids", async () => {
    const storage = new InMemoryDocumentStorage<string>();
    const service = new DocumentService(storage);
    await service.create({
      id: "existing",
      title: "Existing",
      content: "Original",
    });

    await assert.rejects(
      service.create({
        id: "existing",
        title: "Duplicate",
        content: "Replacement",
      }),
      matchesServiceError("CONFLICT"),
    );

    assert.equal(storage.createCalls, 1);
  });

  it("gets an existing document and rejects a missing document", async () => {
    const storage = new InMemoryDocumentStorage<string>();
    const service = new DocumentService(storage);
    const document = {
      id: "existing",
      title: "Existing",
      content: "Content",
    };
    storage.documents.set(document.id, document);

    assert.equal(await service.getById(document.id), document);
    await assert.rejects(
      service.getById("missing"),
      matchesServiceError("NOT_FOUND"),
    );
  });

  it("lists documents in storage order without transforming content", async () => {
    type StructuredContent = {
      readonly enabled: boolean;
      readonly values: readonly number[];
    };

    const storage = new InMemoryDocumentStorage<StructuredContent>();
    const service = new DocumentService(storage);
    const first = {
      id: "first",
      title: "First",
      content: { enabled: true, values: [1, 2] },
    };
    const second = {
      id: "second",
      title: "Second",
      content: { enabled: false, values: [3] },
    };
    storage.documents.set(first.id, first);
    storage.documents.set(second.id, second);

    const documents = await service.list();

    assert.deepEqual(documents, [first, second]);
    assert.equal(documents[0]?.content, first.content);
    assert.equal(documents[1]?.content, second.content);
  });

  it("updates title and content independently", async () => {
    const storage = new InMemoryDocumentStorage<{ value: number }>();
    const service = new DocumentService(storage);
    const original = {
      id: "editable",
      title: "Original",
      content: { value: 1 },
    };
    storage.documents.set(original.id, original);

    const renamed = await service.update(original.id, { title: "Renamed" });
    const replacementContent = { value: 2 };
    const updated = await service.update(original.id, {
      content: replacementContent,
    });

    assert.deepEqual(renamed, {
      id: original.id,
      title: "Renamed",
      content: original.content,
    });
    assert.deepEqual(updated, {
      id: original.id,
      title: "Renamed",
      content: replacementContent,
    });
    assert.equal(updated.content, replacementContent);
    assert.equal(storage.updateCalls, 2);
  });

  it("rejects empty or invalid updates before writing", async () => {
    const storage = new InMemoryDocumentStorage<string>();
    const service = new DocumentService(storage);
    storage.documents.set("editable", {
      id: "editable",
      title: "Editable",
      content: "Content",
    });

    await assert.rejects(
      service.update("editable", {}),
      matchesServiceError("INVALID_INPUT"),
    );
    await assert.rejects(
      service.update("editable", { title: " " }),
      matchesServiceError("INVALID_INPUT"),
    );

    assert.equal(storage.updateCalls, 0);
  });

  it("rejects updates and removals for missing documents", async () => {
    const storage = new InMemoryDocumentStorage<string>();
    const service = new DocumentService(storage);

    await assert.rejects(
      service.update("missing", { title: "Title" }),
      matchesServiceError("NOT_FOUND"),
    );
    await assert.rejects(
      service.remove("missing"),
      matchesServiceError("NOT_FOUND"),
    );
  });

  it("removes an existing document", async () => {
    const storage = new InMemoryDocumentStorage<string>();
    const service = new DocumentService(storage);
    storage.documents.set("removable", {
      id: "removable",
      title: "Removable",
      content: "Content",
    });

    await service.remove("removable");

    await assert.rejects(
      service.getById("removable"),
      matchesServiceError("NOT_FOUND"),
    );
  });

  it("translates storage failures and preserves their cause", async () => {
    const storageFailure = new Error("private storage detail");
    const service = new DocumentService(
      new FailingDocumentStorage<string>(storageFailure),
    );

    await assert.rejects(service.getById("valid"), (error: unknown) => {
      assert.ok(error instanceof DocumentServiceError);
      assert.equal(error.code, "STORAGE_FAILURE");
      assert.equal(error.cause, storageFailure);
      assert.doesNotMatch(error.message, /private storage detail/);
      return true;
    });
  });
});
