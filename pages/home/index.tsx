import Footer from "../layout/footer";
import Navigation from "../layout/navigation";
import About from "./about";
import Contact from "./contact";
import Experience from "./experience";
import Hero from "./hero";
import Projects from "./projects";
import Skills from "./skills";

const HomePage = () => {
  return (
    <div className="bg-black min-h-screen text-zinc-300 selection:bg-zinc-700 selection:text-white">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
