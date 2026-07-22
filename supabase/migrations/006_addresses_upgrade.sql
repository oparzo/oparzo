alter table addresses
add column if not exists first_name text;

alter table addresses
add column if not exists last_name text;

alter table addresses
add column if not exists landmark text;

alter table addresses
add column if not exists label text default 'Home';

alter table addresses
add column if not exists is_primary boolean default false;

alter table addresses
add column if not exists district text;

alter table addresses
add column if not exists notes text;

update addresses
set
  first_name = split_part(coalesce(full_name,''), ' ', 1),
  last_name = trim(substr(
    coalesce(full_name,''),
    length(split_part(coalesce(full_name,''), ' ', 1)) + 1
  ))
where first_name is null;

create index if not exists idx_addresses_profile
on addresses(profile_id);

create index if not exists idx_addresses_primary
on addresses(profile_id, is_primary);
