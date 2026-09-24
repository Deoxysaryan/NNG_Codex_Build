import type { Metadata } from "next";
import { Portrait } from "@/components/brand/Portrait";
import { QuoteTrack } from "@/components/sections/Sections";
import { AdsEnquiry } from "@/components/contact/AdsEnquiry";
import { AdsSticky } from "@/components/contact/AdsSticky";
import { MindArt, DirectionArt, AlignmentArt } from "@/components/art/Art";
import { homeQuotes } from "@/content/voices";
import { site, legal } from "@/content/site";
import { faqs } from "@/content/faq";
import { bookTitle } from "@/content/about";
import { asset } from "@/lib/assets";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Personal consultation with Narayani Garg", description: "Personal guidance with Narayani Garg, The Life Strategist. Explore consultations and six-month mentorship. Ask the team about fees and availability.", robots: { index: false, follow: false } };

export default function ConsultationLandingPage() {
  return <div className="ads-landing">
    <header className="ads-header section-wrap"><img src={asset("/images/nng-logo-200.webp")} width={80} height={42} alt="Transformation with NNG" /><a className="text-link" href="#enquire">Enquire</a></header>
    <section className="hero section-wrap" aria-labelledby="ads-title">
      <div className="hero-copy">
        <p className="kicker">Narayani Garg · The Life Strategist</p>
        <h1 id="ads-title">Change begins with the mind.</h1>
        <p className="hero-description">Personal guidance for life’s decisions and the habits behind them. Work with Narayani on how you think, choose and follow through.</p>
        <p className="hero-method">Mind. Direction. Alignment.</p>
        <a className="button" href="#enquire">Enquire about a consultation</a>
        <p className="cta-note">Ask about fees and availability before you decide.</p>
        <p className="ads-format-note">Online, including outside India · In person, by appointment</p>
      </div>
      <div className="hero-visual"><Portrait name={site.person} note={site.title} priority orbit sizes="(max-width: 680px) 240px, 440px" /></div>
    </section>
    <section className="section-wrap section-space" aria-labelledby="ads-proof"><div className="section-heading"><h2 id="ads-proof">In their own words</h2><p>Three clients on their experience with Narayani.</p></div><QuoteTrack voices={homeQuotes} label="Client experiences" /><p className="stories-note">These are personal experiences. Outcomes vary from person to person.</p></section>
    <section className="band"><div className="section-wrap section-space approach-grid">
      <div><h2>Why she starts with the mind</h2><p className="ads-body">Narayani begins with the thoughts, habits and reactions behind a situation. Astrology, numerology and vastu support that conversation. The work continues in the choices made afterwards.</p><p className="ads-body">Her background includes an MBA and a decade running a manufacturing business. She is the author of <em>{bookTitle}</em>.</p></div>
      <dl className="method-steps"><div className="method-step"><dt><MindArt />Mind</dt><dd>Notice the habits and responses that keep repeating.</dd></div><div className="method-step"><dt><DirectionArt />Direction</dt><dd>Work out what matters and where to begin.</dd></div><div className="method-step"><dt><AlignmentArt />Alignment</dt><dd>Put that direction into everyday decisions and action.</dd></div></dl>
    </div></section>
    <section className="section-wrap section-space ads-options" aria-labelledby="ads-options"><h2 id="ads-options">Begin with a consultation</h2><div className="ads-option-columns"><div><h3>A question to work through</h3><p>A focused conversation with Narayani. The team explains the format, fees and what to prepare before you book.</p></div><div><h3>Support over six months</h3><p>The Personalised Hand Holding Program offers ongoing calls and messages. Ask about it if you are looking for guidance beyond one conversation.</p></div></div><a className="text-link" href="#enquire">Ask the team which option fits</a></section>
    <section className="ads-enquiry-band" id="enquire" aria-labelledby="ads-enquire-title"><div className="section-wrap section-space ads-enquiry-grid"><div><h2 id="ads-enquire-title">Tell us where you’d like to begin.</h2><p>You do not need to choose a service yet. Start with an enquiry and ask the team about the next available consultation.</p><ol className="ads-next"><li>Send your enquiry on WhatsApp.</li><li>Discuss the format, fees and availability with the team.</li><li>Decide whether you would like to book.</li></ol><p>Prefer email? <a href={`mailto:${site.email}`}>{site.email}</a></p></div><AdsEnquiry /></div></section>
    <section className="section-wrap section-space ads-faq" aria-labelledby="ads-faq-title"><h2 id="ads-faq-title">Before you enquire</h2><div className="faq-list">{faqs.home.slice(1).map(item => <details key={item.q}><summary>{item.q}<span aria-hidden="true" /></summary><p>{item.a}</p></details>)}</div></section>
    <footer className="ads-footer section-wrap"><p>{legal.disclaimer}</p><p>{legal.copyright} · <a href="#ads-privacy">Enquiry privacy</a></p><details id="ads-privacy"><summary>How this page handles your enquiry</summary><p>The short form prepares a WhatsApp message in your browser. It does not submit or save your entries on this website. When you follow a WhatsApp or email link, that service handles your message. Please do not include sensitive records in an initial enquiry.</p><p>Opening a testimonial loads a Google Drive player. This deployment has no Google Ads or Meta tracking tags configured. Contact {site.email} with questions about information sent to the practice.</p></details></footer>
    <AdsSticky />
    <noscript><p className="section-wrap">You can also <a href={whatsappUrl("Hello, I would like to enquire about a consultation with Narayani Garg.")}>enquire directly on WhatsApp</a>.</p></noscript>
  </div>;
}
