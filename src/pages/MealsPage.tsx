import React from 'react';
import MealPlanner from '../components/meals/MealPlanner';
import { useTranslation } from '../hooks/useTranslation';

export default function MealsPage() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{t('mealPlanner')}</h1>
      <MealPlanner />
    </div>
  );
}