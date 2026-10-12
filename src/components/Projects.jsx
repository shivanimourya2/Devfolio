import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

import rizzChatImg from '../assets/projects/rizzchat.png';
import bankingImg from '../assets/projects/banking.jpeg';
import speedoTypeImg from '../assets/projects/speedotype.png';
import Labourlink from '../assets/projects/Labourlink.png';
const projectsData = [
  {
    title: "Rizz chat",
   
    description: "A seamless real-time messaging platform designed for instant communication, dynamic chatrooms, and fluid user connectivity.",
    technologies: ["React", "Node.js", "Socket.io", "CSS"],
    image: rizzChatImg,
    liveUrl: "https://rizz-chatt.web.app/",
    githubUrl: "https://github.com/shivanimourya2/RizzChat-FE"
  },
  {
    title: "Virtual Banking System",
    subtitle: "Secure Financial Platform",
    description: "A comprehensive virtual banking interface showcasing secure transactions, intuitive user dashboards, and real-time financial data management.",
    technologies: ["Java", "Springboot", "SQL"],
    image: bankingImg,
    liveUrl: "https://github.com/shivanimourya2/Virtual-banking-system.git",
    githubUrl: "https://github.com/shivanimourya2/Virtual-banking-system.git"
  },
  {
    title: "SpeedoType",
    subtitle: "Typing Speed Test",
    description: "An interactive typing speed test application that tracks WPM, accuracy metrics, and provides instant real-time performance feedback.",
    technologies: ["React", "Vite", "CSS3"],
    image: speedoTypeImg,
    liveUrl: "https://speedo-type-eosin.vercel.app/",
    githubUrl: "https://github.com/shivanimourya2/SpeedoType.git"
  },
 {
  title: "LabourLink",
  subtitle: "Worker & Contractor",
  description: "A platform that connects customers with nearby skilled and unskilled workers, enabling service discovery, booking, communication, and work management.",
  technologies: ["Spring Boot", "MySQL", "HTML", "CSS", "JavaScript"],
  image: Labourlink,
  liveUrl: "https://github.com/shivanimourya2/Labourlink.git", 
  githubUrl: "https://github.com/shivanimourya2/Labourlink.git"
}

];

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next');
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const sectionRef = useRef(null);
  const autoplayTimerRef = useRef(null);
  const isVisibleRef = useRef(false);

  const minSwipeDistance = 50;
  const AUTOPLAY_INTERVAL = 2500; // 2.5 seconds

  // Function to switch to next project
  const handleNext = () => {
    setSlideDirection('next');
    setCurrentIndex((prev) => (prev === projectsData.length - 1 ? 0 : prev + 1));
  };

  // Function to switch to previous project
  const handlePrev = () => {
    setSlideDirection('prev');
    setCurrentIndex((prev) => (prev === 0 ? projectsData.length - 1 : prev - 1));
  };

  // Function to jump to specific slide
  const goToSlide = (index) => {
    if (index === currentIndex) return;
    setSlideDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
  };

  // Start autoplay timer (only if visible and reduced motion is false)
  const startAutoplay = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    stopAutoplay();
    if (isVisibleRef.current) {
      autoplayTimerRef.current = setInterval(() => {
        handleNext();
      }, AUTOPLAY_INTERVAL);
    }
  };

  // Stop/pause autoplay timer
  const stopAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  // Reset autoplay timer when manual interactions occur
  const resetAutoplay = () => {
    startAutoplay();
  };

  // Keyboard navigation with autoplay timer reset
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
        resetAutoplay();
      }
      if (e.key === 'ArrowLeft') {
        handlePrev();
        resetAutoplay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // ScrollTrigger visibility detection for autoplay
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          isVisibleRef.current = true;
          startAutoplay();
        },
        onLeave: () => {
          isVisibleRef.current = false;
          stopAutoplay();
        },
        onEnterBack: () => {
          isVisibleRef.current = true;
          startAutoplay();
        },
        onLeaveBack: () => {
          isVisibleRef.current = false;
          stopAutoplay();
        },
      });
    }, sectionRef);

    return () => {
      stopAutoplay();
      ctx.revert();
    };
  }, []);

  // Update timer cycle when currentIndex changes
  useEffect(() => {
    if (isVisibleRef.current) {
      startAutoplay();
    }
    return () => stopAutoplay();
  }, [currentIndex]);

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
    if (distance > minSwipeDistance) {
      handleNext();
      resetAutoplay();
    }
    if (distance < -minSwipeDistance) {
      handlePrev();
      resetAutoplay();
    }
  };

  const currentProject = projectsData[currentIndex];
  const formattedCurrent = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(projectsData.length).padStart(2, '0');

  return (
    <section id="projects" ref={sectionRef} className="editorial-projects-section">
      <div className="editorial-projects-header">
        <div className="section-label">
          <span className="label-dot"></span>
          <span>FEATURED WORK</span>
        </div>
        <h2 className="section-heading">PROJECTS</h2>
      </div>

      <div
        className="editorial-projects-stage"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEndAction}
      >
        <div key={currentIndex} className={`editorial-project-card slide-${slideDirection}`}>
          {/* Left Column: Project Info */}
          <div className="editorial-info-col">
            <div className="project-number-badge">
              <span className="current-num">{formattedCurrent}</span>
              <span className="num-divider">/</span>
              <span className="total-num">{formattedTotal}</span>
            </div>

            <div className="project-meta-wrapper">
              <h3 className="editorial-project-title">{currentProject.title}</h3>
              <p className="editorial-project-subtitle">{currentProject.subtitle}</p>
              <p className="editorial-project-desc">{currentProject.description}</p>
            </div>

            <div className="editorial-tech-pills">
              {currentProject.technologies.map((tech, idx) => (
                <span key={idx} className="editorial-tech-tag">
                  {tech}
                </span>
              ))}
            </div>

            <div className="editorial-action-buttons">
              {currentProject.liveUrl ? (
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-btn editorial-btn-primary"
                >
                  <span>VIEW LIVE PROJECT</span>
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ) : (
                <button className="editorial-btn editorial-btn-primary disabled" disabled title="Live preview currently unavailable">
                  <span>VIEW LIVE PROJECT</span>
                  
                </button>
              )}

              <a
                href={currentProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-btn editorial-btn-secondary"
              >
                <span>GITHUB</span>
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

              {/* Navigation Arrows */}
              <div className="editorial-nav-controls">
                <button
                  onClick={() => {
                    handlePrev();
                    resetAutoplay();
                  }}
                  className="editorial-nav-arrow"
                  aria-label="Previous project"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div className="editorial-dots">
                  {projectsData.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        goToSlide(i);
                        resetAutoplay();
                      }}
                      className={`dot-indicator ${i === currentIndex ? 'active' : ''}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => {
                    handleNext();
                    resetAutoplay();
                  }}
                  className="editorial-nav-arrow"
                  aria-label="Next project"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
          </div>

          {/* Right Column: Screenshot Visual Focal Point */}
          <div className="editorial-visual-col">
            <div className="image-frame-container">
              {currentProject.liveUrl ? (
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-image-anchor"
                >
                  <img
                    src={currentProject.image}
                    alt={`${currentProject.title} screenshot`}
                    className="editorial-project-image"
                  />
                  <div className="image-hover-overlay">
                    <span className="hover-badge">
                      <span>View Live Demo</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </a>
              ) : (
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-image-anchor"
                >
                  <img
                    src={currentProject.image}
                    alt={`${currentProject.title} screenshot`}
                    className="editorial-project-image"
                  />
                  <div className="image-hover-overlay">
                    <span className="hover-badge">
                      <span>View Repository</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;