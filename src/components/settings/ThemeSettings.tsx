import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeSettings() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Theme</h3>
      <button
        onClick={toggleTheme}
        className="w-full flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50"
      >
        <span className="flex items-center gap-2">
          {isDark ? <Moon size={20} /> : <Sun size={20} />}
          <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
        </span>
        <div className={`w-10 h-6 rounded-full p-1 transition-colors ${
          isDark ? 'bg-purple-600' : 'bg-gray-300'
        }`}>
          <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
            isDark ? 'translate-x-4' : ''
          }`} />
        </div>
      </button>
    </div>
  );
}