import { motion } from 'framer-motion';
import { Phone, Euro, Clock, CheckCircle } from 'lucide-react';
import { COMPANY_INFO } from '../../utils/constants';

export default function CTABanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold mb-4 animate-pulse">
                ⏰ TIJDELIJKE ACTIE - NOG 48 UUR!
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Airco Actie Limburg - Bespaar Tot €500!
              </h2>
              <p className="text-xl mb-6 opacity-90">
                + GRATIS onderhoudscontract eerste jaar (t.w.v. €132)
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Euro className="w-8 h-8 text-yellow-300" />
                  <div>
                    <p className="text-2xl font-bold">€11/maand</p>
                    <p className="text-sm opacity-80">All-in onderhoudscontract</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-8 h-8 text-yellow-300" />
                  <div>
                    <p className="text-2xl font-bold">€149</p>
                    <p className="text-sm opacity-80">Eenmalige onderhoudsbeurt</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  'Jaarlijkse controle en reiniging',
                  'Voorrang bij storingen',
                  'Verlengde garantie',
                  'Energiebesparend advies',
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center lg:text-right">
              <div className="bg-white rounded-2xl p-8 text-gray-900 inline-block">
                <h3 className="text-2xl font-bold mb-4">
                  Start Vandaag Nog!
                </h3>
                <p className="mb-6">
                  Bel direct of vraag online een offerte aan
                </p>
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/ /g, '')}`}
                  className="btn-primary flex items-center justify-center space-x-2 mb-4"
                >
                  <Phone className="w-5 h-5" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>
                <a
                  href="#contact"
                  className="text-orange-600 hover:text-orange-700 font-semibold"
                >
                  Of vraag online een offerte aan →
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}