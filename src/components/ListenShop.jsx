import { motion } from "framer-motion";
import { PlayIcon, ShopIcon } from "./icons";
import { SPOTIFY_URL, SHOP_URL } from "../data/links";

export default function ListenShop() {
  return (
    <section className="listen-shop">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="listen-shop__inner"
      >
        <h2>New music is out now.</h2>
        <div className="listen-shop__actions">
          <a href={SPOTIFY_URL} target="_blank" rel="noreferrer noopener" className="glossy-btn">
            <PlayIcon /> Listen Now
          </a>
          <a href={SHOP_URL} target="_blank" rel="noreferrer noopener" className="glossy-btn outline">
            <ShopIcon /> Shop Merch
          </a>
        </div>
      </motion.div>
    </section>
  );
}
