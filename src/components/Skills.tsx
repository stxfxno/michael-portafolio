import { Code, Database, Wrench , Terminal, Code2 } from 'lucide-react';

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: string[];
}

const Skills = () => {
  const skillCategories: SkillCategory[] = [
    {
      name: "Lenguajes",
      icon: <Code size={24} className="text-blue-600 dark:text-blue-400" />,
      skills: ["Python", "Java", "JavaScript", "TypeScript", "C++", "HTML/CSS"]
    },
    {
      name: "Frameworks",
      icon: <Code2 size={24} className="text-purple-600 dark:text-purple-400" />,
      skills: ["React", "Angular", "Bootstrap", "Tailwind CSS"]
    },
    {
      name: "Bases de Datos",
      icon: <Database size={24} className="text-green-600 dark:text-green-400" />,
      skills: ["MySQL", "SQL Server", "MongoDB", "Firebase"]
    },
    {
      name: "Herramientas",
      icon: <Wrench size={24} className="text-orange-600 dark:text-orange-400" />,
      skills: ["Git", "GitHub Desktop", "VS Code", "Android Studio", "IntelliJ IDEA", "Visual Studio", "Postman", "Swagger", "Figma", "Canva", "Trello"]
    },
    {
      name: "Otros",
      icon: <Terminal size={24} className="text-gray-600 dark:text-gray-400" />,
      skills: ["API RESTful", "Netlify", "MS Office", "OBS Studio"]
    }
  ];

  return (
    <section id="skills" className="py-16 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Habilidades Técnicas
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
            <span className="text-green-600 dark:text-green-400">const</span>
            <span className="text-gray-800 dark:text-gray-200"> </span>
            <span className="text-blue-600 dark:text-blue-400">skills</span>
            <span className="text-gray-600 dark:text-gray-400"> = </span>
            <span className="text-purple-600 dark:text-purple-400">developer</span>
            <span className="text-gray-600 dark:text-gray-400">.</span>
            <span className="text-orange-600 dark:text-orange-400">getSkills</span>
            <span className="text-gray-600 dark:text-gray-400">();</span>
          </span>
        </p>
        
        <div className="space-y-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg mr-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {category.name}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]"
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