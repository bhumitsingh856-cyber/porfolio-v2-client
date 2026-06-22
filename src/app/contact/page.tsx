import { profile } from "@/lib/profile";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionLabel } from "@/components/primitives/SectionLabel";

export default function ContactPage() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1600px] px-6 pt-40 pb-28 md:px-10 md:pt-48 md:pb-40">
        <Reveal>
          <SectionLabel index="(C)">Contact</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-display mt-6 text-[clamp(3rem,11vw,11rem)] font-semibold leading-[0.92]">
            Let’s talk.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <a
            href={`mailto:${profile.email}`}
            className="text-display mt-2 inline-flex items-baseline gap-3 text-[clamp(1.75rem,5vw,4rem)] italic underline decoration-[0.04em] underline-offset-[0.15em] hover:no-underline"
          >
            {profile.email}
            <span aria-hidden className="text-[0.5em] not-italic">
              ↗
            </span>
          </a>
        </Reveal>

        <div className="mt-24 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel>Direct</SectionLabel>
            <ul className="mt-4 space-y-3 text-lg">
              <li>
                <a href={`mailto:${profile.email}`} className="story-link">
                  {profile.email}
                </a>
              </li>
              <li className="text-muted-foreground">{profile.phone}</li>
              <li className="text-muted-foreground">{profile.location}</li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <SectionLabel>Social</SectionLabel>
            <ul className="mt-4 space-y-3 text-lg">
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="story-link"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="story-link"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="story-link"
                >
                  Instagram ↗
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <SectionLabel>Currently</SectionLabel>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Open to internships, freelance builds, and collaborations on AI
              product work. Indian Standard Time, usually replies within 24
              hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}