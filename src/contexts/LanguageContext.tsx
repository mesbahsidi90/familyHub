import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getUserPreferences, updateUserPreferences } from '../services/userPreferences';
import type { ReactNode } from 'react';

type LanguageContextType = {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  loading: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState(() => 
    localStorage.getItem('language') || navigator.language.split('-')[0] || 'en'
  );
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load language preference
  useEffect(() => {
    async function loadLanguagePreference() {
      if (user) {
        const preferences = await getUserPreferences(user.id);
        if (preferences?.language) {
          setCurrentLanguage(preferences.language);
          localStorage.setItem('language', preferences.language);
        } else {
          // Save current language if no preference exists
          await updateUserPreferences(user.id, { language: currentLanguage });
        }
      }
      setLoading(false);
    }

    loadLanguagePreference();
  }, [user, currentLanguage]);

  // Handle language changes
  const setLanguage = async (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
    
    if (user) {
      await updateUserPreferences(user.id, { language: lang });
    }

    // Sync across tabs
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'language',
      newValue: lang
    }));
  };

  // Listen for language changes in other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'language' && e.newValue && e.newValue !== currentLanguage) {
        setCurrentLanguage(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [currentLanguage]);

  // Update document attributes
  useEffect(() => {
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, loading }}>
      {!loading && children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}