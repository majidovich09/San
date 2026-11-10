import React, { useState } from 'react';
import {
  EducationCycle,
  Specialty,
  BacMention,
  LicenseMention,
  GraduationAgeCategory,
  ScoreBreakdown,
} from '../types';
import {
  SPECIALTIES,
  BAC_POINTS,
  LICENSE_POINTS,
  AGE_POINTS,
  calculateExactScore,
} from '../data/taalimData';
import { saveCandidateRecord } from '../utils/storage';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  User,
  GraduationCap,
  Award,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Printer,
  Share2,
  Compass,
  Info,
  ChevronLeft,
} from 'lucide-react';

interface StepWizardProps {
  onOpenRegions: () => void;
  onOpenRubric: () => void;
}

type WizardStep = 'welcome' | 'name' | 'specialty' | 'bac' | 'license' | 'age' | 'result';

export const StepWizard: React.FC<StepWizardProps> = ({ onOpenRegions, onOpenRubric }) => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('welcome');
  const [candidateName, setCandidateName] = useState<string>('');
  const [selectedCycle, setSelectedCycle] = useState<EducationCycle | 'all'>('all');
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string>('prim_dual');
  const [selectedBac, setSelectedBac] = useState<BacMention | null>(null);
  const [selectedLicense, setSelectedLicense] = useState<LicenseMention | null>(null);
  const [selectedAge, setSelectedAge] = useState<GraduationAgeCategory | null>(null);
  const [result, setResult] = useState<ScoreBreakdown | null>(null);

  // Steps sequence
  const stepOrder: WizardStep[] = ['name', 'specialty', 'bac', 'license', 'age'];
  const stepIndex = stepOrder.indexOf(currentStep);

  const handleStart = () => {
    setCurrentStep('name');
  };

  const handleNextFromName = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!candidateName.trim()) {
      setCandidateName('مترشح(ة)');
    }
    setCurrentStep('specialty');
  };

  const handleNextFromSpecialty = () => {
    setCurrentStep('bac');
  };

  const handleNextFromBac = () => {
    if (!selectedBac) return;
    setCurrentStep('license');
  };

  const handleNextFromLicense = () => {
    if (!selectedLicense) return;
    setCurrentStep('age');
  };

  const handleCalculateResult = () => {
    if (!selectedBac || !selectedLicense || !selectedAge) return;
    const computed = calculateExactScore(
      selectedBac,
      selectedLicense,
      selectedAge,
      selectedSpecialtyId
    );
    setResult(computed);
    saveCandidateRecord(candidateName || 'مترشح(ة)', computed);
    setCurrentStep('result');
  };

  const handleReset = () => {
    setCurrentStep('welcome');
    setCandidateName('');
    setSelectedSpecialtyId('prim_dual');
    setSelectedBac(null);
    setSelectedLicense(null);
    setSelectedAge(null);
    setResult(null);
  };

  const selectedSpecialty =
    SPECIALTIES.find((s) => s.id === selectedSpecialtyId) || SPECIALTIES[0];

  const filteredSpecialties =
    selectedCycle === 'all'
      ? SPECIALTIES
      : SPECIALTIES.filter((s) => s.cycle === selectedCycle);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* -------------------- STEP 0: WELCOME SCREEN -------------------- */}
      {currentStep === 'welcome' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center shadow-lg shadow-slate-200/40 relative overflow-hidden">
          {/* Subtle Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700" />

          {/* Icon Badge */}
          <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shadow-inner mb-6">
            <GraduationCap className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-2">
            مباراة التعليم بالمغرب · دورة 2026
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
            حاسبة حظوظ الانتقاء الأولي
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto mb-8 leading-relaxed">
            احسب مجموع نقاطك الدقيق من <strong className="text-slate-900 font-bold">80 نقطة</strong> وفق الشبكة الرسمية لوزارة التربية الوطنية، واكتشف نسبة حظوظك المقدرة مقارنة بالعتبات المرجعية خطوة بخطوة.
          </p>

          {/* Start CTA Button */}
          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-10 py-4 bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white rounded-2xl font-bold text-base sm:text-lg shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-3 mx-auto cursor-pointer"
          >
            <span>ابدأ الحساب الآن</span>
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Quick reference note */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <span>✓ شبكة رسمية معتمدة (80 نقطة)</span>
            <span>·</span>
            <span>✓ عتبات مرجعية محينة</span>
            <span>·</span>
            <span>✓ نتائج وتوجيهات فورية</span>
          </div>
        </div>
      )}

      {/* -------------------- PROGRESS HEADER (For Steps 1-5) -------------------- */}
      {currentStep !== 'welcome' && currentStep !== 'result' && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2 px-1">
            <span>المرحلة {stepIndex + 1} من 5</span>
            <span className="text-emerald-700 font-bold">
              {currentStep === 'name' && 'الاسم الكامل'}
              {currentStep === 'specialty' && 'التخصص والسلك'}
              {currentStep === 'bac' && 'ميزة البكالوريا'}
              {currentStep === 'license' && 'ميزة الإجازة'}
              {currentStep === 'age' && 'السن عند التخرج'}
            </span>
          </div>

          {/* Step Progress Bar */}
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-700 h-full rounded-full transition-all duration-300"
              style={{ width: `${((stepIndex + 1) / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* -------------------- STEP 1: NAME SCREEN -------------------- */}
      {currentStep === 'name' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-lg shadow-slate-200/30">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5">
            <User className="w-6 h-6" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
            ما اسمك الكريم؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            أدخل اسمك لتخصيص تقرير حظوظ الانتقاء والبطاقة الرسمية للنتائج.
          </p>

          <form onSubmit={handleNextFromName}>
            <div className="mb-8">
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                الاسم واللقب (أو الاسم الشخصي):
              </label>
              <input
                type="text"
                autoFocus
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="مثال: يوسف العلمي أو سناء الحمداوي"
                className="w-full bg-slate-50 border border-slate-300 focus:border-emerald-600 focus:bg-white focus:ring-3 focus:ring-emerald-100 rounded-2xl px-5 py-4 text-slate-900 text-base placeholder:text-slate-400 outline-none transition-all"
              />
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentStep('welcome')}
                className="px-5 py-3 text-slate-600 hover:text-slate-900 font-semibold text-sm rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              >
                <ArrowRight className="w-4 h-4" />
                <span>رجوع</span>
              </button>

              <button
                type="submit"
                className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>التالي</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* -------------------- STEP 2: SPECIALTY & CYCLE SCREEN -------------------- */}
      {currentStep === 'specialty' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-lg shadow-slate-200/30">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5">
            <GraduationCap className="w-6 h-6" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
            اختر السلك والتخصص المطلوب
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-4">
            حدد التخصص الذي ترغب في الترشح له لمعرفة عتبته المرجعية المعتمدة.
          </p>

          {/* Filter tabs by cycle */}
          <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 rounded-xl mb-4 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setSelectedCycle('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedCycle === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              الكل
            </button>
            <button
              type="button"
              onClick={() => setSelectedCycle('primary')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedCycle === 'primary'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              الابتدائي
            </button>
            <button
              type="button"
              onClick={() => setSelectedCycle('middle')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedCycle === 'middle'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              الإعدادي
            </button>
            <button
              type="button"
              onClick={() => setSelectedCycle('secondary')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedCycle === 'secondary'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              التأهيلي
            </button>
            <button
              type="button"
              onClick={() => setSelectedCycle('common')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedCycle === 'common'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              مشترك
            </button>
          </div>

          {/* Specialties list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto p-1 mb-8">
            {filteredSpecialties.map((spec) => {
              const isSelected = selectedSpecialtyId === spec.id;
              return (
                <button
                  key={spec.id}
                  type="button"
                  onClick={() => setSelectedSpecialtyId(spec.id)}
                  className={`text-right p-3.5 rounded-2xl border transition-all text-xs flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/90 ring-2 ring-emerald-600/20 text-emerald-950 font-bold'
                      : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <span className="font-bold text-sm block mb-1">{spec.name}</span>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60 mt-1">
                    <span>{spec.cycleLabel}</span>
                    <span className="font-bold text-emerald-700">
                      عتبة 2025: {spec.referenceThreshold} نقطة
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep('name')}
              className="px-5 py-3 text-slate-600 hover:text-slate-900 font-semibold text-sm rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <ArrowRight className="w-4 h-4" />
              <span>السابق</span>
            </button>

            <button
              type="button"
              onClick={handleNextFromSpecialty}
              className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>التالي: ميزة البكالوريا</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* -------------------- STEP 3: BAC MENTION SCREEN -------------------- */}
      {currentStep === 'bac' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-lg shadow-slate-200/30">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5">
            <Award className="w-6 h-6" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
            ميزة شهادة البكالوريا
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            المعيار الأول في شبكة التنقيط (الحد الأقصى: 25 نقطة).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {(Object.keys(BAC_POINTS) as BacMention[]).map((key) => {
              const item = BAC_POINTS[key];
              const isSelected = selectedBac === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedBac(key)}
                  className={`p-4 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/90 ring-2 ring-emerald-600/20 text-emerald-950 font-bold'
                      : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <div>
                    <span className="block text-sm font-bold text-slate-900">
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5 block">
                      {key === 'tres_bien' && 'معدل 16 فما فوق'}
                      {key === 'bien' && 'معدل من 14 إلى 15.99'}
                      {key === 'assez_bien' && 'معدل من 12 إلى 13.99'}
                      {key === 'passable' && 'معدل من 10 إلى 11.99'}
                    </span>
                  </div>
                  <div
                    className={`px-3 py-1.5 rounded-xl font-extrabold text-sm tabular-nums ${
                      isSelected
                        ? 'bg-emerald-700 text-white'
                        : 'bg-emerald-100/70 text-emerald-800'
                    }`}
                  >
                    +{item.points} نقطة
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep('specialty')}
              className="px-5 py-3 text-slate-600 hover:text-slate-900 font-semibold text-sm rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <ArrowRight className="w-4 h-4" />
              <span>السابق</span>
            </button>

            <button
              type="button"
              disabled={!selectedBac}
              onClick={handleNextFromBac}
              className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>التالي: ميزة الإجازة</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* -------------------- STEP 4: LICENSE MENTION SCREEN -------------------- */}
      {currentStep === 'license' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-lg shadow-slate-200/30">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5">
            <Award className="w-6 h-6" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
            ميزة شهادة الإجازة
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            المعيار الثاني في شبكة التنقيط (الحد الأقصى: 30 نقطة).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {(Object.keys(LICENSE_POINTS) as LicenseMention[]).map((key) => {
              const item = LICENSE_POINTS[key];
              const isSelected = selectedLicense === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedLicense(key)}
                  className={`p-4 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/90 ring-2 ring-emerald-600/20 text-emerald-950 font-bold'
                      : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <div>
                    <span className="block text-sm font-bold text-slate-900">
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5 block">
                      {key === 'tres_bien' && 'معدل 16 فما فوق'}
                      {key === 'bien' && 'معدل من 14 إلى 15.99'}
                      {key === 'assez_bien' && 'معدل من 12 إلى 13.99'}
                      {key === 'passable' && 'معدل من 10 إلى 11.99'}
                    </span>
                  </div>
                  <div
                    className={`px-3 py-1.5 rounded-xl font-extrabold text-sm tabular-nums ${
                      isSelected
                        ? 'bg-emerald-700 text-white'
                        : 'bg-emerald-100/70 text-emerald-800'
                    }`}
                  >
                    +{item.points} نقطة
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep('bac')}
              className="px-5 py-3 text-slate-600 hover:text-slate-900 font-semibold text-sm rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <ArrowRight className="w-4 h-4" />
              <span>السابق</span>
            </button>

            <button
              type="button"
              disabled={!selectedLicense}
              onClick={handleNextFromLicense}
              className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>التالي: سن التخرج</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* -------------------- STEP 5: GRADUATION AGE SCREEN -------------------- */}
      {currentStep === 'age' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-lg shadow-slate-200/30">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5">
            <Calendar className="w-6 h-6" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
            سنك عند نيل شهادة الإجازة
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-2">
            المعيار الثالث في شبكة التنقيط (الحد الأقصى: 25 نقطة).
          </p>

          {/* Gentle clarification */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2 mb-6">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>تنبيه هام:</strong> تحتسب الشبكة الرسمية سنك عند تاريخ التخرج ونيل الإجازة وليس عدد سنوات الدراسة الجامعية.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {(Object.keys(AGE_POINTS) as GraduationAgeCategory[]).map((key) => {
              const item = AGE_POINTS[key];
              const isSelected = selectedAge === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedAge(key)}
                  className={`p-4 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/90 ring-2 ring-emerald-600/20 text-emerald-950 font-bold'
                      : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <div>
                    <span className="block text-sm font-bold text-slate-900">
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5 block">
                      {item.note}
                    </span>
                  </div>
                  <div
                    className={`px-3 py-1.5 rounded-xl font-extrabold text-sm tabular-nums ${
                      isSelected
                        ? 'bg-emerald-700 text-white'
                        : 'bg-emerald-100/70 text-emerald-800'
                    }`}
                  >
                    +{item.points} نقطة
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep('license')}
              className="px-5 py-3 text-slate-600 hover:text-slate-900 font-semibold text-sm rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <ArrowRight className="w-4 h-4" />
              <span>السابق</span>
            </button>

            <button
              type="button"
              disabled={!selectedAge}
              onClick={handleCalculateResult}
              className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-700/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>احسب النتيجة والحظوظ الآن</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* -------------------- STEP 6: FINAL RESULT & PERCENTAGE SCREEN -------------------- */}
      {currentStep === 'result' && result && (
        <div className="space-y-6">
          {/* Header Banner with Candidate Name & Big Percentage */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg shadow-slate-200/30 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 to-teal-500" />

            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-bold text-emerald-800 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>تقرير تقييم الحظوظ الرسمي</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">
              {candidateName ? `مرحباً يا ${candidateName}` : 'مرحباً بك'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              إليك نتيجة تقييم ملفك لتخصص <strong className="text-slate-900 font-bold">{result.specialty.name}</strong>:
            </p>

            {/* Big Circular/Gauged Percentage Display */}
            <div className="bg-gradient-to-b from-emerald-50/80 to-teal-50/50 rounded-3xl border border-emerald-200/70 p-6 max-w-sm mx-auto mb-8 shadow-inner">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                النسبة المئوية التقديرية لحضوظك
              </span>
              <div className="text-5xl sm:text-6xl font-black text-emerald-800 tabular-nums my-2 tracking-tight">
                {result.chancePercentage}%
              </div>
              <p className="text-xs font-semibold text-emerald-900">
                {result.chancePercentage >= 85
                  ? 'حظوظ مرتفعة جداً (فوق العتبة أو قبول شبه مباشر) 🎉'
                  : result.chancePercentage >= 60
                  ? 'حظوظ واعدة وقوية (فارق قريب قابل للتعويض بالأكاديميات) 🌟'
                  : 'عتبة تنافسية (يوصى باختيار جهات الخصاص المرتفع) 🧭'}
              </p>
            </div>

            {/* Score & Threshold Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-8 text-right">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">
                  1. مجموع نقاطك في الشبكة:
                </span>
                <div className="flex items-baseline gap-1 text-slate-900">
                  <span className="text-2xl font-black tabular-nums">{result.totalScore}</span>
                  <span className="text-xs text-slate-500 font-semibold">/ 80 نقطة</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-emerald-600 h-full rounded-full"
                    style={{ width: `${(result.totalScore / 80) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">
                  2. العتبة المرجعية للتخصص:
                </span>
                <div className="flex items-baseline gap-1 text-slate-900">
                  <span className="text-2xl font-black tabular-nums">{result.referenceThreshold}</span>
                  <span className="text-xs text-slate-500 font-semibold">نقطة</span>
                </div>
                <div className="text-xs font-bold mt-2">
                  {result.differenceFromThreshold >= 0 ? (
                    <span className="text-emerald-700">+{result.differenceFromThreshold} نقطة فوق العتبة</span>
                  ) : (
                    <span className="text-amber-700">{result.differenceFromThreshold} نقطة دون العتبة</span>
                  )}
                </div>
              </div>
            </div>

            {/* Detailed Criteria Breakdown */}
            <div className="max-w-lg mx-auto text-right mb-8">
              <h4 className="text-xs font-bold text-slate-700 mb-2">تفصيل نقاطك حسب المعايير:</h4>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                  <span className="text-slate-500 block text-[11px]">البكالوريا</span>
                  <span className="font-extrabold text-emerald-700 text-sm mt-0.5 block">
                    {result.bacPoints} / 25
                  </span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                  <span className="text-slate-500 block text-[11px]">الإجازة</span>
                  <span className="font-extrabold text-emerald-700 text-sm mt-0.5 block">
                    {result.licensePoints} / 30
                  </span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                  <span className="text-slate-500 block text-[11px]">السن</span>
                  <span className="font-extrabold text-emerald-700 text-sm mt-0.5 block">
                    {result.agePoints} / 25
                  </span>
                </div>
              </div>
            </div>

            {/* Strategic Tips */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-right max-w-lg mx-auto mb-8">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span>💡 نصيحة استراتيجية مخصصة لملفك:</span>
              </h4>
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {result.strategicTips.map((tip, idx) => (
                  <p key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-emerald-700 shrink-0">{idx + 1}.</span>
                    <span>{tip}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Action Buttons: Print, Regional Guide, Restart */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>حساب جديد من البداية</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة التقرير</span>
              </button>

              <button
                type="button"
                onClick={onOpenRegions}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>دليل الأكاديميات (AREF)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
