import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { profile } from "@/lib/profile";

export function AboutPreview() {
  return (
    <section className="relative bg-background">
      <div className="mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <SectionLabel index="(03)">About</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-display mt-6 text-[clamp(1.75rem,3vw,2.75rem)] font-medium leading-[1.05]">
                Engineer based in Indore. Curious about systems that learn, and
                interfaces that don’t get in the way.
              </p>
            </Reveal>
          </div>
          <div className="space-y-6 md:col-span-6 md:col-start-7">
            {profile.bio.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.05}>
                <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                  {p}
                </p>
              </Reveal>
            ))}
            <Reveal delay={0.25}>
              <Link
                href="/about"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium"
              >
                More about me →
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 grid gap-8 border-t hairline pt-10 md:grid-cols-4">
          {Object.entries(profile.skills).map(([cat, items], i) => (
            <Reveal key={cat} delay={i * 0.05}>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {cat}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
