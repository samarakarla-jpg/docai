import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

import type { ContractDefinition } from "../domain/contract-definition";
import type { ServiceDefinition } from "../domain/service-definition";

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
        specifier === "../domain/service-form-schema" ||
        specifier === "../domain/contract-definition" ||
        specifier === "../domain/service-definition" ||
        specifier === "../domain/service-catalog"
      ) {
        return nextResolve(`${specifier}.ts`, context);
      }

      return nextResolve(specifier, context);
    },
  });
}

const {
  InvalidServiceDocumentContextError,
  ResolveServiceDocumentContext,
}: typeof import("./resolve-service-document-context") = requireModule(
  "./resolve-service-document-context.ts",
);
const {
  ServiceFormFieldRegistry,
  recommendedFormField,
  requiredFormField,
}: typeof import("../domain/service-form-schema") = requireModule(
  "../domain/service-form-schema.ts",
);

const definition: ContractDefinition = {
  categorySlug: "general",
  contractType: "services",
  description: "Commercial proposal",
  formSchema: {
    sections: [
      {
        fields: [
          {
            id: "contractObject",
            label: "What is being offered?",
            layout: "full",
            required: true,
            type: "text",
          },
        ],
        id: "proposal",
        title: "Proposal",
      },
    ],
  },
  generationSchema: {
    answerFieldIds: ["contractObject"],
    contentBindings: [
      { sourceFieldId: "contractObject", target: "scope" },
      { sourceFieldId: "contractObject", target: "compensation" },
      { sourceFieldId: "contractObject", target: "term" },
    ],
    contractType: "services",
    documentTitle: "Proposal",
    partyBindings: [],
    reviewStatus: "initial-validation",
    sections: [],
  },
  id: "proposal",
  name: "Proposal",
  objective: "Create a proposal",
  structure: [],
  version: 1,
};

const configuredService: ServiceDefinition = {
  active: true,
  category: { id: "installation", name: "Installation" },
  description: "Installs an electric shower.",
  formConfiguration: {
    fields: [requiredFormField("electrician-voltage")],
    mode: "configured",
  },
  id: "electric-shower",
  kind: "standard",
  name: "Electric shower installation",
  origin: "official",
  profession: { id: "electrician", name: "Electrician" },
  supportedDocuments: ["proposal"],
};

const unrelatedService: ServiceDefinition = {
  ...configuredService,
  id: "inactive-service",
  active: false,
};

const services = [configuredService, unrelatedService];
const resolver = new ResolveServiceDocumentContext({
  documentDefinitions: [
    {
      categorySlug: "general",
      definitionId: "proposal",
      document: "proposal",
    },
  ],
  genericFormLayer: {
    fields: [recommendedFormField("service-location")],
    id: "generic-service",
    scope: "generic",
    section: { id: "generic-service-details", title: "Service" },
  },
  getContractDefinition: (categorySlug, definitionId) =>
    categorySlug === definition.categorySlug && definitionId === definition.id
      ? definition
      : undefined,
  professionFormConfigurations: [
    {
      fieldRegistry: new ServiceFormFieldRegistry([
        {
          id: "service-location",
          label: "Where?",
          layout: "full",
          required: false,
          type: "text",
        },
        {
          id: "electrician-voltage",
          label: "Voltage?",
          layout: "half",
          options: [{ label: "220 V", value: "220v" }],
          required: false,
          type: "select",
        },
      ]),
      professionId: "electrician",
      professionLayer: {
        fields: [recommendedFormField("electrician-voltage")],
        id: "electrician-profession",
        scope: "profession",
        section: { id: "electrician-details", title: "Electrical details" },
      },
    },
  ],
  serviceSource: {
    getById: async (id) => services.find((service) => service.id === id),
    list: async (query) =>
      services.filter(
        (service) =>
          (query?.active === undefined || service.active === query.active) &&
          (query?.supportedDocument === undefined ||
            service.supportedDocuments.includes(query.supportedDocument)),
      ),
  },
});

describe("ResolveServiceDocumentContext", () => {
  it("lists only active services compatible with the document", async () => {
    const context = await resolver.listSelection("proposal");

    assert.equal(context.contractDefinition.id, "proposal");
    assert.deepEqual(context.professions, [
      { id: "electrician", name: "Electrician" },
    ]);
    assert.deepEqual(
      context.services.map((service) => service.id),
      ["electric-shower"],
    );
  });

  it("resolves and composes base, generic, profession and service fields", async () => {
    const context = await resolver.resolve({
      document: "proposal",
      professionId: "electrician",
      serviceId: "electric-shower",
    });
    const fields = context.contractDefinition.formSchema.sections.flatMap(
      (section) => section.fields,
    );

    assert.deepEqual(
      fields.map((field) => field.id),
      ["contractObject", "service-location", "electrician-voltage"],
    );
    assert.equal(
      fields.find((field) => field.id === "electrician-voltage")?.required,
      true,
    );
    assert.deepEqual(
      context.contractDefinition.generationSchema.answerFieldIds,
      fields.map((field) => field.id),
    );
    assert.equal(context.serviceDefinition, configuredService);
    assert.deepEqual(context.generationServiceContext, {
      description: "Installs an electric shower.",
      profession: { id: "electrician", name: "Electrician" },
      serviceId: "electric-shower",
      serviceName: "Electric shower installation",
    });
    assert.deepEqual(definition.generationSchema.answerFieldIds, [
      "contractObject",
    ]);
  });

  it("rejects inactive, mismatched or unsupported selections", async () => {
    await assert.rejects(
      resolver.resolve({
        document: "proposal",
        professionId: "electrician",
        serviceId: "inactive-service",
      }),
      InvalidServiceDocumentContextError,
    );
    await assert.rejects(
      resolver.resolve({
        document: "proposal",
        professionId: "plumber",
        serviceId: "electric-shower",
      }),
      InvalidServiceDocumentContextError,
    );
  });
});
