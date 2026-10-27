import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

  const links = [
    { name: t('nav.projects'), href: '/#projects' },
    { name: t('nav.skills'), href: '/#skills' },
    { name: t('nav.experience'), href: '/#experience' },
    { name: t('nav.education'), href: '/#education' },
    { name: t('nav.arcade'), href: '/#arcade' },
    { name: t('nav.contact'), href: '/#contact' },
  ];

  return (
    <footer className="relative mt-10 bg-paper text-ink overflow-hidden">
      <div className="stripes h-4 w-full opacity-90" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
          <p className="md:col-span-5 font-serif italic text-3xl leading-snug">
            {t('footer.description')}
          </p>
          <ul className="md:col-span-4 md:col-start-7 grid grid-cols-2 gap-y-2">
            {links.map((l, i) => (
              <li key={l.href}>
                <a href={l.href} className="tag hover:line-through decoration-2">
                  0{i + 1} {l.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="md:col-span-2 flex md:flex-col gap-3 tag">
            <a href="https://github.com/stxfxno" target="_blank" rel="noopener noreferrer" className="hover:text-violet-deep">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/michael-carmelino-due%C3%B1as-a5117a264/" target="_blank" rel="noopener noreferrer" className="hover:text-violet-deep">LinkedIn ↗</a>
            <a href="mailto:carmelino0213@gmail.com" className="hover:text-violet-deep">E-mail ↗</a>
          </div>
        </div>

        {/* Firma gigante */}
        <p className="font-display uppercase leading-[0.8] text-[19vw] lg:text-[15rem] tracking-tight select-none">
          Michael<span className="text-violet-deep">.</span>
        </p>
        <div className="flex flex-col sm:flex-row justify-between gap-2 mt-6 pt-4 border-t border-ink/20">
          <span className="tag">&copy; {currentYear} Michael Carmelino Dueñas · {t('footer.rights')}</span>
          <span className="font-hand text-lg">{language === 'es' ? 'hecho a mano en Lima' : 'handmade in Lima'} ✦</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
