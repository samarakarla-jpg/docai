import type { ContractDefinition } from "../domain/contract-definition";
import type { ContractGenerationServiceContext } from "../domain/contract-models";
import type {
  ServiceDefinition,
  ServiceProfessionReference,
  SupportedServiceDocument,
} from "../domain/service-definition";
import type {
  ServiceDefinitionQuery,
  ServiceDefinitionSource,
} from "../domain/service-catalog";
import {
  composeServiceFormSchema,
  type ServiceFormFieldRegistry,
  type ServiceFormSchemaLayer,
} from "../domain/service-form-schema";

export type ServiceDocumentDefinitionReference = Readonly<{
  categorySlug: string;
  definitionId: string;
  document: SupportedServiceDocument;
}>;

export type ServiceProfessionFormConfiguration = Readonly<{
  fieldRegistry: ServiceFormFieldRegistry;
  professionId: string;
  professionLayer: ServiceFormSchemaLayer;
}>;

export type ServiceDocumentSelectionContext = Readonly<{
  contractDefinition: ContractDefinition;
  document: SupportedServiceDocument;
  professions: readonly ServiceProfessionReference[];
  services: readonly ServiceDefinition[];
}>;

export type ResolvedServiceDocumentContext = Readonly<{
  contractDefinition: ContractDefinition;
  document: SupportedServiceDocument;
  generationServiceContext: ContractGenerationServiceContext;
  serviceDefinition: ServiceDefinition;
}>;

type ResolveServiceDocumentContextDependencies = Readonly<{
  documentDefinitions: readonly ServiceDocumentDefinitionReference[];
  genericFormLayer: ServiceFormSchemaLayer;
  getContractDefinition: (
    categorySlug: string,
    definitionId: string,
  ) => ContractDefinition | undefined;
  professionFormConfigurations: readonly ServiceProfessionFormConfiguration[];
  serviceSource: Readonly<{
    getById: ServiceDefinitionSource["getById"];
    list: (
      query?: ServiceDefinitionQuery,
    ) => Promise<readonly ServiceDefinition[]>;
  }>;
}>;

export class InvalidServiceDocumentContextError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidServiceDocumentContextError";
  }
}

export class ResolveServiceDocumentContext {
  private readonly dependencies: ResolveServiceDocumentContextDependencies;

  constructor(dependencies: ResolveServiceDocumentContextDependencies) {
    this.dependencies = dependencies;
  }

  async listSelection(
    document: SupportedServiceDocument,
  ): Promise<ServiceDocumentSelectionContext> {
    const contractDefinition = this.resolveContractDefinition(document);
    const services = await this.dependencies.serviceSource.list({
      active: true,
      supportedDocument: document,
    });
    const professionsById = new Map<string, ServiceProfessionReference>();

    for (const service of services) {
      professionsById.set(service.profession.id, service.profession);
    }

    return {
      contractDefinition,
      document,
      professions: [...professionsById.values()],
      services,
    };
  }

  async resolve(input: Readonly<{
    document: SupportedServiceDocument;
    professionId: string;
    serviceId: string;
  }>): Promise<ResolvedServiceDocumentContext> {
    const contractDefinition = this.resolveContractDefinition(input.document);
    const serviceDefinition = await this.dependencies.serviceSource.getById(
      input.serviceId,
    );

    if (
      !serviceDefinition ||
      !serviceDefinition.active ||
      serviceDefinition.profession.id !== input.professionId ||
      !serviceDefinition.supportedDocuments.includes(input.document)
    ) {
      throw new InvalidServiceDocumentContextError(
        "The selected profession and service are not valid for this document.",
      );
    }

    const professionConfiguration =
      this.dependencies.professionFormConfigurations.find(
        (configuration) =>
          configuration.professionId === serviceDefinition.profession.id,
      );

    if (!professionConfiguration) {
      throw new InvalidServiceDocumentContextError(
        `Profession ${serviceDefinition.profession.id} has no form configuration.`,
      );
    }

    const layers = [this.dependencies.genericFormLayer];

    if (serviceDefinition.origin === "official") {
      layers.push(professionConfiguration.professionLayer);

      if (serviceDefinition.formConfiguration?.mode === "configured") {
        layers.push(createServiceFormLayer(serviceDefinition));
      }
    }

    const formSchema = composeServiceFormSchema({
      baseFormSchema: contractDefinition.formSchema,
      fieldRegistry: professionConfiguration.fieldRegistry,
      layers,
    });
    const answerFieldIds = formSchema.sections.flatMap((section) =>
      section.fields.map((field) => field.id),
    );

    return {
      contractDefinition: {
        ...contractDefinition,
        formSchema,
        generationSchema: {
          ...contractDefinition.generationSchema,
          answerFieldIds,
        },
      },
      document: input.document,
      generationServiceContext: {
        description: serviceDefinition.description,
        profession: serviceDefinition.profession,
        serviceId: serviceDefinition.id,
        serviceName: serviceDefinition.name,
      },
      serviceDefinition,
    };
  }

  private resolveContractDefinition(
    document: SupportedServiceDocument,
  ): ContractDefinition {
    const reference = this.dependencies.documentDefinitions.find(
      (candidate) => candidate.document === document,
    );
    const definition = reference
      ? this.dependencies.getContractDefinition(
          reference.categorySlug,
          reference.definitionId,
        )
      : undefined;

    if (!reference || !definition) {
      throw new InvalidServiceDocumentContextError(
        `Document ${document} has no configured contract definition.`,
      );
    }

    return definition;
  }
}

function createServiceFormLayer(
  serviceDefinition: ServiceDefinition,
): ServiceFormSchemaLayer {
  if (serviceDefinition.formConfiguration?.mode !== "configured") {
    throw new InvalidServiceDocumentContextError(
      `Service ${serviceDefinition.id} has no configured form fields.`,
    );
  }

  return {
    fields: serviceDefinition.formConfiguration.fields,
    id: `${serviceDefinition.id}-form`,
    scope: "service",
    section: {
      description: serviceDefinition.description,
      id: `${serviceDefinition.id}-details`,
      title: serviceDefinition.name,
    },
  };
}
