import emailjs from '@emailjs/browser';

// Webhook configuration
const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/k90zUH3RgEQLfj7Yc55b/webhook-trigger/54670718-ea44-43a1-a81a-680ab3d5f67f";

// Debug mode for troubleshooting
const DEBUG_MODE = false;

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
  'installatie': 'Ik ben geïnteresseerd in een airco installatie',
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

// Send data to GoHighLevel webhook
const sendToWebhook = async (data: EmailData): Promise<boolean> => {
  try {
    // Construct message with service info
    let fullMessage = data.message;
    if (data.service && serviceMessages[data.service]) {
      fullMessage = `${serviceMessages[data.service]}\n\n${data.message || ''}`.trim();
    }

    const webhookData = {
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city || '',
        message: fullMessage
      }
    };

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(webhookData)
    });

    if (DEBUG_MODE) {
      console.log('Webhook Response:', {
        status: response.status,
        statusText: response.statusText
      });
    }

    return response.ok;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('Webhook Error:', error);
    }
    return false;
  }
};

// Main send function with dual submission
export const sendEmail = async (data: EmailData): Promise<void> => {
  if (DEBUG_MODE) {
    console.log('Sending email with data:', data);
  }

  // Send to both services in parallel
  const [emailJSSuccess, webhookSuccess] = await Promise.all([
    sendViaEmailJS(data),
    sendToWebhook(data)
  ]);

  if (DEBUG_MODE) {
    console.log('Email submission results:', {
      emailJS: emailJSSuccess,
      webhook: webhookSuccess
    });
  }

  // Only throw error if BOTH methods fail
  if (!emailJSSuccess && !webhookSuccess) {
    throw new Error('Failed to send contact form data');
  }
};

// Webhook-only function for testing
export const sendToWebhookOnly = async (data: EmailData): Promise<void> => {
  const success = await sendToWebhook(data);
  if (!success) {
    throw new Error('Failed to send data to webhook');
  }
};