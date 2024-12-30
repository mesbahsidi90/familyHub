import React from 'react';
import Modal from '../common/Modal';
import type { MealPlan } from '../../types';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface MealFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (meal: Omit<MealPlan, 'id'>) => void;
}

export default function MealForm({ isOpen, onClose, onSubmit }: MealFormProps) {
  const [formData, setFormData] = React.useState({
    day: '',
    meal: '',
    recipe: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ day: '', meal: '', recipe: '', notes: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Meal">
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={formData.day}
          onChange={e => setFormData({ ...formData, day: e.target.value })}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select day</option>
          {DAYS_OF_WEEK.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Meal (e.g., Breakfast, Lunch, Dinner)"
          value={formData.meal}
          onChange={e => setFormData({ ...formData, meal: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Recipe name"
          value={formData.recipe}
          onChange={e => setFormData({ ...formData, recipe: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Notes (ingredients, preparation, etc.)"
          value={formData.notes}
          onChange={e => setFormData({ ...formData, notes: e.target.value })}
          className="w-full p-2 border rounded"
          rows={3}
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Add Meal
        </button>
      </form>
    </Modal>
  );
}