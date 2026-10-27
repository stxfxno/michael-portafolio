import Reveal from './Reveal';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  kicker?: string;
}

const SectionTitle = ({ title, subtitle, kicker }: SectionTitleProps) => {
  return (
    <Reveal className="text-center mb-16">
      {kicker && (
        <p className="label-wide text-azure-300 mb-4">{kicker}</p>
      )}
      <h2 className="inline-flex flex-col items-center gap-5">
        <span className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.06em] text-gradient leading-tight">
          {title}
        </span>
        <span className="flex items-center gap-3 w-64 max-w-full">
          <span className="ornament flex-1" />
          <span className="w-2 h-2 rotate-45 bg-orchid-400 shadow-[0_0_12px_#a960ff]" />
          <span className="ornament flex-1" />
        </span>
      </h2>
      {subtitle && (
        <p className="mt-6 text-lg font-light text-orchid-100/70 max-w-2xl mx-auto italic">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
};

export default SectionTitle;
