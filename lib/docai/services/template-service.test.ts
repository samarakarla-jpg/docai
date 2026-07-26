import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

import type { ContractTemplate } from "./template-service";

const requireModule = createRequire(import.meta.url);
const {
  InMemoryRepository,
}: typeof import("../../persistence/in-memory-repository") = requireModule(
  "../../persistence/in-memory-repository.ts",
);
const { TemplateService }: typeof import("./template-service") = requireModule(
  "./template-service.ts",
);

describe("DocAI TemplateService", () => {
  it("creates and updates a typed contract template", async () => {
    const storage = new InMemoryRepository<ContractTemplate, string>(
      (template) => template.id,
    );
    const service = new TemplateService(storage);
    const created = await service.create({
      id: "services-template",
      type: "services",
      title: "Services contract",
      instructions: "Use the approved services fields.",
    });

    assert.equal(created.content.type, "services");
    const updated = await service.update(created.id, {
      instructions: "Use the revised services fields.",
    });
    assert.equal(
      updated.content.instructions,
      "Use the revised services fields.",
    );
  });

  it("rejects an empty update", async () => {
    const storage = new InMemoryRepository<ContractTemplate, string>(
      (template) => template.id,
    );
    const service = new TemplateService(storage);

    await assert.rejects(
      service.update("missing", {}),
      /must include a title or instructions/,
    );
  });
});
