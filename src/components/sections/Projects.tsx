"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const PROJECTS = [
  {
    id: "01",
    title: "WEBGEN IDE",
    subtitle: "AI-POWERED WEBSITE BUILDER",
    status: "COMPLETE",
    desc: "AI-powered website generation platform using Gemini API. Generate and modify websites through natural language prompts. Features a built-in code editor, terminal, and live preview pane.",
    tags: ["React", "Gemini API", "Node.js", "Monaco Editor"],
    links: { github: "https://github.com/ShayanKhanAfridi/webgen-ai", video: "/videos/Web_Gen-Ai-Video.mp4", live: "https://webgen-ai-navy.vercel.app/" },
    visual: "ide",
    ide: ["PROMPT", "→ AI", "→ CODE", "→ PREVIEW"],
  },
  {
    id: "02",
    title: "PEARLS AQI PREDICTOR",
    subtitle: "AIR QUALITY FORECASTING SYSTEM",
    status: "COMPLETE",
    desc: "End-to-end AQI forecasting system integrating external weather and pollutant APIs. Includes data collection, feature engineering, ML model development, automated pipelines, and a Streamlit dashboard with real-time monitoring and 3-day forecasting.",
    tags: ["Python", "Scikit-learn", "Streamlit", "Data Pipelines", "EDA"],
    links: { github: "https://github.com/ShayanKhanAfridi/pearls-aqi-predictor", live: "https://pearls-aqi-predictor-by-shayan.streamlit.app/" },
    visual: "data",
    forecast: [{ day: "TODAY", aqi: 82, level: "MODERATE" }, { day: "DAY 2", aqi: 76, level: "MODERATE" }, { day: "DAY 3", aqi: 91, level: "MODERATE" }],
  },
  {
    id: "03",
    title: "KYNETIC",
    subtitle: "AI FITNESS COACH · COMPUTER VISION",
    status: "COMPLETE",
    desc: "AI-powered fitness coaching platform with real-time computer vision. Uses MediaPipe for live pose estimation and exercise form analysis via webcam. Gemini API generates personalised workout plans and adapts sessions based on performance. Features 3D avatar generation and a full coaching dashboard.",
    tags: ["Python", "MediaPipe", "Computer Vision", "Gemini API", "Pose Estimation", "React"],
    links: { github: "https://github.com/ShayanKhanAfridi/Kynetic", live: "https://kynetic-app.vercel.app/" },
    visual: "vision",
    pipeline: ["WEBCAM", "MEDIAPIPE", "POSE", "GEMINI", "COACH"],
  },
  {
    id: "04",
    title: "HR AUTOMATION SYSTEM",
    subtitle: "AGENTIC AI + MACHINE LEARNING",
    status: "COMPLETE",
    desc: "Built n8n automation workflows covering LinkedIn job posting, resume screening, and candidate shortlisting. Applied ML to employee performance and salary data for data-driven HR decisions and predictive insights.",
    tags: ["n8n", "Gemini API", "Machine Learning", "Python", "Automation"],
    links: { github: "https://github.com/ShayanKhanAfridi/HR-Automation", video: "/videos/HR-Automation-Video.mp4" },
    visual: "pipeline",
    pipeline: ["JOB POST", "RESUME SCAN", "SHORTLIST", "ML EVAL", "REPORT"],
  },
  {
    id: "05",
    title: "AI RECRUITER",
    subtitle: "VOICE AI INTERVIEW PLATFORM",
    status: "COMPLETE",
    desc: "Full-stack AI interview platform where Gemini conducts structured interviews with dynamic follow-up questions. Supports text and real-time voice mode — Whisper API handles speech-to-text transcription with live captions, Hugging Face Inference API powers text-to-speech responses. Includes session management, scoring, and an interview dashboard.",
    tags: ["Gemini API", "Whisper STT", "HuggingFace TTS", "React", "TypeScript", "Express", "PostgreSQL", "Drizzle ORM"],
    links: { github: "https://github.com/ShayanKhanAfridi/AI-Recruitor", video: "/videos/AI Recruitor Video.mp4" },
    visual: "recruiter",
    pipeline: ["SESSION", "GEMINI", "WHISPER STT", "HF TTS", "SCORE"],
  },
  {
    id: "06",
    title: "ARTISTRYHUB",
    subtitle: "FULL-STACK DIGITAL ART GALLERY",
    status: "COMPLETE",
    desc: "Full-stack digital art platform built with React, Node.js, Express, and MongoDB. Integrated AI-powered image generation. Implements complete data models for users, artworks, categories, carts, and orders.",
    tags: ["React", "Node.js", "Express", "MongoDB", "AI Generation"],
    links: { github: "https://github.com/ShayanKhanAfridi/artistry-gallery" },
    visual: "gallery",
  },
];

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section id="projects" className="py-32 border-t border-[var(--border)]">
      {/* Section header */}
      <div className="flex items-end justify-between mb-20 flex-wrap gap-6">
        <div>
          <span className="label block mb-3">SELECTED SYSTEMS</span>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
            WHAT I&apos;VE<br />BUILT.
          </h2>
        </div>
        <p className="text-[var(--muted-foreground)] text-sm max-w-xs leading-relaxed font-light">
          Each project is a distinct system — not a template app. Click any to read more.
        </p>
      </div>

      {/* Project list — editorial accordion */}
      <div className="flex flex-col">
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={project.id}
            layout
            className="border-t border-[var(--border)] last:border-b"
          >
            {/* Row header */}
            <button
              className="w-full flex items-center gap-6 py-6 text-left group"
              onClick={() => setExpanded(expanded === project.id ? null : project.id)}
              data-cursor="VIEW →"
            >
              <span
                className="font-mono text-[0.65rem] w-8 shrink-0 transition-colors"
                style={{ color: expanded === project.id ? "var(--accent)" : "var(--muted-foreground)" }}
              >
                {project.id}
              </span>

              <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight group-hover:text-[var(--accent)] transition-colors">
                  {project.title}
                </h3>
                <span className="label">{project.subtitle}</span>
              </div>

              {/* Status badge */}
              <span
                className="font-mono text-[0.6rem] tracking-widest px-2 py-1 shrink-0"
                style={{
                  color: project.status === "BUILDING" ? "#f59e0b" : project.status === "SOON" ? "var(--muted-foreground)" : "var(--accent)",
                  border: `1px solid ${project.status === "BUILDING" ? "#f59e0b" : project.status === "SOON" ? "var(--border)" : "var(--accent)"}`,
                }}
              >
                {project.status}
              </span>

              {/* Arrow */}
              <motion.span
                animate={{ rotate: expanded === project.id ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-[var(--muted-foreground)] shrink-0"
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.span>
            </button>

            {/* Expanded content */}
            <AnimatePresence>
              {expanded === project.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0, 0.1, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-10 pl-14 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10">
                    {/* Left: description + tags + links */}
                    <div className="flex flex-col gap-6">
                      <p className="text-[var(--muted-foreground)] text-sm leading-relaxed max-w-xl font-light">
                        {project.desc}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="font-mono text-[0.65rem] tracking-wider px-2 py-1 border border-[var(--border)] text-[var(--muted-foreground)]">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-4">
                        {project.links.github && (
                          <Link href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-mono text-xs tracking-wider text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors" data-cursor="CODE ↗">
                            VIEW SOURCE <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        {project.links.video && (
                          <button 
                            onClick={() => setActiveVideo(project.links.video!)} 
                            className="flex items-center gap-2 font-mono text-xs tracking-wider text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors" 
                            data-cursor="PLAY ▶"
                          >
                            WATCH DEMO <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {project.links.live && (
                          <Link href={project.links.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-mono text-xs tracking-wider text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors" data-cursor="LIVE ↗">
                            LIVE DEMO <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Right: project-specific visual */}
                    <ProjectVisual project={project} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-10"
            style={{ background: "rgba(10,10,10,0.9)", backdropFilter: "blur(8px)" }}
            onClick={() => setActiveVideo(null)}
          >
            <button 
              className="absolute top-6 right-6 z-50 p-3 bg-[var(--muted)]/50 hover:bg-[var(--muted)] rounded-full text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all backdrop-blur-md border border-[var(--border)]"
              onClick={() => setActiveVideo(null)}
              data-cursor="CLOSE"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black border border-[var(--border)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <video 
                src={activeVideo} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectVisual({ project }: { project: typeof PROJECTS[0] }) {
  if (project.visual === "pipeline" || project.visual === "recruiter") {
    return (
      <div className="flex flex-col gap-0 self-start">
        {project.pipeline?.map((step, i) => (
          <div key={i} className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="font-mono text-xs tracking-widest px-3 py-2 border border-[var(--border)] text-[var(--foreground)] w-36"
            >
              {step}
            </motion.div>
            {i < (project.pipeline?.length ?? 0) - 1 && (
              <div className="w-px h-5 bg-[var(--border)] ml-3" />
            )}
          </div>
        ))}
      </div>
    );
  }

  if (project.visual === "ide") {
    return (
      <div className="flex flex-col gap-0 border border-[var(--border)] self-start w-48">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[var(--border)]">
          {["#f87171","#fbbf24","#4ade80"].map(c => (
            <span key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
          ))}
          <span className="font-mono text-[0.55rem] text-[var(--muted-foreground)] ml-2">webgen.ide</span>
        </div>
        {project.ide?.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="px-3 py-2 font-mono text-xs border-b border-[var(--border)] last:border-0 text-[var(--muted-foreground)]"
          >
            <span style={{ color: i === 0 ? "var(--foreground)" : i === 2 ? "var(--accent)" : "var(--muted-foreground)" }}>
              {step}
            </span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (project.visual === "data" && project.forecast) {
    return (
      <div className="flex flex-col gap-0 border border-[var(--border)] self-start w-52">
        <div className="px-4 py-3 border-b border-[var(--border)]">
          <span className="label text-[0.6rem] block">AIR QUALITY INDEX</span>
        </div>
        {project.forecast.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] last:border-0"
          >
            <span className="font-mono text-[0.6rem] text-[var(--muted-foreground)]">{item.day}</span>
            <div className="flex items-center gap-3">
              <div
                className="h-1 rounded-full"
                style={{ width: `${(item.aqi / 200) * 60}px`, background: item.aqi > 85 ? "#f59e0b" : "var(--accent)" }}
              />
              <span className="font-mono text-sm font-bold">{item.aqi}</span>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (project.visual === "rag") {
    return (
      <div className="flex flex-col gap-0 self-start">
        {project.pipeline?.map((step, i) => (
          <div key={i} className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.07 }}
              className="font-mono text-[0.65rem] tracking-widest px-3 py-2 border border-dashed border-[var(--border)] text-[var(--muted-foreground)] w-36"
            >
              {step}
            </motion.div>
            {i < (project.pipeline?.length ?? 0) - 1 && (
              <div className="w-px h-4 bg-[var(--border)] ml-3" />
            )}
          </div>
        ))}
      </div>
    );
  }

  // gallery: just color palette chips
  if (project.visual === "gallery") {
    const swatches = ["#e879f9", "#a78bfa", "#60a5fa", "#34d399", "#fbbf24", "#f87171"];
    return (
      <div className="grid grid-cols-3 gap-1.5 self-start w-36">
        {swatches.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 }}
            className="aspect-square"
            style={{ background: c }}
          />
        ))}
      </div>
    );
  }

  // vision: computer vision pipeline
  if (project.visual === "vision") {
    return (
      <div className="flex flex-col gap-0 self-start">
        {project.pipeline?.map((step, i) => (
          <div key={i} className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="font-mono text-xs tracking-widest px-3 py-2 border w-36"
              style={{
                borderColor: step === "GEMINI" || step === "MEDIAPIPE" ? "var(--accent)" : "var(--border)",
                color: step === "GEMINI" || step === "MEDIAPIPE" ? "var(--accent)" : "var(--foreground)",
              }}
            >
              {step}
            </motion.div>
            {i < (project.pipeline?.length ?? 0) - 1 && (
              <div className="w-px h-5 bg-[var(--border)] ml-3" />
            )}
          </div>
        ))}
      </div>
    );
  }

  return null;
}
