export function ImagePlaceholder({
  label,
  image,
  ratio = "4 / 3",
  className = "",
}: {
  label: string;
  ratio?: string;
  className?: string;
  image?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-md border hairline  ${className}`}
      style={{ aspectRatio: ratio }}
      aria-label={`${label} preview placeholder`}
      role="img"
    >
      {image && (
        <img
          className="group-hover:scale-105 duration-500"
          src={image}
          alt=""
        />
      )}
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground"></div>
        <div>
          <p className="font-display text-2xl font-medium text-foreground/80 md:text-4xl">
            {label}
          </p>
        </div>
      </div>
      {!image && (
        <svg
          className="absolute inset-0 h-full w-full text-foreground/10"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          aria-hidden
        >
          <line
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            stroke="currentColor"
            strokeWidth="0.3"
          />
          <line
            x1="100"
            y1="0"
            x2="0"
            y2="100"
            stroke="currentColor"
            strokeWidth="0.3"
          />
        </svg>
      )}
    </div>
  );
}
