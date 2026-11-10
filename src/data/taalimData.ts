import {
  Specialty,
  BacMention,
  LicenseMention,
  GraduationAgeCategory,
  ScoreBreakdown,
  RegionalChance,
} from '../types';

export const BAC_POINTS: Record<BacMention, { label: string; points: number }> = {
  tres_bien: { label: 'حسن جداً (Très Bien)', points: 25 },
  bien: { label: 'حسن (Bien)', points: 20 },
  assez_bien: { label: 'لا بأس به (Assez Bien)', points: 10 },
  passable: { label: 'مقبول / بدون ميزة (Passable)', points: 0 },
};

export const LICENSE_POINTS: Record<LicenseMention, { label: string; points: number }> = {
  tres_bien: { label: 'حسن جداً (Très Bien)', points: 30 },
  bien: { label: 'حسن (Bien)', points: 25 },
  assez_bien: { label: 'لا بأس به (Assez Bien)', points: 15 },
  passable: { label: 'مقبول / بدون ميزة (Passable)', points: 0 },
};

export const AGE_POINTS: Record<GraduationAgeCategory, { label: string; points: number; note: string }> = {
  le_22: { label: '22 سنة أو أقل (<= 22 سنة)', points: 25, note: 'تخرج سريع وتفوق زمني' },
  age_23: { label: '23 سنة', points: 15, note: 'مسار دراسي منتظم' },
  age_24: { label: '24 سنة', points: 5, note: 'تخرج في السن المعياري' },
  gt_24: { label: 'أكبر من 24 سنة (> 24 سنة)', points: 0, note: 'نقطة السن 0 مع الاحتفاظ بكامل حظوظ الميزات والمباراة' },
};

export const SPECIALTIES: Specialty[] = [
  // التعليم الابتدائي
  {
    id: 'prim_dual',
    name: 'التعليم الابتدائي - مزدوج (عربية / فرنسية)',
    cycle: 'primary',
    cycleLabel: 'التعليم الابتدائي',
    referenceThreshold: 60,
    category: 'ابتدائي',
    competitionLevel: 'high',
    description: 'أكبر عدد من المناصب وطنياً، مع تنافسية مرتفعة بالمدن الكبرى.',
  },
  {
    id: 'prim_amazigh',
    name: 'التعليم الابتدائي - تخصص اللغة الأمازيغية',
    cycle: 'primary',
    cycleLabel: 'التعليم الابتدائي',
    referenceThreshold: 5,
    category: 'ابتدائي',
    competitionLevel: 'low',
    description: 'عتبة منخفضة جداً وطلب متزايد لتعميم تدريس الأمازيغية.',
  },

  // الثانوي الإعدادي
  {
    id: 'mid_tech',
    name: 'الثانوي الإعدادي - التكنولوجيا',
    cycle: 'middle',
    cycleLabel: 'الثانوي الإعدادي',
    referenceThreshold: 65,
    category: 'إعدادي',
    competitionLevel: 'very-high',
    description: 'عتبة مرتفعة نظراً لمحدودية المقاعد وكثرة المترشحين المهندسين والتقنيين.',
  },
  {
    id: 'mid_islamic',
    name: 'الثانوي الإعدادي - التربية الإسلامية',
    cycle: 'middle',
    cycleLabel: 'الثانوي الإعدادي',
    referenceThreshold: 35,
    category: 'إعدادي',
    competitionLevel: 'medium',
    description: 'تنافسية متوسطة تتأثر بحجم الخصاص الإقليمي.',
  },
  {
    id: 'mid_eps',
    name: 'الثانوي الإعدادي - التربية البدنية والرياضية',
    cycle: 'middle',
    cycleLabel: 'الثانوي الإعدادي',
    referenceThreshold: 35,
    category: 'إعدادي',
    competitionLevel: 'medium',
    description: 'عتبة مستقرة مع ضرورة الاستعداد للاختبار العملي البدني.',
  },
  {
    id: 'mid_english',
    name: 'الثانوي الإعدادي - اللغة الإنجليزية',
    cycle: 'middle',
    cycleLabel: 'الثانوي الإعدادي',
    referenceThreshold: 15,
    category: 'إعدادي',
    competitionLevel: 'low',
    description: 'عتبة مناسبة بفضل توسيع تدريس الإنجليزية بالإعدادي.',
  },
  {
    id: 'mid_social',
    name: 'الثانوي الإعدادي - الاجتماعيات (التاريخ والجغرافيا)',
    cycle: 'middle',
    cycleLabel: 'الثانوي الإعدادي',
    referenceThreshold: 15,
    category: 'إعدادي',
    competitionLevel: 'low',
    description: 'فرص جيدة مع عتبة مرجعية مريحة.',
  },
  {
    id: 'mid_arabic',
    name: 'الثانوي الإعدادي - اللغة العربية',
    cycle: 'middle',
    cycleLabel: 'الثانوي الإعدادي',
    referenceThreshold: 5,
    category: 'إعدادي',
    competitionLevel: 'low',
    description: 'عتبة منخفضة تؤهل معظم حاملي الإجازة لاجتياز الامتحان الكتابي.',
  },
  {
    id: 'mid_info',
    name: 'الثانوي الإعدادي - المعلوميات',
    cycle: 'middle',
    cycleLabel: 'الثانوي الإعدادي',
    referenceThreshold: 0,
    category: 'إعدادي',
    competitionLevel: 'direct',
    description: 'قبول شبه مباشر لكل ملف مستوفٍ للشروط القانونية والأكاديمية.',
  },
  {
    id: 'mid_physics',
    name: 'الثانوي الإعدادي - الفيزياء والكيمياء',
    cycle: 'middle',
    cycleLabel: 'الثانوي الإعدادي',
    referenceThreshold: 0,
    category: 'إعدادي',
    competitionLevel: 'direct',
    description: 'قبول شبه مباشر بسبب الخصاص الوطني الحاد في المواد العلمية.',
  },
  {
    id: 'mid_svt',
    name: 'الثانوي الإعدادي - علوم الحياة والأرض (SVT)',
    cycle: 'middle',
    cycleLabel: 'الثانوي الإعدادي',
    referenceThreshold: 0,
    category: 'إعدادي',
    competitionLevel: 'direct',
    description: 'قبول شبه مباشر لكافة المترشحين المستوفين للشروط.',
  },

  // الثانوي التأهيلي
  {
    id: 'sec_eco',
    name: 'الثانوي التأهيلي - علوم الاقتصاد والتدبير',
    cycle: 'secondary',
    cycleLabel: 'الثانوي التأهيلي',
    referenceThreshold: 85,
    category: 'تأهيلي',
    competitionLevel: 'very-high',
    description: 'أعلى عتبة وطنية بسبب قلة المناصب مقارنة بأعداد خريجي كليات الاقتصاد.',
  },
  {
    id: 'sec_info',
    name: 'الثانوي التأهيلي - المعلوميات',
    cycle: 'secondary',
    cycleLabel: 'الثانوي التأهيلي',
    referenceThreshold: 55,
    category: 'تأهيلي',
    competitionLevel: 'high',
    description: 'عتبة مرتفعة نظراً لطبيعة تدريس المادة في الشعب العلمية والتقنية.',
  },
  {
    id: 'sec_eps',
    name: 'الثانوي التأهيلي - التربية البدنية والرياضية',
    cycle: 'secondary',
    cycleLabel: 'الثانوي التأهيلي',
    referenceThreshold: 50,
    category: 'تأهيلي',
    competitionLevel: 'high',
    description: 'تنافسية قوية تتطلب مجموع نقاط يفوق 45-50 نقطة بالجهات الحضرية.',
  },
  {
    id: 'sec_english',
    name: 'الثانوي التأهيلي - اللغة الإنجليزية',
    cycle: 'secondary',
    cycleLabel: 'الثانوي التأهيلي',
    referenceThreshold: 40,
    category: 'تأهيلي',
    competitionLevel: 'medium',
    description: 'عتبة معتدلة تتيح حظوظاً ممتازة للطلبة أصحاب ميزات الحسن.',
  },
  {
    id: 'sec_islamic',
    name: 'الثانوي التأهيلي - التربية الإسلامية',
    cycle: 'secondary',
    cycleLabel: 'الثانوي التأهيلي',
    referenceThreshold: 40,
    category: 'تأهيلي',
    competitionLevel: 'medium',
    description: 'تنافسية متوسطة إلى مرتفعة بحسب التوزيع الجهوي للمناصب.',
  },
  {
    id: 'sec_philo',
    name: 'الثانوي التأهيلي - الفلسفة',
    cycle: 'secondary',
    cycleLabel: 'الثانوي التأهيلي',
    referenceThreshold: 40,
    category: 'تأهيلي',
    competitionLevel: 'medium',
    description: 'تتطلب الحصول على نقاط جيدة في الإجازة أو ميزة البكالوريا.',
  },
  {
    id: 'sec_history',
    name: 'الثانوي التأهيلي - التاريخ والجغرافيا',
    cycle: 'secondary',
    cycleLabel: 'الثانوي التأهيلي',
    referenceThreshold: 15,
    category: 'تأهيلي',
    competitionLevel: 'low',
    description: 'عتبة مشجعة جداً تمنح حظوظاً عريضة للغالبية.',
  },
  {
    id: 'sec_arabic',
    name: 'الثانوي التأهيلي - اللغة العربية',
    cycle: 'secondary',
    cycleLabel: 'الثانوي التأهيلي',
    referenceThreshold: 0,
    category: 'تأهيلي',
    competitionLevel: 'direct',
    description: 'قبول شبه مباشر لكل ملف مكتمل الشروط.',
  },
  {
    id: 'sec_physics',
    name: 'الثانوي التأهيلي - الفيزياء والكيمياء',
    cycle: 'secondary',
    cycleLabel: 'الثانوي التأهيلي',
    referenceThreshold: 0,
    category: 'تأهيلي',
    competitionLevel: 'direct',
    description: 'قبول شبه مباشر نظراً للحاجة الملحة للأطر العلمية المؤهلة.',
  },
  {
    id: 'sec_svt',
    name: 'الثانوي التأهيلي - علوم الحياة والأرض',
    cycle: 'secondary',
    cycleLabel: 'الثانوي التأهيلي',
    referenceThreshold: 0,
    category: 'تأهيلي',
    competitionLevel: 'direct',
    description: 'قبول شبه مباشر لجميع المترشحين المستوفين للشروط.',
  },

  // مشترك (إعدادي وتأهيلي)
  {
    id: 'com_french',
    name: 'مشترك (إعدادي وتأهيلي) - اللغة الفرنسية',
    cycle: 'common',
    cycleLabel: 'مشترك (إعدادي وتأهيلي)',
    referenceThreshold: 25,
    category: 'مشترك',
    competitionLevel: 'medium',
    description: 'عتبة متوسطة ومستقرة، مع آفاق ممتازة للنجاح.',
  },
  {
    id: 'com_math',
    name: 'مشترك (إعدادي وتأهيلي) - الرياضيات',
    cycle: 'common',
    cycleLabel: 'مشترك (إعدادي وتأهيلي)',
    referenceThreshold: 0,
    category: 'مشترك',
    competitionLevel: 'direct',
    description: 'قبول شبه مباشر (عتبة 0) بسبب الخصاص الوطني الواسع في أساتذة الرياضيات.',
  },
];

export const MOROCCAN_AREFS = [
  { name: 'جهة درعة تافيلالت', demand: 'خصاص مرتفع جداً (عتبات منخفضة جداً)', advice: 'خيار استراتيجي ممتاز لأصحاب النقاط المتوسطة والمنخفضة.' },
  { name: 'جهة بني ملال خنيفرة', demand: 'خصاص مرتفع (عتبات مرنة)', advice: 'مناصب هامة وفرص انتقاء ممتازة خاصة بالأقاليم الجبلية والقروية.' },
  { name: 'جهة الشرق', demand: 'خصاص ملحوظ', advice: 'عتبات معتدلة مقارنة بالسواحل والمدن المركزية.' },
  { name: 'جهة فاس مكناس', demand: 'تنافسية متوسطة', advice: 'المديريات القروية مثل بولمان وتاونات تضمن عتبات أقل بكثير من فاس ومكناس.' },
  { name: 'جهة سوس ماسة', demand: 'تنافسية متوسطة إلى عالية', advice: 'أقاليم تارودانت وطاطا تسجل عادة عتبات أدنى من أكادير وإداوتنان.' },
  { name: 'جهة مراكش آسفي', demand: 'تنافسية عالية', advice: 'إقليم الحوز وشيشاوة والصويرة أكثر مرونة من مراكش المدينة.' },
  { name: 'جهة الدار البيضاء سطات', demand: 'تنافسية شديدة جداً', advice: 'تستقطب كبرى المعدلات، وينصح ذوو النقاط دون 60 بالتوجه لمديريات قروية بالجهة كابن سليمان أو سطات.' },
  { name: 'جهة الرباط سلا القنيطرة', demand: 'تنافسية عالية جداً', advice: 'عتبات مرتفعة بالرباط وسلا، مع فرص أفضل في مديريات الخميسات وسيدي قاسم وسيدي سليمان.' },
  { name: 'جهة طنجة تطوان الحسيمة', demand: 'تنافسية متوسطة إلى عالية', advice: 'مناصب وافرة بوزان والحسيمة وشفشاون بعتبات في المتناول.' },
  { name: 'جهة كلميم واد نون', demand: 'خصاص ملحوظ', advice: 'عتبات مشجعة وتسهيلات كبيرة في الانتقاء.' },
  { name: 'جهة العيون الساقية الحمراء', demand: 'عتبات منخفضة', advice: 'فرص مباشرة للقبول في أغلب التخصصات.' },
  { name: 'جهة الداخلة وادي الذهب', demand: 'عتبات منخفضة', advice: 'قبول شبه مباشر للملفات المستوفية للشروط.' },
];

/**
 * Calculates user's exact score out of 80 points based on official ministerial rubric
 */
export function calculateExactScore(
  bacMention: BacMention,
  licenseMention: LicenseMention,
  graduationAgeCategory: GraduationAgeCategory,
  specialtyId: string
): ScoreBreakdown {
  const bacPoints = BAC_POINTS[bacMention].points;
  const licensePoints = LICENSE_POINTS[licenseMention].points;
  const agePoints = AGE_POINTS[graduationAgeCategory].points;
  const totalScore = bacPoints + licensePoints + agePoints;
  const maxScore = 80;

  const specialty = SPECIALTIES.find((s) => s.id === specialtyId) || SPECIALTIES[0];
  const referenceThreshold = specialty.referenceThreshold;
  const differenceFromThreshold = totalScore - referenceThreshold;

  let chancePercentage: number;
  let chanceTier: 'guaranteed' | 'high' | 'moderate' | 'low';

  // Step 4 logic defined in instructions:
  // - If Threshold is 0: 99% (قبول شبه مباشر للملفات المستوفية للشروط)
  // - If Score >= Reference Threshold: 85% to 99%
  // - If Score is 5 to 15 points below Threshold: 60% to 80% (Factor in November 2026 increased positions & age limit to 40)
  // - If Score is > 20 points below Threshold (and threshold is high like 60+): 25% to 50% (Advise choosing regions like Drâa-Tafilalet)
  if (referenceThreshold === 0) {
    chancePercentage = 99;
    chanceTier = 'guaranteed';
  } else if (totalScore >= referenceThreshold) {
    const surplus = totalScore - referenceThreshold;
    // Map between 85% and 99%
    chancePercentage = Math.min(99, Math.round(85 + Math.min(14, surplus * 0.9)));
    chanceTier = 'guaranteed';
  } else {
    const deficit = referenceThreshold - totalScore; // positive number of points below
    if (deficit <= 5) {
      // 0 to 5 points below: 80% - 84%
      chancePercentage = Math.round(85 - deficit * 1);
      chanceTier = 'high';
    } else if (deficit <= 15) {
      // 5 to 15 points below: 60% to 80%
      // At deficit=5 -> 80%, at deficit=15 -> 60%
      chancePercentage = Math.round(80 - ((deficit - 5) / 10) * 20);
      chanceTier = 'high';
    } else if (deficit <= 20) {
      // 15 to 20 points below: 50% to 60%
      chancePercentage = Math.round(60 - ((deficit - 15) / 5) * 10);
      chanceTier = 'moderate';
    } else {
      // > 20 points below:
      if (referenceThreshold >= 60) {
        // High threshold like 60+ or 85
        // deficit > 20 -> 25% to 50%
        const extraDeficit = deficit - 20;
        chancePercentage = Math.max(25, Math.round(50 - Math.min(25, extraDeficit * 0.8)));
        chanceTier = 'low';
      } else {
        // Threshold is lower, e.g. 40 or 35
        chancePercentage = Math.max(30, Math.round(50 - (deficit - 20) * 1));
        chanceTier = 'low';
      }
    }
  }

  const strategicTips = generateStrategicTips(
    totalScore,
    referenceThreshold,
    specialty,
    bacMention,
    licenseMention,
    graduationAgeCategory
  );

  const regionalRankings = calculateRegionalRankings(totalScore, specialty);

  return {
    bacPoints,
    licensePoints,
    agePoints,
    totalScore,
    maxScore,
    specialty,
    referenceThreshold,
    differenceFromThreshold,
    chancePercentage,
    chanceTier,
    strategicTips,
    regionalRankings,
  };
}

/**
 * Calculates candidate chances across all 12 Moroccan Regional Academies (AREFs)
 * and returns them ranked from HIGHEST chance percentage to LOWEST.
 */
export function calculateRegionalRankings(
  totalScore: number,
  specialty: Specialty
): RegionalChance[] {
  const refThreshold = specialty.referenceThreshold;

  // Regional profiles with threshold adjustments and characteristics
  const regionsConfig = [
    {
      id: 'draa',
      name: 'أكاديمية جهة درعة تافيلالت',
      thresholdAdjustment: -20,
      demandLevel: 'خصاص استثنائي (الفرصة رقم 1)',
      advice: 'أعلى نسبة قبول وطنية؛ خصاص هائل في ورزازات، زاكورة، تنغير، والرشيدية.',
      badgeClass: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'benimellal',
      name: 'أكاديمية جهة بني ملال خنيفرة',
      thresholdAdjustment: -16,
      demandLevel: 'خصاص مرتفع جداً ومقاعد وافرة',
      advice: 'عتبات مرنة بأقاليم أزيلال، خنيفرة، الفقيه بن صالح، وبني ملال القروية.',
      badgeClass: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'dakhla',
      name: 'أكاديمية جهة الداخلة وادي الذهب',
      thresholdAdjustment: -18,
      demandLevel: 'عتبات منخفضة جداً (قبول شبه مباشر)',
      advice: 'حظوظ قياسية تفوق 98% لكافة المستوفين للشروط الأكاديمية.',
      badgeClass: 'bg-teal-100 text-teal-800',
    },
    {
      id: 'laayoune',
      name: 'أكاديمية جهة العيون الساقية الحمراء',
      thresholdAdjustment: -15,
      demandLevel: 'عتبات ميسرة وخصاص',
      advice: 'فرص واسعة للاجتياز المباشر بالعيون، بوجدور، والسمارة.',
      badgeClass: 'bg-teal-100 text-teal-800',
    },
    {
      id: 'guelmim',
      name: 'أكاديمية جهة كلميم واد نون',
      thresholdAdjustment: -14,
      demandLevel: 'عتبات منخفضة وتسهيلات',
      advice: 'عتبات ميسرة جداً بأقاليم أسا الزاك، طانطان، وسيدي إفني.',
      badgeClass: 'bg-teal-100 text-teal-800',
    },
    {
      id: 'oriental',
      name: 'أكاديمية جهة الشرق',
      thresholdAdjustment: -12,
      demandLevel: 'خصاص ملحوظ بالأقاليم',
      advice: 'فرص ممتازة بمديريات فكيك، الدريوش، جرسيف، وتاوريرت.',
      badgeClass: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'fes',
      name: 'أكاديمية جهة فاس مكناس',
      thresholdAdjustment: -10,
      demandLevel: 'عتبات ميسرة بالأقاليم القروية',
      advice: 'مديريات بولمان، تاونات، وإفران تسجل عتبات أدنى بكثير من الحواضر الكبرى.',
      badgeClass: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'souss',
      name: 'أكاديمية جهة سوس ماسة',
      thresholdAdjustment: -8,
      demandLevel: 'تنافسية متوسطة إلى مرتفعة',
      advice: 'تارودانت، طاطا، وتزنيت تضمن عتبات أقل بوضوح من أكادير إداوتنان.',
      badgeClass: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'tanger',
      name: 'أكاديمية جهة طنجة تطوان الحسيمة',
      thresholdAdjustment: -7,
      demandLevel: 'مناصب وافرة بالمناطق الجبلية',
      advice: 'مديريات وزان، شفشاون، وتارجيست والحسيمة خيارات ممتازة لتفادي عتبات طنجة.',
      badgeClass: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'marrakech',
      name: 'أكاديمية جهة مراكش آسفي',
      thresholdAdjustment: -6,
      demandLevel: 'تنافسية عالية بالمدينة / مرنة بالأقاليم',
      advice: 'الحوز، شيشاوة، الصويرة، واليوسفية تتيح عتبات أكثر مرونة بكثير من مراكش المركز.',
      badgeClass: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'rabat',
      name: 'أكاديمية جهة الرباط سلا القنيطرة',
      thresholdAdjustment: -2,
      demandLevel: 'تنافسية شديدة بالمدن المركزية',
      advice: 'عتبات مرتفعة بالرباط وسلا؛ يُفضل التوجه لمديريات الخميسات، سيدي قاسم وسيدي سليمان.',
      badgeClass: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'casa',
      name: 'أكاديمية جهة الدار البيضاء سطات',
      thresholdAdjustment: 0,
      demandLevel: 'أعلى تنافسية وطنية',
      advice: 'أعلى عتبات بالقطب الحضري؛ ينصح ذوو النقاط المتوسطة باختيار سطات أو بنسليمان أو سيدي بنور.',
      badgeClass: 'bg-amber-100 text-amber-800',
    },
  ];

  const results: RegionalChance[] = regionsConfig.map((reg) => {
    let regionalChance: number;
    const effectiveThreshold = Math.max(0, refThreshold + reg.thresholdAdjustment);

    if (refThreshold === 0) {
      regionalChance = 99;
    } else if (totalScore >= effectiveThreshold) {
      const surplus = totalScore - effectiveThreshold;
      regionalChance = Math.min(99, Math.round(86 + Math.min(13, surplus * 0.9)));
    } else {
      const deficit = effectiveThreshold - totalScore;
      if (deficit <= 5) {
        regionalChance = Math.round(82 - deficit * 1.5);
      } else if (deficit <= 15) {
        regionalChance = Math.round(75 - ((deficit - 5) / 10) * 20);
      } else if (deficit <= 25) {
        regionalChance = Math.round(55 - ((deficit - 15) / 10) * 20);
      } else {
        regionalChance = Math.max(15, Math.round(35 - (deficit - 25) * 0.8));
      }
    }

    return {
      id: reg.id,
      name: reg.name,
      chancePercentage: regionalChance,
      demandLevel: reg.demandLevel,
      relativeThreshold: effectiveThreshold,
      advice: reg.advice,
      badgeClass: reg.badgeClass,
    };
  });

  // Sort strictly from HIGHEST chance percentage to LOWEST!
  return results.sort((a, b) => b.chancePercentage - a.chancePercentage);
}

/**
 * Generates 2 short, actionable strategic tips tailored to candidate profile
 */
export function generateStrategicTips(
  totalScore: number,
  threshold: number,
  specialty: Specialty,
  bacMention: BacMention,
  licenseMention: LicenseMention,
  ageCategory: GraduationAgeCategory
): string[] {
  const tips: string[] = [];

  if (threshold === 0) {
    tips.push(
      `في تخصص ${specialty.name} العتبة المرجعية هي 0 (قبول شبه مباشر)؛ استثمر وقتك فوراً وبشكل كلي في ضبط مفاهيم التخصص ومواضيع السنوات الماضية.`
    );
    tips.push(
      'تأكد من مراجعة التجارب المخبرية والجانب الديداكتيكي للمادة ونظريات التعلم الحديثة، فالانتقاء مضمون والفيصل الحقيقي سيكون في الاختبار الكتابي والشفوي.'
    );
    return tips;
  }

  // Score >= Threshold
  if (totalScore >= threshold) {
    tips.push(
      `مجموعك (${totalScore} نقطة) يتجاوز العتبة المرجعية (${threshold} نقطة) بفارق مريح (+${totalScore - threshold})؛ ركّز طاقتك الآن على منهجية تحرير مواضيع الديداكتيك ومستجدات التربية والتكوين.`
    );
    tips.push(
      'اختر الأكاديمية الجهوية الأقرب لاستقرارك براحة بال، مع الاستعداد المبكر للمقابلة الشفوية من خلال التدرب على تقديم مقطع تعليمي-تعلمي واثق.'
    );
    return tips;
  }

  const deficit = threshold - totalScore;

  if (deficit <= 15) {
    // 5 to 15 points below
    tips.push(
      `فارق ${deficit} نقاط عن العتبة قابل للتعويض تماماً؛ تذكر أن دورة 2026 عرفت زيادة هامة في عدد المناصب ورفع سقف السن لـ 40 سنة، مما يجعل العتبات تنخفض بعدة نقاط في معظم الجهات.`
    );
    tips.push(
      'استراتيجياً: قدّم ترشيحك في مديريات إقليمية ذات طابع قروي أو شبه حضري بجهتك (أو جهات قريبة كبني ملال أو درعة تافيلالت) حيث تكون العتبات أدنى بكثير من الحواضر الكبرى.'
    );
    return tips;
  }

  // More than 15-20 points below
  tips.push(
    'اختر بذكاء الأكاديميات ذات الخصاص الواسع والمناصب الكبرى (مثل جهة درعة تافيلالت، جهة الشرق، أو مديريات الحوز وتارودانت وبولمان)، وتجنب المديريات الحضرية المكتظة كالدار البيضاء والرباط.'
  );
  tips.push(
    'ركز على الاستعداد النظري والعملي المكثف لمباراة التعليم دون تردد، فإحصائيات السنوات السابقة تثبت أن العتبات تنزل بشكل مفاجئ عند ارتفاع حصة التوظيف بأقاليم الخصاص.'
  );

  return tips;
}

/**
 * Smart natural language parser for Arabic user inputs
 */
export function parseArabicUserInput(text: string): {
  specialtyId?: string;
  bacMention?: BacMention;
  licenseMention?: LicenseMention;
  ageCategory?: GraduationAgeCategory;
  clarificationWarning?: string;
} {
  const result: {
    specialtyId?: string;
    bacMention?: BacMention;
    licenseMention?: LicenseMention;
    ageCategory?: GraduationAgeCategory;
    clarificationWarning?: string;
  } = {};

  const clean = text.toLowerCase().trim();

  // Check for study duration vs graduation age confusion
  if (
    clean.includes('3 سنوات') ||
    clean.includes('3 سنين') ||
    clean.includes('ثلاث سنوات') ||
    clean.includes('4 سنوات') ||
    clean.includes('أربع سنوات') ||
    clean.includes('مدة الدراسة') ||
    clean.includes('قريت 3') ||
    clean.includes('قريت 4')
  ) {
    result.clarificationWarning =
      'تنبيه لطيف: شبكة التنقيط الرسمية لوزارة التربية الوطنية تحتسب السن عند الحصول على الإجازة (مثلاً: 22 سنة، 23 سنة...) وليس مدة الدراسة بالسنوات.';
  }

  // Parse age
  if (
    clean.includes('22') ||
    clean.includes('21') ||
    clean.includes('20') ||
    clean.includes('أقل من 22') ||
    clean.includes('22 أو أقل') ||
    clean.includes('22 سنة')
  ) {
    result.ageCategory = 'le_22';
  } else if (clean.includes('23')) {
    result.ageCategory = 'age_23';
  } else if (clean.includes('24')) {
    result.ageCategory = 'age_24';
  } else if (
    clean.includes('25') ||
    clean.includes('26') ||
    clean.includes('27') ||
    clean.includes('28') ||
    clean.includes('29') ||
    clean.includes('30') ||
    clean.includes('أكبر من 24') ||
    clean.includes('فوق 24') ||
    clean.includes('أكثر من 24')
  ) {
    result.ageCategory = 'gt_24';
  }

  // Parse Bac Mention
  if (clean.includes('باك') || clean.includes('بكالوريا') || clean.includes('باكالوريا')) {
    if (clean.includes('حسن جدا') || clean.includes('tres bien')) {
      result.bacMention = 'tres_bien';
    } else if (clean.includes('حسن') && !clean.includes('لا باس') && !clean.includes('لا بأس')) {
      result.bacMention = 'bien';
    } else if (clean.includes('مستحسن') || clean.includes('لا باس') || clean.includes('لا بأس') || clean.includes('assez')) {
      result.bacMention = 'assez_bien';
    } else if (clean.includes('مقبول') || clean.includes('بدون ميزة') || clean.includes('passable')) {
      result.bacMention = 'passable';
    }
  }

  // Parse License Mention
  if (clean.includes('إجازة') || clean.includes('اجازة') || clean.includes('licence') || clean.includes('license')) {
    if (clean.includes('حسن جدا') || clean.includes('tres bien')) {
      result.licenseMention = 'tres_bien';
    } else if (clean.includes('حسن') && !clean.includes('لا باس') && !clean.includes('لا بأس')) {
      result.licenseMention = 'bien';
    } else if (clean.includes('مستحسن') || clean.includes('لا باس') || clean.includes('لا بأس') || clean.includes('assez')) {
      result.licenseMention = 'assez_bien';
    } else if (clean.includes('مقبول') || clean.includes('بدون ميزة') || clean.includes('passable')) {
      result.licenseMention = 'passable';
    }
  }

  // Direct mentions if not explicitly labeled with bac/license
  if (!result.bacMention || !result.licenseMention) {
    // If user says "حسن جدا في الباك ومستحسن في الإجازة" handled above
  }

  // Specialty parsing
  if (clean.includes('ابتدائي') || clean.includes('مزدوج') || clean.includes('الابتدائي')) {
    if (clean.includes('أمازيغ') || clean.includes('امازيغ')) {
      result.specialtyId = 'prim_amazigh';
    } else {
      result.specialtyId = 'prim_dual';
    }
  } else if (clean.includes('رياضيات') || clean.includes('math')) {
    result.specialtyId = 'com_math';
  } else if (clean.includes('فرنسية') || clean.includes('francais')) {
    result.specialtyId = 'com_french';
  } else if (clean.includes('بدنية') || clean.includes('رياضة') || clean.includes('eps')) {
    if (clean.includes('تأهيلي') || clean.includes('ثانوي')) {
      result.specialtyId = 'sec_eps';
    } else {
      result.specialtyId = 'mid_eps';
    }
  } else if (clean.includes('إنجليزية') || clean.includes('انجليزية') || clean.includes('english')) {
    if (clean.includes('تأهيلي')) {
      result.specialtyId = 'sec_english';
    } else {
      result.specialtyId = 'mid_english';
    }
  } else if (clean.includes('إسلامية') || clean.includes('اسلامية')) {
    if (clean.includes('تأهيلي')) {
      result.specialtyId = 'sec_islamic';
    } else {
      result.specialtyId = 'mid_islamic';
    }
  } else if (clean.includes('تكنولوجيا') || clean.includes('techno')) {
    result.specialtyId = 'mid_tech';
  } else if (clean.includes('اقتصاد') || clean.includes('تدبير') || clean.includes('eco')) {
    result.specialtyId = 'sec_eco';
  } else if (clean.includes('معلوميات') || clean.includes('انفورماتيك') || clean.includes('informatique')) {
    if (clean.includes('تأهيلي')) {
      result.specialtyId = 'sec_info';
    } else {
      result.specialtyId = 'mid_info';
    }
  } else if (clean.includes('فيزياء') || clean.includes('كيمياء') || clean.includes('physique')) {
    if (clean.includes('تأهيلي')) {
      result.specialtyId = 'sec_physics';
    } else {
      result.specialtyId = 'mid_physics';
    }
  } else if (clean.includes('حياة وأرض') || clean.includes('svt') || clean.includes('علوم الحياة')) {
    if (clean.includes('تأهيلي')) {
      result.specialtyId = 'sec_svt';
    } else {
      result.specialtyId = 'mid_svt';
    }
  } else if (clean.includes('فلسفة')) {
    result.specialtyId = 'sec_philo';
  } else if (clean.includes('اجتماعيات') || clean.includes('تاريخ')) {
    if (clean.includes('تأهيلي')) {
      result.specialtyId = 'sec_history';
    } else {
      result.specialtyId = 'mid_social';
    }
  } else if (clean.includes('عربية')) {
    if (clean.includes('تأهيلي')) {
      result.specialtyId = 'sec_arabic';
    } else {
      result.specialtyId = 'mid_arabic';
    }
  }

  return result;
}
