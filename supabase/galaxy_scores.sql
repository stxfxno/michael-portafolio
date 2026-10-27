-- Tabla de récords del minijuego "Galaxia Púrpura"
-- Ejecutar una sola vez en Supabase → SQL Editor

create table if not exists public.galaxy_scores (
  id bigint generated always as identity primary key,
  name text not null check (char_length(trim(name)) between 1 and 16),
  score integer not null check (score between 0 and 5000000),
  difficulty text not null default 'normal' check (difficulty in ('easy', 'normal', 'hard', 'extreme')),
  level integer not null default 1 check (level between 1 and 999),
  created_at timestamptz not null default now()
);

-- Para ordenar rápido el top por dificultad
create index if not exists galaxy_scores_rank_idx on public.galaxy_scores (difficulty, score desc);

-- Seguridad: cualquiera puede ver el top y agregar su puntaje, nadie puede editar ni borrar
alter table public.galaxy_scores enable row level security;

create policy "galaxy_scores_read" on public.galaxy_scores
  for select to anon, authenticated using (true);

create policy "galaxy_scores_insert" on public.galaxy_scores
  for insert to anon, authenticated with check (true);

grant select, insert on public.galaxy_scores to anon, authenticated;
