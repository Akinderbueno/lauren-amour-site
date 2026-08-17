const COLORS = ["#ff0074", "#ff2ec4", "#ffd23f", "#ffffff", "#ff7ed4"];

function seededRandom(seed) {
  let t = seed + 0x6d2b79f5;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function Sparkle({ style }) {
  return (
    <svg viewBox="0 0 24 24" className="sparkle" style={style} fill="currentColor">
      <path d="M12 0c.6 4.8 1.6 7.8 3.4 9.6C17.2 11.4 20.2 12.4 25 13c-4.8.6-7.8 1.6-9.6 3.4C13.6 18.2 12.6 21.2 12 26c-.6-4.8-1.6-7.8-3.4-9.6C6.8 14.6 3.8 13.6-1 13c4.8-.6 7.8-1.6 9.6-3.4C10.4 7.8 11.4 4.8 12 0Z" />
    </svg>
  );
}

export default function Sparkles({ count = 14, seed = 1, className = "" }) {
  const rand = seededRandom(seed);
  const sparkles = Array.from({ length: count }, (_, i) => {
    const size = 6 + rand() * 16;
    return {
      id: i,
      top: `${rand() * 100}%`,
      left: `${rand() * 100}%`,
      size,
      color: COLORS[Math.floor(rand() * COLORS.length)],
      delay: `${(rand() * 4).toFixed(2)}s`,
      duration: `${(2.5 + rand() * 3).toFixed(2)}s`,
    };
  });

  return (
    <div className={`sparkle-field ${className}`} aria-hidden="true">
      {sparkles.map((s) => (
        <Sparkle
          key={s.id}
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            color: s.color,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  );
}
