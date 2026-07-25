export interface Document<TContent> {
  readonly id: string;
  readonly title: string;
  readonly content: TContent;
}

export interface CreateDocumentInput<TContent> {
  readonly id: string;
  readonly title: string;
  readonly content: TContent;
}

export interface UpdateDocumentInput<TContent> {
  readonly title?: string;
  readonly content?: TContent;
}

export interface DocumentStorage<TContent> {
  findById(id: string): Promise<Document<TContent> | null>;
  list(): Promise<readonly Document<TContent>[]>;
  create(document: Document<TContent>): Promise<Document<TContent>>;
  update(document: Document<TContent>): Promise<Document<TContent>>;
  remove(id: string): Promise<void>;
}

export type DocumentServiceErrorCode =
  | "INVALID_INPUT"
  | "CONFLICT"
  | "NOT_FOUND"
  | "STORAGE_FAILURE";

export class DocumentServiceError extends Error {
  readonly code: DocumentServiceErrorCode;

  constructor(
    code: DocumentServiceErrorCode,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "DocumentServiceError";
    this.code = code;
  }
}

export class DocumentService<TContent> {
  private readonly storage: DocumentStorage<TContent>;

  constructor(storage: DocumentStorage<TContent>) {
    this.storage = storage;
  }

  async create(
    input: CreateDocumentInput<TContent>,
  ): Promise<Document<TContent>> {
    this.assertNonBlankString(input.id, "Document id");
    this.assertNonBlankString(input.title, "Document title");

    const existingDocument = await this.runStorageOperation(
      "check whether the document exists",
      () => this.storage.findById(input.id),
    );

    if (existingDocument !== null) {
      throw new DocumentServiceError(
        "CONFLICT",
        "A document with this id already exists.",
      );
    }

    return this.runStorageOperation("create the document", () =>
      this.storage.create({
        id: input.id,
        title: input.title,
        content: input.content,
      }),
    );
  }

  async getById(id: string): Promise<Document<TContent>> {
    this.assertNonBlankString(id, "Document id");

    const document = await this.runStorageOperation(
      "get the document",
      () => this.storage.findById(id),
    );

    if (document === null) {
      throw this.createNotFoundError();
    }

    return document;
  }

  async list(): Promise<readonly Document<TContent>[]> {
    return this.runStorageOperation("list documents", () =>
      this.storage.list(),
    );
  }

  async update(
    id: string,
    input: UpdateDocumentInput<TContent>,
  ): Promise<Document<TContent>> {
    this.assertNonBlankString(id, "Document id");

    const hasTitle = Object.hasOwn(input, "title");
    const hasContent = Object.hasOwn(input, "content");

    if (!hasTitle && !hasContent) {
      throw new DocumentServiceError(
        "INVALID_INPUT",
        "Document update must include a title or content.",
      );
    }

    let updatedTitle: string | undefined;

    if (hasTitle) {
      const candidateTitle = input.title;
      this.assertNonBlankString(candidateTitle, "Document title");
      updatedTitle = candidateTitle;
    }

    const existingDocument = await this.runStorageOperation(
      "get the document for update",
      () => this.storage.findById(id),
    );

    if (existingDocument === null) {
      throw this.createNotFoundError();
    }

    const updatedDocument: Document<TContent> = {
      id: existingDocument.id,
      title: updatedTitle ?? existingDocument.title,
      content: hasContent
        ? this.readUpdatedContent(input)
        : existingDocument.content,
    };

    return this.runStorageOperation("update the document", () =>
      this.storage.update(updatedDocument),
    );
  }

  async remove(id: string): Promise<void> {
    this.assertNonBlankString(id, "Document id");

    const existingDocument = await this.runStorageOperation(
      "get the document for removal",
      () => this.storage.findById(id),
    );

    if (existingDocument === null) {
      throw this.createNotFoundError();
    }

    await this.runStorageOperation("remove the document", () =>
      this.storage.remove(id),
    );
  }

  private assertNonBlankString(
    value: unknown,
    fieldName: string,
  ): asserts value is string {
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new DocumentServiceError(
        "INVALID_INPUT",
        `${fieldName} must be a non-empty string.`,
      );
    }
  }

  private createNotFoundError(): DocumentServiceError {
    return new DocumentServiceError("NOT_FOUND", "Document not found.");
  }

  private readUpdatedContent(
    input: UpdateDocumentInput<TContent>,
  ): TContent {
    return input.content as TContent;
  }

  private async runStorageOperation<TResult>(
    operation: string,
    execute: () => Promise<TResult>,
  ): Promise<TResult> {
    try {
      return await execute();
    } catch (error) {
      throw new DocumentServiceError(
        "STORAGE_FAILURE",
        `Unable to ${operation} because storage failed.`,
        { cause: error },
      );
    }
  }
}
