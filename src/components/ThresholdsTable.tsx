import React, { useState } from 'react';
import { SPECIALTIES } from '../data/taalimData';
import { EducationCycle, Specialty } from '../types';
import {
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowUpDown,
  Filter,
  Calculator,
} from 'lucide-react';

interface ThresholdsTableProps {
  onSelectSpecialtyForCalc: (specialtyId: string) => void;
}

export const ThresholdsTable: React.FC<ThresholdsTableProps> = ({
  onSelectSpecialtyForCalc,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cycleFilter, setCycleFilter] = useState<EducationCycle | 'all'>('all');
  const [sortBy, setSortBy] = useState<'threshold-desc' | 'threshold-asc' | 'name'>('threshold-desc');

  const filtered = SPECIALTIES.filter((spec) => {
    const matchesCycle = cycleFilter === 'all' || spec.cycle === cycleFilter;
    const matchesSearch =
      spec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spec.cycleLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spec.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCycle && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'threshold-desc') return b.referenceThreshold - a.referenceThreshold;
    if (sortBy === 'threshold-asc') return a.referenceThreshold - b.referenceThreshold;
    return a.name.localeCompare(b.name, 'ar');
  });

  const getCompetitionBadge = (spec: Specialty) => {
    if (spec.referenceThreshold === 0) {
      return (
        <span className="text-emerald-800 font-bold text-xs flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          قبول شبه مباشر (عتبة 0)
        </span>
      );
    }
    if (spec.referenceThreshold >= 60) {
      return (
        <span className="text-rose-700 font-bold text-xs flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
          تنافسية عالية جداً ({spec.referenceThreshold} نقطة)
        </span>
      );
    }
    if (spec.referenceThreshold >= 30) {
      return (
        <span className="text-amber-700 font-bold text-xs flex items-center gap-1">
          تنافسية متوسطة ({spec.referenceThreshold} نقطة)
        </span>
      );
    }
    return (
      <span className="text-blue-700 font-bold text-xs flex items-center gap-1">
        عتبة ميسّرة ({spec.referenceThreshold} نقطة)
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <span>المرجع الوطني الرسمي</span>
            <span aria-hidden="true">·</span>
            <span>دورة 2025 والمؤشرات المرتقبة لـ 2026</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            جدول عتبات الانتقاء المرجعية لجميع التخصصات
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            العتبات الوطنية المرجعية التي تعتمدها الأكاديميات الجهوية للتربية والتكوين لانتقاء المترشحين لاجتياز الاختبارات الكتابية.
          </p>
        </div>

        {/* Total count badge */}
        <div className="px-3.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 shrink-0">
          {SPECIALTIES.length} تخصصاً معتمداً
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث عن التخصص (مثال: رياضيات، ابتدائي...)"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
          />
        </div>

        {/* Cycle filter buttons */}
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto p-1 bg-slate-100 rounded-xl text-xs">
          <button
            onClick={() => setCycleFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-medium ${
              cycleFilter === 'all'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setCycleFilter('primary')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-medium ${
              cycleFilter === 'primary'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            الابتدائي
          </button>
          <button
            onClick={() => setCycleFilter('middle')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-medium ${
              cycleFilter === 'middle'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            الإعدادي
          </button>
          <button
            onClick={() => setCycleFilter('secondary')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-medium ${
              cycleFilter === 'secondary'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            التأهيلي
          </button>
          <button
            onClick={() => setCycleFilter('common')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-medium ${
              cycleFilter === 'common'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            المشترك
          </button>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 shrink-0">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
          >
            <option value="threshold-desc">العتبة: من الأعلى إلى الأدنى</option>
            <option value="threshold-asc">العتبة: من الأدنى إلى الأعلى</option>
            <option value="name">الاسم الأبجدي</option>
          </select>
        </div>
      </div>

      {/* Table view */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">التخصص والسلك</th>
                <th className="py-3.5 px-4">السلك التعليمي</th>
                <th className="py-3.5 px-4 text-center">العتبة المرجعية (2025)</th>
                <th className="py-3.5 px-4">مستوى التنافسية</th>
                <th className="py-3.5 px-4">ملاحظة توجيهية</th>
                <th className="py-3.5 px-4 text-left">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((spec) => (
                <tr
                  key={spec.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {spec.name}
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-medium">
                    {spec.cycleLabel}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block px-3 py-1 rounded-md font-extrabold text-sm tabular-nums bg-slate-100 text-slate-900">
                      {spec.referenceThreshold} نقطة
                    </span>
                  </td>
                  <td className="py-3 px-4">{getCompetitionBadge(spec)}</td>
                  <td className="py-3 px-4 text-slate-500 max-w-xs truncate">
                    {spec.description}
                  </td>
                  <td className="py-3 px-4 text-left">
                    <button
                      onClick={() => onSelectSpecialtyForCalc(spec.id)}
                      className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors inline-flex items-center gap-1"
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>احسب حظوظي</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
