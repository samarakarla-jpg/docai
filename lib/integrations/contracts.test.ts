import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

import type { AiAdapter } from "./ai";
import type { PaymentsAdapter } from "./payments";
import type { PdfAdapter } from "./pdf";
import type { MailAdapter } from "./mail";
import type { ExternalStorageAdapter } from "./storage";

const requireModule = createRequire(import.meta.url);
const { createDisabledAiAdapter }: typeof import("./ai") = requireModule(
  "./ai.ts",
);
const {
  createDisabledPaymentsAdapter,
}: typeof import("./payments") = requireModule("./payments.ts");
const { createDisabledPdfAdapter }: typeof import("./pdf") = requireModule(
  "./pdf.ts",
);
const { createDisabledMailAdapter }: typeof import("./mail") = requireModule(
  "./mail.ts",
);
const {
  createDisabledExternalStorageAdapter,
}: typeof import("./storage") = requireModule("./storage.ts");

async function assertDisabled(
  operation: Promise<unknown>,
): Promise<void> {
  await assert.rejects(operation, (error: unknown) => {
    assert.ok(error instanceof Error);
    assert.equal((error as Error & { code?: unknown }).code, "DISABLED");
    assert.equal(error.name, "OptionalCapabilityError");
    return true;
  });
}

describe("optional capability contracts", () => {
  it("provide independent disabled adapters", async () => {
    const capabilities: readonly [
      AiAdapter,
      PaymentsAdapter,
      PdfAdapter,
      MailAdapter,
      ExternalStorageAdapter,
    ] = [
      createDisabledAiAdapter(),
      createDisabledPaymentsAdapter(),
      createDisabledPdfAdapter(),
      createDisabledMailAdapter(),
      createDisabledExternalStorageAdapter(),
    ];

    for (const capability of capabilities) {
      assert.equal(capability.status, "disabled");
    }

    await assertDisabled(capabilities[0].generate({ input: "data" }));
    await assertDisabled(capabilities[1].createPayment({ input: "data" }));
    await assertDisabled(capabilities[2].generate({ input: "data" }));
    await assertDisabled(
      capabilities[3].send({
        recipients: ["person@example.test"],
        subject: "Subject",
        body: "Body",
      }),
    );
    await assertDisabled(
      capabilities[4].put({ key: "object", content: new Uint8Array([1]) }),
    );
    await assertDisabled(capabilities[4].get("object"));
    await assertDisabled(capabilities[4].remove("object"));
  });

  it("keeps contracts independent of concrete capability details", () => {
    const ai = createDisabledAiAdapter();
    const payments = createDisabledPaymentsAdapter();
    const pdf = createDisabledPdfAdapter();
    const mail = createDisabledMailAdapter();
    const storage = createDisabledExternalStorageAdapter();

    assert.notEqual(ai, payments);
    assert.notEqual(pdf, mail);
    assert.notEqual(storage, ai);
    assert.deepEqual(Object.keys(ai), ["status", "generate"]);
    assert.deepEqual(Object.keys(payments), ["status", "createPayment"]);
    assert.deepEqual(Object.keys(pdf), ["status", "generate"]);
    assert.deepEqual(Object.keys(mail), ["status", "send"]);
    assert.deepEqual(Object.keys(storage), ["status", "put", "get", "remove"]);
  });
});
