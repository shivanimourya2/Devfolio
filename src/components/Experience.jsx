import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Experience.css";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: "01",
    title: "OPEN SOURCE",
    subtitle: "CONTRIBUTOR",
    organization: "GirlScript Summer of Code",
    short: "GSSoC 2026",
  },
  {
    id: "02",
    title: "CAMPUS",
    subtitle: "AMBASSADOR",
    organization: "E-Cell × IIT Bombay",
    short: "E-Cell × IITB",
  },
  {
    id: "03",
    title: "SOFTWARE",
    subtitle: "ENGINEER",
    organization: "Sapphire Infocom Pvt Ltd",
    short: "Sapphire Infocom",
  },
  {
    id: "04",
    title: "OPEN SOURCE",
    subtitle: "CONNECT INDIA",
    organization: "Contributor + Campus Lead",
    short: "OSCI'26",
  },
];

function Experience() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const stopsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;

    if (!section || !path) return;

    const pathLength = path.getTotalLength();

    // Hide the route initially
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Hide route stops initially
    gsap.set(stopsRef.current, {
      scale: 0,
      opacity: 0,
      transformOrigin: "center",
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        end: "bottom 70%",
        scrub: 1,
      },
    });

    timeline.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      duration: 1,
    });

    timeline.to(
      stopsRef.current,
      {
        scale: 1,
        opacity: 1,
        stagger: 0.2,
        duration: 0.25,
        ease: "back.out(2)",
      },
      0.15
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="experience-section" ref={sectionRef}>
      <div className="experience-container">

        {/* Heading */}
        <div className="experience-heading">
          <h1 className="experience-number">04 — EXPERIENCE</h1>

          <h2>
            Where the code
            <br />
            took me.
          </h2>
        </div>

        {/* Route */}
        <div className="route-wrapper">

          <svg
            className="experience-route"
            viewBox="0 0 1000 1500"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <filter id="route-glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              ref={pathRef}
              className="route-path-glow"
              d="
                M 500 70
                C 500 170, 500 190, 390 270
                C 280 350, 280 400, 390 470
                C 500 540, 650 540, 650 650
                C 650 760, 500 760, 390 850
                C 280 940, 300 1010, 430 1080
                C 560 1150, 650 1190, 650 1300
              "
              filter="url(#route-glow)"
            />

            <path
              className="route-path"
              d="
                M 500 70
                C 500 170, 500 190, 390 270
                C 280 350, 280 400, 390 470
                C 500 540, 650 540, 650 650
                C 650 760, 500 760, 390 850
                C 280 940, 300 1010, 430 1080
                C 560 1150, 650 1190, 650 1300
              "
            />
          </svg>

          {/* Year */}
          <div className="route-year">
            2026
          </div>

          {/* Experience 01 */}
          <div
            className="experience-stop stop-1"
            ref={(el) => (stopsRef.current[0] = el)}
          >
            <div className="route-dot">
              <span />
            </div>

            <div className="experience-info">
              <span className="experience-index">01</span>

              <h3>
                OPEN SOURCE
                <br />
                CONTRIBUTOR
              </h3>

              <p>GirlScript Summer of Code</p>
              <small>GSSoC 2026</small>
            </div>
          </div>

          {/* Experience 02 */}
          <div
            className="experience-stop stop-2"
            ref={(el) => (stopsRef.current[1] = el)}
          >
            <div className="route-dot">
              <span />
            </div>

            <div className="experience-info">
              <span className="experience-index">02</span>

              <h3>
                CAMPUS
                <br />
                AMBASSADOR
              </h3>

              <p>E-Cell × IIT Bombay</p>
              <small>Campus Ambassador</small>
            </div>
          </div>

          {/* Experience 03 */}
          <div
            className="experience-stop stop-3"
            ref={(el) => (stopsRef.current[2] = el)}
          >
            <div className="route-dot">
              <span />
            </div>

            <div className="experience-info">
              <span className="experience-index">03</span>

              <h3>
                SOFTWARE
                <br />
                ENGINEER
              </h3>

              <p>Sapphire Infocom Pvt Ltd</p>
              <small>Software Development</small>
            </div>
          </div>

          {/* Experience 04 */}
          <div
            className="experience-stop stop-4"
            ref={(el) => (stopsRef.current[3] = el)}
          >
            <div className="route-dot">
              <span />
            </div>

            <div className="experience-info">
              <span className="experience-index">04</span>

              <h3>
                OPEN SOURCE
                <br />
                CONNECT INDIA
              </h3>

              <p>Contributor + Campus Lead</p>
              <small>OSCI'26</small>
            </div>
          </div>

          {/* Ending */}
          <div className="route-end">
            <div className="end-dot">?</div>

            <span>WHAT'S NEXT?</span>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Experience;