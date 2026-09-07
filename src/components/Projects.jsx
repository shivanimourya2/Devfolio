import React, { useState, useEffect } from 'react';
import "./Projects.css";

// Import your local screenshots exactly as requested
import rizzChatImg from '../assets/projects/rizzchat.png';
import bankingImg from '../assets/projects/banking.jpeg';
import speedoTypeImg from '../assets/projects/speedotype.png';

// Reusable project data array (Update empty strings with your actual URLs and tech)
const projectsData = [
  {
    title: "RizzChat",
    subtitle: "Real-Time Chat Application",
    description: "A seamless real-time messaging platform designed for instant communication and user connectivity.",
    technologies: ["React", "Node.js", "Socket.io", "Tailwind CSS"], 
    image: rizzChatImg,
    liveUrl: "https://rizz-chatt.web.app/",
    githubUrl: "https://github.com/shivanimourya2/RizzChat-FE"
  },
  {
    title: "Virtual Banking System",
    subtitle: "Secure Financial Platform",
    description: "A comprehensive virtual banking interface showcasing secure transactions, user dashboards, and financial data management.",
    technologies: ["React", "Express", "MongoDB", "JWT"],
    image: bankingImg,
   
    githubUrl: "https://github.com/shivanimourya2/Virtual-banking-system.git"
  },
  {
    title: "SpeedoType",
    subtitle: "Typing Speed Test",
    description: "An interactive typing speed test application that tracks WPM, accuracy, and provides real-time performance feedback.",
    technologies: ["React", "Vite", "CSS3"],
    image: speedoTypeImg,
    liveUrl: "https://speedo-type-eosin.vercel.app/",
    githubUrl: "https://github.com/shivanimourya2/SpeedoType.git"
  }
];

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum distance (in px) to register a swipe
  const minSwipeDistance = 50;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === projectsData.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1));
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mobile swipe support
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndAction = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  const currentProject = projectsData[currentIndex];

  return (
    <section id="projects" className="projects-section">
      <div 
        className="projects-container"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEndAction}
      >
        {/* Left Side: Project Info & Controls */}
        <div className="project-content">
          
          {/* Counter */}
          <div className="project-counter">
            {String(currentIndex + 1).padStart(2, '0')} / {String(projectsData.length).padStart(2, '0')}
          </div>

          {/* Text Content */}
          <div className="project-text-group">
            <h2 className="project-title">
              {currentProject.title}
            </h2>
            <h3 className="project-subtitle">
              {currentProject.subtitle}
            </h3>
            <p className="project-description">
              {currentProject.description}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="project-tech">
            {currentProject.technologies.map((tech, index) => (
              <span key={index} className="tech-pill">
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="project-actions">
            <a 
              href={currentProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <span>LIVE DEMO</span>
              <span className="btn-arrow">→</span>
            </a>
            <a 
              href={currentProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <span>GITHUB</span>
              <span className="btn-arrow">→</span>
            </a>
          </div>

          {/* Carousel Arrows */}
          <div className="project-controls">
            <button 
              onClick={handlePrev}
              className="control-btn"
              aria-label="Previous Project"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={handleNext}
              className="control-btn"
              aria-label="Next Project"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        {/* Right Side: Premium Image Showcase */}
        <div className="project-image-wrapper">
          {/* Smooth Fade/Slide Transition Wrapper */}
          <div 
            key={currentIndex} 
            className="project-slide"
          >
            <a 
              href={currentProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="browser-mockup"
            >
              {/* Overlay for Premium Browser Feel */}
              <div className="browser-header">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              
              <div className="browser-content">
                <img 
                  src={currentProject.image} 
                  alt={`${currentProject.title} preview`}
                  className="project-image"
                />
                
                {/* Subtle hover overlay */}
                <div className="image-overlay">
                  <span className="overlay-pill">
                    Click to View Live
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;