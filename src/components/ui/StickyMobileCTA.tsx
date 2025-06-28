import { Phone, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../../utils/constants';

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl lg:hidden z-40">
      <div className="grid grid-cols-2 gap-2 p-3">
        <a
          href={`tel:${COMPANY_INFO.phone.replace(/ /g, '')}`}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span>Bel Direct</span>
        </a>
        <a
          href={`https://wa.me/31${COMPANY_INFO.whatsapp.substring(1)}?text=Ik wil graag meer informatie over een airco installatie`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}