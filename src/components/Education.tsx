import { ExternalLink, GraduationCap, Award } from 'lucide-react';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
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
    DevOps: 'bg-azure-400',
    Business: 'bg-white',
    Data: 'bg-azure-300',
    Programming: 'bg-orchid-300',
    Databases: 'bg-orchid-500',
    Language: 'bg-white',
  };

  return (
    <section id="education" className="py-24 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          kicker={t('kicker.education')}
          title={t('education.title')}
          subtitle={t('education.subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* ── Educación ─────────────────────────────── */}
          <Reveal>
            <div className="glass-card p-7 h-full">
              <p className="label-wide flex items-center gap-2 text-azure-300 mb-8">
                <GraduationCap size={14} />
                {t('education.subtitle1')}
              </p>

              <div className="relative pl-7">
                <span className="absolute left-[6px] top-2 bottom-2 w-px bg-gradient-to-b from-orchid-400 via-white/40 to-azure-400" />

                <div className="space-y-9">
                  {educations.map((edu, i) => (
                    <div key={i} className="relative">
                      <span className="absolute -left-7 top-1.5 w-3.5 h-3.5 rotate-45 bg-orchid-400 shadow-[0_0_14px_#a960ff]" />

                      <div className="flex items-start justify-between gap-2">
                        <p className="font-serif text-lg font-bold tracking-wide text-white leading-snug">
                          {edu.institution}
                        </p>
                        {edu.link && (
                          <a
                            href={edu.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t('education.viewcert')}
                            className="shrink-0 text-orchid-200 hover:text-azure-300 transition-colors duration-200 mt-1"
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                      </div>

                      <p className="text-orchid-200 italic mt-1">{t(edu.degreeKey)}</p>
                      <p className="label-wide text-azure-300/80 mt-2">{t(edu.periodKey)}</p>

                      {edu.delegates && edu.delegates.length > 0 && (
                        <div className="mt-4">
                          <p className="label-wide text-white/60 mb-2">
                            {language === 'es' ? 'Representante académico' : 'Academic representative'}
                          </p>
                          <ul className="space-y-1.5">
                            {edu.delegates.map((course, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-orchid-50/70 font-light">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-azure-300 shrink-0" />
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
          </Reveal>

          {/* ── Certificaciones ───────────────────────── */}
          <Reveal delay={120}>
            <div className="glass-card p-7 h-full">
              <p className="label-wide flex items-center gap-2 text-azure-300 mb-8">
                <Award size={14} />
                {t('education.subtitle2')}
              </p>

              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <a
                    key={i}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('education.viewcert')}
                    className="flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl bg-orchid-900/20 border border-orchid-400/15 hover:border-azure-400/50 hover:bg-orchid-600/15 hover:translate-x-1 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`w-2 h-2 rotate-45 shrink-0 ${categoryDot[cert.category] ?? 'bg-white'}`} />
                      <div className="min-w-0">
                        <p className="text-white truncate leading-snug">
                          {t(cert.titleKey)}
                        </p>
                        <p className="text-xs text-orchid-100/60 mt-1 tracking-wide">
                          {t(cert.issuerKey)} · {t(cert.dateKey)}
                        </p>
                      </div>
                    </div>
                    <ExternalLink size={14} className="shrink-0 text-orchid-300 group-hover:text-azure-300 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Ver todos ─────────────────────────────── */}
        <Reveal className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="text-orchid-100/60 italic">{t('education.note')}</p>
          <a
            href="https://drive.google.com/drive/folders/1rdfTpHMpEJJAMXlq31EaugK2AkUwROxQ?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <ExternalLink size={14} />
            {t('education.viewall')}
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default Education;
