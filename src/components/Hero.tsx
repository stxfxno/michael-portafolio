import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Sparkles, FileCode, Cpu, ChevronDown, Gamepad2 } from 'lucide-react';
import Terminal from './Terminal';
import { useLanguage } from '../context/LanguageContext';

const marqueeItems = ['React', 'TypeScript', 'Next.js', 'NestJS', 'Supabase', 'Tailwind', 'React Native', 'Python', 'MongoDB', 'Node.js', 'Figma', 'Java'];

const Hero = () => {
  const { t, language } = useLanguage();
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = language === 'es'
    ? ['Desarrollador Full Stack', 'Ingeniero de Software', 'Creador de Experiencias', 'Arquitecto de Soluciones']
    : ['Full Stack Developer', 'Software Engineer', 'Experience Crafter', 'Solutions Architect'];

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(id);
  }, [roles.length]);

  const terminalCommands = language === 'es' ? [
    "who am i?",
    "Michael Carmelino Dueñas - Software Engineer",
    "ls -la",
    "skills.json  projects/  education.txt  current_status.txt",
    "cat current_status.txt",
    "Estudiando actualmente en UPC",
    "9no ciclo de Ingeniería de Software"
  ] : [
    "who am i?",
    "Michael Carmelino Dueñas - Software Engineer",
    "ls -la",
    "skills.json  projects/  education.txt  current_status.txt",
    "cat current_status.txt",
    "Currently studying at UPC",
    "9th semester of Software Engineering"
  ];

  return (
    <section id="home" className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center pt-6 pb-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="hero-in inline-flex items-center gap-2 px-5 py-2 rounded-full border border-orchid-400/30 bg-orchid-500/10 mb-8" style={{ animationDelay: '0.1s' }}>
              <Sparkles size={14} className="text-azure-300" />
              <span className="label-wide text-orchid-100">{t('hero.greeting')}</span>
            </div>

            <h1 className="mb-6 leading-none">
              <span
                className="hero-in block font-display font-black text-[2.9rem] sm:text-7xl xl:text-8xl tracking-[0.08em] text-gradient drop-shadow-[0_0_35px_rgba(147,51,234,0.45)]"
                style={{ animationDelay: '0.25s' }}
              >
                Michael
              </span>
              <span
                className="hero-in block font-script text-5xl sm:text-7xl xl:text-[5.5rem] text-white mt-2 sm:-mt-1 pl-2 sm:pl-10"
                style={{ animationDelay: '0.45s' }}
              >
                Carmelino Dueñas
              </span>
            </h1>

            <div className="hero-in h-8 mb-8 overflow-hidden" style={{ animationDelay: '0.6s' }}>
              <p key={roleIndex} className="font-wide text-xs sm:text-sm uppercase tracking-[0.4em] text-azure-300 animate-fade-in-up">
                {roles[roleIndex]}
              </p>
            </div>

            <p
              className="hero-in text-lg sm:text-xl font-light text-orchid-50/80 mb-10 max-w-xl border-l-2 border-orchid-400 pl-5 leading-relaxed"
              style={{ animationDelay: '0.75s' }}
            >
              {t('hero.intro')}
            </p>

            <div className="hero-in flex flex-wrap gap-3 mb-10" style={{ animationDelay: '0.85s' }}>
              <span className="chip inline-flex items-center gap-2">
                <FileCode size={14} className="text-orchid-300" />
                {t('hero.projects')}
              </span>
              <span className="chip inline-flex items-center gap-2">
                <Cpu size={14} className="text-azure-300" />
                {t('hero.fullstack')}
              </span>
              <a href="#arcade" className="chip inline-flex items-center gap-2 hover:bg-azure-400/20 transition-colors">
                <Gamepad2 size={14} className="text-white" />
                Arcade
              </a>
            </div>

            <div className="hero-in flex flex-col sm:flex-row gap-4" style={{ animationDelay: '1s' }}>
              <a href="mailto:carmelino0213@gmail.com" className="btn-glow">
                <Mail size={16} />
                {t('hero.contact')}
              </a>
              <a
                href="https://www.linkedin.com/in/michael-carmelino-due%C3%B1as-a5117a264/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <a href="https://github.com/stxfxno" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Github size={16} />
                GitHub
              </a>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-5 hero-in" style={{ animationDelay: '0.9s' }}>
            <div className="relative animate-float">
              {/* Anillos orbitales decorativos */}
              <div className="absolute -inset-10 rounded-full border border-orchid-400/20 animate-spin-slow" />
              <div className="absolute -inset-20 rounded-full border border-dashed border-azure-400/15 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
              <span className="absolute -top-8 left-1/2 w-3 h-3 rounded-full bg-azure-400 shadow-[0_0_20px_#38bdf8]" />
              <span className="absolute -bottom-6 right-6 w-2 h-2 rounded-full bg-orchid-300 shadow-[0_0_16px_#c38dff]" />
              <div className="absolute inset-0 bg-orchid-600/30 blur-3xl rounded-3xl" />
              <div className="relative">
                <Terminal commands={terminalCommands} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <a href="#projects" className="hidden md:flex flex-col items-center gap-2 mx-auto mt-14 text-orchid-200/70 hover:text-white transition-colors">
        <span className="label-wide">{t('hero.scroll')}</span>
        <ChevronDown size={18} className="animate-bounce" />
      </a>

      {/* Cinta de tecnologías */}
      <div className="relative mt-12 py-5 border-y border-orchid-500/20 bg-orchid-900/10 overflow-hidden -rotate-1">
        <div className="flex w-max animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center font-display text-2xl sm:text-3xl tracking-[0.12em] px-8 whitespace-nowrap text-white/90">
              {item}
              <span className={`ml-16 text-lg ${i % 2 ? 'text-azure-400' : 'text-orchid-400'}`}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
