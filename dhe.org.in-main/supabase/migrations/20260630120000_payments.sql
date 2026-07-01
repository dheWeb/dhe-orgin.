-- Razorpay payments: orders, webhook idempotency, donations

create extension if not exists "pgcrypto";

create table if not exists public.payment_orders (
  id uuid primary key default gen_random_uuid(),
  razorpay_order_id text not null unique,
  purpose text not null check (purpose in ('donation', 'membership', 'registration')),
  amount_paise integer not null check (amount_paise > 0),
  currency text not null default 'INR',
  status text not null default 'created' check (status in ('created', 'paid', 'failed')),
  payer_name text,
  payer_email text,
  payer_phone text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payment_webhook_events (
  id uuid primary key default gen_random_uuid(),
  razorpay_event_id text not null unique,
  event_type text not null,
  payload jsonb not null,
  processed_at timestamptz,
  processing_error text,
  created_at timestamptz not null default now()
);

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  payment_order_id uuid references public.payment_orders (id) on delete set null,
  razorpay_payment_id text not null unique,
  razorpay_order_id text not null,
  amount_paise integer not null check (amount_paise > 0),
  donor_name text,
  donor_email text,
  donor_phone text,
  receipt_number text unique,
  status text not null default 'captured' check (status in ('captured', 'failed', 'authorized')),
  pan text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists payment_orders_purpose_idx on public.payment_orders (purpose);
create index if not exists payment_orders_status_idx on public.payment_orders (status);
create index if not exists donations_order_idx on public.donations (razorpay_order_id);
create index if not exists donations_created_idx on public.donations (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists payment_orders_updated_at on public.payment_orders;
create trigger payment_orders_updated_at
before update on public.payment_orders
for each row execute function public.set_updated_at();

create or replace function public.next_receipt_number()
returns text
language plpgsql
as $$
declare
  fy_start integer;
  fy_end integer;
  seq integer;
  prefix text;
begin
  if extract(month from current_date) >= 4 then
    fy_start := extract(year from current_date)::integer;
  else
    fy_start := extract(year from current_date)::integer - 1;
  end if;
  fy_end := fy_start + 1;
  prefix := format('DHE-%s-%s', fy_start, right(fy_end::text, 2));

  select coalesce(max((regexp_match(receipt_number, '-(\d+)$'))[1]::integer), 0) + 1
  into seq
  from public.donations
  where receipt_number like prefix || '-%';

  return format('%s-%s', prefix, lpad(seq::text, 5, '0'));
end;
$$;

alter table public.payment_orders enable row level security;
alter table public.payment_webhook_events enable row level security;
alter table public.donations enable row level security;
