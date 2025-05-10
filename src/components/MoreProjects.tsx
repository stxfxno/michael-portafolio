import { Code, ExternalLink, Github, Calendar, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from '../context/LanguageContext';

const MoreProjects = () => {
  const [darkMode, setDarkMode] = useState(true);
  const { t, language } = useLanguage();

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

  // Efecto para sincronizar el modo oscuro con el cuerpo del documento al cargar
  useEffect(() => {
    // Intentar obtener el modo oscuro guardado en localStorage si existe
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedDarkMode !== null) {
      const isDark = savedDarkMode === 'true';
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Si no hay preferencia guardada, verificar la clase actual
      const isDark = document.documentElement.classList.contains('dark');
      setDarkMode(isDark);
    }
  }, []);

  // Proyectos con contenido condicional según el idioma
  const additionalProjects = language === 'es' ? [
    {
      title: "Listify MP3 Downloader",
      description: "Programa en Python que automatiza la búsqueda y descarga de canciones desde YouTube a partir de una lista en formato TXT. Utiliza APIs para la búsqueda eficiente y herramientas de conversión para obtener archivos MP3 de alta calidad.",
      period: "2024 (febrero)",
      technologies: ["Python", "YouTube API", "FFmpeg", "Requests"],
      image: "/images/chat_app_platform.png", // Usa una imagen existente como fallback
      icon: <Terminal className="text-yellow-500 mr-2" size={18} />,
      links: {
        github: "https://github.com/stxfxno/Listify"
      }
    },
    {
      title: "App Móvil simulador de ID Cards",
      description: "Aplicación móvil que simula la generación de ID Cards universitarias para evidenciar vulnerabilidades en sistemas de autenticación. Permite personalizar datos, códigos QR y fotografías para crear credenciales virtuales con fines educativos sobre seguridad.",
      period: "2024 (octubre-noviembre)",
      technologies: ["Android Studio", "Kotlin", "XML", "ZXing"],
      image: "/images/manage_wise.png", // Usa una imagen existente como fallback
      icon: <Code className="text-green-500 mr-2" size={18} />,
      links: {
        resources: "https://drive.google.com/drive/folders/17J6zYYErU9Eb1igGqsxbPsz09T2Pio_R?usp=sharing"
      }
    },
    {
      title: "Generador de Horarios Falsos",
      description: "Herramienta para evidenciar fallos de seguridad en el sistema de acceso universitario. Incluye opciones para configurar cursos, profesores, aulas y horarios, exportando el resultado final en un formato visual idéntico al oficial.",
      period: "2024 (julio)",
      technologies: ["HTML", "CSS", "JavaScript", "Canvas API"],
      image: "/images/matricula_upc.png", // Usa una imagen existente como fallback
      icon: <Code className="text-blue-500 mr-2" size={18} />,
      links: {
        live: "https://stefware-upc-horarios.netlify.app/"
      }
    }
  ] : [
    {
      title: "Listify MP3 Downloader",
      description: "Python program that automates the search and download of songs from YouTube based on a list in TXT format. It uses APIs for efficient searching and conversion tools to obtain high-quality MP3 files.",
      period: "2024 (February)",
      technologies: ["Python", "YouTube API", "FFmpeg", "Requests"],
      image: "/images/chat_app_platform.png",
      icon: <Terminal className="text-yellow-500 mr-2" size={18} />,
      links: {
        github: "https://github.com/stxfxno/Listify"
      }
    },
    {
      title: "Mobile ID Cards Simulator",
      description: "Mobile application that simulates the generation of university ID Cards to demonstrate vulnerabilities in authentication systems. It allows customization of data, QR codes, and photographs to create virtual credentials for educational purposes on security.",
      period: "2024 (October-November)",
      technologies: ["Android Studio", "Kotlin", "XML", "ZXing"],
      image: "/images/manage_wise.png",
      icon: <Code className="text-green-500 mr-2" size={18} />,
      links: {
        resources: "https://drive.google.com/drive/folders/17J6zYYErU9Eb1igGqsxbPsz09T2Pio_R?usp=sharing"
      }
    },
    {
      title: "False Schedule Generator",
      description: "Tool to demonstrate security flaws in the university access system. Includes options to configure courses, professors, classrooms, and schedules, exporting the final result in a visual format identical to the official one.",
      period: "2024 (July)",
      technologies: ["HTML", "CSS", "JavaScript", "Canvas API"],
      image: "/images/matricula_upc.png",
      icon: <Code className="text-blue-500 mr-2" size={18} />,
      links: {
        live: "https://stefware-upc-horarios.netlify.app/"
      }
    }
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('moreprojects.title')}</h2>
              
              <Link 
                to="/" 
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span className="mr-2">←</span>
                {t('back.to.home')}
              </Link>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-3xl">
              {t('moreprojects.description')}
            </p>
            
            <div className="space-y-8">
              {additionalProjects.map((project, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Imagen a la izquierda - ahora más grande (2/5 del ancho) */}
                    <div className="relative md:w-2/5">
                      <img
                        src={project.image}
                        alt={`Captura de ${project.title}`}
                        className="w-full h-72 md:h-80 object-cover object-center"
                      />
                      <div className="absolute left-4 bottom-4 bg-black/50 text-white px-3 py-1 rounded-full flex items-center text-sm">
                        <Calendar size={14} className="mr-2" />
                        {project.period}
                      </div>
                    </div>
                    
                    {/* Contenido a la derecha */}
                    <div className="p-6 md:w-3/5">
                      <div className="flex items-center mb-3">
                        {project.icon}
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-3 mt-6">
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
                          >
                            <ExternalLink size={16} />
                            {t('projects.demo')}
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-gray-800 dark:bg-gray-700 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                          >
                            <Github size={16} />
                            {t('projects.repository')}
                          </a>
                        )}
                        {project.links.resources && (
                          <a
                            href={project.links.resources}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors"
                          >
                            <ExternalLink size={16} />
                            {t('projects.resources')}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default MoreProjects;