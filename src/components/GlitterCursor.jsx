import { useEffect, useRef } from "react";

const COLORS = ["#ff0074", "#ff2ec4", "#ff7ed4", "#ffd23f", "#ffffff"];
const MAX_PARTICLES = 60;

export default function GlitterCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduceMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    let particles = [];
    let lastSpawn = 0;

    function spawn(x, y) {
      if (particles.length >= MAX_PARTICLES) return;
      particles.push({
        x,
        y,
        size: 3 + Math.random() * 5,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        vx: (Math.random() - 0.5) * 1.2,
        vy: 0.6 + Math.random() * 1.4,
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.2,
        life: 0,
        maxLife: 45 + Math.random() * 25,
      });
    }

    function handleMove(e) {
      const now = performance.now();
      if (now - lastSpawn < 35) return;
      lastSpawn = now;
      spawn(e.clientX, e.clientY);
    }
    window.addEventListener("pointermove", handleMove, { passive: true });

    function drawSpark(p, alpha) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      const s = p.size;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.quadraticCurveTo(s * 0.25, -s * 0.25, s, 0);
      ctx.quadraticCurveTo(s * 0.25, s * 0.25, 0, s);
      ctx.quadraticCurveTo(-s * 0.25, s * 0.25, -s, 0);
      ctx.quadraticCurveTo(-s * 0.25, -s * 0.25, 0, -s);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    let frameId;
    function tick() {
      ctx.clearRect(0, 0, width, height);
      particles = particles.filter((p) => p.life < p.maxLife);
      for (const p of particles) {
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.015;
        p.rot += p.vrot;
        const t = p.life / p.maxLife;
        const alpha = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
        drawSpark(p, Math.max(alpha, 0));
      }
      frameId = requestAnimationFrame(tick);
    }
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="glitter-cursor-layer" aria-hidden="true" />;
}
