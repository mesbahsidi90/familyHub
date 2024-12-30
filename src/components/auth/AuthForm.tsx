import React, { useState } from 'react';
import { supabase } from '../../utils/supabase';
import { Mail, Lock, Loader } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

interface AuthFormProps {
  mode: 'login' | 'signup';
  onToggleMode: () => void;
}

export default function AuthForm({ mode, onToggleMode }: AuthFormProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp(formData);
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword(formData);
        if (error) throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('email')}
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('password')}
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="password"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
            minLength={6}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <Loader className="animate-spin" size={20} />
        ) : (
          mode === 'login' ? t('login') : t('signup')
        )}
      </button>

      <p className="text-sm text-center text-gray-600">
        {mode === 'login' ? t('noAccount') : t('haveAccount')}{' '}
        <button
          type="button"
          onClick={onToggleMode}
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          {mode === 'login' ? t('signup') : t('login')}
        </button>
      </p>
    </form>
  );
}