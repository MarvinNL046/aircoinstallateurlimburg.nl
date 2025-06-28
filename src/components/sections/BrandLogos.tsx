import { motion } from 'framer-motion';
import { BRANDS } from '../../utils/constants';

export default function BrandLogos() {
  return (
    <section id="brands" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-gray-900 mb-4">
            <span className="text-orange-500">Gecertificeerd Airco Installateur</span> Alle Merken Limburg
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Wij installeren en onderhouden airconditioners van alle grote merken. 
            Daikin, LG, Samsung, Mitsubishi en meer - wij zijn gecertificeerd voor alle systemen.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {BRANDS.map((brand, index) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              <div className="h-20 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-400 group-hover:text-gray-700 transition-colors">
                  {brand}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            Inclusief premium series zoals Daikin Perfera, LG ArtCool, Samsung WindFree, Toshiba Haori en meer!
          </p>
          <a
            href="#contact"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Vraag Advies voor Uw Merk</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}