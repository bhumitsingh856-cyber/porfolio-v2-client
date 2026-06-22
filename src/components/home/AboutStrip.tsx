"use client";
import { useRef } from "react";
import { useReducedMotion } from "motion/react";
import { useGSAP } from "@gsap/react";

const words = ["BUILDER", "DEVELOPER", "LEARNER", "SHIPPER"];

export function AboutStrip() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(() => {
    if (reduced) return;
    if (!containerRef.current || !trackRef.current) return;

    let mm: any;
    
    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current || !trackRef.current) return;

      mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const distance = () => trackRef.current!.scrollWidth - window.innerWidth;

        gsap.to(trackRef.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      });
    })();
    return () => {
      if (mm) {
        mm.revert(); 
      }
    };
  }, { scope: containerRef, dependencies: [reduced] }); // Bind absolute scope to the parent container

  return (
    <div className="w-full h-auto block-container-fix">
      <section
        ref={containerRef}
        className="relative overflow-hidden bg-foreground text-paper"
      >
        <div className="flex h-[60svh] items-center md:h-[100svh]">
          <div
            ref={trackRef}
            className="flex shrink-0 items-center gap-16 whitespace-nowrap pl-6 pr-[20vw] md:gap-24 md:pl-10"
          >
            {words.map((w) => (
              <span
                key={w}
                className="text-display flex items-center gap-12 text-[clamp(5rem,22vw,22rem)] font-semibold leading-none"
              >
                {w}
                <span aria-hidden className="text-paper/30">
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
