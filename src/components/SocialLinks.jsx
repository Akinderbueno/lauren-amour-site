import { SOCIAL_LINKS } from "../data/links";
import { InstagramIcon, TiktokIcon, YoutubeIcon, FacebookIcon } from "./icons";

const ICONS = {
  Instagram: InstagramIcon,
  TikTok: TiktokIcon,
  YouTube: YoutubeIcon,
  Facebook: FacebookIcon,
};

export default function SocialLinks({ className = "" }) {
  return (
    <div className={`social-links ${className}`}>
      {SOCIAL_LINKS.map(({ name, url }) => {
        const Icon = ICONS[name];
        return (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={name}
            className="social-links__item"
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
}
