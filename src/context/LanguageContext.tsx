import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

// Traducciones completas para toda la aplicación
const translations: Record<Language, Record<string, string>> = {
  es: {
    // Hero Section
    'software.engineer': 'Ingeniero de Software',
    'hero.intro': 'Estudiante de 5to año de Ingeniería de Software, me gusta aprender sobre nuevas tecnologías y adaptarme a ellas.',
    'hero.projects': '8+ Proyectos',
    'hero.fullstack': 'Desarrollo Full-Stack',
    'hero.contact': 'Contacto',
    
    // Navbar
    'nav.home': 'Inicio',
    'nav.skills': 'Habilidades',
    'nav.projects': 'Proyectos',
    'nav.experience': 'Experiencia',
    'nav.education': 'Educación',
    'nav.contact': 'Contacto',
    
    // Skills
    'skills.title': 'Habilidades Técnicas',
    'skills.languages': 'Lenguajes',
    'skills.frameworks': 'Frameworks',
    'skills.databases': 'Bases de Datos',
    'skills.tools': 'Herramientas',
    'skills.design': 'Diseño',
    'skills.others': 'Otros',
    
    // Projects
    'projects.title': 'Proyectos',
    'projects.description': 'Una selección de los proyectos en los que he trabajado',
    'projects.see.more': 'Ver más proyectos',
    'projects.see.github': 'Ver más en GitHub',
    'projects.demo': 'Demo',
    'projects.viewnow': 'Ver ahora',
    'projects.repository': 'Repositorio',
    'projects.resources': 'Recursos',
    'projects.figma': 'Figma',
    
    // More Projects
    'moreprojects.title': 'Otros Proyectos',
    'moreprojects.description': 'Además de mis proyectos principales, he desarrollado varias soluciones para responder a necesidades específicas y explorar diferentes tecnologías. Cada uno de estos proyectos representa un desafío diferente que me ha ayudado a crecer como desarrollador.',
    
    // Experience
    'experience.title': 'Experiencia Laboral',
    'experience.subtitle': 'Mi trayectoria profesional como desarrollador',
    'experience.resources': 'Ver recursos',
    'experience.job1.title': 'Desarrollador Full Stack',
    'experience.job1.company': 'Sprinta AI',
    'experience.job1.period': 'Feb 2025 - Jun 2026',
    'experience.job1.desc1': 'Desarrollé y mantuve la plataforma web de Sprinta AI utilizando React, TypeScript y Supabase, implementando nuevas funcionalidades del agente de ventas por WhatsApp.',
    'experience.job1.desc2': 'Colaboré en la optimización del CRM integrado y mejoras de rendimiento de la aplicación.',
    'experience.job4.title': 'Desarrollador Full Stack',
    'experience.job4.company': 'Eemerson SAC',
    'experience.job4.period': 'Octubre 2025 - Febrero 2026',
    'experience.job4.desc1': 'Desarrollé PayBox (Next.js 14 + Supabase): gestión de pagos a conductores con exportación a Excel, flota GPS vía Navitel y portal móvil-first para conductores con OCR automático.',
    'experience.job4.desc2': 'Integré la API de SUNAT vía OAuth para descarga de GRE y guías de remisión electrónicas, y la API de Odoo ERP para sincronización automática de alertas de vencimientos documentarios.',
    'experience.job4.desc3': 'Administré directamente la plataforma Odoo ERP del cliente e implementé cron jobs para automatización de alertas y sincronización periódica de datos.',
    'experience.job2.title': 'Desarrollador Web',
    'experience.job2.company': 'Freelance',
    'experience.job2.period': 'Octubre 2024 - Presente',
    'experience.job2.desc1': 'Desarrollé proyectos para clientes de distintos rubros, especialmente páginas web, landing pages y plataformas a medida.',
    'experience.job2.desc2': 'Diseñé y desarrollé interfaces de usuario atractivas y funcionales, adaptando cada solución a las necesidades específicas de cada cliente.',
    'experience.job3.title': 'Instructor de Programación',
    'experience.job3.company': 'Educación Online',
    'experience.job3.period': 'Mayo - Noviembre 2023',
    'experience.job3.desc1': 'Impartí clases de lógica y programación en Java a estudiantes de España.',
    'experience.job3.desc2': 'Brindé asesorías personalizadas y revisé tareas académicas, ayudando a mejorar su comprensión y desempeño en el área.',
    
    // Education
    'education.title': 'Educación y Certificaciones',
    'education.subtitle': 'Mi formación académica y certificaciones técnicas',
    'education.subtitle1': 'Educación',
    'education.subtitle2': 'Certificaciones Técnicas',
    'education.viewall': 'Ver todos los certificados',
    'education.viewcert': 'Ver certificado',
    'education.note': 'Estos son algunos de mis certificados. Para ver todos mis cursos y certificaciones:',
    'education.upc.degree': 'Ingeniería de Software',
    'education.upc.period': '2022 - Presente',
    'education.upc.desc': 'Estudiante de noveno ciclo de la carrera de Ingeniería de Software. Enfocado en desarrollo web, aplicaciones móviles y seguridad informática.',
    'education.britanico.degree': 'Inglés',
    'education.britanico.period': 'Octubre 2021',
    'education.britanico.desc': 'Estudios de inglés para mejor comunicación durante viajes familiares a Estados Unidos.',
    
    // Certifications
    'cert.data.title': 'Fundamentos Profesionales de Análisis de Datos',
    'cert.data.issuer': 'Microsoft',
    'cert.data.date': '2023',
    'cert.data.desc': 'Mejoré mis conocimientos en análisis de datos en temas teóricos, complementando la experiencia previa en el curso de Diseño de Bases de Datos.',
    'cert.python.title': 'Estructura de Datos en Python',
    'cert.python.issuer': 'University of Michigan / Coursera',
    'cert.python.date': '2023',
    'cert.python.desc': 'Aprendí y reforcé los conocimientos previos sobre estructura de datos aprendidos durante la Universidad.',
    'cert.scrum.title': 'Fundamentos de Scrum',
    'cert.scrum.issuer': 'Coursera',
    'cert.scrum.date': '2023',
    'cert.scrum.desc': 'Curso para mejorar la gestión de reuniones y proyectos tanto individuales como universitarios.',
    'cert.mongo.title': 'Base de Datos con MongoDB',
    'cert.mongo.issuer': 'MongoDB',
    'cert.mongo.date': '2023',
    'cert.mongo.desc': 'Curso complementario para la materia de Diseño de Base de Datos, enfocado en el manejo de bases de datos no relacionales.',
    'cert.itsupport.title': 'Google IT Support',
    'cert.itsupport.issuer': 'Google / Coursera',
    'cert.itsupport.date': 'Abril 2026',
    'cert.itsupport.desc': 'Certificado profesional de 6 cursos enfocado en soporte técnico, redes informáticas, sistemas operativos, administración de sistemas e infraestructura TI.',
    'cert.excel.title': 'Excel Skills for Business',
    'cert.excel.issuer': 'Macquarie University / Coursera',
    'cert.excel.date': 'Diciembre 2025',
    'cert.excel.desc': 'Especialización de 4 cursos sobre habilidades avanzadas de Excel para negocios, incluyendo dashboards profesionales, automatización y análisis de datos.',

    // Contact
    'contact.title': 'Contacto',
    'contact.subtitle': 'Envíame un Mensaje',
    'contact.name': 'Nombre',
    'contact.email': 'Email',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar Mensaje',
    'contact.sending': 'Enviando...',
    'contact.success': '¡Mensaje enviado con éxito! Te responderé lo antes posible.',
    'contact.error': 'Error al enviar el mensaje. Por favor intenta nuevamente o contáctame directamente por correo.',
    'contact.your.name': 'Tu nombre',
    'contact.your.email': 'tu@email.com',
    'contact.your.message': 'Escribe tu mensaje aquí...',
    'contact.note': 'Espero tu mensaje!',
    
    // Footer
    'footer.description': 'Estudiante de Ingeniería de Software apasionado por el desarrollo web, aplicaciones móviles y seguridad informática.',
    'footer.links': 'Enlaces Rápidos',
    'footer.tech': 'Tecnologías Utilizadas',
    'footer.rights': 'Todos los derechos reservados.',
    
    // Common
    'back.to.home': 'Volver al inicio',
  },
  en: {
    // Hero Section
    'software.engineer': 'Software Engineer',
    'hero.intro': '5th year Software Engineering student. I enjoy learning about new technologies and adapting to them.',
    'hero.projects': '8+ Projects',
    'hero.fullstack': 'Full-Stack Development',
    'hero.contact': 'Contact',
    
    // Navbar
    'nav.home': 'Home',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.education': 'Education',
    'nav.contact': 'Contact',
    
    // Skills
    'skills.title': 'Technical Skills',
    'skills.languages': 'Languages',
    'skills.frameworks': 'Frameworks',
    'skills.databases': 'Databases',
    'skills.tools': 'Tools',
    'skills.design': 'Design',
    'skills.others': 'Others',
    
    // Projects
    'projects.title': 'Projects',
    'projects.description': 'A selection of projects I have worked on',
    'projects.see.more': 'See More Projects',
    'projects.see.github': 'See More on GitHub',
    'projects.demo': 'Demo',
    'projects.viewnow': 'View now',
    'projects.repository': 'Repository',
    'projects.resources': 'Resources',
    'projects.figma': 'Figma',
    
    // More Projects
    'moreprojects.title': 'Other Projects',
    'moreprojects.description': 'In addition to my main projects, I have developed various solutions to address specific needs and explore different technologies. Each of these projects represents a different challenge that has helped me grow as a developer.',
    
    // Experience
    'experience.title': 'Work Experience',
    'experience.subtitle': 'My professional journey as a developer',
    'experience.resources': 'View resources',
    'experience.job1.title': 'Full Stack Developer',
    'experience.job1.company': 'Sprinta AI',
    'experience.job1.period': 'Feb 2025 - Jun 2026',
    'experience.job1.desc1': 'Developed and maintained the Sprinta AI web platform using React, TypeScript, and Supabase, implementing new features for the WhatsApp AI sales agent.',
    'experience.job1.desc2': 'Collaborated on CRM optimization and overall application performance improvements.',
    'experience.job4.title': 'Full Stack Developer',
    'experience.job4.company': 'Eemerson SAC',
    'experience.job4.period': 'October 2025 - February 2026',
    'experience.job4.desc1': 'Built PayBox (Next.js 14 + Supabase): driver payment management with Excel export, GPS fleet tracking via Navitel, and a mobile-first driver portal with automatic OCR.',
    'experience.job4.desc2': 'Integrated the SUNAT API via OAuth for downloading GRE and electronic remittance guides, and the Odoo ERP API for automatic sync of document expiry alerts.',
    'experience.job4.desc3': 'Directly managed the client\'s Odoo ERP platform and implemented cron jobs for alert automation and periodic data synchronization.',
    'experience.job2.title': 'Web Developer',
    'experience.job2.company': 'Freelance',
    'experience.job2.period': 'October 2024 - Present',
    'experience.job2.desc1': 'Developed projects for clients across various industries, specializing in websites, landing pages, and custom-built platforms.',
    'experience.job2.desc2': 'Designed and developed attractive, functional user interfaces tailored to each client\'s specific needs.',
    'experience.job3.title': 'Programming Instructor',
    'experience.job3.company': 'Online Education',
    'experience.job3.period': 'May - November 2023',
    'experience.job3.desc1': 'I taught Java programming and logic to students from Spain.',
    'experience.job3.desc2': 'I provided personalized advice and reviewed academic assignments, helping to improve their understanding and performance in the area.',
    
    // Education
    'education.title': 'Education and Certifications',
    'education.subtitle': 'My academic background and technical certifications',
    'education.subtitle1': 'Education',
    'education.subtitle2': 'Technical Certifications',
    'education.viewall': 'View all certificates',
    'education.viewcert': 'View certificate',
    'education.note': 'These are some of my certificates. To see all my courses and certifications:',
    'education.upc.degree': 'Software Engineering',
    'education.upc.period': '2022 - Present',
    'education.upc.desc': 'Ninth semester student in Software Engineering. Focused on web development, mobile applications, and computer security.',
    'education.britanico.degree': 'English',
    'education.britanico.period': 'October 2021',
    'education.britanico.desc': 'English studies for better communication during family trips to the United States.',
    
    // Certifications
    'cert.data.title': 'Professional Foundations of Data Analysis',
    'cert.data.issuer': 'Microsoft',
    'cert.data.date': '2023',
    'cert.data.desc': 'I improved my knowledge in data analysis on theoretical topics, complementing previous experience in the Database Design course.',
    'cert.python.title': 'Data Structures in Python',
    'cert.python.issuer': 'University of Michigan / Coursera',
    'cert.python.date': '2023',
    'cert.python.desc': 'I learned and reinforced previous knowledge about data structures learned during University.',
    'cert.scrum.title': 'Scrum Fundamentals',
    'cert.scrum.issuer': 'Coursera',
    'cert.scrum.date': '2023',
    'cert.scrum.desc': 'Course to improve the management of meetings and projects, both individual and university-related.',
    'cert.mongo.title': 'Database with MongoDB',
    'cert.mongo.issuer': 'MongoDB',
    'cert.mongo.date': '2023',
    'cert.mongo.desc': 'Complementary course for the Database Design subject, focused on managing non-relational databases.',
    'cert.itsupport.title': 'Google IT Support',
    'cert.itsupport.issuer': 'Google / Coursera',
    'cert.itsupport.date': 'April 2026',
    'cert.itsupport.desc': '6-course professional certificate focused on technical support, computer networking, operating systems, system administration, and IT infrastructure.',
    'cert.excel.title': 'Excel Skills for Business',
    'cert.excel.issuer': 'Macquarie University / Coursera',
    'cert.excel.date': 'December 2025',
    'cert.excel.desc': '4-course specialization covering advanced Excel skills for business, including professional dashboards, automation, and data analysis.',

    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Send me a Message',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent successfully! I will respond as soon as possible.',
    'contact.error': 'Error sending message. Please try again or contact me directly by email.',
    'contact.your.name': 'Your name',
    'contact.your.email': 'your@email.com',
    'contact.your.message': 'Write your message here...',
    'contact.note': 'Looking forward to your message!',
    
    // Footer
    'footer.description': 'Software Engineering student passionate about web development, mobile applications, and computer security.',
    'footer.links': 'Quick Links',
    'footer.tech': 'Technologies Used',
    'footer.rights': 'All rights reserved.',
    'footer.made': 'Made with',
    'footer.and': 'and',
    
    // Common
    'back.to.home': 'Back to Home',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  const toggleLanguage = () => {
    const newLang = language === 'es' ? 'en' : 'es';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  // Función de traducción
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Al cargar, intentar leer la preferencia guardada
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};