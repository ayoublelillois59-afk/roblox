/**
 * Reciter Entity
 * Informations sur un récitateur du Coran
 */
export interface Reciter {
  /** Nom du récitateur */
  name: string;

  /** Nom en arabe */
  name_arabic?: string;

  /** Identifiant pour l'API */
  identifier: string;

  /** Style de récitation (Murattal, Mujawwad) */
  style?: string;

  /** Pays d'origine */
  country?: string;
}
