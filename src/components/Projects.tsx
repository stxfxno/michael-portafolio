import { Code, ExternalLink, Github, Terminal, Calendar, Monitor, Cpu, FileCode } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Project {
  title: string;
  description: string;
  period: string;
  technologies: string[];
  primaryLanguage?: string;
  image: string;
  links: {
    live?: string;
    github?: string;
    figma?: string;
    resources?: string;
  };
}

const ProjectCard = ({ project }: { project: Project }) => {
  const { t } = useLanguage();

  // Get icon based on technologies
  const getProjectIcon = () => {
    if (project.technologies.includes('Android Studio') || project.technologies.includes('Kotlin')) {
      return <Monitor size={20} className="text-green-600 dark:text-green-400" />;
    } else if (project.technologies.includes('React') || project.technologies.includes('Angular')) {
      return <Code size={20} className="text-blue-600 dark:text-blue-400" />;
    } else if (project.technologies.includes('Python')) {
      return <Terminal size={20} className="text-yellow-600 dark:text-yellow-400" />;
    } else if (project.technologies.includes('Java')) {
      return <Cpu size={20} className="text-red-600 dark:text-red-400" />;
    } else {
      return <FileCode size={20} className="text-purple-600 dark:text-purple-400" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
      <div className="relative h-50 overflow-hidden">
        <img
          src={project.image}
          alt={`Captura de ${project.title}`}
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center text-sm text-white">
            <Calendar size={14} className="mr-1" />
            <span>{project.period}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center mb-2">
          {getProjectIcon()}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white ml-2">{project.title}</h3>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs border border-gray-200 dark:border-gray-600"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
            >
              <ExternalLink size={14} />
              {t('projects.demo')}
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <Github size={14} />
              {t('projects.repository')}
            </a>
          )}
          {project.links.figma && (
            <a
              href={project.links.figma}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-md hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors duration-200"
            >
              <Code size={14} />
              {t('projects.figma')}
            </a>
          )}
          {project.links.resources && (
            <a
              href={project.links.resources}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md hover:bg-green-200 dark:hover:bg-green-800 transition-colors duration-200"
            >
              <ExternalLink size={14} />
              {t('projects.resources')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { t, language } = useLanguage();
  
  // Datos de proyectos con traducción condicional
  const projects = language === 'es' ? [
    {
      title: "Chat Platform",
      description: "Aplicación web full-stack con sistema completo de mensajería en tiempo real entre usuarios, soportando interfaces intuitivas para la comunicación instantánea y gestión de contactos.",
      period: "2025 (febrero)",
      technologies: ["React", "NestJS", "Supabase", "TypeScript", "WebSockets"],
      primaryLanguage: "TypeScript",
      image: "/images/chat_app_platform.png",
      links: {
        live: "https://chat-platform-stefdev.netlify.app/login",
        github: "https://github.com/stxfxno/chat-platform"
      }
    },
    {
      title: "Manage Wise",
      description: "Plataforma para la gestión y optimización de proyectos de desarrollo de software, con funcionalidades para coordinar equipos, visualizar sprints y monitorear el progreso en tiempo real.",
      period: "2024 (septiembre)",
      technologies: ["HTML", "CSS", "JavaScript", "Figma"],
      primaryLanguage: "JavaScript",
      image: "/images/manage_wise.png",
      links: {
        live: "https://manage-wise.netlify.app/",
        github: "https://github.com/DisenoDeExperimentos-4436-Grupo3/landing-page"
      }
    },
    {
      title: "Una Distancia Corta",
      description: "Actualmente en desarrollo para V2. Aplicación web para parejas o amigos a distancia que permite compartir imágenes con ubicación y fecha en un mapa global, facilitando la conexión entre personas en diferentes partes del mundo.",
      period: "2025 (enero-febrero)",
      technologies: ["HTML", "CSS", "JavaScript", "Firebase", "Mi novia"],
      primaryLanguage: "JavaScript",
      image: "/images/una_distancia_corta.png",
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
      primaryLanguage: "JavaScript",
      image: "/images/matricula_upc.png",
      links: {
        live: "https://matricula-upc-stefdev.netlify.app/",
        github: "https://github.com/stxfxno/matricula_upc"
      }
    }
  ] : [
    {
      title: "Chat Platform",
      description: "Full-stack web application with a complete real-time messaging system between users, supporting intuitive interfaces for instant communication and contact management.",
      period: "2025 (February)",
      technologies: ["React", "NestJS", "Supabase", "TypeScript", "WebSockets"],
      primaryLanguage: "TypeScript",
      image: "/images/chat_app_platform.png",
      links: {
        live: "https://chat-platform-stefdev.netlify.app/login",
        github: "https://github.com/stxfxno/chat-platform"
      }
    },
    {
      title: "Manage Wise",
      description: "Platform for managing and optimizing software development projects, with features for team coordination, sprint visualization, and real-time progress monitoring.",
      period: "2024 (September)",
      technologies: ["HTML", "CSS", "JavaScript", "Figma"],
      primaryLanguage: "JavaScript",
      image: "/images/manage_wise.png",
      links: {
        live: "https://manage-wise.netlify.app/",
        github: "https://github.com/DisenoDeExperimentos-4436-Grupo3/landing-page"
      }
    },
    {
      title: "A Short Distance",
      description: "Currently under development for V2. Web application for long-distance couples or friends that allows sharing images with location and date on a global map, facilitating connection between people in different parts of the world.",
      period: "2025 (January-February)",
      technologies: ["HTML", "CSS", "JavaScript", "Firebase", "My girlfriend"],
      primaryLanguage: "JavaScript",
      image: "/images/una_distancia_corta.png",
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
      primaryLanguage: "JavaScript",
      image: "/images/matricula_upc.png",
      links: {
        live: "https://matricula-upc-stefdev.netlify.app/",
        github: "https://github.com/stxfxno/matricula_upc"
      }
    }
  ];

  return (
    <section id="projects" className="py-16 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          {t('projects.title')}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
            <span className="text-blue-600 dark:text-blue-400">git push</span>
            <span className="text-gray-800 dark:text-gray-200"> origin </span>
            <span className="text-green-600 dark:text-green-400">portfolio-projects</span>
          </span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className="text-center mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://github.com/stxfxno"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#1a1f2e] text-white rounded-lg hover:bg-[#242a3d] transition-colors duration-200 shadow-md"
          >
            <Github size={20} className="mr-2" />
            {t('projects.see.github')}
          </a>

          <a
            href="/more-projects"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
          >
            <Code size={20} className="mr-2" />
            {t('projects.see.more')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;