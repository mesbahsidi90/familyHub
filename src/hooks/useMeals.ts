import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from './useAuth';
import type { MealPlan } from '../types';

export function useMeals() {
  const [meals, setMeals] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadMeals();
    }
  }, [user]);

  const loadMeals = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('meals')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      if (data) {
        setMeals(data);
      }
    } catch (error) {
      console.error('Error loading meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMeal = async (meal: Omit<MealPlan, 'id' | 'user_id'>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('meals')
        .insert({
          ...meal,
          user_id: user.id
        });

      if (error) throw error;
      await loadMeals();
    } catch (error) {
      console.error('Error adding meal:', error);
    }
  };

  const deleteMeal = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('meals')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      await loadMeals();
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  return {
    meals,
    loading,
    addMeal,
    deleteMeal
  };
}