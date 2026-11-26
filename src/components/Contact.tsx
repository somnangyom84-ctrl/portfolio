import { useMemo, useState } from "react";
import { CONTACT_ROWS, PROFILE } from "@/data/portfolio";
import { useLocalClock } from "@/lib/hooks";
import { downloadCV } from "@/lib/cv";
import { Corners, Icon, Reveal, SectionHeading } from "@/components/ui";
import { cn } from "@/utils/cn";

const TOPICS = ["Internship", "Junior role", "Freelance build", "Collaboration"] as const;
const MAX = 600;

type Errors = { name?: string; email?: string; message?: string };

export function Contact() {
  const clock = useLocalClock(PROFILE.timezone);
  const [form, setForm] = useState({ name: "", email: "", topic: TOPICS[0] as string, message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "ready" | "copied">("idle");

  const brief = useMemo(
    () =>
      [
        `TO: ${PROFILE.name} — ${PROFILE.role}`,
        `TOPIC: ${form.topic}`,
        `FROM: ${form.name || "—"}${form.email ? ` <${form.email}>` : ""}`,
        "",
        form.message.trim(),
      ].join("\n"),
    [form]
  );

  const validate = (): boolean => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "Enter at least 2 characters";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      e.email = "That email address is not valid";
    if (form.message.trim().length < 12) e.message = "Tell me a little more (12+ characters)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      setStatus("idle");
      return;
    }
    setStatus("ready");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setStatus("copied");
      window.setTimeout(() => setStatus("ready"), 2600);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = brief;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setStatus("copied");
      window.setTimeout(() => setStatus("ready"), 2600);
    }
  };

  const field =
    "w-full chamfer-sm border bg-white/[.04] px-4 py-3.5 font-body text-[14px] text-white placeholder:text-white/25 transition-colors duration-300 focus:bg-white/[.07] focus:outline-none";

  return (
    <section
      id="contact"
      className="on-dark relative scroll-mt-24 overflow-hidden bg-night py-20 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-tech-dark opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_18%_10%,rgba(2,210,227,.16),transparent_60%),radial-gradient(70%_60%_at_92%_92%,rgba(255,61,139,.10),transparent_62%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-arc/45 to-transparent" />

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          dark
          index="06"
          kicker="Radio check"
          title={
            <>
              Let&apos;s build
              <br />
              <span className="text-arc text-glow">something</span>
            </>
          }
          lead="Open to internships, junior web development roles and small freelance builds. GitHub is the fastest way to reach me."
          align="between"
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          {/* ---------------- info column ---------------- */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative">
              <div className="chamfer border border-white/10 bg-steel/50 p-1.5 backdrop-blur-sm">
                <div className="relative border border-white/6 bg-night/60">
                  <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5">
                    <span className="u-label text-white/40">Contact channel</span>
                    <span className="u-mono u-label text-arc">{clock} {PROFILE.utc}</span>
                  </div>

                  <ul className="divide-y divide-white/8">
                    {CONTACT_ROWS.map((row) => {
                      const inner = (
                        <>
                          <span className="u-label w-[92px] shrink-0 pt-0.5 text-white/35">
                            {row.label}
                          </span>
                          <span
                            className={cn(
                              "font-body text-[13.5px] leading-snug",
                              row.tone === "arc" ? "text-arc" : "text-white/85"
                            )}
                          >
                            {row.value}
                          </span>
                          {row.href && (
                            <Icon
                              name="arrow-right"
                              className="ml-auto mt-0.5 h-3.5 w-3.5 shrink-0 text-white/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-arc"
                            />
                          )}
                        </>
                      );
                      return (
                        <li key={row.label}>
                          {row.href ? (
                            <a
                              href={row.href}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="group flex items-start gap-4 px-5 py-4 transition-colors duration-300 hover:bg-arc/[.07]"
                            >
                              {inner}
                            </a>
                          ) : (
                            <div className="flex items-start gap-4 px-5 py-4">{inner}</div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <Corners />
              </div>
            </Reveal>

            <Reveal delay={110}>
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group mt-5 flex items-center gap-4 chamfer border border-white/10 bg-white/[.03] p-5 transition-all duration-400 hover:border-arc/50 hover:bg-arc/[.06]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center chamfer-sm bg-arc text-night transition-transform duration-400 group-hover:scale-110">
                  <Icon name="github" className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <span className="min-w-0">
                  <span className="block u-label text-white/35">Primary channel</span>
                  <span className="mt-1 block truncate font-display text-[17px] uppercase tracking-wide text-white">
                    github.com/{PROFILE.github}
                  </span>
                </span>
                <Icon
                  name="external"
                  className="ml-auto h-4 w-4 shrink-0 text-white/30 transition-colors group-hover:text-arc"
                />
              </a>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  onClick={downloadCV}
                  className="group flex items-center justify-center gap-2 chamfer-sm border border-white/15 px-4 py-3.5 font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75 transition-all duration-300 hover:border-arc hover:text-arc"
                >
                  <Icon name="download" className="h-3.5 w-3.5" />
                  Download CV
                </button>
                <a
                  href={PROFILE.repoIndexUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-center gap-2 chamfer-sm border border-white/15 px-4 py-3.5 font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75 transition-all duration-300 hover:border-arc hover:text-arc"
                >
                  <Icon name="layers" className="h-3.5 w-3.5" />
                  Repositories
                </a>
              </div>
            </Reveal>
          </div>

          {/* ---------------- composer ---------------- */}
          <div className="lg:col-span-7">
            <Reveal delay={80} y={34}>
              <form
                onSubmit={submit}
                noValidate
                className="relative chamfer border border-white/10 bg-steel/50 p-1.5 backdrop-blur-sm"
              >
                <div className="relative border border-white/6 bg-night/60">
                  <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5 sm:px-7">
                    <span className="u-label text-white/40">Message console</span>
                    <span className="flex items-center gap-2">
                      <span
                        className={cn(
                          "h-1.5 w-1.5",
                          status === "idle" ? "bg-white/25" : "bg-lime blink"
                        )}
                      />
                      <span className="u-label text-white/40">
                        {status === "idle" ? "Awaiting input" : status === "copied" ? "Copied" : "Brief ready"}
                      </span>
                    </span>
                  </div>

                  <div className="space-y-5 px-5 py-6 sm:px-7 sm:py-8">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="u-label text-white/40">Your name *</span>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Sok Dara"
                          className={cn(
                            field,
                            "mt-2.5",
                            errors.name ? "border-danger" : "border-white/12 focus:border-arc"
                          )}
                        />
                        {errors.name && (
                          <span className="mt-1.5 block font-body text-[11px] text-danger">
                            {errors.name}
                          </span>
                        )}
                      </label>

                      <label className="block">
                        <span className="u-label text-white/40">Email (optional)</span>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@company.com"
                          className={cn(
                            field,
                            "mt-2.5",
                            errors.email ? "border-danger" : "border-white/12 focus:border-arc"
                          )}
                        />
                        {errors.email && (
                          <span className="mt-1.5 block font-body text-[11px] text-danger">
                            {errors.email}
                          </span>
                        )}
                      </label>
                    </div>

                    <div>
                      <span className="u-label text-white/40">Topic</span>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {TOPICS.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setForm({ ...form, topic: t })}
                            aria-pressed={form.topic === t}
                            className={cn(
                              "chamfer-sm border px-3.5 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-300",
                              form.topic === t
                                ? "border-arc bg-arc text-night"
                                : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                            )}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <label className="block">
                      <span className="flex items-baseline justify-between">
                        <span className="u-label text-white/40">Message *</span>
                        <span className="u-mono font-body text-[10px] tabular-nums text-white/30">
                          {form.message.length} / {MAX}
                        </span>
                      </span>
                      <textarea
                        rows={5}
                        maxLength={MAX}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell me about the role, the team and the stack…"
                        className={cn(
                          field,
                          "mt-2.5 resize-none leading-relaxed",
                          errors.message ? "border-danger" : "border-white/12 focus:border-arc"
                        )}
                      />
                      {errors.message && (
                        <span className="mt-1.5 block font-body text-[11px] text-danger">
                          {errors.message}
                        </span>
                      )}
                    </label>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <button
                        type="submit"
                        className="group inline-flex items-center gap-2.5 chamfer-sm bg-arc px-6 py-3.5 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-night transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_-4px_rgba(2,210,227,.9)]"
                      >
                        Prepare message
                        <Icon
                          name="send"
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={copy}
                        disabled={status === "idle"}
                        className="inline-flex items-center gap-2 chamfer-sm border border-white/15 px-5 py-3.5 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75 transition-all duration-300 hover:border-arc hover:text-arc disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-white/15 disabled:hover:text-white/75"
                      >
                        <Icon name={status === "copied" ? "check" : "copy"} className="h-3.5 w-3.5" />
                        {status === "copied" ? "Copied" : "Copy brief"}
                      </button>
                    </div>

                    {status !== "idle" && (
                      <div className="chamfer-sm border border-arc/30 bg-arc/[.06] p-4">
                        <div className="flex items-center gap-2">
                          <Icon name="check" className="h-3.5 w-3.5 text-arc" strokeWidth={2} />
                          <span className="u-label text-arc">Brief prepared</span>
                        </div>
                        <pre className="on-dark mt-3 max-h-40 overflow-auto whitespace-pre-wrap break-words font-body text-[12px] leading-relaxed text-white/70">
{brief}
                        </pre>
                        <p className="mt-3 text-[12px] leading-relaxed text-muted">
                          A public mailbox is not published yet. Copy the brief and send it through
                          GitHub — open an issue or a discussion on any repository and it will reach
                          me.
                        </p>
                        <a
                          href={PROFILE.repoIndexUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="mt-3 inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-arc transition-colors hover:text-white"
                        >
                          Open GitHub
                          <Icon name="arrow-right" className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}