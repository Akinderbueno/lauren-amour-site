import { useEffect } from "react";
import Lenis from "lenis";
import "./App.css";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import ListenShop from "./components/ListenShop";
import InstagramFeed from "./components/InstagramFeed";
import MailingList from "./components/MailingList";
import Footer from "./components/Footer";
import ScrollProgressBar from "./components/ScrollProgressBar";
import GlitterCursor from "./components/GlitterCursor";
import MarqueeTicker from "./components/MarqueeTicker";

export default function App() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 0.7,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    let frameId;
    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <ScrollProgressBar />
      <GlitterCursor />
      <NavBar />
      <main>
        <Hero />

        <div className="reveal-card">
          <MailingList
            id="bhgc"
            eyebrow="Join the club"
            title="Broken Hearted Girls Club"
            tagline="Join the Broken Hearted Girls Club... or the mailing list :)"
          />
          <MarqueeTicker />
        </div>

        <Gallery />
        <ListenShop />
        <InstagramFeed />
        <MailingList
          id="friends"
          eyebrow="Stay close"
          title="Let's Be Friends"
          tagline="First to know about new music, shows, and merch drops."
        />
      </main>
      <Footer />
    </>
  );
}
