import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Experience.css";

// Logos live in src/assets/logos. If this file is not directly inside a folder
// one level under src (e.g. src/components), adjust the "../assets" part.
import gssocLogo from "../assets/logos/gssoc.png";
import ecellLogo from "../assets/logos/ecell.png";
import sapphireLogo from "../assets/logos/sapphire.png";
import osciContributor from "../assets/logos/osci-contributor.webp";
import osciCampusLead from "../assets/logos/osci-campus-lead.webp";

gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------------------------
   CONTENT — edit freely.
   visuals: imported images (kind "logo" = tile, "badge" = full image).
   rgb:  the accent color of the card, as "r, g, b".
---------------------------------------------------------------- */
const experiences = [
  {
    period: "2026",
    role: "Open Source Contributor",
    org: "GirlScript Summer of Code",
    badge: "GSSoC 2026",
    text: "Contributing features and fixes to KisanAI, an open-source project built with Next.js, TypeScript and MongoDB.",
    tags: ["Next.js", "TypeScript", "MongoDB"],
    visuals: [{ src: gssocLogo, alt: "GSSoC logo", kind: "logo" }],
    rgb: "255, 122, 60",
  },
  {
    period: "2026",
    role: "Campus Ambassador",
    org: "E-Cell × IIT Bombay",
    badge: "E-Cell IITB",
    text: "Representing E-Cell IIT Bombay at K.C. College of Engineering and bringing its startup programs to students.",
    tags: ["Community", "Outreach", "Events"],
    visuals: [{ src: ecellLogo, alt: "E-Cell IIT Bombay logo", kind: "logo" }],
    rgb: "140, 170, 210",
  },
  {
    period: "2026",
    role: "Software Engineer",
    org: "Sapphire Infocom Pvt Ltd",
    badge: "Software Development",
    text: "Building and shipping software as part of the development team.",
    tags: ["React", "Java", "Spring Boot"],
    visuals: [{ src: sapphireLogo, alt: "Sapphire Infocom logo", kind: "logo" }],
    rgb: "40, 160, 240",
  },
  {
    period: "2026",
    role: "Contributor & Campus Lead",
    org: "Open Source Connect India",
    badge: "OSCI'26",
    text: "Contributing to open source and leading the campus community for Open Source Connect India.",
    tags: ["Open Source", "Leadership"],
    visuals: [
      { src: osciContributor, alt: "OSCI Contributor 2026 badge", kind: "badge" },
      { src: osciCampusLead, alt: "OSCI Campus Lead 2026 badge", kind: "badge" },
    ],
    rgb: "94, 224, 160",
  },
];

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Experience() {
  const sectionRef = useRef(null);

  // Cards pile up: each card shrinks and dims as the next one slides over it
  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".xs-card");
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const trigger = {
          trigger: next,
          start: "top 85%",
          end: "top 25%",
          scrub: true,
        };
        // slight shrink + a soft dark veil (no CSS filter, so cards stay bright)
        gsap.fromTo(
          card,
          { scale: 1 },
          { scale: 0.95, transformOrigin: "center top", ease: "none", scrollTrigger: trigger }
        );
        gsap.fromTo(
          card.querySelector(".xs-shade"),
          { opacity: 0 },
          { opacity: 0.4, ease: "none", scrollTrigger: trigger }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Soft spotlight that follows the cursor inside a card
  const spotlight = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section className="experience-section" id="experience" ref={sectionRef}>
      <div className="experience-container">
        <header className="xs-heading">
          <p className="xs-eyebrow">04 — Experience</p>
          <h2>Where the code took me.</h2>
        </header>

        <div className="xs-stack">
          {experiences.map((exp, i) => (
            <article
              className="xs-card"
              key={exp.org}
              style={{ "--rgb": exp.rgb, "--i": i }}
              onMouseMove={spotlight}
            >
              <div className="xs-shade" aria-hidden="true" />
              <div className={`xs-visual ${exp.visuals.length > 1 ? "is-pair" : ""}`}>
                {exp.visuals.map((v, k) => (
                  <span className={`xs-vis xs-vis-${v.kind} xs-vis-${k}`} key={v.src}>
                    <img src={v.src} alt={v.alt} loading="lazy" />
                  </span>
                ))}
              </div>

              <div className="xs-main">
                <div className="xs-top">
                  <span className="xs-badge">{exp.badge}</span>
                  <span className="xs-period">{exp.period}</span>
                </div>

                <h3>{exp.role}</h3>
                <p className="xs-org">
                  {exp.org}
                  <Arrow />
                </p>
                <p className="xs-text">{exp.text}</p>

                <ul className="xs-tags">
                  {exp.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="xs-next">
          <p>Still building. What's next?</p>
          <a href="#contact">
            Get in touch <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Experience;