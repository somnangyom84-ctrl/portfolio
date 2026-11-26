import { cn } from "@/utils/cn";
import type { Project } from "@/data/portfolio";

/* ============================================================
   PROJECT ART
   Every thumbnail is drawn, not photographed — a schematic
   plate per project in its own accent hue.
   ============================================================ */

const Frame = ({ accent, children }: { accent: string; children: React.ReactNode }) => (
  <>
    <defs>
      <linearGradient id={`bg-${accent.slice(1)}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#12141b" />
        <stop offset="100%" stopColor="#0b0c11" />
      </linearGradient>
      <radialGradient id={`glow-${accent.slice(1)}`} cx="0.5" cy="0.42" r="0.62">
        <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </radialGradient>
      <pattern id={`grid-${accent.slice(1)}`} width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M24 0H0v24" fill="none" stroke="#ffffff" strokeOpacity="0.055" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="480" height="300" fill={`url(#bg-${accent.slice(1)})`} />
    <rect width="480" height="300" fill={`url(#grid-${accent.slice(1)})`} />
    <rect width="480" height="300" fill={`url(#glow-${accent.slice(1)})`} />
    {children}
    <g stroke={accent} strokeOpacity="0.75" strokeWidth="1.4" fill="none">
      <path d="M14 30V14h16" />
      <path d="M450 14h16v16" />
      <path d="M466 270v16h-16" />
      <path d="M30 286H14v-16" />
    </g>
  </>
);

const Bar = ({
  x,
  y,
  w,
  accent,
  o = 0.5,
  h = 6,
}: {
  x: number;
  y: number;
  w: number;
  accent: string;
  o?: number;
  h?: number;
}) => <rect x={x} y={y} width={w} height={h} rx={1} fill={accent} opacity={o} />;

function Motif({ variant, accent }: { variant: Project["art"]; accent: string }) {
  switch (variant) {
    case "shop":
      return (
        <g>
          <rect x="86" y="66" width="308" height="176" rx="3" fill="#0e1016" stroke={accent} strokeOpacity="0.45" />
          <path d="M86 92h308" stroke={accent} strokeOpacity="0.35" />
          <circle cx="100" cy="79" r="3.4" fill={accent} opacity="0.85" />
          <circle cx="112" cy="79" r="3.4" fill="#ffffff" opacity="0.25" />
          <circle cx="124" cy="79" r="3.4" fill="#ffffff" opacity="0.25" />
          <rect x="230" y="74" width="150" height="10" rx="5" fill="#ffffff" opacity="0.08" />
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${102 + i * 96} 106)`}>
              <rect width="82" height="86" rx="2" fill="#ffffff" opacity="0.045" />
              <rect width="82" height="52" rx="2" fill={accent} opacity="0.16" />
              <Bar x={8} y={62} w={48} accent={accent} o={0.75} h={5} />
              <Bar x={8} y={72} w={30} accent="#ffffff" o={0.22} h={5} />
              <rect x="56" y="60" width="18" height="18" rx="2" fill={accent} opacity="0.9" />
              <path d="M60 65h3l2 7h6" stroke="#0b0c11" strokeWidth="1.4" fill="none" />
            </g>
          ))}
          <Bar x={102} y={206} w={120} accent="#ffffff" o={0.12} h={8} />
          <Bar x={102} y={220} w={78} accent="#ffffff" o={0.08} h={8} />
          <rect x="300" y="204" width="80" height="26" rx="2" fill={accent} opacity="0.9" />
          <path d="M320 217h40" stroke="#0b0c11" strokeWidth="2" />
        </g>
      );
    case "movie":
      return (
        <g>
          <rect x="60" y="70" width="360" height="160" rx="3" fill="#0e1016" stroke={accent} strokeOpacity="0.4" />
          {Array.from({ length: 12 }).map((_, i) => (
            <g key={i}>
              <rect x={68 + i * 29} y={78} width="16" height="11" rx="2" fill={accent} opacity="0.35" />
              <rect x={68 + i * 29} y={211} width="16" height="11" rx="2" fill={accent} opacity="0.35" />
            </g>
          ))}
          <rect x="70" y="98" width="340" height="104" fill={accent} opacity="0.1" />
          <circle cx="240" cy="150" r="30" fill="none" stroke={accent} strokeWidth="2" />
          <path d="M232 137l24 13-24 13z" fill={accent} />
          <circle cx="240" cy="150" r="44" fill="none" stroke={accent} strokeOpacity="0.3" strokeDasharray="4 8" />
          <Bar x={104} y={186} w={90} accent="#ffffff" o={0.18} h={6} />
          <Bar x={286} y={186} w={90} accent="#ffffff" o={0.18} h={6} />
        </g>
      );
    case "coffee":
      return (
        <g>
          <path
            d="M176 108h128v58a52 52 0 0 1-52 52h-24a52 52 0 0 1-52-52z"
            fill={accent}
            opacity="0.14"
            stroke={accent}
            strokeWidth="2"
          />
          <path d="M304 122h20a22 22 0 0 1 0 44h-20" fill="none" stroke={accent} strokeWidth="2" />
          <path d="M164 232h152" stroke={accent} strokeWidth="3" strokeLinecap="round" />
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M${208 + i * 32} 96c-8-12 8-18 0-30`}
              fill="none"
              stroke={accent}
              strokeOpacity="0.6"
              strokeWidth="2"
              strokeLinecap="round"
              className="float-y"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
          <rect x="52" y="80" width="86" height="140" rx="2" fill="#ffffff" opacity="0.04" />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <Bar x={62} y={94 + i * 24} w={44} accent="#ffffff" o={0.2} h={5} />
              <Bar x={116} y={94 + i * 24} w={12} accent={accent} o={0.8} h={5} />
            </g>
          ))}
          <rect x="342" y="80" width="86" height="140" rx="2" fill="#ffffff" opacity="0.04" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x="352" y={94 + i * 42} width="66" height="32" rx="2" fill={accent} opacity={0.22 - i * 0.05} />
          ))}
        </g>
      );
    case "petshop":
      return (
        <g>
          <g transform="translate(240 150)">
            <ellipse cx="0" cy="26" rx="44" ry="36" fill={accent} opacity="0.24" stroke={accent} strokeWidth="2" />
            {[
              [-42, -22, 17, 21],
              [-15, -40, 17, 21],
              [15, -40, 17, 21],
              [42, -22, 17, 21],
            ].map(([cx, cy, rx, ry], i) => (
              <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill={accent} opacity="0.5" />
            ))}
          </g>
          <circle cx="240" cy="150" r="96" fill="none" stroke={accent} strokeOpacity="0.28" strokeDasharray="3 9" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${44 + i * 100} 236)`}>
              <rect width="84" height="30" rx="2" fill="#ffffff" opacity="0.05" />
              <Bar x={10} y={12} w={40} accent={accent} o={0.6} h={5} />
            </g>
          ))}
          <Bar x={44} y={44} w={110} accent="#ffffff" o={0.14} h={8} />
          <Bar x={326} y={44} w={110} accent={accent} o={0.5} h={8} />
        </g>
      );
    case "province":
      return (
        <g>
          <path
            d="M150 62l70 14 44 34 26 58-18 52-52 26-58-16-32-46 4-62z"
            fill={accent}
            opacity="0.16"
            stroke={accent}
            strokeWidth="2"
          />
          <path d="M220 76l-14 60 44 34 46-2" fill="none" stroke={accent} strokeOpacity="0.55" strokeWidth="1.4" />
          <path d="M206 136l-72 22m116 12-30 54" fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="1.4" />
          {[
            [220, 76],
            [206, 136],
            [250, 170],
            [134, 158],
            [220, 224],
            [296, 168],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="4.5" fill={accent} />
              <circle cx={cx} cy={cy} r="11" fill="none" stroke={accent} strokeOpacity="0.4" />
            </g>
          ))}
          <rect x="330" y="70" width="112" height="160" rx="2" fill="#ffffff" opacity="0.045" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <circle cx="344" cy={90 + i * 24} r="3" fill={accent} opacity={0.9 - i * 0.11} />
              <Bar x={356} y={86 + i * 24} w={70 - i * 6} accent="#ffffff" o={0.16} h={6} />
            </g>
          ))}
          <Bar x={44} y={252} w={70} accent={accent} o={0.6} h={6} />
        </g>
      );
    case "employee":
      return (
        <g>
          <rect x="204" y="52" width="72" height="34" rx="2" fill={accent} opacity="0.85" />
          <path d="M240 86v22m-92 0h184m-184 0v22m92-22v22m92-22v22" fill="none" stroke={accent} strokeOpacity="0.6" strokeWidth="1.6" />
          {[148, 240, 332].map((x, i) => (
            <g key={i}>
              <rect x={x - 34} y="130" width="68" height="30" rx="2" fill="#ffffff" opacity="0.09" />
              <circle cx={x - 18} cy="145" r="7" fill={accent} opacity="0.75" />
              <Bar x={x - 6} y={140} w={30} accent="#ffffff" o={0.24} h={5} />
            </g>
          ))}
          <rect x="76" y="182" width="328" height="72" rx="2" fill="#ffffff" opacity="0.04" />
          <path d="M76 202h328" stroke={accent} strokeOpacity="0.4" />
          {[0, 1, 2].map((r) => (
            <g key={r}>
              <circle cx="94" cy={216 + r * 18} r="5" fill={accent} opacity={0.7 - r * 0.16} />
              <Bar x={108} y={212 + r * 18} w={80} accent="#ffffff" o={0.2} h={6} />
              <Bar x={200} y={212 + r * 18} w={56} accent="#ffffff" o={0.13} h={6} />
              <Bar x={268} y={212 + r * 18} w={40} accent="#ffffff" o={0.13} h={6} />
              <rect x="356" y={210 + r * 18} width="34" height="11" rx="2" fill={accent} opacity="0.55" />
            </g>
          ))}
          <Bar x={76} y={188} w={60} accent={accent} o={0.7} h={5} />
        </g>
      );
    case "library":
    default:
      return (
        <g>
          {[0, 1, 2].map((row) => (
            <g key={row}>
              <rect x="66" y={70 + row * 62} width="348" height="46" rx="2" fill="#ffffff" opacity="0.035" />
              <path d={`M66 ${116 + row * 62}h348`} stroke={accent} strokeOpacity="0.45" strokeWidth="1.6" />
              {Array.from({ length: 13 }).map((_, i) => {
                const h = 24 + ((i * 7 + row * 11) % 16);
                return (
                  <rect
                    key={i}
                    x={76 + i * 26}
                    y={114 + row * 62 - h}
                    width={16 + ((i + row) % 3) * 3}
                    height={h}
                    rx="1"
                    fill={accent}
                    opacity={0.22 + ((i * 3 + row) % 5) * 0.11}
                  />
                );
              })}
            </g>
          ))}
          <rect x="286" y="228" width="128" height="46" rx="2" fill="#0e1016" stroke={accent} strokeOpacity="0.5" />
          {Array.from({ length: 22 }).map((_, i) => (
            <rect
              key={i}
              x={294 + i * 5.2}
              y="236"
              width={i % 3 === 0 ? 2.6 : 1.3}
              height="20"
              fill={accent}
              opacity="0.85"
            />
          ))}
          <Bar x={294} y={262} w={60} accent="#ffffff" o={0.22} h={4} />
          <Bar x={66} y={244} w={90} accent="#ffffff" o={0.14} h={8} />
        </g>
      );
  }
}

export function ProjectArt({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 480 300"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={`${project.title} — schematic thumbnail`}
      preserveAspectRatio="xMidYMid slice"
    >
      <Frame accent={project.accent}>
        <Motif variant={project.art} accent={project.accent} />
        <g opacity="0.75">
          <text
            x="30"
            y="34"
            fill={project.accent}
            fontFamily="Space Grotesk, sans-serif"
            fontSize="10"
            letterSpacing="2.6"
          >
            {project.index} / {project.category.toUpperCase()}
          </text>
          <text
            x="450"
            y="34"
            textAnchor="end"
            fill="#ffffff"
            fillOpacity="0.4"
            fontFamily="Space Grotesk, sans-serif"
            fontSize="10"
            letterSpacing="2.6"
          >
            {project.year}
          </text>
        </g>
      </Frame>
    </svg>
  );
}
