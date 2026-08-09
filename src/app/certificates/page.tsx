import { profile } from "@/lib/profile";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionLabel } from "@/components/primitives/SectionLabel";


export default function CertificatesPage() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1600px] px-6 pt-40 pb-28 md:px-10 md:pt-48 md:pb-40">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <SectionLabel index="(C)">Certificates</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-display mt-6 text-[clamp(2.5rem,8vw,7rem)] font-semibold leading-[0.95]">
                Credentials
                <br />
                <span className="italic text-muted-foreground">& badges.</span>
              </h1>
            </Reveal>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg text-muted-foreground md:mt-12">
                A small archive of courses, programs and badges — every one
                linked to its verifiable source.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden border hairline md:mt-28 md:grid-cols-2">
          {profile.certificates.map((c, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group block h-full bg-background"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-muted">
                  <img
                    src={c.image}
                    alt={`${c.name} — ${c.issuer}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-paper/40 bg-background/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-paper backdrop-blur">
                    {c.year}
                  </span>
                </div>

                <div className="flex flex-col gap-4 p-8 md:p-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                      ({String(i + 1).padStart(2, "0")})
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">
                      ID · {c.credentialId}
                    </span>
                  </div>
                  <h2 className="text-display text-[clamp(1.25rem,1.8vw,1.875rem)] font-medium leading-tight">
                    {c.name}
                  </h2>
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-sm text-muted-foreground">{c.issuer}</p>
                    <span className="text-sm font-medium opacity-60 transition-opacity duration-300 group-hover:opacity-100">
                      Verify →
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
