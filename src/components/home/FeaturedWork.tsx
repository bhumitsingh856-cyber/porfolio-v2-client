"use client"
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { projects } from "@/lib/projects";
import { ImagePlaceholder } from "@/components/primitives/ImagePlaceholder";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionLabel } from "@/components/primitives/SectionLabel";

function ProjectRow({
  index,
  project,
}: {
  index: number;
  project: (typeof projects)[number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const flip = index % 2 === 1;

  return (
    <article
      ref={ref}
      className="group grid gap-8 border-t hairline py-10 md:grid-cols-12 md:gap-10 md:py-16"
    >
      <div
        className={`md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}
      >
            <Link href={`/work/${project.slug}`} className="block">
        
          <motion.div style={{ y }} className="relative">
            <ImagePlaceholder
              label={project.name}
              image={project.image}
              ratio="16 / 10"
              className="transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.01]"
            />
          </motion.div>
        </Link>
      </div>

      <div
        className={`flex flex-col justify-between gap-6 md:col-span-4 ${flip ? "md:order-1 md:col-start-2" : "md:col-start-9"}`}
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            <span className="text-foreground/50">
              ({String(index + 1).padStart(2, "0")})
            </span>{" "}
            — {project.year}
          </p>
          <h3 className="text-display mt-3 text-[clamp(2rem,4vw,3.5rem)] font-medium">
            {project.name}
          </h3>
          <p className="mt-3 text-muted-foreground">{project.tagline}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border hairline px-3 py-1 text-[11px] uppercase tracking-wider text-muted-foreground"
            >
              {t}
            </span>
          ))}
          <Link
            href={`/work/${project.slug}`}
            className="ml-auto inline-flex items-center gap-2 text-sm font-medium"
          >
            View case →
          </Link>
        </div>
      </div>
    </article>
  );
}

export function FeaturedWork() {
  return (
    <section id="work" className="relative bg-background">
      <div className="mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-40">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6 md:mb-20">
            <div>
              <SectionLabel index="(02)">Selected Work</SectionLabel>
              <h2 className="text-display mt-4 text-[clamp(2.25rem,6vw,5rem)] font-medium">
                Things I built
                <span className="text-muted-foreground"> — end to end.</span>
              </h2>
            </div>
            <Link
              href="/work"
              className="hidden shrink-0 text-sm font-medium md:inline-flex"
            >
              All projects →
            </Link>
          </div>
        </Reveal>

        <div>
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} index={i} project={p} />
          ))}
        </div>

        <div className="mt-10 flex md:hidden">
          <Link href="/work" className="text-sm font-medium">
            All projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
