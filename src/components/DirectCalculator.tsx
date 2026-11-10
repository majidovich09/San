import React, { useState } from 'react';
import {
  BacMention,
  LicenseMention,
  GraduationAgeCategory,
  EducationCycle,
} from '../types';
import {
  SPECIALTIES,
  BAC_POINTS,
  LICENSE_POINTS,
  AGE_POINTS,
  calculateExactScore,
} from '../data/taalimData';
import { ReportCard } from './ReportCard';
import {
  Calculator,
  Sliders,
  Check,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Layers,
} from 'lucide-react';

interface DirectCalculatorProps {
  onOpenRegions: () => void;
}

export const DirectCalculator: React.FC<DirectCalculatorProps> = ({ onOpenRegions }) => {
  const [selectedCycle, setSelectedCycle] = useState<EducationCycle | 'all'>('all');
  const [specialtyId, setSpecialtyId] = useState<string>('prim_dual');
  const [bacMention, setBacMention] = useState<BacMention>('bien');
  const [licenseMention, setLicenseMention] = useState<LicenseMention>('bien');
  const [graduationAge, setGraduationAge] = useState<GraduationAgeCategory>('age_23');
  const [candidateName, setCandidateName] = useState<string>('');

  const currentResult = calculateExactScore(
    bacMention,
    licenseMention,
    graduationAge,
    specialtyId
  );

  const filteredSpecialties =
    selectedCycle === 'all'
      ? SPECIALTIES
      : SPECIALTIES.filter((s) => s.cycle === selectedCycle);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Intro banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
            <Sliders className="w-4 h-4 text-emerald-700" />
            <span>لوحة الحساب التفاعلي الفوري</span>
            <span aria-hidden="true">·</span>
            <span>الشبكة المعتمدة رسمياً (80 نقطة)</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">
            حاسبة الانتقاء التفاعلية السريعة
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl">
            عدّل المعايير الأربعة بنقرة واحدة وشاهد تحديث مجموعك، مقارنته بالعتبة المرجعية، ونسبة حظوظك التقديرية بشكل فوري ولحظي.
          </p>
        </div>

        {/* Candidate name input for personalized certificate */}
        <div className="w-full md:w-64">
          <label className="text-xs text-slate-600 font-medium block mb-1">
            اسم المترشح(ة) (اختياري للطباعة):
          </label>
          <input
            type="text"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            placeholder="مثال: يوسف العلمي"
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input Form (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. التخصص والسلك */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <span>السلك والتخصص المطلوب</span>
              </label>

              {/* Cycle filters */}
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedCycle('all')}
                  className={`px-2 py-1 rounded transition-colors ${
                    selectedCycle === 'all'
                      ? 'bg-white font-bold text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  الكل
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCycle('primary')}
                  className={`px-2 py-1 rounded transition-colors ${
                    selectedCycle === 'primary'
                      ? 'bg-white font-bold text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  الابتدائي
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCycle('middle')}
                  className={`px-2 py-1 rounded transition-colors ${
                    selectedCycle === 'middle'
                      ? 'bg-white font-bold text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  الإعدادي
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCycle('secondary')}
                  className={`px-2 py-1 rounded transition-colors ${
                    selectedCycle === 'secondary'
                      ? 'bg-white font-bold text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  التأهيلي
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCycle('common')}
                  className={`px-2 py-1 rounded transition-colors ${
                    selectedCycle === 'common'
                      ? 'bg-white font-bold text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  مشترك
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto p-1">
              {filteredSpecialties.map((spec) => {
                const isSelected = specialtyId === spec.id;
                return (
                  <button
                    key={spec.id}
                    type="button"
                    onClick={() => setSpecialtyId(spec.id)}
                    className={`text-right p-3 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/80 ring-1 ring-emerald-500 text-emerald-950 font-semibold'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <span className="font-bold block truncate">{spec.name}</span>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-1 border-t border-slate-200/50">
                      <span>{spec.cycleLabel}</span>
                      <span className="font-semibold text-emerald-700">
                        عتبة: {spec.referenceThreshold} نقطة
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. ميزة شهادة البكالوريا */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <span>ميزة شهادة البكالوريا (الحد الأقصى: 25 نقطة)</span>
              </label>
              <span className="text-xs font-bold text-emerald-700">
                +{BAC_POINTS[bacMention].points} نقطة
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(BAC_POINTS) as BacMention[]).map((key) => {
                const item = BAC_POINTS[key];
                const isSelected = bacMention === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setBacMention(key)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-emerald-700 border-emerald-700 text-white font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <span className="block text-xs font-bold">{item.label}</span>
                    <span
                      className={`text-xs mt-1 block font-semibold ${
                        isSelected ? 'text-white' : 'text-emerald-700'
                      }`}
                    >
                      {item.points} نقطة
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. ميزة شهادة الإجازة */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <span>ميزة شهادة الإجازة (الحد الأقصى: 30 نقطة)</span>
              </label>
              <span className="text-xs font-bold text-emerald-700">
                +{LICENSE_POINTS[licenseMention].points} نقطة
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(LICENSE_POINTS) as LicenseMention[]).map((key) => {
                const item = LICENSE_POINTS[key];
                const isSelected = licenseMention === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setLicenseMention(key)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-emerald-700 border-emerald-700 text-white font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <span className="block text-xs font-bold">{item.label}</span>
                    <span
                      className={`text-xs mt-1 block font-semibold ${
                        isSelected ? 'text-white' : 'text-emerald-700'
                      }`}
                    >
                      {item.points} نقطة
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. السن عند الحصول على شهادة الإجازة */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
                  4
                </span>
                <span>السن عند نيل الإجازة (الحد الأقصى: 25 نقطة)</span>
              </label>
              <span className="text-xs font-bold text-emerald-700">
                +{AGE_POINTS[graduationAge].points} نقطة
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(AGE_POINTS) as GraduationAgeCategory[]).map((key) => {
                const item = AGE_POINTS[key];
                const isSelected = graduationAge === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setGraduationAge(key)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-emerald-700 border-emerald-700 text-white font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <span className="block text-xs font-bold">{item.label}</span>
                    <span
                      className={`text-xs mt-1 block font-semibold ${
                        isSelected ? 'text-white' : 'text-emerald-700'
                      }`}
                    >
                      {item.points} نقطة
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              * ملحوظة: يُقاس السن بتاريخ التخرج ونيل شهادة الإجازة وليس مدة الدراسة.
            </p>
          </div>
        </div>

        {/* Right Column: Live Output Report Card (5 cols) */}
        <div className="lg:col-span-5 sticky top-20">
          <ReportCard
            result={currentResult}
            candidateName={candidateName}
            onExploreRegions={onOpenRegions}
          />
        </div>
      </div>
    </div>
  );
};
