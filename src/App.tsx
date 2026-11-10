import React, { useState } from 'react';
import { Header } from './components/Header';
import { StepWizard } from './components/StepWizard';
import { ScoringMatrixModal } from './components/ScoringMatrixModal';
import { RegionalAdviceModal } from './components/RegionalAdviceModal';
import { ThresholdsModal } from './components/ThresholdsModal';
import { SettingsModal } from './components/SettingsModal';
import { ShieldCheck, Settings } from 'lucide-react';

export default function App() {
  const [isRubricOpen, setIsRubricOpen] = useState(false);
  const [isRegionsOpen, setIsRegionsOpen] = useState(false);
  const [isThresholdsOpen, setIsThresholdsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-['Cairo',sans-serif] selection:bg-emerald-100 selection:text-emerald-900">
      {/* Header */}
      <Header
        onOpenRubric={() => setIsRubricOpen(true)}
        onOpenThresholds={() => setIsThresholdsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 flex flex-col justify-center max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <StepWizard
          onOpenRegions={() => setIsRegionsOpen(true)}
          onOpenRubric={() => setIsRubricOpen(true)}
        />
      </main>

      {/* Modals */}
      <ScoringMatrixModal
        isOpen={isRubricOpen}
        onClose={() => setIsRubricOpen(false)}
      />
      <RegionalAdviceModal
        isOpen={isRegionsOpen}
        onClose={() => setIsRegionsOpen(false)}
      />
      <ThresholdsModal
        isOpen={isThresholdsOpen}
        onClose={() => setIsThresholdsOpen(false)}
        onSelectSpecialty={() => {}}
      />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Minimalist Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-5 mt-auto no-print">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>حاسبة حظوظ الانتقاء الأولي في مباراة التعليم بالمغرب</span>
            <span aria-hidden="true">·</span>
            <span>معايير وزارة التربية الوطنية الرسمية</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsRegionsOpen(true)}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              دليل جهات الخصاص (AREF)
            </button>
            <button
              onClick={() => setIsRubricOpen(true)}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              شبكة 80 نقطة
            </button>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="hover:text-emerald-800 transition-colors cursor-pointer flex items-center gap-1 text-slate-600"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>الإعدادات</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
