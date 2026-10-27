import { CSSProperties, useEffect, useRef, useState } from 'react';

// Trazos hechos "a mano" que se dibujan cuando aparecen en pantalla
const shapes = {
  circle: {
    viewBox: '0 0 200 80',
    d: 'M24 46 C 14 16, 168 4, 190 34 C 204 62, 118 80, 58 73 C 16 68, 4 48, 30 27 C 52 12, 112 8, 158 18',
  },
  underline: {
    viewBox: '0 0 200 30',
    d: 'M4 20 C 50 8, 120 24, 196 9',
  },
  zigzag: {
    viewBox: '0 0 120 170',
    d: 'M104 8 C 18 18, 6 52, 60 58 C 116 64, 112 96, 30 104 C -12 110, 36 146, 112 160',
  },
  squiggle: {
    viewBox: '0 0 160 80',
    d: 'M4 70 C 18 8, 30 8, 40 60 C 50 8, 62 8, 72 60 C 82 8, 94 8, 104 60 C 114 14, 128 8, 156 6',
  },
  arrow: {
    viewBox: '0 0 120 60',
    d: 'M6 50 C 40 8, 82 8, 110 30 M94 16 L112 31 L92 42',
  },
  star: {
    viewBox: '0 0 60 60',
    d: 'M30 4 L36 24 L56 26 L40 38 L46 57 L30 46 L14 57 L20 38 L4 26 L24 24 Z',
  },
};

interface ScribbleProps {
  shape: keyof typeof shapes;
  className?: string;
  color?: string;
  strokeWidth?: number;
  delay?: number;
  style?: CSSProperties;
}

const Scribble = ({ shape, className = '', color = '#9b4dff', strokeWidth = 4, delay = 0, style }: ScribbleProps) => {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);
  const { viewBox, d } = shapes[shape];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setDrawn(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={`scribble pointer-events-none ${drawn ? 'drawn' : ''} ${className}`}
      style={style}
    >
      <path
        d={d}
        pathLength={1}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        style={{ transitionDelay: `${delay}ms` }}
      />
    </svg>
  );
};

export default Scribble;
