import { Github, Linkedin, Mail, Code, FileCode, Cpu } from 'lucide-react';
import Terminal from './Terminal';

const Hero = () => {
  const terminalCommands = [
    "whoami",
    "Michael Carmelino Dueñas - Software Engineer",
    "ls -la",
    "skills.json  projects/  education.txt  current_status.txt",
    "cat current_status.txt",
    "Currently studying at UPC, 7th semester of Software Engineering"
  ];

  return (
    <section id="home" className="py-16 md:py-24 flex flex-col-reverse lg:flex-row items-center justify-between">
      <div className="lg:w-1/2 mt-10 lg:mt-0">
        <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full mb-4 font-mono text-sm">
          <Code size={16} className="mr-2" />
          <span>Software Engineer</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          Michael Carmelino <span className="text-blue-600 dark:text-blue-400">Dueñas</span>
        </h1>
        
        <div className="flex items-center mb-6 text-gray-700 dark:text-gray-300">
          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm mr-2">
            <span className="text-green-600 dark:text-green-400">function</span> <span className="text-blue-600 dark:text-blue-400">createSolution</span>(<span className="text-orange-600 dark:text-orange-400">problem</span>) &#123; ... &#125;
          </span>
        </div>
        
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-lg border-l-4 border-blue-500 dark:border-blue-400 pl-4">
          Estudiante de séptimo ciclo apasionado por el desarrollo web, aplicaciones móviles y nuevas tecnologías.
          Buscando constantemente nuevas formas de aplicar mis conocimientos y crear soluciones innovadoras.
        </p>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
            <FileCode size={18} className="text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-gray-700 dark:text-gray-300">7+ Proyectos</span>
          </div>
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
            <Cpu size={18} className="text-purple-600 dark:text-purple-400 mr-2" />
            <span className="text-gray-700 dark:text-gray-300">Desarrollo Full-Stack</span>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <a
            href="mailto:carmelino0213@gmail.com"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
          >
            <Mail size={18} />
            Contacto
          </a>
          <a
            href="https://www.linkedin.com/in/michael-carmelino-dueñas"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 shadow-md"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>
          <a
            href="https://github.com/stxfxno"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 shadow-md"
          >
            <Github size={18} />
            GitHub
          </a>
        </div>
      </div>
      
      <div className="lg:w-1/2 w-full mb-10 lg:mb-0">
        <Terminal commands={terminalCommands} />
      </div>
    </section>
  );
};

export default Hero;