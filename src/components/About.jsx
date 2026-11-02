import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import avatar from "../assets/about-avatar.png";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["Building", "Shipping", "Learning", "Solving"];

export default function About() {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray("[data-reveal]");
      const bar = root.current.querySelector("[data-bar]");

      gsap.set(items, {
        opacity: 0,
        y: 60,
      });

      if (bar) {
        gsap.set(bar, {
          scaleX: 0,
        });
      }

      const show = (direction) => {
        gsap.fromTo(
          items,
          {
            y: direction * 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
          }
        );

        if (bar) {
          gsap.to(bar, {
            scaleX: 1,
            duration: 1.2,
            delay: 0.4,
            ease: "power3.out",
            overwrite: true,
          });
        }
      };

      const hide = (direction) => {
        gsap.to(items, {
          y: -direction * 50,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          stagger: 0.02,
          overwrite: true,
        });

        if (bar) {
          gsap.to(bar, {
            scaleX: 0,
            duration: 0.25,
            overwrite: true,
          });
        }
      };

      ScrollTrigger.create({
        trigger: root.current,
        start: "top 70%",
        end: "bottom 30%",

        onEnter: () => show(1),
        onLeave: () => hide(1),

        onEnterBack: () => show(-1),
        onLeaveBack: () => hide(-1),
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section about" id="about" ref={root}>
      <div className="about-inner">

        {/* SECTION LABEL */}
        <p className="about-eyebrow" data-reveal>
          <i />
          About me
        </p>

        {/* HERO */}
        <div className="about-hero">

          {/* IMAGE */}
          <div className="about-visual" data-reveal>
            <div className="about-img-wrap">
              <img
                src={avatar}
                alt="3D illustration of Shivani coding"
              />
            </div>

            <span className="about-badge">
              <b />
              SHIVANI.EXE
              <em>running</em>
            </span>
          </div>

          {/* CONTENT */}
         <div className="about-copy">

  <h2 className="about-title" data-reveal>
    Who I am
  </h2>

  <p className="about-description" data-reveal>
    I'm <strong>Shivani Mourya</strong>, a Computer Engineering student driven by a passion for backend development, AI/ML, and modern web technologies. I thrive on turning complex ideas into scalable, functional applications and understanding the architecture behind them—from APIs and databases to interactive user experiences.
  </p>

  <p className="about-description" data-reveal>
    Currently, I'm focused on strengthening my core computer science fundamentals and building meaningful projects that solve real-world problems. My goal is to bridge the gap between robust engineering and intuitive design to create impactful digital experiences.
  </p>
</div> 

          
        </div>

        {/* INFO TILES */}
        <div className="about-tiles">

          {/* CGPA */}
          <div
            className="about-tile about-tile--cgpa"
            data-reveal
          >
            <span className="about-tile-label">
              Academic performance
            </span>

            <p className="about-tile-big">
              8.00 / 10.00
            </p>

            <div className="about-meter">
              <span
                data-bar
                style={{ width: "80%" }}
              />
            </div>
          </div>

          {/* GRADUATION */}
          <div className="about-tile" data-reveal>
            <span className="about-tile-label">
              Graduation
            </span>

            <p className="about-tile-big">
              2028
            </p>

            <p className="about-tile-note">
              Currently ( TE )
            </p>
          </div>

          {/* EDUCATION */}
          <div
            className="about-tile about-tile--wide"
            data-reveal
          >
            <span className="about-tile-label">
              Studying
            </span>

            <p className="about-tile-title">
              Computer Engineering
            </p>

            <p className="about-tile-note">
              K.C. College of Engineering, Thane
            </p>
          </div>

        </div>

        {/* MARQUEE */}
        <div
          className="about-marquee"
          data-reveal
          aria-hidden="true"
        >
          <div className="about-marquee-track">
            {[...WORDS, ...WORDS, ...WORDS, ...WORDS].map(
              (word, index) => (
                <span key={index}>
                  {word}
                  <i>✦</i>
                </span>
              )
            )}
          </div>
        </div>

      </div>
    </section>
  );
}