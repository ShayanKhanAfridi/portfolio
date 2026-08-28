"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "system", label: "SYSTEM", num: "01" },
  { id: "projects", label: "PROJECTS", num: "02" },
  { id: "experience", label: "EXPERIENCE", num: "03" },
  { id: "stack", label: "STACK", num: "04" },
  { id: "contact", label: "CONTACT", num: "05" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const viewportCenter = window.innerHeight * 0.3; // Check what's at the top 30% of the screen
      
      let currentSection = "";
      
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section overlaps the 30% vertical mark
          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            currentSection = section.id;
            break;
          }
        }
      }

      // Fallback: If scrolled to the absolute bottom, select the last section
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 20) {
        currentSection = SECTIONS[SECTIONS.length - 1].id;
      }

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once after slight delay to ensure DOM is ready
    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "border-b border-[var(--border)]" : ""
        }`}
        style={{ background: scrolled ? "rgba(10,10,10,0.92)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16 h-14 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link
            href="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono text-xs tracking-[0.2em] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors uppercase"
            data-cursor="HOME"
          >
            SHAYAN <span className="text-[var(--accent)]">/</span> AI ENGINEER
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                data-cursor="NAVIGATE"
                className={`font-mono text-[0.65rem] tracking-[0.15em] uppercase transition-colors ${
                  activeSection === s.id
                    ? "text-[var(--accent)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden font-mono text-[0.65rem] tracking-[0.15em] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "CLOSE" : "INDEX"}
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 left-0 right-0 z-30 border-b border-[var(--border)] px-6 py-8 flex flex-col gap-6"
            style={{ background: "rgba(10,10,10,0.98)", backdropFilter: "blur(16px)" }}
          >
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="flex items-center gap-4 text-left"
              >
                <span className="font-semibold text-lg tracking-tight text-[var(--foreground)] hover:text-[var(--accent)] transition-colors">{s.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
