-- The `addresses` table has RLS enabled (per Supabase dashboard) but no
-- policy for it exists anywhere in this repo's migration history —
-- unlike coupons/site_settings/newsletter_subscribers, which all have
-- their policies checked in. That almost certainly means whatever
-- policy exists today was set directly in the dashboard and doesn't
-- correctly permit a logged-in user to insert their own address (if it
-- did, this would show up as a normal Postgres permission error in the
-- server logs, which the existing route already logs as
-- "ADDRESS INSERT ERROR").
--
-- This defines exactly what's needed — a user can only see, add,
-- change, or delete their own addresses — and is safe to run even if a
-- (possibly different) policy already exists, since each is dropped
-- first if present.

alter table addresses enable row level security;

drop policy if exists "Users can view own addresses" on addresses;
drop policy if exists "Users can insert own addresses" on addresses;
drop policy if exists "Users can update own addresses" on addresses;
drop policy if exists "Users can delete own addresses" on addresses;

create policy "Users can view own addresses"
on addresses
for select
using (profile_id = auth.uid());

create policy "Users can insert own addresses"
on addresses
for insert
with check (profile_id = auth.uid());

create policy "Users can update own addresses"
on addresses
for update
using (profile_id = auth.uid())
with check (profile_id = auth.uid());

create policy "Users can delete own addresses"
on addresses
for delete
using (profile_id = auth.uid());
