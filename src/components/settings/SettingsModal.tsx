import React from 'react';
import Modal from '../common/Modal';
import LanguageSettings from './LanguageSettings';
import ThemeSettings from './ThemeSettings';
import FamilyMembers from './FamilyMembers';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings">
      <div className="space-y-6">
        <ThemeSettings />
        <div className="border-t pt-6">
          <LanguageSettings />
        </div>
        <div className="border-t pt-6">
          <FamilyMembers />
        </div>
      </div>
    </Modal>
  );
}