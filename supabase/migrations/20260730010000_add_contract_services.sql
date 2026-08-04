alter table public.contracts
  add column service_ids text[],
  add column service_names text[];

alter table public.contracts
  add constraint contracts_services_list_check
  check (
    (service_ids is null and service_names is null)
    or (
      service_ids is not null
      and service_names is not null
      and cardinality(service_ids) > 0
      and cardinality(service_ids) = cardinality(service_names)
    )
  );
