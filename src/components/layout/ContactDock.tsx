import { asset } from "@/lib/assets";
import { isPreviewNumber, whatsappUrl } from "@/lib/whatsapp";
import { EnquiryTrigger } from "@/components/enquiry/EnquiryTrigger";

export function ContactDock() {
  const whatsappLabel = <><img src={asset("/images/social/whatsapp-logo.svg")} width={22} height={22} alt="" /><span>WhatsApp</span></>;
  return (
    <aside className="contact-dock" aria-label="Contact Narayani’s team">
      {isPreviewNumber() ? (
        <EnquiryTrigger className="contact-dock-whatsapp" source="contact-dock-whatsapp-preview">{whatsappLabel}</EnquiryTrigger>
      ) : (
        <a className="contact-dock-whatsapp" href={whatsappUrl("Hello, I would like to enquire about a consultation with Narayani Garg.")} target="_blank" rel="noopener noreferrer">{whatsappLabel}</a>
      )}
      <a className="contact-dock-form" href={asset("/contact/#callback")}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></svg>
        <span>Enquiry form</span>
      </a>
    </aside>
  );
}
