import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PlaceholderImage from "./PlaceholderImage";
import theaterMarquee from "../assets/photos/theater-marquee.jpg";
import lyricPortrait from "../assets/photos/lyric-portrait.jpg";
import studioBts from "../assets/photos/studio-bts.jpg";
import disneylandCandid from "../assets/photos/disneyland-candid.jpg";

const PHOTOS = [
  { img: theaterMarquee, ratio: "4 / 5", drift: 60 },
  { img: lyricPortrait, ratio: "4 / 5", drift: -50 },
  { img: studioBts, ratio: "1 / 1", drift: 90 },
  { img: disneylandCandid, ratio: "3 / 4", drift: -70 },
  { label: "Add a photo", ratio: "3 / 4", drift: 40 },
  { label: "Add a photo", ratio: "1 / 1", drift: -40 },
];

function GalleryTile({ photo, i }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [photo.drift, -photo.drift]);
  const rotate = useTransform(scrollYProgress, [0, 1], [photo.drift > 0 ? -2.5 : 2.5, photo.drift > 0 ? 2.5 : -2.5]);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate }}
      initial={{ opacity: 0, y: 80, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: (i % 3) * 0.08 }}
      className="gallery__cell"
    >
      {photo.img ? (
        <div className="gallery__photo" style={{ aspectRatio: photo.ratio }}>
          <img src={photo.img} alt="Lauren Amour" />
        </div>
      ) : (
        <PlaceholderImage label={photo.label} ratio={photo.ratio} variant={i} />
      )}
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="section gallery">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="gallery__heading"
        >
          <span className="eyebrow">Gallery</span>
          <h2 className="chrome-text">Photos</h2>
        </motion.div>

        <div className="gallery__grid">
          {PHOTOS.map((photo, i) => (
            <GalleryTile key={photo.img ?? `${photo.label}-${i}`} photo={photo} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
