import { Code, ExternalLink, Github, Calendar, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  title: string;
  description: string;
  period: string;
  technologies: string[];
  image: string;
  icon?: React.ReactNode;
  links: {
    live?: string;
    github?: string;
    resources?: string;
  };
}

const MoreProjects = () => {
  const additionalProjects: Project[] = [
    {
      title: "Listify MP3 Downloader",
      description: "Programa en Python que automatiza la búsqueda y descarga de canciones desde YouTube a partir de una lista en formato TXT. Utiliza APIs para la búsqueda eficiente y herramientas de conversión para obtener archivos MP3 de alta calidad.",
      period: "2024 (febrero)",
      technologies: ["Python", "YouTube API", "FFmpeg", "Requests"],
      image: "/images/chat_app_platform.png", // Usa una imagen existente como fallback
      icon: <Terminal className="text-yellow-500 mr-2" size={18} />,
      links: {
        github: "https://github.com/stxfxno/Listify"
      }
    },
    {
      title: "App Móvil simulador de ID Cards",
      description: "Aplicación móvil que simula la generación de ID Cards universitarias para evidenciar vulnerabilidades en sistemas de autenticación. Permite personalizar datos, códigos QR y fotografías para crear credenciales virtuales con fines educativos sobre seguridad.",
      period: "2024 (octubre-noviembre)",
      technologies: ["Android Studio", "Kotlin", "XML", "ZXing"],
      image: "/images/manage_wise.png", // Usa una imagen existente como fallback
      icon: <Code className="text-green-500 mr-2" size={18} />,
      links: {
        resources: "https://drive.google.com/drive/folders/17J6zYYErU9Eb1igGqsxbPsz09T2Pio_R?usp=sharing"
      }
    },
    {
      title: "Generador de Horarios Falsos",
      description: "Herramienta para evidenciar fallos de seguridad en el sistema de acceso universitario. Incluye opciones para configurar cursos, profesores, aulas y horarios, exportando el resultado final en un formato visual idéntico al oficial.",
      period: "2024 (julio)",
      technologies: ["HTML", "CSS", "JavaScript", "Canvas API"],
      image: "/images/matricula_upc.png", // Usa una imagen existente como fallback
      icon: <Code className="text-blue-500 mr-2" size={18} />,
      links: {
        live: "https://stefware-upc-horarios.netlify.app/"
      }
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Otros Proyectos</h2>
          
          <Link 
            to="/" 
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <span className="mr-2">←</span>
            Volver al inicio
          </Link>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-3xl">
          Además de mis proyectos principales, he desarrollado varias soluciones para responder a necesidades específicas y explorar diferentes tecnologías. Cada uno de estos proyectos representa un desafío diferente que me ha ayudado a crecer como desarrollador.
        </p>
        
        <div className="space-y-8">
          {additionalProjects.map((project, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row">
                {/* Imagen a la izquierda */}
                <div className="relative md:w-1/3">
                  <img
                    src={project.image}
                    alt={`Captura de ${project.title}`}
                    className="w-full h-64 object-cover object-top"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center text-sm text-white">
                      <Calendar size={14} className="mr-2" />
                      {project.period}
                    </div>
                  </div>
                </div>
                
                {/* Contenido a la derecha */}
                <div className="p-6 md:w-2/3">
                  <div className="flex items-center mb-3">
                    {project.icon}
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      >
                        <ExternalLink size={14} />
                        Demo
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Github size={14} />
                        Repositorio
                      </a>
                    )}
                    {project.links.resources && (
                      <a
                        href={project.links.resources}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                      >
                        <ExternalLink size={14} />
                        Recursos
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreProjects;