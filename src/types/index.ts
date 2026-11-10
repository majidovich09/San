export type EducationCycle = 'primary' | 'middle' | 'secondary' | 'common';

export interface Specialty {
  id: string;
  name: string;
  cycle: EducationCycle;
  cycleLabel: string;
  referenceThreshold: number;
  category: string;
  description?: string;
  competitionLevel: 'direct' | 'low' | 'medium' | 'high' | 'very-high';
}

export type BacMention = 'tres_bien' | 'bien' | 'assez_bien' | 'passable';
export type LicenseMention = 'tres_bien' | 'bien' | 'assez_bien' | 'passable';
export type GraduationAgeCategory = 'le_22' | 'age_23' | 'age_24' | 'gt_24';

export interface UserInputData {
  specialtyId: string;
  bacMention: BacMention;
  licenseMention: LicenseMention;
  graduationAgeCategory: GraduationAgeCategory;
}

export interface ScoreBreakdown {
  bacPoints: number;
  licensePoints: number;
  agePoints: number;
  totalScore: number;
  maxScore: number;
  specialty: Specialty;
  referenceThreshold: number;
  differenceFromThreshold: number;
  chancePercentage: number;
  chanceTier: 'guaranteed' | 'high' | 'moderate' | 'low';
  strategicTips: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
  result?: ScoreBreakdown;
  clarificationWarning?: string;
  quickReplies?: {
    label: string;
    value: string;
    stepKey?: 'specialty' | 'bac' | 'license' | 'age';
  }[];
}

export interface CandidateRecord {
  id: string;
  name: string;
  specialtyName: string;
  cycleLabel: string;
  bacLabel: string;
  bacPoints: number;
  licenseLabel: string;
  licensePoints: number;
  ageLabel: string;
  agePoints: number;
  totalScore: number;
  referenceThreshold: number;
  differenceFromThreshold: number;
  chancePercentage: number;
  timestamp: string;
}
