import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

import type { ContractContent } from "../domain/contract-models";
import type { ContractDocumentService } from "./contract-service";

const requireModule = createRequire(import.meta.url);
const { ContractService }: typeof import("./contract-service") = requireModule(
  "./contract-service.ts",
);

const content: ContractContent = {
  type: "services",
  parties: [{ name: "Provider" }, { name: "Client" }],
  scope: "Consulting",
  compensation: "Fixed",
  term: "One year",
};

function createDocuments(): ContractDocumentService {
  const documents = new Map<string, { id: string; title: string; content: ContractContent }>();
  return {
    create: async (input) => {
      const document = { ...input };
      documents.set(input.id, document);
      return document;
    },
    getById: async (id) => {
      const document = documents.get(id);
      if (document === undefined) throw new Error("missing");
      return document;
    },
    list: async () => [...documents.values()],
    update: async (id, input) => {
      const current = documents.get(id);
      if (current === undefined) throw new Error("missing");
      const document = { ...current, ...input };
      documents.set(id, document);
      return document;
    },
    remove: async (id) => {
      documents.delete(id);
    },
  };
}

describe("ContractService", () => {
  it("uses DocumentService for contract draft lifecycle", async () => {
    const service = new ContractService(createDocuments());
    const created = await service.createDraft({
      id: "draft-1",
      title: "Services draft",
      content,
    });

    assert.equal(created.contractType, "services");
    assert.deepEqual((await service.listDrafts()).map((draft) => draft.id), [
      "draft-1",
    ]);
    await service.updateDraft("draft-1", { title: "Updated draft" });
    assert.equal((await service.getDraft("draft-1")).title, "Updated draft");
    await service.removeDraft("draft-1");
  });

  it("validates the selected contract model before persistence", async () => {
    const service = new ContractService(createDocuments());
    await assert.rejects(
      service.createDraft({
        id: "draft-2",
        title: "Invalid",
        content: { ...content, parties: [] },
      }),
      /at least one party/,
    );
  });
});
