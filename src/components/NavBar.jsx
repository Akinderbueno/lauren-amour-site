import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SocialLinks from "./SocialLinks";
import { SHOP_URL } from "../data/links";
import { ShopIcon } from "./icons";
import logo from "../assets/logo/lauren-amour-logo.webp";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
    >
      <a href="#top" className="navbar__logo">
        <img src={logo} alt="Lauren Amour" />
      </a>

      <div className="navbar__right">
        <SocialLinks className="navbar__socials" />
        <a href={SHOP_URL} target="_blank" rel="noreferrer noopener" className="glossy-btn navbar__shop">
          <ShopIcon /> Shop
        </a>
        <button
          className={`navbar__toggle ${open ? "is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="navbar__mobile"
        >
          <SocialLinks />
          <a href={SHOP_URL} target="_blank" rel="noreferrer noopener" className="glossy-btn">
            <ShopIcon /> Shop
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
