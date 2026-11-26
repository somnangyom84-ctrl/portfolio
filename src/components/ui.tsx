import React from "react";
import { cn } from "@/utils/cn";
import { useInView } from "@/lib/hooks";

/* ============================================================ REVEAL ==== */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  as: Tag = "div",
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: React.ElementType;
  once?: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ once });
  return (
    <Tag
      ref={ref}
      className={cn("reveal", inView && "is-in", className)}
      style={
        { "--reveal-delay": `${delay}ms`, "--reveal-y": `${y}px` } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}

/* ============================================================ BUTTON ==== */
type BtnProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "solid" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: IconName;
  ariaLabel?: string;
  download?: boolean;
  target?: string;
};

export function ArcButton({
  children,
  onClick,
  href,
  variant = "solid",
  size = "md",
  className,
  icon,
  ariaLabel,
  target,
}: BtnProps) {
  const base =
    "group/btn relative inline-flex items-center justify-center gap-2.5 font-body font-medium uppercase tracking-[0.16em] chamfer-sm transition-[transform,background-color,color,box-shadow] duration-300 ease-[cubic-bezier(.16,1,.3,1)] active:translate-y-px select-none";
  const sizes = {
    sm: "text-[10px] px-4 py-2.5",
    md: "text-[11px] px-6 py-3.5",
    lg: "text-[12px] px-8 py-4.5",
  }[size];
  const variants = {
    solid:
      "bg-arc text-night hover:bg-white hover:shadow-[0_0_30px_-4px_rgba(2,210,227,.85)] hover:-translate-y-0.5",
    outline:
      "bg-transparent text-ink border border-ink/25 hover:border-arc hover:text-arc-deep hover:-translate-y-0.5 hover:shadow-[0_0_24px_-8px_rgba(2,210,227,.7)]",
    dark: "bg-transparent text-white/85 border border-white/20 hover:border-arc hover:text-arc hover:-translate-y-0.5 hover:shadow-[0_0_26px_-8px_rgba(2,210,227,.8)]",
    ghost: "bg-ink/[.04] text-ink hover:bg-ink hover:text-white",
  }[variant];

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {icon && (
        <Icon
          name={icon}
          className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        target={target ?? (href.startsWith("http") ? "_blank" : undefined)}
        rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
        className={cn(base, sizes, variants, className)}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(base, sizes, variants, className)}
    >
      {inner}
    </button>
  );
}

/* ==================================================== SECTION HEADING ==== */
export function SectionHeading({
  index,
  kicker,
  title,
  lead,
  dark = false,
  align = "left",
  className,
}: {
  index: string;
  kicker: string;
  title: React.ReactNode;
  lead?: string;
  dark?: boolean;
  align?: "left" | "between";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "between" && "lg:flex-row lg:items-end lg:justify-between lg:gap-16",
        className
      )}
    >
      <div className="max-w-3xl">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="u-label text-arc">{index}</span>
            <span className={cn("h-px w-10", dark ? "bg-white/25" : "bg-ink/20")} />
            <span className={cn("u-label", dark ? "text-muted" : "text-ink/50")}>{kicker}</span>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2
            className={cn(
              "mt-5 font-display text-[clamp(2.4rem,6.2vw,5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.02em]",
              dark ? "text-white" : "text-ink"
            )}
          >
            {title}
          </h2>
        </Reveal>
      </div>
      {lead && (
        <Reveal delay={160} className="lg:max-w-sm">
          <p
            className={cn(
              "border-l-2 border-arc pl-5 text-[15px] leading-relaxed",
              dark ? "text-muted" : "text-ink/62"
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ============================================================== CHIPS ==== */
export function TechChip({
  children,
  dark = false,
  accent,
}: {
  children: React.ReactNode;
  dark?: boolean;
  accent?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2.5 py-1 font-body text-[10px] font-medium uppercase tracking-[0.14em] transition-colors duration-300",
        dark
          ? "border-white/15 bg-white/[.04] text-white/70"
          : "border-ink/12 bg-ink/[.03] text-ink/60"
      )}
      style={accent ? { borderColor: `${accent}44`, color: accent } : undefined}
    >
      {children}
    </span>
  );
}

/* ============================================================ TICKER ==== */
export function Ticker({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className="mask-fade-x relative flex overflow-hidden">
      <div
        className={cn(
          "flex shrink-0 items-center gap-10 pr-10",
          reverse ? "marquee-track-rev" : "marquee-track"
        )}
      >
        {row.map((t, i) => (
          <span key={i} className="flex shrink-0 items-center gap-10">
            <span className="font-display text-[13px] font-medium uppercase tracking-[0.3em] text-white/45">
              {t}
            </span>
            <span className="h-1 w-1 rotate-45 bg-arc" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* =============================================================== ICON ==== */
export type IconName =
  | "arrow-right"
  | "arrow-up"
  | "arrow-down"
  | "download"
  | "close"
  | "zoom-in"
  | "zoom-out"
  | "chevron-left"
  | "chevron-right"
  | "github"
  | "pin"
  | "check"
  | "copy"
  | "menu"
  | "external"
  | "expand"
  | "reset"
  | "clock"
  | "spark"
  | "send"
  | "grid"
  | "layers"
  | "markup"
  | "style"
  | "script"
  | "dom"
  | "atom"
  | "device"
  | "palette"
  | "server"
  | "cup"
  | "chip"
  | "brackets"
  | "hash"
  | "database"
  | "table"
  | "sync"
  | "branch"
  | "cloud"
  | "router"
  | "network";

const PATHS: Record<IconName, React.ReactNode> = {
  "arrow-right": <path d="M4 12h15m-6-6 6 6-6 6" />,
  "arrow-up": <path d="M12 19V5m-6 6 6-6 6 6" />,
  "arrow-down": <path d="M12 5v14m6-6-6 6-6-6" />,
  download: <path d="M12 3v12m-5-5 5 5 5-5M4 20h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  "zoom-in": (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.6-3.6M11 8v6M8 11h6" />
    </>
  ),
  "zoom-out": (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.6-3.6M8 11h6" />
    </>
  ),
  "chevron-left": <path d="m15 5-7 7 7 7" />,
  "chevron-right": <path d="m9 5 7 7-7 7" />,
  github: (
    <path d="M9 19c-4.3 1.4-4.3-2.3-6-2.8m12 5.3v-3.6a3.1 3.1 0 0 0-.9-2.4c2.9-.3 6-1.4 6-6.4a5 5 0 0 0-1.4-3.5 4.6 4.6 0 0 0-.1-3.5s-1.1-.3-3.7 1.4a12.6 12.6 0 0 0-6.6 0C5.7 1.3 4.6 1.6 4.6 1.6a4.6 4.6 0 0 0-.1 3.5A5 5 0 0 0 3 8.6c0 5 3 6.1 5.9 6.4a3.1 3.1 0 0 0-.9 2.4V21" />
  ),
  pin: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  check: <path d="m4 12.5 5 5L20 6.5" />,
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="1" />
      <path d="M5 15H4V4h11v1" />
    </>
  ),
  menu: <path d="M3 7h18M3 12h18M3 17h18" />,
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6" />,
  expand: <path d="M4 9V4h5M20 15v5h-5M20 9V4h-5M4 15v5h5" />,
  reset: <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1M3 4v5h5" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.2l3.4 2" />
    </>
  ),
  spark: <path d="M12 3v6m0 6v6m9-9h-6M9 12H3m13.5-6.5-4 4m-3 3-4 4m11 0-4-4m-3-3-4-4" />,
  send: <path d="M21 3 10.5 13.5M21 3l-6.8 18-3.7-7.5L3 9.8 21 3Z" />,
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" />
      <rect x="13.5" y="3.5" width="7" height="7" />
      <rect x="3.5" y="13.5" width="7" height="7" />
      <rect x="13.5" y="13.5" width="7" height="7" />
    </>
  ),
  layers: <path d="m12 3 9 5-9 5-9-5 9-5Zm9 9-9 5-9-5m18 4-9 5-9-5" />,
  markup: <path d="m8 6-5 6 5 6m8-12 5 6-5 6M14 4l-4 16" />,
  style: <path d="M4 4h16v5H4zM4 13h7v7H4zM15 13h5v7h-5z" />,
  script: <path d="M9 8 5.5 12 9 16m6-8 3.5 4-3.5 4M13 5l-2 14" />,
  dom: (
    <>
      <rect x="9" y="3" width="6" height="5" />
      <rect x="3" y="16" width="6" height="5" />
      <rect x="15" y="16" width="6" height="5" />
      <path d="M12 8v4m-6 4v-2h12v2" />
    </>
  ),
  atom: (
    <>
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="9.5" ry="4" />
      <ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(120 12 12)" />
    </>
  ),
  device: (
    <>
      <rect x="2.5" y="4" width="13" height="10" rx="1" />
      <rect x="16" y="9" width="5.5" height="11" rx="1" />
      <path d="M6 18h6" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-1 2-2s-.7-1.6-.7-2.4c0-.8.7-1.6 1.7-1.6H17a4 4 0 0 0 4-4c0-4.4-4-8-9-8Z" />
      <circle cx="7.5" cy="11" r="1" />
      <circle cx="12" cy="8" r="1" />
      <circle cx="16.5" cy="11" r="1" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="1" />
      <rect x="3" y="13" width="18" height="7" rx="1" />
      <path d="M7 7.5h.01M7 16.5h.01M11 7.5h4M11 16.5h4" />
    </>
  ),
  cup: <path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Zm13 1.5h2.5a2.5 2.5 0 0 1 0 5H17M6 3v2m4-2v2m4-2v2" />,
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M10 3v4m4-4v4m-4 10v4m4-4v4M3 10h4m-4 4h4m10-4h4m-4 4h4" />
    </>
  ),
  brackets: <path d="M8 4H5v16h3m8-16h3v16h-3M11 9l-2 3 2 3m3-6 2 3-2 3" />,
  hash: <path d="M6 9h13M5 15h13M10 4 8 20m8-16-2 16" />,
  database: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  table: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <path d="M3 10h18M9 10v10M3 15h18" />
    </>
  ),
  sync: <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8M20 4v4h-4M20 12a8 8 0 0 1-13.7 5.6L4 16m0 4v-4h4" />,
  branch: (
    <>
      <circle cx="7" cy="5.5" r="2.5" />
      <circle cx="7" cy="18.5" r="2.5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M7 8v8m10-4.5c0 3.5-3 4.5-6 4.5" />
    </>
  ),
  cloud: <path d="M7 18a4 4 0 0 1-.4-8A6 6 0 0 1 18 9.5a3.8 3.8 0 0 1-.5 8.5H7Z" />,
  router: (
    <>
      <rect x="3" y="13" width="18" height="7" rx="1" />
      <path d="M7 16.5h.01M11 16.5h.01M12 9V6m-4 5 4-5 4 5M8 4a5.7 5.7 0 0 1 8 0" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="4.5" r="2" />
      <circle cx="4.5" cy="18" r="2" />
      <circle cx="19.5" cy="18" r="2" />
      <path d="M12 6.5v5m0 0-6 4.8m6-4.8 6 4.8M6.5 18h11" />
    </>
  ),
};

export function Icon({
  name,
  className,
  strokeWidth = 1.6,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}

/* ==================================================== CORNER BRACKETS ==== */
export function Corners({ color = "#02D2E3", size = 16 }: { color?: string; size?: number }) {
  const s = { width: size, height: size, borderColor: color };
  return (
    <>
      <span className="pointer-events-none absolute left-0 top-0 border-l border-t" style={s} />
      <span className="pointer-events-none absolute right-0 top-0 border-r border-t" style={s} />
      <span className="pointer-events-none absolute bottom-0 left-0 border-b border-l" style={s} />
      <span className="pointer-events-none absolute bottom-0 right-0 border-b border-r" style={s} />
    </>
  );
}