import { profile } from "@/lib/profile";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { ImagePlaceholder } from "@/components/primitives/ImagePlaceholder";

export default function AboutPage() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1600px] px-6 pt-40 pb-28 md:px-10 md:pt-48 md:pb-40">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <SectionLabel index="(A)">About</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-display mt-6 text-[clamp(2.5rem,8vw,7rem)] font-semibold leading-[0.95]">
                Engineer.
                <br />
                <span className="italic text-muted-foreground">Curious.</span>
                <br />
                Shipping.
              </h1>
            </Reveal>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <Reveal>
              <ImagePlaceholder label={profile.initials} ratio="3 / 4" />
            </Reveal>
          </div>
        </div>

        <div className="mt-24 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel>Bio</SectionLabel>
          </div>
          <div className="space-y-6 md:col-span-7">
            <p className="text-lg leading-relaxed text-foreground md:text-xl">{profile.about}</p>
            {profile.bio.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-lg leading-relaxed text-foreground md:text-xl">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-24 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel>Education</SectionLabel>
          </div>
          <ol className="md:col-span-7">
            {profile.education.map((e, i) => (
              <Reveal
                key={i}
                delay={i * 0.05}
                as="li"
                className="grid gap-2 border-t hairline py-6 md:grid-cols-12"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:col-span-3">
                  {e.period}
                </span>
                <div className="md:col-span-7">
                  <p className="text-display text-xl font-medium">{e.title}</p>
                  <p className="text-sm text-muted-foreground">{e.org}</p>
                </div>
                <span className="font-mono text-sm md:col-span-2 md:text-right">
                  {e.meta}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mt-24 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel>Skills</SectionLabel>
          </div>
          <div className="grid gap-8 md:col-span-7 md:grid-cols-2">
            {Object.entries(profile.skills).map(([cat, items], i) => (
              <Reveal
                key={cat}
                delay={i * 0.05}
                className="border-t hairline pt-4"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  {cat}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {items.map((it) => (
                    <li
                      key={it}
                      className="rounded-full border hairline px-3 py-1 text-[12px]"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
