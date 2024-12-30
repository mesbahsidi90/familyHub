import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
] as const;

export default function LanguageSettings() {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Language</h3>
      <div className="flex items-center gap-2 p-3 rounded-lg border">
        <Globe size={20} className="text-gray-500" />
        <select
          value={currentLanguage}
          onChange={(e) => setLanguage(e.target.value as typeof LANGUAGES[number]['code'])}
          className="flex-1 bg-transparent outline-none"
          dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}
        >
          {LANGUAGES.map(({ code, name, nativeName }) => (
            <option key={code} value={code}>
              {nativeName} ({name})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}