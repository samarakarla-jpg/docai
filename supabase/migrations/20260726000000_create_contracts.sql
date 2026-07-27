create table public.contracts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  tipo text not null check (tipo in ('services', 'sale', 'rental', 'loan')),
  titulo text not null check (char_length(trim(titulo)) > 0),
  conteudo text not null check (char_length(trim(conteudo)) > 0),
  created_at timestamptz not null default now()
);

create index contracts_user_created_at_idx
  on public.contracts (user_id, created_at desc);

alter table public.contracts enable row level security;

revoke all on table public.contracts from anon;
revoke all on table public.contracts from authenticated;
grant select, insert on table public.contracts to authenticated;

create policy "Users can insert their own contracts"
  on public.contracts
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can read their own contracts"
  on public.contracts
  for select
  to authenticated
  using ((select auth.uid()) = user_id);
