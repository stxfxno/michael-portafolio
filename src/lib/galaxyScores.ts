// Récords del minijuego guardados en Supabase (tabla galaxy_scores).
// Usa la API REST de Supabase directamente para no sumar dependencias.
const URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const scoresEnabled = Boolean(URL && KEY);

export interface ScoreRow {
  name: string;
  score: number;
  level: number;
  created_at: string;
}

const headers = () => ({
  apikey: KEY ?? '',
  Authorization: `Bearer ${KEY ?? ''}`,
  'Content-Type': 'application/json',
});

export const fetchTopScores = async (difficulty: string, limit = 10): Promise<ScoreRow[]> => {
  if (!scoresEnabled) return [];
  const params = new URLSearchParams({
    select: 'name,score,level,created_at',
    difficulty: `eq.${difficulty}`,
    order: 'score.desc,created_at.asc',
    limit: String(limit),
  });
  const res = await fetch(`${URL}/rest/v1/galaxy_scores?${params}`, { headers: headers() });
  if (!res.ok) throw new Error(`Supabase ${res.status}`);
  return res.json();
};

export const submitScore = async (entry: { name: string; score: number; difficulty: string; level: number }) => {
  if (!scoresEnabled) throw new Error('Supabase no configurado');
  const res = await fetch(`${URL}/rest/v1/galaxy_scores`, {
    method: 'POST',
    headers: { ...headers(), Prefer: 'return=minimal' },
    body: JSON.stringify({ ...entry, name: entry.name.trim().slice(0, 16) }),
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}`);
};
