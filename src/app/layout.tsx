import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Shayan Khan Afridi — AI / Software Engineer",
  description:
    "Portfolio of Shayan Khan Afridi, an AI Engineer building agentic AI systems, LLM applications, RAG pipelines, voice AI agents, and full-stack software.",
  openGraph: {
    title: "Shayan Khan Afridi — AI / Software Engineer",
    description: "Building agentic AI systems, LLM applications, voice AI agents, and full-stack software.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen`}
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <AnimatedBackground />
        <Navigation />
        <main className="relative max-w-[1320px] mx-auto px-6 sm:px-10 md:px-16">
          {children}
        </main>
        <CustomCursor />
      </body>
    </html>
  );
}
