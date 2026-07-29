import { ServiceCatalog } from "../../domain/service-catalog";
import { createInMemoryServiceDefinitionSource } from "../../infrastructure/services/in-memory-service-definition-source";
import { ELECTRICIAN_SERVICE_DEFINITIONS } from "./electrician/electrician-service-definitions";

const officialElectricianServiceSource =
  createInMemoryServiceDefinitionSource(
    "official-electrician-services",
    ELECTRICIAN_SERVICE_DEFINITIONS,
  );

export const SERVICE_CATALOG = new ServiceCatalog([
  officialElectricianServiceSource,
]);
