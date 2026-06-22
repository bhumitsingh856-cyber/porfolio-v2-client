"use client";
import Link from "next/link";
import { profile } from "@/lib/profile";

export function SiteFooter() {
  return (
    <footer className="relative border-t hairline bg-background">
      <div className="mx-auto max-w-[1600px] px-6 pt-24 pb-10 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              (Let’s build something)
            </p>
            <h2 className="text-display mt-6 text-[clamp(2.5rem,8vw,7rem)] font-medium">
              Have an idea?
              <br />
              <Link
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-baseline gap-2 italic underline decoration-[0.06em] underline-offset-[0.12em] hover:no-underline"
              >
                Say hello
                <span aria-hidden className="text-[0.55em] not-italic">
                  ↗
                </span>
              </Link>
            </h2>
          </div>
          <div className="grid gap-10 md:col-span-5 md:grid-cols-2">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                Contact
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href={`mailto:${profile.email}`} className="story-link">
                    {profile.email}
                  </a>
                </li>
                <li className="text-muted-foreground">{profile.phone}</li>
                <li className="text-muted-foreground">{profile.location}</li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                Elsewhere
              </p>
              <ul className="mt-4 space-y-2 text-sm">
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
                  <Link href="/contact" className="story-link">
                    Contact page →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="text-display mt-20 select-none overflow-hidden text-[clamp(5rem,22vw,22rem)] font-semibold leading-[0.82] tracking-[-0.05em]"
        >
          BUILD.
        </div>
      </div>
    </footer>
  );
}
