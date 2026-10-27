import { useEffect, useState } from 'react';
import { Menu, X, Globe, ArrowLeft, Gamepad2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useLocation, Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  // Detectar si estamos en la página de más proyectos
  const isMoreProjectsPage = location.pathname === '/more-projects';

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 30);
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.experience'), href: '#experience' },
    { name: t('nav.education'), href: '#education' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-void/75 backdrop-blur-xl border-b border-orchid-500/20 shadow-[0_10px_40px_-15px_rgba(147,51,234,0.6)]'
          : 'py-6 bg-transparent'
      }`}
    >
      {/* Barra de progreso de scroll */}
      <span
        className="absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-orchid-500 via-white to-azure-400 shadow-[0_0_10px_#a960ff]"
        style={{ width: `${progress}%` }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href={isMoreProjectsPage ? '/' : '#home'} className="group flex items-baseline gap-1 shrink-0 pr-4">
            <span className="font-display text-2xl font-black text-gradient tracking-wider">M</span>
            <span className="font-script text-3xl text-white group-hover:text-orchid-200 transition-colors">Carmelino</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-6">
            {isMoreProjectsPage ? (
              <Link to="/" className="label-wide flex items-center text-orchid-100 hover:text-azure-300 transition-colors duration-200">
                <ArrowLeft size={14} className="mr-2" />
                {t('back.to.home')}
              </Link>
            ) : (
              <>
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="label-wide !tracking-[0.22em] relative text-orchid-100/80 hover:text-white transition-colors duration-300 after:absolute after:left-0 after:-bottom-2 after:h-px after:w-0 after:bg-gradient-to-r after:from-orchid-400 after:to-azure-400 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item.name}
                  </a>
                ))}
                <a
                  href="#arcade"
                  className="label-wide flex items-center gap-2 px-4 py-2 rounded-full border border-azure-400/40 text-azure-300 hover:bg-azure-400/10 hover:shadow-[0_0_20px_-4px_#38bdf8] transition-all"
                >
                  <Gamepad2 size={14} />
                  {t('nav.arcade')}
                </a>
              </>
            )}

            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full border border-orchid-400/30 hover:border-orchid-300 hover:bg-orchid-500/10 transition-all duration-200 flex items-center gap-1"
              aria-label="Toggle language"
            >
              <Globe size={16} />
              <span className="font-wide text-[0.6rem] tracking-widest">{language === 'es' ? 'EN' : 'ES'}</span>
            </button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="xl:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full border border-orchid-400/30 hover:bg-orchid-500/10 transition-colors duration-200"
              aria-label="Toggle language"
            >
              <Globe size={18} />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full border border-orchid-400/30 hover:bg-orchid-500/10 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="xl:hidden mt-4 py-3 rounded-2xl glass-card animate-fade-in">
            {isMoreProjectsPage ? (
              <Link
                to="/"
                className="label-wide flex items-center px-5 py-3 hover:text-azure-300 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <ArrowLeft size={14} className="mr-2" />
                {t('back.to.home')}
              </Link>
            ) : (
              [...navItems, { name: t('nav.arcade'), href: '#arcade' }].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="label-wide block px-5 py-3 text-orchid-100 hover:text-white hover:bg-orchid-500/10 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
