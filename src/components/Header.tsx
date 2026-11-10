import React from 'react';
import { GraduationCap, BookOpen, BarChart3, Settings, HelpCircle, Layers } from 'lucide-react';

interface HeaderProps {
  currentMode: 'calculator' | 'exam';
  onSelectMode: (mode: 'calculator' | 'exam') => void;
  onOpenRubric: () => void;
  onOpenThresholds: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  onOpenRubric,
  onOpenThresholds,
  onOpenSettings,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Zone 1: Wordmark */}
          <div
            onClick={() => onSelectMode('calculator')}
            className="flex items-center gap-3 shrink-0 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 flex items-center justify-center text-white shadow-xs">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight whitespace-nowrap">
                مباراة التعليم بالمغرب
              </span>
              <span className="hidden sm:inline text-xs text-slate-500 mr-2">
                · بوابة الانتقاء والاختبارات
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold text-slate-600">
            {/* Mode Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => onSelectMode('calculator')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  currentMode === 'calculator'
                    ? 'bg-white font-bold text-emerald-800 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                حاسبة الانتقاء
              </button>
              <button
                type="button"
                onClick={() => onSelectMode('exam')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  currentMode === 'exam'
                    ? 'bg-white font-bold text-blue-800 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                امتحان علوم التربية
              </button>
            </div>

            <button
              onClick={onOpenThresholds}
              className="hover:text-emerald-800 transition-colors hidden md:flex items-center gap-1 cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-emerald-700" />
              <span>جدول العتبات</span>
            </button>

            <button
              onClick={onOpenRubric}
              className="hover:text-emerald-800 transition-colors hidden md:flex items-center gap-1 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>شبكة التنقيط</span>
            </button>

            {/* Settings Button */}
            <button
              onClick={onOpenSettings}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="الإعدادات وسجل المستخدمين"
            >
              <Settings className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">الإعدادات</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
