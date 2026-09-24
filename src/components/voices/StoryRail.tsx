"use client";

import { Children, type ReactNode, useEffect, useRef, useState } from "react";
import type { Voice } from "@/content/voices";
import { FilmCard } from "./FilmCard";

/** One real, keyboard-accessible copy of every film. Reverse at the end rather than jump. */
export function StoryRail({ voices, children, label = "All client testimonial videos", itemLabel = "personal stories" }: { voices?: Voice[]; children?: ReactNode; label?: string; itemLabel?: string }) {
  const count = voices?.length ?? Children.count(children);
  const rail = useRef<HTMLDivElement>(null);
  const direction = useRef(1);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const preference = () => setReduced(query.matches);
    const visibility = () => setPageVisible(!document.hidden);
    const film = () => setPaused(true);
    preference(); visibility();
    query.addEventListener("change", preference);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("nng:film", film);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 });
    if (rail.current) observer.observe(rail.current);
    return () => {
      query.removeEventListener("change", preference);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("nng:film", film);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const element = rail.current;
    if (!element || paused || hovered || focused || !visible || reduced || !pageVisible) return;
    let frame = 0;
    let last = 0;
    let position = element.scrollLeft;
    const tick = (time: number) => {
      const elapsed = last ? Math.min(time - last, 50) : 0;
      last = time;
      const end = element.scrollWidth - element.clientWidth;
      position = Math.max(0, Math.min(end, position + elapsed * .024 * direction.current));
      element.scrollLeft = position;
      if (position >= end) direction.current = -1;
      else if (position <= 0) direction.current = 1;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, hovered, focused, visible, reduced, pageVisible]);

  const move = (by: number) => {
    setPaused(true);
    const element = rail.current;
    if (!element) return;
    const width = element.firstElementChild?.getBoundingClientRect().width ?? 280;
    element.scrollBy({ left: by * (width + 24), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className="story-rail-shell">
      <div ref={rail} className="story-rail" role="region" aria-label={label} tabIndex={0}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
        onPointerDown={() => setPaused(true)} onWheel={() => setPaused(true)}
      >
        {children ?? voices?.map(voice => <FilmCard key={voice.id} voice={voice} modal />)}
      </div>
      <div className="story-rail-controls">
        <span>{count} {itemLabel}</span>
        {!reduced && <button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}>
          {paused ? "Resume motion" : "Pause motion"}
        </button>}
        <button type="button" onClick={() => move(-1)} aria-label={`Previous ${itemLabel}`}>←</button>
        <button type="button" onClick={() => move(1)} aria-label={`Next ${itemLabel}`}>→</button>
      </div>
    </div>
  );
}
