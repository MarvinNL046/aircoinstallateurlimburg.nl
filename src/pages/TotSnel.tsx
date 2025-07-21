import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Phone, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../utils/constants';

export default function TotSnel() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home after 10 seconds
    const timeout = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        
        <h1 className="text-3xl font-bold mb-4">Bedankt voor uw aanvraag!</h1>
        
        <p className="text-gray-600 mb-8">
          We hebben uw aanvraag in goede orde ontvangen. Een van onze airco specialisten neemt binnen 24 uur contact met u op.
        </p>

        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="font-semibold mb-4">Wat kunt u verwachten?</h2>
          <ul className="text-left space-y-2 text-sm">
            <li>✓ Telefonisch contact binnen 24 uur</li>
            <li>✓ Gratis installatie check ter waarde van €95</li>
            <li>✓ Vrijblijvende offerte op maat</li>
            <li>✓ Advies over de beste oplossing voor uw situatie</li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Heeft u dringende vragen? Bel ons gerust:
          </p>
          
          <a
            href={`tel:${COMPANY_INFO.phone.replace(/ /g, '')}`}
            className="flex items-center justify-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            <Phone className="w-5 h-5" />
            <span>{COMPANY_INFO.phone}</span>
          </a>

          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700 transition"
          >
            <Mail className="w-5 h-5" />
            <span>{COMPANY_INFO.email}</span>
          </a>
        </div>

        <p className="text-xs text-gray-500 mt-8">
          U wordt automatisch teruggeleid naar de homepage...
        </p>
      </div>
    </div>
  );
}