import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

const requireModule = createRequire(import.meta.url);
const {
  GeminiAdapter,
  GeminiAdapterError,
}: typeof import("./gemini-adapter") = requireModule("./gemini-adapter.ts");

const request = {
  input: {
    content: {
      parties: [{ identifier: "00000000000", name: "Pessoa A" }],
      scope: "Serviço de exemplo",
      type: "services",
    },
    type: "services",
  },
};

describe("GeminiAdapter", () => {
  it("returns the generated text using the configured model", async () => {
    let receivedRequest: RequestInfo | URL | undefined;
    let receivedInit: RequestInit | undefined;
    const adapter = new GeminiAdapter({
      apiKey: "test-key",
      fetchImplementation: (async (input, init) => {
        receivedRequest = input;
        receivedInit = init;
        return Response.json({
          candidates: [
            {
              content: {
                parts: [{ text: "Contrato gerado" }],
              },
            },
          ],
        });
      }) as typeof fetch,
      model: "gemini-test",
    });

    const result = await adapter.generate(request);

    assert.equal(result.output, "Contrato gerado");
    assert.match(String(receivedRequest), /gemini-test:generateContent$/);
    assert.equal(
      (receivedInit?.headers as Record<string, string>)["x-goog-api-key"],
      "test-key",
    );
    assert.doesNotMatch(String(receivedInit?.body), /test-key/);
    assert.match(String(receivedInit?.body), /Serviço de exemplo/);
  });

  it("does not call the provider without an API key", async () => {
    let calls = 0;
    const adapter = new GeminiAdapter({
      fetchImplementation: (async () => {
        calls += 1;
        return Response.json({});
      }) as typeof fetch,
    });

    await assert.rejects(adapter.generate(request), (error: unknown) => {
      assert.ok(error instanceof GeminiAdapterError);
      assert.equal(error.code, "DISABLED");
      return true;
    });
    assert.equal(calls, 0);
  });

  it("rejects a response without contract text", async () => {
    const adapter = new GeminiAdapter({
      apiKey: "test-key",
      fetchImplementation: (async () =>
        Response.json({ candidates: [] })) as typeof fetch,
    });

    await assert.rejects(adapter.generate(request), (error: unknown) => {
      assert.ok(error instanceof GeminiAdapterError);
      assert.equal(error.code, "INVALID_RESPONSE");
      return true;
    });
  });

  it("retries a transient provider failure once", async () => {
    let calls = 0;
    const adapter = new GeminiAdapter({
      apiKey: "test-key",
      fetchImplementation: (async () => {
        calls += 1;

        return calls === 1
          ? new Response(null, { status: 429 })
          : Response.json({
              candidates: [
                {
                  content: {
                    parts: [{ text: "Contrato após nova tentativa" }],
                  },
                },
              ],
            });
      }) as typeof fetch,
      maxAttempts: 2,
    });

    const result = await adapter.generate(request);

    assert.equal(result.output, "Contrato após nova tentativa");
    assert.equal(calls, 2);
  });
});
