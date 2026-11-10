import React from 'react';
import { X, MapPin, Compass, CheckCircle2, TrendingDown } from 'lucide-react';
import { MOROCCAN_AREFS } from '../data/taalimData';

interface RegionalAdviceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegionalAdviceModal: React.FC<RegionalAdviceModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1">
          <Compass className="w-4 h-4 text-emerald-700" />
          <span>التوجيه الجغرافي الاستراتيجي</span>
          <span aria-hidden="true">·</span>
          <span>الأكاديميات الجهوية للتربية والتكوين (AREF)</span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">
          دليل اختيار الجهة والمديريات الإقليمية حسب نقاطك
        </h3>

        <p className="text-xs text-slate-600 mb-5 leading-relaxed">
          تختلف عتبات الانتقاء الفعلي بين جهة وأخرى بحسب حصة التوظيف وكثافة طلبات الترشح. إذا كان مجموع نقاطك يقل عن العتبة الوطنية المرجعية، فإن اختيارك للجهة والمديرية الإقليمية يرفع نسبة قبولك إلى أكثر من 80%:
        </p>

        <div className="space-y-3">
          {MOROCCAN_AREFS.map((aref, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-emerald-300 transition-all text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="font-bold text-slate-900 text-sm">
                    {aref.name}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {aref.demand}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed mr-6">
                {aref.advice}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <span>
            <strong>القاعدة الذهبية:</strong> إذا كان مجموع نقاطك بين 40 و55 في تخصص الابتدائي المزدوج (عتبته المرجعية 60)، فإن ترشحك في جهات درعة تافيلالت، بني ملال خنيفرة، أو مديريات الحوز وتارودانت وبولمان يضمن لك الانتقاء بنسبة تفوق 85% نظراً لارتفاع الطلب وعدد المقاعد الشاغرة.
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
        >
          إغلاق والعودة للحاسبة
        </button>
      </div>
    </div>
  );
};
