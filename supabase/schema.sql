-- HuurAdmin NL — Supabase Schema
-- Betaalbare Huurwet 2024 compliant

-- Enable RLS
alter table if exists landlords enable row level security;
alter table if exists properties enable row level security;
alter table if exists tenants enable row level security;
alter table if exists rent_payments enable row level security;
alter table if exists maintenance_requests enable row level security;
alter table if exists subscriptions enable row level security;

create table if not exists landlords (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  naam text not null,
  email text,
  telefoon text,
  iban text,
  created_at timestamptz default now()
);

create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  landlord_id uuid references landlords(id) on delete cascade,
  adres text not null,
  postcode text,
  stad text,
  type text check (type in ('appartement', 'woning', 'studio', 'kamer')),
  oppervlakte decimal(6,1),
  kamers int,
  woz_waarde decimal(12,2),
  punten int,
  max_huurprijs decimal(8,2),
  energielabel text,
  created_at timestamptz default now()
);

create table if not exists tenants (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id) on delete cascade,
  naam text not null,
  email text,
  telefoon text,
  iban text,
  huurprijs decimal(8,2),
  huurprijs_incl_service decimal(8,2),
  ingangsdatum date,
  einddatum date,
  contract_url text,
  actief boolean default true,
  created_at timestamptz default now()
);

create table if not exists rent_payments (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id) on delete cascade,
  property_id uuid references properties(id) on delete cascade,
  periode text not null,
  verwacht_bedrag decimal(8,2),
  ontvangen_bedrag decimal(8,2),
  betaald_op date,
  status text default 'verwacht' check (status in ('verwacht', 'betaald', 'te_laat', 'niet_betaald')),
  herinnering_verstuurd boolean default false,
  created_at timestamptz default now()
);

create table if not exists maintenance_requests (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id) on delete cascade,
  tenant_id uuid references tenants(id) on delete set null,
  titel text not null,
  omschrijving text,
  prioriteit text default 'normaal' check (prioriteit in ('laag', 'normaal', 'hoog', 'urgent')),
  status text default 'open' check (status in ('open', 'in_behandeling', 'opgelost')),
  foto_urls text[] default '{}',
  opgelost_op timestamptz,
  created_at timestamptz default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  landlord_id uuid references landlords(id) on delete cascade,
  plan text default 'gratis' check (plan in ('gratis', 'basis', 'pro', 'verhuurder')),
  stripe_subscription_id text,
  max_properties int default 1,
  geldig_tot timestamptz,
  created_at timestamptz default now()
);

-- RLS Policies
-- Landlords: user can only see their own record
create policy "landlord_select" on landlords for select using (auth.uid() = user_id);
create policy "landlord_insert" on landlords for insert with check (auth.uid() = user_id);
create policy "landlord_update" on landlords for update using (auth.uid() = user_id);

-- Properties: only accessible through their landlord
create policy "properties_select" on properties for select using (
  landlord_id in (select id from landlords where user_id = auth.uid())
);
create policy "properties_insert" on properties for insert with check (
  landlord_id in (select id from landlords where user_id = auth.uid())
);
create policy "properties_update" on properties for update using (
  landlord_id in (select id from landlords where user_id = auth.uid())
);
create policy "properties_delete" on properties for delete using (
  landlord_id in (select id from landlords where user_id = auth.uid())
);

-- Tenants: only accessible through their property
create policy "tenants_select" on tenants for select using (
  property_id in (
    select id from properties where landlord_id in (
      select id from landlords where user_id = auth.uid()
    )
  )
);
create policy "tenants_insert" on tenants for insert with check (
  property_id in (
    select id from properties where landlord_id in (
      select id from landlords where user_id = auth.uid()
    )
  )
);
create policy "tenants_update" on tenants for update using (
  property_id in (
    select id from properties where landlord_id in (
      select id from landlords where user_id = auth.uid()
    )
  )
);

-- Rent payments
create policy "payments_select" on rent_payments for select using (
  property_id in (
    select id from properties where landlord_id in (
      select id from landlords where user_id = auth.uid()
    )
  )
);
create policy "payments_insert" on rent_payments for insert with check (
  property_id in (
    select id from properties where landlord_id in (
      select id from landlords where user_id = auth.uid()
    )
  )
);
create policy "payments_update" on rent_payments for update using (
  property_id in (
    select id from properties where landlord_id in (
      select id from landlords where user_id = auth.uid()
    )
  )
);

-- Maintenance requests
create policy "maintenance_select" on maintenance_requests for select using (
  property_id in (
    select id from properties where landlord_id in (
      select id from landlords where user_id = auth.uid()
    )
  )
);
create policy "maintenance_insert" on maintenance_requests for insert with check (
  property_id in (
    select id from properties where landlord_id in (
      select id from landlords where user_id = auth.uid()
    )
  )
);
create policy "maintenance_update" on maintenance_requests for update using (
  property_id in (
    select id from properties where landlord_id in (
      select id from landlords where user_id = auth.uid()
    )
  )
);

-- Subscriptions
create policy "subscriptions_select" on subscriptions for select using (
  landlord_id in (select id from landlords where user_id = auth.uid())
);

-- Indexes for performance
create index if not exists idx_properties_landlord on properties(landlord_id);
create index if not exists idx_tenants_property on tenants(property_id);
create index if not exists idx_payments_property on rent_payments(property_id);
create index if not exists idx_payments_periode on rent_payments(periode);
create index if not exists idx_maintenance_property on maintenance_requests(property_id);
create index if not exists idx_maintenance_status on maintenance_requests(status);

-- Storage buckets
insert into storage.buckets (id, name, public) values ('contracts', 'contracts', false) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('maintenance-photos', 'maintenance-photos', false) on conflict do nothing;
