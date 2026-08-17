import SocialLinks from "./SocialLinks";
import { SHOP_URL } from "../data/links";
import { ShopIcon } from "./icons";
import logo from "../assets/logo/lauren-amour-logo.webp";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <a href="#top" className="footer__logo">
          <img src={logo} alt="Lauren Amour" />
        </a>

        <SocialLinks className="footer__socials" />

        <a href={SHOP_URL} target="_blank" rel="noreferrer noopener" className="glossy-btn outline footer__shop">
          <ShopIcon /> Shop
        </a>

        <p className="footer__meta">© {year} Lauren Amour. All rights reserved.</p>
      </div>
    </footer>
  );
}
