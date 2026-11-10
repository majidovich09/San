import React from 'react';
import { GraduationCap, BookOpen, BarChart3, Settings } from 'lucide-react';

interface HeaderProps {
  onOpenRubric: () => void;
  onOpenThresholds: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenRubric,
  onOpenThresholds,
  onOpenSettings,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Zone 1: Single text wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 flex items-center justify-center text-white shadow-xs">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight whitespace-nowrap">
                حاسبة حظوظ الانتقاء
              </span>
              <span className="hidden sm:inline text-xs text-slate-500 mr-2">
                · مباراة التعليم بالمغرب
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm font-semibold text-slate-600">
            <button
              onClick={onOpenThresholds}
              className="hover:text-emerald-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-emerald-700" />
              <span>جدول العتبات</span>
            </button>

            <button
              onClick={onOpenRubric}
              className="hover:text-emerald-800 transition-colors flex items-center gap-1 cursor-pointer"
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
              <span>الإعدادات</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
