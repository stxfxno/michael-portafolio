import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import Navbar from './Navbar';
import Footer from './Footer';
import Reveal from './Reveal';
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
      viewnow: true,
      links: {
        live: "https://stefware-upc-horarios.netlify.app/"
      }
    }
  ];

  return (
    <div className="relative bg-ink text-paper min-h-screen overflow-x-clip">
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Link to="/" className="link-arrow mb-12">
            ← {t('back.to.home')}
          </Link>

          <div className="mt-10">
            <SectionTitle
              number="+"
              title={language === 'es' ? 'Otros|pro|yectos' : 'More|pro|jects'}
              subtitle={t('moreprojects.description')}
            />
          </div>

          <div className="border-b border-paper/20">
            {additionalProjects.map((project, index) => (
              <Reveal key={index}>
                <article className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-12 border-t border-paper/20">
                  <div className="lg:col-span-5 relative">
                    <div className="aspect-[16/10] overflow-hidden border border-paper/15">
                      <img
                        src={project.image}
                        alt={`Captura de ${project.title}`}
                        loading="lazy"
                        className="photo w-full h-full object-cover group-hover:scale-105"
                      />
                    </div>
                    <span className="absolute -top-4 left-3 tag bg-paper text-ink px-2 py-1">{project.period}</span>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="flex flex-wrap items-start gap-4 mb-4">
                      <span className="font-display text-5xl leading-none outline-violet group-hover:text-violet transition-colors">
                        {String(index + 1).padStart(2, '0')}.
                      </span>
                      <h3 className="flex-1 font-display uppercase text-4xl leading-[0.95]">{project.title}</h3>
                      {project.inactive && (
                        <span className="tag border border-paper/40 px-2 py-1">
                          {language === 'es' ? 'Inactivo · Costos de producción' : 'Inactive · Production costs'}
                        </span>
                      )}
                    </div>

                    <p className="text-paper/70 leading-relaxed mb-5 whitespace-pre-line">{project.description}</p>
                    <p className="tag text-paper/50 mb-6">{project.technologies.join('  /  ')}</p>

                    <div className="flex flex-wrap gap-6">
                      {project.links.live && (
                        <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="link-arrow">
                          {project.viewnow ? t('projects.viewnow') : t('projects.demo')} <ArrowUpRight size={14} />
                        </a>
                      )}
                      {project.links.github && (
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="link-arrow">
                          {t('projects.repository')} <ArrowUpRight size={14} />
                        </a>
                      )}
                      {project.links.resources && (
                        <a href={project.links.resources} target="_blank" rel="noopener noreferrer" className="link-arrow">
                          {t('projects.resources')} <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MoreProjects;
