const ITEMS = [
  "Broken Hearted Girls Club",
  "New Music Out Now",
  "Join the Mailing List",
  "@laurenamourmusic",
];

export default function MarqueeTicker() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="marquee">
      <div className="marquee__track">
        {track.map((text, i) => (
          <span className="marquee__item" key={i}>
            {text}
            <span className="marquee__dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
