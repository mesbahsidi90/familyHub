import React from 'react';
import MealForm from './MealForm';
import MealList from './MealList';
import { useTranslation } from '../../hooks/useTranslation';
import { useMeals } from '../../hooks/useMeals';
import type { MealPlan } from '../../types';

export default function MealPlanner() {
  const { t } = useTranslation();
  const { meals, loading, addMeal, deleteMeal } = useMeals();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">{t('mealPlanner')}</h2>
      <MealForm onSubmit={addMeal} />
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-500 border-t-transparent"></div>
        </div>
      ) : (
        <MealList meals={meals} onDelete={deleteMeal} />
      )}
    </div>
  );
}