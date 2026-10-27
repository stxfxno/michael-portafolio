import { Briefcase, ExternalLink, Code, GraduationCap, MapPin } from 'lucide-react';
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

const typeConfig = {
  fulltime: {
    label: { es: 'Tiempo Completo', en: 'Full Time' },
    className: 'bg-azure-400/10 text-azure-300 border border-azure-400/40',
    icon: <Briefcase size={13} />,
    dot: 'bg-azure-400 shadow-[0_0_10px_#38bdf8]',
  },
  freelance: {
    label: { es: 'Freelance', en: 'Freelance' },
    className: 'bg-orchid-500/15 text-orchid-200 border border-orchid-400/40',
    icon: <Code size={13} />,
    dot: 'bg-orchid-400 shadow-[0_0_10px_#a960ff]',
  },
  teaching: {
    label: { es: 'Docencia', en: 'Teaching' },
    className: 'bg-white/10 text-white border border-white/30',
    icon: <GraduationCap size={13} />,
    dot: 'bg-white shadow-[0_0_10px_#fff]',
  },
};

const ExperienceCard = ({ experience }: { experience: ExperienceItem }) => {
  const { t, language } = useLanguage();
  const config = typeConfig[experience.type];

  return (
    <div className="glass-card group p-7 h-full">
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {experience.current ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full label-wide bg-azure-400/15 text-azure-300 border border-azure-400/40">
            <span className="w-1.5 h-1.5 rounded-full bg-azure-300 animate-pulse" />
            {language === 'es' ? 'Activo' : 'Active'}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full label-wide bg-white/5 text-white/60 border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
            {language === 'es' ? 'Finalizado' : 'Ended'}
          </span>
        )}
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full label-wide ${config.className}`}>
          {config.icon}
          {config.label[language]}
        </span>
      </div>

      <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white leading-snug group-hover:text-gradient">
        {t(experience.titleKey)}
      </h3>
      <p className="text-orchid-100/80 mt-2 flex items-center gap-1.5 italic">
        <MapPin size={14} className="shrink-0 text-orchid-300" />
        {t(experience.companyKey)}
      </p>
      <p className="label-wide text-azure-300/90 mt-3">{t(experience.periodKey)}</p>

      <div className="ornament my-5 opacity-60" />

      <ul className="space-y-2.5">
        {experience.descriptionKeys.map((key, index) => (
          <li key={index} className="flex gap-3 text-orchid-50/75 font-light leading-relaxed">
            <span className={`mt-2.5 w-1.5 h-1.5 rotate-45 ${config.dot} shrink-0`} />
            <span>{t(key)}</span>
          </li>
        ))}
      </ul>

      {experience.link && (
        <a
          href={experience.link}
          target="_blank"
          rel="noopener noreferrer"
          className="label-wide inline-flex items-center gap-2 mt-5 text-azure-300 hover:text-white transition-colors"
        >
          <ExternalLink size={12} />
          {t('experience.resources')}
        </a>
      )}
    </div>
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
    <section id="experience" className="py-24 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          kicker={t('kicker.experience')}
          title={t('experience.title')}
          subtitle={t('experience.subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp, index) => (
            <Reveal key={index} delay={(index % 2) * 120} className="h-full">
              <ExperienceCard experience={exp} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
