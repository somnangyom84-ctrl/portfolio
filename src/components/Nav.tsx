import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { NAV_ITEMS, PROFILE } from "@/data/portfolio";
import { useBodyLock, useLocalClock, useScrollProgress, useScrollSpy, useSmoothScrollTo } from "@/lib/hooks";
import { downloadCV } from "@/lib/cv";
import { Icon } from "@/components/ui";

const IDS = NAV_ITEMS.map((n) => n.id);

export function Nav() {
  const active = useScrollSpy(IDS, 160);
  const { progress, y } = useScrollProgress();
  const scrollTo = useSmoothScrollTo();
  const [open, setOpen] = useState(false);
  const clock = useLocalClock(PROFILE.timezone);
  const solid = y > 40;

  useBodyLock(open);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    // let the overlay close before measuring
    window.setTimeout(() => scrollTo(id), open ? 60 : 0);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500",
          solid
            ? "border-b border-white/10 bg-night/88 backdrop-blur-xl shadow-[0_18px_50px_-30px_rgba(0,0,0,.9)]"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[66px] max-w-[1500px] items-center gap-4 px-5 sm:px-8 lg:h-[84px] lg:px-12">
          {/* ---- mark ---- */}
          <button
            onClick={() => go("home")}
            className="group flex shrink-0 items-center gap-3"
            aria-label="Yom Somnang — back to top"
          >
            <span className="relative grid h-9 w-9 place-items-center chamfer-sm bg-arc text-night transition-all duration-500 group-hover:bg-white lg:h-10 lg:w-10">
              <span className="font-display text-[15px] font-bold leading-none tracking-tight">YS</span>
            </span>
            <span className="hidden leading-none sm:block">
              <span className="block font-display text-[15px] font-medium uppercase tracking-[0.16em] text-white">
                Yom Somnang
              </span>
              <span className="mt-1 block font-body text-[9px] uppercase tracking-[0.3em] text-arc">
                IT / Web Developer
              </span>
            </span>
          </button>

          {/* ---- desktop links ---- */}
          <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const on = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "group relative px-3 py-2.5 font-body text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300",
                    on ? "text-arc" : "text-white/62 hover:text-white"
                  )}
                >
                  <span className="mr-1.5 font-body text-[8px] tracking-[0.2em] text-arc/55">
                    {item.index}
                  </span>
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-2.5 bottom-1 h-px origin-left bg-arc transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
                      on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                  {on && (
                    <span className="absolute -top-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rotate-45 bg-arc" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ---- clock + CV ---- */}
          <div className="ml-auto flex items-center gap-3 lg:ml-5">
            <span className="hidden items-center gap-2 border-l border-white/12 pl-4 xl:flex">
              <Icon name="clock" className="h-3.5 w-3.5 text-arc" />
              <span className="u-mono font-body text-[11px] tabular-nums text-white/70">{clock}</span>
              <span className="u-label text-white/30">{PROFILE.utc}</span>
            </span>
            <button
              onClick={downloadCV}
              className="group hidden items-center gap-2 chamfer-sm bg-arc px-4 py-2.5 font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-night transition-all duration-300 hover:bg-white hover:shadow-[0_0_26px_-4px_rgba(2,210,227,.9)] sm:inline-flex"
            >
              Download CV
              <Icon
                name="download"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </button>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center chamfer-sm border border-white/18 text-white transition-colors hover:border-arc hover:text-arc lg:hidden"
            >
              <Icon name={open ? "close" : "menu"} className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* ---- scroll progress rail ---- */}
        <div className="relative h-[2px] w-full bg-white/8">
          <div
            className="h-full bg-gradient-to-r from-arc-deep via-arc to-white transition-[width] duration-150 ease-out"
            style={{ width: `${Math.max(progress * 100, 0.5)}%` }}
          />
        </div>
      </header>

      {/* ---- mobile overlay ---- */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
        inert={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-night/95 backdrop-blur-xl transition-opacity duration-400",
            open ? "opacity-100" : "opacity-0"
          )}
        />
        <div className="absolute inset-0 grid-tech-dark opacity-40" />
        <nav
          aria-label="Mobile"
          className={cn(
            "on-dark absolute inset-x-0 top-[68px] bottom-0 overflow-y-auto px-5 pb-16 pt-6 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] sm:px-8",
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          )}
        >
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              style={{ transitionDelay: open ? `${90 + i * 45}ms` : "0ms" }}
              className={cn(
                "group flex w-full items-baseline gap-4 border-b border-white/8 py-4 text-left transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
                open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
              )}
            >
              <span className="u-mono font-body text-[10px] tracking-[0.2em] text-arc">
                {item.index}
              </span>
              <span
                className={cn(
                  "font-display text-[2rem] font-medium uppercase leading-none tracking-tight transition-colors duration-300",
                  active === item.id ? "text-arc" : "text-white group-hover:text-arc"
                )}
              >
                {item.label}
              </span>
              <Icon
                name="arrow-right"
                className="ml-auto h-4 w-4 self-center text-white/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-arc"
              />
            </button>
          ))}

          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => {
                downloadCV();
                setOpen(false);
              }}
              className="inline-flex items-center justify-center gap-2 chamfer-sm bg-arc px-6 py-4 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-night"
            >
              Download CV
              <Icon name="download" className="h-4 w-4" />
            </button>
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center gap-2 chamfer-sm border border-white/20 px-6 py-4 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80"
            >
              <Icon name="github" className="h-4 w-4" />
              {PROFILE.github}
            </a>
          </div>

          <p className="mt-8 font-body text-[10px] uppercase tracking-[0.24em] text-white/30">
            {PROFILE.city} · {clock} · {PROFILE.utc}
          </p>
        </nav>
      </div>
    </>
  );
}