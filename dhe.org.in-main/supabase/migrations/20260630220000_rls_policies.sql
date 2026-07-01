-- Explicit RLS: deny anon/authenticated direct access; service role bypasses RLS.

do $$ begin
  create policy "deny_anon_contact" on public.contact_messages for all to anon using (false);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "deny_anon_feedback" on public.feedback_submissions for all to anon using (false);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "deny_anon_membership" on public.membership_applications for all to anon using (false);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "deny_anon_workshop" on public.workshop_registrations for all to anon using (false);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "deny_anon_errors" on public.error_logs for all to anon using (false);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "deny_anon_rate_limit" on public.rate_limit_buckets for all to anon using (false);
exception when duplicate_object then null; end $$;

-- Public read for published notices only (optional future client reads)
do $$ begin
  create policy "public_read_notices" on public.notices for select to anon
    using (status = 'published');
exception when duplicate_object then null; end $$;
