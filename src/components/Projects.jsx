import React, { useState, useEffect } from 'react';

// Import your local screenshots exactly as requested
import rizzChatImg from '../assets/projects/rizzchat.png';
import bankingImg from '../assets/projects/banking.png';
import speedoTypeImg from '../assets/projects/speedotype.png';

// Reusable project data array (Update empty strings with your actual URLs and tech)
const projectsData = [
  {
    title: "RizzChat",
    subtitle: "Real-Time Chat Application",
    description: "A seamless real-time messaging platform designed for instant communication and user connectivity.",
    technologies: ["React", "Node.js", "Socket.io", "Tailwind CSS"], 
    image: rizzChatImg,
    liveUrl: "https://your-rizzchat-live-url.com",
    githubUrl: "https://github.com/shivanimourya2/rizzchat"
  },
  {
    title: "Virtual Banking System",
    subtitle: "Secure Financial Platform",
    description: "A comprehensive virtual banking interface showcasing secure transactions, user dashboards, and financial data management.",
    technologies: ["React", "Express", "MongoDB", "JWT"],
    image: bankingImg,
    liveUrl: "https://your-banking-live-url.com",
    githubUrl: "https://github.com/shivanimourya2/banking-system"
  },
  {
    title: "SpeedoType",
    subtitle: "Typing Speed Test",
    description: "An interactive typing speed test application that tracks WPM, accuracy, and provides real-time performance feedback.",
    technologies: ["React", "Vite", "CSS3"],
    image: speedoTypeImg,
    liveUrl: "https://your-speedotype-live-url.com",
    githubUrl: "https://github.com/shivanimourya2/speedotype"
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
    <section 
      id="projects" 
      className="w-full min-h-screen bg-black text-white py-20 flex items-center justify-center overflow-hidden"
    >
      <div 
        className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col lg:flex-row items-center gap-12"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEndAction}
      >
        
        {/* Left Side: Project Info & Controls */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-8 z-10">
          
          {/* Counter */}
          <div className="text-purple-500 font-mono text-2xl font-bold tracking-widest">
            {String(currentIndex + 1).padStart(2, '0')} / {String(projectsData.length).padStart(2, '0')}
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              {currentProject.title}
            </h2>
            <h3 className="text-xl md:text-2xl text-gray-400 font-medium">
              {currentProject.subtitle}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
              {currentProject.description}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-3 pt-2">
            {currentProject.technologies.map((tech, index) => (
              <span 
                key={index} 
                className="px-4 py-2 rounded-full border border-purple-500/30 bg-purple-900/20 text-purple-300 text-sm font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-6 pt-6">
            <a 
              href={currentProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-md font-bold transition-all duration-300"
            >
              LIVE DEMO <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a 
              href={currentProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 border border-gray-500 hover:border-white text-gray-300 hover:text-white px-8 py-3 rounded-md font-bold transition-all duration-300"
            >
              GITHUB <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-4 pt-8">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-600 hover:border-purple-500 hover:text-purple-500 transition-colors duration-300"
              aria-label="Previous Project"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={handleNext}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-600 hover:border-purple-500 hover:text-purple-500 transition-colors duration-300"
              aria-label="Next Project"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        {/* Right Side: Premium Image Showcase */}
        <div className="w-full lg:w-1/2 relative flex items-center justify-center">
          {/* Smooth Fade/Slide Transition Wrapper */}
          <div 
            key={currentIndex} // Forces re-render for CSS animations
            className="w-full animate-fade-in"
          >
            <a 
              href={currentProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative group rounded-xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.15)] border border-gray-800 cursor-pointer"
            >
              {/* Overlay for Premium Browser Feel */}
              <div className="absolute top-0 left-0 w-full h-8 bg-gray-900 border-b border-gray-800 flex items-center px-4 gap-2 z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              
              <img 
                src={currentProject.image} 
                alt={`${currentProject.title} preview`}
                className="w-full h-auto object-cover mt-8 transform transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              
              {/* Subtle hover overlay to indicate clickability */}
              <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/20 transition-colors duration-500 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-black/80 text-white font-bold py-3 px-6 rounded-full backdrop-blur-sm shadow-xl">
                  Click to View Live
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;