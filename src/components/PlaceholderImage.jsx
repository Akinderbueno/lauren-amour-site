const GRADIENTS = [
  "linear-gradient(135deg, #ff0074, #ff2ec4)",
  "linear-gradient(135deg, #ff2ec4, #ffd23f)",
  "linear-gradient(135deg, #ff7ed4, #ff0074)",
  "linear-gradient(135deg, #ffb6ec, #ff6ec7)",
];

export default function PlaceholderImage({
  label,
  ratio = "4 / 5",
  variant = 0,
  className = "",
}) {
  return (
    <div
      className={`placeholder-img ${className}`}
      style={{ aspectRatio: ratio, background: GRADIENTS[variant % GRADIENTS.length] }}
    >
      <span className="placeholder-img__label">{label}</span>
    </div>
  );
}
