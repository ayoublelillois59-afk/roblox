/**
 * UserProgress Entity
 * Progression de l'utilisateur dans les différents programmes
 */
export type ProgramType = 'quran_memorization' | 'arabic_learning' | 'tajweed';

export interface UserProgress {
  /** Type de programme */
  program_type: ProgramType;

  /** Niveau actuel */
  current_level?: number;

  /** Leçons complétées */
  completed_lessons?: string[];

  /** Compteur total de dhikr */
  total_dhikr_count?: number;

  /** Sourates favorites */
  favorite_surahs?: number[];

  /** Dernière sourate écoutée */
  last_listened_surah?: number;

  /** Récitateur préféré */
  preferred_reciter?: string;
}
