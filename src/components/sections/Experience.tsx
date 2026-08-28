"use client";

import { motion } from "framer-motion";

const EXPERIENCE = [
  {
    id: "EXP.01",
    role: "Data Science Intern",
    company: "10 Pearls",
    period: "Apr 2026 — Jul 2026",
    tasks: [
      "AQI forecasting system — external API integration, ML pipeline development",
      "Data collection, feature engineering, and exploratory data analysis (EDA)",
      "Automated data pipelines and real-time Streamlit dashboard deployment",
    ],
  },
  {
    id: "EXP.02",
    role: "Data Science and Analytics Intern",
    company: "DevelopersHub Corporation",
    period: "Mar 2026 — Apr 2026",
    tasks: [
      "6-week intensive data science program — Python, Pandas, NumPy, scikit-learn",
      "Data cleaning, preprocessing and exploratory analysis on real-world datasets",
      "Model evaluation and business insight extraction from structured data",
    ],
  },
  {
    id: "EXP.03",
    role: "Data Science Intern",
    company: "Creovata",
    period: "May 2025 — Jul 2026",
    tasks: [
      "Data cleaning, preprocessing and exploratory data analysis using Python",
      "Built and evaluated basic ML models — dataset preparation and feature engineering",
      "Supported data handling, model testing and project documentation",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 border-t border-[var(--border)]">
      <div className="flex items-end justify-between mb-20 flex-wrap gap-6">
        <div>
          <span className="label block mb-3">EXPERIENCE</span>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
            ENGINEERING<br />
            <span className="text-[var(--muted-foreground)]">LOG.</span>
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-0">
        {EXPERIENCE.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-12 py-10 border-t border-[var(--border)] group"
          >
            {/* Left metadata */}
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[0.6rem] tracking-widest text-[var(--accent)]">{exp.id}</span>
              <span className="font-mono text-xs text-[var(--muted-foreground)]">{exp.period}</span>
            </div>

            {/* Right content */}
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{exp.role}</h3>
                <span className="font-mono text-sm text-[var(--accent)]">{exp.company}</span>
              </div>

              <ul className="flex flex-col gap-2">
                {exp.tasks.map((task, ti) => (
                  <li key={ti} className="flex items-start gap-3 text-sm text-[var(--muted-foreground)] font-light">
                    <span className="text-[var(--accent)] mt-1 shrink-0 text-[0.5rem]">▸</span>
                    <span className="leading-relaxed">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
