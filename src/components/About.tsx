import { LANGUAGE_LEVELS, PROFILE } from "@/data/portfolio";
import { useInView } from "@/lib/hooks";
import { Corners, Icon, Reveal, SectionHeading } from "@/components/ui";

const SPEC = [
  { k: "Name", v: PROFILE.name },
  { k: "Role", v: PROFILE.role },
  { k: "University", v: PROFILE.university },
  { k: "Faculty", v: PROFILE.faculty },
  { k: "Degree", v: PROFILE.degree },
  { k: "Study period", v: PROFILE.period },
  { k: "Location", v: `${PROFILE.city}, ${PROFILE.location}` },
  { k: "Languages", v: PROFILE.languages.join(" · ") },
  { k: "GitHub", v: PROFILE.github, href: PROFILE.githubUrl },
];

function LanguageBar({ name, level, note }: { name: string; level: number; note: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between">
        <span className="font-display text-[15px] uppercase tracking-[0.1em] text-ink">{name}</span>
        <span className="u-label text-ink/45">{note}</span>
      </div>
      <div className="relative mt-2.5 h-[3px] w-full bg-ink/8">
        <div
          className="absolute inset-y-0 left-0 bg-arc transition-[width] duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)]"
          style={{ width: inView ? `${level}%` : "0%" }}
        />
        <div
          className="absolute -top-[3px] h-[9px] w-[2px] bg-ink transition-[left] duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)]"
          style={{ left: inView ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden bg-paper py-20 lg:py-32">
      <div className="pointer-events-none absolute inset-0 grid-tech opacity-70" />
      <div className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(2,210,227,.14),transparent_66%)]" />

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="02"
          kicker="Driver profile"
          title={
            <>
              About
              <br />
              <span className="stroke-text-ink">the build</span>
            </>
          }
          lead="A first-year IT undergraduate who treats coursework as a starting point and ships the rest on his own time."
          align="between"
        />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          {/* -------- left: spec sheet -------- */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <div className="relative">
                <div className="chamfer border border-line bg-white p-1.5 shadow-[0_30px_70px_-50px_rgba(9,10,11,.5)]">
                  <div className="relative border border-line/70 bg-paper">
                    <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                      <span className="u-label text-ink/50">Technical file</span>
                      <span className="u-mono u-label text-arc">REV · 2026.01</span>
                    </div>

                    <dl className="divide-y divide-line">
                      {SPEC.map((row) => (
                        <div
                          key={row.k}
                          className="group grid grid-cols-[104px_1fr] items-baseline gap-3 px-5 py-3 transition-colors duration-300 hover:bg-arc/[.06]"
                        >
                          <dt className="u-label pt-0.5 text-ink/40">{row.k}</dt>
                          <dd className="font-body text-[13.5px] leading-snug text-ink">
                            {row.href ? (
                              <a
                                href={row.href}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="inline-flex items-center gap-1.5 text-arc-deep underline decoration-arc/40 underline-offset-4 transition-colors hover:text-ink"
                              >
                                {row.v}
                                <Icon name="external" className="h-3 w-3" />
                              </a>
                            ) : (
                              row.v
                            )}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className="flex items-center justify-between border-t border-line bg-ink/[.02] px-5 py-3">
                      <span className="u-label text-ink/35">Status</span>
                      <span className="inline-flex items-center gap-2">
                        <span className="h-1.5 w-1.5 bg-lime blink" />
                        <span className="u-label text-ink">Enrolled · Year 3</span>
                      </span>
                    </div>
                  </div>
                </div>
                <Corners color="#02D2E3" size={14} />
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center gap-3 chamfer-sm border border-line bg-white px-4 py-3.5 transition-all duration-300 hover:border-arc hover:shadow-[0_0_26px_-10px_rgba(2,210,227,.8)]"
                  >
                    <Icon name="github" className="h-4 w-4 text-ink transition-colors group-hover:text-arc-deep" />
                    <span className="min-w-0">
                      <span className="block u-label text-ink/40">GitHub</span>
                      <span className="block truncate font-body text-[12px] text-ink">{PROFILE.github}</span>
                    </span>
                  </a>
                  <div className="flex items-center gap-3 chamfer-sm border border-line bg-white px-4 py-3.5">
                    <Icon name="pin" className="h-4 w-4 text-arc-deep" />
                    <span>
                      <span className="block u-label text-ink/40">Based in</span>
                      <span className="block font-body text-[12px] text-ink">{PROFILE.location}</span>
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* -------- right: narrative -------- */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-display text-[clamp(1.35rem,2.6vw,2rem)] font-light uppercase leading-[1.24] tracking-[-0.01em] text-ink">
                I build interfaces that stay{" "}
                <span className="text-arc-deep">fast, readable and honest</span> — from the first
                wireframe to the last database index.
              </p>
            </Reveal>

            <div className="mt-8 space-y-5">
              {PROFILE.intro.map((para, i) => (
                <Reveal key={i} delay={80 + i * 70}>
                  <p className="max-w-2xl text-[15px] leading-[1.85] text-ink/68">{para}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <div className="mt-10 border-t border-line pt-8">
                <span className="u-label text-ink/40">Focus areas</span>
                <div className="mt-4 flex flex-wrap gap-2">
                  {PROFILE.focus.map((f, i) => (
                    <span
                      key={f}
                      className="group inline-flex items-center gap-2 chamfer-sm border border-line bg-white px-3.5 py-2 font-body text-[11px] uppercase tracking-[0.14em] text-ink/70 transition-all duration-300 hover:border-arc hover:text-ink"
                    >
                      <span
                        className="h-1 w-1 rotate-45 bg-arc transition-transform duration-300 group-hover:scale-150"
                        style={{ animationDelay: `${i * 60}ms` }}
                      />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
                <div className="space-y-6">
                  <span className="u-label text-ink/40">Languages</span>
                  {LANGUAGE_LEVELS.map((l) => (
                    <LanguageBar key={l.name} {...l} />
                  ))}
                </div>

                <div className="relative chamfer-sm border border-ink/12 bg-ink p-6">
                  <div className="absolute inset-0 grid-tech-dark opacity-60" />
                  <div className="relative">
                    <span className="u-label text-arc">Currently learning</span>
                    <ul className="mt-4 space-y-3">
                      {[
                        "React component patterns & hooks",
                        "REST APIs with PHP and JSON",
                        "Query tuning and indexing",
                        "Subnetting in Packet Tracer",
                      ].map((t) => (
                        <li key={t} className="flex items-start gap-3">
                          <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-arc" />
                          <span className="font-body text-[13px] leading-snug text-white/78">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}