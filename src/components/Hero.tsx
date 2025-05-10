import { Github, Linkedin, Mail, Code, FileCode, Cpu } from 'lucide-react';
import Terminal from './Terminal';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t, language } = useLanguage();
  
  const terminalCommands = language === 'es' ? [
    "who am i?",
    "Michael Carmelino Dueñas - Software Engineer",
    "ls -la",
    "skills.json  projects/  education.txt  current_status.txt",
    "cat current_status.txt",
    "Estudiando actualmente en UPC", 
    "7mo ciclo de Ingeniería de Software"
  ] : [
    "who am i?",
    "Michael Carmelino Dueñas - Software Engineer",
    "ls -la",
    "skills.json  projects/  education.txt  current_status.txt",
    "cat current_status.txt",
    "Currently studying at UPC", 
    "7th semester of Software Engineering"
  ];

  return (
    <section id="home" className="min-h-screen flex items-center py-8">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-1">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full mb-4 font-mono text-sm">
              <Code size={16} className="mr-2" />
              <span>{t('software.engineer')}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Michael Carmelino <span className="text-blue-600 dark:text-blue-400">Dueñas</span>
            </h1>

            <div className="flex items-center mb-6 text-gray-700 dark:text-gray-300">
              <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm mr-2 overflow-x-auto max-w-full">
                <span className="text-green-600 dark:text-green-400">function</span> <span className="text-blue-600 dark:text-blue-400">createSolution</span>(<span className="text-orange-600 dark:text-orange-400">problem</span>) &#123; ... &#125;
              </span>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-lg border-l-4 border-blue-500 dark:border-blue-400 pl-4">
              {t('hero.intro')}
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
                <FileCode size={18} className="text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">{t('hero.projects')}</span>
              </div>
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
                <Cpu size={18} className="text-purple-600 dark:text-purple-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">{t('hero.fullstack')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
              <a
                href="mailto:carmelino0213@gmail.com"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
              >
                <Mail size={18} />
                {t('hero.contact')}
              </a>
              <a
                href="https://www.linkedin.com/in/michael-carmelino-due%C3%B1as-a5117a264/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 shadow-md"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
              <a
                href="https://github.com/stxfxno"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 shadow-md"
              >
                <Github size={18} />
                GitHub
              </a>
            </div>
          </div>

          <div className="hidden lg:block order-2">
            <div className="w-full max-w-xl mx-auto">
              <div className="w-full min-w-[400px] md:min-w-[500px]">
                <Terminal commands={terminalCommands} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;