create table public.learning_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null check (jsonb_typeof(data) = 'object' and data->>'schema' = '1'),
  version bigint not null default 1 check (version > 0),
  updated_at timestamptz not null default now()
);

alter table public.learning_progress enable row level security;
alter table public.learning_progress force row level security;

create policy "Read own learning progress"
on public.learning_progress for select to authenticated
using ((select auth.uid()) = user_id);

create policy "Create own learning progress"
on public.learning_progress for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "Update own learning progress"
on public.learning_progress for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Delete own learning progress"
on public.learning_progress for delete to authenticated
using ((select auth.uid()) = user_id);

revoke all on public.learning_progress from anon;
grant select, insert, update, delete on public.learning_progress to authenticated;

create function public.save_learning_progress(p_data jsonb, p_expected_version bigint)
returns bigint
language plpgsql
security invoker
set search_path = ''
as $$
declare
  saved_version bigint;
  owner_id uuid := auth.uid();
begin
  if owner_id is null then
    raise exception 'Sign in before saving progress' using errcode = '28000';
  end if;
  if p_expected_version = 0 then
    insert into public.learning_progress (user_id, data)
    values (owner_id, p_data)
    on conflict (user_id) do nothing
    returning version into saved_version;
  else
    update public.learning_progress
    set data = p_data, version = version + 1, updated_at = now()
    where user_id = owner_id and version = p_expected_version
    returning version into saved_version;
  end if;
  if saved_version is null then
    raise exception 'Progress changed on another device' using errcode = '40001';
  end if;
  return saved_version;
end;
$$;

revoke all on function public.save_learning_progress(jsonb, bigint) from public, anon;
grant execute on function public.save_learning_progress(jsonb, bigint) to authenticated;
