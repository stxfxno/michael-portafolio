import { Code, Database, Wrench, Terminal, Code2, Brush } from 'lucide-react';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import { useLanguage } from '../context/LanguageContext';

interface SkillCategory {
  nameKey: string;
  icon: React.ReactNode;
  iconColor: string;
  skills: string[];
}

const Skills = () => {
  const { t } = useLanguage();

  const categories: SkillCategory[] = [
    {
      nameKey: "skills.languages",
      icon: <Code size={20} />,
      iconColor: "text-azure-300",
      skills: ["Python", "Java", "JavaScript", "TypeScript", "C++", "HTML/CSS"],
    },
    {
      nameKey: "skills.frameworks",
      icon: <Code2 size={20} />,
      iconColor: "text-orchid-300",
      skills: ["React", "Next.js", "NestJS", "React Native", "Expo Go", "Bootstrap", "Tailwind CSS"],
    },
    {
      nameKey: "skills.databases",
      icon: <Database size={20} />,
      iconColor: "text-white",
      skills: ["MySQL", "SQL Server", "MongoDB", "Firebase", "Supabase"],
    },
    {
      nameKey: "skills.tools",
      icon: <Wrench size={20} />,
      iconColor: "text-azure-300",
      skills: ["Git", "GitHub Desktop", "Android Studio", "Postman", "Swagger", "Trello", "Linear", "Odoo ERP"],
    },
    {
      nameKey: "skills.design",
      icon: <Brush size={20} />,
      iconColor: "text-orchid-300",
      skills: ["Figma", "Canva", "Illustrator", "CapCut"],
    },
    {
      nameKey: "skills.others",
      icon: <Terminal size={20} />,
      iconColor: "text-white",
      skills: ["API RESTful", "SUNAT API", "Cron Jobs", "Vercel", "Netlify", "Render", "Railway", "Hostinger", "MS Office", "OBS Studio"],
    },
  ];

  return (
    <section id="skills" className="py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <SectionTitle kicker={t('kicker.skills')} title={t('skills.title')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Reveal key={cat.nameKey} delay={(i % 3) * 110} className="h-full">
              <div className="glass-card group h-full p-7">
                <div className="flex items-center justify-between mb-6">
                  <span className={`p-3 rounded-2xl bg-gradient-to-br from-orchid-600/30 to-azure-500/10 border border-orchid-400/25 ${cat.iconColor} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                    {cat.icon}
                  </span>
                  <span className="font-display text-3xl font-black text-white/10 group-hover:text-orchid-300/40 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold tracking-[0.15em] uppercase text-white mb-5">
                  {t(cat.nameKey)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="chip hover:bg-orchid-500/30 hover:border-azure-400/60 hover:text-white hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
