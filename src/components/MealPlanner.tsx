import React, { useState } from 'react';
import { Utensils } from 'lucide-react';
import type { MealPlan } from '../types';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function MealPlanner() {
  const [meals, setMeals] = useState<MealPlan[]>([]);
  const [newMeal, setNewMeal] = useState({
    day: '',
    meal: '',
    recipe: '',
    notes: '',
  });

  const addMeal = (e: React.FormEvent) => {
    e.preventDefault();
    const meal: MealPlan = {
      id: crypto.randomUUID(),
      ...newMeal,
    };
    setMeals([...meals, meal]);
    setNewMeal({ day: '', meal: '', recipe: '', notes: '' });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Meal Planner</h2>

      <form onSubmit={addMeal} className="mb-6 space-y-4">
        <select
          value={newMeal.day}
          onChange={e => setNewMeal({ ...newMeal, day: e.target.value })}
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
          value={newMeal.meal}
          onChange={e => setNewMeal({ ...newMeal, meal: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Recipe name"
          value={newMeal.recipe}
          onChange={e => setNewMeal({ ...newMeal, recipe: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Notes (ingredients, preparation, etc.)"
          value={newMeal.notes}
          onChange={e => setNewMeal({ ...newMeal, notes: e.target.value })}
          className="w-full p-2 border rounded"
          rows={3}
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center justify-center gap-2"
        >
          <Utensils size={20} /> Add Meal
        </button>
      </form>

      <div className="space-y-4">
        {DAYS_OF_WEEK.map(day => {
          const dayMeals = meals.filter(meal => meal.day === day);
          if (dayMeals.length === 0) return null;

          return (
            <div key={day} className="border rounded p-4">
              <h3 className="font-medium text-lg mb-2">{day}</h3>
              <div className="space-y-2">
                {dayMeals.map(meal => (
                  <div key={meal.id} className="pl-4 border-l-2 border-green-500">
                    <div className="font-medium">{meal.meal}: {meal.recipe}</div>
                    {meal.notes && (
                      <p className="text-sm text-gray-600 mt-1">{meal.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}