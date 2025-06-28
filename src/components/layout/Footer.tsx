import { Phone, Mail, MapPin, Clock, MessageCircle, Star } from 'lucide-react';
import { COMPANY_INFO, BUSINESS_HOURS, SEO_LOCATIONS } from '../../utils/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-white">Airco</span>
              <span className="text-orange-500"> Installateur</span>
              <span className="text-white"> Limburg</span>
            </h3>
            <p className="mb-4">
              Uw specialist voor airco installatie, onderhoud en reparatie in heel Limburg.
            </p>
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5"
                    fill={i < 4 ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <span className="text-white font-semibold">{COMPANY_INFO.rating}/5</span>
              <span className="text-sm">({COMPANY_INFO.reviewCount} reviews)</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/ /g, '')}`}
                className="flex items-center space-x-3 hover:text-orange-500 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
              <a
                href={`https://wa.me/31${COMPANY_INFO.whatsapp.substring(1)}`}
                className="flex items-center space-x-3 hover:text-green-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp: {COMPANY_INFO.whatsapp}</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center space-x-3 hover:text-orange-500 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>{COMPANY_INFO.email}</span>
              </a>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p>{COMPANY_INFO.address}</p>
                  <p className="text-sm text-gray-400">{COMPANY_INFO.addressNote}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Openingstijden</h4>
            <div className="space-y-2">
              {Object.entries(BUSINESS_HOURS).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="capitalize">{day}:</span>
                  <span className={hours === 'Gesloten' ? 'text-gray-500' : ''}>
                    {hours}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <p className="text-sm flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>Geen 24/7 storingsdienst</span>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Werkgebied</h4>
            <div className="grid grid-cols-2 gap-2">
              {SEO_LOCATIONS.slice(0, 10).map((location) => (
                <span key={location} className="text-sm hover:text-orange-500 transition-colors">
                  {location}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-400">
              En alle andere plaatsen in Limburg!
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} Airco Installateur Limburg. Alle rechten voorbehouden.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="hover:text-orange-500 transition-colors">
                Privacy
              </a>
              <a href="/voorwaarden" className="hover:text-orange-500 transition-colors">
                Voorwaarden
              </a>
              <a href="/sitemap" className="hover:text-orange-500 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}