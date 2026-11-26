import { useEffect, useRef, useState } from "react";
import { EDUCATION } from "@/data/portfolio";
import { useInView } from "@/lib/hooks";
import { Icon, Reveal, SectionHeading, TechChip } from "@/components/ui";
import { cn } from "@/utils/cn";

function TimelineEntry({ item, i }: { item: (typeof EDUCATION)[number]; i: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <div ref={ref} className="relative pl-12 sm:pl-20 lg:pl-28">
      {/* marker */}
      <div className="absolute left-[10px] top-2 sm:left-[26px] lg:left-[38px]">
        <span
          className={cn(
            "relative grid h-5 w-5 place-items-center rounded-full border-2 transition-all duration-700",
            inView ? "scale-100 border-arc bg-paper" : "scale-50 border-line bg-paper"
          )}
        >
          <span
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-700",
              inView ? "bg-arc" : "bg-line"
            )}
          />
          {item.active && inView && (
            <span
              className="absolute inset-0 rounded-full border border-arc"
              style={{ animation: "pulseRing 2.4s cubic-bezier(.16,1,.3,1) infinite" }}
            />
          )}
        </span>
      </div>

      {/* year gutter */}
      <div className="absolute left-0 top-8 hidden w-[26px] lg:block">
        <span className="block rotate-180 whitespace-nowrap font-display text-[12px] uppercase tracking-[0.3em] text-ink/35 [writing-mode:vertical-rl]">
          {item.start} — {item.end}
        </span>
      </div>

      <Reveal delay={i * 90} y={30}>
        <article className="group relative chamfer border border-line bg-white transition-all duration-500 hover:border-arc/50 hover:shadow-[0_40px_80px_-60px_rgba(9,10,11,.7)]">
          <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-arc transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100" />

          <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-3.5 sm:px-7">
            <span className="u-mono u-label text-arc">{item.index}</span>
            <span className="h-3 w-px bg-line" />
            <span className="u-label text-ink/45">{item.period}</span>
            <span
              className={cn(
                "ml-auto inline-flex items-center gap-2 chamfer-sm px-3 py-1.5 font-body text-[9.5px] font-semibold uppercase tracking-[0.18em]",
                item.active ? "bg-arc text-night" : "bg-ink/6 text-ink/55"
              )}
            >
              {item.active && <span className="h-1.5 w-1.5 bg-night blink" />}
              {item.status}
            </span>
          </div>

          <div className="px-5 py-6 sm:px-7 sm:py-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
              <div className="lg:w-[46%]">
                <h3 className="font-display text-[clamp(1.5rem,3vw,2.15rem)] font-medium uppercase leading-[1.02] tracking-[-0.01em] text-ink">
                  {item.school}
                </h3>
                <p className="mt-2 font-body text-[12px] uppercase tracking-[0.2em] text-arc-deep">
                  {item.award}
                </p>
                <div className="mt-5 space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <Icon name="layers" className="h-3.5 w-3.5 shrink-0 text-ink/35" />
                    <span className="font-body text-[13px] text-ink/65">{item.faculty}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Icon name="pin" className="h-3.5 w-3.5 shrink-0 text-ink/35" />
                    <span className="font-body text-[13px] text-ink/65">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Icon name="clock" className="h-3.5 w-3.5 shrink-0 text-ink/35" />
                    <span className="font-body text-[13px] text-ink/65">
                      {item.active ? "Year 1 in progress" : "Programme completed"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:flex-1">
                <p className="text-[14.5px] leading-[1.8] text-ink/65">{item.note}</p>
                <div className="mt-6">
                  <span className="u-label text-ink/35">
                    {item.active ? "Core coursework" : "Subjects"}
                  </span>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.courses.map((c) => (
                      <TechChip key={c}>{c}</TechChip>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Reveal>
    </div>
  );
}

export function Education() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = railRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const start = window.innerHeight * 0.78;
        const total = r.height + start - window.innerHeight * 0.3;
        const p = (start - r.top) / Math.max(total, 1);
        setFill(Math.max(0, Math.min(1, p)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="education" className="relative scroll-mt-24 overflow-hidden bg-white py-20 lg:py-32">
      <div className="pointer-events-none absolute inset-0 grid-tech opacity-50" />
      <div className="pointer-events-none absolute right-0 top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(2,210,227,.12),transparent_66%)]" />

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="05"
          kicker="Academic record"
          title={
            <>
              Education
              <br />
              <span className="text-arc-deep">timeline</span>
            </>
          }
          lead="From the Bac II science track in Takeo to a Bachelor of Information Technology in Phnom Penh."
          align="between"
        />

        <div ref={railRef} className="relative mt-16 lg:mt-20">
          {/* rail */}
          <div className="absolute bottom-6 left-[19px] top-2 w-px bg-line sm:left-[35px] lg:left-[47px]">
            <div
              className="w-px bg-gradient-to-b from-arc via-arc to-arc-deep transition-[height] duration-200 ease-out"
              style={{ height: `${fill * 100}%`, boxShadow: "0 0 14px rgba(2,210,227,.8)" }}
            />
          </div>

          <div className="space-y-10 lg:space-y-14">
            {EDUCATION.map((e, i) => (
              <TimelineEntry key={e.id} item={e} i={i} />
            ))}

            {/* future node */}
            <div className="relative pl-12 sm:pl-20 lg:pl-28">
              <div className="absolute left-[13px] top-3 sm:left-[29px] lg:left-[41px]">
                <span className="block h-3.5 w-3.5 rotate-45 border border-dashed border-ink/30 bg-white" />
              </div>
              <Reveal>
                <div className="inline-flex flex-wrap items-center gap-3 chamfer-sm border border-dashed border-ink/25 bg-paper px-5 py-4">
                  <span className="u-label text-ink/40">Next</span>
                  <span className="font-display text-[15px] uppercase tracking-wide text-ink">
                    Internship / Junior Developer role
                  </span>
                  <span className="u-mono u-label text-arc">2026 →</span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}