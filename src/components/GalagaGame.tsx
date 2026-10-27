import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Crosshair, Pause, Play } from 'lucide-react';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import { useLanguage } from '../context/LanguageContext';

// ── Configuración del juego ─────────────────────────────────
const W = 480;
const H = 640;
const PLAYER_Y = H - 60;
const PLAYER_SPEED = 5;
const BULLET_SPEED = 9;
const FIRE_COOLDOWN = 220;
const MAX_PLAYER_BULLETS = 3;

type Status = 'idle' | 'playing' | 'paused' | 'over';
type EnemyKind = 'boss' | 'butterfly' | 'bee';

interface Enemy {
  kind: EnemyKind;
  hp: number;
  // Posición en la formación
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  state: 'entering' | 'formation' | 'diving';
  t: number;
  // Trayectoria de entrada / picada
  path: { x: number; y: number }[];
  pathIndex: number;
  delay: number;
  flap: number;
}

interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

interface Star {
  x: number;
  y: number;
  speed: number;
  color: string;
}

interface GameState {
  playerX: number;
  bullets: Bullet[];
  enemyBullets: Bullet[];
  enemies: Enemy[];
  particles: Particle[];
  stars: Star[];
  score: number;
  lives: number;
  level: number;
  lastShot: number;
  invulnerable: number;
  formationOffset: number;
  formationDir: number;
  waveBanner: number;
  time: number;
}

const COLORS: Record<EnemyKind, { main: string; accent: string; points: number; divePoints: number }> = {
  boss: { main: '#9b4dff', accent: '#f4f1ec', points: 150, divePoints: 400 },
  butterfly: { main: '#3d5afe', accent: '#c9a3ff', points: 80, divePoints: 160 },
  bee: { main: '#f4f1ec', accent: '#9b4dff', points: 50, divePoints: 100 },
};

// Curva de Bézier cuadrática muestreada como lista de puntos
const bezier = (p0: { x: number; y: number }, p1: { x: number; y: number }, p2: { x: number; y: number }, steps: number) => {
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = (1 - t) * (1 - t);
    const b = 2 * (1 - t) * t;
    const c = t * t;
    pts.push({ x: a * p0.x + b * p1.x + c * p2.x, y: a * p0.y + b * p1.y + c * p2.y });
  }
  return pts;
};

const createStars = (): Star[] =>
  Array.from({ length: 90 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    speed: Math.random() * 2 + 0.4,
    color: ['#f4f1ec', '#8a8a8a', '#f4f1ec', '#9b4dff'][Math.floor(Math.random() * 4)],
  }));

const createWave = (level: number): Enemy[] => {
  const enemies: Enemy[] = [];
  const rows: { kind: EnemyKind; count: number; y: number }[] = [
    { kind: 'boss', count: 4, y: 70 },
    { kind: 'butterfly', count: 8, y: 110 },
    { kind: 'butterfly', count: 8, y: 145 },
    { kind: 'bee', count: 10, y: 180 },
    { kind: 'bee', count: 10, y: 215 },
  ];
  let order = 0;
  rows.forEach((row, r) => {
    const spacing = 38;
    const startX = W / 2 - ((row.count - 1) * spacing) / 2;
    for (let i = 0; i < row.count; i++) {
      const homeX = startX + i * spacing;
      const fromLeft = (i + r) % 2 === 0;
      const start = { x: fromLeft ? -30 : W + 30, y: H * 0.55 };
      const ctrl = { x: fromLeft ? W * 0.85 : W * 0.15, y: H * 0.15 };
      const path = bezier(start, ctrl, { x: homeX, y: row.y }, 70);
      enemies.push({
        kind: row.kind,
        hp: row.kind === 'boss' ? 2 : 1,
        homeX,
        homeY: row.y,
        x: start.x,
        y: start.y,
        state: 'entering',
        t: 0,
        path,
        pathIndex: 0,
        delay: order * 4 + r * 18 - Math.min(level * 4, 40),
        flap: Math.random() * Math.PI * 2,
      });
      order++;
    }
  });
  return enemies;
};

const newGame = (): GameState => ({
  playerX: W / 2,
  bullets: [],
  enemyBullets: [],
  enemies: createWave(1),
  particles: [],
  stars: createStars(),
  score: 0,
  lives: 3,
  level: 1,
  lastShot: 0,
  invulnerable: 120,
  formationOffset: 0,
  formationDir: 1,
  waveBanner: 120,
  time: 0,
});

// ── Dibujo de sprites ───────────────────────────────────────
const drawPlayer = (ctx: CanvasRenderingContext2D, x: number, y: number, blink: boolean) => {
  if (blink) return;
  ctx.save();
  ctx.translate(x, y);
  ctx.shadowColor = '#9b4dff';
  ctx.shadowBlur = 10;
  // Llama del motor
  ctx.fillStyle = Math.random() > 0.5 ? '#3d5afe' : '#9b4dff';
  ctx.beginPath();
  ctx.moveTo(-6, 16);
  ctx.lineTo(0, 26 + Math.random() * 8);
  ctx.lineTo(6, 16);
  ctx.fill();
  // Fuselaje
  const grad = ctx.createLinearGradient(0, -20, 0, 18);
  grad.addColorStop(0, '#f4f1ec');
  grad.addColorStop(1, '#9b4dff');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(0, -22);
  ctx.lineTo(7, -4);
  ctx.lineTo(20, 10);
  ctx.lineTo(20, 18);
  ctx.lineTo(6, 12);
  ctx.lineTo(0, 18);
  ctx.lineTo(-6, 12);
  ctx.lineTo(-20, 18);
  ctx.lineTo(-20, 10);
  ctx.lineTo(-7, -4);
  ctx.closePath();
  ctx.fill();
  // Cabina
  ctx.fillStyle = '#0a0a0a';
  ctx.beginPath();
  ctx.ellipse(0, -2, 3, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

const drawEnemy = (ctx: CanvasRenderingContext2D, e: Enemy, time: number) => {
  const c = COLORS[e.kind];
  const wing = Math.sin(time * 0.15 + e.flap) * 4;
  ctx.save();
  ctx.translate(e.x, e.y);
  if (e.state === 'diving') ctx.rotate(Math.sin(time * 0.1) * 0.4);
  ctx.shadowColor = c.main;
  ctx.shadowBlur = 8;
  ctx.fillStyle = e.kind === 'boss' && e.hp === 1 ? '#3d5afe' : c.main;

  if (e.kind === 'boss') {
    ctx.beginPath();
    ctx.moveTo(0, -14);
    ctx.lineTo(10, -4);
    ctx.lineTo(18 + wing, 8);
    ctx.lineTo(8, 6);
    ctx.lineTo(0, 14);
    ctx.lineTo(-8, 6);
    ctx.lineTo(-18 - wing, 8);
    ctx.lineTo(-10, -4);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = c.accent;
    ctx.fillRect(-4, -6, 8, 6);
  } else if (e.kind === 'butterfly') {
    ctx.beginPath();
    ctx.ellipse(-8, 0, 7, 10 + wing, -0.4, 0, Math.PI * 2);
    ctx.ellipse(8, 0, 7, 10 + wing, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = c.accent;
    ctx.fillRect(-2, -10, 4, 20);
  } else {
    ctx.beginPath();
    ctx.ellipse(0, 0, 7, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = c.accent;
    ctx.beginPath();
    ctx.ellipse(-10, -2, 6, 3 + Math.abs(wing) * 0.6, 0.3, 0, Math.PI * 2);
    ctx.ellipse(10, -2, 6, 3 + Math.abs(wing) * 0.6, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(-5, 1, 10, 2);
  }
  ctx.restore();
};

// ── Componente ──────────────────────────────────────────────
const GalagaGame = () => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<GameState>(newGame());
  const keysRef = useRef<{ left: boolean; right: boolean; fire: boolean }>({ left: false, right: false, fire: false });
  const statusRef = useRef<Status>('idle');
  const [status, setStatus] = useState<Status>('idle');
  const [hud, setHud] = useState({ score: 0, lives: 3, level: 1 });
  const [best, setBest] = useState(() => {
    try {
      return Number(localStorage.getItem('galaga-best') || 0);
    } catch {
      return 0;
    }
  });
  const bestRef = useRef(best);

  const changeStatus = useCallback((s: Status) => {
    statusRef.current = s;
    setStatus(s);
  }, []);

  const start = useCallback(() => {
    if (statusRef.current === 'playing') return;
    if (statusRef.current !== 'paused') {
      stateRef.current = newGame();
      setHud({ score: 0, lives: 3, level: 1 });
    }
    changeStatus('playing');
    wrapperRef.current?.focus({ preventScroll: true });
  }, [changeStatus]);

  const togglePause = useCallback(() => {
    if (statusRef.current === 'playing') changeStatus('paused');
    else if (statusRef.current === 'paused') changeStatus('playing');
  }, [changeStatus]);

  // Teclado: solo cuando el juego tiene el foco, para no bloquear el scroll de la página
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const down = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'a', 'd', 'A', 'D'].includes(e.key)) e.preventDefault();
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keysRef.current.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keysRef.current.right = true;
      if (e.key === ' ') {
        if (statusRef.current === 'playing') keysRef.current.fire = true;
        else start();
      }
      if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') togglePause();
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keysRef.current.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keysRef.current.right = false;
      if (e.key === ' ') keysRef.current.fire = false;
    };
    el.addEventListener('keydown', down);
    el.addEventListener('keyup', up);
    return () => {
      el.removeEventListener('keydown', down);
      el.removeEventListener('keyup', up);
    };
  }, [start, togglePause]);

  // Pausar automáticamente si el juego sale de la pantalla
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && statusRef.current === 'playing') changeStatus('paused');
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [changeStatus]);

  // Bucle principal
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;

    const explode = (s: GameState, x: number, y: number, color: string, n = 18) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = Math.random() * 3.5 + 0.5;
        s.particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, color: Math.random() > 0.5 ? color : '#ffffff' });
      }
    };

    const startDive = (s: GameState, e: Enemy) => {
      const targetX = Math.max(20, Math.min(W - 20, s.playerX + (Math.random() - 0.5) * 120));
      const loop = bezier({ x: e.x, y: e.y }, { x: e.x + (e.x < W / 2 ? -110 : 110), y: e.y + 140 }, { x: targetX, y: H + 40 }, 90);
      e.state = 'diving';
      e.path = loop;
      e.pathIndex = 0;
    };

    const update = (s: GameState) => {
      s.time++;
      const keys = keysRef.current;

      // Jugador
      if (keys.left) s.playerX -= PLAYER_SPEED;
      if (keys.right) s.playerX += PLAYER_SPEED;
      s.playerX = Math.max(22, Math.min(W - 22, s.playerX));
      if (s.invulnerable > 0) s.invulnerable--;
      if (s.waveBanner > 0) s.waveBanner--;

      const now = performance.now();
      if (keys.fire && now - s.lastShot > FIRE_COOLDOWN && s.bullets.length < MAX_PLAYER_BULLETS) {
        s.bullets.push({ x: s.playerX, y: PLAYER_Y - 22, vx: 0, vy: -BULLET_SPEED });
        s.lastShot = now;
      }

      s.bullets.forEach((b) => (b.y += b.vy));
      s.bullets = s.bullets.filter((b) => b.y > -10);
      s.enemyBullets.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
      });
      s.enemyBullets = s.enemyBullets.filter((b) => b.y < H + 10 && b.x > -10 && b.x < W + 10);

      // Movimiento lateral de la formación
      s.formationOffset += 0.35 * s.formationDir;
      if (Math.abs(s.formationOffset) > 28) s.formationDir *= -1;

      const diveChance = 0.004 + s.level * 0.0015;
      const fireChance = 0.004 + s.level * 0.0012;
      const divingCount = s.enemies.filter((e) => e.state === 'diving').length;

      for (const e of s.enemies) {
        if (e.state === 'entering') {
          if (e.delay > 0) {
            e.delay--;
            continue;
          }
          e.pathIndex += 1;
          if (e.pathIndex >= e.path.length) {
            e.state = 'formation';
          } else {
            e.x = e.path[e.pathIndex].x;
            e.y = e.path[e.pathIndex].y;
          }
        } else if (e.state === 'formation') {
          e.x = e.homeX + s.formationOffset;
          e.y = e.homeY + Math.sin(s.time * 0.03 + e.homeX) * 2;
          if (divingCount < 2 + s.level && Math.random() < diveChance / 6) startDive(s, e);
        } else {
          e.pathIndex += 1 + Math.min(s.level * 0.15, 1.2);
          const idx = Math.floor(e.pathIndex);
          if (idx >= e.path.length) {
            // Reaparece arriba y vuelve a su sitio
            e.x = e.homeX;
            e.y = -30;
            e.state = 'entering';
            e.path = bezier({ x: e.homeX, y: -30 }, { x: e.homeX, y: e.homeY / 2 }, { x: e.homeX + s.formationOffset, y: e.homeY }, 40);
            e.pathIndex = 0;
          } else {
            e.x = e.path[idx].x;
            e.y = e.path[idx].y;
            if (Math.random() < fireChance * 3 && e.y < PLAYER_Y - 80) {
              const dx = s.playerX - e.x;
              const dy = PLAYER_Y - e.y;
              const len = Math.hypot(dx, dy);
              const sp = 3.2 + s.level * 0.25;
              s.enemyBullets.push({ x: e.x, y: e.y + 10, vx: (dx / len) * sp * 0.5, vy: (dy / len) * sp });
            }
          }
        }
        if (e.state === 'formation' && Math.random() < fireChance / 10) {
          s.enemyBullets.push({ x: e.x, y: e.y + 10, vx: 0, vy: 3 + s.level * 0.2 });
        }
      }

      // Colisiones: balas del jugador contra enemigos
      for (const b of s.bullets) {
        for (const e of s.enemies) {
          if (e.hp > 0 && Math.abs(b.x - e.x) < 15 && Math.abs(b.y - e.y) < 14) {
            e.hp--;
            b.y = -100;
            if (e.hp <= 0) {
              const c = COLORS[e.kind];
              s.score += e.state === 'diving' ? c.divePoints : c.points;
              explode(s, e.x, e.y, c.main);
            } else {
              explode(s, e.x, e.y, '#3d5afe', 6);
            }
            break;
          }
        }
      }
      s.enemies = s.enemies.filter((e) => e.hp > 0);

      // Colisiones contra el jugador
      if (s.invulnerable === 0) {
        const hitByBullet = s.enemyBullets.some((b) => Math.abs(b.x - s.playerX) < 14 && Math.abs(b.y - PLAYER_Y) < 16);
        const rammed = s.enemies.find((e) => Math.abs(e.x - s.playerX) < 22 && Math.abs(e.y - PLAYER_Y) < 20);
        if (hitByBullet || rammed) {
          explode(s, s.playerX, PLAYER_Y, '#9b4dff', 40);
          if (rammed) {
            rammed.hp = 0;
            explode(s, rammed.x, rammed.y, COLORS[rammed.kind].main);
          }
          s.enemies = s.enemies.filter((e) => e.hp > 0);
          s.enemyBullets = [];
          s.lives--;
          s.invulnerable = 150;
          if (s.lives <= 0) {
            if (s.score > bestRef.current) {
              bestRef.current = s.score;
              setBest(s.score);
              try {
                localStorage.setItem('galaga-best', String(s.score));
              } catch {
                /* almacenamiento no disponible */
              }
            }
            changeStatus('over');
          }
        }
      }

      // Nueva oleada
      if (s.enemies.length === 0) {
        s.level++;
        s.enemies = createWave(s.level);
        s.enemyBullets = [];
        s.waveBanner = 120;
      }

      s.particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= 0.025;
      });
      s.particles = s.particles.filter((p) => p.life > 0);
    };

    const render = (s: GameState) => {
      // Fondo
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, W, H);

      const moving = statusRef.current !== 'paused';
      for (const st of s.stars) {
        if (moving) {
          st.y += st.speed;
          if (st.y > H) {
            st.y = 0;
            st.x = Math.random() * W;
          }
        }
        ctx.fillStyle = st.color;
        ctx.globalAlpha = 0.4 + st.speed / 4;
        ctx.fillRect(st.x, st.y, st.speed > 1.8 ? 2 : 1, st.speed * 2);
      }
      ctx.globalAlpha = 1;

      if (statusRef.current === 'idle') return;

      for (const e of s.enemies) {
        if (e.state === 'entering' && e.delay > 0) continue;
        drawEnemy(ctx, e, s.time);
      }

      // Balas
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#9b4dff';
      ctx.fillStyle = '#f4f1ec';
      s.bullets.forEach((b) => ctx.fillRect(b.x - 1.5, b.y - 8, 3, 14));
      ctx.shadowColor = '#3d5afe';
      ctx.fillStyle = '#c9a3ff';
      s.enemyBullets.forEach((b) => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, 3.5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      if (statusRef.current !== 'over') {
        drawPlayer(ctx, s.playerX, PLAYER_Y, s.invulnerable > 0 && Math.floor(s.invulnerable / 6) % 2 === 0);
      }

      s.particles.forEach((p) => {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
      });
      ctx.globalAlpha = 1;

      if (s.waveBanner > 0 && statusRef.current === 'playing') {
        ctx.globalAlpha = Math.min(1, s.waveBanner / 40);
        ctx.fillStyle = '#f4f1ec';
        ctx.font = '44px Anton, Impact, sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#9b4dff';
        ctx.shadowBlur = 0;
        ctx.fillText(`${t('arcade.wave').toUpperCase()} ${s.level}`, W / 2, H / 2 + 40);
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    };

    let lastHud = '';
    const loop = () => {
      const s = stateRef.current;
      if (statusRef.current === 'playing') update(s);
      render(s);
      const hudKey = `${s.score}|${s.lives}|${s.level}`;
      if (hudKey !== lastHud) {
        lastHud = hudKey;
        setHud({ score: s.score, lives: s.lives, level: s.level });
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [changeStatus, t]);

  // Controles táctiles
  const hold = (key: 'left' | 'right' | 'fire', value: boolean) => (e: React.PointerEvent) => {
    e.preventDefault();
    if (value && statusRef.current !== 'playing') start();
    keysRef.current[key] = value;
  };

  const touchBtn =
    'select-none touch-none flex items-center justify-center border border-paper/40 active:bg-violet active:text-ink active:scale-95 transition-all text-paper';

  return (
    <section id="arcade" className="py-24 scroll-mt-10">
      <SectionTitle number="06." title={t('arcade.bigtitle')} subtitle={t('arcade.subtitle')} note={t('arcade.note')} />

      <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Ficha del juego */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <p className="font-display uppercase text-6xl leading-[0.9]">
              {t('arcade.title').split(' ')[0]}
              <span className="block font-serif italic normal-case text-violet">{t('arcade.title').split(' ').slice(1).join(' ')}</span>
            </p>
            <div className="mt-8 border-t border-paper/20">
              {[
                ['←  →', t('arcade.move')],
                ['SPACE', t('arcade.shoot')],
                ['P', t('arcade.pausekey')],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-3 border-b border-paper/20">
                  <span className="tag bg-paper text-ink px-2 py-0.5">{k}</span>
                  <span className="text-sm text-paper/60 text-right">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-3 gap-2 text-center">
              {[
                { label: 'Bee', pts: 50, color: 'bg-paper' },
                { label: 'Butterfly', pts: 80, color: 'bg-cobalt' },
                { label: 'Boss', pts: 150, color: 'bg-violet' },
              ].map((e) => (
                <div key={e.label} className="border border-paper/20 p-3">
                  <span className={`inline-block w-4 h-4 rotate-45 ${e.color}`} />
                  <p className="tag mt-2">{e.label}</p>
                  <p className="font-display text-2xl">{e.pts}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 order-1 lg:order-2 relative">
            <div className="absolute -top-4 right-6 w-32 h-5 stripes z-10" />
            <div
              ref={wrapperRef}
              tabIndex={0}
              aria-label={t('arcade.title')}
              className="relative mx-auto max-w-[440px] border border-paper/40 bg-ink p-4 outline-none focus-visible:ring-2 focus-visible:ring-violet shadow-[10px_10px_0_#9b4dff]"
            >
              {/* HUD */}
              <div className="grid grid-cols-3 mb-3 font-mono text-[0.65rem] uppercase tracking-widest">
                <div>
                  <p className="text-paper/50">{t('arcade.score')}</p>
                  <p className="font-display text-2xl text-paper tracking-normal">{String(hud.score).padStart(6, '0')}</p>
                </div>
                <div className="text-center">
                  <p className="text-paper/50">{t('arcade.best')}</p>
                  <p className="font-display text-2xl text-violet tracking-normal">{String(Math.max(best, hud.score)).padStart(6, '0')}</p>
                </div>
                <div className="text-right">
                  <p className="text-paper/50">{t('arcade.level')} {hud.level}</p>
                  <p className="font-display text-2xl text-paper tracking-normal">{'▲'.repeat(Math.max(hud.lives, 0)) || '—'}</p>
                </div>
              </div>

              <div className="relative overflow-hidden border border-paper/20">
                <canvas
                  ref={canvasRef}
                  width={W}
                  height={H}
                  className="block w-full h-auto aspect-[3/4]"
                  onPointerDown={() => {
                    if (statusRef.current !== 'playing') start();
                  }}
                />

                {status !== 'playing' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-ink/60 pointer-events-none">
                    {status === 'idle' && (
                      <p className="font-display uppercase text-6xl leading-[0.9] mb-6">
                        {t('arcade.title').split(' ')[0]}
                        <span className="block font-serif italic normal-case text-violet">{t('arcade.title').split(' ').slice(1).join(' ')}</span>
                      </p>
                    )}
                    {status === 'over' && (
                      <>
                        <p className="font-display uppercase text-5xl mb-2"><span className="hl">{t('arcade.gameover')}</span></p>
                        <p className="font-serif italic text-3xl mb-6">{hud.score} pts</p>
                      </>
                    )}
                    {status === 'paused' && (
                      <p className="font-display uppercase text-5xl mb-6">{t('arcade.paused')}</p>
                    )}
                    <p className="tag text-paper animate-pulse">
                      {status === 'over' ? t('arcade.retry') : t('arcade.start')}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2">
                <button aria-label="Left" className={`${touchBtn} h-14`} onPointerDown={hold('left', true)} onPointerUp={hold('left', false)} onPointerLeave={hold('left', false)} onPointerCancel={hold('left', false)}>
                  <ChevronLeft size={26} />
                </button>
                <button aria-label="Right" className={`${touchBtn} h-14`} onPointerDown={hold('right', true)} onPointerUp={hold('right', false)} onPointerLeave={hold('right', false)} onPointerCancel={hold('right', false)}>
                  <ChevronRight size={26} />
                </button>
                <button
                  aria-label={status === 'playing' ? t('arcade.paused') : t('arcade.play')}
                  className={`${touchBtn} h-14`}
                  onClick={() => (status === 'playing' || status === 'paused' ? togglePause() : start())}
                >
                  {status === 'playing' ? <Pause size={22} /> : <Play size={22} />}
                </button>
                <button
                  aria-label="Fire"
                  className={`${touchBtn} h-14 bg-violet text-ink border-violet`}
                  onPointerDown={hold('fire', true)}
                  onPointerUp={hold('fire', false)}
                  onPointerLeave={hold('fire', false)}
                  onPointerCancel={hold('fire', false)}
                >
                  <Crosshair size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default GalagaGame;
