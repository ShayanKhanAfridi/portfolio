import Hero from "@/components/sections/Hero";
import System from "@/components/sections/System";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Stack from "@/components/sections/Stack";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div>
      <Hero />
      <System />
      <Projects />
      <Experience />
      <Stack />
      <Education />
      <Contact />
    </div>
  );
}
