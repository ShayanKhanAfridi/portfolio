"use client";

import { motion } from "framer-motion";

const EDUCATION = [
  {
    id: "EDU.01",
    degree: "BS Software Engineering",
    institution: "Sir Syed University of Engineering & Technology",
    period: "2023 — Present",
    note: "Final Year · CGPA 3.87",
  },
  {
    id: "EDU.02",
    degree: "Intermediate in Pre-Engineering",
    institution: "Govt. Dehli Science College",
    period: "2021 — 2023",
    note: "",
  },
  {
    id: "EDU.03",
    degree: "Matriculation in Science",
    institution: "MIB High School",
    period: "2008 — 2021",
    note: "",
  },
];

const CERTS = [
  { name: "Power BI: Data Modeling and Data Analysis", issuer: "Whizlabs · Coursera" },
  { name: "Power BI: Data Visualization and Analysis", issuer: "Whizlabs · Coursera" },
];

export default function Education() {
  return (
    <section id="education" className="py-32 border-t border-[var(--border)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Education */}
        <div>
          <span className="label block mb-10">EDUCATION</span>
          <div className="flex flex-col gap-0">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col gap-1 py-6 border-t border-[var(--border)] first:border-t-0"
              >
                <span className="font-mono text-[0.6rem] text-[var(--accent)] tracking-widest">{edu.id}</span>
                <h4 className="text-base font-semibold tracking-tight">{edu.degree}</h4>
                <span className="font-mono text-xs text-[var(--accent)]">{edu.institution}</span>
                <div className="flex items-center gap-4 mt-1">
                  <span className="font-mono text-[0.6rem] text-[var(--muted-foreground)]">{edu.period}</span>
                  {edu.note && <span className="font-mono text-[0.6rem] text-[var(--muted-foreground)]">{edu.note}</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <span className="label block mb-10">CERTIFICATIONS</span>
          <div className="flex flex-col gap-0">
            {CERTS.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col gap-1 py-6 border-t border-[var(--border)] first:border-t-0"
              >
                <h4 className="text-base font-semibold tracking-tight">{cert.name}</h4>
                <span className="font-mono text-xs text-[var(--accent)]">{cert.issuer}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
