"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Index" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/certificates", label: "Certificates" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const t = new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
        hour12: false,
      }).format(d);
      setTime(`${t} IST`);
    };
    fmt();
    const id = setInterval(fmt, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 text-paper md:px-10">
        <Link
          href="/"
          className="font-display text-sm font-semibold tracking-tight"
          aria-label="Home"
        >
          Bhumit Singh<span className="opacity-50">.</span>
        </Link>
        <nav className="hidden items-center gap-8 text-[13px] font-medium tracking-wide md:flex">
          {links.map((l) => {
            const active =
              l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                href={l.to}
                className="group relative inline-flex items-center gap-1.5"
              >
                <span
                  className={`h-1 w-1 rounded-full bg-paper transition-opacity ${active ? "opacity-100" : "opacity-0"}`}
                />
                <span className="relative">
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-paper transition-all duration-300 group-hover:w-full" />
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="hidden font-mono text-[11px] uppercase tracking-[0.2em] opacity-70 md:block">
          Indore · {time}
        </div>
        <nav className="flex items-center gap-5 text-[13px] font-medium md:hidden">
          {links.slice(1).map((l) => (
            <Link key={l.to} href={l.to}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
