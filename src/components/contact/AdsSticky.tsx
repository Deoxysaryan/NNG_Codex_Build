"use client";

import { useEffect, useState } from "react";

export function AdsSticky() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const targets = document.querySelectorAll(".ads-landing .hero-copy .button, .ads-enquiry-band");
    const inView = new Set<Element>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? inView.add(entry.target) : inView.delete(entry.target));
      setVisible(inView.size === 0);
    });
    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  return visible ? <a className="ads-sticky button" href="#enquire">Enquire about a consultation</a> : null;
}
