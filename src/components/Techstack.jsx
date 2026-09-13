import { useState } from "react";
import "./Techstack.css";
const technologies = [
  { name: "Java", icon: "☕", position: "java" },
  { name: "JavaScript", icon: "JS", position: "javascript" },
  { name: "C", icon: "C", position: "c" },
  { name: "React", icon: "⚛", position: "react" },
  { name: "HTML5", icon: "◇", position: "html" },
  { name: "CSS3", icon: "▱", position: "css" },
  { name: "Node.js", icon: "⬡", position: "node" },
  { name: "Express.js", icon: "⌘", position: "express" },
  { name: "Spring Boot", icon: "♨", position: "spring" },
  { name: "MongoDB", icon: "◆", position: "mongo" },
  { name: "MySQL", icon: "◇", position: "mysql" },
  { name: "Python", icon: "Py", position: "python" },
  { name: "Git", icon: "⑂", position: "git" },
  { name: "GitHub", icon: "◉", position: "github" },
];

function TechStack() {
  const [showStack, setShowStack] = useState(false);

  return (
    <section className="techstack-section" id="techstack">

      {/* Heading */}
      <div className="techstack-heading">
        <span className="section-number">
          02 — TECHNICAL STACK
        </span>

        <h2>Technologies & Tools</h2>
      </div>

      {/* Explore Button */}
      <div className="techstack-action">
        <button
          className="techstack-button"
          onClick={() => setShowStack(!showStack)}
        >
          <span>
            {showStack ? "Hide my stack" : "Explore my stack"}
          </span>

          <span className="button-arrow">
            {showStack ? "↑" : "↓"}
          </span>
        </button>
      </div>

      {/* Circular Tech Stack */}
      <div
        className={`techstack-container ${
          showStack ? "show-stack" : ""
        }`}
      >

        {/* Center Circle */}
        <div className="techstack-center">
          <span>&lt;/&gt;</span>
        </div>

        {/* Circular Orbit */}
        <div className="techstack-orbit"></div>

        {/* Technologies */}
        {technologies.map((tech, index) => (
          <div
            key={tech.name}
            className={`tech-pill ${tech.position}`}
            style={{
              animationDelay: `${index * 0.20}s`,
            }}
          >
            <span className="tech-icon">
              {tech.icon}
            </span>

            <span>{tech.name}</span>
          </div>
        ))}

      </div>

    </section>
  );
}

export default TechStack;