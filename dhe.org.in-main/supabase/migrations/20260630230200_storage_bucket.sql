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
