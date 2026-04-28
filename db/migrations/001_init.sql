create extension if not exists "pgcrypto";
create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  industry text,
  employee_count int not null default 0,
  countries_operating text[] not null default '{}',
  created_at timestamptz not null default now(),
  owner_user_id uuid not null references auth.users(id)
);
create table if not exists data_processing_activities (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  activity_name text not null,purpose text,data_categories text[],data_subjects text[],legal_basis text,retention_period text,
  third_country_transfer boolean not null default false,security_measures text,created_at timestamptz not null default now());
create table if not exists vendors (
  id uuid primary key default gen_random_uuid(), company_id uuid not null references companies(id) on delete cascade,
  vendor_name text not null, service_provided text, data_shared text[], contract_signed boolean not null default false, risk_level text not null default 'low', created_at timestamptz not null default now());
create table if not exists incidents (
  id uuid primary key default gen_random_uuid(), company_id uuid not null references companies(id) on delete cascade,
  incident_title text not null, description text, data_affected text[], reported_to_authority boolean not null default false, reported_to_data_subjects boolean not null default false, mitigation_actions text, created_at timestamptz not null default now());
create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(), company_id uuid references companies(id) on delete cascade,
  stripe_customer_id text unique, stripe_subscription_id text unique, plan text not null, status text not null);
alter table companies enable row level security;
alter table data_processing_activities enable row level security;
alter table vendors enable row level security;
alter table incidents enable row level security;
alter table subscriptions enable row level security;
create policy "companies owner only" on companies for all using (owner_user_id = auth.uid()) with check (owner_user_id = auth.uid());
create policy "ropa by company owner" on data_processing_activities for all using (company_id in (select id from companies where owner_user_id = auth.uid())) with check (company_id in (select id from companies where owner_user_id = auth.uid()));
create policy "vendors by company owner" on vendors for all using (company_id in (select id from companies where owner_user_id = auth.uid())) with check (company_id in (select id from companies where owner_user_id = auth.uid()));
create policy "incidents by company owner" on incidents for all using (company_id in (select id from companies where owner_user_id = auth.uid())) with check (company_id in (select id from companies where owner_user_id = auth.uid()));
create policy "subscriptions by company owner" on subscriptions for all using (company_id in (select id from companies where owner_user_id = auth.uid())) with check (company_id in (select id from companies where owner_user_id = auth.uid()));
