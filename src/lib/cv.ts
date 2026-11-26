import { EDUCATION, PROFILE, PROJECTS, SKILL_GROUPS } from "@/data/portfolio";

/* ============================================================
   CV GENERATOR
   Builds a real, valid one-page PDF in the browser — no
   dependency, no network request. The Download CV button
   ships this file as "Yom-Somnang-CV.pdf".
   ============================================================ */

const W = 595.28;
const H = 841.89;

const esc = (s: string) =>
  s
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    // keep the byte stream pure ASCII so xref offsets stay exact
    .replace(/[—–]/g, "-")
    .replace(/[·•]/g, "-")
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[^\x20-\x7E]/g, "");

type RGB = [number, number, number];
const INK: RGB = [0.035, 0.039, 0.043];
const NIGHT: RGB = [0.055, 0.059, 0.078];
const ARC: RGB = [0.008, 0.824, 0.89];
const GREY: RGB = [0.42, 0.47, 0.5];
const LINE: RGB = [0.874, 0.898, 0.914];

class Content {
  private ops: string[] = [];

  rect(x: number, y: number, w: number, h: number, c: RGB) {
    this.ops.push(`${c[0]} ${c[1]} ${c[2]} rg`, `${f(x)} ${f(y)} ${f(w)} ${f(h)} re f`);
    return this;
  }
  line(x1: number, y1: number, x2: number, y2: number, c: RGB, width = 0.7) {
    this.ops.push(
      `${c[0]} ${c[1]} ${c[2]} RG`,
      `${f(width)} w`,
      `${f(x1)} ${f(y1)} m ${f(x2)} ${f(y2)} l S`
    );
    return this;
  }
  text(x: number, y: number, size: number, bold: boolean, c: RGB, str: string, spacing = 0) {
    this.ops.push(
      "BT",
      `/${bold ? "F2" : "F1"} ${f(size)} Tf`,
      `${f(spacing)} Tc`,
      `${c[0]} ${c[1]} ${c[2]} rg`,
      `${f(x)} ${f(y)} Td`,
      `(${esc(str)}) Tj`,
      "ET"
    );
    return this;
  }
  toString() {
    return this.ops.join("\n");
  }
}

const f = (n: number) => (Math.round(n * 100) / 100).toString();

function buildContent(): string {
  const c = new Content();
  const M = 46;
  const R = W - M;

  /* ---- header band ---- */
  c.rect(0, H - 132, W, 132, NIGHT);
  c.rect(0, H - 138, W, 6, ARC);
  c.rect(0, H - 132, 8, 132, ARC);
  c.text(M, H - 68, 30, true, [1, 1, 1], "YOM SOMNANG", 1.2);
  c.text(M, H - 90, 10.5, false, ARC, PROFILE.role.toUpperCase(), 1.6);
  c.text(
    M,
    H - 110,
    8.5,
    false,
    [0.71, 0.76, 0.78],
    `${PROFILE.university.toUpperCase()} - ${PROFILE.faculty.toUpperCase()} - ${PROFILE.location.toUpperCase()}`,
    0.8
  );
  c.text(R - 150, H - 68, 8, false, [0.71, 0.76, 0.78], "GITHUB", 1.4);
  c.text(R - 150, H - 82, 9, true, ARC, PROFILE.github);
  c.text(R - 150, H - 104, 8, false, [0.71, 0.76, 0.78], "LANGUAGES", 1.4);
  c.text(R - 150, H - 118, 9, true, [1, 1, 1], PROFILE.languages.join(" / "));

  let y = H - 176;

  const heading = (label: string) => {
    c.text(M, y, 10, true, INK, label.toUpperCase(), 1.8);
    c.line(M, y - 6, R, y - 6, LINE, 0.7);
    c.rect(M, y - 6, 34, 1.6, ARC);
    y -= 20;
  };
  /* Hard floor: never let body copy run under the dark footer band. */
  const FLOOR = 62;
  const body = (t: string, size = 9, color: RGB = GREY) => {
    c.text(M, y, size, false, color, t);
    y -= size + 5;
  };

  /* ---- profile ---- */
  heading("Profile");
  wrap(PROFILE.tagline, 108).forEach((l) => body(l, 9.2, [0.2, 0.23, 0.25]));
  y -= 6;

  /* ---- education ---- */
  heading("Education");
  EDUCATION.forEach((e) => {
    c.text(M, y, 10, true, INK, e.school);
    c.text(R - 96, y, 8.5, true, ARC, e.period.replace("—", "-"));
    y -= 14;
    body(`${e.award} - ${e.faculty}`, 9, GREY);
  });
  y -= 4;

  /* ---- skills ---- */
  heading("Technical Skills");
  SKILL_GROUPS.forEach((g) => {
    c.text(M, y, 8.6, true, INK, `${g.index} / ${g.title.toUpperCase()}`);
    y -= 13;
    const names = g.skills.map((s) => s.name).join("  -  ");
    wrap(names, 118).forEach((l) => body(l, 8.8, GREY));
    y -= 3;
  });

  /* ---- projects ---- */
  heading("Selected Projects");
  PROJECTS.slice(0, 5).forEach((p) => {
    const lines = wrap(p.summary, 118);
    if (y - 12 - lines.length * 13.6 - 17 < FLOOR) return;
    c.text(M, y, 9.4, true, INK, `${p.index}  ${p.title} - ${p.subtitle}`);
    y -= 12;
    lines.forEach((l) => body(l, 8.6, GREY));
    c.text(M, y, 8.2, false, [0.008, 0.64, 0.7], `Stack: ${p.tech.join(", ")}`);
    y -= 17;
  });

  /* ---- languages & focus ---- */
  if (y - 48 > FLOOR - 20) {
    heading("Languages & Focus");
    c.text(
      M,
      y,
      8.8,
      false,
      [0.2, 0.23, 0.25],
      `Languages: ${PROFILE.languages.join(", ")}  -  Location: ${PROFILE.city}, ${PROFILE.location}`
    );
    y -= 14;
    c.text(M, y, 8.8, false, [0.2, 0.23, 0.25], `Focus: ${PROFILE.focus.join("  -  ")}`);
    y -= 14;
  }

  /* ---- footer ---- */
  c.rect(0, 0, W, 44, NIGHT);
  c.rect(0, 44, W, 2, ARC);
  c.text(M, 18, 8, false, [0.71, 0.76, 0.78], "YOM SOMNANG - CURRICULUM VITAE", 1.4);
  c.text(R - 132, 18, 8, false, ARC, `github.com/${PROFILE.github}`, 0.6);

  return c.toString();
}

function wrap(text: string, max: number): string[] {
  const words = text.split(/\s+/);
  const out: string[] = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > max) {
      out.push(line.trim());
      line = w;
    } else {
      line += " " + w;
    }
  }
  if (line.trim()) out.push(line.trim());
  return out;
}

function buildPdf(): string {
  const stream = buildContent();
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${f(W)} ${f(H)}] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>`,
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((body, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((o) => {
    pdf += `${o.toString().padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return pdf;
}

export function downloadCV() {
  const pdf = buildPdf();
  const bytes = new Uint8Array(pdf.length);
  for (let i = 0; i < pdf.length; i++) bytes[i] = pdf.charCodeAt(i) & 0xff;

  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Yom-Somnang-CV.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}