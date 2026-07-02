alter table public.donations
  add column if not exists donor_address text;
