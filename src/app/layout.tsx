import type { Metadata } from "next";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Cursor } from "@/components/layout/Cursor";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import PageTransition from "@/components/primitives/Transition";
import { AboutChatbot } from "@/components/layout/AboutChatbot";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bhumit Singh — Engineer & AI Systems Builder",
  description:
    "Portfolio of Bhumit Singh — a B.Tech CSE (AI & ML) undergrad in Indore, India, building multi-agent systems, RAG pipelines, and refined web interfaces.",
  authors: [{ name: "Bhumit Singh" }],
  openGraph: {
    title: "Bhumit Singh — Engineer & AI Systems Builder",
    description:
      "Selected work, projects and writing by Bhumit Singh — full-stack & AI engineering from Indore, India.",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
  icons:{
     icon: "/logo.png",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Manrope:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScroll />
        <Cursor />
        <SiteHeader />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <AboutChatbot />
        <SiteFooter />
      </body>
    </html>
  );
}
