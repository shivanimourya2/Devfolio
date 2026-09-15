import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import myPhoto from "../assets/shivani.jpeg";

import {
  ArrowDown,
  Code2,
  Terminal,
  Cpu,
  Sparkles,
} from "lucide-react";

import {
  SiGithub,
  SiX,
  SiLeetcode,
  SiGmail,
  SiDiscord,
  SiInstagram,
} from "react-icons/si";

import { FaLinkedin } from "react-icons/fa";

const PROFILE_IMAGE_SRC = myPhoto;

const ROLE_TITLES = [
  "Full-Stack Developer",
  "Computer Engineering Student",
];

export default function Hero() {
  const heroRef = useRef(null);

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState(() => {
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      return prefersReducedMotion ? ROLE_TITLES[0] : "";
    }
    return "";
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(110);

  /* =========================
     TYPING EFFECT
  ========================= */

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (mediaQuery.matches) {
      return;
    }

    const currentFullText = ROLE_TITLES[roleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        const nextText = currentFullText.substring(
          0,
          displayText.length + 1
        );

        setDisplayText(nextText);

        if (nextText === currentFullText) {
          setTypingSpeed(1800);
          setIsDeleting(true);
        } else {
          setTypingSpeed(80 + Math.random() * 40);
        }
      } else {
        const nextText = currentFullText.substring(
          0,
          displayText.length - 1
        );

        setDisplayText(nextText);

        if (nextText === "") {
          setIsDeleting(false);
          setRoleIndex(
            (prev) => (prev + 1) % ROLE_TITLES.length
          );
          setTypingSpeed(450);
        } else {
          setTypingSpeed(40);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [
    displayText,
    isDeleting,
    roleIndex,
    typingSpeed,
  ]);
/* =========================
   GSAP HERO ANIMATION
========================= */

useEffect(() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) return;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    tl.from(".hero-glow-bg", {
      opacity: 0,
      scale: 0.8,
      duration: 1.4,
      ease: "power2.out",
    })

      // Eyebrow
      .from(
        ".hero-eyebrow",
        {
          y: 20,
          opacity: 0,
          duration: 0.7,
        },
        "-=1"
      )

      // Name
      .from(
        ".hero-title-line",
        {
          y: 35,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
        },
        "-=0.5"
      )

      // Role
      .from(
        ".hero-role-block",
        {
          y: 25,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.6"
      )

      // Description
      .from(
        ".hero-description",
        {
          y: 20,
          opacity: 0,
          duration: 0.7,
        },
        "-=0.5"
      )

      // Social icons
      .from(
        ".hero-social-item",
        {
          y: 15,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
        },
        "-=0.3"
      )

      // CTA buttons
      .from(
        ".hero-buttons",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.2"
      )

      // Right-side card
      .from(
        ".hero-visual-card",
        {
          y: 40,
          opacity: 0,
          scale: 0.95,
          duration: 1.1,
          ease: "power2.out",
        },
        "-=0.7"
      )

      // Floating badges
      .from(
        ".floating-badge",
        {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      )

      // Scroll indicator
      .from(
        ".hero-scroll-indicator",
        {
          opacity: 0,
          y: -15,
          duration: 0.8,
        },
        "-=0.2"
      );
      }, heroRef);

  return () => ctx.revert();
}, []);

  return (
    <section
      id="home"
      className="hero"
      ref={heroRef}
    >
      {/* =========================
          BACKGROUND
      ========================= */}

      <div
        className="hero-glow-bg hero-glow-primary"
        aria-hidden="true"
      />

      <div
        className="hero-glow-bg hero-glow-secondary"
        aria-hidden="true"
      />

      <div
        className="hero-grid-overlay"
        aria-hidden="true"
      />

      <div className="hero-container">

        {/* =========================
            LEFT / TEXT CONTENT
        ========================= */}

        <div className="hero-text-col">

          {/* Eyebrow */}
          <div className="hero-eyebrow">
            <span
              className="hero-live-dot"
              aria-hidden="true"
            >
              <span className="hero-live-dot-ping" />
            </span>

            <span className="hero-eyebrow-text">
              HII, I'M
            </span>
          </div>

          {/* Name */}
          <h1 className="hero-title">
            <span className="hero-title-line">
              Shivani
            </span>{" "}
            <span className="hero-title-line hero-title-accent">
              Mourya
            </span>
          </h1>

          {/* Role */}
          <div
            className="hero-role-block"
            aria-live="polite"
          >
            <div className="hero-role-main">
              <span className="hero-role-text">
                {displayText}
              </span>

              <span
                className="hero-cursor"
                aria-hidden="true"
              >
                |
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="hero-description">
            I turn ideas into fast, polished web apps —
            clean React front-ends, solid Node/Express APIs,
            and UI that doesn't feel like a template.
          </p>

          {/* =========================
              SOCIAL ICONS
          ========================= */}

          <div
            className="hero-socials"
            aria-label="Social profiles"
          >
            {/* GitHub */}
            <a
              href="https://github.com/shivanimourya2"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-item"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <SiGithub />
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/shivanimourya"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-item"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>

            {/* X */}
            <a
              href="https://x.com/shivanimouryaa2"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-item"
              aria-label="X Profile"
              title="X"
            >
              <SiX />
            </a>

            {/* LeetCode */}
            <a
              href="https://leetcode.com/shivanimourya"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-item"
              aria-label="LeetCode Profile"
              title="LeetCode"
            >
              <SiLeetcode />
            </a>

            {/* Instagram */}
            <a
              href="shivanimourya2"
              className="hero-social-item hero-gmail"
              aria-label="Instagram "
              title="Instagram"
            >
              <SiInstagram />
            </a>

            {/* Discord */}
            <a
              href="https://discord.com/users/shivanimourya"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-item"
              aria-label="Discord Profile"
              title="Discord"
            >
              <SiDiscord />
            </a>
          </div>

          {/* =========================
              CTA BUTTONS
          ========================= */}

          <div className="hero-buttons">

            <a
              href="#projects"
              className="btn btn-primary hero-cta-btn"
              id="hero-cta-work"
            >
              <span>VIEW MY WORK</span>

              <span
                className="btn-arrow"
                aria-hidden="true"
              >
                →
              </span>
            </a>

            <a
              href="#contact"
              className="btn btn-secondary hero-cta-btn"
              id="hero-cta-connect"
            >
              <span>LET'S CONNECT</span>

              <span
                className="btn-arrow"
                aria-hidden="true"
              >
                →
              </span>
            </a>

          </div>

        </div>

        {/* =========================
            RIGHT / VISUAL CARD
        ========================= */}

        <div className="hero-visual-col">
          <div className="hero-visual-wrapper">

            <div className="hero-visual-card">

              {/* Window Header */}
              <div className="card-window-header">

                <div className="card-window-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>

                <div className="card-window-title">
                  <Terminal
                    size={12}
                    className="card-window-icon"
                  />

                  <span>shivani.js</span>
                </div>

                <div className="card-window-tag">
                  DEV_01
                </div>

              </div>

              {/* Profile Image */}
              <div className="card-photo-container">

                {PROFILE_IMAGE_SRC ? (
                  <img
                    src={PROFILE_IMAGE_SRC}
                    alt="Shivani Mourya - Full-Stack Developer"
                    className="card-profile-img"
                    loading="eager"
                  />
                ) : (
                  <div className="card-avatar-placeholder">

                    <div className="avatar-mesh-backdrop" />

                    <div className="avatar-badge-top">
                      <Sparkles
                        size={13}
                        className="sparkle-icon"
                      />

                      <span>
                        OPEN TO WORK
                      </span>
                    </div>

                    <div className="avatar-monogram-circle">
                      <span className="avatar-monogram-text">
                        SM
                      </span>

                      <div className="avatar-ring avatar-ring-1" />
                      <div className="avatar-ring avatar-ring-2" />
                    </div>

                    <div className="avatar-terminal-snippet">

                      <div className="code-line">
                        <span className="code-keyword">
                          const
                        </span>{" "}
                        <span className="code-var">
                          engineer
                        </span>{" "}
                        = &#123;
                      </div>

                      <div className="code-line code-indent">
                        <span className="code-prop">
                          name
                        </span>
                        :{" "}
                        <span className="code-string">
                          "Shivani Mourya"
                        </span>
                        ,
                      </div>

                      <div className="code-line code-indent">
                        <span className="code-prop">
                          focus
                        </span>
                        :{" "}
                        <span className="code-string">
                          "React & Full-Stack"
                        </span>
                      </div>

                      <div className="code-line">
                        &#125;;
                      </div>

                    </div>
                  </div>
                )}

              </div>

              {/* Card Footer */}
              <div className="card-meta-footer">

                <div className="card-status-indicator">
                  <span className="status-indicator-dot" />

                  <span className="status-indicator-text">
                    AVAILABLE FOR PROJECTS
                  </span>
                </div>

                <div className="card-meta-pills">
                  <span className="meta-pill">
                    React
                  </span>

                  <span className="meta-pill">
                    Node.js
                  </span>

                  <span className="meta-pill">
                    CS / Eng
                  </span>
                </div>

              </div>

            </div>

            {/* Floating Code Badge */}
            <div
              className="floating-badge badge-code-tags"
              title="Code Tags"
              aria-hidden="true"
            >
              <Code2 size={16} />
              <span>&lt;/&gt;</span>
            </div>

            {/* Floating Brackets Badge */}
            <div
              className="floating-badge badge-brackets"
              title="Object Notation"
              aria-hidden="true"
            >
              <span>&#123; &#125;</span>
            </div>

            {/* Floating React Badge */}
            <div
              className="floating-badge badge-react"
              title="React Stack"
              aria-hidden="true"
            >
              <Cpu
                size={14}
                className="badge-icon-spin"
              />

              <span>React.js</span>
            </div>

          </div>
        </div>

      </div>

      {/* =========================
          SCROLL INDICATOR
      ========================= */}

      <a
        href="#about"
        className="hero-scroll-indicator"
        aria-label="Scroll to explore more sections"
      >
        <div className="scroll-mouse-icon">
          <span className="scroll-wheel" />
        </div>

        <span className="scroll-label">
          SCROLL TO EXPLORE
        </span>

        <ArrowDown
          size={14}
          className="scroll-arrow-icon"
        />
      </a>

    </section>
  );
}