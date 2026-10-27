import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import IndexSection from './components/IndexSection';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MoreProjects from './components/MoreProjects';
import GalagaGame from './components/GalagaGame';
import { LanguageProvider } from './context/LanguageContext';

const HomePage = () => {
  return (
    <div className="relative bg-ink text-paper min-h-screen overflow-x-clip">
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <Hero />
      <IndexSection />
      <About />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <GalagaGame />
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/more-projects" element={<MoreProjects />} />
      </Routes>
    </LanguageProvider>
  );
};

export default App;
