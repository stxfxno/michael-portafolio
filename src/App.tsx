import { useState } from 'react';
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

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Actualizar la clase en el documento para mantener consistencia
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    }
  };
  
  // Inicializar el tema al cargar la página
  useState(() => {
    // Intentar leer la preferencia guardada
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === 'true');
      if (savedDarkMode === 'true') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Si no hay preferencia guardada, usar el tema predeterminado (dark: true)
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    }
  });

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        {/* Contenedor principal con margen más pequeño en móvil */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />
        </div>
        <Footer />
      </div>
    </div>
  );
};

// La ruta MoreProjects ahora hereda el tema oscuro del componente MoreProjects
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/more-projects" element={<MoreProjects />} />
    </Routes>
  );
};

export default App;