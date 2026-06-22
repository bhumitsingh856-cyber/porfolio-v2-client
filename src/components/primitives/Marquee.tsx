type Props = {
  items: string[];
  speed?: number; // seconds per loop
  className?: string;
};

export function Marquee({ items, speed = 40, className = "" }: Props) {
  const loop = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden>
      <div
        className="flex w-max gap-12 whitespace-nowrap will-change-transform"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {loop.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-12">
            <span>{item}</span>
            <span className="text-foreground/30">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}
