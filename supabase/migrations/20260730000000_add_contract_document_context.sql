alter table public.contracts
  add column document_kind text,
  add column contract_definition_id text,
  add column service_id text,
  add column service_name text,
  add column profession_id text,
  add column profession_name text,
  add column client_name text,
  add column provider_name text;

alter table public.contracts
  add constraint contracts_document_kind_check
  check (
    document_kind is null
    or document_kind in (
      'budget',
      'proposal',
      'contract',
      'scope_change',
      'delivery_acceptance',
      'warranty'
    )
  );
