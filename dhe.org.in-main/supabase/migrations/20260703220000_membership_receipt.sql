-- Membership receipt tracking (K-04): idempotent email + receipt numbers
alter table public.membership_applications
  add column if not exists receipt_number text,
  add column if not exists metadata jsonb not null default '{}'::jsonb;

create unique index if not exists membership_applications_receipt_number_idx
  on public.membership_applications (receipt_number)
  where receipt_number is not null;
