import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center bg-background px-6 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        404 — Project not found
      </p>
      <h1 className="text-display mt-6 text-[clamp(3rem,10vw,8rem)] font-semibold leading-[0.95] tracking-tight">
        Oops.
      </h1>
      <p className="mt-6 max-w-md text-lg text-muted-foreground">
        This project doesn&apos;t exist or may have been removed. Check the URL or
        head back to the index.
      </p>
      <Link
        href="/work"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
      >
        ← Back to Work
      </Link>
    </section>
  );
}
