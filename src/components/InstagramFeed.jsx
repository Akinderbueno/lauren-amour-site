import { motion } from "framer-motion";
import { InstagramIcon } from "./icons";
import { SNAPWIDGET_EMBED_URL } from "../data/links";

export default function InstagramFeed() {
  return (
    <section className="section instagram">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="instagram__heading"
        >
          <span className="eyebrow">
            <InstagramIcon /> @laurenamourmusic
          </span>
          <h2 className="chrome-text">Recent Posts</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="instagram__embed"
        >
          {SNAPWIDGET_EMBED_URL ? (
            <iframe
              src={SNAPWIDGET_EMBED_URL}
              className="instagram__iframe"
              frameBorder="0"
              scrolling="no"
              title="Instagram feed"
            />
          ) : (
            <div className="instagram__placeholder">
              <InstagramIcon />
              <p>
                Live feed goes here. Connect your account at{" "}
                <a href="https://snapwidget.com" target="_blank" rel="noreferrer noopener">
                  snapwidget.com
                </a>{" "}
                and drop the embed URL into <code>src/data/links.js</code>.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
