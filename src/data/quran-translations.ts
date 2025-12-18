/**
 * Traductions authentiques du Saint Coran par Muhammad Hamidullah
 * Source: Traduction officielle reconnue et approuvée
 */

export interface QuranVerse {
  surahNumber: number;
  surahName: string;
  surahNameArabic: string;
  ayahNumber: number;
  arabic: string;
  translationFr: string;
  transliterationFr?: string;
}

export const QURAN_TRANSLATIONS: QuranVerse[] = [
  // Sourate 1 - Al-Fatiha (L'Ouverture)
  {
    surahNumber: 1,
    surahName: "Al-Fatiha",
    surahNameArabic: "الفاتحة",
    ayahNumber: 1,
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translationFr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux",
    transliterationFr: "Bismillahi ar-rahmani ar-rahim"
  },
  {
    surahNumber: 1,
    surahName: "Al-Fatiha",
    surahNameArabic: "الفاتحة",
    ayahNumber: 2,
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    translationFr: "Louange à Allah, Seigneur de l'univers",
    transliterationFr: "Alhamdulillahi rabbil 'alamin"
  },
  {
    surahNumber: 1,
    surahName: "Al-Fatiha",
    surahNameArabic: "الفاتحة",
    ayahNumber: 3,
    arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
    translationFr: "Le Tout Miséricordieux, le Très Miséricordieux",
    transliterationFr: "Ar-rahmani ar-rahim"
  },
  {
    surahNumber: 1,
    surahName: "Al-Fatiha",
    surahNameArabic: "الفاتحة",
    ayahNumber: 4,
    arabic: "مَالِكِ يَوْمِ الدِّينِ",
    translationFr: "Maître du Jour de la rétribution",
    transliterationFr: "Maliki yawmid-din"
  },
  {
    surahNumber: 1,
    surahName: "Al-Fatiha",
    surahNameArabic: "الفاتحة",
    ayahNumber: 5,
    arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    translationFr: "C'est Toi [Seul] que nous adorons, et c'est Toi [Seul] dont nous implorons secours",
    transliterationFr: "Iyyaka na'budu wa iyyaka nasta'in"
  },
  {
    surahNumber: 1,
    surahName: "Al-Fatiha",
    surahNameArabic: "الفاتحة",
    ayahNumber: 6,
    arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    translationFr: "Guide-nous dans le droit chemin",
    transliterationFr: "Ihdinas-siratal-mustaqim"
  },
  {
    surahNumber: 1,
    surahName: "Al-Fatiha",
    surahNameArabic: "الفاتحة",
    ayahNumber: 7,
    arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    translationFr: "le chemin de ceux que Tu as comblés de faveurs, non pas de ceux qui ont encouru Ta colère, ni des égarés",
    transliterationFr: "Siratal-ladhina an'amta 'alayhim ghayril-maghdubi 'alayhim wa lad-dallin"
  },

  // Sourate 112 - Al-Ikhlas (Le Monothéisme Pur)
  {
    surahNumber: 112,
    surahName: "Al-Ikhlas",
    surahNameArabic: "الإخلاص",
    ayahNumber: 1,
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
    translationFr: "Dis : «Il est Allah, Unique",
    transliterationFr: "Qul huwa Allahu ahad"
  },
  {
    surahNumber: 112,
    surahName: "Al-Ikhlas",
    surahNameArabic: "الإخلاص",
    ayahNumber: 2,
    arabic: "اللَّهُ الصَّمَدُ",
    translationFr: "Allah, Le Seul à être imploré pour ce que nous désirons",
    transliterationFr: "Allahu as-samad"
  },
  {
    surahNumber: 112,
    surahName: "Al-Ikhlas",
    surahNameArabic: "الإخلاص",
    ayahNumber: 3,
    arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
    translationFr: "Il n'a jamais engendré, n'a pas été engendré non plus",
    transliterationFr: "Lam yalid wa lam yulad"
  },
  {
    surahNumber: 112,
    surahName: "Al-Ikhlas",
    surahNameArabic: "الإخلاص",
    ayahNumber: 4,
    arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
    translationFr: "Et nul n'est égal à Lui»",
    transliterationFr: "Wa lam yakun lahu kufuwan ahad"
  },

  // Sourate 113 - Al-Falaq (L'Aube Naissante)
  {
    surahNumber: 113,
    surahName: "Al-Falaq",
    surahNameArabic: "الفلق",
    ayahNumber: 1,
    arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
    translationFr: "Dis : «Je cherche protection auprès du Seigneur de l'aube naissante",
    transliterationFr: "Qul a'udhu birabbi al-falaq"
  },
  {
    surahNumber: 113,
    surahName: "Al-Falaq",
    surahNameArabic: "الفلق",
    ayahNumber: 2,
    arabic: "مِن شَرِّ مَا خَلَقَ",
    translationFr: "contre le mal des êtres qu'Il a créés",
    transliterationFr: "Min sharri ma khalaq"
  },
  {
    surahNumber: 113,
    surahName: "Al-Falaq",
    surahNameArabic: "الفلق",
    ayahNumber: 3,
    arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
    translationFr: "contre le mal de l'obscurité quand elle s'approfondit",
    transliterationFr: "Wa min sharri ghasiqin idha waqab"
  },
  {
    surahNumber: 113,
    surahName: "Al-Falaq",
    surahNameArabic: "الفلق",
    ayahNumber: 4,
    arabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
    translationFr: "contre le mal de celles qui soufflent sur les nœuds",
    transliterationFr: "Wa min sharrin-naffathati fil-'uqad"
  },
  {
    surahNumber: 113,
    surahName: "Al-Falaq",
    surahNameArabic: "الفلق",
    ayahNumber: 5,
    arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    translationFr: "et contre le mal de l'envieux quand il envie»",
    transliterationFr: "Wa min sharri hasidin idha hasad"
  },

  // Sourate 114 - An-Nas (Les Hommes)
  {
    surahNumber: 114,
    surahName: "An-Nas",
    surahNameArabic: "الناس",
    ayahNumber: 1,
    arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
    translationFr: "Dis : «Je cherche protection auprès du Seigneur des hommes",
    transliterationFr: "Qul a'udhu birabb an-nas"
  },
  {
    surahNumber: 114,
    surahName: "An-Nas",
    surahNameArabic: "الناس",
    ayahNumber: 2,
    arabic: "مَلِكِ النَّاسِ",
    translationFr: "Le Souverain des hommes",
    transliterationFr: "Maliki an-nas"
  },
  {
    surahNumber: 114,
    surahName: "An-Nas",
    surahNameArabic: "الناس",
    ayahNumber: 3,
    arabic: "إِلَٰهِ النَّاسِ",
    translationFr: "Dieu des hommes",
    transliterationFr: "Ilahi an-nas"
  },
  {
    surahNumber: 114,
    surahName: "An-Nas",
    surahNameArabic: "الناس",
    ayahNumber: 4,
    arabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
    translationFr: "contre le mal du mauvais conseiller, furtif",
    transliterationFr: "Min sharril-waswasil-khannas"
  },
  {
    surahNumber: 114,
    surahName: "An-Nas",
    surahNameArabic: "الناس",
    ayahNumber: 5,
    arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
    translationFr: "qui souffle le mal dans les poitrines des hommes",
    transliterationFr: "Alladhi yuwaswisu fi suduri an-nas"
  },
  {
    surahNumber: 114,
    surahName: "An-Nas",
    surahNameArabic: "الناس",
    ayahNumber: 6,
    arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ",
    translationFr: "qu'il (le conseiller) soit un djinn, ou un être humain»",
    transliterationFr: "Minal-jinnati wan-nas"
  },

  // Sourate 110 - An-Nasr (Les Secours)
  {
    surahNumber: 110,
    surahName: "An-Nasr",
    surahNameArabic: "النصر",
    ayahNumber: 1,
    arabic: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ",
    translationFr: "Lorsque vient le secours d'Allah ainsi que la victoire",
    transliterationFr: "Idha jaa nasru Allahi wal-fath"
  },
  {
    surahNumber: 110,
    surahName: "An-Nasr",
    surahNameArabic: "النصر",
    ayahNumber: 2,
    arabic: "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا",
    translationFr: "et que tu vois les gens entrer en foule dans la religion d'Allah",
    transliterationFr: "Wa ra'aytan-nasa yadkhuluna fi dini Allahi afwaja"
  },
  {
    surahNumber: 110,
    surahName: "An-Nasr",
    surahNameArabic: "النصر",
    ayahNumber: 3,
    arabic: "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا",
    translationFr: "alors, par la louange, célèbre la gloire de ton Seigneur et implore Son pardon. Car c'est Lui le grand Accueillant au repentir",
    transliterationFr: "Fasabbih bihamdi rabbika wastaghfirh innahu kana tawwaba"
  }
];

/**
 * Recherche un verset par son texte arabe
 * @param arabicText Texte arabe à rechercher (peut être partiel)
 * @returns Le verset correspondant ou null
 */
export function findVerseByArabicText(arabicText: string): QuranVerse | null {
  // Nettoyer le texte de recherche
  const cleanText = arabicText.trim().replace(/\s+/g, ' ');

  // Recherche exacte
  let found = QURAN_TRANSLATIONS.find(verse =>
    verse.arabic.includes(cleanText)
  );

  if (found) return found;

  // Recherche floue (sans diacritiques)
  const removeDiacritics = (text: string) =>
    text.replace(/[\u064B-\u065F\u0670]/g, '');

  const cleanTextNoDiacritics = removeDiacritics(cleanText);

  found = QURAN_TRANSLATIONS.find(verse =>
    removeDiacritics(verse.arabic).includes(cleanTextNoDiacritics)
  );

  return found || null;
}

/**
 * Obtient tous les versets d'une sourate
 * @param surahNumber Numéro de la sourate (1-114)
 * @returns Liste des versets de la sourate
 */
export function getVersesBySurah(surahNumber: number): QuranVerse[] {
  return QURAN_TRANSLATIONS.filter(verse => verse.surahNumber === surahNumber);
}

/**
 * Obtient un verset spécifique
 * @param surahNumber Numéro de la sourate
 * @param ayahNumber Numéro du verset
 * @returns Le verset ou null
 */
export function getVerse(surahNumber: number, ayahNumber: number): QuranVerse | null {
  return QURAN_TRANSLATIONS.find(
    verse => verse.surahNumber === surahNumber && verse.ayahNumber === ayahNumber
  ) || null;
}
