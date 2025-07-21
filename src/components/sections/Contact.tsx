import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, Star } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { COMPANY_INFO } from '../../utils/constants';
import { sendEmail, EmailData } from '../../utils/email';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  location: string;
  service?: string;
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();


  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const emailData: EmailData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.location,
        message: `Aanvraag via contactformulier`,
        service: data.service
      };
      
      await sendEmail(emailData);
      
      // Track analytics if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submit', {
          form_name: 'contact_form',
          form_location: 'contact_section',
          service_type: data.service || 'general'
        });
      }
      
      toast.success('Bedankt voor uw aanvraag! We nemen binnen 24 uur contact met u op.');
      reset();
      
      // Redirect to thank you page
      setTimeout(() => {
        navigate('/tot-snel');
      }, 2000);
    } catch (error) {
      toast.error('Er ging iets mis. Bel ons gerust op ' + COMPANY_INFO.phone);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-gray-900 mb-4">
            Contact <span className="text-orange-500">Airco Installateur Limburg</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Neem contact op voor een gratis offerte of advies. 
            Wij helpen u graag met airco installatie, onderhoud en service in heel Limburg.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Direct Contact</h3>
              
              <div className="space-y-6">
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/ /g, '')}`}
                  className="flex items-start space-x-4 group"
                >
                  <div className="bg-orange-100 p-3 rounded-lg group-hover:bg-orange-200 transition-colors">
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{COMPANY_INFO.phone}</p>
                    <p className="text-gray-600">Bel voor directe hulp</p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/31${COMPANY_INFO.whatsapp.substring(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-4 group"
                >
                  <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{COMPANY_INFO.whatsapp}</p>
                    <p className="text-gray-600">WhatsApp voor snelle vragen</p>
                  </div>
                </a>

                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-start space-x-4 group"
                >
                  <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{COMPANY_INFO.email}</p>
                    <p className="text-gray-600">Email voor offertes</p>
                  </div>
                </a>

                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{COMPANY_INFO.address}</p>
                    <p className="text-gray-600">{COMPANY_INFO.addressNote}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <h4 className="font-semibold">Openingstijden</h4>
                </div>
                <div className="space-y-1 text-sm">
                  <p>Ma-Do: 09:00-17:00</p>
                  <p>Vrijdag: 09:00-16:00</p>
                  <p>Weekend: Gesloten</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold mb-2">Start Hier! 👇</h3>
                <p className="text-gray-600">Binnen 24 uur een gratis offerte op maat</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <input
                    {...register('name', { required: 'Naam is verplicht' })}
                    type="text"
                    className="input-field text-lg"
                    placeholder="Uw naam"
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <input
                    {...register('phone', { 
                      required: 'Telefoonnummer is verplicht',
                      pattern: {
                        value: /^[0-9+\-\s()]+$/,
                        message: 'Ongeldig telefoonnummer'
                      }
                    })}
                    type="tel"
                    className="input-field text-lg font-semibold"
                    placeholder="📱 06-12345678"
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <input
                    {...register('email', { 
                      required: 'Email is verplicht voor de offerte',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Ongeldig email adres'
                      }
                    })}
                    type="email"
                    className="input-field text-lg"
                    placeholder="✉️ uw@email.nl (voor offerte)"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <input
                    {...register('location', { required: 'Woonplaats is verplicht' })}
                    type="text"
                    placeholder="🏠 Uw woonplaats (bijv. Maastricht)"
                    className="input-field text-lg"
                    autoComplete="address-level2"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                  )}
                </div>

                <div>
                  <select
                    {...register('service')}
                    className="input-field text-lg"
                  >
                    <option value="">Waar bent u in geïnteresseerd?</option>
                    <option value="installatie">🆕 Nieuwe airco installatie</option>
                    <option value="onderhoud">🛡️ Onderhoud (vanaf €11/maand)</option>
                    <option value="reparatie">🔧 Reparatie of storing</option>
                    <option value="advies">💡 Vrijblijvend advies</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full text-xl py-5 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform transition-all shadow-xl"
                >
                  {isSubmitting ? (
                    <span>Even geduld... ⏳</span>
                  ) : (
                    <span>JA! Stuur Mij Een Gratis Offerte 🚀</span>
                  )}
                </button>

                <div className="text-center pt-4">
                  <p className="text-sm text-gray-500 mb-2">
                    ✅ 100% Vrijblijvend ✅ Geen verborgen kosten ✅ Direct antwoord
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <span className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <strong>4.7/5</strong> (163 reviews)
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-green-600 font-semibold">
                      ✓ Binnen 24u reactie
                    </span>
                  </div>
                </div>
              </div>

            </form>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
}