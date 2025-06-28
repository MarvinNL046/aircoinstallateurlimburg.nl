import { motion } from 'framer-motion';
import { FileText, Award, Shield, MapPin } from 'lucide-react';
import { BENEFITS, COMPANY_INFO } from '../../utils/constants';

const iconMap = {
  FileText,
  Award,
  Shield,
  MapPin,
};

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-gray-900 mb-4">
            Waarom Kiezen voor <span className="text-orange-500">Airco Installateur Limburg</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Als specialist in airco installatie en service in Limburg bieden wij u de beste service, 
            kwaliteit en zekerheid. Van Kerkrade tot Roermond, wij zijn er voor u.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {BENEFITS.map((benefit, index) => {
            const Icon = iconMap[benefit.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6 group-hover:bg-orange-200 transition-colors">
                  <Icon className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            ⚡ Actie: Eerste 10 Klanten Deze Maand = GRATIS Onderhoudsbeurt!
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Nog maar <span className="font-bold text-2xl">7 plekken</span> beschikbaar. Mis deze kans niet!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-white text-orange-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Gratis Offerte Aanvragen
            </a>
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/ /g, '')}`}
              className="bg-orange-700 hover:bg-orange-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Direct Contact
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}