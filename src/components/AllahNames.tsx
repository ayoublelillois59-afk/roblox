import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from 'lucide-react';

// Les 99 Noms d'Allah - Sources authentiques du Coran et Hadith
const ALLAH_NAMES = [
  {
    number: 1,
    arabic: 'ٱلرَّحْمَـٰنُ',
    transliteration: 'Ar-Rahman',
    meaning: 'Le Tout Miséricordieux',
    explanation: 'Celui dont la miséricorde embrasse toute chose. Sa miséricorde précède Sa colère et englobe l\'univers entier, croyants et non-croyants.',
    verse: '"Au nom d\'Allah, le Tout Miséricordieux, le Très Miséricordieux" (Coran 1:1)'
  },
  {
    number: 2,
    arabic: 'ٱلرَّحِيمُ',
    transliteration: 'Ar-Rahim',
    meaning: 'Le Très Miséricordieux',
    explanation: 'Celui qui est particulièrement miséricordieux envers les croyants. Sa miséricorde spéciale est réservée aux croyants dans l\'au-delà.',
    verse: '"Allah est certes Compatissant et Miséricordieux envers les gens" (Coran 2:143)'
  },
  {
    number: 3,
    arabic: 'ٱلْمَلِكُ',
    transliteration: 'Al-Malik',
    meaning: 'Le Souverain, Le Roi',
    explanation: 'Le Roi absolu de l\'univers, Celui qui possède la souveraineté complète sur toute la création.',
    verse: '"C\'est Lui Allah. Nulle divinité autre que Lui, le Souverain" (Coran 59:23)'
  },
  {
    number: 4,
    arabic: 'ٱلْقُدُّوسُ',
    transliteration: 'Al-Quddus',
    meaning: 'Le Pur, Le Saint',
    explanation: 'Celui qui est exempt de toute imperfection, pur de tout défaut et totalement saint.',
    verse: '"C\'est Lui Allah. Nulle divinité autre que Lui, le Saint" (Coran 59:23)'
  },
  {
    number: 5,
    arabic: 'ٱلسَّلَامُ',
    transliteration: 'As-Salam',
    meaning: 'La Paix, La Sécurité',
    explanation: 'Celui qui est la source de toute paix et sécurité, exempt de tout défaut.',
    verse: '"C\'est Lui Allah. Nulle divinité autre que Lui, la Paix" (Coran 59:23)'
  },
  {
    number: 6,
    arabic: 'ٱلْمُؤْمِنُ',
    transliteration: 'Al-Mu\'min',
    meaning: 'Le Fidèle, Celui qui donne la sécurité',
    explanation: 'Celui qui accorde la sécurité et la foi, qui témoigne de Sa propre Unicité.',
    verse: '"C\'est Lui Allah. Nulle divinité autre que Lui, Celui qui donne la sécurité" (Coran 59:23)'
  },
  {
    number: 7,
    arabic: 'ٱلْمُهَيْمِنُ',
    transliteration: 'Al-Muhaymin',
    meaning: 'Le Dominateur Suprême',
    explanation: 'Celui qui veille et protège, le Gardien et Témoin de toute chose.',
    verse: '"C\'est Lui Allah. Le Dominateur suprême" (Coran 59:23)'
  },
  {
    number: 8,
    arabic: 'ٱلْعَزِيزُ',
    transliteration: 'Al-Aziz',
    meaning: 'Le Puissant, Le Fort',
    explanation: 'Celui dont la puissance est insurmontable, Celui qui est invincible.',
    verse: '"Et c\'est Lui le Puissant, le Sage" (Coran 59:24)'
  },
  {
    number: 9,
    arabic: 'ٱلْجَبَّارُ',
    transliteration: 'Al-Jabbar',
    meaning: 'Le Contraignant, Le Réparateur',
    explanation: 'Celui qui contraint et répare toute chose, dont la volonté est irrésistible.',
    verse: '"Le Contraignant, le Superbe. Gloire à Allah! Il transcende ce qu\'ils Lui associent" (Coran 59:23)'
  },
  {
    number: 10,
    arabic: 'ٱلْمُتَكَبِّرُ',
    transliteration: 'Al-Mutakabbir',
    meaning: 'Le Superbe, Le Majestueux',
    explanation: 'Celui qui possède la grandeur absolue, seul digne d\'orgueil légitime.',
    verse: '"Le Superbe. Gloire à Allah! Il transcende ce qu\'ils Lui associent" (Coran 59:23)'
  },
  {
    number: 11,
    arabic: 'ٱلْخَالِقُ',
    transliteration: 'Al-Khaliq',
    meaning: 'Le Créateur',
    explanation: 'Celui qui crée toute chose à partir du néant, le Créateur de l\'univers.',
    verse: '"C\'est Lui Allah, le Créateur, Celui qui donne un commencement à toute chose" (Coran 59:24)'
  },
  {
    number: 12,
    arabic: 'ٱلْبَارِئُ',
    transliteration: 'Al-Bari\'',
    meaning: 'Le Producteur',
    explanation: 'Celui qui fait exister et qui donne l\'être selon Sa volonté.',
    verse: '"C\'est Lui Allah, le Créateur, Celui qui donne un commencement à toute chose" (Coran 59:24)'
  },
  {
    number: 13,
    arabic: 'ٱلْمُصَوِّرُ',
    transliteration: 'Al-Musawwir',
    meaning: 'Le Façonneur, Celui qui donne forme',
    explanation: 'Celui qui façonne et donne une forme unique à chaque création.',
    verse: '"Le Façonneur. À Lui les plus beaux noms" (Coran 59:24)'
  },
  {
    number: 14,
    arabic: 'ٱلْغَفَّارُ',
    transliteration: 'Al-Ghaffar',
    meaning: 'Le Pardonneur',
    explanation: 'Celui qui pardonne sans cesse les péchés de Ses serviteurs repentants.',
    verse: '"Le Pardonneur, le Dominateur Suprême" (Coran 40:3)'
  },
  {
    number: 15,
    arabic: 'ٱلْقَهَّارُ',
    transliteration: 'Al-Qahhar',
    meaning: 'Le Dominateur Absolu',
    explanation: 'Celui qui domine et subjugue toute chose par Sa puissance.',
    verse: '"Dis: \'Moi, je ne suis qu\'un avertisseur. Point de divinité à part Allah, l\'Unique, le Dominateur Suprême\'" (Coran 38:65)'
  },
  {
    number: 16,
    arabic: 'ٱلْوَهَّابُ',
    transliteration: 'Al-Wahhab',
    meaning: 'Le Donateur Généreux',
    explanation: 'Celui qui donne sans compter, sans raison ni besoin.',
    verse: '"Seigneur! Ne laisse pas dévier nos cœurs après que Tu nous aies guidés; et accorde-nous Ta miséricorde. C\'est Toi, certes, le Grand Donateur!" (Coran 3:8)'
  },
  {
    number: 17,
    arabic: 'ٱلرَّزَّاقُ',
    transliteration: 'Ar-Razzaq',
    meaning: 'Le Pourvoyeur',
    explanation: 'Celui qui pourvoit à tous les besoins de Ses créatures.',
    verse: '"En vérité, c\'est Allah qui est le Grand Pourvoyeur, Le Détenteur de la force, l\'Inébranlable" (Coran 51:58)'
  },
  {
    number: 18,
    arabic: 'ٱلْفَتَّاحُ',
    transliteration: 'Al-Fattah',
    meaning: 'Celui qui ouvre, Le Juge',
    explanation: 'Celui qui ouvre les portes du bien et qui juge entre Ses serviteurs.',
    verse: '"Dis: \'Notre Seigneur nous réunira, puis Il tranchera entre nous avec la vérité, car c\'est Lui le Grand Juge, l\'Omniscient\'" (Coran 34:26)'
  },
  {
    number: 19,
    arabic: 'ٱلْعَلِيمُ',
    transliteration: 'Al-Alim',
    meaning: 'L\'Omniscient',
    explanation: 'Celui qui sait tout, dont la science embrasse toute chose.',
    verse: '"Et Il est l\'Omniscient, le Sage" (Coran 6:18)'
  },
  {
    number: 20,
    arabic: 'ٱلْقَابِضُ',
    transliteration: 'Al-Qabid',
    meaning: 'Celui qui contracte',
    explanation: 'Celui qui restreint et retient selon Sa sagesse.',
    verse: '"Allah restreint ou étend Ses dons à qui Il veut" (Coran 2:245) - Hadith'
  },
  {
    number: 21,
    arabic: 'ٱلْبَاسِطُ',
    transliteration: 'Al-Basit',
    meaning: 'Celui qui étend',
    explanation: 'Celui qui étend et élargit les provisions et la miséricorde.',
    verse: '"Et lorsque Nous faisons goûter une miséricorde aux gens, ils en exultent" (Coran 30:36) - Hadith'
  },
  {
    number: 22,
    arabic: 'ٱلْخَافِضُ',
    transliteration: 'Al-Khafid',
    meaning: 'Celui qui abaisse',
    explanation: 'Celui qui abaisse les orgueilleux et les injustes.',
    verse: 'Hadith - At-Tirmidhi'
  },
  {
    number: 23,
    arabic: 'ٱلرَّافِعُ',
    transliteration: 'Ar-Rafi\'',
    meaning: 'Celui qui élève',
    explanation: 'Celui qui élève en rang ceux qui Le méritent.',
    verse: '"Allah élèvera en degrés ceux d\'entre vous qui auront cru et ceux qui auront reçu le savoir" (Coran 58:11)'
  },
  {
    number: 24,
    arabic: 'ٱلْمُعِزُّ',
    transliteration: 'Al-Mu\'izz',
    meaning: 'Celui qui honore',
    explanation: 'Celui qui donne la puissance et l\'honneur à qui Il veut.',
    verse: '"Tu honores qui Tu veux, et Tu humilies qui Tu veux. Le bien est en Ta main" (Coran 3:26)'
  },
  {
    number: 25,
    arabic: 'ٱلْمُذِلُّ',
    transliteration: 'Al-Mudhill',
    meaning: 'Celui qui humilie',
    explanation: 'Celui qui humilie les tyrans et les orgueilleux.',
    verse: '"Tu honores qui Tu veux, et Tu humilies qui Tu veux" (Coran 3:26)'
  },
  {
    number: 26,
    arabic: 'ٱلسَّمِيعُ',
    transliteration: 'As-Sami\'',
    meaning: 'L\'Audient',
    explanation: 'Celui qui entend tout, rien ne Lui échappe.',
    verse: '"Allah a bien entendu la parole de celle qui discutait avec toi à propos de son époux" (Coran 58:1)'
  },
  {
    number: 27,
    arabic: 'ٱلْبَصِيرُ',
    transliteration: 'Al-Basir',
    meaning: 'Le Clairvoyant',
    explanation: 'Celui qui voit tout, rien n\'est caché à Sa vue.',
    verse: '"Il est l\'Audient, le Clairvoyant" (Coran 42:11)'
  },
  {
    number: 28,
    arabic: 'ٱلْحَكَمُ',
    transliteration: 'Al-Hakam',
    meaning: 'Le Juge',
    explanation: 'Celui qui juge avec équité et justice absolue.',
    verse: '"N\'est-ce pas Allah le plus sage des juges?" (Coran 95:8)'
  },
  {
    number: 29,
    arabic: 'ٱلْعَدْلُ',
    transliteration: 'Al-Adl',
    meaning: 'Le Juste',
    explanation: 'Celui qui est parfaitement équitable, qui ne commet aucune injustice.',
    verse: '"Et ton Seigneur ne fait du tort à personne" (Coran 18:49) - Hadith'
  },
  {
    number: 30,
    arabic: 'ٱللَّطِيفُ',
    transliteration: 'Al-Latif',
    meaning: 'Le Bienveillant, Le Subtil',
    explanation: 'Celui qui est doux et bienveillant, qui connaît les secrets les plus subtils.',
    verse: '"Nul regard ne peut L\'atteindre, cependant qu\'Il saisit tous les regards. Et Il est le Doux, le Parfaitement Connaisseur" (Coran 6:103)'
  },
  {
    number: 31,
    arabic: 'ٱلْخَبِيرُ',
    transliteration: 'Al-Khabir',
    meaning: 'Le Parfaitement Informé',
    explanation: 'Celui qui connaît la réalité profonde de toute chose.',
    verse: '"Allah est Parfaitement Connaisseur de ce que vous faites" (Coran 49:13)'
  },
  {
    number: 32,
    arabic: 'ٱلْحَلِيمُ',
    transliteration: 'Al-Halim',
    meaning: 'Le Longanime, Le Patient',
    explanation: 'Celui qui est patient et ne se hâte pas de punir les pécheurs.',
    verse: '"Et Allah est Pardonneur et Patient" (Coran 2:225)'
  },
  {
    number: 33,
    arabic: 'ٱلْعَظِيمُ',
    transliteration: 'Al-Azim',
    meaning: 'Le Magnifique, L\'Immense',
    explanation: 'Celui dont la grandeur est infinie et incommensurable.',
    verse: '"Et glorifie le nom de ton Seigneur, le Très Grand" (Coran 56:96)'
  },
  {
    number: 34,
    arabic: 'ٱلْغَفُورُ',
    transliteration: 'Al-Ghafur',
    meaning: 'Le Pardonneur',
    explanation: 'Celui qui couvre les péchés et pardonne aux repentants.',
    verse: '"Certes Allah est Pardonneur et Miséricordieux" (Coran 4:23)'
  },
  {
    number: 35,
    arabic: 'ٱلشَّكُورُ',
    transliteration: 'Ash-Shakur',
    meaning: 'Le Reconnaissant',
    explanation: 'Celui qui récompense infiniment même les petites bonnes actions.',
    verse: '"Si vous êtes reconnaissants, très certainement J\'augmenterai [Mes bienfaits] pour vous" (Coran 14:7)'
  },
  {
    number: 36,
    arabic: 'ٱلْعَلِيُّ',
    transliteration: 'Al-Aliyy',
    meaning: 'Le Très-Haut',
    explanation: 'Celui qui est élevé au-dessus de toute chose en rang et en statut.',
    verse: '"Il est le Sublime, le Très Grand" (Coran 2:255)'
  },
  {
    number: 37,
    arabic: 'ٱلْكَبِيرُ',
    transliteration: 'Al-Kabir',
    meaning: 'Le Grand',
    explanation: 'Celui dont la grandeur dépasse toute imagination.',
    verse: '"C\'est ainsi qu\'Allah est Lui le Vrai, alors que ce qu\'ils invoquent en dehors de Lui est le faux; c\'est Allah qui est le Sublime, le Grand" (Coran 22:62)'
  },
  {
    number: 38,
    arabic: 'ٱلْحَفِيظُ',
    transliteration: 'Al-Hafiz',
    meaning: 'Le Préservateur',
    explanation: 'Celui qui protège et préserve toute chose.',
    verse: '"En vérité c\'est Nous qui avons fait descendre le Coran, et c\'est Nous qui en sommes gardien" (Coran 15:9)'
  },
  {
    number: 39,
    arabic: 'ٱلْمُقِيتُ',
    transliteration: 'Al-Muqit',
    meaning: 'Celui qui nourrit',
    explanation: 'Celui qui donne la nourriture et maintient la vie.',
    verse: '"Et Allah est certes Puissant en toutes choses" (Coran 4:85)'
  },
  {
    number: 40,
    arabic: 'ٱلْحَسِيبُ',
    transliteration: 'Al-Hasib',
    meaning: 'Celui qui suffit, Le Comptable',
    explanation: 'Celui qui suffit à Ses serviteurs et qui compte toutes leurs actions.',
    verse: '"Allah suffit pour tenir compte de tout" (Coran 4:6)'
  },
  {
    number: 41,
    arabic: 'ٱلْجَلِيلُ',
    transliteration: 'Al-Jalil',
    meaning: 'Le Majestueux',
    explanation: 'Celui qui possède la majesté et la grandeur absolues.',
    verse: '"Béni soit le nom de ton Seigneur, plein de Majesté et de Générosité!" (Coran 55:78)'
  },
  {
    number: 42,
    arabic: 'ٱلْكَرِيمُ',
    transliteration: 'Al-Karim',
    meaning: 'Le Généreux',
    explanation: 'Celui dont la générosité est infinie et la noblesse suprême.',
    verse: '"Béni soit le nom de ton Seigneur, plein de Majesté et de Générosité!" (Coran 55:78)'
  },
  {
    number: 43,
    arabic: 'ٱلرَّقِيبُ',
    transliteration: 'Ar-Raqib',
    meaning: 'Le Vigilant',
    explanation: 'Celui qui observe et veille sur toute chose.',
    verse: '"Allah est certes vigilant sur toute chose" (Coran 33:52)'
  },
  {
    number: 44,
    arabic: 'ٱلْمُجِيبُ',
    transliteration: 'Al-Mujib',
    meaning: 'Celui qui exauce',
    explanation: 'Celui qui répond aux invocations de Ses serviteurs.',
    verse: '"En vérité, mon Seigneur est proche et Il exauce [les prières]" (Coran 11:61)'
  },
  {
    number: 45,
    arabic: 'ٱلْوَاسِعُ',
    transliteration: 'Al-Wasi\'',
    meaning: 'L\'Immense, Le Vaste',
    explanation: 'Celui dont la miséricorde et la science sont illimitées.',
    verse: '"La bonté d\'Allah est immense" (Coran 2:115)'
  },
  {
    number: 46,
    arabic: 'ٱلْحَكِيمُ',
    transliteration: 'Al-Hakim',
    meaning: 'Le Sage',
    explanation: 'Celui qui est parfaitement sage dans tous Ses actes et décrets.',
    verse: '"Et c\'est Lui le Puissant, le Sage" (Coran 59:24)'
  },
  {
    number: 47,
    arabic: 'ٱلْوَدُودُ',
    transliteration: 'Al-Wadud',
    meaning: 'Le Bien-Aimant',
    explanation: 'Celui qui aime Ses serviteurs pieux et qui est aimé d\'eux.',
    verse: '"Et Il est le Pardonneur, le Tout-Affectueux" (Coran 85:14)'
  },
  {
    number: 48,
    arabic: 'ٱلْمَجِيدُ',
    transliteration: 'Al-Majid',
    meaning: 'Le Glorieux',
    explanation: 'Celui qui possède une gloire parfaite et éternelle.',
    verse: '"Et Il est le Pardonneur, le Tout-Affectueux, Le Maître du Trône, le Tout-Glorieux" (Coran 85:14-15)'
  },
  {
    number: 49,
    arabic: 'ٱلْبَاعِثُ',
    transliteration: 'Al-Ba\'ith',
    meaning: 'Celui qui ressuscite',
    explanation: 'Celui qui ressuscitera toutes les créatures le Jour du Jugement.',
    verse: '"Puis Il vous ressuscitera" (Coran 22:7) - Hadith'
  },
  {
    number: 50,
    arabic: 'ٱلشَّهِيدُ',
    transliteration: 'Ash-Shahid',
    meaning: 'Le Témoin',
    explanation: 'Celui qui est témoin de toute chose, rien ne Lui échappe.',
    verse: '"Allah est témoin de toute chose" (Coran 58:6)'
  },
  {
    number: 51,
    arabic: 'ٱلْحَقُّ',
    transliteration: 'Al-Haqq',
    meaning: 'La Vérité, Le Vrai',
    explanation: 'Celui dont l\'existence est la vérité absolue.',
    verse: '"C\'est ainsi qu\'Allah est Lui le Vrai" (Coran 22:62)'
  },
  {
    number: 52,
    arabic: 'ٱلْوَكِيلُ',
    transliteration: 'Al-Wakil',
    meaning: 'Le Garant, Le Protecteur',
    explanation: 'Celui à qui on peut faire totalement confiance pour gérer nos affaires.',
    verse: '"Et place ta confiance en Allah. Allah te suffit comme protecteur" (Coran 33:3)'
  },
  {
    number: 53,
    arabic: 'ٱلْقَوِيُّ',
    transliteration: 'Al-Qawiyy',
    meaning: 'Le Très-Fort',
    explanation: 'Celui dont la force est absolue et insurpassable.',
    verse: '"En vérité, c\'est Allah qui est le Grand Pourvoyeur, Le Détenteur de la force" (Coran 51:58)'
  },
  {
    number: 54,
    arabic: 'ٱلْمَتِينُ',
    transliteration: 'Al-Matin',
    meaning: 'L\'Inébranlable',
    explanation: 'Celui dont la force est ferme et constante.',
    verse: '"En vérité, c\'est Allah qui est le Grand Pourvoyeur, Le Détenteur de la force, l\'Inébranlable" (Coran 51:58)'
  },
  {
    number: 55,
    arabic: 'ٱلْوَلِيُّ',
    transliteration: 'Al-Waliyy',
    meaning: 'Le Proche, L\'Allié',
    explanation: 'Celui qui est l\'ami et le protecteur de Ses serviteurs pieux.',
    verse: '"Allah est le Protecteur de ceux qui ont la foi" (Coran 2:257)'
  },
  {
    number: 56,
    arabic: 'ٱلْحَمِيدُ',
    transliteration: 'Al-Hamid',
    meaning: 'Le Digne de louange',
    explanation: 'Celui qui mérite toutes les louanges et la gratitude.',
    verse: '"Ô hommes! Vous êtes les indigents ayant besoin d\'Allah, et c\'est Allah, Lui qui se dispense de tout et Il est Le Digne de louange" (Coran 35:15)'
  },
  {
    number: 57,
    arabic: 'ٱلْمُحْصِي',
    transliteration: 'Al-Muhsi',
    meaning: 'Le Recenseur',
    explanation: 'Celui qui compte et dénombre toute chose avec précision.',
    verse: '"Il a dénombré toute chose" (Coran 72:28)'
  },
  {
    number: 58,
    arabic: 'ٱلْمُبْدِئُ',
    transliteration: 'Al-Mubdi\'',
    meaning: 'Celui qui donne un commencement',
    explanation: 'Celui qui crée toute chose pour la première fois.',
    verse: '"C\'est Lui qui commence la création puis la refait" (Coran 30:27)'
  },
  {
    number: 59,
    arabic: 'ٱلْمُعِيدُ',
    transliteration: 'Al-Mu\'id',
    meaning: 'Celui qui réitère',
    explanation: 'Celui qui ressuscitera toute créature après la mort.',
    verse: '"C\'est Lui qui commence la création puis la refait" (Coran 30:27)'
  },
  {
    number: 60,
    arabic: 'ٱلْمُحْيِي',
    transliteration: 'Al-Muhyi',
    meaning: 'Celui qui donne la vie',
    explanation: 'Celui qui donne la vie à toute chose vivante.',
    verse: '"Il donne la vie et donne la mort" (Coran 57:2)'
  },
  {
    number: 61,
    arabic: 'ٱلْمُمِيتُ',
    transliteration: 'Al-Mumit',
    meaning: 'Celui qui donne la mort',
    explanation: 'Celui qui reprend la vie quand vient le terme fixé.',
    verse: '"Il donne la vie et donne la mort" (Coran 57:2)'
  },
  {
    number: 62,
    arabic: 'ٱلْحَيُّ',
    transliteration: 'Al-Hayy',
    meaning: 'Le Vivant',
    explanation: 'Celui dont la vie est éternelle, qui n\'a ni début ni fin.',
    verse: '"Allah! Point de divinité à part Lui, le Vivant, Celui qui subsiste par Lui-même" (Coran 2:255)'
  },
  {
    number: 63,
    arabic: 'ٱلْقَيُّومُ',
    transliteration: 'Al-Qayyum',
    meaning: 'Celui qui subsiste par Lui-même',
    explanation: 'Celui qui maintient toute la création, Celui qui ne dort jamais.',
    verse: '"Allah! Point de divinité à part Lui, le Vivant, Celui qui subsiste par Lui-même [Al-Qayyum]" (Coran 2:255)'
  },
  {
    number: 64,
    arabic: 'ٱلْوَاجِدُ',
    transliteration: 'Al-Wajid',
    meaning: 'Celui qui trouve',
    explanation: 'Celui qui ne manque de rien, qui trouve tout ce qu\'Il veut.',
    verse: 'Hadith - At-Tirmidhi'
  },
  {
    number: 65,
    arabic: 'ٱلْمَاجِدُ',
    transliteration: 'Al-Majid',
    meaning: 'Le Noble, Le Glorieux',
    explanation: 'Celui dont la noblesse et la générosité sont infinies.',
    verse: '"Le Maître du Trône, le Tout-Glorieux" (Coran 85:15)'
  },
  {
    number: 66,
    arabic: 'ٱلْوَاحِدُ',
    transliteration: 'Al-Wahid',
    meaning: 'L\'Unique',
    explanation: 'Celui qui est Un, sans associé ni égal.',
    verse: '"Dis: \'Il est Allah, Unique\'" (Coran 112:1)'
  },
  {
    number: 67,
    arabic: 'ٱلْأَحَد',
    transliteration: 'Al-Ahad',
    meaning: 'L\'Un',
    explanation: 'L\'Unique absolu qui n\'a pas d\'équivalent.',
    verse: '"Dis: \'Il est Allah, Unique. Allah, Le Seul à être imploré pour ce que nous désirons\'" (Coran 112:1-2)'
  },
  {
    number: 68,
    arabic: 'ٱلصَّمَدُ',
    transliteration: 'As-Samad',
    meaning: 'Le Soutien universel',
    explanation: 'Celui vers qui on se tourne dans le besoin, qui n\'a besoin de personne.',
    verse: '"Allah, Le Seul à être imploré pour ce que nous désirons [As-Samad]" (Coran 112:2)'
  },
  {
    number: 69,
    arabic: 'ٱلْقَادِرُ',
    transliteration: 'Al-Qadir',
    meaning: 'Le Capable',
    explanation: 'Celui qui a pouvoir sur toute chose.',
    verse: '"Certes Allah est Puissant en toutes choses" (Coran 2:20)'
  },
  {
    number: 70,
    arabic: 'ٱلْمُقْتَدِرُ',
    transliteration: 'Al-Muqtadir',
    meaning: 'Le Tout-Puissant',
    explanation: 'Celui dont la puissance est absolue et parfaite.',
    verse: '"Dans un séjour de vérité, auprès d\'un Souverain Omnipotent" (Coran 54:55)'
  },
  {
    number: 71,
    arabic: 'ٱلْمُقَدِّمُ',
    transliteration: 'Al-Muqaddim',
    meaning: 'Celui qui avance',
    explanation: 'Celui qui met en avant qui Il veut.',
    verse: 'Hadith - Sahih Muslim'
  },
  {
    number: 72,
    arabic: 'ٱلْمُؤَخِّرُ',
    transliteration: 'Al-Mu\'akhkhir',
    meaning: 'Celui qui retarde',
    explanation: 'Celui qui retarde ou met en arrière qui Il veut.',
    verse: 'Hadith - Sahih Muslim'
  },
  {
    number: 73,
    arabic: 'ٱلْأَوَّلُ',
    transliteration: 'Al-Awwal',
    meaning: 'Le Premier',
    explanation: 'Celui qui existe avant toute chose, sans commencement.',
    verse: '"C\'est Lui le Premier et le Dernier, l\'Apparent et le Caché" (Coran 57:3)'
  },
  {
    number: 74,
    arabic: 'ٱلْآخِرُ',
    transliteration: 'Al-Akhir',
    meaning: 'Le Dernier',
    explanation: 'Celui qui demeure après toute chose, sans fin.',
    verse: '"C\'est Lui le Premier et le Dernier, l\'Apparent et le Caché" (Coran 57:3)'
  },
  {
    number: 75,
    arabic: 'ٱلظَّاهِرُ',
    transliteration: 'Az-Zahir',
    meaning: 'L\'Apparent',
    explanation: 'Celui dont l\'existence est évidente par Ses signes.',
    verse: '"C\'est Lui le Premier et le Dernier, l\'Apparent et le Caché" (Coran 57:3)'
  },
  {
    number: 76,
    arabic: 'ٱلْبَاطِنُ',
    transliteration: 'Al-Batin',
    meaning: 'Le Caché',
    explanation: 'Celui dont l\'essence est cachée et incompréhensible.',
    verse: '"C\'est Lui le Premier et le Dernier, l\'Apparent et le Caché et Il est Omniscient" (Coran 57:3)'
  },
  {
    number: 77,
    arabic: 'ٱلْوَالِي',
    transliteration: 'Al-Wali',
    meaning: 'Le Gouverneur',
    explanation: 'Celui qui gouverne et gère toute la création.',
    verse: '"Tu es notre Maître, donne-nous donc la victoire" (Coran 2:286)'
  },
  {
    number: 78,
    arabic: 'ٱلْمُتَعَالِي',
    transliteration: 'Al-Muta\'ali',
    meaning: 'Le Très-Élevé',
    explanation: 'Celui qui est exalté au-dessus de tous les attributs de la création.',
    verse: '"Le Connaisseur de l\'Invisible et du visible, le Grand, le Très-Haut" (Coran 13:9)'
  },
  {
    number: 79,
    arabic: 'ٱلْبَرُّ',
    transliteration: 'Al-Barr',
    meaning: 'Le Bienfaisant',
    explanation: 'Celui dont la bonté et la bienfaisance sont immenses.',
    verse: '"C\'est Lui que nous implorions. C\'est Lui certes le Bienfaisant, le Très Miséricordieux" (Coran 52:28)'
  },
  {
    number: 80,
    arabic: 'ٱلتَّوَّابُ',
    transliteration: 'At-Tawwab',
    meaning: 'Celui qui ne cesse d\'accueillir le repentir',
    explanation: 'Celui qui accepte le repentir encore et encore.',
    verse: '"Et c\'est Lui qui agrée le repentir de Ses serviteurs" (Coran 42:25)'
  },
  {
    number: 81,
    arabic: 'ٱلْمُنْتَقِمُ',
    transliteration: 'Al-Muntaqim',
    meaning: 'Le Vengeur',
    explanation: 'Celui qui se venge des tyrans et des malfaiteurs.',
    verse: '"Et Allah est Puissant et Détenteur du pouvoir de punir" (Coran 3:4)'
  },
  {
    number: 82,
    arabic: 'ٱلْعَفُوُّ',
    transliteration: 'Al-\'Afuww',
    meaning: 'L\'Indulgent',
    explanation: 'Celui qui efface les péchés et pardonne.',
    verse: '"Certes Allah est Indulgent et Pardonneur" (Coran 4:43)'
  },
  {
    number: 83,
    arabic: 'ٱلرَّؤُوفُ',
    transliteration: 'Ar-Ra\'uf',
    meaning: 'Le Très-Bienveillant',
    explanation: 'Celui dont la compassion et la douceur sont extrêmes.',
    verse: '"Certes, Allah est Compatissant et Miséricordieux envers les gens" (Coran 2:143)'
  },
  {
    number: 84,
    arabic: 'مَالِكُ ٱلْمُلْكِ',
    transliteration: 'Malik-ul-Mulk',
    meaning: 'Le Possesseur de la Souveraineté',
    explanation: 'Celui qui détient le royaume et la souveraineté absolue.',
    verse: '"Dis: \'Ô Allah, Maître de l\'autorité absolue\'" (Coran 3:26)'
  },
  {
    number: 85,
    arabic: 'ذُو ٱلْجَلَالِ وَٱلْإِكْرَامِ',
    transliteration: 'Dhu-l-Jalali wa-l-Ikram',
    meaning: 'Le Détenteur de la Majesté et de la Générosité',
    explanation: 'Celui qui possède la majesté et la noblesse parfaites.',
    verse: '"Béni soit le nom de ton Seigneur, plein de Majesté et de Générosité!" (Coran 55:78)'
  },
  {
    number: 86,
    arabic: 'ٱلْمُقْسِطُ',
    transliteration: 'Al-Muqsit',
    meaning: 'L\'Équitable',
    explanation: 'Celui qui est juste et équitable dans tous Ses jugements.',
    verse: '"Certes Allah aime les équitables" (Coran 49:9)'
  },
  {
    number: 87,
    arabic: 'ٱلْجَامِعُ',
    transliteration: 'Al-Jami\'',
    meaning: 'Celui qui réunit',
    explanation: 'Celui qui rassemblera toutes les créatures le Jour du Jugement.',
    verse: '"Notre Seigneur! C\'est Toi qui rassembleras les gens, un jour" (Coran 3:9)'
  },
  {
    number: 88,
    arabic: 'ٱلْغَنِيُّ',
    transliteration: 'Al-Ghaniyy',
    meaning: 'Le Riche, Celui qui se suffit à Lui-même',
    explanation: 'Celui qui n\'a besoin de rien ni de personne.',
    verse: '"Ô hommes! Vous êtes les indigents ayant besoin d\'Allah, et c\'est Allah, Lui qui se dispense de tout" (Coran 35:15)'
  },
  {
    number: 89,
    arabic: 'ٱلْمُغْنِي',
    transliteration: 'Al-Mughni',
    meaning: 'Celui qui enrichit',
    explanation: 'Celui qui enrichit qui Il veut.',
    verse: '"Et c\'est Lui qui enrichit et qui fait acquérir" (Coran 53:48)'
  },
  {
    number: 90,
    arabic: 'ٱلْمَانِعُ',
    transliteration: 'Al-Mani\'',
    meaning: 'Celui qui empêche',
    explanation: 'Celui qui empêche et protège ce qu\'Il veut.',
    verse: 'Hadith - Sahih Muslim'
  },
  {
    number: 91,
    arabic: 'ٱلضَّارُّ',
    transliteration: 'Ad-Darr',
    meaning: 'Celui qui peut nuire',
    explanation: 'Celui qui peut affliger d\'une épreuve pour éprouver.',
    verse: '"Et si Allah fait qu\'un mal te touche, nul ne peut l\'écarter en dehors de Lui" (Coran 6:17) - Hadith'
  },
  {
    number: 92,
    arabic: 'ٱلنَّافِعُ',
    transliteration: 'An-Nafi\'',
    meaning: 'Celui qui accorde le profit',
    explanation: 'Celui qui peut accorder le bien et le profit.',
    verse: 'Hadith - Sahih Muslim'
  },
  {
    number: 93,
    arabic: 'ٱلنُّورُ',
    transliteration: 'An-Nur',
    meaning: 'La Lumière',
    explanation: 'Celui qui est la lumière des cieux et de la terre.',
    verse: '"Allah est la Lumière des cieux et de la terre" (Coran 24:35)'
  },
  {
    number: 94,
    arabic: 'ٱلْهَادِي',
    transliteration: 'Al-Hadi',
    meaning: 'Le Guide',
    explanation: 'Celui qui guide vers le droit chemin.',
    verse: '"Et Allah guide qui Il veut vers un chemin droit" (Coran 2:213)'
  },
  {
    number: 95,
    arabic: 'ٱلْبَدِيعُ',
    transliteration: 'Al-Badi\'',
    meaning: 'Le Créateur incomparable',
    explanation: 'Celui qui crée de manière unique, sans modèle préexistant.',
    verse: '"Il est le Créateur des cieux et de la terre à partir du néant!" (Coran 2:117)'
  },
  {
    number: 96,
    arabic: 'ٱلْبَاقِي',
    transliteration: 'Al-Baqi',
    meaning: 'L\'Éternel',
    explanation: 'Celui qui subsiste éternellement, qui ne périt jamais.',
    verse: '"Tout ce qui est sur elle [la terre] doit disparaître. Seule subsistera La Face [Wajh] de ton Seigneur" (Coran 55:26-27)'
  },
  {
    number: 97,
    arabic: 'ٱلْوَارِثُ',
    transliteration: 'Al-Warith',
    meaning: 'L\'Héritier',
    explanation: 'Celui qui hérite de tout après la destruction de toute chose.',
    verse: '"C\'est Nous, en vérité, qui héritons la terre et tout ce qui s\'y trouve" (Coran 19:40)'
  },
  {
    number: 98,
    arabic: 'ٱلرَّشِيدُ',
    transliteration: 'Ar-Rashid',
    meaning: 'Le Guide sur la voie droite',
    explanation: 'Celui qui guide vers le bien et la droiture.',
    verse: 'Hadith - At-Tirmidhi'
  },
  {
    number: 99,
    arabic: 'ٱلصَّبُورُ',
    transliteration: 'As-Sabur',
    meaning: 'Le Patient',
    explanation: 'Celui qui est infiniment patient et ne se hâte pas de punir.',
    verse: '"Certes Allah est avec ceux qui sont patients" (Coran 8:46) - Hadith'
  }
];

export default function AllahNames() {
  const [selectedName, setSelectedName] = useState(ALLAH_NAMES[0]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
        {ALLAH_NAMES.map((name) => (
          <Card
            key={name.number}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedName.number === name.number
                ? 'border-[#0d9488] border-2 bg-[#0d9488]/5 shadow-md'
                : 'hover:border-[#0d9488]/30'
            }`}
            onClick={() => setSelectedName(name)}
          >
            <CardContent className="p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">{name.number}</div>
              <div className="text-2xl font-serif text-gray-800 mb-1">{name.arabic}</div>
              <div className="text-xs text-gray-600 font-medium">{name.transliteration}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Name Details */}
      <Card className="bg-gradient-to-br from-[#0d9488]/10 via-emerald-50 to-teal-50 border-2 border-[#0d9488]/20 shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="text-7xl font-serif text-[#0d9488] mb-4 leading-relaxed">{selectedName.arabic}</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">{selectedName.transliteration}</h3>
            <p className="text-xl text-[#0d9488] font-semibold mb-1">{selectedName.meaning}</p>
            <Badge className="bg-[#0d9488] text-white border-none mt-2">
              Nom #{selectedName.number} / 99
            </Badge>
          </div>

          <div className="bg-white/70 rounded-2xl p-6 mb-4">
            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#0d9488]" />
              Explication
            </h4>
            <p className="text-gray-700 leading-relaxed">
              {selectedName.explanation}
            </p>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200">
            <h4 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              Référence du Coran ou Hadith
            </h4>
            <p className="text-amber-900 italic leading-relaxed">
              {selectedName.verse}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
