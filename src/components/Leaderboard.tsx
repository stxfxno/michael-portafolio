import { useEffect, useState } from 'react';
import { fetchTopScores, ScoreRow, scoresEnabled } from '../lib/galaxyScores';
import { useLanguage } from '../context/LanguageContext';

const TABS = ['easy', 'normal', 'hard', 'extreme'] as const;
type Tab = (typeof TABS)[number];

interface LeaderboardProps {
  difficulty: Tab;
  onDifficultyChange: (d: Tab) => void;
  // Cambia cada vez que se guarda un puntaje para volver a cargar la tabla
  refreshKey: number;
  highlightName?: string;
}

// Tabla "Salón de la fama" con el top 10 por dificultad
const Leaderboard = ({ difficulty, onDifficultyChange, refreshKey, highlightName }: LeaderboardProps) => {
  const { language } = useLanguage();
  const es = language === 'es';
  const [rows, setRows] = useState<ScoreRow[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');

  const labels: Record<Tab, string> = es
    ? { easy: 'Fácil', normal: 'Normal', hard: 'Difícil', extreme: 'Muy difícil' }
    : { easy: 'Easy', normal: 'Normal', hard: 'Hard', extreme: 'Very hard' };

  useEffect(() => {
    if (!scoresEnabled) return;
    let alive = true;
    setState('loading');
    fetchTopScores(difficulty)
      .then((r) => {
        if (!alive) return;
        setRows(r);
        setState('ready');
      })
      .catch(() => alive && setState('error'));
    return () => {
      alive = false;
    };
  }, [difficulty, refreshKey]);

  return (
    <div className="mt-20">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <h3 className="font-display uppercase text-5xl sm:text-6xl leading-none">
          Top 10
          <span className="font-serif italic normal-case text-violet text-4xl sm:text-5xl"> {es ? 'salón de la fama' : 'hall of fame'}</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {TABS.map((d) => (
            <button
              key={d}
              onClick={() => onDifficultyChange(d)}
              className={`tag px-3 py-2 border transition-colors ${
                difficulty === d ? 'bg-violet border-violet text-ink' : 'border-paper/40 hover:border-violet'
              }`}
            >
              {labels[d]}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-paper/20">
        {!scoresEnabled ? (
          <p className="py-8 text-paper/60">
            {es ? 'La tabla de récords todavía no está conectada.' : 'The leaderboard is not connected yet.'}
          </p>
        ) : state === 'loading' ? (
          <p className="py-8 tag text-paper/50 animate-pulse">{es ? 'Cargando…' : 'Loading…'}</p>
        ) : state === 'error' ? (
          <p className="py-8 text-paper/60">{es ? 'No se pudo cargar la tabla. Intenta más tarde.' : 'Could not load the leaderboard. Try again later.'}</p>
        ) : rows.length === 0 ? (
          <p className="py-8 font-serif italic text-2xl text-paper/70">
            {es ? 'Nadie todavía… ¡sé el primero!' : 'Nobody yet… be the first!'}
          </p>
        ) : (
          rows.map((r, i) => {
            const mine = highlightName && r.name === highlightName;
            return (
              <div
                key={`${r.name}-${r.created_at}`}
                className={`grid grid-cols-12 items-center gap-3 py-4 border-b border-paper/20 ${mine ? 'bg-violet/15' : ''}`}
              >
                <span className={`col-span-2 sm:col-span-1 font-display text-3xl ${i < 3 ? 'text-violet' : 'text-paper/40'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="col-span-6 sm:col-span-7 font-display uppercase text-2xl sm:text-3xl leading-none truncate">
                  {r.name}
                  {i === 0 && <span className="font-hand text-lg text-cobalt normal-case ml-3 align-middle">♛ {es ? 'campeón' : 'champion'}</span>}
                </span>
                <span className="hidden sm:block col-span-2 tag text-paper/50">
                  {es ? 'Nivel' : 'Level'} {r.level}
                </span>
                <span className="col-span-4 sm:col-span-2 text-right font-display text-2xl sm:text-3xl tracking-normal">
                  {r.score.toLocaleString(es ? 'es-PE' : 'en-US')}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
