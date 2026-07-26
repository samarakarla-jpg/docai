import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

import type {
  ContractContent,
  ContractType,
} from "../domain/contract-models";
import type {
  ContractDraft,
  UpdateContractDraftInput,
} from "../services/contract-service";

const requireModule = createRequire(import.meta.url);
const {
  ManageContractDrafts,
}: typeof import("./manage-contract-drafts") = requireModule(
  "./manage-contract-drafts.ts",
);

function contentFor(type: ContractType): ContractContent {
  const parties = [{ name: "First party" }, { name: "Second party" }];

  switch (type) {
    case "services":
      return { type, parties, scope: "Consulting", compensation: "Fixed", term: "One year" };
    case "sale":
      return { type, parties, subject: "Equipment", price: "100", delivery: "Immediate" };
    case "rental":
      return { type, parties, property: "Office", rent: "1000", term: "One year" };
    case "loan":
      return { type, parties, subject: "Funds", repayment: "Monthly", term: "One year" };
  }
}

function draftFor(type: ContractType): ContractDraft {
  return {
    id: `${type}-draft`,
    title: `${type} draft`,
    content: contentFor(type),
    contractType: type,
  };
}

function createStub() {
  const calls: Array<{ method: string; args: readonly unknown[] }> = [];
  return {
    calls,
    service: {
      getDraft: async (id: string) => {
        calls.push({ method: "getDraft", args: [id] });
        return draftFor("sale");
      },
      listDrafts: async () => {
        calls.push({ method: "listDrafts", args: [] });
        return [draftFor("services"), draftFor("sale"), draftFor("rental"), draftFor("loan")];
      },
      updateDraft: async (id: string, input: UpdateContractDraftInput) => {
        calls.push({ method: "updateDraft", args: [id, input] });
        return { ...draftFor("sale"), ...input };
      },
      removeDraft: async (id: string) => {
        calls.push({ method: "removeDraft", args: [id] });
      },
    },
  };
}

describe("ManageContractDrafts", () => {
  it("gets, lists, updates, and removes drafts through ContractService", async () => {
    const stub = createStub();
    const service = new ManageContractDrafts(stub.service);

    const found = await service.get("sale-draft");
    const listed = await service.list();
    const updated = await service.update({
      id: "sale-draft",
      input: { title: "Updated sale", content: contentFor("sale") },
    });
    const removed = await service.remove("sale-draft");

    assert.equal(found.success, true);
    assert.equal(listed.success, true);
    if (listed.success) {
      assert.deepEqual(listed.data.map((draft) => draft.contractType), [
        "services",
        "sale",
        "rental",
        "loan",
      ]);
    }
    assert.equal(updated.success, true);
    assert.deepEqual(removed, { success: true, data: { id: "sale-draft" } });
    assert.deepEqual(stub.calls.map((call) => call.method), [
      "getDraft",
      "listDrafts",
      "updateDraft",
      "removeDraft",
    ]);
  });

  it("rejects invalid commands before calling ContractService", async () => {
    const stub = createStub();
    const service = new ManageContractDrafts(stub.service);

    const invalidGet = await service.get(" ");
    const invalidUpdate = await service.update({
      id: "sale-draft",
      input: {},
    });
    const invalidContent = await service.update({
      id: "sale-draft",
      input: { content: { type: "sale", parties: [] } },
    });
    const invalidRemove = await service.remove("");

    for (const result of [invalidGet, invalidUpdate, invalidContent, invalidRemove]) {
      assert.equal(result.success, false);
      if (!result.success) assert.equal(result.error.code, "INVALID_INPUT");
    }
    assert.deepEqual(stub.calls, []);
  });

  it("distinguishes not found and storage failures with safe messages", async () => {
    const service = new ManageContractDrafts({
      getDraft: async () => { throw { code: "NOT_FOUND", detail: "private" }; },
      listDrafts: async () => { throw { code: "STORAGE_FAILURE", detail: "private" }; },
      updateDraft: async () => draftFor("sale"),
      removeDraft: async () => undefined,
    });

    const notFound = await service.get("missing");
    const storageFailure = await service.list();

    assert.deepEqual(notFound, {
      success: false,
      error: { code: "NOT_FOUND", message: "Contract draft not found." },
    });
    assert.deepEqual(storageFailure, {
      success: false,
      error: { code: "STORAGE_FAILURE", message: "Contract draft storage failed." },
    });
  });

  it("maps unexpected failures without exposing internal details", async () => {
    const service = new ManageContractDrafts({
      getDraft: async () => { throw new Error("private storage detail"); },
      listDrafts: async () => [],
      updateDraft: async () => draftFor("sale"),
      removeDraft: async () => undefined,
    });

    const result = await service.get("sale-draft");

    assert.deepEqual(result, {
      success: false,
      error: {
        code: "INTERNAL_FAILURE",
        message: "Unable to manage the contract draft.",
      },
    });
  });
});
