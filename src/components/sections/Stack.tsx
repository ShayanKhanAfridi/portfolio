"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const STACK = [
  {
    category: "LANGUAGES",
    items: [
      { name: "Python", projects: ["Softira", "HR Automation", "Pearls AQI", "AI Recruiter"] },
      { name: "JavaScript", projects: ["WebGen IDE", "ArtistryHub"] },
      { name: "TypeScript", projects: ["Softira", "WebGen IDE"] },
      { name: "HTML / CSS", projects: ["ArtistryHub", "WebGen IDE"] },
      { name: "Java", projects: [] },
      { name: "SQL", projects: ["ArtistryHub"] },
    ],
  },
  {
    category: "AI & ML",
    items: [
      { name: "Machine Learning", projects: ["HR Automation", "Pearls AQI", "AI Recruiter"] },
      { name: "Computer Vision", projects: ["Kynetic"] },
      { name: "MediaPipe", projects: ["Kynetic"] },
      { name: "Pose Estimation", projects: ["Kynetic"] },
      { name: "Deep Learning", projects: [] },
      { name: "Scikit-learn", projects: ["Pearls AQI"] },
      { name: "Pandas", projects: ["Pearls AQI", "HR Automation"] },
      { name: "NumPy", projects: ["Pearls AQI"] },
      { name: "EDA", projects: ["Pearls AQI"] },
    ],
  },
  {
    category: "GENERATIVE AI",
    items: [
      { name: "LangChain", projects: [] },
      { name: "LangGraph", projects: ["Softira"] },
      { name: "Retrieval-Augmented Generation (RAG)", projects: [] },
      { name: "Embeddings", projects: [] },
      { name: "Agentic AI", projects: ["Softira", "HR Automation"] },
      { name: "Multi-Agent Workflows", projects: ["Softira"] },
      { name: "Chatbot Development", projects: [] },
      { name: "LLM Foundations", projects: ["AI Recruiter"] },
      { name: "Gemini API", projects: ["HR Automation", "WebGen IDE", "Kynetic", "AI Recruiter"] },
      { name: "Prompt Engineering", projects: ["HR Automation", "WebGen IDE", "Kynetic", "AI Recruiter"] },
    ],
  },
  {
    category: "VOICE AI",
    items: [
      { name: "Vapi", projects: [] },
      { name: "Retell AI", projects: [] },
      { name: "ElevenLabs", projects: [] },
      { name: "Speech-to-Text (STT)", projects: ["AI Recruiter"] },
      { name: "Text-to-Speech (TTS)", projects: ["AI Recruiter"] },
    ],
  },
  {
    category: "FRAMEWORKS",
    items: [
      { name: "FastAPI", projects: ["Softira"] },
      { name: "Next.js", projects: ["Softira"] },
      { name: "React", projects: ["ArtistryHub", "WebGen IDE", "Kynetic", "AI Recruiter"] },
      { name: "Node.js", projects: ["ArtistryHub", "WebGen IDE", "AI Recruiter"] },
      { name: "Express", projects: ["ArtistryHub", "AI Recruiter"] },
      { name: "Streamlit", projects: ["Pearls AQI"] },
    ],
  },
  {
    category: "DATABASES",
    items: [
      { name: "Vector Databases (Pinecone, FAISS, ChromaDB)", projects: [] },
      { name: "MongoDB", projects: ["ArtistryHub"] },
      { name: "PostgreSQL", projects: ["AI Recruiter"] },
      { name: "MySQL", projects: [] },
      { name: "Supabase", projects: [] },
    ],
  },
  {
    category: "TOOLS",
    items: [
      { name: "n8n", projects: ["HR Automation"] },
      { name: "Git / GitHub", projects: [] },
      { name: "BeautifulSoup", projects: [] },
      { name: "Power BI", projects: [] },
    ],
  },
];

export default function Stack() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="stack" className="py-32 border-t border-[var(--border)]">
      <div className="flex items-end justify-between mb-20 flex-wrap gap-6">
        <div>
          <span className="label block mb-3">STACK</span>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
            TOOLS &amp;<br />
            <span className="text-[var(--muted-foreground)]">TECHNOLOGIES.</span>
          </h2>
        </div>
        <p className="text-[var(--muted-foreground)] text-sm max-w-xs leading-relaxed font-light">
          Hover any technology to see which projects use it.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
        {STACK.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: gi * 0.07 }}
            className="flex flex-col gap-3"
          >
            <span className="label border-b border-[var(--border)] pb-2">{group.category}</span>
            <div className="flex flex-col gap-0">
              {group.items.map((item) => (
                <div key={item.name} className="relative">
                  <button
                    onMouseEnter={() => setHovered(item.name)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(item.name)}
                    onBlur={() => setHovered(null)}
                    data-cursor="STACK"
                    className="w-full text-left py-1.5 font-light text-sm transition-colors"
                    style={{ color: hovered === item.name ? "var(--accent)" : "var(--muted-foreground)" }}
                  >
                    {item.name}
                  </button>

                  {/* Tooltip with related projects — shows below item */}
                  {hovered === item.name && item.projects.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 top-full mt-1 z-20 bg-[var(--muted)] border border-[var(--border)] px-3 py-2 w-max max-w-[180px]"
                    >
                      <span className="label block mb-1" style={{ fontSize: "0.5rem" }}>USED IN</span>
                      {item.projects.map(p => (
                        <div key={p} className="font-mono text-[0.6rem] text-[var(--foreground)]">→ {p}</div>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
