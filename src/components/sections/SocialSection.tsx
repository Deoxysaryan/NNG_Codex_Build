import { StoryRail } from "@/components/voices/StoryRail";
import { instagramPosts, youtubePosts } from "@/content/social";
import { site } from "@/content/site";
import { asset } from "@/lib/assets";
import { SocialLogo } from "@/components/brand/SocialLogo";

export function SocialSection({ platform }: { platform: "youtube" | "instagram" }) {
  const youtube = platform === "youtube";
  const name = youtube ? "YouTube" : "Instagram";
  const posts = youtube ? youtubePosts : instagramPosts;
  return (
    <section id={platform} className={`section-space social-section social-${platform}`} aria-labelledby={`${platform}-title`}>
      <div className="section-wrap">
        <div className="transformation-head">
          <div><span className="social-eyebrow">{name}</span>
            <h2 id={`${platform}-title`}>{youtube ? "Watch Narayani on YouTube" : "From Narayani’s Instagram"}</h2>
            <p>{youtube ? "Five of her most-watched videos." : "Her five most-watched Instagram reels."}</p>
          </div>
          <a className="text-link social-profile-link" href={site.social[platform]} target="_blank" rel="noopener noreferrer"><SocialLogo platform={platform} /> Visit her {name} <span aria-hidden="true">↗</span></a>
        </div>
        <StoryRail label={`${name} videos`} itemLabel={`${name} posts`}>
          {posts.map(post => <a className="social-post" key={post.id} href={post.url} target="_blank" rel="noopener noreferrer">
            <div className="social-post-image"><img src={asset(post.image)} alt="" width={360} height={540} loading="lazy" decoding="async" /></div>
            <div className="social-post-meta"><span>{post.views} views</span><span>Watch on {name} ↗</span></div>
            <h3>{post.title}</h3>
          </a>)}
        </StoryRail>
        <p className="social-source-note">Selected by public views · 25 September 2026</p>
      </div>
    </section>
  );
}
