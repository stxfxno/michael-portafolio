import { useState } from 'react';
import { Send} from 'lucide-react';
import CodeBlock from './CodeBlox';

const Contact = () => {
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
    
    // Simular envío de formulario
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus({
        success: true,
        message: '¡Mensaje enviado con éxito! Te responderé lo antes posible.'
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
    }, 1500);
  };

  const contactCode = `const contact = {
  name: "Michael Carmelino Dueñas",
  email: "carmelino0213@gmail.com",
  phone: "+51 959271160",
  social: {
    github: "https://github.com/stxfxno",
    linkedin: "https://www.linkedin.com/in/michael-carmelino-dueñas"
  },
  
  // Método para enviar un mensaje
  sendMessage: async function(message) {
    const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(message),
    headers: {
        'Content-Type': 'application/json'
    }
  });
};`;

  return (
    <section id="contact" className="py-16 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Contacto
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
            <span className="text-green-600 dark:text-green-400">await</span> 
            <span className="text-gray-800 dark:text-gray-200"> </span>
            <span className="text-blue-600 dark:text-blue-400">developer</span>
            <span className="text-gray-600 dark:text-gray-400">.</span>
            <span className="text-purple-600 dark:text-purple-400">sendMessage</span>
            <span className="text-gray-600 dark:text-gray-400">(</span>
            <span className="text-orange-600 dark:text-orange-400">yourMessage</span>
            <span className="text-gray-600 dark:text-gray-400">);</span>
          </span>
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <CodeBlock code={contactCode} fileName="contact.js" />
            </div>
          </div>
          
          <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Send size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
              Envíame un Mensaje
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white pl-10"
                      placeholder="Tu nombre"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <span className="text-gray-500 dark:text-gray-400">&gt;</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white pl-10"
                      placeholder="tu@email.com"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <span className="text-gray-500 dark:text-gray-400">@</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mensaje <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white pl-10"
                    placeholder="Escribe tu mensaje aquí..."
                  ></textarea>
                  <div className="absolute left-3 top-6">
                    <span className="text-gray-500 dark:text-gray-400">&gt;</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 font-mono">* message.length &gt; 0</p>
              </div>
              
              {submitStatus && (
                <div className={`p-4 rounded-lg ${
                  submitStatus.success 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700' 
                    : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-700'
                }`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {submitStatus.success ? (
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm">{submitStatus.message}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Enviar Mensaje
                    </>
                  )}
                </button>
                
                <span className="ml-4 text-sm text-gray-500 dark:text-gray-400 font-mono">
                  // Espero tu mensaje!
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;