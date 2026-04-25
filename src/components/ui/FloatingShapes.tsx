// Drifting clouds, stars, and ABC blocks for ambient background.
export const FloatingShapes = ({ density = "med" }: { density?: "low" | "med" | "high" }) => {
  const count = density === "high" ? 9 : density === "low" ? 4 : 6;
  const items = Array.from({ length: count });
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((_, i) => {
        const top = (i * 73) % 90;
        const delay = (i * 1.7) % 8;
        const dur = 22 + ((i * 5) % 14);
        const kind = i % 3;
        return (
          <div
            key={i}
            className="absolute animate-drift"
            style={{ top: `${top}%`, animationDelay: `-${delay}s`, animationDuration: `${dur}s` }}
          >
            {kind === 0 && (
              <svg width="80" height="48" viewBox="0 0 80 48" className="opacity-70 animate-float-slow">
                <ellipse cx="20" cy="30" rx="20" ry="14" fill="white" />
                <ellipse cx="40" cy="22" rx="22" ry="16" fill="white" />
                <ellipse cx="60" cy="32" rx="18" ry="12" fill="white" />
              </svg>
            )}
            {kind === 1 && (
              <svg width="36" height="36" viewBox="0 0 36 36" className="opacity-80 animate-spin-slow">
                <path d="M18 2 L22 14 L34 14 L24 22 L28 34 L18 26 L8 34 L12 22 L2 14 L14 14 Z" fill="hsl(47 100% 62%)" />
              </svg>
            )}
            {kind === 2 && (
              <div className="w-10 h-10 rounded-lg bg-gradient-candy shadow-pop animate-float-med flex items-center justify-center text-white font-display font-bold">
                {"ABCDE"[i % 5]}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
