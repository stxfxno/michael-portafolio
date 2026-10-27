import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { useLanguage } from '../context/LanguageContext';
import { getMoreProjects } from '../data/moreProjects';

// Lista compacta tipo "archivo" con todos los demás proyectos.
// En escritorio muestra una vista previa de la captura al pasar el mouse.
const ProjectArchive = () => {
  const { t, language } = useLanguage();
  const es = language === 'es';
  const projects = getMoreProjects(language);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div className="relative mt-20">
      <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <h3 className="font-display uppercase text-5xl sm:text-6xl leading-none">
          {es ? 'Archivo' : 'Archive'}
          <span className="font-serif italic normal-case text-violet text-4xl sm:text-5xl"> {es ? 'y más' : '& more'}</span>
        </h3>
        <span className="tag text-paper/50">
          {projects.length} {es ? 'proyectos más' : 'more projects'}
        </span>
      </Reveal>

      <div
        className="border-t border-paper/20"
        onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setHovered(null)}
      >
        {projects.map((p, i) => {
          const link = p.links.live || p.links.github || p.links.resources;
          const Row = link ? 'a' : 'div';
          return (
            <Row
              key={p.title}
              {...(link ? { href: link, target: '_blank', rel: 'noopener noreferrer' } : {})}
              onMouseEnter={() => setHovered(i)}
              className="group grid grid-cols-12 items-center gap-3 py-4 sm:py-5 border-b border-paper/20 hover:bg-violet hover:text-ink hover:px-3 transition-all duration-300"
            >
              <span className="col-span-2 sm:col-span-1 font-mono text-xs text-paper/50 group-hover:text-ink">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="col-span-10 sm:col-span-5 font-display uppercase text-2xl sm:text-3xl leading-none">
                {p.title}
              </span>
              <span className="hidden sm:block col-span-4 tag text-paper/50 group-hover:text-ink truncate">
                {p.technologies.slice(0, 3).join(' / ')}
              </span>
              <span className="col-span-10 col-start-3 sm:col-start-auto sm:col-span-2 flex items-center justify-between sm:justify-end gap-3 tag text-paper/60 group-hover:text-ink">
                {p.period.replace(/\s*\(.*\)/, '')}
                {link && <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />}
              </span>
            </Row>
          );
        })}
      </div>

      {/* Vista previa flotante */}
      {hovered !== null && (
        <div
          className="hidden lg:block fixed z-40 pointer-events-none w-72 aspect-[16/10] border-4 border-ink shadow-2xl -rotate-3 overflow-hidden"
          style={{ left: pos.x + 24, top: pos.y - 90 }}
        >
          <img src={projects[hovered].image} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      <Reveal className="mt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <p className="font-serif italic text-3xl">{t('projects.more.text')}</p>
        <div className="flex flex-wrap gap-4">
          <a href="https://github.com/stxfxno" target="_blank" rel="noopener noreferrer" className="btn-line">
            {t('projects.see.github')} <ArrowUpRight size={14} />
          </a>
          <a href="/more-projects" className="btn-ink">
            {es ? 'Ver detalles de todos' : 'See all in detail'} <ArrowUpRight size={14} />
          </a>
        </div>
      </Reveal>
    </div>
  );
};

export default ProjectArchive;
