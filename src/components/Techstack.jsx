import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code, Terminal, Cpu,
  Globe, FileCode, Layers,
  Server, Workflow, Flame,
  Database, Box, GitBranch,
  Sparkles
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TECH_DATA = [
  // Group 01: Java -> JavaScript -> C
  { name: "Java", icon: Code, group: 1, posClass: "pos-java", delay: "0s" },
  { name: "JavaScript", icon: Terminal, group: 1, posClass: "pos-js", delay: "1.2s" },
  { name: "C", icon: Cpu, group: 1, posClass: "pos-c", delay: "0.5s" },
  
  // Group 02: React -> HTML5 -> CSS3
  { name: "React", icon: Globe, group: 2, posClass: "pos-react", delay: "0.8s" },
  { name: "HTML5", icon: FileCode, group: 2, posClass: "pos-html", delay: "2.1s" },
  { name: "CSS3", icon: Layers, group: 2, posClass: "pos-css", delay: "1.5s" },
  
  // Group 03: Node.js -> Express.js -> Spring Boot
  { name: "Node.js", icon: Server, group: 3, posClass: "pos-node", delay: "0.3s" },
  { name: "Express.js", icon: Workflow, group: 3, posClass: "pos-express", delay: "1.8s" },
  { name: "Spring Boot", icon: Flame, group: 3, posClass: "pos-spring", delay: "2.5s" },
  
  // Group 04: MongoDB -> MySQL -> Git
  { name: "MongoDB", icon: Database, group: 4, posClass: "pos-mongo", delay: "1.1s" },
  { name: "MySQL", icon: Box, group: 4, posClass: "pos-mysql", delay: "0.7s" },
  { name: "Git", icon: GitBranch, group: 4, posClass: "pos-git", delay: "2.2s" },
];

export default function TechStack() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(".tech-header", {
        scrollTrigger: {
          trigger: ".tech-section",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Staggered reveal for floating pills grouped sequentially
      [1, 2, 3, 4].forEach((groupNum) => {
        gsap.from(`.tech-group-${groupNum}`, {
          scrollTrigger: {
            trigger: ".tech-canvas",
            start: "top 70%",
          },
          y: 60,
          opacity: 0,
          scale: 0.8,
          stagger: 0.15,
          duration: 1.2,
          ease: "back.out(1.2)",
          delay: (groupNum - 1) * 0.3, // delays each group slightly after the previous
        });
      });

      // Ending quote reveal
      gsap.from(".tech-quote", {
        scrollTrigger: {
          trigger: ".tech-quote",
          start: "top 95%",
        },
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="techstack" className="tech-section" ref={sectionRef}>
      <div className="tech-glow-bg tech-glow-1" aria-hidden="true" />
      <div className="tech-glow-bg tech-glow-2" aria-hidden="true" />

      <div className="tech-container">
        <div className="tech-header text-center">
          <p className="section-label">02 — TECHNICAL STACK</p>
          <h2 className="tech-heading">
            Technologies &amp; <span className="text-gradient">Tools</span>
          </h2>
        </div>

        <div className="tech-canvas">
          {TECH_DATA.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div 
                key={idx} 
                className={`tech-pill tech-group-${tech.group} ${tech.posClass}`}
                style={{ animationDelay: tech.delay }}
              >
                <Icon size={18} className="tech-pill-icon" />
                <span className="tech-pill-name">{tech.name}</span>
              </div>
            );
          })}
        </div>

        <div className="tech-quote">
          <Sparkles size={16} className="quote-sparkle" />
          <p>"Always learning. Always building."</p>
          <Sparkles size={16} className="quote-sparkle" />
        </div>
      </div>
    </section>
  );
}
