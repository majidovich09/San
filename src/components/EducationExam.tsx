import React, { useState, useEffect } from 'react';
import { QCMQuestion, QCMQuizResult } from '../types';
import { EDUCATION_QUESTIONS_BANK } from '../data/qcmData';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  RotateCcw,
  Clock,
  Award,
  Sparkles,
  Filter,
  Check,
  X,
  AlertTriangle,
} from 'lucide-react';

interface EducationExamProps {
  onBackToHome: () => void;
}

type ExamStage = 'setup' | 'quiz' | 'result';

export const EducationExam: React.FC<EducationExamProps> = ({ onBackToHome }) => {
  const [stage, setStage] = useState<ExamStage>('setup');
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quizQuestions, setQuizQuestions] = useState<QCMQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct'>('all');

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const categories = [
    { id: 'all', label: 'جميع المجالات والمجزوءات' },
    { id: 'نظريات التعلم', label: 'نظريات التعلم' },
    { id: 'البيداغوجيات الحديثة', label: 'البيداغوجيات الحديثة' },
    { id: 'الديداكتيك', label: 'الديداكتيك وعلم التدريس' },
    { id: 'التقويم التربوي', label: 'التقويم التربوي والدعم' },
    { id: 'مستجدات وتشريع التربية', label: 'المستجدات والتشريع المدرسي' },
  ];

  const handleStartExam = () => {
    let pool = EDUCATION_QUESTIONS_BANK;
    if (selectedCategory !== 'all') {
      pool = pool.filter((q) => q.category === selectedCategory);
      if (pool.length === 0) pool = EDUCATION_QUESTIONS_BANK;
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5);

    // If requested count > pool length (e.g. user chose 100 and bank has 50), duplicate pool with shuffles to meet count
    let finalQuestions: QCMQuestion[] = [];
    while (finalQuestions.length < questionCount) {
      const remaining = questionCount - finalQuestions.length;
      finalQuestions = [...finalQuestions, ...shuffled.slice(0, remaining)];
    }

    setQuizQuestions(finalQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimerSeconds(0);
    setTimerActive(true);
    setStage('quiz');
  };

  const handleSelectOption = (optionIndex: number) => {
    const questionId = quizQuestions[currentQuestionIndex].id;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Finish quiz
      setTimerActive(false);
      setStage('result');
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setStage('setup');
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setTimerSeconds(0);
  };

  // Compute final score
  const correctCount = quizQuestions.reduce((acc, q, idx) => {
    return userAnswers[idx] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const percentage = Math.round((correctCount / quizQuestions.length) * 100);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins} دقيقة و ${remSecs} ثانية`;
  };

  const getEvaluationTier = () => {
    if (percentage >= 85) {
      return {
        label: 'مستوى ممتاز ومتميز جداً 🎉',
        desc: 'أنت متمكن بشكل رائع من مفاهيم علوم التربية والديداكتيك والمستجدات!',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      };
    }
    if (percentage >= 70) {
      return {
        label: 'مستوى جيد جداً 🌟',
        desc: 'تحصيل متقدم ومطمئن، مع إمكانية ضبط بعض الجزئيات في الديداكتيك والمستجدات.',
        color: 'text-blue-700 bg-blue-50 border-blue-200',
      };
    }
    if (percentage >= 50) {
      return {
        label: 'مستوى متوسط ومقبول ⚡',
        desc: 'لديك مكتسبات أساسية جيدة، لكن يوصى بمراجعة نظريات التعلم والقوانين التشريعية.',
        color: 'text-amber-700 bg-amber-50 border-amber-200',
      };
    }
    return {
      label: 'بحاجة إلى تكثيف المراجعة 📚',
      desc: 'استثمر التصحيح المرفق أدناه للتركيز على المفاهيم المرجعية والامتحانات السابقة.',
      color: 'text-rose-700 bg-rose-50 border-rose-200',
    };
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* ----------------- STAGE 1: SETUP SCREEN ----------------- */}
      {stage === 'setup' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-lg shadow-slate-200/40 text-center">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 mx-auto mb-5 shadow-inner">
            <BookOpen className="w-8 h-8" />
          </div>

          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
            امتحان تجريبي تفاعلي QCM
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
            اختبار في علوم التربية ومستجدات التعليم
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mb-8 leading-relaxed">
            أسئلة رسمية مستقاة من <strong className="text-slate-900 font-bold">امتحانات مباريات التعليم السابقة</strong> ومن المراجع الموثوقة (القانون الإطار 51.17، الرؤية الاستراتيجية، نظريات التعلم، البيداغوجيات، والديداكتيك).
          </p>

          {/* Question Count Selection */}
          <div className="text-right mb-6">
            <label className="block text-xs font-bold text-slate-800 mb-2.5">
              1. كم عدد الأسئلة التي تريد الإجابة عنها؟
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {[10, 20, 30, 50, 100].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setQuestionCount(count)}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    questionCount === count
                      ? 'border-emerald-600 bg-emerald-50/90 ring-2 ring-emerald-600/20 text-emerald-950 font-bold shadow-xs'
                      : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="text-lg font-black block tabular-nums">
                    {count}
                  </span>
                  <span className="text-[11px] block text-slate-500 mt-0.5">
                    {count === 10
                      ? 'اختبار سريع'
                      : count === 20
                      ? 'موصى به'
                      : count === 30
                      ? 'اختبار معمق'
                      : count === 50
                      ? 'نصف امتحان'
                      : 'امتحان كامل'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Domain Category Filter */}
          <div className="text-right mb-8">
            <label className="block text-xs font-bold text-slate-800 mb-2">
              2. تصفية حسب المجال المعرفي (اختياري):
            </label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Start and Back buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onBackToHome}
              className="w-full sm:w-auto px-6 py-3.5 text-slate-600 hover:text-slate-900 font-semibold text-sm rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة للرئيسية</span>
            </button>

            <button
              type="button"
              onClick={handleStartExam}
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>ابدأ الاختبار الآن ({questionCount} سؤالاً)</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ----------------- STAGE 2: QUIZ SCREEN ----------------- */}
      {stage === 'quiz' && quizQuestions.length > 0 && (
        <div className="space-y-4">
          {/* Progress Header */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <span className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center text-xs font-black">
                {currentQuestionIndex + 1}
              </span>
              <span>من أصل {quizQuestions.length} سؤالاً</span>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono font-medium bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60">
              <Clock className="w-3.5 h-3.5 text-emerald-700" />
              <span className="tabular-nums">
                {Math.floor(timerSeconds / 60)}:
                {String(timerSeconds % 60).padStart(2, '0')}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (window.confirm('هل تريد إنهاء الاختبار الآن وعرض النتيجة؟')) {
                  setTimerActive(false);
                  setStage('result');
                }
              }}
              className="text-xs text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
            >
              إنهاء وتصحيح
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
              }}
            />
          </div>

          {/* Question Box */}
          {(() => {
            const currentQ = quizQuestions[currentQuestionIndex];
            const currentAnswer = userAnswers[currentQuestionIndex];

            return (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-lg shadow-slate-200/30">
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200/60">
                    {currentQ.category}
                  </span>
                  {currentQ.sourceExam && (
                    <span className="text-[11px] text-slate-400">
                      {currentQ.sourceExam}
                    </span>
                  )}
                </div>

                {/* Question Text */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 mb-6 leading-relaxed">
                  {currentQ.question}
                </h3>

                {/* Options List */}
                <div className="space-y-3 mb-8">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = currentAnswer === optIdx;
                    const letter = ['أ', 'ب', 'ج', 'د'][optIdx];

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-right p-4 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/90 ring-2 ring-emerald-600/20 text-emerald-950 font-bold shadow-xs'
                            : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-800'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 ${
                            isSelected
                              ? 'bg-emerald-700 text-white'
                              : 'bg-white border border-slate-300 text-slate-600'
                          }`}
                        >
                          {letter}
                        </span>
                        <span className="text-xs sm:text-sm leading-relaxed flex-1">
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Footer */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    disabled={currentQuestionIndex === 0}
                    onClick={handlePrevQuestion}
                    className="px-5 py-3 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-600 font-semibold text-xs sm:text-sm rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>السابق</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-700/20 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>
                      {currentQuestionIndex === quizQuestions.length - 1
                        ? 'إنهاء وتصحيح الاختبار'
                        : 'السؤال التالي'}
                    </span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ----------------- STAGE 3: RESULTS & CORRECTION SCREEN ----------------- */}
      {stage === 'result' && (
        <div className="space-y-6">
          {/* Big Score Card */}
          {(() => {
            const tier = getEvaluationTier();
            return (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg shadow-slate-200/30 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 to-teal-500" />

                <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-inner">
                  <Award className="w-8 h-8" />
                </div>

                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  تقرير نتيجة الاختبار التجريبي
                </span>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                  نتيجة اختبار علوم التربية
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 mb-6">
                  استغرقت في الإجابة: <strong className="text-slate-900">{formatTime(timerSeconds)}</strong>
                </p>

                {/* Score Dial */}
                <div className="bg-gradient-to-b from-emerald-50/80 to-teal-50/50 rounded-3xl border border-emerald-200/70 p-6 max-w-sm mx-auto mb-6 shadow-inner">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                    نسبة الأجوبة الصحيحة
                  </span>
                  <div className="text-5xl sm:text-6xl font-black text-emerald-800 tabular-nums my-1">
                    {percentage}%
                  </div>
                  <div className="text-sm font-bold text-slate-700 mt-2">
                    {correctCount} صحيحة من أصل {quizQuestions.length} سؤالاً
                  </div>
                </div>

                {/* Evaluation Tier Box */}
                <div className={`p-4 rounded-2xl border max-w-md mx-auto mb-6 ${tier.color}`}>
                  <strong className="block text-sm font-black mb-0.5">
                    {tier.label}
                  </strong>
                  <span className="text-xs leading-relaxed">{tier.desc}</span>
                </div>

                {/* Actions: Restart or change */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>إعادة الاختبار بأسئلة أخرى</span>
                  </button>

                  <button
                    type="button"
                    onClick={onBackToHome}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>العودة للرئيسية</span>
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Detailed Correction Section */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  التصحيح والتعليل العلمي للأسئلة
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  راجع كل سؤال مع الإجابة الرسمية الصحيحة والتعليل البيداغوجي المعتمد.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <button
                  onClick={() => setReviewFilter('all')}
                  className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                    reviewFilter === 'all'
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  الكل ({quizQuestions.length})
                </button>
                <button
                  onClick={() => setReviewFilter('wrong')}
                  className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                    reviewFilter === 'wrong'
                      ? 'bg-rose-700 text-white font-bold'
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                  }`}
                >
                  الخاطئة فقط ({quizQuestions.length - correctCount})
                </button>
                <button
                  onClick={() => setReviewFilter('correct')}
                  className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                    reviewFilter === 'correct'
                      ? 'bg-emerald-700 text-white font-bold'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  الصحيحة ({correctCount})
                </button>
              </div>
            </div>

            {/* List of corrected questions */}
            <div className="space-y-4">
              {quizQuestions
                .map((q, idx) => ({ q, idx }))
                .filter(({ q, idx }) => {
                  const isCorrect = userAnswers[idx] === q.correctIndex;
                  if (reviewFilter === 'wrong') return !isCorrect;
                  if (reviewFilter === 'correct') return isCorrect;
                  return true;
                })
                .map(({ q, idx }) => {
                  const userChoice = userAnswers[idx];
                  const isCorrect = userChoice === q.correctIndex;
                  const letterOptions = ['أ', 'ب', 'ج', 'د'];

                  return (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl border transition-all text-xs space-y-3 ${
                        isCorrect
                          ? 'border-emerald-200 bg-emerald-50/30'
                          : 'border-rose-200 bg-rose-50/30'
                      }`}
                    >
                      {/* Header with status badge */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[11px] font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-slate-500">
                            {q.category}
                          </span>
                        </div>

                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>إجابة صحيحة (+1)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-rose-700 font-bold">
                            <XCircle className="w-4 h-4" />
                            <span>إجابة خاطئة</span>
                          </span>
                        )}
                      </div>

                      {/* Question text */}
                      <h4 className="font-bold text-slate-900 text-sm leading-relaxed">
                        {q.question}
                      </h4>

                      {/* Options breakdown */}
                      <div className="space-y-1.5 pt-1">
                        {q.options.map((opt, optIdx) => {
                          const isTheCorrectOne = optIdx === q.correctIndex;
                          const isTheUserChoice = optIdx === userChoice;

                          let rowClass = 'bg-white border-slate-200 text-slate-700';
                          if (isTheCorrectOne) {
                            rowClass =
                              'bg-emerald-100/90 border-emerald-400 text-emerald-950 font-bold';
                          } else if (isTheUserChoice && !isCorrect) {
                            rowClass =
                              'bg-rose-100/80 border-rose-300 text-rose-950 line-through';
                          }

                          return (
                            <div
                              key={optIdx}
                              className={`p-2.5 rounded-xl border flex items-center justify-between ${rowClass}`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold">
                                  {letterOptions[optIdx]}.
                                </span>
                                <span>{opt}</span>
                              </div>

                              {isTheCorrectOne && (
                                <span className="text-[10px] text-emerald-800 font-bold shrink-0 mr-2 flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5" />
                                  <span>الإجابة الصحيحة</span>
                                </span>
                              )}

                              {isTheUserChoice && !isCorrect && (
                                <span className="text-[10px] text-rose-700 font-bold shrink-0 mr-2 flex items-center gap-1">
                                  <X className="w-3.5 h-3.5" />
                                  <span>اختيارك الخاطئ</span>
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Pedagogical Explanation */}
                      <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
                        <strong className="block text-slate-900 font-bold mb-0.5 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          <span>التعليل والشرح العلمي المعتمد:</span>
                        </strong>
                        <p className="text-[11px] sm:text-xs text-slate-600">
                          {q.explanation}
                        </p>
                        {q.sourceExam && (
                          <span className="text-[10px] text-slate-400 block mt-1.5 font-medium">
                            المصدر: {q.sourceExam}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
