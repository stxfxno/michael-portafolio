import { Heart, Github, Linkedin, Mail, Code, Coffee } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              Michael Carmelino
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Code size={12} className="mr-1" />
                DEV
              </span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Estudiante de Ingeniería de Software apasionado por el desarrollo web, aplicaciones móviles y seguridad informática.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/stxfxno"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/michael-carmelino-dueñas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:carmelino0213@gmail.com"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {['Inicio', 'Sobre mí', 'Habilidades', 'Proyectos', 'Experiencia', 'Educación', 'Contacto'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {'>'} {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tecnologías Utilizadas</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Tailwind CSS', 'Vite'].map((tech) => (
                <span 
                  key={tech}
                  className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <span className="text-green-600 dark:text-green-400">$</span>
                  <span className="ml-2 text-gray-800 dark:text-gray-200">npx create-awesome-portfolio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 flex items-center">
              &copy; {currentYear} Michael Carmelino Dueñas. Todos los derechos reservados.
            </p>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <span className="text-gray-600 dark:text-gray-400 flex items-center">
                Hecho con 
                <Heart size={16} className="mx-1 text-red-500" fill="currentColor" />
                y
                <Coffee size={16} className="mx-1 text-amber-700 dark:text-amber-500" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;