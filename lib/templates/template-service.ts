export interface Template<TContent> {
  readonly id: string;
  readonly name: string;
  readonly content: TContent;
}

export interface CreateTemplateInput<TContent> {
  readonly id: string;
  readonly name: string;
  readonly content: TContent;
}

export interface UpdateTemplateInput<TContent> {
  readonly name?: string;
  readonly content?: TContent;
}

export interface TemplateStorage<TContent> {
  findById(id: string): Promise<Template<TContent> | null>;
  list(): Promise<readonly Template<TContent>[]>;
  create(template: Template<TContent>): Promise<Template<TContent>>;
  update(template: Template<TContent>): Promise<Template<TContent>>;
  remove(id: string): Promise<void>;
}

export type TemplateServiceErrorCode =
  | "INVALID_INPUT"
  | "CONFLICT"
  | "NOT_FOUND"
  | "STORAGE_FAILURE";

export class TemplateServiceError extends Error {
  readonly code: TemplateServiceErrorCode;

  constructor(
    code: TemplateServiceErrorCode,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "TemplateServiceError";
    this.code = code;
  }
}

export class TemplateService<TContent> {
  private readonly storage: TemplateStorage<TContent>;

  constructor(storage: TemplateStorage<TContent>) {
    this.storage = storage;
  }

  async create(
    input: CreateTemplateInput<TContent>,
  ): Promise<Template<TContent>> {
    this.assertNonBlankString(input.id, "Template id");
    this.assertNonBlankString(input.name, "Template name");

    const existingTemplate = await this.runStorageOperation(
      "check whether the template exists",
      () => this.storage.findById(input.id),
    );

    if (existingTemplate !== null) {
      throw new TemplateServiceError(
        "CONFLICT",
        "A template with this id already exists.",
      );
    }

    return this.runStorageOperation("create the template", () =>
      this.storage.create({
        id: input.id,
        name: input.name,
        content: input.content,
      }),
    );
  }

  async getById(id: string): Promise<Template<TContent>> {
    this.assertNonBlankString(id, "Template id");

    const template = await this.runStorageOperation(
      "get the template",
      () => this.storage.findById(id),
    );

    if (template === null) {
      throw this.createNotFoundError();
    }

    return template;
  }

  async list(): Promise<readonly Template<TContent>[]> {
    return this.runStorageOperation("list templates", () =>
      this.storage.list(),
    );
  }

  async update(
    id: string,
    input: UpdateTemplateInput<TContent>,
  ): Promise<Template<TContent>> {
    this.assertNonBlankString(id, "Template id");

    const hasName = Object.hasOwn(input, "name");
    const hasContent = Object.hasOwn(input, "content");

    if (!hasName && !hasContent) {
      throw new TemplateServiceError(
        "INVALID_INPUT",
        "Template update must include a name or content.",
      );
    }

    let updatedName: string | undefined;

    if (hasName) {
      const candidateName = input.name;
      this.assertNonBlankString(candidateName, "Template name");
      updatedName = candidateName;
    }

    const existingTemplate = await this.runStorageOperation(
      "get the template for update",
      () => this.storage.findById(id),
    );

    if (existingTemplate === null) {
      throw this.createNotFoundError();
    }

    const updatedTemplate: Template<TContent> = {
      id: existingTemplate.id,
      name: updatedName ?? existingTemplate.name,
      content: hasContent
        ? this.readUpdatedContent(input)
        : existingTemplate.content,
    };

    return this.runStorageOperation("update the template", () =>
      this.storage.update(updatedTemplate),
    );
  }

  async remove(id: string): Promise<void> {
    this.assertNonBlankString(id, "Template id");

    const existingTemplate = await this.runStorageOperation(
      "get the template for removal",
      () => this.storage.findById(id),
    );

    if (existingTemplate === null) {
      throw this.createNotFoundError();
    }

    await this.runStorageOperation("remove the template", () =>
      this.storage.remove(id),
    );
  }

  private assertNonBlankString(
    value: unknown,
    fieldName: string,
  ): asserts value is string {
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new TemplateServiceError(
        "INVALID_INPUT",
        `${fieldName} must be a non-empty string.`,
      );
    }
  }

  private createNotFoundError(): TemplateServiceError {
    return new TemplateServiceError("NOT_FOUND", "Template not found.");
  }

  private readUpdatedContent(
    input: UpdateTemplateInput<TContent>,
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
      throw new TemplateServiceError(
        "STORAGE_FAILURE",
        `Unable to ${operation} because storage failed.`,
        { cause: error },
      );
    }
  }
}
