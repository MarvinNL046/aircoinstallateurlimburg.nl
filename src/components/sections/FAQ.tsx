import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Wat kost een airco installatie in Limburg?",
    answer: "De kosten voor een airco installatie variëren afhankelijk van het type airco, de grootte van de ruimte en de complexiteit van de installatie. Voor een nauwkeurige prijsopgave bieden wij een gratis inspectie ter plaatse aan. Gemiddeld ligt een complete installatie tussen de €1.500 en €4.000, maar elke situatie is uniek. Neem contact op voor een vrijblijvende offerte op maat."
  },
  {
    question: "Hoe lang duurt een airco installatie?",
    answer: "Een standaard airco installatie duurt gemiddeld 4 tot 6 uur voor een single-split systeem. Voor multi-split systemen of complexere installaties kan dit oplopen tot een volledige werkdag. Onze gecertificeerde monteurs werken efficiënt en netjes, waarbij we altijd de kwaliteit voorop stellen. We plannen de installatie in overleg met u op een moment dat het u het beste uitkomt."
  },
  {
    question: "Welke airco merken installeren jullie?",
    answer: "Wij zijn specialist in alle topmerken: Daikin (Perfera, Emura, Stylish), LG (ArtCool, DualCool), Samsung (WindFree), Mitsubishi Heavy Industries, Toshiba (Haori, Daiseikai) en Tosot. Als gecertificeerd installateur kunnen wij u adviseren over het beste merk en model voor uw specifieke situatie, rekening houdend met uw wensen, budget en de technische mogelijkheden."
  },
  {
    question: "Hebben jullie een 24/7 storingsdienst?",
    answer: "Wij bieden service tijdens onze reguliere openingstijden: maandag t/m donderdag van 09:00-17:00 en vrijdag van 09:00-16:00. Voor klanten met een onderhoudscontract hebben we voorrang bij storingen. In noodgevallen doen we ons best om zo snel mogelijk te helpen. Let op: wij bieden geen 24/7 storingsdienst, maar garanderen wel snelle service tijdens kantooruren."
  },
  {
    question: "Wat houdt een onderhoudscontract in?",
    answer: "Ons onderhoudscontract vanaf €11 per maand omvat: jaarlijkse controle en reiniging van uw airco, voorrang bij storingen, verlengde garantie op onderdelen, energiebesparend advies en korting op eventuele reparaties. Een goed onderhouden airco gaat langer mee, verbruikt minder energie en zorgt voor een gezonder binnenklimaat. U kunt ook kiezen voor een losse onderhoudsbeurt voor €149."
  },
  {
    question: "In welke plaatsen in Limburg komen jullie?",
    answer: "Wij bedienen heel Limburg! Van Maastricht tot Roermond, van Heerlen tot Venlo. Onze monteurs komen dagelijks in Sittard, Geleen, Brunssum, Landgraaf, Kerkrade, Voerendaal, Hoensbroek, Parkstad en Zuid-Limburg. Ook in kleinere plaatsen zijn we actief. Geen regio is te ver - wij zijn uw lokale airco specialist voor heel Limburg."
  },
  {
    question: "Kan ik subsidie krijgen voor een airco?",
    answer: "Voor particulieren is er momenteel geen directe subsidie voor airco's. Wel kunt u mogelijk gebruik maken van de ISDE-subsidie als u kiest voor een lucht-water warmtepomp. Voor bedrijven zijn er verschillende subsidiemogelijkheden zoals de EIA (Energie-investeringsaftrek). Wij adviseren u graag over de actuele mogelijkheden en helpen bij het kiezen van een energiezuinig systeem dat mogelijk in aanmerking komt voor fiscale voordelen."
  },
  {
    question: "Hoeveel stroom verbruikt een airco?",
    answer: "Moderne airco's zijn zeer energiezuinig. Een gemiddelde airco (3,5 kW) verbruikt bij koelen ongeveer 1 kWh per uur op vol vermogen. Dankzij inverter technologie en A+++ labels is het werkelijke verbruik vaak veel lager. Bij verwarmen is een airco zelfs 3-4x efficiënter dan elektrische verwarming. Wij installeren alleen de meest energiezuinige modellen en adviseren u over het verwachte verbruik voor uw situatie."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-gray-900 mb-4">
            <span className="text-orange-500">Airco Vragen Limburg</span> - Installatie, Prijzen & Service
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Heeft u vragen over airco installatie, onderhoud of service in Limburg? 
            Hier vindt u antwoorden op de meest gestelde vragen.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full bg-white rounded-lg p-6 text-left hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold pr-4">{item.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-orange-500 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-gray-600"
                  >
                    <p>{item.answer}</p>
                  </motion.div>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Staat uw vraag er niet bij? Neem gerust contact met ons op!
          </p>
          <a
            href="#contact"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Stel uw vraag</span>
          </a>
        </motion.div>
      </div>

      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })
        }}
      />
    </section>
  );
}