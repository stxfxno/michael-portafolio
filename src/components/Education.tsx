import { BookOpen, Award, ExternalLink, Code, Briefcase, GraduationCap, Monitor } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Education {
  institution: string;
  degreeKey: string;
  periodKey: string;
  descriptionKey?: string;
  icon?: React.ReactNode;
}

interface Certification {
  titleKey: string;
  issuerKey: string;
  dateKey: string;
  descriptionKey: string;
  link?: string;
  category: string;
  icon?: React.ReactNode;
}

const EducationCard = ({ education }: { education: Education }) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-blue-500 dark:border-blue-400">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
          {education.icon || <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{education.institution}</h3>
          <p className="text-blue-600 dark:text-blue-400">{t(education.degreeKey)}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t(education.periodKey)}</p>
          {education.descriptionKey && (
            <p className="text-gray-700 dark:text-gray-300 mt-2">{t(education.descriptionKey)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const CertificationCard = ({ certification }: { certification: Certification }) => {
  const { t } = useLanguage();
  
  // Get background color based on category
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Data': 'border-green-500 dark:border-green-400',
      'Programming': 'border-blue-500 dark:border-blue-400',
      'DevOps': 'border-red-500 dark:border-red-400',
      'Databases': 'border-purple-500 dark:border-purple-400',
      'Language': 'border-yellow-500 dark:border-yellow-400',
      'Business': 'border-indigo-500 dark:border-indigo-400'
    };
    
    return colors[category] || 'border-gray-500 dark:border-gray-400';
  };
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 ${getCategoryColor(certification.category)}`}>
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          {certification.icon || <Award className="w-6 h-6 text-gray-600 dark:text-gray-400" />}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t(certification.titleKey)}</h3>
          <div className="flex items-center mt-1">
            <span className="text-gray-700 dark:text-gray-300">{t(certification.issuerKey)}</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{t(certification.dateKey)}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mt-2">{t(certification.descriptionKey)}</p>
          {certification.link && (
            <a
              href={certification.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-3 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <ExternalLink size={14} className="mr-1" />
              {t('education.viewcert')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Education = () => {
  const { t } = useLanguage();
  
  const educations: Education[] = [
    {
      institution: "Universidad Peruana de Ciencias Aplicadas",
      degreeKey: "education.upc.degree",
      periodKey: "education.upc.period",
      descriptionKey: "education.upc.desc",
      icon: <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
    },
    {
      institution: "Centro de Idiomas Británico",
      degreeKey: "education.britanico.degree",
      periodKey: "education.britanico.period",
      descriptionKey: "education.britanico.desc",
      icon: <Monitor className="w-6 h-6 text-blue-600 dark:text-blue-400" />
    }
  ];

  const certifications: Certification[] = [
    {
      titleKey: "cert.data.title",
      issuerKey: "cert.data.issuer",
      dateKey: "cert.data.date",
      descriptionKey: "cert.data.desc",
      category: "Data",
      link: "https://drive.google.com/file/d/1UNBRdo9Et2b50iiPXl_89RlgfCoH4FGf/view?usp=drive_link",
      icon: <Code className="w-6 h-6 text-green-600 dark:text-green-400" />
    },
    {
      titleKey: "cert.python.title",
      issuerKey: "cert.python.issuer",
      dateKey: "cert.python.date",
      descriptionKey: "cert.python.desc",
      category: "Programming",
      link: "https://drive.google.com/file/d/18fSNPxgCvmAqcP7LJNJCzJJcO3pgibMh/view?usp=drive_link",
      icon: <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
    },
    {
      titleKey: "cert.scrum.title",
      issuerKey: "cert.scrum.issuer",
      dateKey: "cert.scrum.date",
      descriptionKey: "cert.scrum.desc",
      category: "Business",
      link: "https://drive.google.com/file/d/14pjxqFO5Zq_tcrqk64DNbiyiu2MjSUL0/view?usp=drive_link",
      icon: <Briefcase className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
    },
    {
      titleKey: "cert.mongo.title",
      issuerKey: "cert.mongo.issuer",
      dateKey: "cert.mongo.date",
      descriptionKey: "cert.mongo.desc",
      category: "Databases",
      link: "https://drive.google.com/file/d/1uOvAU_K1BUbb4kjdzaGnTu3x4kvizwbP/view?usp=sharing",
      icon: <Code className="w-6 h-6 text-purple-600 dark:text-purple-400" />
    }
  ];

  return (
    <section id="education" className="py-16 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          {t('education.title')}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
            <span className="text-green-600 dark:text-green-400">class</span>
            <span className="text-gray-800 dark:text-gray-200"> </span>
            <span className="text-blue-600 dark:text-blue-400">Developer</span>
            <span className="text-gray-800 dark:text-gray-200"> </span>
            <span className="text-purple-600 dark:text-purple-400">extends</span>
            <span className="text-gray-800 dark:text-gray-200"> </span>
            <span className="text-orange-600 dark:text-orange-400">LifelongLearner</span>
          </span>
        </p>
        
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <GraduationCap size={24} className="mr-2 text-blue-600 dark:text-blue-400" />
          {t('education.subtitle1')}
        </h3>
        <div className="grid grid-cols-1 gap-6 mb-12">
          {educations.map((edu, index) => (
            <EducationCard key={index} education={edu} />
          ))}
        </div>
        
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Award size={24} className="mr-2 text-blue-600 dark:text-blue-400" />
          {t('education.subtitle2')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <CertificationCard key={index} certification={cert} />
          ))}
        </div>
        
        <div className="text-center mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-sm">
          <p className="text-gray-700 dark:text-gray-300 mb-4">{t('education.note')}</p>
          <a
            href="https://drive.google.com/drive/folders/1rdfTpHMpEJJAMXlq31EaugK2AkUwROxQ?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
          >
            <ExternalLink size={18} className="mr-2" />
            {t('education.viewall')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Education;