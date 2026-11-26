import { useEffect, useState } from "react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { BackToTop, Footer } from "@/components/Footer";
import { useReducedMotion } from "@/lib/hooks";
import { cn } from "@/utils/cn";

/* Short boot sequence — skipped entirely for reduced-motion users. */
function Boot() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      setGone(true);
      return;
    }
    const a = window.setTimeout(() => setDone(true), 780);
    const b = window.setTimeout(() => setGone(true), 1500);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [reduced]);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-night transition-opacity duration-700 ease-[cubic-bezier(.16,1,.3,1)]",
        done ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="absolute inset-0 grid-tech-dark opacity-50" />
      <div className="relative w-[min(320px,72vw)]">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-[13px] uppercase tracking-[0.34em] text-white">
            Yom Somnang
          </span>
          <span className="u-label text-arc">SYS</span>
        </div>
        <div className="mt-3 h-[2px] w-full bg-white/10">
          <div
            className="h-full bg-arc transition-[width] duration-[900ms] ease-out"
            style={{ width: done ? "100%" : "8%", boxShadow: "0 0 14px rgba(2,210,227,.9)" }}
          />
        </div>
        <div className="mt-2.5 flex items-center justify-between">
          <span className="u-label text-white/35">Initialising portfolio</span>
          <span className="u-mono u-label text-white/35">{done ? "100%" : "08%"}</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Boot />
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:bg-arc focus:px-4 focus:py-2 focus:font-body focus:text-[11px] focus:font-semibold focus:uppercase focus:tracking-[0.18em] focus:text-night"
      >
        Skip to content
      </a>

      <Nav />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}