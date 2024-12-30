import React from 'react';
import { Mail, Globe, Package, MessageCircle } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export default function InfoPage() {
  const { t } = useTranslation();
  const version = '1.0.0';

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{t('about')}</h1>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Package className="text-purple-500" />
            {t('version')}
          </h2>
          <p className="text-gray-600">v{version}</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Globe className="text-purple-500" />
            {t('about')}
          </h2>
          <p className="text-gray-600">{t('appDescription')}</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Mail className="text-purple-500" />
            {t('contact')}
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <a 
                href="mailto:support@familyhub.com" 
                className="text-purple-600 hover:text-purple-700"
              >
                support@familyhub.com
              </a>
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <MessageCircle className="text-purple-500" size={20} />
              <a 
                href="https://t.me/+IZvCzftSDpQyYzE8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700"
              >
                {t('telegramSupport')}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}