import Link from "next/link";
import { projects } from "@/lib/projects";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Bhumit Singh",
  description:
    "Selected projects by Bhumit Singh — multi-agent research systems, AI chat platforms, social apps and AI-powered tooling.",
  openGraph: {
    title: "Work — Bhumit Singh",
    description: "Selected projects and case studies.",
  },
};

export default function WorkPage() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1600px] px-6 pt-40 pb-28 md:px-10 md:pt-48 md:pb-40">
        <Reveal>
          <SectionLabel index="(W)">Work · 2025 — Present</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-display mt-6 text-[clamp(3rem,10vw,9rem)] font-semibold">
            Selected work.
          </h1>
        </Reveal>

        <ul className="mt-20 border-t hairline">
          {projects.map((p, i) => (
            <li key={p.slug} className="border-b hairline">
              <Link
                href={`/work/${p.slug}`}
                className="group grid gap-4 py-8 md:grid-cols-12 md:items-baseline md:gap-6 md:py-12"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground md:col-span-1">
                  ({String(i + 1).padStart(2, "0")})
                </span>
                <span className="text-display text-[clamp(2rem,6vw,5rem)] font-medium leading-[0.95] md:col-span-6">
                  {p.name}
                </span>
                <span className="text-sm text-muted-foreground md:col-span-3">
                  {p.role}
                </span>
                <span className="inline-flex items-center justify-end gap-2 text-sm md:col-span-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                    {p.year}
                  </span>
                  <span
                    aria-hidden
                    className="grid h-9 w-9 place-items-center rounded-full border hairline transition-transform group-hover:rotate-45"
                  >
                    ↗
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}