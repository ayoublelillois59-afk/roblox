/**
 * UserPreferences Entity
 * Préférences utilisateur pour l'application
 */
export interface UserPreferences {
  /** ID de la mosquée sélectionnée */
  selected_mosque_id?: string;

  /** Méthode de calcul des horaires de prière */
  prayer_calculation_method?: string;

  /** Sourates favorites */
  favorite_surahs?: number[];

  /** Noms d'Allah favoris */
  favorite_allah_names?: number[];

  /** Récitateur préféré */
  preferred_reciter?: string;

  /** Utilisateur premium */
  has_premium?: boolean;
}
