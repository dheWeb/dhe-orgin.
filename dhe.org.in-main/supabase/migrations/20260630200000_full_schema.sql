-- Full DHE schema: forms, notices, visitors, memberships, workshops

create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  image_path text,
  published_at timestamptz not null default now(),
  expires_at timestamptz,
  is_pinned boolean not null default false,
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.feedback_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  mobile text not null,
  affiliation text,
  event text,
  experience text,
  suggestions text,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.membership_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  address text,
  membership_category text not null,
  membership_type text not null,
  fee_amount_paise integer,
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed')),
  razorpay_payment_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.workshop_registrations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  address text,
  created_at timestamptz not null default now()
);

create table if not exists public.visitor_stats (
  id text primary key,
  count bigint not null default 0,
  stat_date date,
  updated_at timestamptz not null default now()
);

insert into public.visitor_stats (id, count, stat_date)
values ('total', 0, null)
on conflict (id) do nothing;

create index if not exists notices_published_idx on public.notices (published_at desc);
create index if not exists notices_status_idx on public.notices (status);

alter table public.notices enable row level security;
alter table public.feedback_submissions enable row level security;
alter table public.contact_messages enable row level security;
alter table public.membership_applications enable row level security;
alter table public.workshop_registrations enable row level security;
alter table public.visitor_stats enable row level security;
