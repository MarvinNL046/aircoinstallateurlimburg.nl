import emailjs from '@emailjs/browser';

// Debug mode for troubleshooting
const DEBUG_MODE = false;

// LeadFlow CRM configuration
const LEADFLOW_URL = "https://wetryleadflow.com/api/webhooks/leads";
const LEADFLOW_API_KEY = "lf_lRyHo1ENukt9VsG9gYT8EKeDA_nKuoQ1";

// EmailJS configuration from environment variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Type definitions
export interface EmailData {
  name: string;
  email: string;
  phone: string;
  city?: string;
  message: string;
  service?: string;
}

// Service message mapping (from existing implementation)
const serviceMessages: Record<string, string> = {
  'installatie': 'Ik ben geinteresseerd in een airco installatie',
  'onderhoud': 'Ik wil graag een onderhoudscontract afsluiten',
  'reparatie': 'Mijn airco heeft een reparatie nodig',
  'advies': 'Ik wil graag vrijblijvend advies over airconditioning'
};

// Send data via EmailJS (adapted from existing emailjs.ts)
const sendViaEmailJS = async (data: EmailData): Promise<boolean> => {
  try {
    // Construct the message with service info if available
    let fullMessage = data.message;
    if (data.service && serviceMessages[data.service]) {
      fullMessage = `${serviceMessages[data.service]}\n\n${data.message || ''}`.trim();
    }

    const templateParams = {
      to_name: 'Airco Installateur Limburg',
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      city: data.city || '',
      service: data.service || '',
      message: fullMessage,
      reply_to: data.email
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    if (DEBUG_MODE) {
      console.log('EmailJS Success:', response);
    }

    return response.status === 200;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('EmailJS Error:', error);
    }
    return false;
  }
};

// Send data to LeadFlow CRM
const sendToLeadflow = async (data: EmailData): Promise<boolean> => {
  try {
    const nameParts = data.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const leadflowData = {
      firstName,
      lastName,
      email: data.email,
      phone: data.phone,
      message: data.message,
      source: 'website-contact',
      customFields: {
        city: data.city,
        woonplaats: data.city
      }
    };

    if (DEBUG_MODE) {
      console.log('Sending data to Leadflow CRM:', leadflowData);
    }

    const response = await fetch(LEADFLOW_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": LEADFLOW_API_KEY
      },
      body: JSON.stringify(leadflowData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (DEBUG_MODE) {
        console.error(`Leadflow error (${response.status}):`, errorText);
      }
      return false;
    }

    if (DEBUG_MODE) {
      console.log('Leadflow submission successful');
    }
    return true;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('Leadflow submission failed:', error);
    }
    return false;
  }
};

// Main send function with dual submission
export const sendEmail = async (data: EmailData): Promise<void> => {
  if (DEBUG_MODE) {
    console.log('Sending email with data:', data);
  }

  // Send to all services in parallel
  const [emailJSSuccess, leadflowSuccess] = await Promise.all([
    sendViaEmailJS(data),
    sendToLeadflow(data)
  ]);

  if (DEBUG_MODE) {
    console.log('Email submission results:', {
      emailJS: emailJSSuccess,
      leadflow: leadflowSuccess
    });
  }

  // Only throw error if ALL methods fail
  if (!emailJSSuccess && !leadflowSuccess) {
    throw new Error('Failed to send contact form data');
  }
};
