import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import Navbar from './Navbar';
import Footer from './Footer';
import Reveal from './Reveal';
import { useLanguage } from '../context/LanguageContext';
import { getMoreProjects } from '../data/moreProjects';

const MoreProjects = () => {
  const { t, language } = useLanguage();

  const additionalProjects = getMoreProjects(language);

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
