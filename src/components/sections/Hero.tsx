"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const IDENTITY_ITEMS = [
  { label: "ROLE", value: "AI ENGINEER" },
  { label: "FOCUS", value: "AGENTIC AI · LLM · RAG · VOICE AI · AUTOMATION" },
  { label: "LOCATION", value: "KARACHI, PK" },
  { label: "STATUS", value: "BUILDING", accent: true },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Crosshair mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center pt-14 overflow-hidden"
    >
      {/* Crosshair indicators — engineering drawing aesthetic */}
      {mounted && (
        <>
          <motion.div
            className="absolute top-0 bottom-0 w-px bg-[var(--border)] opacity-30 pointer-events-none hidden lg:block"
            style={{ left: springX }}
          />
          <motion.div
            className="absolute left-0 right-0 h-px bg-[var(--border)] opacity-30 pointer-events-none hidden lg:block"
            style={{ top: springY }}
          />
          <motion.div
            className="absolute w-2 h-2 rounded-full border border-[var(--accent)] opacity-60 pointer-events-none hidden lg:block"
            style={{ left: springX, top: springY, x: "-50%", y: "-50%" }}
          />
        </>
      )}

      {/* Spacer below nav */}
      <div className="mb-8" />

      {/* Main hero grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-24 items-start">
        {/* Left: Big typography */}
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0, 0.1, 1] }}
          >
            <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
              I BUILD<br />
              SOFTWARE<br />
              <span className="text-[var(--muted-foreground)]">THAT THINKS.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-[var(--muted-foreground)] text-base max-w-lg leading-relaxed font-light"
          >
            I build agentic AI systems, LLM applications, RAG pipelines, and
            voice AI agents — combining cutting-edge Generative AI with
            robust automation and full-stack development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              data-cursor="VIEW →"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-[var(--accent-foreground)] font-mono text-xs tracking-widest uppercase font-bold hover:opacity-90 transition-opacity"
            >
              SELECTED WORK <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <Link
              href="https://github.com/ShayanKhanAfridi"
              target="_blank"
              data-cursor="CODE ↗"
              className="flex items-center gap-2 px-5 py-2.5 border border-[var(--border)] font-mono text-xs tracking-widest uppercase text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-all"
            >
              GITHUB
            </Link>
            <Link
              href="https://www.linkedin.com/in/shayankhanafridi"
              target="_blank"
              data-cursor="CONNECT ↗"
              className="font-mono text-xs tracking-widest uppercase text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors"
            >
              LINKEDIN
            </Link>
            <Link
              href="/Shayan_Khan_Afridi_Resume.pdf"
              target="_blank"
              data-cursor="DOWNLOAD ↗"
              className="font-mono text-xs tracking-widest uppercase text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors"
            >
              RÉSUMÉ
            </Link>
          </motion.div>
        </div>

        {/* Right: Technical Identity Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="border border-[var(--border)] p-6 flex flex-col gap-0 self-start"
        >
          <div className="label mb-5 border-b border-[var(--border)] pb-4">
            SYSTEM / SHAYAN
          </div>
          {IDENTITY_ITEMS.map((item, i) => (
            <div
              key={item.label}
              className={`flex flex-col gap-1 py-4 ${i < IDENTITY_ITEMS.length - 1 ? "border-b border-[var(--border)]" : ""}`}
            >
              <span className="label" style={{ fontSize: "0.6rem" }}>{item.label}</span>
              <span
                className={`font-mono text-sm font-medium tracking-wide ${item.accent ? "text-[var(--accent)]" : "text-[var(--foreground)]"}`}
              >
                {item.value}
              </span>
            </div>
          ))}
          <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span className="label text-[var(--accent)]">OPEN TO OPPORTUNITIES</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom edge indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-20 flex items-center gap-4"
      >
        <span className="label">SCROLL TO EXPLORE</span>
        <div className="flex-1 h-px bg-[var(--border)]" style={{ maxWidth: 80 }} />
      </motion.div>
    </div>
  );
}
