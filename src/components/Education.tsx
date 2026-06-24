import { ExternalLink, GraduationCap, Award } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { useLanguage } from '../context/LanguageContext';

interface EducationItem {
  institution: string;
  degreeKey: string;
  periodKey: string;
  link?: string;
  delegates?: string[];
}

interface CertificationItem {
  titleKey: string;
  issuerKey: string;
  dateKey: string;
  link?: string;
  category: string;
}

const Education = () => {
  const { t, language } = useLanguage();

  const educations: EducationItem[] = [
    {
      institution: "Universidad Peruana de Ciencias Aplicadas",
      degreeKey: "education.upc.degree",
      periodKey: "education.upc.period",
      delegates: [
        language === 'es' ? 'Org. y Dirección de Empresas (2022-2)' : 'Org. & Business Management (2022-2)',
        language === 'es' ? 'Algoritmos y Estructura de Datos (2023-1)' : 'Algorithms & Data Structures (2023-1)',
        language === 'es' ? 'Aplicaciones Web (2024-1)' : 'Web Applications (2024-1)',
        language === 'es' ? 'Aplicaciones Móviles (2024-2)' : 'Mobile Applications (2024-2)',
        language === 'es' ? 'Fundamentos de Arquitectura de Software (2025-1)' : 'Software Architecture Fundamentals (2025-1)',
      ],
    },
    {
      institution: "Centro de Idiomas Británico",
      degreeKey: "education.britanico.degree",
      periodKey: "education.britanico.period",
      link: "/certificados/Constancia de Fase Avanzada Culminada.pdf",
    },
  ];

  const certifications: CertificationItem[] = [
    {
      titleKey: "cert.itsupport.title",
      issuerKey: "cert.itsupport.issuer",
      dateKey: "cert.itsupport.date",
      link: "https://drive.google.com/file/d/1tuCiewG9Lzu72-w3OQTy-DITM1x5SFp8/view?usp=drive_link",
      category: "DevOps",
    },
    {
      titleKey: "cert.excel.title",
      issuerKey: "cert.excel.issuer",
      dateKey: "cert.excel.date",
      link: "https://coursera.org/verify/specialization/FCVJCETTL30V",
      category: "Business",
    },
    {
      titleKey: "cert.data.title",
      issuerKey: "cert.data.issuer",
      dateKey: "cert.data.date",
      link: "https://drive.google.com/file/d/1UNBRdo9Et2b50iiPXl_89RlgfCoH4FGf/view?usp=drive_link",
      category: "Data",
    },
    {
      titleKey: "cert.python.title",
      issuerKey: "cert.python.issuer",
      dateKey: "cert.python.date",
      link: "https://drive.google.com/file/d/18fSNPxgCvmAqcP7LJNJCzJJcO3pgibMh/view?usp=drive_link",
      category: "Programming",
    },
    {
      titleKey: "cert.scrum.title",
      issuerKey: "cert.scrum.issuer",
      dateKey: "cert.scrum.date",
      link: "https://drive.google.com/file/d/14pjxqFO5Zq_tcrqk64DNbiyiu2MjSUL0/view?usp=drive_link",
      category: "Business",
    },
    {
      titleKey: "cert.mongo.title",
      issuerKey: "cert.mongo.issuer",
      dateKey: "cert.mongo.date",
      link: "https://drive.google.com/file/d/1uOvAU_K1BUbb4kjdzaGnTu3x4kvizwbP/view?usp=sharing",
      category: "Databases",
    },
  ];

  const categoryDot: Record<string, string> = {
    DevOps: 'bg-red-400',
    Business: 'bg-indigo-400',
    Data: 'bg-green-400',
    Programming: 'bg-blue-400',
    Databases: 'bg-purple-400',
    Language: 'bg-yellow-400',
  };

  return (
    <section id="education" className="py-16 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title={t('education.title')}
          subtitle={t('education.subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* ── Educación ─────────────────────────────── */}
          <div>
            <p className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-6">
              <GraduationCap size={13} />
              {t('education.subtitle1')}
            </p>

            <div className="relative pl-5">
              <span className="absolute left-[5px] top-2 bottom-2 w-px bg-gray-700/60" />

              <div className="space-y-7">
                {educations.map((edu, i) => (
                  <div key={i} className="relative">
                    <span className="absolute -left-5 top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-500/10" />

                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-light-text dark:text-white leading-snug">
                        {edu.institution}
                      </p>
                      {edu.link && (
                        <a
                          href={edu.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t('education.viewcert')}
                          className="shrink-0 text-gray-600 hover:text-blue-400 transition-colors duration-200 cursor-pointer mt-0.5"
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>

                    <p className="text-sm text-blue-400 mt-0.5">{t(edu.degreeKey)}</p>
                    <p className="text-xs text-gray-500 font-mono mt-1">{t(edu.periodKey)}</p>

                    {edu.delegates && edu.delegates.length > 0 && (
                      <div className="mt-2.5">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1.5">
                          {language === 'es' ? 'Representante académico' : 'Academic representative'}
                        </p>
                        <ul className="space-y-1">
                          {edu.delegates.map((course, j) => (
                            <li key={j} className="flex items-start gap-1.5 text-xs text-gray-500">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-600 shrink-0" />
                              {course}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Certificaciones ───────────────────────── */}
          <div>
            <p className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-6">
              <Award size={13} />
              {t('education.subtitle2')}
            </p>

            <div className="space-y-2">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-gray-800/40 border border-gray-700/40 hover:border-gray-600/60 hover:bg-gray-800/60 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${categoryDot[cert.category] ?? 'bg-gray-500'}`} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-light-text dark:text-gray-100 truncate leading-snug">
                        {t(cert.titleKey)}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {t(cert.issuerKey)} · {t(cert.dateKey)}
                      </p>
                    </div>
                  </div>

                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t('education.viewcert')}
                      className="shrink-0 text-gray-600 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Ver todos ─────────────────────────────── */}
        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">{t('education.note')}</p>
          <a
            href="https://drive.google.com/drive/folders/1rdfTpHMpEJJAMXlq31EaugK2AkUwROxQ?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-sm text-gray-300 hover:border-blue-500 hover:text-blue-400 transition-all duration-200 group cursor-pointer"
          >
            <ExternalLink size={14} />
            {t('education.viewall')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Education;
