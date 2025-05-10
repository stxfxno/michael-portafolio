import { Briefcase, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ExperienceItem {
  titleKey: string;     // Clave para traducción del título
  periodKey: string;    // Clave para traducción del periodo
  descriptionKeys: string[];  // Claves para traducción de descripciones
  link?: string;
}

const ExperienceCard = ({ experience }: { experience: ExperienceItem }) => {
  const { t } = useLanguage();
  
  return (
    <div className="relative pl-8 pb-8 border-l-2 border-blue-500 dark:border-blue-400 last:border-transparent last:pb-0">
      <div className="absolute left-0 top-0 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full p-1 border-2 border-blue-500 dark:border-blue-400">
        <Briefcase size={18} className="text-blue-600 dark:text-blue-400" />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 ml-2">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {t(experience.titleKey)}
        </h3>
        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3">
          {t(experience.periodKey)}
        </p>
        <ul className="text-gray-700 dark:text-gray-300 space-y-2 mb-3">
          {experience.descriptionKeys.map((key, index) => (
            <li key={index} className="flex">
              <span className="mr-2">•</span>
              <span>{t(key)}</span>
            </li>
          ))}
        </ul>
        {experience.link && (
          <a
            href={experience.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ExternalLink size={14} className="mr-1" />
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
      periodKey: "experience.job1.period",
      descriptionKeys: [
        "experience.job1.desc1",
        "experience.job1.desc2"
      ],
    },
    {
      titleKey: "experience.job2.title",
      periodKey: "experience.job2.period",
      descriptionKeys: [
        "experience.job2.desc1",
        "experience.job2.desc2"
      ],
    },
    {
      titleKey: "experience.job3.title",
      periodKey: "experience.job3.period",
      descriptionKeys: [
        "experience.job3.desc1",
        "experience.job3.desc2"
      ],
      link: "https://drive.google.com/drive/folders/1JxS9OujvmddY6vRs0TW6vtEcb0PBfmPW?usp=sharing"
    }
  ];

  return (
    <section id="experience" className="py-16 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          {t('experience.title')}
        </h2>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;