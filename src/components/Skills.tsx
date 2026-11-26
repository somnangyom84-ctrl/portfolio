import { SKILL_GROUPS, type SkillGroup } from "@/data/portfolio";
import { useInView } from "@/lib/hooks";
import { Icon, Reveal, SectionHeading, type IconName } from "@/components/ui";
import { cn } from "@/utils/cn";

function SkillRow({
  name,
  level,
  icon,
  accent,
  delay,
  inView,
}: {
  name: string;
  level: number;
  icon: string;
  accent: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <li className="group relative">
      <div className="flex items-center gap-3.5 py-3">
        <span
          className="grid h-8 w-8 shrink-0 place-items-center chamfer-sm border transition-all duration-300 group-hover:scale-110"
          style={{ borderColor: `${accent}40`, color: accent, background: `${accent}0f` }}
        >
          <Icon name={icon as IconName} className="h-4 w-4" />
        </span>
        <span className="font-body text-[13.5px] tracking-wide text-white/85 transition-colors duration-300 group-hover:text-white">
          {name}
        </span>
        <span className="ml-auto u-mono font-body text-[11px] tabular-nums text-white/35 transition-colors duration-300 group-hover:text-white/70">
          {String(level).padStart(3, "0")}
        </span>
      </div>
      <div className="relative h-[2px] w-full bg-white/8">
        <div
          className="absolute inset-y-0 left-0 transition-[width] duration-[1.5s] ease-[cubic-bezier(.16,1,.3,1)]"
          style={{
            width: inView ? `${level}%` : "0%",
            transitionDelay: `${delay}ms`,
            background: `linear-gradient(90deg, ${accent}55, ${accent})`,
            boxShadow: `0 0 12px -2px ${accent}`,
          }}
        />
      </div>
    </li>
  );
}

function SkillPanel({ group, span }: { group: SkillGroup; span: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const avg = Math.round(group.skills.reduce((a, s) => a + s.level, 0) / group.skills.length);

  return (
    <div ref={ref} className={cn("group/panel relative", span)}>
      <div className="relative h-full chamfer border border-white/10 bg-steel/70 p-1.5 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:shadow-[0_40px_90px_-60px_rgba(2,210,227,.8)]">
        <div className="relative h-full border border-white/6 bg-night/70">
          {/* accent edge */}
          <span
            className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-[.14] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover/panel:scale-x-100"
            style={{ background: group.accent }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover/panel:opacity-100"
            style={{
              background: `radial-gradient(80% 60% at 8% 0%, ${group.accent}18, transparent 62%)`,
            }}
          />

          <div className="relative flex items-start gap-4 border-b border-white/8 p-6 pb-5">
            <div>
              <div className="flex items-center gap-3">
                <span className="u-mono u-label" style={{ color: group.accent }}>
                  {group.index}
                </span>
                <span className="h-px w-6 bg-white/20" />
                <span className="u-label text-white/35">{group.skills.length} modules</span>
              </div>
              <h3 className="mt-3 font-display text-[clamp(1.4rem,2.4vw,1.9rem)] font-medium uppercase leading-none tracking-[-0.01em] text-white">
                {group.title}
              </h3>
              <p className="mt-2.5 max-w-sm font-body text-[12.5px] leading-relaxed text-muted">
                {group.caption}
              </p>
            </div>

            {/* capability dial */}
            <div className="ml-auto hidden shrink-0 sm:block">
              <div className="relative h-16 w-16">
                <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
                  <circle cx="32" cy="32" r="27" fill="none" stroke="rgba(255,255,255,.09)" strokeWidth="3" />
                  <circle
                    cx="32"
                    cy="32"
                    r="27"
                    fill="none"
                    stroke={group.accent}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 27}
                    strokeDashoffset={inView ? 2 * Math.PI * 27 * (1 - avg / 100) : 2 * Math.PI * 27}
                    style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(.16,1,.3,1)" }}
                  />
                </svg>
                <span className="absolute inset-0 grid place-items-center font-display text-[15px] text-white">
                  {avg}
                </span>
              </div>
            </div>
          </div>

          <ul className="relative px-6 py-3">
            {group.skills.map((s, i) => (
              <SkillRow
                key={s.name}
                {...s}
                accent={group.accent}
                delay={i * 70}
                inView={inView}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  const spans = [
    "lg:col-span-7",
    "lg:col-span-5",
    "lg:col-span-5",
    "lg:col-span-7",
  ];

  return (
    <section
      id="skills"
      className="on-dark relative scroll-mt-24 overflow-hidden bg-night py-20 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-tech-dark opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_88%_6%,rgba(2,210,227,.14),transparent_60%),radial-gradient(70%_50%_at_4%_88%,rgba(255,176,32,.10),transparent_62%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-arc/40 to-transparent" />

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          dark
          index="03"
          kicker="Capability index"
          title={
            <>
              Technical
              <br />
              <span className="text-arc text-glow">skills</span>
            </>
          }
          lead="Four domains, twenty core technologies. Levels are a self-assessment against what I have actually shipped — not a badge collection."
          align="between"
        />

        {/* readout strip */}
        <Reveal delay={120}>
          <div className="mt-12 grid grid-cols-2 divide-x divide-white/8 border-y border-white/10 sm:grid-cols-4">
            {[
              { k: "Domains", v: "04" },
              { k: "Technologies", v: "20" },
              { k: "Primary stack", v: "JS · PHP · SQL" },
              { k: "Editor", v: "VS Code" },
            ].map((s) => (
              <div key={s.k} className="px-4 py-5 first:pl-0 sm:px-6">
                <div className="u-label text-white/35">{s.k}</div>
                <div className="mt-2 font-display text-[15px] uppercase tracking-wide text-white sm:text-[17px]">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {SKILL_GROUPS.map((g, i) => (
            <Reveal key={g.id} delay={i * 90} className={spans[i]} y={34}>
              <SkillPanel group={g} span="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}