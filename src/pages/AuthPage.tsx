import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import LanguageSelector from '../components/auth/LanguageSelector';
import { LayoutGrid } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

type AuthMode = 'login' | 'signup' | 'forgot-password';

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const { t } = useTranslation();

  const renderForm = () => {
    switch (mode) {
      case 'signup':
        return <SignupForm onToggleMode={() => setMode('login')} />;
      case 'forgot-password':
        return <ForgotPasswordForm onBack={() => setMode('login')} />;
      default:
        return <LoginForm onToggleMode={(newMode: AuthMode) => setMode(newMode)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <LayoutGrid className="text-purple-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-900">
              {t('appName')}
            </h1>
          </div>
          <p className="text-gray-600">
            {mode === 'login' ? t('welcomeBack') : 
             mode === 'signup' ? t('getStarted') : 
             t('resetPasswordTitle')}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          {renderForm()}
          
          <div className="mt-6 pt-6 border-t">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </div>
  );
}