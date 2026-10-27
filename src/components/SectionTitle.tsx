import Reveal from './Reveal';
import Scribble from './Scribble';

interface SectionTitleProps {
  // Usa "|" para partir la palabra en bloques apilados: "PRO|YEC|TOS"
  title: string;
  number?: string;
  subtitle?: string;
  note?: string;
}

const SectionTitle = ({ title, number, subtitle, note }: SectionTitleProps) => {
  const chunks = title.split('|');

  return (
    <Reveal className="mb-16 md:mb-20">
      <div className="flex items-center gap-4 mb-6">
        {number && <span className="tag text-violet">{number}</span>}
        <span className="h-px flex-1 bg-paper/20" />
        <span className="stripes w-24 h-3" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <h2 className="md:col-span-8 relative font-wide uppercase leading-[0.82] text-[18vw] sm:text-[13vw] md:text-[8.5rem] lg:text-[10rem]">
          {chunks.map((c, i) => (
            <span key={i} className={`block ${i === chunks.length - 1 && chunks.length > 1 ? 'text-violet' : ''}`}>
              {c}
            </span>
          ))}
          {note && (
            <span className="absolute right-0 md:-right-16 top-0 md:top-6 font-hand text-xl md:text-2xl text-cobalt normal-case tracking-normal rotate-[-8deg]">
              {note}
              <Scribble shape="arrow" color="#3d5afe" strokeWidth={2.5} className="block w-20 h-10 mt-1 -scale-x-100" />
            </span>
          )}
        </h2>
        {subtitle && (
          <p className="md:col-span-4 font-serif italic text-2xl md:text-3xl leading-snug text-paper/80 border-l-2 border-violet pl-5">
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  );
};

export default SectionTitle;
