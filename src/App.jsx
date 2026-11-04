import AnimatedBackground from "./components/AnimatedBackground";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Marquee from "./components/Marquee";
import TechStack from "./components/Techstack";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <AnimatedBackground />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Marquee />
        <TechStack />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;
