import emailjs from '@emailjs/browser';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  service?: string;
  location?: string;
}

export const initEmailJS = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (publicKey) {
    emailjs.init(publicKey);
  } else {
    console.error('EmailJS public key not found in environment variables');
  }
};

export const sendEmail = async (formData: ContactFormData): Promise<void> => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  if (!serviceId || !templateId) {
    throw new Error('EmailJS configuration missing');
  }

  // Maak een bericht op basis van de service
  const serviceMessages = {
    installatie: 'Ik ben geïnteresseerd in een nieuwe airco installatie.',
    onderhoud: 'Ik zou graag meer informatie over het onderhoudscontract (vanaf €11/maand).',
    reparatie: 'Ik heb een storing of probleem met mijn airco en zou graag hulp.',
    advies: 'Ik zou graag vrijblijvend advies over airco mogelijkheden.'
  };

  const serviceMessage = formData.service ? serviceMessages[formData.service as keyof typeof serviceMessages] : '';
  const fullMessage = formData.message 
    ? `${serviceMessage}\n\nExtra informatie: ${formData.message}`
    : serviceMessage || 'Algemene aanvraag voor informatie over airco diensten.';

  const templateParams = {
    to_name: 'Airco Installateur Limburg',
    from_name: formData.name,
    from_email: formData.email,
    phone: formData.phone,
    city: formData.location || 'Niet opgegeven',
    service: formData.service ? `Dienst: ${formData.service}` : '',
    message: fullMessage,
  };

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams);
    if (response.status !== 200) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
};