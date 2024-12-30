import React from 'react';
import LanguageSettings from '../components/settings/LanguageSettings';
import ThemeSettings from '../components/settings/ThemeSettings';
import FamilyMembers from '../components/settings/FamilyMembers';
import AccountSettings from '../components/settings/AccountSettings';
import { useTranslation } from '../hooks/useTranslation';

export default function SettingsPage() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">{t('settings')}</h1>
      
      <section className="bg-white rounded-lg shadow p-6">
        <AccountSettings />
      </section>

      <section className="bg-white rounded-lg shadow p-6">
        <ThemeSettings />
      </section>

      <section className="bg-white rounded-lg shadow p-6">
        <LanguageSettings />
      </section>

      <section className="bg-white rounded-lg shadow p-6">
        <FamilyMembers />
      </section>
    </div>
  );
}