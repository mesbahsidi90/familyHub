import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useTranslation } from '../../hooks/useTranslation';

const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
] as const;

export default function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguage();
  const { dir } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <Globe size={20} className="text-gray-500" />
      <select
        value={currentLanguage}
        onChange={(e) => setLanguage(e.target.value as typeof LANGUAGES[number]['code'])}
        className="bg-transparent border-none outline-none text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
        dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}
      >
        {LANGUAGES.map(({ code, name, nativeName }) => (
          <option key={code} value={code} dir={code === 'ar' ? 'rtl' : 'ltr'}>
            {nativeName} ({name})
          </option>
        ))}
      </select>
    </div>
  );
}