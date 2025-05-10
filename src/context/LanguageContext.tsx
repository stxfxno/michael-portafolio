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
    'hero.intro': 'Estudiante de séptimo ciclo, me gusta aprender sobre nuevas tecnologías y adaptarme a ellas.',
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
    'projects.repository': 'Repositorio',
    'projects.resources': 'Recursos',
    'projects.figma': 'Figma',
    
    // More Projects
    'moreprojects.title': 'Otros Proyectos',
    'moreprojects.description': 'Además de mis proyectos principales, he desarrollado varias soluciones para responder a necesidades específicas y explorar diferentes tecnologías. Cada uno de estos proyectos representa un desafío diferente que me ha ayudado a crecer como desarrollador.',
    
    // Experience
    'experience.title': 'Experiencia Laboral',
    'experience.resources': 'Ver recursos',
    'experience.job1.title': 'Sprinta AI Desarrollador Full Stack',
    'experience.job1.period': 'Febrero - Actualidad',
    'experience.job1.desc1': 'Desarrollé y mantuve aplicaciones web utilizando React, Typescript y Supabase.',
    'experience.job1.desc2': 'Colaboré en la implementación de nuevas funcionalidades y mejoras de rendimiento.',
    'experience.job2.title': 'Desarrollador Freelancer',
    'experience.job2.period': 'Octubre 2024 - Actualidad',
    'experience.job2.desc1': 'He desarrollador proyectos para clientes, especialmente en el desarrollo de Landing Pgs y aplicaciones web.',
    'experience.job2.desc2': 'Realicé trabajos de diseño y desarrollo de aplicaciones web, incluyendo la creación de interfaces de usuario atractivas y funcionales.',
    'experience.job3.title': 'Instructor de Fundamentos de Programación',
    'experience.job3.period': 'Mayo - Noviembre 2023',
    'experience.job3.desc1': 'Impartí clases de lógica y programación en Java a estudiantes de España.',
    'experience.job3.desc2': 'Brindé asesorías personalizadas y revisé tareas académicas, ayudando a mejorar su comprensión y desempeño en el área.',
    
    // Education
    'education.title': 'Educación y Certificaciones',
    'education.subtitle1': 'Educación',
    'education.subtitle2': 'Certificaciones Técnicas',
    'education.viewall': 'Ver todos los certificados',
    'education.viewcert': 'Ver certificado',
    'education.note': 'Estos son algunos de mis certificados. Para ver todos mis cursos y certificaciones:',
    'education.upc.degree': 'Ingeniería de Software',
    'education.upc.period': '2022 - Presente',
    'education.upc.desc': 'Estudiante de séptimo ciclo de la carrera de Ingeniería de Software. Enfocado en desarrollo web, aplicaciones móviles y seguridad informática.',
    'education.britanico.degree': 'Inglés',
    'education.britanico.period': 'Octubre 2021',
    'education.britanico.desc': 'Estudios de inglés para mejor comunicación durante viajes familiares a Estados Unidos.',
    
    // Certifications
    'cert.data.title': 'Fundamentos Profesionales de Análisis de Datos',
    'cert.data.issuer': 'Microsoft',
    'cert.data.date': '2023',
    'cert.data.desc': 'Mejoré mis conocimientos en análisis de datos en temas teóricos, complementando la experiencia previa en el curso de Diseño de Bases de Datos.',
    'cert.python.title': 'Estructura de Datos en Python',
    'cert.python.issuer': 'Udemy',
    'cert.python.date': '2023',
    'cert.python.desc': 'Aprendí y reforcé los conocimientos previos sobre estructura de datos aprendidos durante la Universidad.',
    'cert.scrum.title': 'Fundamentos de Scrum',
    'cert.scrum.issuer': 'Coursera',
    'cert.scrum.date': '2023',
    'cert.scrum.desc': 'Curso para mejorar la gestión de reuniones y proyectos tanto individuales como universitarios.',
    'cert.mongo.title': 'Base de Datos con MongoDB',
    'cert.mongo.issuer': 'Udemy',
    'cert.mongo.date': '2023',
    'cert.mongo.desc': 'Curso complementario para la materia de Diseño de Base de Datos, enfocado en el manejo de bases de datos no relacionales.',
    
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
    'footer.made': 'Hecho con',
    'footer.and': 'y',
    
    // Common
    'back.to.home': 'Volver al inicio',
  },
  en: {
    // Hero Section
    'software.engineer': 'Software Engineer',
    'hero.intro': 'Software Engineering student in the 7th semester. I enjoy learning about new technologies and adapting to them.',
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
    'projects.repository': 'Repository',
    'projects.resources': 'Resources',
    'projects.figma': 'Figma',
    
    // More Projects
    'moreprojects.title': 'Other Projects',
    'moreprojects.description': 'In addition to my main projects, I have developed various solutions to address specific needs and explore different technologies. Each of these projects represents a different challenge that has helped me grow as a developer.',
    
    // Experience
    'experience.title': 'Work Experience',
    'experience.resources': 'View resources',
    'experience.job1.title': 'Sprinta AI Full Stack Developer',
    'experience.job1.period': 'February - Present',
    'experience.job1.desc1': 'Developed and maintained web applications using React, Typescript, and Supabase.',
    'experience.job1.desc2': 'Collaborated on implementing new features and performance improvements.',
    'experience.job2.title': 'Freelance Developer',
    'experience.job2.period': 'October 2024 - Present',
    'experience.job2.desc1': 'I have developed projects for clients, especially in the development of Landing Pages and web applications.',
    'experience.job2.desc2': 'I performed design and development work for web applications, including creating attractive and functional user interfaces.',
    'experience.job3.title': 'Programming Fundamentals Instructor',
    'experience.job3.period': 'May - November 2023',
    'experience.job3.desc1': 'I taught Java programming and logic to students from Spain.',
    'experience.job3.desc2': 'I provided personalized advice and reviewed academic assignments, helping to improve their understanding and performance in the area.',
    
    // Education
    'education.title': 'Education and Certifications',
    'education.subtitle1': 'Education',
    'education.subtitle2': 'Technical Certifications',
    'education.viewall': 'View all certificates',
    'education.viewcert': 'View certificate',
    'education.note': 'These are some of my certificates. To see all my courses and certifications:',
    'education.upc.degree': 'Software Engineering',
    'education.upc.period': '2022 - Present',
    'education.upc.desc': 'Seventh semester student in Software Engineering. Focused on web development, mobile applications, and computer security.',
    'education.britanico.degree': 'English',
    'education.britanico.period': 'October 2021',
    'education.britanico.desc': 'English studies for better communication during family trips to the United States.',
    
    // Certifications
    'cert.data.title': 'Professional Foundations of Data Analysis',
    'cert.data.issuer': 'Microsoft',
    'cert.data.date': '2023',
    'cert.data.desc': 'I improved my knowledge in data analysis on theoretical topics, complementing previous experience in the Database Design course.',
    'cert.python.title': 'Data Structures in Python',
    'cert.python.issuer': 'Udemy',
    'cert.python.date': '2023',
    'cert.python.desc': 'I learned and reinforced previous knowledge about data structures learned during University.',
    'cert.scrum.title': 'Scrum Fundamentals',
    'cert.scrum.issuer': 'Coursera',
    'cert.scrum.date': '2023',
    'cert.scrum.desc': 'Course to improve the management of meetings and projects, both individual and university-related.',
    'cert.mongo.title': 'Database with MongoDB',
    'cert.mongo.issuer': 'Udemy',
    'cert.mongo.date': '2023',
    'cert.mongo.desc': 'Complementary course for the Database Design subject, focused on managing non-relational databases.',
    
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