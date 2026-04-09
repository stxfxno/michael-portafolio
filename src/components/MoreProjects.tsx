import { Code, ExternalLink, Github, Calendar, Terminal, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
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
      title: "Chat Platform",
      description: "Aplicación web full-stack con sistema completo de mensajería en tiempo real entre usuarios, soportando interfaces intuitivas para la comunicación instantánea y gestión de contactos.",
      period: "2025 (febrero)",
      technologies: ["React", "NestJS", "Supabase", "TypeScript", "WebSockets"],
      image: "/images/chat_app_platform.webp",
      icon: <Code className="text-blue-500 mr-2" size={18} />,
      inactive: true,
      links: {
        live: "https://chat-platform-stefdev.netlify.app/login",
        github: "https://github.com/stxfxno/chat-platform"
      }
    },
    {
      title: "Simulador de Bonos Financieros",
      description: "Plataforma para gestionar bonos corporativos. Usuario de prueba: 20123456789, Contraseña: demo123, Admin: 20100123456, Contraseña: admin123",
      period: "2025 (marzo)",
      technologies: ["React", "Typescript", "Tailwind"],
      image: "/images/grupo6.webp",
      icon: <Code className="text-blue-500 mr-2" size={18} />,
      links: {
        live: "https://metodo-frances-grupo6.netlify.app/login",
        github: "https://github.com/stxfxno/grupo-6-finanzas"
      }
    },
    {
      title: "Una Distancia Corta",
      description: "Actualmente en desarrollo para V2. Aplicación web para parejas o amigos a distancia que permite compartir imágenes con ubicación y fecha en un mapa global, facilitando la conexión entre personas en diferentes partes del mundo.",
      period: "2025 (enero-febrero)",
      technologies: ["HTML", "CSS", "JavaScript", "Firebase", "Mi novia"],
      inactive: true,
      image: "/images/una_distancia_corta.webp",
      icon: <Code className="text-purple-500 mr-2" size={18} />,
      links: {
        live: "https://unadistanciacorta.netlify.app/",
        github: "https://github.com/stxfxno/una-distancia-corta"
      }
    },
    {
      title: "Sistema de Matrícula UPC",
      description: "Una nueva versión que simula la matrícula de la Universidad Peruana de Ciencias Aplicadas, con un diseño moderno y una interfaz intuitiva para facilitar el proceso de inscripción.",
      period: "2024 (agosto-septiembre)",
      technologies: ["React", "Tailwind", "Typescript", "Vite"],
      image: "/images/matricula_upc.webp",
      icon: <Code className="text-blue-500 mr-2" size={18} />,
      viewnow: true,
      links: {
        live: "https://matricula-upc-stefdev.netlify.app/",
        github: "https://github.com/stxfxno/matricula_upc"
      }
    },
    {
      title: "AquaConecta",
      description: "Landing page para una empresa de servcios de control de uso del agua. Incluye un diseño atractivo y funcional, optimizado para SEO y con integración de formularios de contacto.",
      period: "2025 (abril)",
      technologies: ["HTML", "CSS", "JS", "Figma"],
      image: "/images/aqua_conecta.webp", // Usa una imagen existente como fallback
      icon: <Code className="text-yellow-500 mr-2" size={18} />,
      links: {
        live:"https://aquaconecta.netlify.app/",
        github: "https://github.com/stxfxno/Listify"
      }
    },
    {
      title: "Manage Wise",
      description: "Plataforma para la gestión y optimización de proyectos de desarrollo de software, con funcionalidades para coordinar equipos, visualizar sprints y monitorear el progreso en tiempo real.",
      period: "2024 (septiembre)",
      technologies: ["HTML", "CSS", "JavaScript", "Figma"],
      primaryLanguage: "JavaScript",
      image: "/images/manage_wise.webp",
      links: {
        live: "https://manage-wise.netlify.app/",
        github: "https://github.com/DisenoDeExperimentos-4436-Grupo3/landing-page"
      }
    },
    {
      title: "Listify MP3 Downloader",
      description: "Listify es un programa en Python que te permite descargar las cancioens de quieras de tus playlist de Spotify, incluso todo un album o playlist completa. Solo necesitas el enlace o buscarlo entre las opciones de búsqueda.",
      period: "2024 (febrero)",
      technologies: ["Python", "YouTube API", "FFmpeg", "Requests"],
      image: "/images/listify.webp", // Usa una imagen existente como fallback
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
      image: "/images/tiu_fake_v1.webp", // Usa una imagen existente como fallback
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
      image: "/images/generador_horarios.webp",
      icon: <Code className="text-blue-500 mr-2" size={18} />,
      viewnow: true,
      links: {
        live: "https://stefware-upc-horarios.netlify.app/"
      }
    }
  ] : [
    {
      title: "Chat Platform",
      description: "Full-stack web application with a complete real-time messaging system between users, supporting intuitive interfaces for instant communication and contact management.",
      period: "2025 (February)",
      technologies: ["React", "NestJS", "Supabase", "TypeScript", "WebSockets"],
      image: "/images/chat_app_platform.webp",
      icon: <Code className="text-blue-500 mr-2" size={18} />,
      inactive: true,
      links: {
        live: "https://chat-platform-stefdev.netlify.app/login",
        github: "https://github.com/stxfxno/chat-platform"
      }
    },
    {
      title: "Financial Bonds Simulator",
      description: "Platform for managing corporate bonds. Test user: 20123456789, Password: demo123, Admin: 20100123456, Password: admin123",
      period: "2025 (March)",
      technologies: ["React", "Typescript", "Tailwind"],
      image: "/images/grupo6.webp",
      icon: <Code className="text-blue-500 mr-2" size={18} />,
      links: {
        live: "https://metodo-frances-grupo6.netlify.app/login",
        github: "https://github.com/stxfxno/grupo-6-finanzas"
      }
    },
    {
      title: "A Short Distance",
      description: "Currently under development for V2. Web application for long-distance couples or friends that allows sharing images with location and date on a global map, facilitating connection between people in different parts of the world.",
      period: "2025 (January-February)",
      technologies: ["HTML", "CSS", "JavaScript", "Firebase", "My girlfriend"],
      inactive: true,
      image: "/images/una_distancia_corta.webp",
      icon: <Code className="text-purple-500 mr-2" size={18} />,
      links: {
        live: "https://unadistanciacorta.netlify.app/",
        github: "https://github.com/stxfxno/una-distancia-corta"
      }
    },
    {
      title: "UPC Enrollment System",
      description: "A new version that simulates the enrollment of Universidad Peruana de Ciencias Aplicadas, with a modern design and an intuitive interface to facilitate the registration process.",
      period: "2024 (August-September)",
      technologies: ["React", "Tailwind", "Typescript", "Vite"],
      image: "/images/matricula_upc.webp",
      icon: <Code className="text-blue-500 mr-2" size={18} />,
      viewnow: true,
      links: {
        live: "https://matricula-upc-stefdev.netlify.app/",
        github: "https://github.com/stxfxno/matricula_upc"
      }
    },
    {
      title: "AquaConecta",
      description: "Landing page for a water usage control services company. It features an attractive and functional design, optimized for SEO and integrated contact forms.",
      period: "2025 (April)",
      technologies: ["HTML", "CSS", "JS", "Figma"],
      image: "/images/aqua_conecta.webp", // Usa una imagen existente como fallback
      icon: <Code className="text-yellow-500 mr-2" size={18} />,
      links: {
        live:"https://aquaconecta.netlify.app/",
        github: "https://github.com/stxfxno/Listify"
      }
    },
    {
      title: "Manage Wise",
      description: "Platform for managing and optimizing software development projects, with features for team coordination, sprint visualization, and real-time progress monitoring.",
      period: "2024 (September)",
      technologies: ["HTML", "CSS", "JavaScript", "Figma"],
      primaryLanguage: "JavaScript",
      image: "/images/manage_wise.webp",
      icon: <Code className="text-blue-500 mr-2" size={18} />,
      links: {
        live: "https://manage-wise.netlify.app/",
        github: "https://github.com/DisenoDeExperimentos-4436-Grupo3/landing-page"
      }
    },
    {
      title: "Listify MP3 Downloader",
      description: "Python program that automates the search and download of songs from YouTube based on a list in TXT format. It uses APIs for efficient searching and conversion tools to obtain high-quality MP3 files.",
      period: "2024 (February)",
      technologies: ["Python", "YouTube API", "FFmpeg", "Requests"],
      image: "/images/listify.webp",
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
      image: "/images/tiu_fake_v1.webp",
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
      image: "/images/generador_horarios.webp",
      icon: <Code className="text-blue-500 mr-2" size={18} />,
      viewnow: true,
      links: {
        live: "https://stefware-upc-horarios.netlify.app/"
      }
    }
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="bg-light-bg dark:bg-gray-900 text-light-text dark:text-white min-h-screen">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-end mb-2">
              <Link
                to="/"
                className="flex items-center text-light-text-secondary dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
              >
                <span className="mr-2">←</span>
                {t('back.to.home')}
              </Link>
            </div>

            <SectionTitle
              title={t('moreprojects.title')}
              subtitle={t('moreprojects.description')}
            />
            
            <div className="space-y-8">
              {additionalProjects.map((project, index) => (
                <div
                  key={index}
                  className="bg-light-card dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-light-border dark:border-gray-700"
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
                      <div className="flex items-start justify-between mb-3 gap-3">
                        <div className="flex items-center">
                          {project.icon}
                          <h3 className="text-xl font-semibold text-light-text dark:text-white">{project.title}</h3>
                        </div>
                        {project.inactive && (
                          <span className="inline-flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-700">
                            <AlertCircle size={12} />
                            {language === 'es' ? 'Inactivo · Costos de producción' : 'Inactive · Production costs'}
                          </span>
                        )}
                      </div>

                      <p className="text-light-text-secondary dark:text-gray-300 mb-4">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-light-text-secondary dark:text-gray-200 rounded-full text-xs border border-gray-200 dark:border-gray-600"
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
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors shadow-sm"
                          >
                            <ExternalLink size={16} />
                            {project.viewnow ? t('projects.viewnow') : t('projects.demo')}
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-gray-700 dark:bg-gray-700 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors shadow-sm"
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
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors shadow-sm"
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