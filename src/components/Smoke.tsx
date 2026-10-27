// Líneas fluidas tipo seda/humo, como en la referencia en blanco y negro
const Smoke = ({ className = '' }: { className?: string }) => {
  const lines = Array.from({ length: 22 }, (_, i) => {
    const o = i * 7;
    return `M${260 + o} -20 C ${120 + o} 140, ${420 - o / 2} 260, ${240 + o / 3} 420 S ${60 + o} 640, ${300 + o / 2} 820`;
  });

  return (
    <svg
      viewBox="0 0 500 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={`pointer-events-none animate-sway ${className}`}
    >
      <defs>
        <linearGradient id="smoke-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4f1ec" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#c9a3ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3d5afe" stopOpacity="0.2" />
        </linearGradient>
        <filter id="smoke-blur">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>
      <g filter="url(#smoke-blur)" stroke="url(#smoke-grad)" fill="none">
        {lines.map((d, i) => (
          <path key={i} d={d} strokeWidth={i % 5 === 0 ? 2.2 : 0.8} opacity={0.25 + (i % 4) * 0.12} />
        ))}
      </g>
    </svg>
  );
};

export default Smoke;
