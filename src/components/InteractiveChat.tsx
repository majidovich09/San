import React, { useState, useRef, useEffect } from 'react';
import {
  ChatMessage,
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
  parseArabicUserInput,
} from '../data/taalimData';
import { ReportCard } from './ReportCard';
import {
  Send,
  Sparkles,
  RotateCcw,
  Bot,
  User,
  Check,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface InteractiveChatProps {
  onOpenRegions: () => void;
}

export const InteractiveChat: React.FC<InteractiveChatProps> = ({ onOpenRegions }) => {
  // Current draft state for step-by-step
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string | null>(null);
  const [selectedBac, setSelectedBac] = useState<BacMention | null>(null);
  const [selectedLicense, setSelectedLicense] = useState<LicenseMention | null>(null);
  const [selectedAge, setSelectedAge] = useState<GraduationAgeCategory | null>(null);

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Initial welcome message adhering strictly to Step 1 instructions
    const initialGreeting =
      'مرحباً بك أخي المترشح / أختي المترشحة لمباراة التعليم بالمغرب! 🎓\n\nأنا المساعد الذكي لحساب حظوظ الانتقاء الأولي في مباراة التعليم. لحساب مجموع نقاطك الدقيق على 80 نقطة ومقارنته مع العتبات المرجعية الرسمية، يرجى تزويدي بالمعطيات الأربعة التالية:\n\n1. التخصص والسلك المطلوب (مثلاً: الابتدائي المزدوج، التربية البدنية إعدادي، الرياضيات، الفرنسية...).\n2. ميزة شهادة البكالوريا (حسن جداً / حسن / لا بأس به / مقبول أو بدون ميزة).\n3. ميزة شهادة الإجازة (حسن جداً / حسن / لا بأس به / مقبول أو بدون ميزة).\n4. سنك عند الحصول على شهادة الإجازة (22 سنة أو أقل / 23 سنة / 24 سنة / أكبر من 24 سنة).\n\n(يمكنك كتابة التفاصيل في رسالة واحدة، أو اختيارها خطوة بخطوة بالضغط على الأزرار السريعة أدناه).';

    setMessages([
      {
        id: 'msg_welcome',
        sender: 'bot',
        text: initialGreeting,
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle final calculation
  const triggerCalculation = (
    specialtyId: string,
    bac: BacMention,
    license: LicenseMention,
    age: GraduationAgeCategory
  ) => {
    const result = calculateExactScore(bac, license, age, specialtyId);

    const reportMessage: ChatMessage = {
      id: `res_${Date.now()}`,
      sender: 'bot',
      text: `تم استلام كافة معطياتك بنجاح! إليك التقرير الشامل والمفصل لحظوظك في الانتقاء الأولي لتخصص (${result.specialty.name}):`,
      timestamp: new Date(),
      result,
    };

    setMessages((prev) => [...prev, reportMessage]);
  };

  // Quick preset loader
  const handleLoadPreset = (
    specId: string,
    bac: BacMention,
    lic: LicenseMention,
    age: GraduationAgeCategory,
    label: string
  ) => {
    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: `تجربة سيناريو: ${label}`,
      timestamp: new Date(),
    };
    setSelectedSpecialtyId(specId);
    setSelectedBac(bac);
    setSelectedLicense(lic);
    setSelectedAge(age);

    setMessages((prev) => [...prev, userMsg]);
    setTimeout(() => {
      triggerCalculation(specId, bac, lic, age);
    }, 300);
  };

  // Step by step selector handlers
  const handleSelectSpecialty = (specId: string) => {
    setSelectedSpecialtyId(specId);
    const spec = SPECIALTIES.find((s) => s.id === specId);
    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: `التخصص المطلوب: ${spec?.name}`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // Check if we now have all 4
    if (selectedBac && selectedLicense && selectedAge) {
      setTimeout(() => triggerCalculation(specId, selectedBac, selectedLicense, selectedAge), 300);
    } else {
      setTimeout(() => {
        const nextPrompt: ChatMessage = {
          id: `bot_bac_${Date.now()}`,
          sender: 'bot',
          text: `ممتاز! اخترت ${spec?.name}.\n\nالخطوة التالية: ما هي ميزة شهادة البكالوريا التي حصلت عليها؟`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, nextPrompt]);
      }, 300);
    }
  };

  const handleSelectBac = (bac: BacMention) => {
    setSelectedBac(bac);
    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: `ميزة البكالوريا: ${BAC_POINTS[bac].label}`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    if (selectedSpecialtyId && selectedLicense && selectedAge) {
      setTimeout(() => triggerCalculation(selectedSpecialtyId, bac, selectedLicense, selectedAge), 300);
    } else {
      setTimeout(() => {
        const nextPrompt: ChatMessage = {
          id: `bot_lic_${Date.now()}`,
          sender: 'bot',
          text: `جيد جداً (+${BAC_POINTS[bac].points} نقطة).\n\nوالآن، ما هي ميزة شهادة الإجازة؟`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, nextPrompt]);
      }, 300);
    }
  };

  const handleSelectLicense = (lic: LicenseMention) => {
    setSelectedLicense(lic);
    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: `ميزة الإجازة: ${LICENSE_POINTS[lic].label}`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    if (selectedSpecialtyId && selectedBac && selectedAge) {
      setTimeout(() => triggerCalculation(selectedSpecialtyId, selectedBac, lic, selectedAge), 300);
    } else {
      setTimeout(() => {
        const nextPrompt: ChatMessage = {
          id: `bot_age_${Date.now()}`,
          sender: 'bot',
          text: `أحسنت (+${LICENSE_POINTS[lic].points} نقطة).\n\nالمعيار الأخير: كم كان سنك عند الحصول على شهادة الإجازة؟\n(تنبيه: يُحتسب السن عند التخرج وليس عدد سنوات الدراسة).`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, nextPrompt]);
      }, 300);
    }
  };

  const handleSelectAge = (age: GraduationAgeCategory) => {
    setSelectedAge(age);
    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: `السن عند نيل الإجازة: ${AGE_POINTS[age].label}`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    const targetSpec = selectedSpecialtyId || 'prim_dual';
    const targetBac = selectedBac || 'bien';
    const targetLic = selectedLicense || 'bien';

    setTimeout(() => {
      triggerCalculation(targetSpec, targetBac, targetLic, age);
    }, 300);
  };

  // Text message submission
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputMessage.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    // Parse input
    const parsed = parseArabicUserInput(trimmed);

    // Apply parsed values if found
    let curSpec = selectedSpecialtyId;
    let curBac = selectedBac;
    let curLic = selectedLicense;
    let curAge = selectedAge;

    if (parsed.specialtyId) {
      curSpec = parsed.specialtyId;
      setSelectedSpecialtyId(curSpec);
    }
    if (parsed.bacMention) {
      curBac = parsed.bacMention;
      setSelectedBac(curBac);
    }
    if (parsed.licenseMention) {
      curLic = parsed.licenseMention;
      setSelectedLicense(curLic);
    }
    if (parsed.ageCategory) {
      curAge = parsed.ageCategory;
      setSelectedAge(curAge);
    }

    // Check if clarification is needed (e.g., entered study duration instead of age)
    if (parsed.clarificationWarning) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `warn_${Date.now()}`,
            sender: 'bot',
            text: `${parsed.clarificationWarning}\n\nيرجى تحديد سنك عند التخرج من الخيارات أدناه:`,
            timestamp: new Date(),
          },
        ]);
      }, 300);
      return;
    }

    // Check if we have all 4
    if (curSpec && curBac && curLic && curAge) {
      setTimeout(() => {
        triggerCalculation(curSpec!, curBac!, curLic!, curAge!);
      }, 400);
    } else {
      // Missing some parameters, prompt for what is missing
      const missingList: string[] = [];
      if (!curSpec) missingList.push('1. التخصص والسلك المطلوب');
      if (!curBac) missingList.push('2. ميزة شهادة البكالوريا');
      if (!curLic) missingList.push('3. ميزة شهادة الإجازة');
      if (!curAge) missingList.push('4. سنك عند نيل الإجازة');

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `remind_${Date.now()}`,
            sender: 'bot',
            text: `شكراً على مشاركتك! تبقى لإتمام الحساب تحديد:\n${missingList.join('\n')}\n\nيمكنك استخدام الأزرار التفاعلية المباشرة أسفله لتحديده فوراً:`,
            timestamp: new Date(),
          },
        ]);
      }, 300);
    }
  };

  const handleReset = () => {
    setSelectedSpecialtyId(null);
    setSelectedBac(null);
    setSelectedLicense(null);
    setSelectedAge(null);
    setMessages([
      {
        id: `welcome_${Date.now()}`,
        sender: 'bot',
        text: 'تمت إعادة ضبط الحاسبة بنجاح! 🔄\n\nتفضل بإدخال معطياتك من جديد (التخصص، ميزة الباك، ميزة الإجازة، السن عند نيل الإجازة) لحساب مجموعك وعتبتك التقديرية.',
        timestamp: new Date(),
      },
    ]);
  };

  // Current active step to guide user
  const getActiveStep = () => {
    if (!selectedSpecialtyId) return 'specialty';
    if (!selectedBac) return 'bac';
    if (!selectedLicense) return 'license';
    if (!selectedAge) return 'age';
    return 'complete';
  };

  const currentStep = getActiveStep();

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-5rem)]">
      {/* Top Banner / Quick Presets */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 mb-3 shadow-xs shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
          <span className="text-xs font-semibold text-slate-800">
            أمثلة سريعة للتجربة الفورية:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() =>
              handleLoadPreset(
                'prim_dual',
                'bien',
                'bien',
                'age_23',
                'ابتدائي مزدوج (حسن / حسن / 23 سنة)'
              )
            }
            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 transition-colors"
          >
            ابتدائي مزدوج (60 نقطة)
          </button>
          <button
            onClick={() =>
              handleLoadPreset(
                'com_math',
                'assez_bien',
                'assez_bien',
                'age_24',
                'رياضيات إعدادي وتأهيلي'
              )
            }
            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 transition-colors"
          >
            رياضيات (عتبة 0)
          </button>
          <button
            onClick={() =>
              handleLoadPreset(
                'sec_eco',
                'tres_bien',
                'tres_bien',
                'le_22',
                'اقتصاد وتدبير تأهيلي'
              )
            }
            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 transition-colors"
          >
            اقتصاد وتدبير (عتبة 85)
          </button>
          <button
            onClick={handleReset}
            className="px-2 py-1 text-slate-500 hover:text-rose-700 transition-colors flex items-center gap-1"
            title="إعادة ضبط"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>تفريغ</span>
          </button>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto px-1 py-2 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-slate-800 text-white'
                  : 'bg-emerald-700 text-white shadow-xs'
              }`}
            >
              {msg.sender === 'user' ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-slate-900 text-white rounded-tl-sm'
                  : 'bg-white text-slate-800 border border-slate-200/90 shadow-xs rounded-tr-sm'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>

              {/* Clarification Alert if needed */}
              {msg.clarificationWarning && (
                <div className="mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{msg.clarificationWarning}</span>
                </div>
              )}

              {/* If message has score result, render Step 4 Report Card! */}
              {msg.result && (
                <div className="mt-4 pt-2">
                  <ReportCard
                    result={msg.result}
                    onExploreRegions={onOpenRegions}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Interactive Step-by-Step Action Palette */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 mt-2 shadow-xs shrink-0">
        {/* Step indicator header */}
        <div className="flex items-center justify-between text-xs text-slate-500 pb-2 mb-2 border-b border-slate-100">
          <span className="font-semibold text-slate-700">
            {currentStep === 'specialty' && 'الخطوة 1 من 4: اختر التخصص والسلك'}
            {currentStep === 'bac' && 'الخطوة 2 من 4: اختر ميزة شهادة البكالوريا'}
            {currentStep === 'license' && 'الخطوة 3 من 4: اختر ميزة شهادة الإجازة'}
            {currentStep === 'age' && 'الخطوة 4 من 4: اختر السن عند نيل شهادة الإجازة'}
            {currentStep === 'complete' && 'اكتملت المعطيات! يمكنك تغيير أي عنصر بالضغط عليه:'}
          </span>
          <span className="text-[11px] text-emerald-700 font-medium">
            شبكة التنقيط الرسمية (80 نقطة)
          </span>
        </div>

        {/* Dynamic Buttons based on current step */}
        {currentStep === 'specialty' && (
          <div className="space-y-2">
            <span className="text-xs text-slate-600 block">اختر تخصصك المستهدف:</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 max-h-36 overflow-y-auto p-1">
              {SPECIALTIES.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => handleSelectSpecialty(spec.id)}
                  className={`text-right p-2 rounded-lg text-xs transition-colors border ${
                    selectedSpecialtyId === spec.id
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <span className="block truncate font-medium">{spec.name}</span>
                  <span className="text-[10px] text-slate-500">
                    عتبة 2025: {spec.referenceThreshold} نقطة
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'bac' && (
          <div>
            <span className="text-xs text-slate-600 block mb-2">
              ما هي ميزة شهادة البكالوريا؟ (الحد الأقصى 25 نقطة):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(BAC_POINTS) as BacMention[]).map((mentionKey) => (
                <button
                  key={mentionKey}
                  onClick={() => handleSelectBac(mentionKey)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedBac === mentionKey
                      ? 'bg-emerald-700 border-emerald-700 text-white font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:bg-emerald-50 text-slate-800 hover:border-emerald-300'
                  }`}
                >
                  <span className="block text-xs font-bold">
                    {BAC_POINTS[mentionKey].label}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1 block">
                    +{BAC_POINTS[mentionKey].points} نقطة
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'license' && (
          <div>
            <span className="text-xs text-slate-600 block mb-2">
              ما هي ميزة شهادة الإجازة؟ (الحد الأقصى 30 نقطة):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(LICENSE_POINTS) as LicenseMention[]).map((mentionKey) => (
                <button
                  key={mentionKey}
                  onClick={() => handleSelectLicense(mentionKey)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedLicense === mentionKey
                      ? 'bg-emerald-700 border-emerald-700 text-white font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:bg-emerald-50 text-slate-800 hover:border-emerald-300'
                  }`}
                >
                  <span className="block text-xs font-bold">
                    {LICENSE_POINTS[mentionKey].label}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1 block">
                    +{LICENSE_POINTS[mentionKey].points} نقطة
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'age' && (
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>
                كم كان سنك عند الحصول على الإجازة؟ (تنبيه: يُحتسب السن وليس عدد سنوات الدراسة):
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(AGE_POINTS) as GraduationAgeCategory[]).map((ageKey) => (
                <button
                  key={ageKey}
                  onClick={() => handleSelectAge(ageKey)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedAge === ageKey
                      ? 'bg-emerald-700 border-emerald-700 text-white font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:bg-emerald-50 text-slate-800 hover:border-emerald-300'
                  }`}
                >
                  <span className="block text-xs font-bold">
                    {AGE_POINTS[ageKey].label}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1 block">
                    +{AGE_POINTS[ageKey].points} نقطة
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'complete' && (
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setSelectedSpecialtyId(null)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 transition-colors"
              >
                تغيير التخصص ↺
              </button>
              <button
                onClick={() => setSelectedBac(null)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 transition-colors"
              >
                تغيير ميزة الباك ↺
              </button>
              <button
                onClick={() => setSelectedLicense(null)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 transition-colors"
              >
                تغيير ميزة الإجازة ↺
              </button>
              <button
                onClick={() => setSelectedAge(null)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 transition-colors"
              >
                تغيير السن ↺
              </button>
            </div>
            <button
              onClick={() => {
                triggerCalculation(
                  selectedSpecialtyId || 'prim_dual',
                  selectedBac || 'bien',
                  selectedLicense || 'bien',
                  selectedAge || 'le_22'
                );
              }}
              className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md font-bold transition-colors"
            >
              إعادة الحساب الآن
            </button>
          </div>
        )}

        {/* Text Input for Typing Natural Message */}
        <form onSubmit={handleSendMessage} className="mt-3 flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="اكتب رسالة مثلاً: ابتدائي مزدوج، باك ميزة حسن، إجازة مستحسن، تخرجت في سن 23 سنة..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs md:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:hover:bg-emerald-700 text-white rounded-xl transition-all font-semibold flex items-center gap-1.5 shrink-0"
          >
            <Send className="w-4 h-4 rotate-180" />
            <span className="hidden sm:inline text-xs">إرسال</span>
          </button>
        </form>
      </div>
    </div>
  );
};
