import { useState } from 'react';
import { Sun, Moon, Menu, X, Globe, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useLocation, Link } from 'react-router-dom';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Detectar si estamos en la página de más proyectos
  const isMoreProjectsPage = location.pathname === '/more-projects';

  const navItems = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.experience'), href: '#experience' },
    { name: t('nav.education'), href: '#education' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <nav className={`sticky top-0 z-50 ${darkMode ? 'dark bg-gray-800 text-white' : 'bg-light-card text-light-text border-b border-light-border'} shadow-md py-4 transition-all duration-300`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold">Michael Carmelino</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isMoreProjectsPage ? (
              // Mostrar botón de volver cuando estamos en More Projects
              <Link
                to="/"
                className={`flex items-center ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors duration-200`}
              >
                <ArrowLeft size={18} className="mr-2" />
                {t('back.to.home')}
              </Link>
            ) : (
              // Mostrar navegación normal en la página principal
              navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors duration-200`}
                >
                  {item.name}
                </a>
              ))
            )}

            {/* Botón de idioma */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center"
              aria-label="Toggle language"
            >
              <Globe size={20} className="mr-1" />
              <span className="text-xs font-medium">{language === 'es' ? 'EN' : 'ES'}</span>
            </button>

            {/* Botón de tema */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          
          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            {/* Botón de idioma (móvil) */}
            <button
              onClick={toggleLanguage}
              className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle language"
            >
              <Globe size={20} />
            </button>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            {isMoreProjectsPage ? (
              <Link
                to="/"
                className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <ArrowLeft size={18} className="mr-2" />
                {t('back.to.home')}
              </Link>
            ) : (
              navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
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