import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import type { User, AuthError } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error.message);
        // Handle invalid refresh token by signing out
        if (error.message.includes('refresh_token_not_found')) {
          supabase.auth.signOut();
        }
      }
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'TOKEN_REFRESHED') {
        // Successfully refreshed token
        setUser(session?.user ?? null);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        // Clear any stored auth data
        localStorage.removeItem('supabase.auth.token');
      } else {
        setUser(session?.user ?? null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleError = (error: AuthError) => {
    console.error('Auth error:', error.message);
    if (error.message.includes('refresh_token_not_found')) {
      // Invalid refresh token, sign out user
      supabase.auth.signOut();
      setUser(null);
    }
  };

  return { 
    user, 
    loading,
    handleError 
  };
}