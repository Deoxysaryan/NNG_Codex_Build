/** A continuous thread: a recurring loop opens into a direction, without a promised outcome. */
export function PatternPath() {
  return (
    <figure className="pattern-path">
      <svg viewBox="0 0 480 210" fill="none" aria-hidden="true">
        <path d="M20 154 C80 154 61 45 129 45 C199 45 212 164 142 168 C66 172 77 66 148 74 C202 80 189 135 154 133 C122 131 129 98 157 108 C202 132 226 142 275 114 C324 85 335 64 374 64 L449 64" stroke="var(--art)" strokeWidth="1.6" />
        <path d="M20 173 C90 173 235 171 301 133 C349 105 383 86 449 86" stroke="var(--art)" strokeOpacity=".22" strokeWidth="1" />
        <circle cx="155" cy="113" r="5" fill="var(--detail)" />
        <circle cx="374" cy="64" r="6" fill="var(--paper)" stroke="var(--detail)" />
        <path d="m442 58 7 6-7 6" stroke="var(--detail)" strokeWidth="1.5" />
      </svg>
      <figcaption>A familiar pattern. A different way forward.</figcaption>
    </figure>
  );
}
