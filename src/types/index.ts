export type TaskFrequency = 'daily' | 'weekly' | 'monthly';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  frequency: TaskFrequency;
  completed: boolean;
}

export interface MealPlan {
  id: string;
  day: string;
  type: MealType;
  recipe: string;
  user_id: string;
}

// ... rest of the types remain the same