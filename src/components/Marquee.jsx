import "./Marquee.css";

const ITEMS = [
  { emoji: "🚀", text: "ASPIRING SOFTWARE ENGINEER" },
  { emoji: "🌐", text: "FULL STACK DEVELOPMENT" },
  { emoji: "🤝", text: "OPEN SOURCE CONTRIBUTOR" },
  { emoji: "☕", text: "JAVA DEVELOPER" },
  { emoji: "⚡", text: "BUILDING SCALABLE APPLICATIONS" },
  { emoji: "🎯", text: "CONTINUOUS LEARNING" },
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