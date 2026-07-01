-- Supabase Storage bucket for notice images + editable site content (CMS)

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'notices',
  'notices',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

do $$ begin
  create policy "public_read_notices_bucket" on storage.objects for select to anon
    using (bucket_id = 'notices');
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "service_role_notices_bucket" on storage.objects for all to service_role
    using (bucket_id = 'notices') with check (bucket_id = 'notices');
exception when duplicate_object then null; end $$;

create table if not exists public.site_content (
  key text primary key,
  label text not null default '',
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.site_content (key, label, value) values
  ('home_tagline', 'Home page tagline', '{"text":"Empowering holistic education for Viksit Bharat"}'::jsonb),
  ('site_contact', 'Public contact details', '{"phone":"7903431900","email":"director@dhe.org.in"}'::jsonb),
  ('director_message', 'Director message excerpt', '{"excerpt":"Holistic education integrates mind, body, and spirit for nation-building."}'::jsonb)
on conflict (key) do nothing;

alter table public.site_content enable row level security;

do $$ begin
  create policy "public_read_site_content" on public.site_content for select to anon using (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "deny_anon_site_content_mutations" on public.site_content for all to anon
    using (false) with check (false);
exception when duplicate_object then null; end $$;
