import { Code, Database, Wrench, Terminal, Code2, ChartBarDecreasingIcon, Brush } from 'lucide-react';

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: string[];
  iconColorClass: string;
}

const Skills = () => {
  const skillCategories: SkillCategory[] = [
    {
      name: "Lenguajes",
      icon: <Code size={18} />,
      iconColorClass: "text-blue-600 dark:text-blue-400",
      skills: ["Python", "Java", "JavaScript", "TypeScript", "C++", "HTML/CSS"]
    },
    {
      name: "Frameworks",
      icon: <Code2 size={18} />,
      iconColorClass: "text-purple-600 dark:text-purple-400",
      skills: ["React", "Angular", "Bootstrap", "Tailwind CSS"]
    },
    {
      name: "Bases de Datos",
      icon: <Database size={18} />,
      iconColorClass: "text-green-600 dark:text-green-400",
      skills: ["MySQL", "SQL Server", "MongoDB", "Firebase", "Supabase"]
    },
    {
      name: "Herramientas",
      icon: <Wrench size={18} />,
      iconColorClass: "text-orange-600 dark:text-orange-400",
      skills: ["Git", "GitHub Desktop", "Visual Studio", "Android Studio", "IntelliJ IDEA", "Postman", "Swagger", "Trello"]
    },
    {
      name: "Diseño",
      icon: <Brush size={18} />,
      iconColorClass: "text-pink-600 dark:text-pink-400",
      skills: ["Figma", "Canva", "Illustrator", "CapCut"]
    },
    {
      name: "Otros",
      icon: <Terminal size={18} />,
      iconColorClass: "text-gray-600 dark:text-gray-400",
      skills: ["API RESTful", "Netlify", "MS Office", "OBS Studio"]
    }
  ];

  return (
    <section id="skills" className="py-8 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Habilidades Técnicas
        </h2>
        
        <div className="text-center mb-6">
          <span className="inline-block font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs text-gray-600 dark:text-gray-400">
            <span className="text-green-600 dark:text-green-400">const</span>
            <span> </span>
            <span className="text-blue-600 dark:text-blue-400">skills</span>
            <span className="text-gray-600 dark:text-gray-400"> = </span>
            <span className="text-purple-600 dark:text-purple-400">developer</span>
            <span className="text-gray-600 dark:text-gray-400">.</span>
            <span className="text-orange-600 dark:text-orange-400">getSkills</span>
            <span className="text-gray-600 dark:text-gray-400">();</span>
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-2">
                <div className={`mr-2 ${category.iconColorClass}`}>
                  {category.icon}
                </div>
                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                  {category.name}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;