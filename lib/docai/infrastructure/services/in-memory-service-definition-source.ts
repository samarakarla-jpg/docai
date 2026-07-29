import type {
  ServiceDefinitionQuery,
  ServiceDefinitionSource,
} from "../../domain/service-catalog";
import type { ServiceDefinition } from "../../domain/service-definition";

export function createInMemoryServiceDefinitionSource(
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
