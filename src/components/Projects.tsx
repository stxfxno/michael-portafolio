import { Code, ExternalLink, Github, Terminal, Calendar, Monitor, Cpu, FileCode } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { useLanguage } from '../context/LanguageContext';

interface Project {
  title: string;
  description: string;
  period: string;
  technologies: string[];
  primaryLanguage?: string;
  image: string;
  viewnow?: boolean;
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
    <div className="bg-light-card dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-light-border dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
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
          <h3 className="text-xl font-semibold text-light-text dark:text-white ml-2">{project.title}</h3>
        </div>

        <p className="text-light-text-secondary dark:text-gray-300 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-gray-50 dark:bg-gray-700 text-light-text-secondary dark:text-gray-200 rounded text-xs border border-light-border dark:border-gray-600"
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
              className="flex items-center gap-1 text-sm px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-md hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors duration-200 border border-blue-100 dark:border-blue-800"
            >
              <ExternalLink size={14} />
              {project.viewnow ? t('projects.viewnow') : t('projects.demo')}
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm px-3 py-1 bg-gray-50 dark:bg-gray-700 text-light-text-secondary dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 border border-light-border dark:border-gray-600"
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
              className="flex items-center gap-1 text-sm px-3 py-1 bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-md hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors duration-200 border border-purple-100 dark:border-purple-800"
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
              className="flex items-center gap-1 text-sm px-3 py-1 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-md hover:bg-green-100 dark:hover:bg-green-800 transition-colors duration-200 border border-green-100 dark:border-green-800"
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
      title: "Gestión Documental BIM",
      description: "Plataforma web para equipos de construcción que centraliza el flujo de aprobación de archivos técnicos (planos, modelos, documentos). Ciclo de vida de 5 etapas con control de acceso por roles especializados (Coordinador BIM, Aprobador, Residente de obra). Modo offline-first con sincronización automática vía IndexedDB.",
      period: "Abril 2026",
      technologies: ["React", "TypeScript", "Tailwind", "Supabase", "IndexedDB"],
      image: "/images/gestion_documental.webp",
      links: {}
    },
    {
      title: "Sprinta AI",
      description: "Plataforma web con agente de IA para ventas por WhatsApp. Permite a emprendedores y negocios automatizar respuestas a leads, gestionarlos desde un CRM integrado y optimizar su proceso de ventas de forma inteligente.",
      period: "Marzo 2026",
      technologies: ["React", "TypeScript", "Tailwind", "Supabase"],
      image: "/images/sprinta.png",
      viewnow: true,
      links: {
        live: "https://sprinta.ai/landing"
      }
    },
    {
      title: "Eemerson Sac Web",
      description: "Página web corporativa para Eemerson SAC, empresa de transporte especializada en el traslado de todo tipo de contenedores, con más de 15 años de trayectoria en el sector logístico peruano.",
      period: "Octubre 2025",
      technologies: ["React", "TypeScript", "Tailwind"],
      image: "/images/eemersonsac_web.webp",
      viewnow: true,
      links: {
        live: "https://eemersonsac.com/"
      }
    },
    {
      title: "PayBox — Eemerson SAC",
      description: "Plataforma web de gestión operativa para empresa de transporte de carga. Centraliza pagos a conductores (exportable a Excel), flota GPS vía Navitel, integración SUNAT OAuth para GRE, alertas de vencimientos sincronizadas con Odoo ERP, y un portal móvil-first para conductores con OCR y registro de gastos.",
      period: "Nov 2025 - Feb 2026",
      technologies: ["Next.js 14", "TypeScript", "Supabase", "Tailwind", "shadcn/ui"],
      image: "/images/eemersonsac_plataforma.webp",
      links: {}
    },
    {
      title: "Renaceris Web",
      description: "Página web para una clínica de estética y salud con 3 sedes en Perú (Lima, Huánuco y Pucallpa). Presenta tratamientos especializados como rinoplastia, lipoescultura y más, con un diseño moderno y elegante.",
      period: "Febrero 2026",
      technologies: ["React", "TypeScript", "Tailwind"],
      image: "/images/renaceris_web.png",
      viewnow: true,
      links: {
        live: "https://www.renaceris.com/"
      }
    },
    {
      title: "Renaceris Plataforma",
      description: "Plataforma para la gestión de citas médicas de Renaceris, con roles diferenciados para recepcionistas y médicos, facilitando el control y seguimiento de pacientes en las 3 sedes.",
      period: "Ene - Abr 2026",
      technologies: ["React", "NestJS", "TypeScript", "Tailwind", "Supabase"],
      image: "/images/renaceris_plataforma.webp",
      links: {}
    },
  ] : [
    {
      title: "BIM Document Management",
      description: "Web platform for construction teams that centralizes the approval workflow for technical files (plans, models, documents). 5-stage lifecycle with role-based access control (BIM Coordinator, Approver, Site Resident). Offline-first mode with automatic sync via IndexedDB.",
      period: "April 2026",
      technologies: ["React", "TypeScript", "Tailwind", "Supabase", "IndexedDB"],
      image: "/images/gestion_documental.webp",
      links: {}
    },
    {
      title: "Sprinta AI",
      description: "Web platform featuring an AI sales agent for WhatsApp. Enables entrepreneurs and businesses to automate lead responses, manage them through an integrated CRM, and streamline their sales process intelligently.",
      period: "March 2026",
      technologies: ["React", "TypeScript", "Tailwind", "Supabase"],
      image: "/images/sprinta.png",
      viewnow: true,
      links: {
        live: "https://sprinta.ai/landing"
      }
    },
    {
      title: "Eemerson Sac Web",
      description: "Corporate website for Eemerson SAC, a transport company specializing in handling all types of containers, with over 15 years of experience in the Peruvian logistics sector.",
      period: "October 2025",
      technologies: ["React", "TypeScript", "Tailwind"],
      image: "/images/eemersonsac_web.webp",
      viewnow: true,
      links: {
        live: "https://eemersonsac.com/"
      }
    },
    {
      title: "PayBox — Eemerson SAC",
      description: "Operational management web platform for a freight transport company. Centralizes driver payments (exportable to Excel), GPS fleet tracking via Navitel, SUNAT OAuth integration for e-invoices, document expiry alerts synced with Odoo ERP, and a mobile-first driver portal with OCR and expense tracking.",
      period: "Nov 2025 - Feb 2026",
      technologies: ["Next.js 14", "TypeScript", "Supabase", "Tailwind", "shadcn/ui"],
      image: "/images/eemersonsac_plataforma.webp",
      links: {}
    },
    {
      title: "Renaceris Web",
      description: "Website for an aesthetic and health clinic with 3 locations across Peru (Lima, Huánuco, and Pucallpa). Showcases specialized treatments such as rhinoplasty, liposculpture, and more, with a modern and elegant design.",
      period: "February 2026",
      technologies: ["React", "TypeScript", "Tailwind"],
      image: "/images/renaceris_web.png",
      viewnow: true,
      links: {
        live: "https://www.renaceris.com/"
      }
    },
    {
      title: "Renaceris Plataforma",
      description: "Platform for managing Renaceris medical appointments, with distinct roles for receptionists and doctors, streamlining patient control and follow-up across all 3 locations.",
      period: "Jan - Apr 2026",
      technologies: ["React", "NestJS", "TypeScript", "Tailwind", "Supabase"],
      image: "/images/renaceris_plataforma.webp",
      links: {}
    },
  ];

  return (
    <section id="projects" className="py-16 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title={t('projects.title')}
          subtitle={t('projects.description')}
        />

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