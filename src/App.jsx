import AnimatedBackground from "./components/AnimatedBackground";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Hero from "./components/Hero";
import TechStack from "./components/Techstack";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Connect from "./components/Connect";
import Contact from "./components/Contact";

function App() {
  return (
    <>
    <AnimatedBackground/>
    <CustomCursor />
    <Navbar/>
    <main>
      <Hero/>
      <About/>
      <TechStack/>
      <Projects/>
      <Experience/>
      <Connect/>
      <Contact/>

    </main>
    </>
  );
}

export default App;