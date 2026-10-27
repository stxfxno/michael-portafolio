import { Github, Linkedin, Mail, Code } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const links = [
    { name: t('nav.home'), href: '/#home' },
    { name: t('nav.projects'), href: '/#projects' },
    { name: t('nav.skills'), href: '/#skills' },
    { name: t('nav.experience'), href: '/#experience' },
    { name: t('nav.education'), href: '/#education' },
    { name: t('nav.arcade'), href: '/#arcade' },
    { name: t('nav.contact'), href: '/#contact' },
  ];

  return (
    <footer className="relative mt-16 pt-20 pb-10 border-t border-orchid-500/20 bg-gradient-to-b from-transparent to-orchid-900/20 overflow-hidden">
      <div className="ornament absolute top-0 left-0 right-0" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.1em] text-gradient leading-none">
            Michael
          </p>
          <p className="font-script text-4xl sm:text-6xl text-white/90 -mt-2">Carmelino</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <h3 className="label-wide text-azure-300 mb-5 flex items-center gap-2">
              <Code size={13} />
              Dev
            </h3>
            <p className="text-orchid-50/70 font-light mb-6 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              {[
                { href: 'https://github.com/stxfxno', label: 'GitHub', icon: <Github size={18} /> },
                { href: 'https://www.linkedin.com/in/michael-carmelino-due%C3%B1as-a5117a264/', label: 'LinkedIn', icon: <Linkedin size={18} /> },
                { href: 'mailto:carmelino0213@gmail.com', label: 'Email', icon: <Mail size={18} /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-3 rounded-full border border-orchid-400/30 text-orchid-100 hover:text-white hover:border-azure-400 hover:bg-azure-400/10 hover:shadow-[0_0_20px_-4px_#38bdf8] transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="label-wide text-azure-300 mb-5">{t('footer.links')}</h3>
            <ul className="grid grid-cols-2 gap-y-3">
              {links.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-orchid-50/70 hover:text-white hover:pl-1 transition-all duration-200">
                    <span className="text-orchid-400 mr-2">✦</span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label-wide text-azure-300 mb-5">{t('footer.tech')}</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Canvas API'].map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-orchid-500/15 text-center">
          <p className="label-wide text-orchid-100/50">
            &copy; {currentYear} Michael Carmelino Dueñas · {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
