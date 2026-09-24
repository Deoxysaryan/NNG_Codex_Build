# Developer handoff

Updated 25 September 2026.

## Published routes

- Website: https://deoxysaryan.github.io/NNG_Codex_Build/
- Paid-traffic landing page: https://deoxysaryan.github.io/NNG_Codex_Build/consultation/
- Consultation process: /services/#how

## Source and deployment

`main` holds editable Next.js source. `gh-pages` holds the compiled static site. Updating main alone does not redeploy Pages.

Use Node 20.9 or newer, `npm ci`, `npm run dev`. Run `npm run typecheck`, `npm run lint:copy` and `npm run lint` before export. Native image optimisation lint warnings are non-blocking; local image variants are already supplied where needed.

Build for this project URL:

```sh
NEXT_PUBLIC_BASE_PATH=/NNG_Codex_Build NEXT_PUBLIC_SITE_URL=https://deoxysaryan.github.io/NNG_Codex_Build NEXT_PUBLIC_PREVIEW_NOTE='Website preview for review. WhatsApp enquiries are active.' npm run export
```

Publish the contents of `out/` to `gh-pages`, retaining `.nojekyll`. At a root domain, omit NEXT_PUBLIC_BASE_PATH and set the final domain. Keep noindex until launch approval; the ads page explicitly remains noindex.

## Key files

- `src/app/consultation/page.tsx`: standalone ads page, based on the approved visual system.
- `src/components/contact/AdsEnquiry.tsx`: optional first name and meeting format prepare a WhatsApp message. No server submission or lead storage.
- `src/components/contact/AdsSticky.tsx`: hides the floating CTA when the hero CTA or enquiry section is visible.
- `src/app/services/page.tsx`: connected four-step consultation flow and unboxed meeting formats.
- `src/app/globals.css`: locked brand styling and responsive layouts.
- `src/content/`: editable website copy, testimonials, social selections and approved WhatsApp number.

## Conversion implementation

The ads page sends visitors to the approved business WhatsApp number. They must press Send inside WhatsApp; opening the link is not proof of a submitted enquiry or booking. `whatsapp_click` is an intent event, not a confirmed lead.

No Google Ads conversion ID, Meta pixel, GA ID or CRM endpoint has been supplied or configured in this deployment. Do not treat dataLayer events as installed conversion tracking. Add appropriate consent and measurement configuration after the owner provides account details. Avoid sending names, message text, health topics or other sensitive data to analytics.

The general site's callback form remains a prototype and is labelled accordingly. It fires `callback_preview_validated`, not a successful submission event. Connect it to the chosen CRM/inbox with server validation, delivery/error handling, spam protection and an approved privacy notice before using it to capture leads.

## Ads launch checks still needed

- Align each ad's promise with the landing page; develop variants only for approved offers.
- Owner approval of copy, testimonial permissions and business privacy/data retention terms.
- Test WhatsApp handoff on physical iOS and Android devices and verify the team receives a deliberately sent test enquiry.
- Configure and test analytics/consent, campaign attribution and confirmed-lead reporting with the team's chosen systems.
- Confirm platform approval for the actual creatives and targeting. No conversion-rate or ad-approval guarantee is implied.
- Replace the review notice only after launch approval.

Google destination guidance: https://support.google.com/adspolicy/answer/6368661

## Copy and visual review

Copy lint passed with no em dashes or en dashes in scanned source copy. Client quotes and the locked identity line remain intact. Generic social headings were replaced with direct labels. An unsupported privacy guarantee was removed. Fees, booking steps and prototype limits are explicit; no scarcity devices or outcome guarantees were added.

The four-step service flow uses connected numbered markers with a vertical mobile layout. Online and in-person choices no longer sit inside boxes. The ads page omits social feeds and full-site navigation, retains real client media, uses one enquiry goal and avoids repeated card containers. Full mobile and desktop landing-page captures were reviewed; mobile DOM checks found no horizontal overflow at 390px. A generic "anti-AI score" is not a reliable quality measure and was not invented.

Build, type and copy checks passed. These checks are not a substitute for real-device QA or campaign conversion testing.
