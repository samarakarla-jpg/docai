import type {
  Template,
  TemplateServiceErrorCode,
  TemplateStorage,
} from "./template-service";

const assert: typeof import("node:assert/strict") = require(
  "node:assert/strict"
);
const { describe, it }: typeof import("node:test") = require("node:test");
const {
  TemplateService,
  TemplateServiceError,
}: typeof import("./template-service") = require("./template-service.ts");

class InMemoryTemplateStorage<TContent>
  implements TemplateStorage<TContent>
{
  readonly templates = new Map<string, Template<TContent>>();
  createCalls = 0;
  updateCalls = 0;

  async findById(id: string): Promise<Template<TContent> | null> {
    return this.templates.get(id) ?? null;
  }

  async list(): Promise<readonly Template<TContent>[]> {
    return [...this.templates.values()];
  }

  async create(
    template: Template<TContent>,
  ): Promise<Template<TContent>> {
    this.createCalls += 1;
    this.templates.set(template.id, template);
    return template;
  }

  async update(
    template: Template<TContent>,
  ): Promise<Template<TContent>> {
    this.updateCalls += 1;
    this.templates.set(template.id, template);
    return template;
  }

  async remove(id: string): Promise<void> {
    this.templates.delete(id);
  }
}

class FailingTemplateStorage<TContent>
  implements TemplateStorage<TContent>
{
  private readonly failure: Error;

  constructor(failure: Error) {
    this.failure = failure;
  }

  async findById(): Promise<Template<TContent> | null> {
    throw this.failure;
  }

  async list(): Promise<readonly Template<TContent>[]> {
    throw this.failure;
  }

  async create(): Promise<Template<TContent>> {
    throw this.failure;
  }

  async update(): Promise<Template<TContent>> {
    throw this.failure;
  }

  async remove(): Promise<void> {
    throw this.failure;
  }
}

function matchesServiceError(code: TemplateServiceErrorCode) {
  return (error: unknown): boolean => {
    assert.ok(error instanceof TemplateServiceError);
    assert.equal(error.code, code);
    return true;
  };
}

describe("TemplateService", () => {
  it("creates and returns a template with opaque content", async () => {
    const storage = new InMemoryTemplateStorage<string>();
    const service = new TemplateService(storage);
    const input = {
      id: "welcome",
      name: "Welcome",
      content: "Hello",
    };

    const createdTemplate = await service.create(input);

    assert.deepEqual(createdTemplate, input);
    assert.equal(storage.createCalls, 1);
  });

  it("rejects blank ids and names before writing", async () => {
    const storage = new InMemoryTemplateStorage<string>();
    const service = new TemplateService(storage);

    await assert.rejects(
      service.create({ id: " ", name: "Valid", content: "Content" }),
      matchesServiceError("INVALID_INPUT"),
    );
    await assert.rejects(
      service.create({ id: "valid", name: "\t", content: "Content" }),
      matchesServiceError("INVALID_INPUT"),
    );

    assert.equal(storage.createCalls, 0);
  });

  it("rejects duplicate template ids", async () => {
    const storage = new InMemoryTemplateStorage<string>();
    const service = new TemplateService(storage);
    await service.create({
      id: "existing",
      name: "Existing",
      content: "Original",
    });

    await assert.rejects(
      service.create({
        id: "existing",
        name: "Duplicate",
        content: "Replacement",
      }),
      matchesServiceError("CONFLICT"),
    );

    assert.equal(storage.createCalls, 1);
  });

  it("gets an existing template and rejects a missing template", async () => {
    const storage = new InMemoryTemplateStorage<string>();
    const service = new TemplateService(storage);
    const template = {
      id: "existing",
      name: "Existing",
      content: "Content",
    };
    storage.templates.set(template.id, template);

    assert.equal(await service.getById(template.id), template);
    await assert.rejects(
      service.getById("missing"),
      matchesServiceError("NOT_FOUND"),
    );
  });

  it("lists templates without transforming structured content", async () => {
    type StructuredContent = {
      readonly enabled: boolean;
      readonly values: readonly number[];
    };

    const storage = new InMemoryTemplateStorage<StructuredContent>();
    const service = new TemplateService(storage);
    const first = {
      id: "first",
      name: "First",
      content: { enabled: true, values: [1, 2] },
    };
    const second = {
      id: "second",
      name: "Second",
      content: { enabled: false, values: [3] },
    };
    storage.templates.set(first.id, first);
    storage.templates.set(second.id, second);

    const templates = await service.list();

    assert.deepEqual(templates, [first, second]);
    assert.equal(templates[0]?.content, first.content);
    assert.equal(templates[1]?.content, second.content);
  });

  it("updates name and content independently", async () => {
    const storage = new InMemoryTemplateStorage<{ value: number }>();
    const service = new TemplateService(storage);
    const original = {
      id: "editable",
      name: "Original",
      content: { value: 1 },
    };
    storage.templates.set(original.id, original);

    const renamed = await service.update(original.id, { name: "Renamed" });
    const replacementContent = { value: 2 };
    const updated = await service.update(original.id, {
      content: replacementContent,
    });

    assert.deepEqual(renamed, {
      id: original.id,
      name: "Renamed",
      content: original.content,
    });
    assert.deepEqual(updated, {
      id: original.id,
      name: "Renamed",
      content: replacementContent,
    });
    assert.equal(updated.content, replacementContent);
    assert.equal(storage.updateCalls, 2);
  });

  it("rejects empty or invalid updates before writing", async () => {
    const storage = new InMemoryTemplateStorage<string>();
    const service = new TemplateService(storage);
    storage.templates.set("editable", {
      id: "editable",
      name: "Editable",
      content: "Content",
    });

    await assert.rejects(
      service.update("editable", {}),
      matchesServiceError("INVALID_INPUT"),
    );
    await assert.rejects(
      service.update("editable", { name: " " }),
      matchesServiceError("INVALID_INPUT"),
    );

    assert.equal(storage.updateCalls, 0);
  });

  it("rejects updates and removals for missing templates", async () => {
    const storage = new InMemoryTemplateStorage<string>();
    const service = new TemplateService(storage);

    await assert.rejects(
      service.update("missing", { name: "Name" }),
      matchesServiceError("NOT_FOUND"),
    );
    await assert.rejects(
      service.remove("missing"),
      matchesServiceError("NOT_FOUND"),
    );
  });

  it("removes an existing template", async () => {
    const storage = new InMemoryTemplateStorage<string>();
    const service = new TemplateService(storage);
    storage.templates.set("removable", {
      id: "removable",
      name: "Removable",
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
    const service = new TemplateService(
      new FailingTemplateStorage<string>(storageFailure),
    );

    await assert.rejects(service.getById("valid"), (error: unknown) => {
      assert.ok(error instanceof TemplateServiceError);
      assert.equal(error.code, "STORAGE_FAILURE");
      assert.equal(error.cause, storageFailure);
      assert.doesNotMatch(error.message, /private storage detail/);
      return true;
    });
  });
});
