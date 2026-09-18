"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const PIPELINE = [
  { id: "data", label: "DATA", desc: "Collection, cleaning, EDA, feature engineering from real APIs and datasets", tag: "INPUT" },
  { id: "models", label: "MODELS", desc: "Machine learning — scikit-learn, classification, regression, forecasting", tag: "PROCESS" },
  { id: "apis", label: "APIs", desc: "External integration, REST, structured JSON extraction and orchestration", tag: "INTERFACE" },
  { id: "llms", label: "LLMs", desc: "Gemini API, prompt engineering, RAG, embeddings, agentic pipelines", tag: "INTELLIGENCE" },
  { id: "systems", label: "SYSTEMS", desc: "Full-stack delivery — React, Next.js, Node.js, automation, deployment", tag: "OUTPUT" },
];

export default function System() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="system" className="py-32 border-t border-[var(--border)]">
      {/* Section header */}
      <div className="flex items-start justify-between mb-20 flex-wrap gap-6">
        <div className="flex flex-col gap-3">
          <span className="label">SYSTEM</span>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
            I BUILD FROM DATA<br />
            <span className="text-[var(--muted-foreground)]">TO INTELLIGENCE.</span>
          </h2>
        </div>
        <p className="text-[var(--muted-foreground)] text-sm leading-relaxed max-w-sm font-light self-end">
          AI Engineer building agentic systems, LLM applications, and voice AI
          agents — with a strong foundation in machine learning, data science,
          and full-stack development.
        </p>
      </div>

      {/* Capability map — vertical pipeline with descriptions */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
        {/* Pipeline nodes */}
        <div className="flex lg:flex-col gap-3 lg:gap-0 flex-wrap lg:flex-nowrap lg:w-72 shrink-0">
          {PIPELINE.map((node, i) => (
            <div key={node.id} className="flex lg:flex-col items-start">
              <motion.button
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(node.id)}
                onBlur={() => setHovered(null)}
                data-cursor="EXPLORE"
                className="relative flex items-center gap-4 group text-left w-full"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {/* Node indicator */}
                <div
                  className="shrink-0 w-8 h-8 flex items-center justify-center border transition-all duration-300"
                  style={{
                    borderColor: hovered === node.id ? "var(--accent)" : "var(--border)",
                    backgroundColor: hovered === node.id ? "var(--accent)" : "transparent",
                  }}
                >
                  <span
                    className="font-mono text-[0.6rem] font-bold"
                    style={{ color: hovered === node.id ? "var(--accent-foreground)" : "var(--muted-foreground)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <span
                  className="font-semibold text-lg tracking-tight transition-colors duration-200"
                  style={{ color: hovered === node.id ? "var(--foreground)" : "var(--muted-foreground)" }}
                >
                  {node.label}
                </span>
              </motion.button>

              {/* Connector line between nodes */}
              {i < PIPELINE.length - 1 && (
                <div className="hidden lg:flex flex-col items-start pl-4 py-1">
                  <div
                    className="w-px transition-all duration-300"
                    style={{
                      height: 28,
                      background: hovered === node.id || hovered === PIPELINE[i + 1].id
                        ? "var(--accent)"
                        : "var(--border)",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Description panel */}
        <div className="flex-1 lg:border-l border-[var(--border)] lg:pl-16">
          {hovered ? (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4"
            >
              {PIPELINE.filter(n => n.id === hovered).map(node => (
                <div key={node.id}>
                  <span className="label text-[var(--accent)]">{node.tag}</span>
                  <h3 className="text-3xl font-semibold mt-2 mb-4 tracking-tight">{node.label}</h3>
                  <p className="text-[var(--muted-foreground)] text-base leading-relaxed font-light max-w-md">
                    {node.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-2"
            >
              <span className="label mb-4">HOVER A LAYER TO EXPLORE</span>
              {/* Show all descriptions faded */}
              {PIPELINE.map(node => (
                <div key={node.id} className="flex items-start gap-3 py-2 border-b border-[var(--border)] last:border-0">
                  <span className="label w-24 shrink-0 pt-0.5">{node.tag}</span>
                  <p className="text-[var(--muted-foreground)] text-xs leading-relaxed">{node.desc}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
