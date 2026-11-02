import "./Marquee.css";

const ITEMS = [
  { emoji: "💡", text: "NEW IDEA" },
  { emoji: "💻", text: "NEW REPO" },
  { emoji: "🐛", text: "NEW PROBLEM" },
  { emoji: "🔁", text: "REPEAT" },
  { emoji: "🧠", text: "TOO MANY INTERESTS" },
  { emoji: "💻", text: "NOT ENOUGH HOURS" },
  { emoji: "☕", text: "STILL EXPLORING" },
];

const REPEATS = 3;

const groupItems = Array.from({ length: REPEATS }, () => ITEMS).flat();

function MarqueeGroup({ duplicate = false }) {
  return (
    <div className="marquee-group" aria-hidden={duplicate ? "true" : undefined}>
      {groupItems.map((item, idx) => (
        <span key={idx} className="marquee-item">
          <span className="marquee-emoji">{item.emoji}</span>
          <span className="marquee-text">{item.text}</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="portfolio-marquee" aria-label="Developer thoughts">
      <div className="marquee-track">
        <MarqueeGroup />
        <MarqueeGroup duplicate />
      </div>
    </section>
  );
}