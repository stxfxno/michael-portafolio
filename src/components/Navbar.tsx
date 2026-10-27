import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useLocation, Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const isMoreProjectsPage = location.pathname === '/more-projects';

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: t('nav.projects'), href: '/#projects' },
    { name: t('nav.skills'), href: '/#skills' },
    { name: t('nav.experience'), href: '/#experience' },
    { name: t('nav.education'), href: '/#education' },
    { name: t('nav.arcade'), href: '/#arcade' },
    { name: t('nav.contact'), href: '/#contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 mix-blend-difference text-paper">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex justify-between items-center">
          <a href="/#home" className="font-display text-2xl tracking-wide leading-none">
            M<span className="font-serif italic text-3xl">c</span>.
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {isMoreProjectsPage ? (
              <Link to="/" className="tag flex items-center gap-2 hover:underline underline-offset-4">
                <ArrowLeft size={14} />
                {t('back.to.home')}
              </Link>
            ) : (
              navItems.map((item, i) => (
                <a key={item.href} href={item.href} className="tag group flex items-baseline gap-1.5">
                  <span className="opacity-50">0{i + 1}</span>
                  <span className="group-hover:line-through decoration-2">{item.name}</span>
                </a>
              ))
            )}
            <button onClick={toggleLanguage} className="tag border border-paper px-3 py-1.5 hover:bg-paper hover:text-ink transition-colors" aria-label="Toggle language">
              {language === 'es' ? 'EN' : 'ES'}
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <button onClick={toggleLanguage} className="tag border border-paper px-3 py-1.5" aria-label="Toggle language">
              {language === 'es' ? 'EN' : 'ES'}
            </button>
            <button onClick={() => setIsMenuOpen(true)} className="tag" aria-label="Open menu">
              Menú ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Progreso de lectura */}
      <div className="fixed top-0 left-0 z-50 h-1 bg-violet" style={{ width: `${progress}%` }} />

      {/* Menú móvil a pantalla completa */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[70] bg-violet text-ink flex flex-col px-6 py-6 fade-up">
          <div className="flex justify-between items-center mb-10">
            <span className="font-display text-2xl">Mc.</span>
            <button onClick={() => setIsMenuOpen(false)} className="tag border border-ink px-3 py-1.5" aria-label="Close menu">
              ✕ {language === 'es' ? 'Cerrar' : 'Close'}
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-1">
            {isMoreProjectsPage ? (
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="font-display text-6xl uppercase">
                ← {t('back.to.home')}
              </Link>
            ) : (
              navItems.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-baseline gap-3 font-display text-[13vw] leading-[1.05] uppercase"
                >
                  <span className="tag">0{i + 1}</span>
                  {item.name}
                </a>
              ))
            )}
          </div>
          <p className="font-hand text-xl">Michael Carmelino Dueñas</p>
        </div>
      )}
    </>
  );
};

export default Navbar;
