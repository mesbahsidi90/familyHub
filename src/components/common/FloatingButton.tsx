import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingButtonProps {
  onClick: () => void;
  className?: string;
}

export default function FloatingButton({ onClick, className = '' }: FloatingButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-16 h-16 bg-purple-600 text-white rounded-full shadow-lg 
                 flex items-center justify-center hover:bg-purple-700 transition-colors z-30 ${className}`}
    >
      <Plus className="icon-lg" />
    </button>
  );
}