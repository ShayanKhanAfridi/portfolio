"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactable = target.closest("[data-cursor]");
      
      if (interactable) {
        setCursorText(interactable.getAttribute("data-cursor") || "");
      } else {
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible, cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <motion.div
        className="flex items-center justify-center font-mono text-xs font-bold uppercase tracking-wider overflow-hidden whitespace-nowrap"
        style={{
          x: "-50%",
          y: "-50%",
          background: "var(--accent)",
          color: "var(--accent-foreground)",
        }}
        animate={{
          width: cursorText ? "auto" : 14,
          height: cursorText ? 28 : 14,
          borderRadius: cursorText ? 3 : 14,
          paddingLeft: cursorText ? 10 : 0,
          paddingRight: cursorText ? 10 : 0,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.12 }}
      >
        {cursorText}
      </motion.div>
    </motion.div>
  );
}
