-- The footer's "Join OPARZO" newsletter form has no handler at all
-- today — no onSubmit, no controlled input, the button does nothing.
-- This gives it somewhere real to write to. No email-sending is wired
-- up (that needs an ESP like Mailchimp/Brevo, which isn't set up yet)
-- — this just captures and stores signups so nothing is lost while
-- that decision gets made, and you can export the list whenever you
-- pick a provider.

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  subscribed_at timestamptz not null default now()
);

alter table newsletter_subscribers enable row level security;

-- No public select/update/delete policy is added — this table is
-- write-only from the client's perspective (insert only, via the
-- policy below), and reads only ever happen through the service-role
-- client (e.g. a future admin export), which bypasses RLS anyway.
create policy "Anyone can subscribe"
on newsletter_subscribers
for insert
with check (true);
