import { ELECTRICIAN_SERVICE_DEFINITIONS } from "./electrician-service-catalog";
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

export function createLocalServiceDefinitionSource(
  id: string,
  definitions: readonly ServiceDefinition[],
): ServiceDefinitionSource {
  const snapshot = [...definitions];

  return {
    id,
    getById: async (definitionId) =>
      snapshot.find((definition) => definition.id === definitionId),
    list: async (query) =>
      snapshot.filter((definition) => matchesQuery(definition, query)),
  };
}

const electricianServiceSource = createLocalServiceDefinitionSource(
  "official-electrician-services",
  ELECTRICIAN_SERVICE_DEFINITIONS,
);

export const SERVICE_CATALOG = new ServiceCatalog([
  electricianServiceSource,
]);

function matchesQuery(
  definition: ServiceDefinition,
  query?: ServiceDefinitionQuery,
): boolean {
  if (!query) return true;

  return (
    (query.active === undefined || definition.active === query.active) &&
    (query.categoryId === undefined ||
      definition.category?.id === query.categoryId) &&
    (query.kind === undefined || definition.kind === query.kind) &&
    (query.origin === undefined || definition.origin === query.origin) &&
    (query.professionId === undefined ||
      definition.profession.id === query.professionId) &&
    (query.supportedDocument === undefined ||
      definition.supportedDocuments.includes(query.supportedDocument))
  );
}
