/** Public view counts checked on 25 September 2026. A curated snapshot, not a live analytics feed.
 * YouTube Popular Shorts + both long-form uploads; Instagram's 67 public reel entries.
 * Titles below are concise subject labels, not promises of spiritual or medical outcomes.
 */
export type SocialPost = { id: string; title: string; views: string; url: string; image: string };
export const youtubePosts: SocialPost[] = [
  { id: "Fvr2yq5V_B0", title: "Why remedies alone may not be enough", views: "53K", url: "https://www.youtube.com/shorts/Fvr2yq5V_B0", image: "/images/social/yt-Fvr2yq5V_B0.avif" },
  { id: "jT5mTfqwlVQ", title: "Goddess Laxmi and professional life", views: "19K", url: "https://www.youtube.com/shorts/jT5mTfqwlVQ", image: "/images/social/yt-jT5mTfqwlVQ.avif" },
  { id: "hHQcolnZGNs", title: "Ganesh Chaturthi: a tradition around marriage", views: "17K", url: "https://www.youtube.com/shorts/hHQcolnZGNs", image: "/images/social/yt-hHQcolnZGNs.avif" },
  { id: "H20_QgNhylE", title: "Radha Ashtami and the wish for motherhood", views: "9.6K", url: "https://www.youtube.com/shorts/H20_QgNhylE", image: "/images/social/yt-H20_QgNhylE.avif" },
  { id: "jomLBYO9l8Y", title: "Three Janmashtami practices", views: "4.6K", url: "https://www.youtube.com/shorts/jomLBYO9l8Y", image: "/images/social/yt-jomLBYO9l8Y.avif" },
];
export const instagramPosts: SocialPost[] = [
  { id: "DdJA2Cluy_g", title: "Ganesh Chaturthi: a mantra and its meaning", views: "558K", url: "https://www.instagram.com/reel/DdJA2Cluy_g/", image: "/images/social/ig-DdJA2Cluy_g.jpg" },
  { id: "DdQWCCGvpy4", title: "The tradition behind Ganesh Visarjan", views: "246K", url: "https://www.instagram.com/reel/DdQWCCGvpy4/", image: "/images/social/ig-DdQWCCGvpy4.jpg" },
  { id: "DdMN-GAtcX5", title: "The Lotus Principle: beyond office politics", views: "211K", url: "https://www.instagram.com/reel/DdMN-GAtcX5/", image: "/images/social/ig-DdMN-GAtcX5.jpg" },
  { id: "Dck01SAx7yD", title: "Why remedies alone may not be enough", views: "159K", url: "https://www.instagram.com/reel/Dck01SAx7yD/", image: "/images/social/ig-Dck01SAx7yD.jpg" },
  { id: "DdHUd1ytnh7", title: "Ganesh Chaturthi and marriage", views: "83.5K", url: "https://www.instagram.com/reel/DdHUd1ytnh7/", image: "/images/social/ig-DdHUd1ytnh7.jpg" },
];
