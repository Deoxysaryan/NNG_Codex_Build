"use client";

import { useState } from "react";
import { whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

export function AdsEnquiry() {
  const [name, setName] = useState("");
  const [format, setFormat] = useState("I'd like help choosing");
  const message = `Hello,${name.trim() ? ` my name is ${name.trim()}.` : ""} I would like to enquire about a consultation with Narayani Garg. Preferred format: ${format}. Please share the fees and availability.`;
  return <form className="ads-enquiry-form" onSubmit={event => event.preventDefault()}>
    <label htmlFor="ads-name">Your first name <span>(optional)</span></label>
    <input id="ads-name" autoComplete="given-name" maxLength={60} value={name} onChange={event => setName(event.target.value)} />
    <label htmlFor="ads-format">How would you prefer to meet?</label>
    <select id="ads-format" value={format} onChange={event => setFormat(event.target.value)}>
      <option>I&apos;d like help choosing</option><option>Online</option><option>In person</option>
    </select>
    <a className="button" href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { source: "ads-enquiry" })}>Continue on WhatsApp <span aria-hidden="true">↗</span></a>
    <p className="form-note">This opens a message you can edit. Your enquiry reaches the team only when you send it in WhatsApp. This page does not save these entries.</p>
    <noscript><p>JavaScript is off. The button opens a general enquiry message; add your preferred format in WhatsApp.</p></noscript>
  </form>;
}
