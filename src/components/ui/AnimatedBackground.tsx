"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  pulseOffset: number;
}

const PARTICLE_COUNT = 80;
const CONNECTION_DISTANCE = 140;
const MOUSE_REPEL_RADIUS = 120;
const MOUSE_REPEL_STRENGTH = 0.4;
const ACCENT = { r: 232, g: 255, b: 94 }; // #e8ff5e

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        pulseOffset: Math.random() * Math.PI * 2,
      }));
    }

    function drawParticle(p: Particle, t: number) {
      const pulse = Math.sin(t * 0.002 + p.pulseOffset) * 0.3 + 0.7;
      const alpha = p.alpha * pulse;

      // Core dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${alpha * 0.8})`;
      ctx.fill();

      // Glow halo
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 6);
      grd.addColorStop(0, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${alpha * 0.12})`);
      grd.addColorStop(1, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0)`);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 6, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    }

    function drawConnection(a: Particle, b: Particle, dist: number) {
      const strength = 1 - dist / CONNECTION_DISTANCE;
      const alpha = strength * 0.18;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${alpha})`;
      ctx.lineWidth = strength * 0.8;
      ctx.stroke();
    }

    function drawMouseGlow() {
      const { x, y } = mouseRef.current;
      if (x < -100) return;
      const grd = ctx.createRadialGradient(x, y, 0, x, y, MOUSE_REPEL_RADIUS * 1.5);
      grd.addColorStop(0, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.05)`);
      grd.addColorStop(1, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0)`);
      ctx.beginPath();
      ctx.arc(x, y, MOUSE_REPEL_RADIUS * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    }

    let t = 0;
    function tick() {
      t++;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, width, height);

      // Subtle grid
      ctx.strokeStyle = "rgba(255,255,255,0.018)";
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      drawMouseGlow();

      // Update positions + draw connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repel
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_REPEL_RADIUS) * MOUSE_REPEL_STRENGTH;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.2) { p.vx *= 1.2 / speed; p.vy *= 1.2 / speed; }

        p.x += p.vx;
        p.y += p.vy;

        // Edge wrap
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Draw connections to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const cx = p.x - q.x;
          const cy = p.y - q.y;
          const d = Math.sqrt(cx * cx + cy * cy);
          if (d < CONNECTION_DISTANCE) drawConnection(p, q, d);
        }
      }

      // Draw particles on top of lines
      for (const p of particles) drawParticle(p, t);

      // Subtle scanlines
      for (let y = 0; y < height; y += 4) {
        ctx.fillStyle = "rgba(0,0,0,0.025)";
        ctx.fillRect(0, y, width, 1);
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    resize();
    createParticles();
    tick();

    const onResize = () => { resize(); createParticles(); };
    const onMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
}
