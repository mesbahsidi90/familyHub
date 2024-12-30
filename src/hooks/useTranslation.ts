import { useLanguage } from './useLanguage';
import { translations } from '../utils/translations';

type TranslationKey = keyof typeof translations['en'];
type TranslationParams = Record<string, string | number>;

export function useTranslation() {
  const { currentLanguage } = useLanguage();
  
  const t = (key: TranslationKey, params?: TranslationParams) => {
    let text = translations[currentLanguage]?.[key] || translations['en'][key];
    
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{{${param}}}`, String(value));
      });
    }
    
    return text || key; // Fallback to key if translation is missing
  };
  
  const dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
  
  return { t, dir };
}