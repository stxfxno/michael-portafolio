import { ExternalLink } from 'lucide-react';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import { useLanguage } from '../context/LanguageContext';

interface ExperienceItem {
  titleKey: string;
  companyKey: string;
  periodKey: string;
  descriptionKeys: string[];
  type: 'fulltime' | 'freelance' | 'teaching';
  current: boolean;
  link?: string;
}

const typeLabel = {
  fulltime: { es: 'Tiempo completo', en: 'Full time' },
  freelance: { es: 'Freelance', en: 'Freelance' },
  teaching: { es: 'Docencia', en: 'Teaching' },
};

const ExperienceRow = ({ experience, index }: { experience: ExperienceItem; index: number }) => {
  const { t, language } = useLanguage();

  return (
    <article className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 border-t border-paper/20">
      <div className="md:col-span-3">
        <span className="font-display text-5xl text-violet">{String(index + 1).padStart(2, '0')}.</span>
        <p className="tag text-paper/60 mt-3">{t(experience.periodKey)}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="tag border border-paper/40 px-2 py-1">{typeLabel[experience.type][language]}</span>
          {experience.current && (
            <span className="tag hl-full py-1">● {language === 'es' ? 'Ahora' : 'Now'}</span>
          )}
        </div>
      </div>

      <div className="md:col-span-9">
        <h3 className="font-display uppercase text-3xl sm:text-5xl leading-[0.95] group-hover:text-violet transition-colors duration-300">
          {t(experience.titleKey)}
        </h3>
        <p className="font-serif italic text-2xl text-paper/80 mt-2 mb-5">{t(experience.companyKey)}</p>
        <ul className="space-y-2 max-w-3xl">
          {experience.descriptionKeys.map((key, i) => (
            <li key={i} className="flex gap-3 text-paper/70 leading-relaxed">
              <span className="text-violet font-mono">→</span>
              <span>{t(key)}</span>
            </li>
          ))}
        </ul>
        {experience.link && (
          <a href={experience.link} target="_blank" rel="noopener noreferrer" className="link-arrow mt-6">
            {t('experience.resources')} <ExternalLink size={13} />
          </a>
        )}
      </div>
    </article>
  );
};

const Experience = () => {
  const { t } = useLanguage();

  const experiences: ExperienceItem[] = [
    {
      titleKey: "experience.job1.title",
      companyKey: "experience.job1.company",
      periodKey: "experience.job1.period",
      descriptionKeys: ["experience.job1.desc1", "experience.job1.desc2"],
      type: 'fulltime',
      current: false,
    },
    {
      titleKey: "experience.job4.title",
      companyKey: "experience.job4.company",
      periodKey: "experience.job4.period",
      descriptionKeys: ["experience.job4.desc1", "experience.job4.desc2", "experience.job4.desc3"],
      type: 'freelance',
      current: false,
    },
    {
      titleKey: "experience.job2.title",
      companyKey: "experience.job2.company",
      periodKey: "experience.job2.period",
      descriptionKeys: ["experience.job2.desc1", "experience.job2.desc2"],
      type: 'freelance',
      current: true,
    },
    {
      titleKey: "experience.job3.title",
      companyKey: "experience.job3.company",
      periodKey: "experience.job3.period",
      descriptionKeys: ["experience.job3.desc1", "experience.job3.desc2"],
      type: 'teaching',
      current: false,
      link: "https://drive.google.com/drive/folders/1JxS9OujvmddY6vRs0TW6vtEcb0PBfmPW?usp=sharing"
    }
  ];

  return (
    <section id="experience" className="py-24 scroll-mt-10">
      <SectionTitle number="04." title={t('experience.bigtitle')} subtitle={t('experience.subtitle')} note={t('experience.note')} />
      <div className="border-b border-paper/20">
        {experiences.map((exp, index) => (
          <Reveal key={index}>
            <ExperienceRow experience={exp} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Experience;
