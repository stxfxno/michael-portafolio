import { useState } from 'react';
import { ArrowUpRight, Github, Linkedin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import Scribble from './Scribble';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Configuración de EmailJS - REEMPLAZA ESTOS VALORES con los tuyos de EmailJS
    const serviceId = 'service_defewdk'; 
    const templateId = 'template_jpc17rm';
    const publicKey = 'Etjtn-jh53u61Ef-L'; 
    
    // Preparar parámetros para la plantilla
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      current_year: new Date().getFullYear()
    };

    // Enviar el correo usando EmailJS
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setIsSubmitting(false);
        setSubmitStatus({
          success: true,
          message: t('contact.success')
        });
        
        // Resetear formulario
        setFormData({
          name: '',
          email: '',
          message: ''
        });
        
        // Limpiar mensaje después de 5 segundos
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setIsSubmitting(false);
        setSubmitStatus({
          success: false,
          message: t('contact.error')
        });
      });
  };

  const inputClass = 'w-full bg-transparent border-0 border-b border-paper/40 px-0 py-3 text-xl text-paper placeholder-paper/30 focus:outline-none focus:ring-0 focus:border-violet transition-colors';

  return (
    <section id="contact" className="py-24 scroll-mt-10">
      <SectionTitle number="07." title={t('contact.bigtitle')} subtitle={t('contact.lead')} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
        <Reveal className="lg:col-span-5">
          <p className="tag text-paper/50 mb-3">E-mail</p>
          <a href="mailto:carmelino0213@gmail.com" className="relative inline-block font-display text-[8.5vw] sm:text-5xl lg:text-[2.6rem] xl:text-5xl leading-none hover:text-violet transition-colors break-all">
            carmelino0213<br />@gmail.com
          </a>
          <Scribble shape="underline" className="w-full max-w-sm h-5 mt-3" strokeWidth={3} />

          <div className="mt-12 space-y-4">
            <a href="https://www.linkedin.com/in/michael-carmelino-due%C3%B1as-a5117a264/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b border-paper/20 pb-4 hover:text-violet transition-colors">
              <span className="flex items-center gap-4 font-display uppercase text-3xl"><Linkedin size={22} /> LinkedIn</span>
              <ArrowUpRight className="group-hover:rotate-45 transition-transform" />
            </a>
            <a href="https://github.com/stxfxno" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b border-paper/20 pb-4 hover:text-violet transition-colors">
              <span className="flex items-center gap-4 font-display uppercase text-3xl"><Github size={22} /> GitHub</span>
              <ArrowUpRight className="group-hover:rotate-45 transition-transform" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="relative border border-paper/25 p-6 sm:p-10 space-y-10">
            <span className="absolute -top-3 left-8 tag bg-ink px-3 text-violet">{t('contact.subtitle')}</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <label className="block">
                <span className="tag text-paper/60">01 — {t('contact.name')} *</span>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder={t('contact.your.name')} />
              </label>
              <label className="block">
                <span className="tag text-paper/60">02 — {t('contact.email')} *</span>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder={t('contact.your.email')} />
              </label>
            </div>
            <label className="block">
              <span className="tag text-paper/60">03 — {t('contact.message')} *</span>
              <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className={`${inputClass} resize-none`} placeholder={t('contact.your.message')} />
            </label>

            {submitStatus && (
              <p className={`tag px-3 py-2 ${submitStatus.success ? 'bg-violet text-ink' : 'border border-paper text-paper'}`}>
                {submitStatus.message}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6">
              <button type="submit" disabled={isSubmitting} className="btn-ink disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? t('contact.sending') : t('contact.send')} <ArrowUpRight size={14} />
              </button>
              <span className="font-hand text-xl text-cobalt -rotate-3">{t('contact.note')}</span>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
