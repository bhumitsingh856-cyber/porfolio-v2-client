"use client"
import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { profile } from "@/lib/profile";

export function Certificates() {
  return (
    <section id="certificates" className="relative bg-background">
      <div className="mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-40">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6 md:mb-20">
            <div>
              <SectionLabel index="(04)">Certificates & Badges</SectionLabel>
              <h2 className="text-display mt-4 text-[clamp(2.25rem,6vw,5rem)] font-medium">
                Credentials
                <span className="text-muted-foreground"> — receipts of the craft.</span>
              </h2>
            </div>
            <Link
              href="/certificates"
              className="hidden shrink-0 text-sm font-medium md:inline-flex"
            >
              All credentials →
            </Link>
          </div>
        </Reveal>

        <ul className="grid gap-px overflow-hidden border hairline md:grid-cols-2 lg:grid-cols-3">
          {profile.certificates.map((c, i) => (   
            <Reveal key={i} delay={i * 0.04}>
              <li className="group relative h-full bg-background">
                  <img src={c.image} className="absolute opacity-100 w-40 " alt="" />
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-full flex-col justify-between gap-10 p-8 transition-colors duration-300 hover:bg-foreground/[0.02] md:p-10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      aria-hidden
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border hairline font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:border-foreground group-hover:text-foreground"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                      {c.year}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-display text-[clamp(1.125rem,1.4vw,1.5rem)] font-medium leading-tight">
                      {c.name}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {c.issuer}
                    </p>
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">
                        ID · {c.credentialId}
                      </span>
                      <span className="text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        Verify →
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
