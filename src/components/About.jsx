import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, GraduationCap, Calendar } from "lucide-react";

import avatar from "../assets/about.jpeg";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const root = useRef(null);

  useLayoutEffect(() => {
    // Respect user's motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray("[data-reveal]");
      const bar = root.current?.querySelector("[data-bar]");

      // Subtle initial state: modest y offset, smooth fade
      gsap.set(items, {
        opacity: 0,
        y: 24,
      });

      if (bar) {
        gsap.set(bar, {
          scaleX: 0,
        });
      }

      ScrollTrigger.create({
        trigger: root.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(items, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.1,
          });

          if (bar) {
            gsap.to(bar, {
              scaleX: 1,
              duration: 1,
              delay: 0.3,
              ease: "power2.out",
            });
          }
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section about" id="about" ref={root}>
      <div className="about-inner">
        {/* SECTION HEADING */}
        <div className="about-header" data-reveal>
          <h2 className="about-heading">About Me</h2>
          <p className="about-subheading">A little about my journey in tech</p>
        </div>

        {/* TWO-COLUMN MAIN CONTENT */}
        <div className="about-content">
          {/* LEFT: PHOTOGRAPH */}
          <div className="about-visual" data-reveal>
            <div className="about-image-wrapper">
              <img
                src={avatar}
                alt="Shivani Mourya - Computer Engineering Student & Developer"
                className="about-image"
              />
            </div>
          </div>

          {/* RIGHT: INTRODUCTION & CARDS */}
          <div className="about-text-column" data-reveal>
            <h3 className="about-role-title">
             Unfortunately, you'll have to read a few lines to know me. 
             Sorry, no API for that yet😂🥹
            </h3>

            <div className="about-paragraphs">
              <p>
                Hello, I'm Shivani Mourya a third-year Computer Engineering student and software developer interested in building useful software and exploring what's possible with technology. Between startup work, hackathons, and DSA, I'm constantly challenging myself to think better and build smarter.
              </p>
              <p>
                Currently exploring the intersection of software development, 
                machine learning, Agentic AI and many more stuffs.
              </p>

            
            </div>

            {/* EDUCATION & INFO CARDS */}
            <div className="about-cards">
              {/* CGPA */}
              <div className="about-card">
                <div className="about-card-header">
                  <Award
                    className="about-card-icon"
                    size={17}
                    aria-hidden="true"
                  />
                  <span className="about-card-label">Academics</span>
                </div>
                <div className="about-card-value">8.00 / 10.00</div>
                <div className="about-card-meta">CGPA (Semester Avg)</div>
                <div className="about-card-meter" aria-hidden="true">
                  <span data-bar style={{ width: "80%" }} />
                </div>
              </div>

              {/* DEGREE */}
              <div className="about-card">
                <div className="about-card-header">
                  <GraduationCap
                    className="about-card-icon"
                    size={17}
                    aria-hidden="true"
                  />
                  <span className="about-card-label">Degree & college</span>
                </div>
                <div className="about-card-value">Computer Engineering</div>
                <div className="about-card-meta">
                  K.C. College of Engineering, Thane
                </div>
              </div>

              {/* GRADUATION */}
              <div className="about-card">
                <div className="about-card-header">
                  <Calendar
                    className="about-card-icon"
                    size={17}
                    aria-hidden="true"
                  />
                  <span className="about-card-label">Graduation</span>
                </div>
                <div className="about-card-value">2024 -2028</div>
                <div className="about-card-meta">Currently in (TE)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
