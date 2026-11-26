import { useEffect, useRef, useState } from "react";
import portrait from "@/assets/portrait.jpg";
import { HERO_STATS, PROFILE, TICKER } from "@/data/portfolio";
import { useCountUp, useInView, useReducedMotion, useScrollProgress, useSmoothScrollTo } from "@/lib/hooks";
import { downloadCV } from "@/lib/cv";
import { ArcButton, Corners, Icon, Reveal, Ticker } from "@/components/ui";
import { cn } from "@/utils/cn";

/* ---------------------------------------------- animated contour field */
function ContourField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let running = true;
    const pointer = { x: 0.62, y: 0.4, tx: 0.62, ty: 0.4 };

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      const d = dpr();
      canvas.width = Math.round(w * d);
      canvas.height = Math.round(h * d);
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };

    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.tx = (e.clientX - r.left) / r.width;
      pointer.ty = (e.clientY - r.top) / r.height;
    };

    const LINES = 16;
    const draw = (t: number) => {
      pointer.x += (pointer.tx - pointer.x) * 0.055;
      pointer.y += (pointer.ty - pointer.y) * 0.055;

      ctx.clearRect(0, 0, w, h);
      const time = t * 0.00016;
      const px = pointer.x * w;
      const py = pointer.y * h;

      for (let i = 0; i < LINES; i++) {
        const p = i / (LINES - 1);
        const baseY = h * (0.12 + p * 0.82);
        const amp = 16 + Math.sin(p * Math.PI) * 54;
        const alpha = 0.05 + Math.sin(p * Math.PI) * 0.3;

        ctx.beginPath();
        const step = Math.max(6, w / 90);
        for (let x = -step; x <= w + step; x += step) {
          const nx = x / w;
          const wave =
            Math.sin(nx * 3.1 + time * 2.1 + i * 0.42) * amp +
            Math.sin(nx * 6.4 - time * 1.4 + i * 0.24) * amp * 0.36 +
            Math.cos(nx * 1.5 + time * 0.8) * amp * 0.22;

          // pointer gravity well
          const dx = x - px;
          const dy = baseY + wave - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pull = Math.max(0, 1 - dist / (w * 0.28)) ** 2 * 46;

          const y = baseY + wave - pull * Math.sign(py - baseY || 1) * 0.6;
          if (x <= -step) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(2, 210, 227, ${alpha.toFixed(3)})`;
        ctx.lineWidth = i % 4 === 0 ? 1.25 : 0.7;
        ctx.stroke();
      }

      // pointer halo
      const g = ctx.createRadialGradient(px, py, 0, px, py, 190);
      g.addColorStop(0, "rgba(2,210,227,0.13)");
      g.addColorStop(1, "rgba(2,210,227,0)");
      ctx.fillStyle = g;
      ctx.fillRect(px - 200, py - 200, 400, 400);

      if (running && !reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    if (reduced) draw(0);
    else raf = requestAnimationFrame(draw);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduced) return;
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(draw);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

/* ------------------------------------------------------------- stat cell */
function Stat({ value, suffix, label, raw }: { value: number; suffix: string; label: string; raw?: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const n = useCountUp(value, inView, 1500);
  const display = raw ? String(value) : String(n).padStart(2, "0");
  return (
    <div ref={ref} className="group relative border-t border-white/12 pt-4">
      <span className="absolute -top-px left-0 h-px w-0 bg-arc transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:w-full" />
      <div className="font-display text-[2rem] font-medium leading-none text-white sm:text-[2.4rem]">
        {display}
        <span className="text-arc">{suffix}</span>
      </div>
      <div className="mt-2 u-label text-white/40">{label}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ hero */
export function Hero() {
  const scrollTo = useSmoothScrollTo();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { y: scrollY } = useScrollProgress();
  const [cursor, setCursor] = useState({ x: 0, y: 0, on: false });
  const drift = reduced ? 0 : Math.min(scrollY, 900);

  useEffect(() => {
    if (reduced) return;
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        setCursor({
          x: ((e.clientX - r.left) / r.width - 0.5) * 2,
          y: ((e.clientY - r.top) / r.height - 0.5) * 2,
          on: true,
        });
      });
    };
    const onLeave = () => setCursor((c) => ({ ...c, on: false, x: 0, y: 0 }));
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  const px = (m: number) => (reduced ? 0 : cursor.x * m);
  const py = (m: number) => (reduced ? 0 : cursor.y * m);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="on-dark relative isolate overflow-hidden bg-night pt-[86px] lg:pt-[104px]"
    >
      {/* backdrop layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_78%_18%,rgba(2,210,227,.20),transparent_58%),radial-gradient(90%_70%_at_8%_92%,rgba(61,123,255,.16),transparent_62%),linear-gradient(160deg,#0E0F14_0%,#12141c_46%,#0b0c11_100%)]" />
        <div
          className="absolute inset-0 grid-tech-dark opacity-70"
          style={{ transform: `translate3d(0, ${drift * 0.14}px, 0)` }}
        />
        <div
          className="absolute inset-0 mask-fade-b opacity-[.55]"
          style={{ transform: `translate3d(0, ${drift * 0.06}px, 0)` }}
        >
          <ContourField />
        </div>
        <div
          className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-arc/25 to-transparent"
          style={{ transform: `translateX(${px(26)}px)` }}
        />
        <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="scan-line absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-arc/8 to-transparent" />
      </div>

      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-12 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:pb-20 lg:pt-16">
        {/* ---------------- left column ---------------- */}
        <div className="lg:col-span-7 xl:col-span-7">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 chamfer-sm border border-arc/35 bg-arc/8 px-3 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full bg-arc blink" />
                </span>
                <span className="u-label text-arc">Available for internship</span>
              </span>
              <span className="u-label text-white/40">{PROFILE.universityShort} · {PROFILE.faculty}</span>
            </div>
          </Reveal>

          <h1 className="mt-7 font-display uppercase leading-[0.82] tracking-[-0.03em]">
            <Reveal delay={60}>
              <span
                className="block text-[clamp(3.6rem,12.5vw,9.5rem)] font-semibold text-white"
                style={{ transform: `translate3d(${px(-9)}px, ${py(-4)}px, 0)` }}
              >
                {PROFILE.first}
              </span>
            </Reveal>
            <Reveal delay={140}>
              <span
                className="stroke-text block text-[clamp(3.6rem,12.5vw,9.5rem)] font-semibold"
                style={{ transform: `translate3d(${px(-16)}px, ${py(-7)}px, 0)` }}
              >
                {PROFILE.last}
              </span>
            </Reveal>
          </h1>

          <Reveal delay={220}>
            <div className="mt-6 flex items-center gap-4">
              <span className="h-px w-8 bg-arc sm:w-14" />
              <p className="font-body text-[11px] font-medium uppercase tracking-[0.26em] text-white/80 sm:text-[13px]">
                IT Student <span className="text-arc">/</span> Junior Web Developer
              </p>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:text-[16.5px]">
              {PROFILE.tagline}
            </p>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ArcButton onClick={() => scrollTo("projects")} icon="arrow-right" size="lg">
                View Projects
              </ArcButton>
              <ArcButton onClick={downloadCV} variant="dark" icon="download" size="lg">
                Download CV
              </ArcButton>
              <ArcButton onClick={() => scrollTo("contact")} variant="dark" size="lg">
                Contact Me
              </ArcButton>
            </div>
          </Reveal>

          <Reveal delay={420}>
            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4 lg:mt-14">
              {HERO_STATS.map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </div>
          </Reveal>
        </div>

        {/* ---------------- right column: portrait plate ---------------- */}
        <div className="lg:col-span-5 xl:col-span-5">
          <Reveal delay={200} y={40}>
            <div
              className="relative mx-auto max-w-[420px] lg:max-w-none"
              style={{ transform: `translate3d(${px(14)}px, ${py(10)}px, 0)` }}
            >
              <div className="relative chamfer-lg border border-white/12 bg-steel/60 p-2.5 backdrop-blur-sm">
                <div className="relative aspect-[4/5] overflow-hidden chamfer" data-plate>
                  <img
                    src={portrait}
                    alt="Portrait of Yom Somnang"
                    width={880}
                    height={1100}
                    loading="eager"
                    decoding="async"
                    className="h-full w-full scale-[1.03] object-cover object-center grayscale-[.35] transition-transform duration-[1.2s] ease-out hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(200deg,rgba(2,210,227,.18),transparent_42%,rgba(14,15,20,.72))]" />
                  <div className="pointer-events-none absolute inset-0 grid-fine-dark opacity-40 mix-blend-overlay" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                    <span className="u-label text-arc">PORTRAIT / 01</span>
                    <span className="u-label text-white/45">{PROFILE.city.toUpperCase()}</span>
                  </div>
                </div>

              </div>

              <Corners />

              {/* HUD readout — sits outside the chamfered plate so it is never clipped */}
              <div className="absolute -left-7 top-1/2 hidden -translate-y-1/2 lg:block">
                <span className="u-label block rotate-180 whitespace-nowrap text-white/30 [writing-mode:vertical-rl]">
                  RUPP · FACULTY OF SCIENCE · BIT
                </span>
              </div>

              {/* floating spec card */}
              <div
                className="absolute -bottom-6 -left-2 w-[220px] chamfer-sm border border-arc/30 bg-night/92 p-4 backdrop-blur-md sm:-left-6 lg:-left-10"
                style={{ transform: `translate3d(${px(26)}px, ${py(18)}px, 0)` }}
              >
                <div className="flex items-center justify-between">
                  <span className="u-label text-arc">CURRENT</span>
                  <Icon name="spark" className="h-3.5 w-3.5 text-arc spin-slow" />
                </div>
                <p className="mt-2 font-display text-[15px] uppercase leading-tight tracking-wide text-white">
                  {PROFILE.degree}
                </p>
                <p className="mt-1.5 font-body text-[11px] tracking-wide text-muted">
                  {PROFILE.period}
                </p>
              </div>

              <div className="absolute -right-1 -top-4 hidden items-center gap-2 chamfer-sm border border-white/12 bg-night/90 px-3 py-2 backdrop-blur-md sm:flex lg:-right-6">
                <Icon name="github" className="h-3.5 w-3.5 text-arc" />
                <span className="u-mono font-body text-[10px] tracking-[0.14em] text-white/75">
                  {PROFILE.github}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* cursor HUD */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-[5] hidden transition-opacity duration-500 lg:block",
          cursor.on && !reduced ? "opacity-100" : "opacity-0"
        )}
      >
        <div
          className="absolute inset-y-0 w-px bg-arc/20"
          style={{ left: `${(cursor.x + 1) * 50}%` }}
        />
        <div
          className="absolute inset-x-0 h-px bg-arc/20"
          style={{ top: `${(cursor.y + 1) * 50}%` }}
        />
      </div>

      {/* ticker */}
      <div className="relative border-y border-white/8 bg-night/70 py-4 backdrop-blur-sm">
        <Ticker items={TICKER} />
      </div>
    </section>
  );
}