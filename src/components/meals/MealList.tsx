import React from 'react';
import { Trash2 } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import type { MealPlan } from '../../types';

interface MealListProps {
  meals: MealPlan[];
  onDelete: (id: string) => void;
}

export default function MealList({ meals, onDelete }: MealListProps) {
  const { t } = useTranslation();
  const DAYS_OF_WEEK = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ];

  return (
    <div className="space-y-4">
      {DAYS_OF_WEEK.map(day => {
        const dayMeals = meals.filter(meal => meal.day === day);
        if (dayMeals.length === 0) return null;

        return (
          <div key={day} className="border rounded-lg p-4">
            <h3 className="font-medium text-lg mb-2 capitalize">{t(day)}</h3>
            <div className="space-y-2">
              {dayMeals.map(meal => (
                <div 
                  key={meal.id} 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <div className="font-medium capitalize">{t(meal.type)}</div>
                    <div className="text-gray-600">{meal.recipe}</div>
                  </div>
                  <button
                    onClick={() => onDelete(meal.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}