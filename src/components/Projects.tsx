import { useEffect, useMemo, useState } from "react";
import { PROFILE, PROJECTS, PROJECT_FILTERS, type Project } from "@/data/portfolio";
import { useBodyLock } from "@/lib/hooks";
import { ProjectArt } from "@/components/Art";
import { ArcButton, Icon, Reveal, SectionHeading, TechChip } from "@/components/ui";
import { cn } from "@/utils/cn";

/* Asymmetric 12-column rhythm — every row closes cleanly at 12. */
const SPANS = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

/* ------------------------------------------------------------ card ---- */
function ProjectCard({
  project,
  span,
  onOpen,
  delay,
}: {
  project: Project;
  span: string;
  onOpen: () => void;
  delay: number;
}) {
  return (
    <Reveal delay={delay} y={36} className={span}>
      <article className="group relative h-full">
        <div className="relative h-full chamfer border border-white/10 bg-steel/60 p-1.5 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1.5 hover:border-[color:var(--pa)] hover:shadow-[0_50px_90px_-60px_var(--pa)]"
          style={{ ["--pa" as string]: project.accent }}
        >
          <div className="relative flex h-full flex-col border border-white/6 bg-night">
            {/* thumbnail */}
            <button
              onClick={onOpen}
              aria-label={`Open case study for ${project.title}`}
              className="relative block aspect-[16/10] w-full overflow-hidden text-left"
            >
              <div className="absolute inset-0 transition-transform duration-[1.1s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]">
                <ProjectArt project={project} />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-night/10 to-transparent" />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100"
                style={{ background: project.accent }}
              />
              <span className="pointer-events-none absolute right-4 top-4 grid h-9 w-9 place-items-center chamfer-sm border border-white/20 bg-night/70 text-white/70 opacity-0 backdrop-blur-sm transition-all duration-400 group-hover:opacity-100">
                <Icon name="expand" className="h-4 w-4" />
              </span>
            </button>

            {/* body */}
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span
                  className="u-mono font-display text-[13px] tracking-widest"
                  style={{ color: project.accent }}
                >
                  {project.index}
                </span>
                <span className="h-px flex-1 bg-white/10" />
                <span className="u-label text-white/40">{project.category}</span>
                <span className="u-label text-white/25">{project.year}</span>
              </div>

              <h3 className="mt-3.5 font-display text-[clamp(1.3rem,2.2vw,1.75rem)] font-medium uppercase leading-[1.05] tracking-[-0.01em] text-white">
                {project.title}
              </h3>
              <p className="mt-1 font-body text-[11px] uppercase tracking-[0.18em] text-white/40">
                {project.subtitle}
              </p>
              <p className="mt-4 text-[13.5px] leading-relaxed text-muted">{project.summary}</p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.tech.slice(0, 5).map((t) => (
                  <TechChip key={t} dark>
                    {t}
                  </TechChip>
                ))}
                {project.tech.length > 5 && (
                  <TechChip dark>+{project.tech.length - 5}</TechChip>
                )}
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-6">
                <button
                  onClick={onOpen}
                  className="group/b inline-flex items-center gap-2 chamfer-sm px-4 py-2.5 font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-night transition-all duration-300 hover:shadow-[0_0_24px_-6px_var(--pa)]"
                  style={{ background: project.accent, ["--pa" as string]: project.accent }}
                >
                  View Project
                  <Icon
                    name="arrow-right"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover/b:translate-x-1"
                  />
                </button>
                <a
                  href={PROFILE.repoIndexUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 chamfer-sm border border-white/18 px-4 py-2.5 font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 transition-all duration-300 hover:border-white/45 hover:text-white"
                >
                  <Icon name="github" className="h-3.5 w-3.5" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ---------------------------------------------------------- drawer ---- */
function ProjectDrawer({
  project,
  onClose,
  onStep,
}: {
  project: Project | null;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const open = Boolean(project);
  useBodyLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onStep]);

  return (
    <div
      className={cn("fixed inset-0 z-[70]", open ? "pointer-events-auto" : "pointer-events-none")}
      role="dialog"
      aria-modal="true"
      aria-label={project ? `${project.title} case study` : "Project case study"}
      aria-hidden={!open}
      inert={!open}
    >
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-ink/80 backdrop-blur-sm transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0"
        )}
      />
      <aside
        className={cn(
          "on-dark absolute inset-y-0 right-0 flex w-full max-w-[680px] flex-col border-l border-white/12 bg-night shadow-[-40px_0_100px_-40px_rgba(0,0,0,.9)] transition-transform duration-[600ms] ease-[cubic-bezier(.16,1,.3,1)]",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {project && (
          <>
            <header className="flex shrink-0 items-center gap-3 border-b border-white/10 px-5 py-4 sm:px-7">
              <span
                className="u-mono font-display text-[15px] tracking-widest"
                style={{ color: project.accent }}
              >
                {project.index}
              </span>
              <span className="h-4 w-px bg-white/15" />
              <span className="u-label truncate text-white/45">{project.category} · {project.year}</span>
              <div className="ml-auto flex items-center gap-1.5">
                <button
                  onClick={() => onStep(-1)}
                  aria-label="Previous project"
                  className="grid h-9 w-9 place-items-center chamfer-sm border border-white/15 text-white/65 transition-colors hover:border-arc hover:text-arc"
                >
                  <Icon name="chevron-left" className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onStep(1)}
                  aria-label="Next project"
                  className="grid h-9 w-9 place-items-center chamfer-sm border border-white/15 text-white/65 transition-colors hover:border-arc hover:text-arc"
                >
                  <Icon name="chevron-right" className="h-4 w-4" />
                </button>
                <button
                  onClick={onClose}
                  aria-label="Close case study"
                  className="grid h-9 w-9 place-items-center chamfer-sm bg-white/8 text-white transition-colors hover:bg-danger"
                >
                  <Icon name="close" className="h-4 w-4" />
                </button>
              </div>
            </header>

            <div className="on-dark flex-1 overflow-y-auto">
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/10">
                <ProjectArt project={project} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/90 to-transparent" />
              </div>

              <div className="px-5 py-7 sm:px-7">
                <h3 className="font-display text-[clamp(1.9rem,5vw,2.8rem)] font-semibold uppercase leading-[0.95] tracking-[-0.02em] text-white">
                  {project.title}
                </h3>
                <p className="mt-2 font-body text-[12px] uppercase tracking-[0.2em]" style={{ color: project.accent }}>
                  {project.subtitle}
                </p>

                <div className="mt-6 grid grid-cols-3 divide-x divide-white/10 border-y border-white/10">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="px-3 py-4 first:pl-0">
                      <div className="u-label text-white/35">{m.label}</div>
                      <div className="mt-1.5 font-display text-[18px] uppercase text-white">{m.value}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-7">
                  <span className="u-label text-white/35">Role</span>
                  <p className="mt-2 font-body text-[14px] text-white/80">{project.role}</p>
                </div>

                <div className="mt-7">
                  <span className="u-label text-white/35">Overview</span>
                  <p className="mt-3 text-[14.5px] leading-[1.8] text-muted">{project.detail}</p>
                </div>

                <div className="mt-8">
                  <span className="u-label text-white/35">Key functionality</span>
                  <ul className="mt-4 space-y-0">
                    {project.features.map((f, i) => (
                      <li
                        key={f}
                        className="group flex items-start gap-4 border-t border-white/8 py-3.5 last:border-b"
                      >
                        <span className="u-mono mt-1 font-body text-[10px] tracking-widest text-white/30">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[13.5px] leading-snug text-white/78">{f}</span>
                        <Icon
                          name="check"
                          className="ml-auto mt-1 h-3.5 w-3.5 shrink-0 opacity-40 transition-opacity group-hover:opacity-100"
                          strokeWidth={2}
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <span className="u-label text-white/35">Stack</span>
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <TechChip key={t} dark accent={project.accent}>
                        {t}
                      </TechChip>
                    ))}
                  </div>
                </div>

                <div className="mt-8 chamfer-sm border border-white/10 bg-white/[.03] p-5">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-amber" />
                    <span className="u-label text-amber">Deployment note</span>
                  </div>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-muted">
                    A public live demo has not been published for this build yet. Source and commit
                    history live under{" "}
                    <span className="text-white">{PROFILE.github}</span> on GitHub — open the
                    repository index to browse it.
                  </p>
                </div>
              </div>
            </div>

            <footer className="flex shrink-0 flex-wrap items-center gap-2.5 border-t border-white/10 bg-night/95 px-5 py-4 sm:px-7">
              <ArcButton href={PROFILE.repoIndexUrl} icon="arrow-right">
                View on GitHub
              </ArcButton>
              <ArcButton variant="dark" onClick={onClose}>
                Close
              </ArcButton>
              <span className="ml-auto hidden u-label text-white/25 sm:block">
                ← / → to browse · ESC to close
              </span>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

/* --------------------------------------------------------- section ---- */
export function Projects() {
  const [filter, setFilter] = useState<(typeof PROJECT_FILTERS)[number]>("All");
  const [showAll, setShowAll] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );
  const visible = showAll ? filtered : filtered.slice(0, 4);
  const openIndex = filtered.findIndex((p) => p.id === openId);
  const openProject = openIndex >= 0 ? filtered[openIndex] : null;

  const step = (dir: 1 | -1) => {
    if (openIndex < 0) return;
    const next = (openIndex + dir + filtered.length) % filtered.length;
    setOpenId(filtered[next].id);
  };

  const counts = useMemo(
    () =>
      PROJECT_FILTERS.reduce<Record<string, number>>((acc, f) => {
        acc[f] = f === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === f).length;
        return acc;
      }, {}),
    []
  );

  return (
    <section
      id="projects"
      className="on-dark relative scroll-mt-24 overflow-hidden bg-[#0b0c11] py-20 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-tech-dark opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_10%_0%,rgba(255,61,139,.10),transparent_60%),radial-gradient(70%_50%_at_92%_78%,rgba(2,210,227,.12),transparent_62%)]" />

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          dark
          index="04"
          kicker="Race record"
          title={
            <>
              Selected
              <br />
              <span className="stroke-text">projects</span>
            </>
          }
          lead="Seven builds shipped end to end — storefronts, content sites and two record-keeping systems. Open any card for the full case study."
          align="between"
        />

        {/* controls */}
        <Reveal delay={100}>
          <div className="mt-12 flex flex-col gap-4 border-y border-white/10 py-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-2 u-label text-white/30">Filter</span>
              {PROJECT_FILTERS.map((f) => {
                const on = filter === f;
                return (
                  <button
                    key={f}
                    onClick={() => {
                      setFilter(f);
                      setShowAll(false);
                    }}
                    aria-pressed={on}
                    className={cn(
                      "inline-flex items-center gap-2 chamfer-sm border px-3.5 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-300",
                      on
                        ? "border-arc bg-arc text-night"
                        : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                    )}
                  >
                    {f}
                    <span className={cn("u-mono text-[9px]", on ? "text-night/60" : "text-white/30")}>
                      {String(counts[f]).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-3">
              <span className="u-label text-white/30">
                Showing {String(visible.length).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
              </span>
              <span className="hidden h-4 w-px bg-white/12 sm:block" />
              <span className="hidden u-label text-white/30 sm:block">Grid · 12 col</span>
            </div>
          </div>
        </Reveal>

        {/* grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
          {visible.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              span={cn(
                filtered.length === 1 ? "lg:col-span-12" : SPANS[i % SPANS.length],
                "md:col-span-1"
              )}
              delay={(i % 3) * 90}
              onOpen={() => setOpenId(p.id)}
            />
          ))}
        </div>

        {filtered.length > 4 && (
          <Reveal delay={80}>
            <div className="mt-12 flex flex-col items-center gap-4">
              <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <ArcButton
                variant="dark"
                size="lg"
                icon={showAll ? "arrow-up" : "arrow-down"}
                onClick={() => setShowAll((v) => !v)}
              >
                {showAll ? "Collapse gallery" : `View all projects (${filtered.length})`}
              </ArcButton>
            </div>
          </Reveal>
        )}
      </div>

      <ProjectDrawer project={openProject} onClose={() => setOpenId(null)} onStep={step} />
    </section>
  );
}