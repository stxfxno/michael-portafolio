import { ArrowDown } from 'lucide-react';
import Scribble from './Scribble';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { language } = useLanguage();
  const es = language === 'es';

  return (
    <section id="home" className="relative min-h-screen pt-24 pb-10 overflow-hidden">
      {/* Franjas superiores */}
      <div className="absolute top-0 right-[18%] w-40 h-6 stripes" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex gap-4 lg:gap-10 min-h-[calc(100vh-8.5rem)]">
        {/* "PORTAFOLIO" vertical */}
        <div className="hidden md:flex items-end">
          <span
            className="vertical font-display uppercase text-violet leading-[0.8] text-[clamp(6rem,13vh,10rem)] select-none fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            {es ? 'Portafolio' : 'Portfolio'}
          </span>
        </div>

        <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Texto principal */}
          <div className="lg:col-span-7 relative z-10">
            <p className="tag text-paper/60 mb-6 fade-up">
              {es ? 'Desarrollo web & móvil — Lima, Perú' : 'Web & mobile development — Lima, Peru'}
            </p>

            <h1 className="font-display uppercase leading-[0.86] text-[19vw] sm:text-[16vw] lg:text-[7.6rem] xl:text-[8.6rem]">
              <span className="rise"><span style={{ animationDelay: '0.1s' }}>Michael</span></span>
              <span className="rise"><span style={{ animationDelay: '0.25s' }} className="outline-text">Carmelino</span></span>
            </h1>

            <div className="relative mt-4 mb-8 fade-up" style={{ animationDelay: '0.5s' }}>
              <p className="font-serif italic text-5xl sm:text-6xl text-paper leading-none">
                Dueñas<span className="text-violet">.</span>
              </p>
              <p className="font-wide text-[0.95rem] sm:text-2xl uppercase mt-3">
                <span className="hl">{es ? 'Desarrollador Full Stack' : 'Full Stack Developer'}</span>
              </p>
              <Scribble shape="underline" className="w-72 h-5 mt-2" strokeWidth={3} delay={900} />
            </div>

            <p className="max-w-md text-lg text-paper/75 leading-relaxed mb-10 fade-up" style={{ animationDelay: '0.65s' }}>
              {es
                ? 'Estudiante de 5to año de Ingeniería de Software. Diseño y construyo productos digitales con carácter: limpios, rápidos y con un toque personal.'
                : '5th year Software Engineering student. I design and build digital products with character: clean, fast and with a personal touch.'}
            </p>

            <div className="flex flex-wrap gap-4 fade-up" style={{ animationDelay: '0.8s' }}>
              <a href="#projects" className="btn-ink">
                {es ? 'Ver trabajos' : 'See work'} <ArrowDown size={14} />
              </a>
              <a href="mailto:carmelino0213@gmail.com" className="btn-line">
                carmelino0213@gmail.com
              </a>
            </div>
          </div>

          {/* Collage de fotos */}
          <div className="lg:col-span-5 relative h-[420px] sm:h-[520px] lg:h-[620px] fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="group absolute right-0 top-4 w-[72%] h-[64%] overflow-hidden border border-paper/20 rotate-2">
              <img src="/images/sprinta.png" alt="Sprinta AI" className="photo w-full h-full object-cover group-hover:scale-105" />
            </div>
            <div className="group absolute left-0 top-[34%] w-[52%] h-[38%] overflow-hidden border-4 border-ink shadow-2xl -rotate-3 z-10">
              <img src="/images/eemersonsac_web.webp" alt="Eemerson SAC" className="photo w-full h-full object-cover group-hover:scale-105" />
            </div>
            <div className="group absolute right-[8%] bottom-0 w-[46%] h-[30%] overflow-hidden border-4 border-ink rotate-1 z-10">
              <img src="/images/renaceris_web.png" alt="Renaceris" className="photo w-full h-full object-cover group-hover:scale-105" />
            </div>
            {/* Cinta morada / resaltador */}
            <div className="absolute left-[14%] top-[58%] w-[70%] h-9 bg-violet/85 mix-blend-screen -rotate-6 z-20" />
            <div className="absolute right-0 bottom-[34%] w-24 h-4 bg-cobalt z-20" />
            <Scribble shape="zigzag" className="absolute -right-4 top-[22%] w-28 h-44 z-20" strokeWidth={5} delay={600} />
            <Scribble shape="circle" className="absolute left-[2%] top-[30%] w-[58%] h-[46%] z-20" strokeWidth={3} color="#f4f1ec" delay={1100} />
            <span className="absolute left-2 top-2 font-hand text-2xl text-paper rotate-[-6deg] z-20">
              {es ? '¡hola!' : 'hello!'}
            </span>
            <span className="absolute left-0 bottom-3 tag bg-paper text-ink px-2 py-1 z-20">
              ★ {es ? 'Disponible' : 'Available'}
            </span>
          </div>
        </div>
      </div>

      {/* Pie del hero, como en una portada */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-6 flex items-center justify-between gap-6 border-t border-paper/20 pt-4">
        <span className="tag text-paper/60">{es ? 'Trabajos seleccionados' : 'Selected works'}</span>
        <span className="hidden sm:block stripes h-3 flex-1 max-w-xs opacity-80" />
        <span className="tag text-paper/60">2022 — 2026</span>
      </div>
    </section>
  );
};

export default Hero;
