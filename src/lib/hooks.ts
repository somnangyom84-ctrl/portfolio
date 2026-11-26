import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------ motion pref */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduced;
}

/* --------------------------------------------------------- intersection in */
export function useInView<T extends HTMLElement>(
  { threshold = 0.18, once = true, rootMargin = "0px 0px -8% 0px" } = {}
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once, rootMargin]);

  return { ref, inView };
}

/* ------------------------------------------------------------- scroll spy */
export function useScrollSpy(ids: readonly string[], offset = 140) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const pos = window.scrollY + offset;
        let current = ids[0];
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= pos) current = id;
        }
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
          current = ids[ids.length - 1];
        }
        setActive(current);
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
  }, [ids, offset]);
  return active;
}

/* ---------------------------------------------------------- scroll offset */
export function useScrollProgress() {
  const [state, setState] = useState({ progress: 0, y: 0 });
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setState({ progress: max > 0 ? window.scrollY / max : 0, y: window.scrollY });
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
  return state;
}

/* -------------------------------------------------------------- count up */
export function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration, reduced]);
  return value;
}

/* ---------------------------------------------------------- smooth anchor */
export function useSmoothScrollTo() {
  const reduced = useReducedMotion();
  return useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const nav = window.innerWidth >= 1024 ? 84 : 66;
      const top = el.getBoundingClientRect().top + window.scrollY - nav;
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    },
    [reduced]
  );
}

/* --------------------------------------------------------- local clock --- */
export function useLocalClock(timeZone: string) {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);
  return time;
}

/* --------------------------------------------------------- lock body ---- */
export function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}