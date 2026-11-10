import { CandidateRecord, ScoreBreakdown } from '../types';

const STORAGE_KEY = 'taalim_candidates_log';

// The private admin security passcode requested by the user
export const ADMIN_PIN_CODE = '102025';

export function getCandidatesLog(): CandidateRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Filter out any leftover fake dummy seeds (like cand_1, cand_2, etc.)
      const realOnly = parsed.filter(
        (c: CandidateRecord) =>
          c &&
          c.id &&
          !c.id.startsWith('cand_1') &&
          !c.id.startsWith('cand_2') &&
          !c.id.startsWith('cand_3') &&
          !c.id.startsWith('cand_4') &&
          !c.id.startsWith('cand_5')
      );

      // If we filtered out dummy seeds, update storage
      if (realOnly.length !== parsed.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(realOnly));
      }
      return realOnly;
    }
    return [];
  } catch {
    return [];
  }
}

export function saveCandidateRecord(
  name: string,
  result: ScoreBreakdown
): CandidateRecord {
  const candidateName = name.trim() || 'مترشح(ة)';
  const now = new Date();
  const dateFormatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const newRecord: CandidateRecord = {
    id: `real_cand_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    name: candidateName,
    specialtyName: result.specialty.name,
    cycleLabel: result.specialty.cycleLabel,
    bacLabel: `${result.bacPoints} نقطة`,
    bacPoints: result.bacPoints,
    licenseLabel: `${result.licensePoints} نقطة`,
    licensePoints: result.licensePoints,
    ageLabel: `${result.agePoints} نقطة`,
    agePoints: result.agePoints,
    totalScore: result.totalScore,
    referenceThreshold: result.referenceThreshold,
    differenceFromThreshold: result.differenceFromThreshold,
    chancePercentage: result.chancePercentage,
    timestamp: dateFormatted,
  };

  try {
    const existing = getCandidatesLog();
    const updated = [newRecord, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save candidate to localStorage', e);
  }

  return newRecord;
}

export function clearCandidatesLog(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear candidates log', e);
  }
}
