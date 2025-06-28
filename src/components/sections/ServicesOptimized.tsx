import { motion } from 'framer-motion';
import { Wrench, Shield, Wrench as Tool } from 'lucide-react';
import { SERVICES, YOUTUBE_VIDEO_ID } from '../../utils/constants';

const iconMap = {
  Wrench,
  Shield,
  Tool,
};

export default function ServicesOptimized() {
  const services = Object.values(SERVICES);

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-gray-900 mb-4">
            <span className="text-orange-500">Airco Installatie, Onderhoud & Reparatie</span> Limburg
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Van installatie tot onderhoud en reparatie. Wij zijn uw complete partner voor klimaatbeheersing 
            in Heerlen, Geleen, Sittard, Maastricht en heel Limburg.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                
                <h3 className="text-xl font-bold mb-4">
                  Airco {service.title} {index === 0 ? 'Limburg' : index === 1 ? 'Heerlen & Maastricht' : 'Zuid-Limburg'}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                {'price' in service && (
                  <div className="mt-auto pt-4 border-t">
                    <p className="text-2xl font-bold text-orange-500">{service.price}</p>
                    <p className="text-sm text-gray-500">of {service.priceAlt}</p>
                  </div>
                )}
                
                <a
                  href="#contact"
                  className="inline-flex items-center mt-4 text-orange-500 hover:text-orange-600 font-semibold transition-colors"
                >
                  Meer info →
                </a>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center mb-6">
            Zie Ons in Actie
          </h3>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              style={{ minHeight: '400px' }}
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
              title="Airco Installateur Limburg - Professionele Installatie"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}