import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import type { MealType } from '../../types';

interface MealTypeSelectProps {
  value: MealType | '';
  onChange: (value: MealType) => void;
}

export default function MealTypeSelect({ value, onChange }: MealTypeSelectProps) {
  const { t } = useTranslation();
  
  const mealTypes: { value: MealType; label: string }[] = [
    { value: 'breakfast', label: t('breakfast') },
    { value: 'lunch', label: t('lunch') },
    { value: 'dinner', label: t('dinner') },
    { value: 'snack', label: t('snack') },
  ];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as MealType)}
      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
      required
    >
      <option value="">{t('selectMealType')}</option>
      {mealTypes.map(({ value, label }) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </select>
  );
}