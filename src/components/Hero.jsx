import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Github,
  Linkedin,
  Mail,
  ArrowDown,
  Code2,
  Terminal,
  Cpu,
  Sparkles,
} from "lucide-react";

/**
 * =======================================================================
 * HERO CONFIGURATION & ASSETS
 * =======================================================================
 * 
 * 1. HOW TO ADD YOUR PROFILE PHOTO:
 *    Set `PROFILE_IMAGE_SRC` to your image path.
 *    Example:
 *    import myPhoto from "../assets/my-photo.jpg";
 *    const PROFILE_IMAGE_SRC = myPhoto;
 *    OR place an image in the public folder and use:
 *    const PROFILE_IMAGE_SRC = "/my-photo.jpg";
 * 
 *    If left as `null`, a polished developer identity card placeholder is shown!
 */
const PROFILE_IMAGE_SRC = null;

/**
 * 2. HOW TO CHANGE ANIMATED ROLE TITLES:
 *    Add, remove, or edit strings in this array.
 */
const ROLE_TITLES = [
  "Full-Stack Developer",
  "React Developer",
  "Web Developer",
  "Computer Engineering Student",
];

export default function Hero() {
  const heroRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(110);

  // Smooth Typewriter Animation for Dynamic Roles
  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setDisplayText(ROLE_TITLES[0]);
      return;
    }

    const currentFullText = ROLE_TITLES[roleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing characters
        const nextText = currentFullText.substring(0, displayText.length + 1);
        setDisplayText(nextText);

        if (nextText === currentFullText) {
          // Pause at full word before deleting
          setTypingSpeed(1800);
          setIsDeleting(true);
        } else {
          setTypingSpeed(80 + Math.random() * 40);
        }
      } else {
        // Deleting characters
        const nextText = currentFullText.substring(0, displayText.length - 1);
        setDisplayText(nextText);

        if (nextText === "") {
          // Finished deleting, move to next role
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLE_TITLES.length);
          setTypingSpeed(450);
        } else {
          setTypingSpeed(40);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, typingSpeed]);

  // GSAP Entrance Animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Staggered entrance
      tl.from(".hero-glow-bg", {
        opacity: 0,
        scale: 0.8,
        duration: 1.4,
        ease: "power2.out",
      })
        .from(
          ".hero-eyebrow",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=1.0"
        )
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
        .from(
          ".hero-role-block",
          {
            y: 25,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ".hero-description",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          ".hero-cta-btn",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.4"
        )
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
        .from(
          ".hero-visual-card",
          {
            y: 40,
            opacity: 0,
            scale: 0.95,
            duration: 1.1,
            ease: "power2.out",
          },
          "-=0.8"
        )
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
    <section id="home" className="hero" ref={heroRef}>
      {/* Ambient background glows */}
      <div className="hero-glow-bg hero-glow-primary" aria-hidden="true" />
      <div className="hero-glow-bg hero-glow-secondary" aria-hidden="true" />
      <div className="hero-grid-overlay" aria-hidden="true" />

      <div className="hero-container">
        {/* =========================================
            LEFT COLUMN: TYPOGRAPHY, ROLES, CTAs, SOCIALS
            ========================================= */}
        <div className="hero-text-col">
          {/* Eyebrow */}
          <div className="hero-eyebrow">
            <span className="hero-live-dot" aria-hidden="true">
              <span className="hero-live-dot-ping" />
            </span>
            <span className="hero-eyebrow-text">HI, I'M</span>
          </div>

          {/* Heading */}
          <h1 className="hero-title">
            <span className="hero-title-line">Shivani</span>{" "}
            <span className="hero-title-line hero-title-accent">Mourya</span>
          </h1>

          {/* Dynamic Animated Role */}
          <div className="hero-role-block" aria-live="polite">
            <div className="hero-role-main">
              <span className="hero-role-text">{displayText}</span>
              <span className="hero-cursor" aria-hidden="true">
                |
              </span>
            </div>
          </div>

          {/* Tagline / Description */}
          <p className="hero-description">
            I build modern, high-performance web applications, turn bold ideas
            into polished digital products, and craft clean, scalable code.
          </p>

          {/* CTA Action Buttons */}
          <div className="hero-buttons">
            <a
              href="#projects"
              className="btn btn-primary hero-cta-btn"
              id="hero-cta-work"
            >
              <span>VIEW MY WORK</span>
              <span className="btn-arrow" aria-hidden="true">
                →
              </span>
            </a>

            <a
              href="#contact"
              className="btn btn-secondary hero-cta-btn"
              id="hero-cta-connect"
            >
              <span>LET'S CONNECT</span>
              <span className="btn-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>

          {/* Social Links */}
          <div className="hero-socials" aria-label="Social profiles">
            <a
              href="https://github.com/shivanimourya2"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-item"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <Github size={20} />
            </a>

            <a
              href="https://linkedin.com/in/shivanimourya"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-item"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-item"
              aria-label="X (Twitter) Profile"
              title="X"
            >
              {/* Custom minimal X icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-item"
              aria-label="Discord Profile"
              title="Discord"
            >
              {/* Custom minimal Discord icon */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>

            <a
              href="mailto:shivanimouryaa2@gmail.com"
              className="hero-social-item"
              aria-label="Send Email"
              title="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* =========================================
            RIGHT COLUMN: DEVELOPER IDENTITY CARD & VISUALS
            ========================================= */}
        <div className="hero-visual-col">
          <div className="hero-visual-wrapper">
            {/* Developer Identity Card */}
            <div className="hero-visual-card">
              {/* Card Window Header */}
              <div className="card-window-header">
                <div className="card-window-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <div className="card-window-title">
                  <Terminal size={12} className="card-window-icon" />
                  <span>shivani.identity.js</span>
                </div>
                <div className="card-window-tag">DEV_01</div>
              </div>

              {/* Photo / Visual Container */}
              <div className="card-photo-container">
                {PROFILE_IMAGE_SRC ? (
                  <img
                    src={PROFILE_IMAGE_SRC}
                    alt="Shivani Mourya - Full-Stack Developer"
                    className="card-profile-img"
                    loading="eager"
                  />
                ) : (
                  /* Developer Avatar & Visual Placeholder */
                  <div className="card-avatar-placeholder">
                    <div className="avatar-mesh-backdrop" />
                    <div className="avatar-badge-top">
                      <Sparkles size={13} className="sparkle-icon" />
                      <span>OPEN TO WORK</span>
                    </div>

                    <div className="avatar-monogram-circle">
                      <span className="avatar-monogram-text">SM</span>
                      <div className="avatar-ring avatar-ring-1" />
                      <div className="avatar-ring avatar-ring-2" />
                    </div>

                    <div className="avatar-terminal-snippet">
                      <div className="code-line">
                        <span className="code-keyword">const</span>{" "}
                        <span className="code-var">engineer</span> = &#123;
                      </div>
                      <div className="code-line code-indent">
                        <span className="code-prop">name</span>:{" "}
                        <span className="code-string">"Shivani Mourya"</span>,
                      </div>
                      <div className="code-line code-indent">
                        <span className="code-prop">focus</span>:{" "}
                        <span className="code-string">"React &amp; Full-Stack"</span>
                      </div>
                      <div className="code-line">&#125;;</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Meta */}
              <div className="card-meta-footer">
                <div className="card-status-indicator">
                  <span className="status-indicator-dot" />
                  <span className="status-indicator-text">AVAILABLE FOR PROJECTS</span>
                </div>
                <div className="card-meta-pills">
                  <span className="meta-pill">React</span>
                  <span className="meta-pill">Node.js</span>
                  <span className="meta-pill">CS / Eng</span>
                </div>
              </div>
            </div>

            {/* Floating Developer Elements */}
            <div
              className="floating-badge badge-code-tags"
              title="Code Tags"
              aria-hidden="true"
            >
              <Code2 size={16} />
              <span>&lt;/&gt;</span>
            </div>

            <div
              className="floating-badge badge-brackets"
              title="Object Notation"
              aria-hidden="true"
            >
              <span>&#123; &#125;</span>
            </div>

            <div
              className="floating-badge badge-version"
              title="Identity Tag"
              aria-hidden="true"
            >
              <span className="badge-dim">ID:</span>
              <span className="badge-highlight">01</span>
            </div>

            <div
              className="floating-badge badge-monogram"
              title="Monogram"
              aria-hidden="true"
            >
              <span>SM</span>
            </div>

            <div
              className="floating-badge badge-react"
              title="React Stack"
              aria-hidden="true"
            >
              <Cpu size={14} className="badge-icon-spin" />
              <span>React.js</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          SCROLL TO EXPLORE INDICATOR
          ========================================= */}
      <a
        href="#about"
        className="hero-scroll-indicator"
        aria-label="Scroll to explore more sections"
      >
        <div className="scroll-mouse-icon">
          <span className="scroll-wheel" />
        </div>
        <span className="scroll-label">SCROLL TO EXPLORE</span>
        <ArrowDown size={14} className="scroll-arrow-icon" />
      </a>
    </section>
  );
}