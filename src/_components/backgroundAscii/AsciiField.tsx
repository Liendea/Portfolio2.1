"use client";

import { useEffect, useRef } from "react";

// Tecken som motsvarar de 16 sätten att kombinera 4 hörn (på/av) i en cell.
// Index i arrayen = bitmönstret TL,TR,BL,BR (8+4+2+1). Se förklaringen i chatten.
const BLOCKS = [
  " ",
  "▗",
  "▖",
  "▄",
  "▝",
  "▐",
  "▞",
  "▟",
  "▘",
  "▚",
  "▌",
  "▙",
  "▀",
  "▜",
  "▛",
  "█",
];

const CELL_W = 9;
const CELL_H = 16;

type AsciiFieldProps = {
  className?: string;
};

// Statisk symmetri-nivå för mönstret (ersätter tidigare scrollstyrda
// progress-värdet). Fältet animeras ändå kontinuerligt via tiden `t`.
const FOLD_PROGRESS = 0.5;

export default function AsciiField({ className }: AsciiFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols = 0;
    let rows = 0;
    let dpr = 1;
    let animationId = 0;
    let t = 0;
    let running = true;

    function resize() {
      // canvas är redan null-kollad ovan, men TypeScript glömmer det i
      // nästlade funktioner — den här lokala variabeln bevisar det igen.
      const c = canvas!;
      const rect = c.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      c.width = Math.floor(rect.width * dpr);
      c.height = Math.floor(rect.height * dpr);
      cols = Math.floor(c.width / (CELL_W * dpr));
      rows = Math.floor(c.height / (CELL_H * dpr));
    }

    // Deterministiskt "slumptal" (0–1) för en given position. Samma x,y ger alltid samma tal.
    function hash(x: number, y: number) {
      const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return s - Math.floor(s);
    }

    // Mjukt brus: blandar de fyra närmaste hash-värdena med en S-kurva istället för raka linjer.
    function noise2(x: number, y: number) {
      const xi = Math.floor(x);
      const yi = Math.floor(y);
      const xf = x - xi;
      const yf = y - yi;
      const u = xf * xf * (3 - 2 * xf);
      const v = yf * yf * (3 - 2 * yf);
      const a = hash(xi, yi);
      const b = hash(xi + 1, yi);
      const c = hash(xi, yi + 1);
      const d = hash(xi + 1, yi + 1);
      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    }

    // Fractal brownian motion: lägger flera brusskikt i olika skala ovanpå varandra
    // (stora långsamma "svall" + mindre snabba "krusningar"), som ett hav.
    function fbm(x: number, y: number) {
      let total = 0;
      let amp = 0.5;
      let freq = 1;
      for (let i = 0; i < 3; i++) {
        total += amp * (noise2(x * freq, y * freq) * 2 - 1);
        amp *= 0.5;
        freq *= 2;
      }
      return total;
    }

    function field(px: number, py: number, tt: number, prog: number) {
      const cx = cols * 0.66;
      const cy = rows * 0.34;
      const dx = px - cx;
      const dy = (py - cy) * 1.8;
      const r = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) + tt * 0.08;

      // Vik vinkeln till 6 lika "kilar" -> mandala/kronblads-symmetri.
      const N = 6;
      const wedge = (2 * Math.PI) / N;
      const folded = Math.abs((angle % wedge) - wedge / 2);
      const mx = Math.cos(folded) * r * 0.16;
      const my = Math.sin(folded) * r * 0.16;

      // Fritt drivande koordinater -> organiskt flöde (hav/vind).
      const ox = px * 0.11 + tt * 0.16;
      const oy = py * 0.15 - tt * 0.11;

      // Blanda flöde och mandala. progress styr hur mycket symmetri som vävs in.
      const foldAmount = 0.08 + prog * 0.14;
      const sx = ox * (1 - foldAmount) + mx * foldAmount;
      const sy = oy * (1 - foldAmount) + my * foldAmount;

      const n = fbm(sx, sy);
      const ripple =
        Math.sin(r * 0.3 - tt * 0.5) * 0.2 * foldAmount +
        Math.sin(px * 0.22 + tt * 1.0) * 0.12 * (1 - foldAmount);
      return n + ripple;
    }

    function draw() {
      if (!running) return;
      // Samma sak här: lokala icke-null-alias åt canvas och ctx.
      const c = canvas!;
      const context = ctx!;
      context.clearRect(0, 0, c.width, c.height);
      context.font = `${CELL_H * dpr}px monospace`;
      context.textBaseline = "top";
      const prog = FOLD_PROGRESS;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const tl = field(col + 0.25, row + 0.25, t, prog);
          const tr = field(col + 0.75, row + 0.25, t, prog);
          const bl = field(col + 0.25, row + 0.75, t, prog);
          const br = field(col + 0.75, row + 0.75, t, prog);

          const bit =
            (tl > 0 ? 8 : 0) +
            (tr > 0 ? 4 : 0) +
            (bl > 0 ? 2 : 0) +
            (br > 0 ? 1 : 0);
          const avg =
            (Math.abs(tl) + Math.abs(tr) + Math.abs(bl) + Math.abs(br)) / 4;
          const opacity = Math.min(0.9, 0.15 + avg * 0.85);

          context.fillStyle = `rgba(255,255,255,${opacity.toFixed(2)})`;
          context.fillText(BLOCKS[bit], col * CELL_W * dpr, row * CELL_H * dpr);
        }
      }

      t += 0.014;
      animationId = requestAnimationFrame(draw);
    }

    resize();
    animationId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    // Pausa loopen helt när hero-sektionen är utanför synligt fönster.
    const observer = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) animationId = requestAnimationFrame(draw);
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "78%",
        height: "100%",
        WebkitMaskImage:
          "radial-gradient(ellipse 78% 68% at 66% 34%, black 0%, black 30%, transparent 82%)",
        maskImage:
          "radial-gradient(ellipse 78% 68% at 66% 34%, black 0%, black 30%, transparent 82%)",
        pointerEvents: "none",
      }}
    />
  );
}
