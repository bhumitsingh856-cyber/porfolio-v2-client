import type { ReactNode } from "react";

export function SectionLabel({
  index,
  children,
  className = "",
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground ${className}`}
    >
      {index ? <span className="mr-2 text-foreground/50">{index}</span> : null}
      {children}
    </p>
  );
}
