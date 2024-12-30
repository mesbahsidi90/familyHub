import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
] as const;

export default function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <div className="flex items-center justify-center gap-2 text-gray-600">
      <Globe size={20} />
      <select
        value={currentLanguage}
        onChange={(e) => setLanguage(e.target.value as typeof LANGUAGES[number]['code'])}
        className="bg-transparent border-none outline-none cursor-pointer hover:text-gray-900"
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