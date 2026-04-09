interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
  return (
    <div className="text-center mb-12">
      <h2 className="inline-flex flex-col items-center gap-2">
        <span className="text-3xl font-extrabold tracking-tight text-light-text dark:text-white">
          {title}
        </span>
        <span className="block w-12 h-1 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400" />
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm text-light-text-secondary dark:text-gray-400 max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
