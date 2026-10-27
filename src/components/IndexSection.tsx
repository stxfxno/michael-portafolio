import Reveal from './Reveal';
import Scribble from './Scribble';
import { useLanguage } from '../context/LanguageContext';

// Índice de contenidos inspirado en la diapositiva "INDEX"
const IndexSection = () => {
  const { language } = useLanguage();
  const es = language === 'es';

  const manifesto = es
    ? ['Código limpio', 'diseño con intención', 'Productos reales', 'hecho en Lima', 'Ingeniería de software']
    : ['Clean code', 'design with intent', 'Real products', 'made in Lima', 'Software engineering'];
  const tags = ['Web', 'Mobile', 'APIs', 'UI / UX', 'Cloud', 'ERP'];

  const items = es
    ? [
        { title: 'Sobre mí', href: '#about', desc: 'Quién soy, qué estudio y cómo trabajo.' },
        { title: 'Proyectos', href: '#projects', desc: 'Plataformas, webs y apps hechas para clientes reales.' },
        { title: 'Habilidades', href: '#skills', desc: 'Lenguajes, frameworks y herramientas del día a día.' },
        { title: 'Experiencia', href: '#experience', desc: 'Trabajo full time, freelance y docencia.' },
        { title: 'Educación', href: '#education', desc: 'UPC, Británico y certificaciones.' },
        { title: 'Arcade', href: '#arcade', desc: 'Un mini Galaga para tomarte un descanso.' },
      ]
    : [
        { title: 'About me', href: '#about', desc: 'Who I am, what I study and how I work.' },
        { title: 'Projects', href: '#projects', desc: 'Platforms, sites and apps built for real clients.' },
        { title: 'Skills', href: '#skills', desc: 'Languages, frameworks and everyday tools.' },
        { title: 'Experience', href: '#experience', desc: 'Full-time work, freelance and teaching.' },
        { title: 'Education', href: '#education', desc: 'UPC, Británico and certifications.' },
        { title: 'Arcade', href: '#arcade', desc: 'A mini Galaga to take a break.' },
      ];

  return (
    <section className="relative py-10">
      {/* Cintas cruzadas con el manifiesto */}
      <div className="relative h-52 sm:h-64 overflow-hidden">
        <div className="absolute inset-x-[-5%] top-[22%] bg-paper text-ink py-3 rotate-[-4deg] z-10">
          <div className="flex w-max animate-marquee">
            {[...manifesto, ...manifesto].map((m, i) => (
              <span key={i} className={`px-6 whitespace-nowrap text-4xl sm:text-5xl ${i % 2 ? 'font-serif italic' : 'font-display uppercase'}`}>
                {m} <span className="text-violet-deep">✦</span>
              </span>
            ))}
          </div>
        </div>
        <div className="absolute inset-x-[-5%] top-[48%] bg-violet text-ink py-2 rotate-[3deg]">
          <div className="flex w-max animate-marquee-reverse">
            {[...tags, ...tags, ...tags, ...tags].map((m, i) => (
              <span key={i} className="px-5 whitespace-nowrap tag text-sm">
                {m} ●
              </span>
            ))}
          </div>
        </div>
        <Scribble shape="squiggle" className="absolute right-[10%] bottom-2 w-40 h-16 z-20" strokeWidth={4} color="#3d5afe" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-12">
        <Reveal>
          <div className="relative inline-block mb-12 px-4">
            <h2 className="font-display uppercase text-6xl sm:text-7xl">{es ? 'Índice' : 'Index'}</h2>
            <Scribble shape="circle" className="absolute -inset-x-6 -inset-y-4 w-[calc(100%+3rem)] h-[calc(100%+2rem)]" strokeWidth={3} />
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-paper/20">
          {items.map((item, i) => (
            <Reveal key={item.href} delay={i * 70}>
              <a
                href={item.href}
                className="group block h-full p-4 sm:p-5 border-b border-r border-paper/15 hover:bg-violet hover:text-ink transition-colors duration-300"
              >
                <span className="font-display text-3xl text-violet group-hover:text-ink">0{i + 1}.</span>
                <h3 className="font-display uppercase text-2xl sm:text-3xl leading-none mt-2 mb-3">{item.title}</h3>
                <p className="text-sm text-paper/60 group-hover:text-ink/80 leading-snug">{item.desc}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndexSection;
