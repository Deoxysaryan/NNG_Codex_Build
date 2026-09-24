"use client";

import { useEffect, useRef } from "react";

/** Text remains available without JavaScript. Scroll only advances the visual thread. */
export function ProgramProcess({ steps }: { steps: { title: string; text: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const items = Array.from(list.children) as HTMLElement[];
      const readingLine = window.innerHeight * .72;
      items.forEach((item) => {
        const box = item.getBoundingClientRect();
        const progress = motion.matches ? 1 : Math.max(0, Math.min(1, (readingLine - box.top - 20) / box.height));
        item.style.setProperty("--step-progress", String(progress));
        item.dataset.reached = String(motion.matches || box.top + 20 <= readingLine);
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    list.dataset.enhanced = "true";
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
    };
  }, []);
  return (
    <ol ref={ref} className="timeline process-timeline">
      {steps.map((step, i) => (
        <li key={step.title}>
          <span className="process-thread" aria-hidden="true" />
          <span className="timeline-dot">{i + 1}</span>
          <div><h3>{step.title}</h3><p>{step.text}</p></div>
        </li>
      ))}
    </ol>
  );
}
