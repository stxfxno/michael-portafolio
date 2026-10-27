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
const BOSS_EVERY = 5;
const MAX_LIVES = 5;
// Los power-ups caen muy de vez en cuando
const DROP_CHANCE = 0.035;

type Status = 'idle' | 'playing' | 'paused' | 'over';
type EnemyKind = 'boss' | 'butterfly' | 'bee' | 'sniper';
type Weapon = 'normal' | 'double' | 'spread' | 'heavy' | 'laser';
type DropKind = 'life' | 'shield' | 'double' | 'spread' | 'heavy' | 'laser';
type BossAttack = 'spread' | 'aimed' | 'laser' | 'summon';

interface Point {
  x: number;
  y: number;
}

interface Enemy {
  kind: EnemyKind;
  hp: number;
  // Posición en la formación
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  state: 'entering' | 'formation' | 'diving';
  // Trayectoria de entrada / picada
  path: Point[];
  pathIndex: number;
  delay: number;
  flap: number;
  // Invocado por un mini jefe: desaparece al terminar su picada
  summoned?: boolean;
}

interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  orb?: boolean;
  big?: boolean;
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

interface Drop {
  x: number;
  y: number;
  kind: DropKind;
  t: number;
}

interface MiniBoss {
  name: string;
  tier: number;
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  attack: BossAttack;
  attackIndex: number;
  timer: number;
  laserX: number;
  hit: number;
}

interface Announce {
  text: string;
  color: string;
  life: number;
}

interface GameState {
  playerX: number;
  bullets: Bullet[];
  enemyBullets: Bullet[];
  enemies: Enemy[];
  particles: Particle[];
  stars: Star[];
  drops: Drop[];
  boss: MiniBoss | null;
  score: number;
  lives: number;
  level: number;
  lastShot: number;
  invulnerable: number;
  formationOffset: number;
  formationDir: number;
  waveBanner: number;
  time: number;
  weapon: Weapon;
  weaponTimer: number;
  shield: boolean;
  laserOn: boolean;
  announce: Announce | null;
}

const COLORS: Record<EnemyKind, { main: string; accent: string; points: number; divePoints: number }> = {
  boss: { main: '#9b4dff', accent: '#f4f1ec', points: 150, divePoints: 400 },
  sniper: { main: '#3d5afe', accent: '#f4f1ec', points: 120, divePoints: 240 },
  butterfly: { main: '#7b8cff', accent: '#c9a3ff', points: 80, divePoints: 160 },
  bee: { main: '#f4f1ec', accent: '#9b4dff', points: 50, divePoints: 100 },
};

// Armas: cadencia (ms), balas simultáneas y duración (frames)
const WEAPONS: Record<Weapon, { cooldown: number; max: number; duration: number; name: string }> = {
  normal: { cooldown: 220, max: 3, duration: 0, name: '' },
  double: { cooldown: 190, max: 8, duration: 720, name: 'DOUBLE SHOT' },
  spread: { cooldown: 260, max: 15, duration: 600, name: 'SPREAD GUN' },
  heavy: { cooldown: 75, max: 24, duration: 600, name: 'HEAVY MACHINE GUN' },
  laser: { cooldown: 0, max: 0, duration: 360, name: 'LASER' },
};

const DROPS: Record<DropKind, { letter: string; color: string; ink: string; announce: string; weight: number }> = {
  life: { letter: '♥', color: '#3d5afe', ink: '#f4f1ec', announce: '1UP!', weight: 1 },
  shield: { letter: 'O', color: '#f4f1ec', ink: '#0a0a0a', announce: 'SHIELD!', weight: 2 },
  double: { letter: 'D', color: '#9b4dff', ink: '#0a0a0a', announce: 'DOUBLE SHOT!', weight: 3 },
  spread: { letter: 'S', color: '#9b4dff', ink: '#0a0a0a', announce: 'SPREAD GUN!', weight: 3 },
  heavy: { letter: 'H', color: '#9b4dff', ink: '#0a0a0a', announce: 'HEAVY MACHINE GUN!', weight: 3 },
  laser: { letter: 'L', color: '#3d5afe', ink: '#f4f1ec', announce: 'LASER!', weight: 2 },
};

// Mini jefes con nombres de bugs clásicos
const BOSS_NAMES = ['NULL POINTER', 'STACK OVERFLOW', 'MEMORY LEAK', 'SEGFAULT', 'RACE CONDITION', 'INFINITE LOOP'];
const BOSS_ATTACKS: BossAttack[] = ['spread', 'aimed', 'laser', 'summon'];

// Formaciones: B = jefe, F = mariposa, S = francotirador, b = abeja
const LAYOUTS = [
  ['...BBBB...', '.FFFFFFFF.', '.FFFFFFFF.', 'bbbbbbbbbb', 'bbbbbbbbbb'],
  ['B...BB...B', 'FF..SS..FF', '.FF.FF.FF.', '..bbbbbb..', '.bb.bb.bb.'],
  ['....BB....', '...FSSF...', '..FFFFFF..', '.bbbbbbbb.', '..bbbbbb..', '...bbbb...'],
  ['B.B.BB.B.B', 'F.F.SS.F.F', 'F.F.FF.F.F', 'b.b.bb.b.b', 'b.b.bb.b.b'],
  ['BB......BB', 'FFS....SFF', 'FFFF..FFFF', 'bbbbbbbbbb', '.bbbbbbbb.'],
];

// Curva de Bézier cuadrática muestreada como lista de puntos
const bezier = (p0: Point, p1: Point, p2: Point, steps: number) => {
  const pts: Point[] = [];
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
  Array.from({ length: 70 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    speed: Math.random() * 2 + 0.4,
    color: Math.random() > 0.3 ? '#6b6b6b' : '#f4f1ec',
  }));

const isBossLevel = (level: number) => level % BOSS_EVERY === 0;

const createWave = (level: number): Enemy[] => {
  const layout = LAYOUTS[(level - 1 - Math.floor(level / BOSS_EVERY)) % LAYOUTS.length];
  const entry = level % 3;
  const enemies: Enemy[] = [];
  let order = 0;

  layout.forEach((row, r) => {
    [...row].forEach((ch, c) => {
      if (ch === '.') return;
      let kind: EnemyKind = ch === 'B' ? 'boss' : ch === 'F' ? 'butterfly' : ch === 'S' ? 'sniper' : 'bee';
      if (kind === 'sniper' && level < 3) kind = 'butterfly';

      const hp =
        kind === 'boss' ? (level >= 10 ? 3 : 2) :
        kind === 'sniper' ? 2 :
        kind === 'butterfly' ? (level >= 7 ? 2 : 1) :
        level >= 12 ? 2 : 1;

      const homeX = W / 2 + (c - 4.5) * 38;
      const homeY = 66 + r * 34;
      const fromLeft = entry === 0 ? (c + r) % 2 === 0 : c < 5;

      // Tres estilos de entrada que se alternan entre niveles
      let start: Point;
      let ctrl: Point;
      if (entry === 0) {
        start = { x: fromLeft ? -30 : W + 30, y: H * 0.55 };
        ctrl = { x: fromLeft ? W * 0.85 : W * 0.15, y: H * 0.15 };
      } else if (entry === 1) {
        start = { x: fromLeft ? W * 0.2 : W * 0.8, y: -40 };
        ctrl = { x: fromLeft ? W * 0.95 : W * 0.05, y: H * 0.75 };
      } else {
        start = { x: fromLeft ? -30 : W + 30, y: H * 0.9 };
        ctrl = { x: W / 2, y: -80 };
      }

      enemies.push({
        kind,
        hp,
        homeX,
        homeY,
        x: start.x,
        y: start.y,
        state: 'entering',
        path: bezier(start, ctrl, { x: homeX, y: homeY }, 70),
        pathIndex: 0,
        delay: order * 4 + r * 14 - Math.min(level * 3, 36),
        flap: Math.random() * Math.PI * 2,
      });
      order++;
    });
  });
  return enemies;
};

const createBoss = (level: number): MiniBoss => {
  const tier = level / BOSS_EVERY;
  const maxHp = 40 + 30 * (tier - 1);
  return {
    name: BOSS_NAMES[(tier - 1) % BOSS_NAMES.length],
    tier,
    x: W / 2,
    y: -70,
    hp: maxHp,
    maxHp,
    attack: 'spread',
    attackIndex: 0,
    timer: 120,
    laserX: W / 2,
    hit: 0,
  };
};

const newGame = (): GameState => ({
  playerX: W / 2,
  bullets: [],
  enemyBullets: [],
  enemies: createWave(1),
  particles: [],
  stars: createStars(),
  drops: [],
  boss: null,
  score: 0,
  lives: 3,
  level: 1,
  lastShot: 0,
  invulnerable: 120,
  formationOffset: 0,
  formationDir: 1,
  waveBanner: 120,
  time: 0,
  weapon: 'normal',
  weaponTimer: 0,
  shield: false,
  laserOn: false,
  announce: null,
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
  } else if (e.kind === 'sniper') {
    // Rombo con dos cañones
    ctx.beginPath();
    ctx.moveTo(0, -13);
    ctx.lineTo(13, 0);
    ctx.lineTo(0, 13);
    ctx.lineTo(-13, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(-11, 2, 3, 12 + wing / 2);
    ctx.fillRect(8, 2, 3, 12 + wing / 2);
    ctx.fillStyle = c.accent;
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();
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

const drawBoss = (ctx: CanvasRenderingContext2D, b: MiniBoss, playerX: number, time: number) => {
  ctx.save();
  ctx.translate(b.x, b.y);
  const flash = b.hit > 0;
  const wing = Math.sin(time * 0.08) * 6;
  ctx.shadowColor = '#9b4dff';
  ctx.shadowBlur = 20;

  // Alas
  ctx.fillStyle = flash ? '#f4f1ec' : '#3d5afe';
  ctx.beginPath();
  ctx.moveTo(-30, -8);
  ctx.lineTo(-70 - wing, -24);
  ctx.lineTo(-62, 18 + wing);
  ctx.lineTo(-28, 14);
  ctx.closePath();
  ctx.moveTo(30, -8);
  ctx.lineTo(70 + wing, -24);
  ctx.lineTo(62, 18 + wing);
  ctx.lineTo(28, 14);
  ctx.closePath();
  ctx.fill();

  // Cuerpo
  ctx.fillStyle = flash ? '#f4f1ec' : '#9b4dff';
  ctx.beginPath();
  ctx.moveTo(0, -34);
  ctx.lineTo(34, -12);
  ctx.lineTo(38, 18);
  ctx.lineTo(14, 34);
  ctx.lineTo(-14, 34);
  ctx.lineTo(-38, 18);
  ctx.lineTo(-34, -12);
  ctx.closePath();
  ctx.fill();

  // Cañones
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(-26, 20, 6, 18);
  ctx.fillRect(20, 20, 6, 18);

  // Ojo que sigue al jugador
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#f4f1ec';
  ctx.beginPath();
  ctx.ellipse(0, 2, 16, 11, 0, 0, Math.PI * 2);
  ctx.fill();
  const look = Math.max(-8, Math.min(8, (playerX - b.x) / 20));
  ctx.fillStyle = '#0a0a0a';
  ctx.beginPath();
  ctx.arc(look, 4, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

const drawDrop = (ctx: CanvasRenderingContext2D, d: Drop) => {
  const info = DROPS[d.kind];
  const bob = Math.sin(d.t * 0.15) * 2;
  ctx.save();
  ctx.translate(d.x, d.y + bob);
  ctx.rotate(Math.sin(d.t * 0.08) * 0.25);
  ctx.shadowColor = info.color;
  ctx.shadowBlur = 14 + Math.sin(d.t * 0.2) * 6;
  ctx.fillStyle = info.color;
  ctx.fillRect(-13, -13, 26, 26);
  ctx.shadowBlur = 0;
  ctx.strokeStyle = '#f4f1ec';
  ctx.lineWidth = 2;
  ctx.strokeRect(-13, -13, 26, 26);
  ctx.fillStyle = info.ink;
  ctx.font = '18px Anton, Impact, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(info.letter, 0, 1);
  ctx.restore();
};

const pickDrop = (): DropKind => {
  const kinds = Object.keys(DROPS) as DropKind[];
  const total = kinds.reduce((sum, k) => sum + DROPS[k].weight, 0);
  let r = Math.random() * total;
  for (const k of kinds) {
    r -= DROPS[k].weight;
    if (r <= 0) return k;
  }
  return 'double';
};

// ── Componente ──────────────────────────────────────────────
const GalagaGame = () => {
  const { t, language } = useLanguage();
  const es = language === 'es';
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

    const announce = (s: GameState, text: string, color = '#f4f1ec') => {
      s.announce = { text, color, life: 90 };
    };

    const startLevel = (s: GameState) => {
      s.enemyBullets = [];
      s.waveBanner = 140;
      if (isBossLevel(s.level)) {
        s.enemies = [];
        s.boss = createBoss(s.level);
      } else {
        s.enemies = createWave(s.level);
      }
    };

    const maybeDrop = (s: GameState, x: number, y: number, chance: number) => {
      if (Math.random() < chance) s.drops.push({ x, y, kind: pickDrop(), t: 0 });
    };

    const killEnemy = (s: GameState, e: Enemy) => {
      const c = COLORS[e.kind];
      if (!e.summoned) s.score += e.state === 'diving' ? c.divePoints : c.points;
      explode(s, e.x, e.y, c.main);
      maybeDrop(s, e.x, e.y, e.kind === 'boss' || e.kind === 'sniper' ? DROP_CHANCE * 2 : DROP_CHANCE);
    };

    const damageEnemy = (s: GameState, e: Enemy, dmg: number) => {
      e.hp -= dmg;
      if (e.hp <= 0) killEnemy(s, e);
      else explode(s, e.x, e.y, '#3d5afe', 5);
    };

    const damageBoss = (s: GameState, dmg: number) => {
      const b = s.boss;
      if (!b || b.y < 60) return;
      b.hp -= dmg;
      b.hit = 5;
      if (b.hp <= 0) {
        for (let i = 0; i < 4; i++) explode(s, b.x + (Math.random() - 0.5) * 80, b.y + (Math.random() - 0.5) * 40, i % 2 ? '#9b4dff' : '#3d5afe', 40);
        s.score += 2000 * b.tier;
        // Recompensa garantizada: una vida y un arma
        s.drops.push({ x: b.x - 30, y: b.y, kind: 'life', t: 0 });
        const weapons: DropKind[] = ['double', 'spread', 'heavy', 'laser'];
        s.drops.push({ x: b.x + 30, y: b.y, kind: weapons[Math.floor(Math.random() * weapons.length)], t: 0 });
        s.enemies.forEach((e) => {
          if (e.summoned) explode(s, e.x, e.y, '#f4f1ec', 8);
        });
        s.enemies = s.enemies.filter((e) => !e.summoned);
        s.enemyBullets = [];
        announce(s, 'BOSS DOWN!', '#9b4dff');
        s.boss = null;
      }
    };

    const hitPlayer = (s: GameState) => {
      if (s.shield) {
        s.shield = false;
        s.invulnerable = 70;
        explode(s, s.playerX, PLAYER_Y, '#f4f1ec', 20);
        return;
      }
      explode(s, s.playerX, PLAYER_Y, '#9b4dff', 40);
      s.enemyBullets = [];
      s.lives--;
      // Como en Metal Slug: al morir pierdes el arma especial
      s.weapon = 'normal';
      s.weaponTimer = 0;
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
    };

    const startDive = (s: GameState, e: Enemy) => {
      const targetX = Math.max(20, Math.min(W - 20, s.playerX + (Math.random() - 0.5) * 120));
      const swing = 90 + Math.min(s.level * 6, 60);
      e.state = 'diving';
      e.path = bezier({ x: e.x, y: e.y }, { x: e.x + (e.x < W / 2 ? -swing : swing), y: e.y + 140 }, { x: targetX, y: H + 40 }, 90);
      e.pathIndex = 0;
    };

    const aimedBullet = (s: GameState, x: number, y: number, speed: number, spread = 0, big = false): Bullet => {
      const ang = Math.atan2(PLAYER_Y - y, s.playerX - x) + spread;
      return { x, y, vx: Math.cos(ang) * speed, vy: Math.sin(ang) * speed, big };
    };

    const updateBoss = (s: GameState) => {
      const b = s.boss;
      if (!b) return;
      if (b.hit > 0) b.hit--;
      if (b.y < 120) {
        b.y += 1.2;
        return;
      }
      b.x = W / 2 + Math.sin(s.time * 0.012 * (1 + b.tier * 0.15)) * 150;
      b.timer--;

      if (b.attack === 'spread' && (b.timer === 60 || (b.tier >= 2 && b.timer === 25))) {
        const n = 7 + b.tier * 2;
        const offset = b.timer === 25 ? 0.08 : 0;
        for (let i = 0; i < n; i++) {
          const ang = Math.PI / 2 + (i / (n - 1) - 0.5) * 1.9 + offset;
          const sp = 3 + b.tier * 0.3;
          s.enemyBullets.push({ x: b.x, y: b.y + 30, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, big: true });
        }
      } else if (b.attack === 'aimed' && b.timer > 20 && b.timer % 10 === 0) {
        s.enemyBullets.push(aimedBullet(s, b.x - 23, b.y + 38, 4.3 + b.tier * 0.2));
        s.enemyBullets.push(aimedBullet(s, b.x + 23, b.y + 38, 4.3 + b.tier * 0.2));
      } else if (b.attack === 'laser' && b.timer < 40 && b.timer > 0) {
        // Rayo vertical: primero avisa (carga) y luego dispara
        if (Math.abs(s.playerX - b.laserX) < 22 && s.invulnerable === 0) hitPlayer(s);
      } else if (b.attack === 'summon' && b.timer === 50) {
        for (let i = 0; i < 3 + b.tier; i++) {
          const e: Enemy = {
            kind: 'bee',
            hp: 1,
            homeX: b.x,
            homeY: b.y,
            x: b.x,
            y: b.y + 20,
            state: 'diving',
            path: [],
            pathIndex: 0,
            delay: 0,
            flap: Math.random() * 6,
            summoned: true,
          };
          const targetX = Math.max(20, Math.min(W - 20, s.playerX + (i - 1.5) * 70));
          e.path = bezier({ x: b.x, y: b.y + 20 }, { x: b.x + (i % 2 ? -160 : 160), y: b.y + 200 }, { x: targetX, y: H + 40 }, 110);
          s.enemies.push(e);
        }
      }

      if (b.timer <= 0) {
        b.attackIndex = (b.attackIndex + 1) % BOSS_ATTACKS.length;
        b.attack = BOSS_ATTACKS[b.attackIndex];
        b.timer = b.attack === 'laser' ? 110 : Math.max(90, 140 - b.tier * 10);
        if (b.attack === 'laser') b.laserX = s.playerX;
      }
    };

    const fire = (s: GameState) => {
      const w = WEAPONS[s.weapon];
      const now = performance.now();
      if (now - s.lastShot < w.cooldown || s.bullets.length >= w.max) return;
      s.lastShot = now;
      const y = PLAYER_Y - 22;
      if (s.weapon === 'double') {
        s.bullets.push({ x: s.playerX - 9, y, vx: 0, vy: -10 }, { x: s.playerX + 9, y, vx: 0, vy: -10 });
      } else if (s.weapon === 'spread') {
        [-2.2, 0, 2.2].forEach((vx) => s.bullets.push({ x: s.playerX, y, vx, vy: -9, orb: true }));
      } else if (s.weapon === 'heavy') {
        s.bullets.push({ x: s.playerX + (Math.random() - 0.5) * 8, y, vx: (Math.random() - 0.5) * 0.8, vy: -12 });
      } else {
        s.bullets.push({ x: s.playerX, y, vx: 0, vy: -10 });
      }
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
      if (s.announce && --s.announce.life <= 0) s.announce = null;

      // Arma especial con tiempo limitado
      if (s.weapon !== 'normal' && --s.weaponTimer <= 0) s.weapon = 'normal';

      s.laserOn = s.weapon === 'laser' && keys.fire;
      if (s.laserOn) {
        if (s.time % 5 === 0) {
          for (const e of s.enemies) {
            if (e.hp > 0 && Math.abs(e.x - s.playerX) < 16 && e.y < PLAYER_Y && !(e.state === 'entering' && e.delay > 0)) damageEnemy(s, e, 1);
          }
          if (s.boss && Math.abs(s.boss.x - s.playerX) < 60) damageBoss(s, 1);
        }
      } else if (keys.fire) {
        fire(s);
      }

      s.bullets.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
      });
      s.bullets = s.bullets.filter((b) => b.y > -10 && b.x > -10 && b.x < W + 10);
      s.enemyBullets.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
      });
      s.enemyBullets = s.enemyBullets.filter((b) => b.y < H + 10 && b.x > -10 && b.x < W + 10);

      // Movimiento lateral de la formación (más amplio en niveles altos)
      const sway = 28 + Math.min(s.level * 3, 30);
      s.formationOffset += (0.35 + Math.min(s.level * 0.03, 0.4)) * s.formationDir;
      if (Math.abs(s.formationOffset) > sway) s.formationDir *= -1;

      const diveChance = 0.004 + s.level * 0.0015;
      const fireChance = 0.004 + s.level * 0.0012;
      const divingCount = s.enemies.filter((e) => e.state === 'diving' && !e.summoned).length;
      const diveSpeed = 1 + Math.min(s.level * 0.15, 1.5);

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
          if (divingCount < 2 + Math.floor(s.level / 2) && Math.random() < diveChance / 6) startDive(s, e);
          if (Math.random() < fireChance / 10) {
            s.enemyBullets.push({ x: e.x, y: e.y + 10, vx: 0, vy: 3 + s.level * 0.2 });
          }
          // El francotirador dispara ráfagas de tres apuntadas al jugador
          if (e.kind === 'sniper' && Math.random() < fireChance / 4) {
            [-0.15, 0, 0.15].forEach((sp) => s.enemyBullets.push(aimedBullet(s, e.x, e.y + 12, 3.6 + s.level * 0.1, sp)));
          }
        } else {
          e.pathIndex += e.summoned ? 1.4 : diveSpeed;
          const idx = Math.floor(e.pathIndex);
          if (idx >= e.path.length) {
            if (e.summoned) {
              e.hp = 0;
              continue;
            }
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
              s.enemyBullets.push(aimedBullet(s, e.x, e.y + 10, 3.2 + s.level * 0.25));
            }
          }
        }
      }
      // Los invocados que salen de pantalla se quitan sin dar puntos
      s.enemies = s.enemies.filter((e) => e.hp > 0);

      updateBoss(s);

      // Colisiones: balas del jugador contra enemigos y mini jefe
      for (const b of s.bullets) {
        for (const e of s.enemies) {
          if (e.hp > 0 && Math.abs(b.x - e.x) < 15 && Math.abs(b.y - e.y) < 14) {
            damageEnemy(s, e, 1);
            b.y = -100;
            break;
          }
        }
        if (b.y > -100 && s.boss && Math.abs(b.x - s.boss.x) < 56 && Math.abs(b.y - s.boss.y) < 30) {
          damageBoss(s, 1);
          explode(s, b.x, b.y, '#c9a3ff', 3);
          b.y = -100;
        }
      }
      s.enemies = s.enemies.filter((e) => e.hp > 0);

      // Colisiones contra el jugador
      if (s.invulnerable === 0 && statusRef.current === 'playing') {
        const hitByBullet = s.enemyBullets.some((b) => {
          const r = b.big ? 18 : 14;
          return Math.abs(b.x - s.playerX) < r && Math.abs(b.y - PLAYER_Y) < r + 2;
        });
        const rammed = s.enemies.find((e) => Math.abs(e.x - s.playerX) < 22 && Math.abs(e.y - PLAYER_Y) < 20);
        if (rammed) {
          rammed.hp = 0;
          explode(s, rammed.x, rammed.y, COLORS[rammed.kind].main);
          s.enemies = s.enemies.filter((e) => e.hp > 0);
        }
        if (hitByBullet || rammed) hitPlayer(s);
      }

      // Power-ups que caen
      for (const d of s.drops) {
        d.y += 1.7;
        d.t++;
        if (Math.abs(d.x - s.playerX) < 24 && Math.abs(d.y - PLAYER_Y) < 26) {
          const info = DROPS[d.kind];
          if (d.kind === 'life') s.lives = Math.min(MAX_LIVES, s.lives + 1);
          else if (d.kind === 'shield') s.shield = true;
          else {
            s.weapon = d.kind;
            s.weaponTimer = WEAPONS[d.kind].duration;
          }
          s.score += 100;
          announce(s, info.announce, info.color);
          explode(s, d.x, d.y, info.color, 14);
          d.y = H + 100;
        }
      }
      s.drops = s.drops.filter((d) => d.y < H + 20);

      // Siguiente nivel
      if (!s.boss && s.enemies.length === 0) {
        s.level++;
        startLevel(s);
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
      if (s.boss) {
        const g = ctx.createLinearGradient(0, 0, 0, H * 0.6);
        g.addColorStop(0, 'rgba(155,77,255,0.16)');
        g.addColorStop(1, 'rgba(155,77,255,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // Estrellas tenues para que las balas resalten
      const moving = statusRef.current !== 'paused';
      const starBoost = 1 + Math.min(s.level, 10) * 0.08;
      for (const st of s.stars) {
        if (moving) {
          st.y += st.speed * starBoost;
          if (st.y > H) {
            st.y = 0;
            st.x = Math.random() * W;
          }
        }
        ctx.fillStyle = st.color;
        ctx.globalAlpha = 0.1 + st.speed * 0.09;
        ctx.fillRect(st.x, st.y, 1, st.speed * 1.5);
      }
      ctx.globalAlpha = 1;

      if (statusRef.current === 'idle') return;

      // Aviso y rayo del mini jefe
      const b = s.boss;
      if (b && b.attack === 'laser' && b.timer > 0) {
        if (b.timer >= 40) {
          ctx.globalAlpha = 0.35 + Math.sin(s.time * 0.6) * 0.3;
          ctx.strokeStyle = '#f4f1ec';
          ctx.setLineDash([8, 8]);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(b.laserX, b.y + 30);
          ctx.lineTo(b.laserX, H);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.globalAlpha = 1;
        } else {
          ctx.shadowColor = '#3d5afe';
          ctx.shadowBlur = 30;
          ctx.fillStyle = 'rgba(61,90,254,0.55)';
          ctx.fillRect(b.laserX - 22, b.y + 30, 44, H);
          ctx.fillStyle = '#f4f1ec';
          ctx.fillRect(b.laserX - 7, b.y + 30, 14, H);
          ctx.shadowBlur = 0;
        }
      }

      for (const e of s.enemies) {
        if (e.state === 'entering' && e.delay > 0) continue;
        drawEnemy(ctx, e, s.time);
      }
      if (b) drawBoss(ctx, b, s.playerX, s.time);

      // Láser del jugador
      if (s.laserOn) {
        const flick = Math.random() * 4;
        ctx.shadowColor = '#9b4dff';
        ctx.shadowBlur = 24;
        ctx.fillStyle = 'rgba(155,77,255,0.55)';
        ctx.fillRect(s.playerX - 11 - flick / 2, 0, 22 + flick, PLAYER_Y - 22);
        ctx.fillStyle = '#f4f1ec';
        ctx.fillRect(s.playerX - 3, 0, 6, PLAYER_Y - 22);
        ctx.shadowBlur = 0;
      }

      // Balas del jugador: brillantes y con estela
      ctx.shadowBlur = 16;
      ctx.shadowColor = '#c9a3ff';
      for (const bl of s.bullets) {
        if (bl.orb) {
          ctx.fillStyle = '#9b4dff';
          ctx.beginPath();
          ctx.arc(bl.x, bl.y, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#f4f1ec';
          ctx.beginPath();
          ctx.arc(bl.x, bl.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = 'rgba(155,77,255,0.6)';
          ctx.fillRect(bl.x - 4, bl.y - 6, 8, 26);
          ctx.fillStyle = '#f4f1ec';
          ctx.fillRect(bl.x - 2, bl.y - 10, 4, 20);
        }
      }

      // Balas enemigas: azul con núcleo blanco
      ctx.shadowColor = '#3d5afe';
      for (const bl of s.enemyBullets) {
        const r = bl.big ? 7 : 5;
        ctx.fillStyle = '#3d5afe';
        ctx.beginPath();
        ctx.arc(bl.x, bl.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#f4f1ec';
        ctx.beginPath();
        ctx.arc(bl.x, bl.y, r * 0.45, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      s.drops.forEach((d) => drawDrop(ctx, d));

      if (statusRef.current !== 'over') {
        drawPlayer(ctx, s.playerX, PLAYER_Y, s.invulnerable > 0 && Math.floor(s.invulnerable / 6) % 2 === 0);
        if (s.shield) {
          ctx.strokeStyle = '#f4f1ec';
          ctx.globalAlpha = 0.5 + Math.sin(s.time * 0.2) * 0.3;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(s.playerX, PLAYER_Y, 30, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      s.particles.forEach((p) => {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
      });
      ctx.globalAlpha = 1;

      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';

      // Barra de vida del mini jefe
      if (b) {
        ctx.fillStyle = '#f4f1ec';
        ctx.font = '16px Anton, Impact, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${t('arcade.boss').toUpperCase()} · ${b.name}`, 20, 26);
        ctx.fillStyle = 'rgba(244,241,236,0.15)';
        ctx.fillRect(20, 34, W - 40, 8);
        ctx.fillStyle = '#9b4dff';
        ctx.fillRect(20, 34, (W - 40) * Math.max(0, b.hp / b.maxHp), 8);
        ctx.textAlign = 'center';
      }

      // Arma activa y tiempo restante
      if (s.weapon !== 'normal') {
        const w = WEAPONS[s.weapon];
        ctx.textAlign = 'left';
        ctx.fillStyle = '#9b4dff';
        ctx.font = '15px Anton, Impact, sans-serif';
        ctx.fillText(w.name, 12, H - 14);
        ctx.fillStyle = 'rgba(244,241,236,0.2)';
        ctx.fillRect(12, H - 10, 120, 4);
        ctx.fillStyle = '#f4f1ec';
        ctx.fillRect(12, H - 10, 120 * (s.weaponTimer / w.duration), 4);
        ctx.textAlign = 'center';
      }

      if (s.waveBanner > 0 && statusRef.current === 'playing') {
        ctx.globalAlpha = Math.min(1, s.waveBanner / 40);
        ctx.fillStyle = isBossLevel(s.level) ? '#9b4dff' : '#f4f1ec';
        ctx.font = '44px Anton, Impact, sans-serif';
        const label = isBossLevel(s.level) ? t('arcade.boss').toUpperCase() : `${t('arcade.wave').toUpperCase()} ${s.level}`;
        ctx.fillText(label, W / 2, H / 2 + 40);
        if (isBossLevel(s.level) && b) {
          ctx.fillStyle = '#f4f1ec';
          ctx.font = '22px Anton, Impact, sans-serif';
          ctx.fillText(b.name, W / 2, H / 2 + 72);
        }
        ctx.globalAlpha = 1;
      }

      // Anuncio estilo Metal Slug al recoger un power-up
      if (s.announce) {
        const a = s.announce;
        const scale = 1 + Math.max(0, (a.life - 75) / 15) * 0.4;
        ctx.save();
        ctx.translate(W / 2, H * 0.42);
        ctx.scale(scale, scale);
        ctx.globalAlpha = Math.min(1, a.life / 20);
        ctx.font = '34px Anton, Impact, sans-serif';
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#0a0a0a';
        ctx.strokeText(a.text, 0, 0);
        ctx.fillStyle = a.color;
        ctx.fillText(a.text, 0, 0);
        ctx.restore();
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

  const powerUps: { kind: DropKind; label: string }[] = [
    { kind: 'double', label: es ? 'Doble disparo' : 'Double shot' },
    { kind: 'spread', label: es ? 'Disparo triple' : 'Spread gun' },
    { kind: 'heavy', label: 'Heavy machine gun' },
    { kind: 'laser', label: es ? 'Láser' : 'Laser' },
    { kind: 'shield', label: es ? 'Escudo' : 'Shield' },
    { kind: 'life', label: es ? 'Vida extra' : 'Extra life' },
  ];

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
            <div className="mt-8 grid grid-cols-4 gap-2 text-center">
              {[
                { label: 'Bee', pts: 50, color: 'bg-paper' },
                { label: 'Butterfly', pts: 80, color: 'bg-[#7b8cff]' },
                { label: 'Sniper', pts: 120, color: 'bg-cobalt' },
                { label: 'Boss', pts: 150, color: 'bg-violet' },
              ].map((e) => (
                <div key={e.label} className="border border-paper/20 p-2">
                  <span className={`inline-block w-4 h-4 rotate-45 ${e.color}`} />
                  <p className="tag !text-[0.55rem] mt-2">{e.label}</p>
                  <p className="font-display text-2xl">{e.pts}</p>
                </div>
              ))}
            </div>

            <h4 className="font-wide uppercase text-sm mt-10 mb-4">Power-ups</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {powerUps.map((p) => (
                <div key={p.kind} className="flex items-center gap-3">
                  <span
                    className="w-7 h-7 shrink-0 flex items-center justify-center font-display text-base border-2 border-paper"
                    style={{ background: DROPS[p.kind].color, color: DROPS[p.kind].ink }}
                  >
                    {DROPS[p.kind].letter}
                  </span>
                  <span className="text-sm text-paper/70 leading-tight">{p.label}</span>
                </div>
              ))}
            </div>
            <p className="font-hand text-lg text-cobalt mt-6 -rotate-2">
              {es ? 'caen muy de vez en cuando · mini jefe cada 5 niveles' : 'they drop very rarely · mini boss every 5 levels'}
            </p>
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
