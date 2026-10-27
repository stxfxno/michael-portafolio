import { Code, ExternalLink, Github, Terminal, Calendar, Monitor, Cpu, FileCode } from 'lucide-react';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
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

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const { t } = useLanguage();

  // Get icon based on technologies
  const getProjectIcon = () => {
    if (project.technologies.includes('Android Studio') || project.technologies.includes('Kotlin')) {
      return <Monitor size={18} className="text-azure-300" />;
    } else if (project.technologies.includes('React') || project.technologies.includes('Angular')) {
      return <Code size={18} className="text-orchid-300" />;
    } else if (project.technologies.includes('Python')) {
      return <Terminal size={18} className="text-azure-300" />;
    } else if (project.technologies.includes('Java')) {
      return <Cpu size={18} className="text-orchid-300" />;
    } else {
      return <FileCode size={18} className="text-white" />;
    }
  };

  return (
    <div className="glass-card group h-full overflow-hidden flex flex-col">
      <div className="relative h-56 overflow-hidden rounded-t-[1.25rem]">
        <img
          src={project.image}
          alt={`Captura de ${project.title}`}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-orchid-600/30 to-azure-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
        <span className="absolute top-3 right-5 font-display text-5xl font-black text-white/15 group-hover:text-white/40 transition-colors duration-500">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="absolute bottom-3 left-5 flex items-center gap-2 text-orchid-100">
          <Calendar size={13} />
          <span className="label-wide">{project.period}</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="p-2 rounded-xl bg-orchid-500/15 border border-orchid-400/25">{getProjectIcon()}</span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white group-hover:text-orchid-100 transition-colors">{project.title}</h3>
        </div>

        <p className="text-orchid-50/70 font-light leading-relaxed mb-5">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-5 mt-auto">
          {project.technologies.map((tech) => (
            <span key={tech} className="chip">
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
              className="label-wide inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orchid-600 to-azure-600 text-white hover:shadow-[0_0_25px_-5px_#a960ff] transition-all"
            >
              <ExternalLink size={13} />
              {project.viewnow ? t('projects.viewnow') : t('projects.demo')}
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="label-wide inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orchid-400/40 text-orchid-100 hover:border-azure-400 hover:text-azure-300 transition-all"
            >
              <Github size={13} />
              {t('projects.repository')}
            </a>
          )}
          {project.links.figma && (
            <a
              href={project.links.figma}
              target="_blank"
              rel="noopener noreferrer"
              className="label-wide inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orchid-400/40 text-orchid-100 hover:border-azure-400 hover:text-azure-300 transition-all"
            >
              <Code size={13} />
              {t('projects.figma')}
            </a>
          )}
          {project.links.resources && (
            <a
              href={project.links.resources}
              target="_blank"
              rel="noopener noreferrer"
              className="label-wide inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orchid-400/40 text-orchid-100 hover:border-azure-400 hover:text-azure-300 transition-all"
            >
              <ExternalLink size={13} />
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
    <section id="projects" className="py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          kicker={t('kicker.projects')}
          title={t('projects.title')}
          subtitle={t('projects.description')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={(index % 2) * 120} className="h-full">
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-16 flex flex-col sm:flex-row justify-center gap-4">
          <a href="https://github.com/stxfxno" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <Github size={16} />
            {t('projects.see.github')}
          </a>
          <a href="/more-projects" className="btn-glow">
            <Code size={16} />
            {t('projects.see.more')}
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default Projects;
