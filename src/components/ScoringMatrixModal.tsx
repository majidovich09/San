import React from 'react';
import { X, Award, CheckCircle, Info, BookOpen } from 'lucide-react';
import { BAC_POINTS, LICENSE_POINTS, AGE_POINTS } from '../data/taalimData';

interface ScoringMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScoringMatrixModal: React.FC<ScoringMatrixModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-xl p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute left-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1">
          <BookOpen className="w-4 h-4 text-emerald-700" />
          <span>المذكرة الوزارية الرسمية</span>
          <span aria-hidden="true">·</span>
          <span>الانتقاء الأولي لاجتياز مباريات التوظيف</span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">
          شبكة التنقيط المعتمدة (الحد الأقصى: 80 نقطة)
        </h3>

        <p className="text-xs text-slate-600 mb-6 leading-relaxed">
          تعتمد وزارة التربية الوطنية والتعليم الأولي والرياضة شبكة معيارية محددة وموحدة وطنياً لحساب نقاط الانتقاء الأولي لملفات المترشحين، وتتكون حصراً من ثلاثة معايير أكاديمية وزمنية أساسية:
        </p>

        {/* 1. ميزة شهادة البكالوريا */}
        <div className="mb-6 p-4 rounded-xl border border-slate-200 bg-slate-50/70">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>ميزة شهادة البكالوريا</span>
            </h4>
            <span className="text-xs font-bold text-emerald-700">
              الحد الأقصى: 25 نقطة
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs">
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
              <span className="block text-slate-600">حسن جداً</span>
              <span className="text-emerald-700 font-extrabold text-sm block mt-1">
                25 نقطة
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
              <span className="block text-slate-600">حسن</span>
              <span className="text-emerald-700 font-extrabold text-sm block mt-1">
                20 نقطة
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
              <span className="block text-slate-600">لا بأس به</span>
              <span className="text-emerald-700 font-extrabold text-sm block mt-1">
                10 نقاط
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
              <span className="block text-slate-600">مقبول / بدون ميزة</span>
              <span className="text-slate-500 font-extrabold text-sm block mt-1">
                0 نقطة
              </span>
            </div>
          </div>
        </div>

        {/* 2. ميزة شهادة الإجازة */}
        <div className="mb-6 p-4 rounded-xl border border-slate-200 bg-slate-50/70">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>ميزة شهادة الإجازة (الأساسية أو المهنية أو التربوية)</span>
            </h4>
            <span className="text-xs font-bold text-emerald-700">
              الحد الأقصى: 30 نقطة
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs">
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
              <span className="block text-slate-600">حسن جداً</span>
              <span className="text-emerald-700 font-extrabold text-sm block mt-1">
                30 نقطة
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
              <span className="block text-slate-600">حسن</span>
              <span className="text-emerald-700 font-extrabold text-sm block mt-1">
                25 نقطة
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
              <span className="block text-slate-600">لا بأس به</span>
              <span className="text-emerald-700 font-extrabold text-sm block mt-1">
                15 نقطة
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
              <span className="block text-slate-600">مقبول / بدون ميزة</span>
              <span className="text-slate-500 font-extrabold text-sm block mt-1">
                0 نقطة
              </span>
            </div>
          </div>
        </div>

        {/* 3. السن عند الحصول على شهادة الإجازة */}
        <div className="mb-6 p-4 rounded-xl border border-slate-200 bg-slate-50/70">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
                3
              </span>
              <span>السن عند نيل شهادة الإجازة</span>
            </h4>
            <span className="text-xs font-bold text-emerald-700">
              الحد الأقصى: 25 نقطة
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs">
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
              <span className="block text-slate-600">22 سنة أو أقل</span>
              <span className="text-emerald-700 font-extrabold text-sm block mt-1">
                25 نقطة
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
              <span className="block text-slate-600">23 سنة</span>
              <span className="text-emerald-700 font-extrabold text-sm block mt-1">
                15 نقطة
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
              <span className="block text-slate-600">24 سنة</span>
              <span className="text-emerald-700 font-extrabold text-sm block mt-1">
                5 نقاط
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
              <span className="block text-slate-600">أكبر من 24 سنة</span>
              <span className="text-slate-500 font-extrabold text-sm block mt-1">
                0 نقطة
              </span>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>توضيح رسمي هام:</strong> يُحسب السن بناءً على الفارق الزمني بين تاريخ ميلاد المترشح وتاريخ مداولات نيل الإجازة، ولا يُقاس بعدد سنوات الدراسة الجامعية.
            </span>
          </div>
        </div>

        {/* Total Summary */}
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-700" />
            <span className="font-bold">المجموع الإجمالي الأقصى للشبكة:</span>
          </div>
          <span className="text-lg font-black text-emerald-800 tabular-nums">
            80 نقطة (25 + 30 + 25)
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
        >
          فهمت الشبكة، العودة للحاسبة
        </button>
      </div>
    </div>
  );
};
