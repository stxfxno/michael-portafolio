import { Code, ExternalLink, Github, Terminal, Calendar, Monitor, Cpu, FileCode } from 'lucide-react';
import GitHubCard from './GitHubCard';

interface Project {
  title: string;
  description: string;
  period: string;
  technologies: string[];
  primaryLanguage?: string;
  links: {
    live?: string;
    github?: string;
    figma?: string;
    resources?: string;
  };
  featured?: boolean;
  stars?: number;
  forks?: number;
  watchCount?: number;
}

const ProjectCard = ({ project }: { project: Project }) => {
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
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center mb-2">
            {getProjectIcon()}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white ml-2">{project.title}</h3>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar size={14} className="mr-1" />
            <span>{project.period}</span>
          </div>
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
              Demo
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
              Repositorio
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
              Figma
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
              Recursos
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const featuredProjects: Project[] = [
    {
      title: "Chat-Platform",
      description: "Aplicación web full-stack con sistema completo de mensajería en tiempo real entre usuarios registrados.",
      period: "2025 (marzo)",
      technologies: ["React", "NestJS", "Supabase", "TypeScript"],
      primaryLanguage: "TypeScript",
      links: {
        live: "https://chat-platform-stefdev.netlify.app/login"
      },
      featured: true,
      stars: 8,
      forks: 2,
      watchCount: 5
    },
    {
      title: "Una distancia corta",
      description: "Aplicación web para parejas o amigos a distancia que permite compartir imágenes con ubicación y fecha en un mapa global.",
      period: "2025 (enero-febrero)",
      technologies: ["HTML", "CSS", "JS", "Firebase", "Figma"],
      primaryLanguage: "JavaScript",
      links: {
        live: "https://unadistanciacorta.netlify.app/"
      },
      featured: true,
      stars: 5,
      forks: 1,
      watchCount: 3
    }
  ];

  const projects: Project[] = [
    {
      title: "App Móvil simulador de ID Cards",
      description: "Aplicación móvil que simula la generación de ID Cards universitarias para evidenciar vulnerabilidades en sistemas de autenticación.",
      period: "2024 (octubre-noviembre)",
      technologies: ["Android Studio", "Kotlin", "XML"],
      primaryLanguage: "Kotlin",
      links: {
        resources: "https://drive.google.com/drive/folders/17J6zYYErU9Eb1igGqsxbPsz09T2Pio_R?usp=sharing"
      }
    },
    {
      title: "Generador de Horarios Falsos",
      description: "Herramienta para evidenciar fallos de seguridad en el sistema de acceso universitario, donde se pueden generar horarios falsos.",
      period: "2024 (julio)",
      technologies: ["HTML", "CSS", "JS"],
      primaryLanguage: "JavaScript",
      links: {
        live: "https://stefware-upc-horarios.netlify.app/"
      }
    },
    {
      title: "Backend para página web de eventos",
      description: "Backend con endpoints RESTful para una página web de eventos. Proyecto universitario donde fui coordinador de equipo.",
      period: "2024 (abril-junio)",
      technologies: ["Java", "Postman", "MySQL", "IntelliJ IDEA"],
      primaryLanguage: "Java",
      links: {
        github: "https://github.com/stxfxno/BackendOS_user/tree/main/MyEvent",
        live: "https://michael-carmelino-web.netlify.app/proyectos/myevent/"
      }
    },
    {
      title: "Listify MP3 Downloader",
      description: "Programa en Python que automatiza la búsqueda y descarga de canciones desde YouTube a partir de una lista en formato TXT.",
      period: "2024 (febrero)",
      technologies: ["Python", "Visual Studio Code"],
      primaryLanguage: "Python",
      links: {
        github: "https://github.com/stxfxno/Listify"
      }
    },
    {
      title: "Make Money Rain",
      description: "Interfaz visual para una aplicación web de administración de gastos y tarjetas. Primer proyecto universitario con HTML/CSS.",
      period: "2023 (octubre-noviembre)",
      technologies: ["HTML", "CSS", "Visual Studio Code", "Figma"],
      primaryLanguage: "HTML",
      links: {
        figma: "https://www.figma.com/design/UuJgjYxl8iLIb3NZphUiHk/Make-Money-Earn?node-id=0-1&t=cQ4lCNcJgLLotLxT-1",
        live: "https://michael-carmelino-web.netlify.app/proyectos/ihc-lading-pagemain/web3/infogeneral/infogeneral"
      }
    }
  ];

  return (
    <section id="projects" className="py-16 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Proyectos
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
            <span className="text-blue-600 dark:text-blue-400">git push</span>
            <span className="text-gray-800 dark:text-gray-200"> origin </span>
            <span className="text-green-600 dark:text-green-400">portfolio-projects</span>
          </span>
        </p>
        
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Terminal size={24} className="mr-2 text-blue-600 dark:text-blue-400" />
            Proyectos Destacados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <GitHubCard 
                key={project.title} 
                project={{
                  title: project.title,
                  description: project.description,
                  language: project.primaryLanguage,
                  stars: project.stars,
                  forks: project.forks,
                  watchCount: project.watchCount,
                  lastUpdated: project.period,
                  repoUrl: project.links.github || project.links.live
                }}
              />
            ))}
          </div>
        </div>
        
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Code size={24} className="mr-2 text-blue-600 dark:text-blue-400" />
          Otros Proyectos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a 
            href="https://github.com/stxfxno" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200 shadow-md"
          >
            <Github size={20} className="mr-2" />
            Ver más en GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;