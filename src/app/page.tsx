import { Hero } from "@/components/home/Hero";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { AboutStrip } from "@/components/home/AboutStrip";
import { AboutPreview } from "@/components/home/AboutPreview";

export default function Index() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <AboutStrip />
      <AboutPreview />
    </>
  );
}

