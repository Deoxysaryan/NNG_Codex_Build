"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";

/**
 * A row that scrolls sideways on a phone (scroll snap does the work) with previous and next
 * buttons and a position count, as on the Codex testimonials. On wider screens the same items
 * sit in a grid and the controls hide themselves (see .track-controls in globals.css).
 */
export function Track({
  label,
  className,
  children,
  itemLabel = "item",
  autoAdvanceMobile = false,
}: {
  label: string;
  className: string;
  children: React.ReactNode;
  itemLabel?: string;
  autoAdvanceMobile?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const count = Children.count(children);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(count <= 1);
  const [autoEligible, setAutoEligible] = useState(false);
  const [autoPaused, setAutoPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const autoDirection = useRef(1);

  useEffect(() => {
    if (!autoAdvanceMobile) return;
    const mobile = matchMedia("(max-width: 680px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAutoEligible(mobile.matches && !reduced.matches);
    const visibility = () => setPageVisible(!document.hidden);
    const pause = () => setAutoPaused(true);
    update(); visibility();
    mobile.addEventListener("change", update);
    reduced.addEventListener("change", update);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("nng:film", pause);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .25 });
    if (track.current) observer.observe(track.current);
    return () => {
      mobile.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("nng:film", pause);
      observer.disconnect();
    };
  }, [autoAdvanceMobile]);

  useEffect(() => {
    if (!autoEligible || autoPaused || !inView || !pageVisible || count < 2) return;
    const timer = window.setTimeout(() => {
      const el = track.current;
      if (!el) return;
      if (index >= count - 1) autoDirection.current = -1;
      else if (index <= 0) autoDirection.current = 1;
      const next = el.children[index + autoDirection.current] as HTMLElement;
      const first = el.children[0] as HTMLElement;
      el.scrollTo({ left: next.offsetLeft - first.offsetLeft, behavior: "smooth" });
    }, 14000);
    return () => window.clearTimeout(timer);
  }, [autoEligible, autoPaused, inView, pageVisible, count, index]);

  const step = () => {
    const el = track.current;
    if (!el || el.children.length < 2) return el?.clientWidth ?? 0;
    return (el.children[1] as HTMLElement).offsetLeft - (el.children[0] as HTMLElement).offsetLeft;
  };

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const s = step() || 1;
    const max = el.scrollWidth - el.clientWidth;
    setIndex(max > 5 && el.scrollLeft >= max - 5 ? count - 1 : Math.min(count - 1, Math.round(el.scrollLeft / s)));
    setAtStart(el.scrollLeft < 5);
    setAtEnd(el.scrollLeft >= max - 5);
  }, [count]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const move = (direction: number) => {
    setAutoPaused(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.current?.scrollBy({ left: direction * step(), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      {autoAdvanceMobile && autoEligible && <div className="quote-auto-control">
        <span>Take your time with their stories.</span>
        <button type="button" aria-pressed={autoPaused} onClick={() => setAutoPaused(value => !value)}>
          {autoPaused ? "Resume" : "Pause"}<span className="visually-hidden"> testimonial auto-scroll</span>
        </button>
      </div>}
      <div ref={track} className={className} tabIndex={0} role="region" aria-label={label}
        onPointerDown={() => setAutoPaused(true)} onFocusCapture={() => setAutoPaused(true)}
        onMouseEnter={() => setAutoPaused(true)} onWheel={() => setAutoPaused(true)}>
        {children}
      </div>
      {count > 1 && (
        <div className="track-controls">
          <div className="track-progress" aria-hidden="true">
            {Array.from({ length: count }, (_, i) => <i key={i} className={i <= index ? "is-current" : undefined} />)}
          </div>
          <button type="button" aria-label={`Previous ${itemLabel}`} onClick={() => move(-1)} disabled={atStart}>
            ←
          </button>
          <span aria-live={autoEligible && !autoPaused ? "off" : "polite"}>
            {index + 1} / {count}
          </span>
          <button type="button" aria-label={`Next ${itemLabel}`} onClick={() => move(1)} disabled={atEnd}>
            →
          </button>
        </div>
      )}
    </>
  );
}
