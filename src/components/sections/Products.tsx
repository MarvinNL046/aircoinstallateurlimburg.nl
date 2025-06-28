import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { COMPANY_INFO } from '../../utils/constants';

interface Product {
  name: string;
  brand: string;
  images: string[];
  description?: string;
}

const products: Product[] = [
  {
    name: 'Perfera',
    brand: 'Daikin',
    images: ['/images/products/daikin-perfera-wit.webp'],
    description: 'De ultieme airconditioner met A+++ energie-efficiëntie. SEER tot 9.47 en SCOP tot 5.20. Fluisterstil vanaf 19 dB(A), Heat Boost functie voor 14% snellere opwarming, Flash Streamer luchtzuivering, bewegingssensor en 3D-luchtstroom. Werkt probleemloos van -21°C tot +50°C. Beschikbaar in 2.0 tot 7.1 kW.'
  },
  {
    name: 'Emura 3',
    brand: 'Daikin',
    images: [
      '/images/products/daikin-emura-wit.webp',
      '/images/products/daikin-emura-zilver.webp',
      '/images/products/daikin-emura-zwart.webp'
    ],
    description: 'Iconisch designmodel in mat kristalwit, zilver of zwart. A+++ voor koeling, A++ voor verwarming. Fluisterstil vanaf 19 dB(A), Flash Streamer technologie, 2-zone bewegingssensor, Coanda-effect voor optimale luchtverdeling. Standaard WLAN-adapter, bediening via Onecta app of spraakbesturing. Capaciteit: 2.0 tot 5.0 kW.'
  },
  {
    name: 'Stylish',
    brand: 'Daikin',
    images: [
      '/images/products/daikin-stylish-wit.webp',
      '/images/products/daikin-stylish-zwart.webp',
      '/images/products/daikin-stylish-silver.webp'
    ],
    description: 'Compact en elegant met slechts 189mm diepte. Verkrijgbaar in wit, blackwood en zilver. Coanda-effect zorgt voor optimale temperatuurverdeling, intelligente thermische sensor voorkomt tocht. Fresh air ventilatie, zelfreinigend filter. Perfect voor moderne interieurs waar design belangrijk is.'
  },
  {
    name: 'Comfora',
    brand: 'Daikin',
    images: [
      '/images/products/daikin-comfora-left.webp',
      '/images/products/daikin-comfora-right.webp'
    ],
    description: 'Perfecte balans tussen prestaties en betaalbaarheid. Bluefin anticorrosie coating voor langere levensduur, 2-gebiedssensor voor energiebesparing, comfort mode voorkomt directe luchtstroom. Onecta app voor slimme bediening. Ideaal voor slaapkamers met fluisterstille nachtmodus.'
  },
  {
    name: 'ArtCool Gallery',
    brand: 'LG',
    images: [
      '/images/products/lg-artcool-mirror.webp',
      '/images/products/rac-eu-lg-artcool-black.webp'
    ],
    description: 'Personaliseerbaar kunstwerk met verwisselbaar voorpaneel of 27" FHD LCD-scherm. Dual Inverter compressor met 10 jaar garantie, 3-weg luchtstroom via zijkanten en onderkant. NEO-PLASMAAIR zuiveringssysteem, Active Energy Control (80%, 60%, 40%), Smart ThinQ Wi-Fi bediening. Beschikbaar in 2.5 en 3.5 kW.'
  },
  {
    name: 'DualCool Premium',
    brand: 'LG',
    images: [
      '/images/products/LG-dualcool-indoor-premium.webp',
      '/images/products/LG-dualcool-indoor-premium-1.webp'
    ],
    description: 'Geavanceerde Dual Inverter technologie voor 40% snellere koeling en tot 70% energiebesparing. BLDC motor voor stille werking, dubbele beschermingsfilter vangt stof >10㎛ en bacteriën. Freeze Cleaning voor eenvoudig onderhoud, Auto Clean+ functie, Ocean Black Fin coating tegen corrosie.'
  },
  {
    name: 'WindFree',
    brand: 'Samsung',
    images: ['/images/products/samsung/'],
    description: 'Revolutionaire WindFree technologie koelt zonder directe luchtstroom via 23.000 micro-gaatjes. AI Auto Cooling past automatisch aan op basis van kameromstandigheden. PM1.0 filter vangt ultrafijn stof, Easy Filter Plus voor eenvoudige reiniging. Motion Detect Sensor voor energiebesparing tot 73%.'
  },
  {
    name: 'Haori',
    brand: 'Toshiba',
    images: [
      '/images/products/Haori-zwart-vooraanzicht_3_11zon.webp',
      '/images/products/Haori-grijs-links_19_11zon.webp',
      '/images/products/Haori-bruin-links_17_11zon.webp'
    ],
    description: 'Uniek Japans design met verwisselbare stoffen bekleding (2 hoezen inbegrepen). A+++ koeling, A++ verwarming. Plasma-ionisator verwijdert 94% PM2.5 fijnstof, geuren en allergenen. Fluisterstil 19-21 dB(A), ingebouwde Wi-Fi met app-bediening. Perfect aanpasbaar aan elk interieur, ook eigen stof mogelijk.'
  },
  {
    name: 'Daiseikai',
    brand: 'Toshiba',
    images: [
      '/images/products/Daiseikai 10-Wit-vooraanzicht_4_11zon.webp',
      '/images/products/Daiseikai 10-Hout-vooraanzicht_2_11zon.webp'
    ],
    description: 'Premium luchtzuivering met Plasma ionisator en Ultra Pure filter. Hybrid Inverter technologie voor stabiele temperatuur, Magic Coil met aqua-coating tegen bacteriën. 8°C verwarmingsmodus voorkomt bevriezing, Hi Power mode voor snel koelen/verwarmen. Beschikbaar in wit of houtlook design.'
  },
  {
    name: 'Clivia',
    brand: 'Tosot',
    images: [
      '/images/products/724-clivia-wit-vooraanzicht.webp',
      '/images/products/712-clivia-zwart-vooraanzicht.webp'
    ],
    description: 'Uitstekende prijs-kwaliteit met I Feel functie voor nauwkeurige temperatuurregeling vanuit afstandsbediening. 7 ventilatorsnelheden, turbo mode, intelligent ontdooien. Golden Fin coating tegen corrosie, zelfreinigingsfunctie. Wi-Fi ready, verkrijgbaar in wit of zwart. Ideaal voor budgetbewuste kopers zonder concessies aan kwaliteit.'
  },
  {
    name: 'Airco Covers',
    brand: 'Accessoires',
    images: [
      '/images/products/airco-covers/aircocover-wit.webp',
      '/images/products/airco-covers/aircocover-antraciet.webp'
    ],
    description: 'Stijlvolle omkasting voor uw buitenunit. Beschermt tegen weersinvloeden en verbetert de uitstraling van uw gevel. Gepoedercoat aluminium voor duurzaamheid, optimale ventilatie gegarandeerd. Verkrijgbaar in wit en antraciet. Universeel passend voor de meeste buitenunits. Eenvoudige montage met meegeleverde bevestigingsmaterialen.'
  }
];

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (selectedProduct && selectedProduct.images.length > 1) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % selectedProduct.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedProduct && selectedProduct.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-gray-900 mb-4">
            <span className="text-orange-500">Airco Merken Limburg</span> - Daikin, LG, Samsung & Meer
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ontdek ons uitgebreide assortiment airconditioners van topmerken. 
            Van budget tot premium, wij hebben de perfecte oplossing voor uw situatie.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={`${product.brand}-${product.name}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="card cursor-pointer hover:shadow-2xl"
              onClick={() => {
                setSelectedProduct(product);
                setCurrentImageIndex(0);
              }}
            >
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={`${product.brand} ${product.name} airconditioner - professionele installatie in Limburg`}
                  title={`${product.brand} ${product.name} - Airco Installateur Limburg`}
                  className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-600">{product.brand}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#contact"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Vraag een Offerte Aan</span>
          </a>
        </div>

        {selectedProduct && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 lg:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-sm font-medium text-orange-500 uppercase tracking-wide">{selectedProduct.brand}</span>
                    <h3 className="text-3xl font-bold mt-1">{selectedProduct.name}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="relative">
                      <img
                        src={selectedProduct.images[currentImageIndex]}
                        alt={`${selectedProduct.brand} ${selectedProduct.name}`}
                        className="w-full h-80 lg:h-96 object-contain rounded-lg bg-gray-50"
                      />
                      
                      {selectedProduct.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>

                    {selectedProduct.images.length > 1 && (
                      <div className="flex justify-center space-x-2 mt-4">
                        {selectedProduct.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === currentImageIndex 
                                ? 'bg-orange-500 w-8' 
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3">Productkenmerken</h4>
                      <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4 mb-6">
                      <p className="text-sm text-orange-800">
                        <strong>Let op:</strong> Voor een nauwkeurige offerte op maat adviseren wij een gratis inspectie ter plaatse. 
                        Elke situatie is uniek en vereist een professionele beoordeling.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <a
                        href="#contact"
                        className="btn-primary flex items-center justify-center space-x-2 w-full"
                        onClick={() => setSelectedProduct(null)}
                      >
                        <span>Vraag Gratis Offerte Aan</span>
                      </a>
                      <a
                        href={`https://wa.me/31${COMPANY_INFO.whatsapp.substring(1)}?text=Ik ben geïnteresseerd in de ${selectedProduct.brand} ${selectedProduct.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary flex items-center justify-center space-x-2 w-full"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>Direct WhatsApp Contact</span>
                      </a>
                      <a
                        href={`tel:${COMPANY_INFO.phone.replace(/ /g, '')}`}
                        className="text-center block text-gray-600 hover:text-orange-500 transition-colors"
                      >
                        Of bel direct: <span className="font-semibold">{COMPANY_INFO.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}