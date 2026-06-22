"use client"
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Marquee } from "@/components/primitives/Marquee";
import { profile } from "@/lib/profile";

export function Hero() {
  const reduced = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    (async () => {
      const gsap = (await import("gsap")).default;
      if (cancelled || !wrap.current) return;
      const chars = wrap.current.querySelectorAll<HTMLElement>("[data-char]");
      gsap.fromTo(
        chars,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.025,
          delay: 0.1,
        },
      );
    })();
    return () => {
      cancelled = true;
    };
  }, [reduced]);

  const line1 = "Bhumit";
  const line2 = "Singh.";

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-foreground text-paper">
      <div className="mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-between px-6 pt-32 pb-10 md:px-10 md:pt-40">
        <div className="grid gap-6 md:grid-cols-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-paper/60 md:col-span-3">
            <span className="text-paper/40">(01)</span> — Portfolio · ’26
          </p>
          <p className="text-balance text-sm leading-relaxed text-paper/70 md:col-span-5 md:col-start-8">
            {profile.about}
          </p>
        </div>

        <div ref={wrap} className="mt-24 md:mt-0">
          <h1 className="text-display select-none text-[clamp(4rem,18vw,16rem)] font-semibold">
            <span className="block overflow-hidden">
              <span className="inline-flex">
                {line1.split("").map((c, i) => (
                  <span
                    key={i}
                    data-char
                    className="inline-block will-change-transform"
                  >
                    {c}
                  </span>
                ))}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-flex items-end">
                <span className="mr-6 inline-block align-baseline text-[0.4em] font-mono uppercase tracking-[0.3em] text-paper/40">
                  {'<BS>'}
                </span>
                {line2.split("").map((c, i) => (
                  <span
                    key={i}
                    data-char
                    className="inline-block will-change-transform"
                  >
                    {c}
                  </span>
                ))}
              </span>
            </span>
          </h1>
        </div>

        <div className="mt-16 grid items-end gap-6 md:grid-cols-12">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-paper/40">
              Available for
            </p>
            <p className="mt-2 text-sm text-paper/80">
              Freelance · Internships · Collaborative builds
            </p>
          </motion.div>

          <motion.a
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            href="#work"
            className="group inline-flex items-center gap-3 self-end md:col-start-11 md:col-span-2 md:justify-end"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
              Scroll
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-paper/30 transition-transform group-hover:translate-y-1">
              ↓
            </span>
          </motion.a>
        </div>
      </div>

      <div className="border-y border-paper/15 py-5 text-[clamp(1.5rem,4vw,2.5rem)] font-display font-medium">
        <Marquee items={profile.roles} speed={45} />
      </div>
    </section>
  );
}
