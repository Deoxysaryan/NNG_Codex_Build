// Original inline SVG drawings. Conceptual examples, never personal assessments,
// scientific models, outcome charts or representations of actual client records.
const e=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const strokes={
  conversation:'<path d="M7 9h26v19H19l-8 7v-7H7zM24 17h17v19h-6l-6 6v-6h-5M13 16h14M13 22h9"/>',
  relationship:'<circle cx="15" cy="13" r="5"/><circle cx="33" cy="13" r="5"/><path d="M5 35v-6a10 10 0 0 1 18-6M43 35v-6a10 10 0 0 0-18-6M24 37s-10-6-10-12a5 5 0 0 1 10-1 5 5 0 0 1 10 1c0 6-10 12-10 12z"/>',
  career:'<path d="M6 17h36v22H6zM16 17v-7h16v7M6 25c12 6 24 6 36 0M21 25h6v7h-6z"/>',
  money:'<circle cx="20" cy="23" r="15"/><path d="M20 13v20M26 17c-9-5-15 5-6 6s3 11-6 6M34 8a15 15 0 0 1 4 30"/>',
  wellbeing:'<path d="M24 40V23M24 29C9 29 6 15 8 9c14 0 19 9 16 20zM24 24c-1-11 6-17 17-16 1 11-5 19-17 16M24 35l-9-4"/>',
  reflection:'<circle cx="24" cy="16" r="6"/><path d="M12 40v-5a12 12 0 0 1 24 0M5 19a19 19 0 0 1 36-6M41 5v8h-8M43 29a19 19 0 0 1-36 6M7 43v-8h8"/>',
  chakra:'<circle cx="24" cy="8" r="5"/><path d="M14 36l-7 6h34l-7-6M19 15l-5 10-9 4M29 15l5 10 9 4M19 15l-1 20h12l-1-20"/><circle cx="24" cy="20" r="1.4"/><circle cx="24" cy="26" r="1.4"/><circle cx="24" cy="32" r="1.4"/>',
  chart:'<path d="M7 7h34v34H7zM7 24 24 7l17 17-17 17zM7 7l34 34M41 7 7 41"/>',
  clock:'<circle cx="24" cy="24" r="16"/><path d="M24 13v12l8 5M24 3v3M45 24h-3M24 45v-3M3 24h3"/>',
  house:'<path d="m5 23 19-17 19 17M10 20v22h28V20M20 42V28h8v14M15 14V7h7"/>',
  education:'<path d="m3 16 21-10 21 10-21 10zM10 21v13c9 6 19 6 28 0V21M44 17v17"/>',
  question:'<circle cx="24" cy="24" r="18"/><path d="M17 18c0-9 17-9 14 1-2 5-7 4-7 10M24 35h.01"/>',
  calendar:'<path d="M8 10h32v32H8zM8 19h32M16 5v10M32 5v10M15 26h4M27 26h4M15 34h4M27 34h4"/>',
  pin:'<path d="M38 18c0 11-14 25-14 25S10 29 10 18a14 14 0 0 1 28 0z"/><circle cx="24" cy="18" r="5"/>',
  grid:'<path d="M6 6h36v36H6zM18 6v36M30 6v36M6 18h36M6 30h36"/><circle cx="24" cy="24" r="3"/>',
  name:'<path d="M5 11h38v27H5zM9 33l7-17 7 17M11 27h10M28 23h10M28 30h7"/>',
  signature:'<path d="M5 32c12-27 16-21 9-7s-5 16 3 3 13-15 7-3-4 11 3 6c6-4 9 6 16-3M6 42h36"/>',
  phone:'<path d="M15 5h18v38H15zM15 11h18M15 36h18M23 39h2"/>',
  business:'<path d="M5 42h38M10 42V15h18v27M28 23h11v19M14 22h3M21 22h3M14 29h3M21 29h3M18 42v-6h6M10 15l9-8 9 8"/>',
  compass:'<circle cx="24" cy="24" r="17"/><path d="m31 17-4 10-10 4 4-10zM24 3v5M24 40v5M3 24h5M40 24h5"/>',
  desk:'<path d="M5 24h38M9 24v18M39 24v18M16 7h18v12H16zM25 19v5M8 10v10h5M5 14h6"/>',
  path:'<path d="M8 40h13c15 0 15-13 1-13S7 12 21 12h19M34 6l6 6-6 6"/><circle cx="8" cy="40" r="3"/>',
  practice:'<path d="M13 12a16 16 0 0 1 28 11M41 14v9h-9M35 36A16 16 0 0 1 7 25M7 34v-9h9M18 24l4 4 8-8"/>',
  listen:'<path d="M15 15a10 10 0 0 1 20 0c0 7-8 9-8 15 0 8-11 8-11 0M21 18c-1-5 7-7 8-2 1 4-5 6-5 10M9 10a18 18 0 0 0-1 20"/>',
  choice:'<path d="M24 41V26M24 26 9 12M24 26l15-14M9 21v-9h9M30 12h9v9"/>',
  confirm:'<path d="M12 8h24v35H12zM18 5h12v7H18zM18 25l4 4 9-9M18 35h12"/>',
  person:'<circle cx="24" cy="12" r="7"/><path d="M10 42v-7a14 14 0 0 1 28 0v7M17 36v6M31 36v6"/>',
};
export function icon(name,extra='') {
  return `<svg class="line-icon ${extra}" data-motion viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${strokes[name]||strokes.question}</svg>`;
}
