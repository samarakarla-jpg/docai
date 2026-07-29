import type {
  ServiceDefinition,
  ServiceKind,
  ServiceOrigin,
  SupportedServiceDocument,
} from "./service-definition";

export type ServiceDefinitionQuery = Readonly<{
  active?: boolean;
  categoryId?: string;
  kind?: ServiceKind;
  origin?: ServiceOrigin;
  professionId?: string;
  supportedDocument?: SupportedServiceDocument;
}>;

export interface ServiceDefinitionSource {
  readonly id: string;

  getById(id: string): Promise<ServiceDefinition | undefined>;

  list(
    query?: ServiceDefinitionQuery,
  ): Promise<readonly ServiceDefinition[]>;
}

export class DuplicateServiceDefinitionIdError extends Error {
  constructor(id: string) {
    super(`Multiple service definition sources returned the id ${id}.`);
    this.name = "DuplicateServiceDefinitionIdError";
  }
}

export class ServiceCatalog {
  private readonly sources: readonly ServiceDefinitionSource[];

  constructor(sources: readonly ServiceDefinitionSource[]) {
    this.sources = [...sources];
  }

  async getById(id: string): Promise<ServiceDefinition | undefined> {
    const normalizedId = id.trim();
    if (!normalizedId) return undefined;

    const matches = (
      await Promise.all(
        this.sources.map((source) => source.getById(normalizedId)),
      )
    ).filter(
      (definition): definition is ServiceDefinition =>
        definition !== undefined,
    );

    if (matches.length > 1) {
      throw new DuplicateServiceDefinitionIdError(normalizedId);
    }

    return matches[0];
  }

  async list(
    query?: ServiceDefinitionQuery,
  ): Promise<readonly ServiceDefinition[]> {
    const definitions = (
      await Promise.all(this.sources.map((source) => source.list(query)))
    ).flat();
    const seenIds = new Set<string>();

    for (const definition of definitions) {
      if (seenIds.has(definition.id)) {
        throw new DuplicateServiceDefinitionIdError(definition.id);
      }

      seenIds.add(definition.id);
    }

    return definitions;
  }
}
