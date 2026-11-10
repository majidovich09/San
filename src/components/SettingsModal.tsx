import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Unlock,
  KeyRound,
  Users,
  Search,
  Download,
  Trash2,
  RefreshCw,
  AlertCircle,
  Clock,
  Award,
} from 'lucide-react';
import { CandidateRecord } from '../types';
import {
  ADMIN_PIN_CODE,
  getCandidatesLog,
  clearCandidatesLog,
} from '../utils/storage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [candidates, setCandidates] = useState<CandidateRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCycle, setSelectedCycle] = useState<string>('all');

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      setCandidates(getCandidatesLog());
    } else if (!isOpen) {
      setErrorMessage('');
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN_CODE) {
      setIsAuthenticated(true);
      setErrorMessage('');
      setCandidates(getCandidatesLog());
    } else {
      setErrorMessage('رمز الأمان غير صحيح! يرجى إعادة المحاولة.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPinInput('');
    setErrorMessage('');
  };

  const handleClear = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في مسح سجل المستخدمين بالكامل؟')) {
      clearCandidatesLog();
      setCandidates([]);
    }
  };

  const handleRefresh = () => {
    setCandidates(getCandidatesLog());
  };

  const handleExportCSV = () => {
    if (candidates.length === 0) return;

    const headers = [
      'الاسم الكامل',
      'التخصص',
      'السلك',
      'نقاط البكالوريا',
      'نقاط الإجازة',
      'نقاط السن',
      'المجموع من 80',
      'العتبة المرجعية',
      'نسبة الحظوظ %',
      'التاريخ والوقت',
    ];

    const rows = candidates.map((c) => [
      `"${c.name}"`,
      `"${c.specialtyName}"`,
      `"${c.cycleLabel}"`,
      c.bacPoints,
      c.licensePoints,
      c.agePoints,
      c.totalScore,
      c.referenceThreshold,
      `${c.chancePercentage}%`,
      `"${c.timestamp}"`,
    ]);

    const csvContent =
      '\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `morocco_taalim_candidates_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter candidates
  const filteredCandidates = candidates.filter((cand) => {
    const matchesSearch =
      cand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cand.specialtyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCycle =
      selectedCycle === 'all' || cand.cycleLabel.includes(selectedCycle);
    return matchesSearch && matchesCycle;
  });

  const averageScore =
    candidates.length > 0
      ? Math.round(
          candidates.reduce((acc, curr) => acc + curr.totalScore, 0) /
            candidates.length
        )
      : 0;

  const highChancesCount = candidates.filter(
    (c) => c.chancePercentage >= 80
  ).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 shadow-2xl p-5 sm:p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute left-4 top-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          title="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ----------------- STATE 1: PIN CODE SCREEN (SECURE - NO HINTS) ----------------- */}
        {!isAuthenticated ? (
          <div className="max-w-sm mx-auto py-10 text-center">
            <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-800 flex items-center justify-center mx-auto mb-4 border border-slate-200 shadow-inner">
              <KeyRound className="w-7 h-7" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
              منطقة الإدارة المحمية
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              يرجى إدخال رمز الأمان للمتابعة:
            </p>

            <form onSubmit={handleVerifyPin} className="space-y-4">
              <div>
                <input
                  type="password"
                  autoFocus
                  maxLength={12}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="أدخل رمز المرور..."
                  className="w-full text-center tracking-widest text-lg font-bold bg-slate-50 border border-slate-300 focus:border-emerald-600 focus:bg-white focus:ring-3 focus:ring-emerald-100 rounded-2xl px-4 py-3.5 outline-none transition-all"
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>دخول</span>
              </button>
            </form>
          </div>
        ) : (
          /* ----------------- STATE 2: AUTHENTICATED CANDIDATES LOG ----------------- */
          <div className="space-y-6">
            {/* Top Bar with Logout & Stats */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1">
                  <Users className="w-4 h-4 text-emerald-700" />
                  <span>سجل الاستخدام الفعلي</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  الأشخاص الذين استعملوا التطبيق ({candidates.length})
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  disabled={candidates.length === 0}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 disabled:opacity-40 text-emerald-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="تصدير إلى ملف CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تصدير Excel/CSV</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>قفل</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            {candidates.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block">
                    إجمالي المستخدمين
                  </span>
                  <span className="text-2xl font-black text-slate-900 tabular-nums">
                    {candidates.length}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">مترشح(ة) قام بالحساب</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block">
                    متوسط النقاط
                  </span>
                  <span className="text-2xl font-black text-emerald-700 tabular-nums">
                    {averageScore}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">من أصل 80 نقطة</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block">
                    حظوظ مرتفعة (+80%)
                  </span>
                  <span className="text-2xl font-black text-emerald-700 tabular-nums">
                    {highChancesCount}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">فوق العتبة المرجعية</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block">
                    أعلى نقطة مسجلة
                  </span>
                  <span className="text-2xl font-black text-slate-900 tabular-nums">
                    {Math.max(...candidates.map((c) => c.totalScore))}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">نقطة / 80</span>
                </div>
              </div>
            )}

            {/* Search and Filters (if candidates exist) */}
            {candidates.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="ابحث بالاسم أو التخصص..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-emerald-600 outline-none transition-all"
                  />
                </div>

                <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs">
                  <button
                    onClick={() => setSelectedCycle('all')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      selectedCycle === 'all'
                        ? 'bg-slate-900 text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    الكل
                  </button>
                  <button
                    onClick={() => setSelectedCycle('ابتدائي')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      selectedCycle === 'ابتدائي'
                        ? 'bg-slate-900 text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    الابتدائي
                  </button>
                  <button
                    onClick={() => setSelectedCycle('إعدادي')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      selectedCycle === 'إعدادي'
                        ? 'bg-slate-900 text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    الإعدادي
                  </button>
                  <button
                    onClick={() => setSelectedCycle('تأهيلي')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      selectedCycle === 'تأهيلي'
                        ? 'bg-slate-900 text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    التأهيلي
                  </button>
                </div>
              </div>
            )}

            {/* Candidates Display */}
            {candidates.length === 0 ? (
              <div className="bg-slate-50 rounded-3xl border border-dashed border-slate-300 p-8 sm:p-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1">
                  لا يوجد مستخدمون مسجلون حتى الآن
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                  عند قيام أي مترشح بالدخول للتطبيق وحساب نقاطه عبر المراحل، ستُسجل بياناته هنا فوراً وبشكل تلقائي.
                </p>
              </div>
            ) : (
              <>
                {/* 1. Mobile Card View (optimized for smartphones so nothing is crushed) */}
                <div className="block md:hidden space-y-3">
                  {filteredCandidates.map((cand) => (
                    <div
                      key={cand.id}
                      className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-sm text-slate-900">
                          {cand.name}
                        </span>
                        <span
                          className={`px-2.5 py-1 rounded-lg font-bold text-xs tabular-nums ${
                            cand.chancePercentage >= 80
                              ? 'bg-emerald-100 text-emerald-800'
                              : cand.chancePercentage >= 60
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          الحظوظ: {cand.chancePercentage}%
                        </span>
                      </div>

                      <div className="text-slate-700">
                        <span className="font-bold block">{cand.specialtyName}</span>
                        <span className="text-[11px] text-slate-500">{cand.cycleLabel}</span>
                      </div>

                      <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                        <div>
                          <span className="text-[10px] text-slate-500 block">المجموع العام</span>
                          <span className="text-base font-black text-emerald-700 tabular-nums">
                            {cand.totalScore}{' '}
                            <span className="text-[10px] text-slate-500 font-normal">/ 80</span>
                          </span>
                        </div>
                        <div className="text-center">
                          <span className="text-[10px] text-slate-500 block">العتبة المرجعية</span>
                          <span className="text-sm font-bold text-slate-800 tabular-nums">
                            {cand.referenceThreshold} نقطة
                          </span>
                        </div>
                        <div className="text-left font-mono text-[10px] text-slate-500">
                          <div>باك: {cand.bacPoints}ن</div>
                          <div>إجازة: {cand.licensePoints}ن</div>
                          <div>سن: {cand.agePoints}ن</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{cand.timestamp}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 2. Desktop Table View */}
                <div className="hidden md:block bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                      <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-3.5">المترشح(ة)</th>
                          <th className="py-3 px-3.5">التخصص والسلك</th>
                          <th className="py-3 px-3.5 text-center">المجموع (/80)</th>
                          <th className="py-3 px-3.5 text-center">تفصيل النقاط</th>
                          <th className="py-3 px-3.5 text-center">العتبة المرجعية</th>
                          <th className="py-3 px-3.5 text-center">نسبة الحظوظ</th>
                          <th className="py-3 px-3.5 text-left">التاريخ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/80 bg-white">
                        {filteredCandidates.map((cand) => (
                          <tr
                            key={cand.id}
                            className="hover:bg-slate-50/80 transition-colors"
                          >
                            <td className="py-3 px-3.5 font-bold text-slate-900">
                              {cand.name}
                            </td>
                            <td className="py-3 px-3.5">
                              <span className="block font-semibold text-slate-800">
                                {cand.specialtyName}
                              </span>
                              <span className="text-[10px] text-slate-500">
                                {cand.cycleLabel}
                              </span>
                            </td>
                            <td className="py-3 px-3.5 text-center">
                              <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 font-extrabold text-sm tabular-nums border border-emerald-200/70">
                                {cand.totalScore}
                              </span>
                            </td>
                            <td className="py-3 px-3.5 text-center text-[11px] text-slate-600">
                              <div className="flex items-center justify-center gap-1.5 font-mono">
                                <span>باك:{cand.bacPoints}</span>
                                <span>+</span>
                                <span>إجازة:{cand.licensePoints}</span>
                                <span>+</span>
                                <span>سن:{cand.agePoints}</span>
                              </div>
                            </td>
                            <td className="py-3 px-3.5 text-center font-bold text-slate-700 tabular-nums">
                              {cand.referenceThreshold} نقطة
                            </td>
                            <td className="py-3 px-3.5 text-center">
                              <span
                                className={`inline-block px-2.5 py-1 rounded-lg font-bold text-xs tabular-nums ${
                                  cand.chancePercentage >= 80
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : cand.chancePercentage >= 60
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {cand.chancePercentage}%
                              </span>
                            </td>
                            <td className="py-3 px-3.5 text-left text-[11px] text-slate-400 tabular-nums font-mono whitespace-nowrap">
                              {cand.timestamp}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between text-xs pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRefresh}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>تحديث السجل</span>
                </button>
                {candidates.length > 0 && (
                  <button
                    onClick={handleClear}
                    className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>مسح السجل</span>
                  </button>
                )}
              </div>

              <span className="text-slate-400 text-[11px]">
                يتم تسجيل كل عملية حساب حقيقية فورياً
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
