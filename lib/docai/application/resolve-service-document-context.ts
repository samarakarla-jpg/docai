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
  generationServiceContexts: readonly ContractGenerationServiceContext[];
  serviceDefinition: ServiceDefinition;
  serviceDefinitions: readonly ServiceDefinition[];
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
    return this.resolveMany({
      document: input.document,
      professionId: input.professionId,
      serviceIds: [input.serviceId],
    });
  }

  async resolveMany(input: Readonly<{
    document: SupportedServiceDocument;
    professionId: string;
    serviceIds: readonly string[];
  }>): Promise<ResolvedServiceDocumentContext> {
    const contractDefinition = this.resolveContractDefinition(input.document);
    const uniqueServiceIds = [...new Set(input.serviceIds)];

    if (
      uniqueServiceIds.length === 0 ||
      uniqueServiceIds.length !== input.serviceIds.length
    ) {
      throw new InvalidServiceDocumentContextError(
        "At least one unique service must be selected for this document.",
      );
    }

    const serviceDefinitions = await Promise.all(
      uniqueServiceIds.map((serviceId) =>
        this.dependencies.serviceSource.getById(serviceId),
      ),
    );

    if (
      serviceDefinitions.some(
        (serviceDefinition) =>
          !serviceDefinition ||
          !serviceDefinition.active ||
          serviceDefinition.profession.id !== input.professionId ||
          !serviceDefinition.supportedDocuments.includes(input.document),
      )
    ) {
      throw new InvalidServiceDocumentContextError(
        "The selected profession and service are not valid for this document.",
      );
    }

    const validServiceDefinitions = serviceDefinitions.filter(
      (serviceDefinition): serviceDefinition is ServiceDefinition =>
        serviceDefinition !== undefined,
    );
    const serviceDefinition = validServiceDefinitions[0];

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

    if (
      validServiceDefinitions.some(
        (candidate) => candidate.origin === "official",
      )
    ) {
      layers.push(professionConfiguration.professionLayer);

      for (const candidate of validServiceDefinitions) {
        if (
          candidate.origin === "official" &&
          candidate.formConfiguration?.mode === "configured"
        ) {
          layers.push(createServiceFormLayer(candidate));
        }
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

    const generationServiceContexts = validServiceDefinitions.map(
      (candidate): ContractGenerationServiceContext => ({
        description: candidate.description,
        profession: candidate.profession,
        serviceId: candidate.id,
        serviceName: candidate.name,
      }),
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
      generationServiceContext: generationServiceContexts[0],
      generationServiceContexts,
      serviceDefinition,
      serviceDefinitions: validServiceDefinitions,
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
