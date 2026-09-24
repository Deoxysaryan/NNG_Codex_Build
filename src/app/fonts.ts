import localFont from "next/font/local";

// Final brand families, confirmed by Aryan on 25 September 2026.
// Self-hosted WOFF2; Hindi subsets are not preloaded.
export const serifLatin = localFont({
  src: "../fonts/brand/marcellus-latin-400-normal.woff2",
  weight: "400", variable: "--font-serif-latin", display: "swap",
  adjustFontFallback: "Times New Roman",
});
export const sansLatin = localFont({
  src: [
    { path: "../fonts/brand/manrope-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/brand/manrope-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-sans-latin", display: "swap", adjustFontFallback: "Arial",
});
export const serifDeva = localFont({
  src: [
    { path: "../fonts/brand/noto-serif-devanagari-devanagari-400-normal.woff2", weight: "400" },
    { path: "../fonts/brand/noto-serif-devanagari-devanagari-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-serif-deva", display: "swap", preload: false,
  declarations: [{ prop: "unicode-range", value: "U+0900-097F,U+1CD0-1CFF,U+200C-200D,U+20A8,U+20F0,U+25CC,U+A830-A839,U+A8E0-A8FF" }],
  adjustFontFallback: false,
});
export const sansDeva = localFont({
  src: [
    { path: "../fonts/brand/noto-sans-devanagari-devanagari-400-normal.woff2", weight: "400" },
    { path: "../fonts/brand/noto-sans-devanagari-devanagari-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-sans-deva", display: "swap", preload: false,
  declarations: [{ prop: "unicode-range", value: "U+0900-097F,U+1CD0-1CFF,U+200C-200D,U+20A8,U+20F0,U+25CC,U+A830-A839,U+A8E0-A8FF" }],
  adjustFontFallback: false,
});
export const fontVariables = [serifLatin, sansLatin, serifDeva, sansDeva].map((font) => font.variable).join(" ");
