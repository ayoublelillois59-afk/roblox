/**
 * Mosque Entity
 * Informations sur une mosquée
 */
export interface PrayerTimes {
  fajr?: string;
  dhuhr?: string;
  asr?: string;
  maghrib?: string;
  isha?: string;
}

export interface Mosque {
  /** ID unique de la mosquée */
  id?: string;

  /** Nom de la mosquée */
  name: string;

  /** Adresse complète */
  address?: string;

  /** Ville */
  city: string;

  /** Latitude */
  latitude?: number;

  /** Longitude */
  longitude?: number;

  /** Numéro de téléphone */
  phone?: string;

  /** Site web */
  website?: string;

  /** Horaires de prière personnalisés */
  prayer_times?: PrayerTimes;

  /** Heure du Jumua (prière du vendredi) */
  jumua_time?: string;

  /** Mosquée vérifiée */
  verified?: boolean;
}
