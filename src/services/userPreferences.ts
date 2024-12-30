import { supabase } from '../utils/supabase';

export interface UserPreferences {
  language: string;
}

export async function getUserPreferences(userId: string): Promise<UserPreferences | null> {
  try {
    // First try to get existing preferences
    const { data, error } = await supabase
      .from('user_preferences')
      .select('language')
      .eq('user_id', userId)
      .maybeSingle(); // Use maybeSingle() instead of single()

    if (error) throw error;

    // If no preferences exist, create default ones
    if (!data) {
      const defaultPreferences: UserPreferences = {
        language: 'en'
      };

      const { error: insertError } = await supabase
        .from('user_preferences')
        .insert({
          user_id: userId,
          ...defaultPreferences
        });

      if (insertError) throw insertError;

      return defaultPreferences;
    }

    return data;
  } catch (error) {
    console.error('Error managing user preferences:', error);
    return null;
  }
}

export async function updateUserPreferences(
  userId: string, 
  preferences: Partial<UserPreferences>
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        ...preferences
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return false;
  }
}