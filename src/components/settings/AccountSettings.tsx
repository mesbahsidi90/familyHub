import React from 'react';
import { LogOut } from 'lucide-react';
import { supabase } from '../../utils/supabase';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../hooks/useAuth';

export default function AccountSettings() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">{t('account')}</h3>
      <div className="space-y-4">
        <div className="p-3 rounded-lg border">
          <p className="text-sm text-gray-600">{t('loggedInAs')}</p>
          <p className="font-medium">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-3 text-red-600 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          <span>{t('logout')}</span>
        </button>
      </div>
    </div>
  );
}