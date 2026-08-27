"use client";

import { useEffect, useRef } from "react";

// Antal konturlinjer (lager) och antal punkter per linje.
// Fler lager/punkter = tätare, mjukare linjer men dyrare att rita per frame.
const LAYERS = 70;
const POINTS = 190;

type ContourFieldProps = {
  className?: string;
};

// Alternativt bakgrundsläge till AsciiField. Samma canvas-baserade
// upplägg (resize, rAF-loop, IntersectionObserver-paus, DPR-cap) men
// ritar "offset-kurvor": samma varperade blob-form upprepad i många
// lager med stigande radie + en vridning som är starkast nära centrum,
// vilket ger ett 3D-aktigt virveltryck utan WebGL/three.js.
export default function ContourField({ className }: ContourFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationId = 0;
    let t = 0;
    let running = true;

    // Scroll-styrd hastighet: speedMultiplier = 1 är "lugna" bas-farten.
    // Scroll höjer den snabbt, varje frame avtar den mjukt tillbaka mot 1.
    const BASE_T_STEP = 0.01;
    let speedMultiplier = 3;
    let lastScrollY = window.scrollY;

    function handleScroll() {
      const scrollY = window.scrollY;
      const delta = Math.abs(scrollY - lastScrollY);
      lastScrollY = scrollY;
      const boost = Math.min(delta * 0.05, 4);
      speedMultiplier = Math.min(speedMultiplier + boost, 6);
    }

    // "scroll" på window uppdateras bara EFTER att sidan faktiskt flyttat
    // sig - på trackpad/musplatta kan det komma få/sena events. "wheel"
    // ger input direkt vid varje scrollrörelse (samma källa som Hero redan
    // använder för rollcyklingen och som bevisligen triggar tillförlitligt).
    function handleWheel(event: WheelEvent) {
      const boost = Math.min(Math.abs(event.deltaY) * 0.02, 4);
      speedMultiplier = Math.min(speedMultiplier + boost, 6);
    }

    function resize() {
      const c = canvas!;
      const rect = c.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      c.width = Math.floor(rect.width * dpr);
      c.height = Math.floor(rect.height * dpr);
      width = c.width;
      height = c.height;
    }

    // Samma deterministiska brus-helpers som AsciiField (hash -> noise2 -> fbm).
    function hash(x: number, y: number) {
      const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return s - Math.floor(s);
    }

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

    // Petal-formad varpning runt omkretsen (ger den vågiga, icke-cirkulära konturen).
    function harmonics(theta: number, layerT: number, tt: number) {
      return (
        0.12 * Math.sin(3 * theta + tt * 0.3) +
        0.08 * Math.sin(5 * theta - tt * 0.2 + layerT * 4) +
        0.05 * Math.sin(7 * theta + tt * 0.15)
      );
    }

    function draw() {
      if (!running) return;
      const c = canvas!;
      const context = ctx!;
      context.clearRect(0, 0, c.width, c.height);

      const cx = width * 0.66;
      const cy = height * 0.34;
      // MAX(bredd, höjd) istället för bredd - nu ska mönstret sträcka sig
      // över hela skärmen (inte bara halva bredden), oavsett om skärmen är
      // liggande (desktop) eller stående (mobil). Med hero på 100vh är det
      // annars höjden som blir den styrande, längre dimensionen på mobil.
      const baseRadius = Math.max(width, height) * 0.55;

      context.lineWidth = 1 * dpr;

      for (let i = 0; i < LAYERS; i++) {
        const layerT = i / LAYERS; // 0 (centrum) -> 1 (ytterkant)
        const radiusScale = baseRadius * (0.08 + layerT * 0.92);

        // Vridning starkast nära centrum -> virveleffekten i referensbilden.
        const twist = 2.4 * (1 - layerT) * (1 - layerT);

        context.beginPath();
        for (let j = 0; j <= POINTS; j++) {
          const theta = (j / POINTS) * Math.PI * 2;

          const nx = Math.cos(theta) * 0.9 + t * 0.05;
          const ny = Math.sin(theta) * 0.9 + layerT * 2;
          const warp = fbm(nx, ny);

          const thetaWarped = theta + twist + warp * 0.35;
          const r =
            radiusScale * (1 + warp * 0.06 + harmonics(theta, layerT, t));

          const x = cx + Math.cos(thetaWarped) * r;
          const y = cy + Math.sin(thetaWarped) * r * 0.82;

          if (j === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.closePath();

        const opacity = 0.06 + (1 - layerT) * 0.22;
        context.strokeStyle = `rgba(255,255,255,${opacity.toFixed(3)})`;
        context.stroke();
      }

      // Avta mjukt tillbaka mot bas-farten (1) tills nästa scroll-boost.
      speedMultiplier += (1 - speedMultiplier) * 0.04;
      t += BASE_T_STEP * speedMultiplier;
      animationId = requestAnimationFrame(draw);
    }

    resize();
    animationId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });

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
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
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
        width: "100%",
        height: "100%",
        // vmax (den större av vw/vh) istället för vw - mask-radien följer
        // då samma "längre dimension"-logik som baseRadius i draw(), så
        // mönstret täcker hela skärmen även i stående format på mobil.
        WebkitMaskImage:
          "radial-gradient(ellipse 72vmax 60vmax at 66% 34%, black 0%, black 35%, transparent 92%)",
        maskImage:
          "radial-gradient(ellipse 72vmax 60vmax at 66% 34%, black 0%, black 35%, transparent 92%)",
        pointerEvents: "none",
      }}
    />
  );
}
