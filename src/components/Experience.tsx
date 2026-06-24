import { Briefcase, ExternalLink, Code, GraduationCap, MapPin } from 'lucide-react';
import SectionTitle from './SectionTitle';
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
    className: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700',
    icon: <Briefcase size={14} />,
    accent: 'border-blue-500',
    dot: 'bg-blue-500',
  },
  freelance: {
    label: { es: 'Freelance', en: 'Freelance' },
    className: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700',
    icon: <Code size={14} />,
    accent: 'border-purple-500',
    dot: 'bg-purple-500',
  },
  teaching: {
    label: { es: 'Docencia', en: 'Teaching' },
    className: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700',
    icon: <GraduationCap size={14} />,
    accent: 'border-amber-500',
    dot: 'bg-amber-500',
  },
};

const ExperienceCard = ({ experience }: { experience: ExperienceItem }) => {
  const { t, language } = useLanguage();
  const config = typeConfig[experience.type];

  return (
    <div className={`bg-light-card dark:bg-gray-800 rounded-xl border border-light-border dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200`}>
      {/* Accent bar top */}
      <div className={`h-1 w-full ${config.dot}`} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-light-text dark:text-white leading-tight">
              {t(experience.titleKey)}
            </h3>
            <p className="text-sm text-light-text-secondary dark:text-gray-400 mt-0.5 flex items-center gap-1">
              <MapPin size={12} className="shrink-0" />
              {t(experience.companyKey)}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0">
            {/* Active badge */}
            {experience.current ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {language === 'es' ? 'Activo' : 'Active'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                {language === 'es' ? 'Finalizado' : 'Ended'}
              </span>
            )}
            {/* Type badge */}
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
              {config.icon}
              {config.label[language]}
            </span>
          </div>
        </div>

        {/* Period */}
        <p className="text-xs text-light-text-secondary dark:text-gray-500 font-mono mb-3">
          {t(experience.periodKey)}
        </p>

        {/* Divider */}
        <div className="border-t border-light-border dark:border-gray-700 mb-3" />

        {/* Description */}
        <ul className="space-y-1.5">
          {experience.descriptionKeys.map((key, index) => (
            <li key={index} className="flex gap-2 text-sm text-light-text-secondary dark:text-gray-300">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${config.dot} shrink-0`} />
              <span>{t(key)}</span>
            </li>
          ))}
        </ul>

        {/* Link */}
        {experience.link && (
          <a
            href={experience.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-3 text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ExternalLink size={12} />
            {t('experience.resources')}
          </a>
        )}
      </div>
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
      descriptionKeys: ["experience.job4.desc1", "experience.job4.desc2"],
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
    <section id="experience" className="py-16 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title={t('experience.title')}
          subtitle={t('experience.subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
