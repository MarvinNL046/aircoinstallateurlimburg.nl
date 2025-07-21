import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, ArrowRight, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { HERO_HEADLINES, COMPANY_INFO } from '../../utils/constants';
import { sendEmail, EmailData } from '../../utils/email';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

interface HeroFormData {
  name: string;
  phone: string;
  email: string;
  location: string;
}

export default function HeroOptimized() {
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HeroFormData>();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % HERO_HEADLINES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data: HeroFormData) => {
    setIsSubmitting(true);
    
    try {
      const emailData: EmailData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.location,
        message: 'Aanvraag voor gratis offerte via website',
        service: 'installatie'
      };
      
      await sendEmail(emailData);
      
      // Track analytics if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submit', {
          form_name: 'hero_form',
          form_location: 'hero'
        });
      }
      
      toast.success('Bedankt! We nemen binnen 24 uur contact met u op.');
      reset();
      
      // Optional: redirect to thank you page
      setTimeout(() => {
        navigate('/tot-snel');
      }, 2000);
    } catch (error) {
      toast.error('Er ging iets mis. Bel ons op ' + COMPANY_INFO.phone);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <section className="relative min-h-screen flex items-center gradient-background overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute -top-4 left-0 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-bounce">
              🔥 NU: Gratis installatie check t.w.v. €95
            </div>
            
            <h1 className="text-white mb-6 leading-tight">
              <motion.span
                key={currentHeadline}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="block"
              >
                {HERO_HEADLINES[currentHeadline]}
              </motion.span>
            </h1>
            
            <p className="text-xl text-gray-200 mb-8">
              Specialist in airco installatie, onderhoud en reparatie. 
              Gecertificeerde monteurs voor alle merken. Onderhoud vanaf slechts €11 per maand!
            </p>
            
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5" fill="currentColor" />
                  ))}
                </div>
                <span className="text-white font-semibold">{COMPANY_INFO.rating}/5</span>
              </div>
              <span className="text-gray-300">
                {COMPANY_INFO.reviewCount} {COMPANY_INFO.reviewSource}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn-primary flex items-center justify-center space-x-2">
                <span>Gratis Offerte</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/ /g, '')}`}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Direct Bellen</span>
              </a>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                'F-gassen gecertificeerd',
                'Alle merken',
                'Garantie',
                'Gratis advies',
              ].map((item) => (
                <div key={item} className="flex items-center space-x-2 text-gray-200">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="glass-morphism rounded-2xl p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                Gratis Offerte in 30 Seconden
              </h3>
              <p className="text-gray-300 mb-6">Snel en eenvoudig!</p>
              
              <div className="space-y-4">
                <div>
                  <input
                    {...register('name', { required: 'Naam is verplicht' })}
                    type="text"
                    placeholder="✏️ Uw naam"
                    className="input-field text-lg"
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
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
                    placeholder="📱 06-12345678"
                    className="input-field text-lg font-semibold"
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
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
                    placeholder="✉️ uw@email.nl (voor offerte)"
                    className="input-field text-lg"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <input
                    {...register('location', { required: 'Woonplaats is verplicht' })}
                    type="text"
                    placeholder="🏠 Uw woonplaats (bijv. Heerlen)"
                    className="input-field text-lg"
                    autoComplete="address-level2"
                  />
                  {errors.location && (
                    <p className="text-red-400 text-sm mt-1">{errors.location.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse"
                >
                  {isSubmitting ? 'Even geduld...' : '🔥 Ja, Ik Wil Een Gratis Offerte!'}
                </button>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-white/80 text-sm mb-2">
                  ✓ Binnen 24 uur reactie ✓ Vrijblijvend ✓ Geen verplichtingen
                </p>
                <p className="text-gray-300 text-sm">
                  Liever direct bellen? <a href={`tel:${COMPANY_INFO.phone.replace(/ /g, '')}`} className="text-orange-400 font-bold hover:text-orange-300 text-lg">
                    {COMPANY_INFO.phone}
                  </a>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
}