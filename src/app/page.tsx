import { Hero } from "@/components/home/Hero";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { AboutStrip } from "@/components/home/AboutStrip";
import { AboutPreview } from "@/components/home/AboutPreview";
import { Certificates } from "@/components/home/Certificates";
export default function Index() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <AboutStrip />
      <AboutPreview />
      <Certificates />
    </>
  );
}

