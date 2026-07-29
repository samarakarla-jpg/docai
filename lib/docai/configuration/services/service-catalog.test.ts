import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

const requireModule = createRequire(import.meta.url);
const registerHooks = Reflect.get(requireModule("node:module"), "registerHooks");

if (typeof registerHooks === "function") {
  registerHooks({
    resolve(
      specifier: string,
      context: unknown,
      nextResolve: (specifier: string, context: unknown) => unknown,
    ) {
      if (
        specifier === "../../domain/service-catalog" ||
        specifier === "../../domain/service-form-schema" ||
        specifier === "../../infrastructure/services/in-memory-service-definition-source" ||
        specifier === "./electrician/electrician-service-definitions" ||
        specifier === "../../../domain/service-definition" ||
        specifier === "../../../domain/service-form-schema" ||
        specifier === "./electrician-service-form-fields" ||
        specifier === "../generic-service-form-fields"
      ) {
        return nextResolve(`${specifier}.ts`, context);
      }

      return nextResolve(specifier, context);
    },
  });
}

const {
  SERVICE_CATALOG,
}: typeof import("./service-catalog") = requireModule("./service-catalog.ts");

describe("configured service catalog", () => {
  it("queries the official electrician source through the generic catalog", async () => {
    assert.equal(
      (await SERVICE_CATALOG.list({ professionId: "electrician" })).length,
      45,
    );
    assert.equal((await SERVICE_CATALOG.list({ active: false })).length, 0);
    assert.equal(
      (await SERVICE_CATALOG.list({ origin: "official" })).length,
      45,
    );
    assert.equal(
      (await SERVICE_CATALOG.list({ supportedDocument: "warranty" })).length,
      45,
    );
    assert.equal(
      (
        await SERVICE_CATALOG.list({
          categoryId: "basic-installations",
          kind: "standard",
        })
      ).length,
      5,
    );
    assert.equal(
      (await SERVICE_CATALOG.getById("electrician-rcd-installation"))?.name,
      "Instalação de DR",
    );
    assert.equal(await SERVICE_CATALOG.getById("unknown-service"), undefined);
  });
});
