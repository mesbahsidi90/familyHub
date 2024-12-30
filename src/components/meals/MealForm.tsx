import React, { useState } from 'react';
import { Utensils } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import MealTypeSelect from './MealTypeSelect';
import type { MealPlan, MealType } from '../../types';

interface MealFormProps {
  onSubmit: (meal: Omit<MealPlan, 'id' | 'user_id'>) => void;
}

export default function MealForm({ onSubmit }: MealFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    day: '',
    type: '' as MealType | '',
    recipe: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.type) {
      onSubmit(formData as Omit<MealPlan, 'id' | 'user_id'>);
      setFormData({ day: '', type: '', recipe: '' });
    }
  };

  const DAYS_OF_WEEK = [
    { value: 'monday', label: t('monday') },
    { value: 'tuesday', label: t('tuesday') },
    { value: 'wednesday', label: t('wednesday') },
    { value: 'thursday', label: t('thursday') },
    { value: 'friday', label: t('friday') },
    { value: 'saturday', label: t('saturday') },
    { value: 'sunday', label: t('sunday') },
  ];

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <select
        value={formData.day}
        onChange={e => setFormData({ ...formData, day: e.target.value })}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        required
      >
        <option value="">{t('selectDay')}</option>
        {DAYS_OF_WEEK.map(day => (
          <option key={day.value} value={day.value}>{day.label}</option>
        ))}
      </select>

      <MealTypeSelect
        value={formData.type}
        onChange={(type) => setFormData({ ...formData, type })}
      />

      <input
        type="text"
        placeholder={t('recipeName')}
        value={formData.recipe}
        onChange={e => setFormData({ ...formData, recipe: e.target.value })}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        required
      />

      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
      >
        <Utensils size={20} /> {t('addMeal')}
      </button>
    </form>
  );
}