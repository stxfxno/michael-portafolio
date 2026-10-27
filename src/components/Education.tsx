import { ArrowUpRight, ExternalLink, GraduationCap, Award } from 'lucide-react';
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

  return (
    <section id="education" className="py-24 scroll-mt-10">
      <SectionTitle number="05." title={t('education.bigtitle')} subtitle={t('education.subtitle')} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Educación */}
        <div>
          <h3 className="flex items-center gap-3 font-wide uppercase text-lg mb-8">
            <GraduationCap size={18} className="text-violet" />
            {t('education.subtitle1')}
          </h3>
          <div className="space-y-12">
            {educations.map((edu, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="relative pl-6 border-l-2 border-violet">
                  <p className="tag text-paper/60 mb-2">{t(edu.periodKey)}</p>
                  <p className="font-display uppercase text-3xl sm:text-4xl leading-none">{edu.institution}</p>
                  <p className="font-serif italic text-2xl text-violet-soft mt-2">{t(edu.degreeKey)}</p>
                  {edu.link && (
                    <a href={edu.link} target="_blank" rel="noopener noreferrer" className="link-arrow mt-4">
                      {t('education.viewcert')} <ExternalLink size={13} />
                    </a>
                  )}
                  {edu.delegates && edu.delegates.length > 0 && (
                    <div className="mt-5">
                      <p className="font-hand text-lg text-cobalt mb-2">
                        {language === 'es' ? 'Representante académico de…' : 'Academic representative of…'}
                      </p>
                      <ul className="space-y-1">
                        {edu.delegates.map((course, j) => (
                          <li key={j} className="text-sm text-paper/65 flex gap-2">
                            <span className="text-violet">✦</span>
                            {course}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Certificaciones */}
        <div>
          <h3 className="flex items-center gap-3 font-wide uppercase text-lg mb-8">
            <Award size={18} className="text-violet" />
            {t('education.subtitle2')}
          </h3>
          <div className="border-t border-paper/20">
            {certifications.map((cert, i) => (
              <Reveal key={i} delay={i * 60}>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 py-5 border-b border-paper/20 hover:bg-violet hover:text-ink hover:px-4 transition-all duration-300"
                >
                  <span className="font-display text-2xl text-violet group-hover:text-ink w-8">{String(i + 1).padStart(2, '0')}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-xl sm:text-2xl leading-tight">{t(cert.titleKey)}</p>
                    <p className="tag opacity-60 mt-1">{t(cert.issuerKey)} · {t(cert.dateKey)}</p>
                  </div>
                  <ArrowUpRight size={20} className="shrink-0 transition-transform group-hover:rotate-45" />
                </a>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-paper/55 text-sm">{t('education.note')}</p>
            <a
              href="https://drive.google.com/drive/folders/1rdfTpHMpEJJAMXlq31EaugK2AkUwROxQ?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-line"
            >
              {t('education.viewall')} <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
