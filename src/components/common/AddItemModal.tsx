import React from 'react';
import Modal from './Modal';
import { CheckSquare } from 'lucide-react';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: 'task') => void;
}

export default function AddItemModal({ isOpen, onClose, onSelect }: AddItemModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Task">
      <button
        onClick={() => {
          onSelect('task');
          onClose();
        }}
        className="w-full p-4 rounded-lg flex items-center gap-3 transition-colors hover:bg-blue-50 text-blue-600"
      >
        <CheckSquare size={24} />
        <span className="font-medium">Add Task</span>
      </button>
    </Modal>
  );
}