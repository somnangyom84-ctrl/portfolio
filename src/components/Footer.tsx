import { NAV_ITEMS, PROFILE, TICKER } from "@/data/portfolio";
import { useScrollProgress, useSmoothScrollTo } from "@/lib/hooks";
import { downloadCV } from "@/lib/cv";
import { Icon, Ticker } from "@/components/ui";
import { cn } from "@/utils/cn";

export function Footer() {
  const scrollTo = useSmoothScrollTo();
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative overflow-hidden bg-ink">
      <div className="pointer-events-none absolute inset-0 grid-tech-dark opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-arc/50 to-transparent" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(2,210,227,.14),transparent_66%)]" />

      <div className="relative border-b border-white/8 py-4">
        <Ticker items={TICKER} reverse />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center chamfer-sm bg-arc text-night">
                <span className="font-display text-[17px] font-bold leading-none">YS</span>
              </span>
              <div>
                <div className="font-display text-[18px] font-medium uppercase tracking-[0.14em] text-white">
                  Yom Somnang
                </div>
                <div className="mt-1 u-label text-arc">IT Student / Junior Web Developer</div>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-muted">
              Information Technology undergraduate at the {PROFILE.university}, building for the web
              from {PROFILE.city}, {PROFILE.location}.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 chamfer-sm border border-white/15 px-4 py-2.5 font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75 transition-all duration-300 hover:border-arc hover:text-arc"
              >
                <Icon name="github" className="h-3.5 w-3.5" />
                {PROFILE.github}
              </a>
              <button
                onClick={downloadCV}
                className="inline-flex items-center gap-2 chamfer-sm bg-white/8 px-4 py-2.5 font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 transition-all duration-300 hover:bg-arc hover:text-night"
              >
                <Icon name="download" className="h-3.5 w-3.5" />
                Download CV
              </button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <span className="u-label text-white/30">Navigation</span>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1">
              {NAV_ITEMS.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => scrollTo(n.id)}
                    className="group flex w-full items-center gap-2 py-1.5 text-left font-body text-[13px] uppercase tracking-[0.12em] text-white/55 transition-colors duration-300 hover:text-arc"
                  >
                    <span className="u-mono text-[9px] text-arc/50">{n.index}</span>
                    {n.label}
                    <span className="ml-auto h-px w-0 bg-arc transition-all duration-300 group-hover:w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <span className="u-label text-white/30">Studio readout</span>
            <dl className="mt-5 space-y-3 border-l border-white/10 pl-5">
              {[
                ["Base", `${PROFILE.city}, ${PROFILE.location}`],
                ["Timezone", PROFILE.utc],
                ["Languages", PROFILE.languages.join(" · ")],
                ["Status", "Open to opportunities"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="u-label text-white/28">{k}</dt>
                  <dd className="mt-1 font-body text-[13px] text-white/75">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* wordmark */}
        <div className="mt-16 select-none overflow-hidden lg:mt-20">
          <div className="stroke-text whitespace-nowrap text-center font-display text-[clamp(3rem,15.5vw,14rem)] font-semibold uppercase leading-[0.8] tracking-[-0.03em] opacity-40">
            Yom Somnang
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-center gap-6 border-t border-white/8 pt-7 sm:flex-row sm:justify-between">
          <p className="text-center font-body text-[11px] tracking-wide text-white/35 sm:text-left">
            © {year} Yom Somnang. All rights reserved. Designed &amp; built in Cambodia.
          </p>

          <div className="flex items-center gap-4">
            <span className="hidden u-label text-white/25 md:block">
              Built with React · Vite · Tailwind
            </span>
            <button
              onClick={() => scrollTo("home")}
              className="group inline-flex items-center gap-2 chamfer-sm border border-white/15 px-4 py-2.5 font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 transition-all duration-300 hover:border-arc hover:text-arc"
            >
              Back to top
              <Icon
                name="arrow-up"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function BackToTop() {
  const { progress, y } = useScrollProgress();
  const scrollTo = useSmoothScrollTo();
  const visible = y > 700;
  const c = 2 * Math.PI * 20;

  return (
    <button
      onClick={() => scrollTo("home")}
      aria-label="Back to top"
      className={cn(
        "group fixed bottom-5 right-5 z-[60] grid h-13 w-13 place-items-center chamfer-sm border border-arc/40 bg-night/90 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:border-arc hover:shadow-[0_0_30px_-6px_rgba(2,210,227,.9)] sm:bottom-8 sm:right-8",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
      style={{ height: 52, width: 52 }}
    >
      <svg viewBox="0 0 44 44" className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="22" cy="22" r="20" fill="none" stroke="rgba(255,255,255,.10)" strokeWidth="1.5" />
        <circle
          cx="22"
          cy="22"
          r="20"
          fill="none"
          stroke="#02D2E3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
        />
      </svg>
      <Icon
        name="arrow-up"
        className="relative h-4 w-4 text-white transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-arc"
      />
    </button>
  );
}