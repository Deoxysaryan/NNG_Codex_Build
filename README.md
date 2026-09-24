# NNG Codex Build

Transformation with NNG website for Narayani Garg, The Life Strategist.

**Mind. Direction. Alignment.**

Published preview: https://deoxysaryan.github.io/NNG_Codex_Build/

Ads landing page: https://deoxysaryan.github.io/NNG_Codex_Build/consultation/

Start with [DEVELOPER_HANDOFF.md](DEVELOPER_HANDOFF.md) for the current implementation, deployment steps and launch gaps.

## Status

WhatsApp enquiry links are connected to the approved business number. The callback form is a clearly labelled prototype: it validates entries but does not send or save leads. Search indexing remains disabled until production launch.

## Development

Node 20.9 or newer. Run `npm ci` then `npm run dev`.

Checks: `npm run typecheck`, `npm run lint`, `npm run lint:copy`.

## GitHub Pages

Source is on `main`. The published static export is on `gh-pages`.

Build with:

```sh
NEXT_PUBLIC_BASE_PATH=/NNG_Codex_Build NEXT_PUBLIC_SITE_URL=https://deoxysaryan.github.io/NNG_Codex_Build NEXT_PUBLIC_PREVIEW_NOTE='Design preview for review. WhatsApp is active; the callback form is not connected yet.' npm run export
```

Deploy the contents of `out/` to the root of `gh-pages`, including `.nojekyll`.

## Brand

Marcellus, Manrope and Noto Devanagari. Pearl, Plum, Champagne, Brass, Verdigris and Saffron. Platform logos retain their own colours. Social selections are dated public-view snapshots, not live analytics rankings.
