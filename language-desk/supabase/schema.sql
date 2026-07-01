-- Run in Supabase SQL Editor after enabling GitHub auth (Authentication → Providers → GitHub).

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  github_id bigint unique,
  login text not null,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.language_progress (
  user_id uuid not null references public.profiles (id) on delete cascade,
  lang_code text not null,
  xp integer not null default 0,
  correct integer not null default 0,
  streak integer not null default 0,
  built integer not null default 0,
  skills jsonb not null default '{}'::jsonb,
  touched jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, lang_code)
);

create index if not exists language_progress_user_id_idx on public.language_progress (user_id);

alter table public.profiles enable row level security;
alter table public.language_progress enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "progress_select_own"
  on public.language_progress for select
  using (auth.uid() = user_id);

create policy "progress_insert_own"
  on public.language_progress for insert
  with check (auth.uid() = user_id);

create policy "progress_update_own"
  on public.language_progress for update
  using (auth.uid() = user_id);

create policy "progress_delete_own"
  on public.language_progress for delete
  using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, github_id, login, avatar_url)
  values (
    new.id,
    coalesce(
      nullif(new.raw_user_meta_data->>'provider_id', '')::bigint,
      nullif(new.raw_user_meta_data->>'sub', '')::bigint
    ),
    coalesce(
      new.raw_user_meta_data->>'user_name',
      new.raw_user_meta_data->>'preferred_username',
      new.raw_user_meta_data->>'name',
      split_part(new.email, '@', 1),
      'github-user'
    ),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do update set
    github_id = excluded.github_id,
    login = excluded.login,
    avatar_url = excluded.avatar_url,
    updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
