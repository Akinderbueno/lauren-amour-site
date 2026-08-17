import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PlayIcon } from "./icons";
import { SPOTIFY_URL } from "../data/links";
import heroPhoto from "../assets/photos/theater-marquee.jpg";
import logo from "../assets/logo/lauren-amour-logo.webp";
import Sparkles from "./Sparkles";

export default function Hero() {
  const wrapRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const logoScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.82]);

  return (
    <div ref={wrapRef} className="hero-pin-wrap">
      <section id="top" className="hero">
        <motion.div className="hero__bg" style={{ scale: bgScale, y: bgY }}>
          <img src={heroPhoto} alt="Lauren Amour" />
        </motion.div>
        <div className="hero__scrim" />

        <div className="hero__blob hero__blob--one" />
        <div className="hero__blob hero__blob--two" />

        <Sparkles count={16} seed={7} className="hero__sparkles" />

        <motion.div className="hero__content" style={{ y: contentY, opacity: fade }}>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="eyebrow"
          >
            Broken Hearted Girls Club
          </motion.span>

          <motion.div
            className="hero__logo"
            style={{ rotate: logoRotate, scale: logoScale }}
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            <motion.img
              src={logo}
              alt="Lauren Amour"
              animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="hero__subtitle"
          >
            New music, new photos, same heartbreak. Come be sad with me.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="hero__actions"
          >
            <a href={SPOTIFY_URL} target="_blank" rel="noreferrer noopener" className="glossy-btn">
              <PlayIcon /> Listen Now
            </a>
            <a href="#gallery" className="glossy-btn outline">
              See Photos
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__scroll-cue"
          style={{ opacity: fade }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          scroll
        </motion.div>
      </section>
    </div>
  );
}
