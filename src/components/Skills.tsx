import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import { useLanguage } from '../context/LanguageContext';

interface SkillCategory {
  nameKey: string;
  skills: string[];
}

const Skills = () => {
  const { t } = useLanguage();

  const categories: SkillCategory[] = [
    {
      nameKey: "skills.languages",
      skills: ["Python", "Java", "JavaScript", "TypeScript", "C++", "HTML/CSS"],
    },
    {
      nameKey: "skills.frameworks",
      skills: ["React", "Next.js", "NestJS", "React Native", "Expo Go", "Bootstrap", "Tailwind CSS"],
    },
    {
      nameKey: "skills.databases",
      skills: ["MySQL", "SQL Server", "MongoDB", "Firebase", "Supabase"],
    },
    {
      nameKey: "skills.tools",
      skills: ["Git", "GitHub Desktop", "Android Studio", "Postman", "Swagger", "Trello", "Linear", "Odoo ERP"],
    },
    {
      nameKey: "skills.design",
      skills: ["Figma", "Canva", "Illustrator", "CapCut"],
    },
    {
      nameKey: "skills.others",
      skills: ["API RESTful", "SUNAT API", "Cron Jobs", "Vercel", "Netlify", "Render", "Railway", "Hostinger", "MS Office", "OBS Studio"],
    },
  ];

  const all = categories.flatMap((c) => c.skills);

  return (
    <section id="skills" className="py-24 scroll-mt-10">
      <SectionTitle number="03." title={t('skills.bigtitle')} subtitle={t('skills.subtitle')} note={t('skills.note')} />

      {/* Cintas gigantes en movimiento */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 mb-16 overflow-hidden py-4">
        <div className="bg-violet text-ink py-3 -rotate-2 scale-105">
          <div className="flex w-max animate-marquee">
            {[...all, ...all].map((s, i) => (
              <span key={i} className="font-display uppercase text-4xl sm:text-5xl px-6 whitespace-nowrap">
                {s} <span className="font-serif italic">✦</span>
              </span>
            ))}
          </div>
        </div>
        <div className="py-3 rotate-1 border-y border-paper/20">
          <div className="flex w-max animate-marquee-reverse">
            {[...all].reverse().concat([...all].reverse()).map((s, i) => (
              <span key={i} className="font-display uppercase text-4xl sm:text-5xl px-6 whitespace-nowrap outline-text">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla de categorías */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-l border-t border-paper/20">
        {categories.map((cat, i) => (
          <Reveal key={cat.nameKey} delay={(i % 3) * 90} className="h-full">
            <div className="group h-full p-6 sm:p-8 border-r border-b border-paper/20 hover:bg-paper hover:text-ink transition-colors duration-300">
              <div className="flex items-baseline justify-between mb-6">
                <h3 className="font-wide uppercase text-xl">{t(cat.nameKey)}</h3>
                <span className="font-display text-4xl text-violet">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <ul className="space-y-1">
                {cat.skills.map((skill) => (
                  <li key={skill} className="font-serif text-2xl leading-tight flex items-center gap-3">
                    <span className="w-2 h-2 bg-violet shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Skills;
