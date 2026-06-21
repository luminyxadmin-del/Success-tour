import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import type { Stat } from "@/types";

/** Animated count-up for numeric stats; falls back to raw value for non-numeric. */
export default function StatCounter({ stat, light }: { stat: Stat; light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  // Parse a numeric portion (e.g. "12,000" -> 12000). Non-numeric stays static.
  const numeric = Number(stat.value.replace(/[^0-9.]/g, ""));
  const isNumeric = !Number.isNaN(numeric) && /[0-9]/.test(stat.value);

  useEffect(() => {
    if (!inView) return;
    if (!isNumeric) {
      setDisplay(stat.value);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = numeric * eased;
      const formatted =
        numeric >= 1000
          ? Math.round(current).toLocaleString("en-US")
          : Number.isInteger(numeric)
          ? Math.round(current).toString()
          : current.toFixed(1);
      setDisplay(formatted);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, isNumeric, numeric, stat.value]);

  return (
    <div ref={ref} className="text-center">
      <p
        className={`font-display text-4xl font-bold sm:text-5xl ${
          light ? "text-white" : "text-primary"
        }`}
      >
        {display}
        {stat.suffix && <span className="text-accent">{stat.suffix}</span>}
      </p>
      <p
        className={`mt-2 text-xs font-medium uppercase tracking-wider ${
          light ? "text-white/60" : "text-muted"
        }`}
      >
        {stat.label}
      </p>
    </div>
  );
}
