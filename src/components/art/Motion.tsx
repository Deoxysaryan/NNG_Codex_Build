"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Content stays visible without JS. Off-screen and background-tab motion pauses. */
export function Motion() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("pdf-export") || !("IntersectionObserver" in window)) return;
    root.classList.add("motion");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle("motion-in-view", entry.isIntersecting);
        if (entry.isIntersecting) entry.target.classList.add("is-drawn");
      }
    }, { threshold: 0.05 });
    document.querySelectorAll("[data-draw], .graha-orbit, .backdrop-orbit").forEach((el) => observer.observe(el));
    const visibility = () => root.classList.toggle("motion-suspended", document.hidden);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      root.classList.remove("motion-suspended");
    };
  }, [pathname]);
  return null;
}
