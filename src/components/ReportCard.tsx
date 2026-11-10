import React from 'react';
import { ScoreBreakdown } from '../types';
import { BAC_POINTS, LICENSE_POINTS, AGE_POINTS } from '../data/taalimData';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Printer,
  Share2,
  Compass,
  ArrowUpRight,
  TrendingDown,
  Info,
} from 'lucide-react';

interface ReportCardProps {
  result: ScoreBreakdown;
  candidateName?: string;
  onExploreRegions?: () => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  result,
  candidateName,
  onExploreRegions,
}) => {
  const {
    totalScore,
    maxScore,
    bacPoints,
    licensePoints,
    agePoints,
    specialty,
    referenceThreshold,
    differenceFromThreshold,
    chancePercentage,
    chanceTier,
    strategicTips,
  } = result;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const text = `نتيجتي في حاسبة حظوظ الانتقاء لمباراة التعليم:\nالتخصص: ${specialty.name}\nالمجموع: ${totalScore} من ${maxScore} نقطة\nالعتبة المرجعية: ${referenceThreshold} نقطة\nنسبة الحظوظ المقدرة: ${chancePercentage}%\nتأكد من حظوظك عبر الحاسبة!`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'تقرير حظوظ الانتقاء في مباراة التعليم',
          text,
        });
      } catch {
        // Fallback copy
        navigator.clipboard?.writeText(text);
      }
    } else {
      navigator.clipboard?.writeText(text);
      alert('تم نسخ تفاصيل التقرير إلى الحافظة!');
    }
  };

  const getTierBadge = () => {
    if (chanceTier === 'guaranteed') {
      return {
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        label: 'حظوظ مرتفعة جداً (فوق العتبة / قبول مباشر)',
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
      };
    }
    if (chanceTier === 'high') {
      return {
        bg: 'bg-blue-50 text-blue-800 border-blue-200',
        label: 'حظوظ قوية وواعدة (فارق قريب قابل للتعويض)',
        icon: <CheckCircle2 className="w-4 h-4 text-blue-600" />,
      };
    }
    if (chanceTier === 'moderate') {
      return {
        bg: 'bg-amber-50 text-amber-800 border-amber-200',
        label: 'حظوظ متوسطة (تتطلب اختيار جهة الخصاص)',
        icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
      };
    }
    return {
      bg: 'bg-rose-50 text-rose-800 border-rose-200',
      label: 'عتبة تنافسية (يوصى بجهات الخصاص كدرعة تافيلالت)',
      icon: <AlertTriangle className="w-4 h-4 text-rose-600" />,
    };
  };

  const tier = getTierBadge();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm transition-all hover:shadow-md">
      {/* Report Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>تقرير رسمي تقديري</span>
            <span aria-hidden="true">·</span>
            <span>شبكة الانتقاء الأولي 2025 - 2026</span>
            {candidateName && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-slate-800 font-semibold">{candidateName}</span>
              </>
            )}
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900">
            {specialty.name}
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            السلك: {specialty.cycleLabel} · معيار التقييم: شبكة وزارة التربية الوطنية (80 نقطة)
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0 no-print">
          <button
            onClick={handleShare}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            title="مشاركة التقرير"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>مشاركة</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            title="طباعة تقرير الانتقاء"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>طباعة التقرير</span>
          </button>
        </div>
      </div>

      {/* Main KPI Strip - 3 Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        {/* 1. مجموع النقاط */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
          <span className="text-xs text-slate-500 font-medium block mb-1">
            1. مجموع نقاطك في الشبكة
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
              {totalScore}
            </span>
            <span className="text-sm text-slate-500 font-semibold">
              / {maxScore} نقطة
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-3">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-700"
              style={{ width: `${(totalScore / maxScore) * 100}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-500 mt-2 block">
            تمثل {Math.round((totalScore / maxScore) * 100)}% من السقف الإجمالي
          </span>
        </div>

        {/* 2. العتبة المرجعية */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
          <span className="text-xs text-slate-500 font-medium block mb-1">
            2. العتبة المرجعية لتخصصك (2025)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
              {referenceThreshold}
            </span>
            <span className="text-sm text-slate-500 font-semibold">نقطة</span>
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 text-xs">
            {differenceFromThreshold >= 0 ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4" />
                فارق إيجابي: +{differenceFromThreshold} نقطة فوق العتبة
              </span>
            ) : (
              <span className="text-amber-700 font-semibold flex items-center gap-1">
                <TrendingDown className="w-4 h-4" />
                فارق: {differenceFromThreshold} نقطة دون العتبة
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {referenceThreshold === 0
              ? 'تخصص بدون عتبة (قبول شبه مباشر)'
              : 'عتبة مرجعية قابلة للهبوط حسب الجهة'}
          </span>
        </div>

        {/* 3. النسبة المئوية التقديرية للحظوظ */}
        <div className="bg-emerald-50/70 rounded-xl p-4 border border-emerald-200">
          <span className="text-xs text-emerald-900 font-medium block mb-1">
            3. النسبة المئوية التقديرية لحضوظك
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-800 tabular-nums">
              {chancePercentage}%
            </span>
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-emerald-900 font-medium">
            {tier.icon}
            <span className="truncate">{tier.label}</span>
          </div>
          <span className="text-[11px] text-emerald-700 mt-1 block">
            محسوبة بدقة وفق معايير التوزيع الجغرافي
          </span>
        </div>
      </div>

      {/* Detailed Criteria Breakdown Table */}
      <div className="mb-6">
        <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-700" />
          <span>تفصيل احتساب النقاط حسب المعايير الثلاثة الرسمية</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Bac */}
          <div className="p-3.5 rounded-lg border border-slate-200 bg-white">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>ميزة شهادة البكالوريا</span>
              <span className="font-semibold text-slate-700">الحد الأقصى: 25</span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-sm font-bold text-slate-900">
                {bacPoints === 25
                  ? 'حسن جداً'
                  : bacPoints === 20
                  ? 'حسن'
                  : bacPoints === 10
                  ? 'لا بأس به'
                  : 'مقبول / بدون ميزة'}
              </span>
              <span className="text-base font-extrabold text-emerald-700 tabular-nums">
                +{bacPoints} نقطة
              </span>
            </div>
          </div>

          {/* License */}
          <div className="p-3.5 rounded-lg border border-slate-200 bg-white">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>ميزة شهادة الإجازة</span>
              <span className="font-semibold text-slate-700">الحد الأقصى: 30</span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-sm font-bold text-slate-900">
                {licensePoints === 30
                  ? 'حسن جداً'
                  : licensePoints === 25
                  ? 'حسن'
                  : licensePoints === 15
                  ? 'لا بأس به'
                  : 'مقبول / بدون ميزة'}
              </span>
              <span className="text-base font-extrabold text-emerald-700 tabular-nums">
                +{licensePoints} نقطة
              </span>
            </div>
          </div>

          {/* Age at graduation */}
          <div className="p-3.5 rounded-lg border border-slate-200 bg-white">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>السن عند نيل الإجازة</span>
              <span className="font-semibold text-slate-700">الحد الأقصى: 25</span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-sm font-bold text-slate-900">
                {agePoints === 25
                  ? '22 سنة أو أقل'
                  : agePoints === 15
                  ? '23 سنة'
                  : agePoints === 5
                  ? '24 سنة'
                  : 'أكبر من 24 سنة'}
              </span>
              <span className="text-base font-extrabold text-emerald-700 tabular-nums">
                +{agePoints} نقطة
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. النصيحة الاستراتيجية المخصصة */}
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          <h4 className="text-sm font-bold text-slate-900">
            4. نصيحة استراتيجية مخصصة لملفك
          </h4>
        </div>
        <div className="space-y-2.5">
          {strategicTips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700 leading-relaxed">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                {idx + 1}
              </span>
              <p>{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Crucial Note regarding 2026 Ministerial Reforms */}
      <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/70 text-xs text-slate-700 leading-relaxed flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div>
          <strong className="text-blue-900 block mb-0.5">
            ملاحظة تنظيمية حاسمة لدورة 2026:
          </strong>
          <span>
            تعتمد الوزارة في دورة نونبر 2026 توسيعاً شاملاً للمناصب ورفع الحد الأقصى للسن القانوني للترشح إلى 40 سنة؛ الأمر الذي ينعكس إيجابياً بانخفاض ملحوظ في عتبات الانتقاء الأولي في معظم الأكاديميات الجهوية، خاصة في الأقاليم ذات الكثافة المرتفعة لمناصب الابتدائي والإعدادي.
          </span>
        </div>
      </div>

      {/* Regional Explorer Trigger */}
      {onExploreRegions && (
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
          <span className="text-xs text-slate-500">
            ترغب في معرفة أي الجهات تضم أقل عتبة لتخصصك؟
          </span>
          <button
            onClick={onExploreRegions}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            <span>استعراض استراتيجية توزيع الأكاديميات الجهوية (AREF)</span>
          </button>
        </div>
      )}
    </div>
  );
};
