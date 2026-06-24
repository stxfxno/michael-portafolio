import { Code, Database, Wrench, Terminal, Code2, Brush } from 'lucide-react';
import SectionTitle from './SectionTitle';
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
      icon: <Code size={13} />,
      iconColor: "text-blue-400",
      skills: ["Python", "Java", "JavaScript", "TypeScript", "C++", "HTML/CSS"],
    },
    {
      nameKey: "skills.frameworks",
      icon: <Code2 size={13} />,
      iconColor: "text-purple-400",
      skills: ["React", "Next.js", "NestJS", "React Native", "Expo Go", "Bootstrap", "Tailwind CSS"],
    },
    {
      nameKey: "skills.databases",
      icon: <Database size={13} />,
      iconColor: "text-green-400",
      skills: ["MySQL", "SQL Server", "MongoDB", "Firebase", "Supabase"],
    },
    {
      nameKey: "skills.tools",
      icon: <Wrench size={13} />,
      iconColor: "text-orange-400",
      skills: ["Git", "GitHub Desktop", "Android Studio", "Postman", "Swagger", "Trello", "Linear", "Odoo ERP"],
    },
    {
      nameKey: "skills.design",
      icon: <Brush size={13} />,
      iconColor: "text-pink-400",
      skills: ["Figma", "Canva", "Illustrator", "CapCut"],
    },
    {
      nameKey: "skills.others",
      icon: <Terminal size={13} />,
      iconColor: "text-gray-400",
      skills: ["API RESTful", "SUNAT API", "Cron Jobs", "Vercel", "Netlify", "Render", "Railway", "Hostinger", "MS Office", "OBS Studio"],
    },
  ];

  return (
    <section id="skills" className="py-8 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle title={t('skills.title')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-2">
          {categories.map((cat, i) => (
            <div key={i}>
              {/* Header */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-800">
                <span className={cat.iconColor}>{cat.icon}</span>
                <span className="text-xs font-mono uppercase tracking-widest text-gray-500">
                  {t(cat.nameKey)}
                </span>
              </div>

              {/* Skills — dot separated */}
              <p className="text-sm leading-relaxed">
                {cat.skills.map((skill, si) => (
                  <span key={si}>
                    <span className="text-gray-300">{skill}</span>
                    {si < cat.skills.length - 1 && (
                      <span className="text-gray-700 mx-1.5">·</span>
                    )}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
