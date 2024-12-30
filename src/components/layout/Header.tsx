import React from 'react';
import { LayoutGrid } from 'lucide-react';
import DateTime from './DateTime';
import WeatherDisplay from '../weather/WeatherDisplay';
import LanguageSelector from '../language/LanguageSelector';
import { useTranslation } from '../../hooks/useTranslation';

export default function Header() {
  const { t, dir } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow z-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3" dir={dir}>
          <div className="flex items-center gap-3 min-w-0">
            <LayoutGrid className="text-blue-500 icon-lg" />
            <h1 className="text-heading text-gray-900 dark:text-white truncate">
              {t('appName')}
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <WeatherDisplay />
            <DateTime />
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}