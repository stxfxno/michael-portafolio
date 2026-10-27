import { useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import Reveal from './Reveal';
import Scribble from './Scribble';
import Smoke from './Smoke';
import { useLanguage } from '../context/LanguageContext';

// Sección "¡HOLA!" inspirada en la ficha de presentación con humo
const About = () => {
  const { language } = useLanguage();
  const es = language === 'es';
  // Si existe /images/michael.jpg se muestra como retrato; si no, un monograma
  const [hasPhoto, setHasPhoto] = useState(true);

  const columns = es
    ? [
        { title: 'Idiomas', lines: ['Español — nativo', 'Inglés — avanzado'] },
        { title: 'Educación', lines: ['Ingeniería de Software', 'UPC · 9no ciclo'] },
        { title: 'Software', lines: ['VS Code', 'Figma', 'Postman', 'Git / GitHub'] },
        { title: 'Skills', lines: ['Frontend', 'Backend', 'Apps móviles', 'UI / UX'] },
        { title: 'Experiencia', lines: ['Full time', 'Freelance', 'Docencia'] },
      ]
    : [
        { title: 'Languages', lines: ['Spanish — native', 'English — advanced'] },
        { title: 'Education', lines: ['Software Engineering', 'UPC · 9th semester'] },
        { title: 'Software', lines: ['VS Code', 'Figma', 'Postman', 'Git / GitHub'] },
        { title: 'Skills', lines: ['Frontend', 'Backend', 'Mobile apps', 'UI / UX'] },
        { title: 'Experience', lines: ['Full time', 'Freelance', 'Teaching'] },
      ];

  return (
    <section id="about" className="relative py-24 overflow-hidden scroll-mt-10">
      <Smoke className="absolute inset-y-0 right-[-10%] w-[70%] md:w-[45%] h-full opacity-70" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="relative border border-paper/25 p-6 sm:p-10 bg-ink/40 backdrop-blur-[1px]">
            <span className="absolute -top-3 left-8 tag bg-ink px-3 text-violet">01. {es ? 'Sobre mí' : 'About me'}</span>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Retrato + contacto */}
              <div className="lg:col-span-4">
                <div className="group relative aspect-[4/5] max-w-xs border border-paper/20 overflow-hidden bg-coal">
                  {hasPhoto ? (
                    <img
                      src="/images/michael.jpg"
                      alt="Michael Carmelino"
                      onError={() => setHasPhoto(false)}
                      className="photo w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col justify-between p-5">
                      <span className="tag text-paper/50">Retrato / Portrait</span>
                      <span className="font-display text-[9rem] leading-[0.8] text-paper">
                        M<span className="font-serif italic text-violet">c</span>
                      </span>
                      <span className="relative z-10 font-hand text-xl text-paper mb-10">Michael C. Dueñas</span>
                    </div>
                  )}
                  <div className="absolute bottom-6 -left-4 w-2/3 h-6 bg-violet/80 -rotate-6" />
                </div>

                <h3 className="font-wide uppercase text-lg mt-8 mb-4">{es ? 'Contacto' : 'Contact'}</h3>
                <ul className="space-y-3 text-paper/80">
                  <li>
                    <a href="mailto:carmelino0213@gmail.com" className="flex items-center gap-3 hover:text-violet transition-colors">
                      <Mail size={16} /> carmelino0213@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/stxfxno" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-violet transition-colors">
                      <Github size={16} /> github.com/stxfxno
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/michael-carmelino-due%C3%B1as-a5117a264/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-violet transition-colors">
                      <Linkedin size={16} /> Michael Carmelino Dueñas
                    </a>
                  </li>
                </ul>
              </div>

              {/* Texto + columnas */}
              <div className="lg:col-span-8">
                <div className="relative flex justify-end mb-6">
                  <h2 className="font-wide uppercase text-6xl sm:text-8xl leading-none">
                    {es ? '¡Hola!' : 'Hello!'}
                  </h2>
                  <Scribble shape="star" className="absolute right-0 -top-8 w-10 h-10" strokeWidth={2.5} color="#3d5afe" />
                </div>
                <p className="font-serif text-2xl sm:text-3xl leading-snug text-paper/90 mb-4">
                  {es ? (
                    <>Soy <span className="italic text-violet">Michael</span>, estudiante de Ingeniería de Software en la UPC y desarrollador full stack.</>
                  ) : (
                    <>I'm <span className="italic text-violet">Michael</span>, a Software Engineering student at UPC and a full stack developer.</>
                  )}
                </p>
                <p className="text-paper/65 leading-relaxed mb-10 max-w-2xl">
                  {es
                    ? 'Me gusta aprender nuevas tecnologías y adaptarme a ellas. He construido plataformas para clínicas, empresas de transporte y startups, cuidando tanto el código como la experiencia de quien lo usa.'
                    : 'I enjoy learning new technologies and adapting to them. I have built platforms for clinics, transport companies and startups, caring about both the code and the experience of the people using it.'}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-paper/25">
                  {columns.map((col) => (
                    <div key={col.title} className="pt-5 pb-3 pr-4 border-r border-paper/15 last:border-r-0">
                      <h4 className="font-wide uppercase text-sm mb-3">{col.title}</h4>
                      <ul className="space-y-1 text-sm text-paper/60">
                        {col.lines.map((l) => (
                          <li key={l}>{l}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
