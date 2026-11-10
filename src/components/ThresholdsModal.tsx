import React from 'react';
import { X } from 'lucide-react';
import { ThresholdsTable } from './ThresholdsTable';

interface ThresholdsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSpecialty: (id: string) => void;
}

export const ThresholdsModal: React.FC<ThresholdsModalProps> = ({
  isOpen,
  onClose,
  onSelectSpecialty,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          title="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        <ThresholdsTable
          onSelectSpecialtyForCalc={(id) => {
            onSelectSpecialty(id);
            onClose();
          }}
        />
      </div>
    </div>
  );
};
