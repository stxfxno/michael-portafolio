import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import CodeBlock from './CodeBlox';
import emailjs from '@emailjs/browser';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
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
  const [codeExample, setCodeExample] = useState('');

  // Actualizar el código de ejemplo cuando cambian los datos del formulario
  useEffect(() => {
    const updatedCode = `const contact = {
  name: "Michael Carmelino Dueñas",
  email: "carmelino0213@gmail.com",
  social: {
    github: "https://github.com/stxfxno",
    linkedin: "https://www.linkedin.com/in/michael-carmelino-dueñas"
  },
  
  // Método para enviar un mensaje
  sendMessage: async function(message) {
    const response = await emailjs.send(
      ${formData.name ? `"${formData.name}"` : 'name'},
      ${formData.email ? `"${formData.email}"` : 'email'},
      ${formData.message ? `"${formData.message}"` : 'message'},
    );
    return response;
  }
};`;
    
    setCodeExample(updatedCode);
  }, [formData]);

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

  return (
    <section id="contact" className="py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <SectionTitle kicker={t('kicker.contact')} title={t('contact.title')} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <Reveal className="lg:col-span-2">
            <CodeBlock code={codeExample} fileName="contact.js" />
          </Reveal>

          <Reveal delay={120} className="lg:col-span-3">
            <div className="glass-card p-7 sm:p-9 h-full">
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-wider text-white mb-8 flex items-center gap-3">
                <Send size={22} className="text-azure-300" />
                {t('contact.subtitle')}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="label-wide block text-orchid-100/80 mb-2">
                      {t('contact.name')} <span className="text-orchid-300">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 pl-10 rounded-xl bg-void/60 border border-orchid-400/25 text-white placeholder-orchid-100/30 focus:outline-none focus:border-azure-400 focus:ring-2 focus:ring-azure-400/30 transition-all"
                        placeholder={t('contact.your.name')}
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orchid-300 font-mono">&gt;</span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="label-wide block text-orchid-100/80 mb-2">
                      {t('contact.email')} <span className="text-orchid-300">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 pl-10 rounded-xl bg-void/60 border border-orchid-400/25 text-white placeholder-orchid-100/30 focus:outline-none focus:border-azure-400 focus:ring-2 focus:ring-azure-400/30 transition-all"
                        placeholder={t('contact.your.email')}
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orchid-300 font-mono">@</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="label-wide block text-orchid-100/80 mb-2">
                    {t('contact.message')} <span className="text-orchid-300">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 pl-10 rounded-xl bg-void/60 border border-orchid-400/25 text-white placeholder-orchid-100/30 focus:outline-none focus:border-azure-400 focus:ring-2 focus:ring-azure-400/30 transition-all"
                      placeholder={t('contact.your.message')}
                    ></textarea>
                    <span className="absolute left-4 top-3 text-orchid-300 font-mono">&gt;</span>
                  </div>
                  <p className="mt-2 text-xs text-orchid-100/40 font-mono">* message.length &gt; 0</p>
                </div>

                {submitStatus && (
                  <div className={`p-4 rounded-xl border ${
                    submitStatus.success
                      ? 'bg-azure-400/10 text-azure-300 border-azure-400/40'
                      : 'bg-orchid-700/20 text-orchid-100 border-orchid-300/50'
                  }`}>
                    <p className="text-sm">{submitStatus.message}</p>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4">
                  <button type="submit" disabled={isSubmitting} className="btn-glow disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('contact.sending')}
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        {t('contact.send')}
                      </>
                    )}
                  </button>
                  <span className="font-script text-2xl text-orchid-200">
                    {t('contact.note')}
                  </span>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
