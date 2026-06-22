"use client"
import Link from "next/link";
import { use, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { getProject, projects, type Project } from "@/lib/projects";
import { ImagePlaceholder } from "@/components/primitives/ImagePlaceholder";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { Marquee } from "@/components/primitives/Marquee";
import { notFound } from "next/navigation";


export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  const prev = projects[(idx - 1 + projects.length) % projects.length];

  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.08]);

  return (
    <article className="bg-background">
      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1600px] px-6 pt-32 md:px-10 md:pt-40">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Index / Work / <span className="text-foreground">{project.name}</span>
        </Link>
      </div>
      <header className="mx-auto max-w-[1600px] px-6 pt-10 pb-14 md:px-10 md:pt-16">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8">
            <Reveal>
              <SectionLabel index={`(${String(idx + 1).padStart(2, "0")})`}>
                Case study · {project.year}
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-display mt-6 text-[clamp(3rem,10vw,10rem)] font-semibold leading-[0.95] tracking-tight">
                {project.name}.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
                {project.tagline}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="md:col-span-4">
            <dl className="grid grid-cols-2 gap-y-6 border-t hairline pt-6 text-sm md:grid-cols-1 md:gap-y-5">
              <Meta label="Role" value={project.role} />
              <Meta label="Year" value={project.year} />
              <Meta
                label="Stack"
                value={project.tech.slice(0, 3).join(" · ") + (project.tech.length > 3 ? " …" : "")}
              />
              <Meta label="Status" value="Shipped" />
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
                >
                  Visit live ↗
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border hairline px-5 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
                >
                  Source ↗
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </header>

      {/* ── Hero image with parallax ───────────────────────────── */}
      <div ref={heroRef} className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="relative overflow-hidden rounded-md">
          <motion.div style={{ y: heroY, scale: heroScale }}>
            <ImagePlaceholder label={project.name} image={project.image} ratio="21 / 9" className="w-full" />
          </motion.div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-6 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground md:p-8">
            <span>fig 01 — cover</span>
            <span>{project.year} ©</span>
          </div>
        </div>
      </div>

      {/* ── Overview ───────────────────────────────────────────── */}
      <section className="mx-auto grid max-w-[1600px] gap-10 px-6 pt-28 pb-20 md:grid-cols-12 md:px-10 md:pt-40">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <SectionLabel index="01">Overview</SectionLabel>
          </div>
        </div>
        <div className="md:col-span-8">
          <Reveal>
            <p className="text-display text-[clamp(1.5rem,2.8vw,2.5rem)] font-medium leading-[1.15] tracking-tight">
              {project.summary}
            </p>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* ── Features ───────────────────────────────────────────── */}
      <section className="mx-auto grid max-w-[1600px] gap-10 px-6 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <SectionLabel index="02">Features</SectionLabel>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Capabilities that define the surface area of the product.
            </p>
          </div>
        </div>
        <ul className="md:col-span-8">
          {project.features.map((f, i) => (
            <Reveal
              key={f}
              delay={i * 0.04}
              as="li"
              className="group flex items-baseline gap-6 border-t hairline py-5 transition-colors hover:bg-foreground/[0.02]"
            >
              <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-display text-lg font-medium md:text-2xl">{f}</span>
              <span
                aria-hidden
                className="ml-auto translate-x-0 text-foreground/30 transition-all group-hover:translate-x-1 group-hover:text-foreground"
              >
                →
              </span>
            </Reveal>
          ))}
        </ul>
      </section>

      <Divider />

      {/* ── Gallery ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="mb-12 flex items-end justify-between">
          <SectionLabel index="03">Gallery</SectionLabel>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground md:block">
            three frames
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-8">
            <ImagePlaceholder label={`${project.name} · screen 01`} image={project.frame1} ratio="16 / 10" />
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 md:pt-16">
            <ImagePlaceholder label="detail" image={project.frame2} ratio="4 / 5" />
          </Reveal>
          <Reveal delay={0.05} className="md:col-span-12">
            <ImagePlaceholder label={`${project.name} · wide`} image={project.frame3} ratio="21 / 9" />
          </Reveal>
        </div>
      </section>

      {/* ── Architecture ───────────────────────────────────────── */}
      {project.architecture && (
        <>
          <Divider />
          <section className="mx-auto grid max-w-[1600px] gap-10 px-6 py-24 md:grid-cols-12 md:px-10 md:py-32">
            <div className="md:col-span-4">
              <div className="md:sticky md:top-32">
                <SectionLabel index="04">Architecture</SectionLabel>
                <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                  System layout — how data, models, and services connect.
                </p>
              </div>
            </div>
            <div className="grid gap-10 md:col-span-8 md:grid-cols-2">
              {project.architecture.map((a, i) => (
                <Reveal key={a.label} delay={i * 0.05} className="border-t hairline pt-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    {a.label}
                  </p>
                  <ul className="mt-4 space-y-2 text-[15px] leading-relaxed">
                    {a.items.map((it) => (
                      <li key={it} className="flex gap-3">
                        <span className="mt-2 inline-block h-[1px] w-3 shrink-0 bg-foreground/40" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </section>
        </>
      )}

      <Divider />

      {/* ── Stack marquee ──────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto mb-8 max-w-[1600px] px-6 md:px-10">
          <SectionLabel index="05">Tech stack</SectionLabel>
        </div>
        <Marquee items={project.tech} speed={50} className="text-display text-[clamp(2.5rem,7vw,6rem)] font-medium tracking-tight" />
      </section>

      {/* ── Pager ──────────────────────────────────────────────── */}
      <div className="border-t hairline">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-6 py-10 md:px-10">
          <Link
            href={`/work/${prev.slug}`}
            className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <span aria-hidden className="transition-transform group-hover:-translate-x-1">←</span>
            Prev · {prev.name}
          </Link>
          <Link
            href="/work"
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
          >
            All work
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Next · {next.name}
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* ── Next project hero teaser ───────────────────────────── */}
      <Link
        href={`/work/${next.slug}`}
        className="group block border-t hairline"
      >
        <div className="mx-auto grid max-w-[1600px] items-end gap-8 px-6 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <div className="md:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              Next project — 0{((idx + 1) % projects.length) + 1}
            </p>
            <h2 className="text-display mt-4 text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.95] tracking-tight transition-transform duration-500 group-hover:-translate-y-1">
              {next.name}.
            </h2>
            <p className="mt-4 max-w-md text-sm text-muted-foreground md:text-base">
              {next.tagline}
            </p>
          </div>
          <div className="md:col-span-5">
            <motion.div
              initial={false}
              whileHover={reduced ? undefined : { scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="object-cover w-full h-full object-center"
            >
              <ImagePlaceholder label={next.name} ratio="4 / 3" />
            </motion.div>
          </div>
        </div>
      </Link>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1.5 text-[15px] font-medium">{value}</dd>
    </div>
  );
}

function Divider() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 md:px-10">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
        className="h-[1px] w-full bg-foreground/15"
      />
    </div>
  );
}