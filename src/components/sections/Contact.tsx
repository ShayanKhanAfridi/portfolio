"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const LINKS = [
  { label: "EMAIL", href: "mailto:shayaankhaanafridii@gmail.com", hint: "shayaankhaanafridii@gmail.com", cursor: "EMAIL ↗" },
  { label: "GITHUB", href: "https://github.com/ShayanKhanAfridi", hint: "github.com/ShayanKhanAfridi", cursor: "CODE ↗" },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/shayankhanafridi", hint: "linkedin.com/in/shayankhanafridi", cursor: "CONNECT ↗" },
  { label: "RÉSUMÉ", href: "/Shayan_Khan_Afridi_Resume.pdf", hint: "Download CV", cursor: "DOWNLOAD ↗" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-32 border-t border-[var(--border)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-end">
        {/* Left: statement */}
        <div className="flex flex-col gap-8">
          <span className="label">CONTACT</span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
          >
            LET&apos;S BUILD<br />
            SOMETHING<br />
            <span style={{ color: "var(--accent)" }}>INTELLIGENT.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[var(--muted-foreground)] text-sm leading-relaxed font-light max-w-sm"
          >
            Seeking AI/ML or Generative AI internships to apply and grow
            my skills in production environments. Open to full-stack AI roles.
          </motion.p>
        </div>

        {/* Right: link list */}
        <div className="flex flex-col gap-0">
          {LINKS.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="group border-t border-[var(--border)] last:border-b"
            >
              <Link
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                data-cursor={link.cursor}
                className="flex items-center justify-between py-5 hover:pl-3 transition-all duration-200"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-lg tracking-tight group-hover:text-[var(--accent)] transition-colors">
                    {link.label}
                  </span>
                  <span className="font-mono text-xs text-[var(--muted-foreground)]">{link.hint}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--accent)] transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-[var(--border)] flex items-center justify-between flex-wrap gap-4">
        <span className="font-mono text-[0.6rem] text-[var(--muted-foreground)] tracking-widest">
          SHAYAN KHAN AFRIDI · AI / SOFTWARE ENGINEER
        </span>
        <span className="font-mono text-[0.6rem] text-[var(--muted-foreground)] tracking-widest">
          © {new Date().getFullYear()} · BUILT WITH NEXT.JS / TS / FRAMER MOTION
        </span>
      </div>
    </section>
  );
}
