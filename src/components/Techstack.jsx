
import { useState, useEffect, useRef } from "react";
import {
  FaJava,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import {
  SiJavascript,
  SiC,
  SiExpress,
  SiSpringboot,
  SiMongodb,
  SiMysql,
} from "react-icons/si";
import "./Techstack.css";

const technologies = [
  { name: "Java", Icon: FaJava, color: "#f89820" },
  { name: "JavaScript", Icon: SiJavascript, color: "#f7df1e" },
  { name: "C", Icon: SiC, color: "#5c8dbc" },
  { name: "React", Icon: FaReact, color: "#61dafb" },
  { name: "HTML5", Icon: FaHtml5, color: "#e34f26" },
  { name: "CSS3", Icon: FaCss3Alt, color: "#2d9bf0" },
  { name: "Node.js", Icon: FaNodeJs, color: "#68a063" },
  { name: "Express.js", Icon: SiExpress, color: "#ffffff" },
  { name: "Spring Boot", Icon: SiSpringboot, color: "#6db33f" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47a248" },
  { name: "MySQL", Icon: SiMysql, color: "#4b9fd1" },
  { name: "Python", Icon: FaPython, color: "#4b8bbe" },
  { name: "Git", Icon: FaGitAlt, color: "#f05032" },
  { name: "GitHub", Icon: FaGithub, color: "#ffffff" },
];

function TechStack() {
  const [showStack, setShowStack] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStack(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="techstack-section"
      id="techstack"
      ref={sectionRef}
    >
      <div className="techstack-heading">
        <span className="section-number">
          02 — TECHNICAL STACK ⚛
        </span>
        <h2>Technologies &amp; Tools</h2>
      </div>

      <div
        className={`techstack-container ${
          showStack ? "show-stack" : ""
        }`}
      >
        <div className="techstack-center">
          <span>&lt;/&gt;</span>
        </div>

        <div className="techstack-orbit"></div>

        {technologies.map(({ name, Icon, color }, index) => (
          <div
            key={name}
            className="tech-slot"
            style={{
              "--angle": `${
                (360 / technologies.length) * index - 90
              }deg`,
            }}
          >
            <div
              className="tech-pill"
              style={{
                animationDelay: `${index * 0.15}s`,
              }}
            >
              <Icon
                className="tech-icon"
                style={{ color }}
              />
              <span>{name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TechStack;