import { Code, ExternalLink, Github, Calendar, Terminal, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import Navbar from './Navbar';
import Footer from './Footer';
import Reveal from './Reveal';
import CosmicBackground from './CosmicBackground';
import { useLanguage } from '../context/LanguageContext';

const MoreProjects = () => {
  const { t, language } = useLanguage();

  // Proyectos con contenido condicional según el idioma
  const additionalProjects = language === 'es' ? [
    {
      title: "Wko Negocios",
      description: "Landing page para WKO Negocios, empresa peruana que conecta a sus clientes con las mejores soluciones de conectividad: planes de internet de alta velocidad y dispositivos móviles de última generación.",
      period: "2026 (marzo)",
      technologies: ["React", "TypeScript", "Tailwind"],
      image: "/images/wkonegocios_web.webp",
      icon: <Code className="text-orchid-300 mr-3 shrink-0" size={20} />,
      viewnow: true,
      links: {
        live: "https://wko-negocios-landing.vercel.app/"
      }
    },
    {
      title: "Chat Platform",
      description: "Aplicación web full-stack con sistema completo de mensajería en tiempo real entre usuarios, soportando interfaces intuitivas para la comunicación instantánea y gestión de contactos.",
      period: "2025 (febrero)",
      technologies: ["React", "NestJS", "Supabase", "TypeScript", "WebSockets"],
      image: "/images/chat_app_platform.webp",
      icon: <Code className="text-orchid-300 mr-3 shrink-0" size={20} />,
      inactive: true,
      links: {
        live: "https://chat-platform-stefdev.netlify.app/login",
        github: "https://github.com/stxfxno/chat-platform"
      }
    },
    {
      title: "Simulador de Bonos Financieros",
      description: "Plataforma para gestionar bonos corporativos.\n\nAcceso de prueba:\n  · Usuario:  20123456789   ·  Contraseña: demo123\n  · Admin:    20100123456   ·  Contraseña: admin123",
      period: "2025 (marzo)",
      technologies: ["React", "Typescript", "Tailwind"],
      image: "/images/grupo6.webp",
      icon: <Code className="text-orchid-300 mr-3 shrink-0" size={20} />,
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
      icon: <Code className="text-orchid-300 mr-3 shrink-0" size={20} />,
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
      icon: <Code className="text-orchid-300 mr-3 shrink-0" size={20} />,
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
      icon: <Code className="text-orchid-300 mr-3 shrink-0" size={20} />,
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
      icon: <Terminal className="text-azure-300 mr-3 shrink-0" size={20} />,
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
      icon: <Code className="text-orchid-300 mr-3 shrink-0" size={20} />,
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
      icon: <Code className="text-orchid-300 mr-3 shrink-0" size={20} />,
      viewnow: true,
      links: {
        live: "https://stefware-upc-horarios.netlify.app/"
      }
    }
  ] : [
    {
      title: "Wko Negocios",
      description: "Landing page for WKO Negocios, a Peruvian company connecting customers with the best connectivity solutions: high-speed internet plans and the latest mobile devices.",
      period: "2026 (March)",
      technologies: ["React", "TypeScript", "Tailwind"],
      image: "/images/wkonegocios_web.webp",
      icon: <Code className="text-orchid-300 mr-3 shrink-0" size={20} />,
      viewnow: true,
      links: {
        live: "https://wko-negocios-landing.vercel.app/"
      }
    },
    {
      title: "Chat Platform",
      description: "Full-stack web application with a complete real-time messaging system between users, supporting intuitive interfaces for instant communication and contact management.",
      period: "2025 (February)",
      technologies: ["React", "NestJS", "Supabase", "TypeScript", "WebSockets"],
      image: "/images/chat_app_platform.webp",
      icon: <Code className="text-orchid-300 mr-3 shrink-0" size={20} />,
      inactive: true,
      links: {
        live: "https://chat-platform-stefdev.netlify.app/login",
        github: "https://github.com/stxfxno/chat-platform"
      }
    },
    {
      title: "Financial Bonds Simulator",
      description: "Platform for managing corporate bonds.\n\nTest credentials:\n  · User:   20123456789   ·  Password: demo123\n  · Admin:  20100123456   ·  Password: admin123",
      period: "2025 (March)",
      technologies: ["React", "Typescript", "Tailwind"],
      image: "/images/grupo6.webp",
      icon: <Code className="text-orchid-300 mr-3 shrink-0" size={20} />,
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
      icon: <Code className="text-orchid-300 mr-3 shrink-0" size={20} />,
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
      icon: <Code className="text-orchid-300 mr-3 shrink-0" size={20} />,
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
      icon: <Code className="text-orchid-300 mr-3 shrink-0" size={20} />,
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
      icon: <Code className="text-orchid-300 mr-3 shrink-0" size={20} />,
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
      icon: <Terminal className="text-azure-300 mr-3 shrink-0" size={20} />,
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
      icon: <Code className="text-orchid-300 mr-3 shrink-0" size={20} />,
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
      icon: <Code className="text-orchid-300 mr-3 shrink-0" size={20} />,
      viewnow: true,
      links: {
        live: "https://stefware-upc-horarios.netlify.app/"
      }
    }
  ];

  return (
    <div className="relative bg-void text-white min-h-screen overflow-x-clip">
      <CosmicBackground />
      <div className="relative z-10">
        <Navbar />
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-end mb-6">
              <Link to="/" className="label-wide flex items-center text-orchid-100 hover:text-azure-300 transition-colors">
                <span className="mr-2">←</span>
                {t('back.to.home')}
              </Link>
            </div>

            <SectionTitle
              title={t('moreprojects.title')}
              subtitle={t('moreprojects.description')}
            />

            <div className="space-y-10">
              {additionalProjects.map((project, index) => (
                <Reveal key={index}>
                  <div className="glass-card group overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative md:w-2/5 overflow-hidden md:rounded-l-[1.25rem] rounded-t-[1.25rem] md:rounded-tr-none">
                        <img
                          src={project.image}
                          alt={`Captura de ${project.title}`}
                          loading="lazy"
                          className="w-full h-72 md:h-full md:min-h-[20rem] object-cover object-center transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-void/80 to-transparent" />
                        <div className="absolute left-4 bottom-4 px-3 py-1.5 rounded-full bg-void/70 border border-orchid-400/30 flex items-center gap-2 text-orchid-100">
                          <Calendar size={13} />
                          <span className="label-wide">{project.period}</span>
                        </div>
                      </div>

                      <div className="p-7 md:w-3/5">
                        <div className="flex items-start justify-between mb-4 gap-3">
                          <div className="flex items-center">
                            {project.icon}
                            <h3 className="font-serif text-2xl font-bold tracking-wider text-white">{project.title}</h3>
                          </div>
                          {project.inactive && (
                            <span className="label-wide inline-flex items-center gap-1.5 shrink-0 px-3 py-1 rounded-full bg-white/5 text-white/70 border border-white/20">
                              <AlertCircle size={12} />
                              {language === 'es' ? 'Inactivo · Costos de producción' : 'Inactive · Production costs'}
                            </span>
                          )}
                        </div>

                        <p className="text-orchid-50/70 font-light leading-relaxed mb-5 whitespace-pre-line">{project.description}</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="chip">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-3">
                          {project.links.live && (
                            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="btn-glow !px-5 !py-2.5">
                              <ExternalLink size={14} />
                              {project.viewnow ? t('projects.viewnow') : t('projects.demo')}
                            </a>
                          )}
                          {project.links.github && (
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-5 !py-2.5">
                              <Github size={14} />
                              {t('projects.repository')}
                            </a>
                          )}
                          {project.links.resources && (
                            <a href={project.links.resources} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-5 !py-2.5">
                              <ExternalLink size={14} />
                              {t('projects.resources')}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
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
