import { asset } from "@/lib/assets";

/** Platform glyphs from Simple Icons; adjacent link text supplies the accessible name. */
export function SocialLogo({ platform }: { platform: "instagram" | "youtube" }) {
  // Static SVGs preserve the platforms' own colours without adding a network dependency.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="social-logo" src={asset(`/images/social/${platform}-logo.svg`)} width={24} height={24} alt="" aria-hidden="true" />;
}
