import CodeBlock from './CodeBlox';

const Skills = () => {
  const skillsCode = `const developerProfile = {
  name: "Michael Carmelino Dueñas",
  role: "Software Engineer",
  languages: [
    { name: "Python", level: "Advanced" },
    { name: "Java", level: "Advanced" },
    { name: "JavaScript", level: "Advanced" },
    { name: "TypeScript", level: "Intermediate" },
    { name: "C++", level: "Intermediate" },
    { name: "HTML/CSS", level: "Advanced" }
  ],
  frameworks: [
    "React",
    "Angular",
    "Bootstrap",
    "Tailwind CSS"
  ],
  databases: [
    "MySQL", 
    "SQL Server", 
    "MongoDB", 
    "Firebase"
  ],
  tools: [
    "Git", "GitHub Desktop", "VS Code", 
    "Android Studio", "IntelliJ IDEA",
    "Visual Studio", "Postman", "Swagger",
    "Figma", "Canva", "Trello"
  ],
  other: [
    "API RESTful", "Netlify", "MS Office", 
    "OBS Studio"
  ],
  
  // Function to solve problems
  solveProblems: function(problem) {
    const solution = this.analyzeAndDevelop(problem);
    return solution;
  },
  
  // Always learning new technologies
  learnNewTech: async function(technology) {
    await this.research(technology);
    this.practice(technology);
    return this.mastery;
  }
};

// Export the developer profile
export default developerProfile;`;

  return (
    <section id="skills" className="py-16 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Habilidades Técnicas
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <CodeBlock code={skillsCode} fileName="developer-profile.js" />
        </div>
      </div>
    </section>
  );
};

export default Skills;