import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MoreProjects from './components/MoreProjects';
import GalagaGame from './components/GalagaGame';
import CosmicBackground from './components/CosmicBackground';
import { LanguageProvider } from './context/LanguageContext';

const HomePage = () => {
  return (
    <div className="relative bg-void text-white min-h-screen overflow-x-clip">
      <CosmicBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Projects />
          <Skills />
          <Experience />
          <Education />
          <GalagaGame />
          <Contact />
        </div>
        <Footer />
      </div>
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
