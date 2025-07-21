import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { sendToWebhookOnly, EmailData } from '../utils/email';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TestFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  message: string;
}

export default function ContactWebhookTest() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    timestamp: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TestFormData>();

  useEffect(() => {
    // Add noindex meta tag
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);

    // Cleanup on unmount
    return () => {
      document.head.removeChild(metaRobots);
    };
  }, []);

  const onSubmit = async (data: TestFormData) => {
    setIsSubmitting(true);
    setTestResult(null);

    try {
      const emailData: EmailData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        message: data.message,
      };

      await sendToWebhookOnly(emailData);
      
      setTestResult({
        success: true,
        message: 'Webhook successfully received the data!',
        timestamp: new Date().toLocaleString('nl-NL'),
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Webhook failed. Check console for details.',
        timestamp: new Date().toLocaleString('nl-NL'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Webhook Test Page</h1>
          <p className="text-gray-600 mb-8">
            This page tests the GoHighLevel webhook integration without sending emails.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <p className="text-sm">
              <strong>Note:</strong> This page is for testing purposes only and should not be indexed by search engines.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Test User"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="test@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                {...register('phone', { required: 'Phone is required' })}
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0612345678"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                {...register('city', { required: 'City is required' })}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Maastricht"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                {...register('message', { required: 'Message is required' })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Test message for webhook"
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending to Webhook...' : 'Test Webhook'}
            </button>
          </form>

          {testResult && (
            <div
              className={`mt-8 p-6 rounded-lg ${
                testResult.success
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <h3
                className={`font-semibold text-lg mb-2 ${
                  testResult.success ? 'text-green-800' : 'text-red-800'
                }`}
              >
                {testResult.success ? '✅ Success!' : '❌ Failed'}
              </h3>
              <p className={testResult.success ? 'text-green-700' : 'text-red-700'}>
                {testResult.message}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Timestamp: {testResult.timestamp}
              </p>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Webhook Details:</h4>
            <p className="text-sm text-gray-600 break-all">
              URL: https://services.leadconnectorhq.com/hooks/k90zUH3RgEQLfj7Yc55b/webhook-trigger/54670718-ea44-43a1-a81a-680ab3d5f67f
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Method: POST | Content-Type: application/json
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}