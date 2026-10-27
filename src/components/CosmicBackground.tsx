import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  hue: number;
  twinkle: number;
}

// Fondo animado: campo de estrellas con parallax, auroras y halo que sigue al cursor
const CosmicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let frame = 0;
    let scrollY = window.scrollY;
    let shooting: { x: number; y: number; vx: number; vy: number; life: number } | null = null;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor((width * height) / 5000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.9 + 0.1,
        size: Math.random() * 1.4 + 0.3,
        // Morados, blancos y azules
        hue: [270, 280, 0, 200, 215][Math.floor(Math.random() * 5)],
        twinkle: Math.random() * Math.PI * 2,
      }));
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const onMove = (e: PointerEvent) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        const y = (((s.y - scrollY * s.z * 0.35) % height) + height) % height;
        const alpha = 0.45 + Math.sin(t * 0.002 + s.twinkle) * 0.35;
        const sat = s.hue === 0 ? 0 : 90;
        ctx.fillStyle = `hsla(${s.hue}, ${sat}%, ${s.hue === 0 ? 100 : 75}%, ${alpha * s.z + 0.15})`;
        ctx.beginPath();
        ctx.arc(s.x, y, s.size * s.z + 0.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Estrella fugaz ocasional
      if (!shooting && Math.random() < 0.004) {
        shooting = {
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.4,
          vx: 9 + Math.random() * 5,
          vy: 3 + Math.random() * 3,
          life: 1,
        };
      }
      if (shooting) {
        const grad = ctx.createLinearGradient(shooting.x, shooting.y, shooting.x - shooting.vx * 12, shooting.y - shooting.vy * 12);
        grad.addColorStop(0, `rgba(255,255,255,${shooting.life})`);
        grad.addColorStop(0.4, `rgba(195,141,255,${shooting.life * 0.6})`);
        grad.addColorStop(1, 'rgba(56,189,248,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shooting.x, shooting.y);
        ctx.lineTo(shooting.x - shooting.vx * 12, shooting.y - shooting.vy * 12);
        ctx.stroke();
        shooting.x += shooting.vx;
        shooting.y += shooting.vy;
        shooting.life -= 0.012;
        if (shooting.life <= 0 || shooting.x > width + 100) shooting = null;
      }

      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="aurora-blob w-[55vw] h-[55vw] -top-[20vw] -left-[15vw] bg-orchid-600/30" />
      <div className="aurora-blob w-[45vw] h-[45vw] top-[30vh] -right-[18vw] bg-azure-500/20" style={{ animationDelay: '-6s' }} />
      <div className="aurora-blob w-[40vw] h-[40vw] -bottom-[15vw] left-[20vw] bg-orchid-800/40" style={{ animationDelay: '-12s' }} />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-60 transition-transform duration-300 ease-out hidden md:block"
        style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.16) 0%, rgba(56,189,248,0.06) 35%, transparent 65%)' }}
      />
      {/* Viñeta para profundidad */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,2,11,0.85) 100%)' }} />
    </div>
  );
};

export default CosmicBackground;
