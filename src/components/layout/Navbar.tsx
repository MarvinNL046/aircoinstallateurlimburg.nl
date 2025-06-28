import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../../utils/constants';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: 'Diensten' },
    { href: '#why-us', label: 'Waarom Wij' },
    { href: '#brands', label: 'Merken' },
    { href: '#products', label: 'Producten' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold">
              <span className={`${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                Airco
              </span>
              <span className="text-orange-500"> Installateur</span>
              <span className={`${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                {' '}Limburg
              </span>
            </a>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors hover:text-orange-500 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={`https://wa.me/31${COMPANY_INFO.whatsapp.substring(1)}`}
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">WhatsApp</span>
            </a>
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/ /g, '')}`}
              className="btn-primary flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-gray-700 hover:text-orange-500 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 pt-4 border-t space-y-3">
              <a
                href={`https://wa.me/31${COMPANY_INFO.whatsapp.substring(1)}`}
                className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">WhatsApp Chat</span>
              </a>
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/ /g, '')}`}
                className="btn-primary flex items-center justify-center space-x-2 w-full"
              >
                <Phone className="w-4 h-4" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}