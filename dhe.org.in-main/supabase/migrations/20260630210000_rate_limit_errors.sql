-- Distributed rate limiting + error logging (Supabase-backed, no Upstash required)

create table if not exists public.rate_limit_buckets (
  bucket_key text primary key,
  count integer not null default 0,
  reset_at timestamptz not null default now()
);

create table if not exists public.error_logs (
  id uuid primary key default gen_random_uuid(),
  message text not null,
  stack text,
  path text,
  digest text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists error_logs_created_idx on public.error_logs (created_at desc);

alter table public.rate_limit_buckets enable row level security;
alter table public.error_logs enable row level security;
