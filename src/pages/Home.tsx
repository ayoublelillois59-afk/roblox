import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen, Clock, Mic, GraduationCap, Heart, Hash, Star,
  Users, Sparkles, Award, Volume2,
  Sun, Sunrise, Sunset, Moon, User, Pause
} from 'lucide-react';
import { createPageUrl } from "@/utils";

// Versets du jour avec sources authentiques
const DAILY_VERSES = [
  {
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    french: "Certes, avec la difficulté vient la facilité.",
    source: "Sourate Ash-Sharh (94:6)"
  },
  {
    arabic: "وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ",
    french: "Ne désespérez pas de la miséricorde d'Allah.",
    source: "Sourate Yusuf (12:87)"
  },
  {
    arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
    french: "Souvenez-vous de Moi, Je Me souviendrai de vous.",
    source: "Sourate Al-Baqara (2:152)"
  },
  {
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    french: "Allah est avec les patients.",
    source: "Sourate Al-Baqara (2:153)"
  }
];

// Grandes figures de l'Islam - Personnages historiques authentiques
const ISLAMIC_FIGURES = [
  {
    id: 1,
    name: "Prophète Muhammad",
    arabic: "محمد ﷺ",
    title: "Le Messager d'Allah",
    gradient: "from-amber-400 via-yellow-500 to-amber-600",
    category: "Prophète",
    description: "Le dernier prophète envoyé par Allah, modèle parfait pour l'humanité. Né à La Mecque en 570, il reçut la révélation à l'âge de 40 ans.",
    source: "Sahih Bukhari, Sahih Muslim",
    story: "Muhammad ﷺ est né à La Mecque en l'an 570, année dite de l'Éléphant. Orphelin dès son plus jeune âge - son père Abdullah mourut avant sa naissance et sa mère Amina alors qu'il n'avait que six ans - il fut d'abord élevé par son grand-père Abdul-Muttalib, puis par son oncle Abou Talib après la mort de ce dernier.\n\nDès sa jeunesse, il se distingua par une droiture exemplaire et une honnêteté sans faille, ce qui lui valut le surnom d'Al-Amin (le digne de confiance). Même avant la révélation, il ne se prosternait jamais devant les idoles et se retirait régulièrement pour méditer dans la grotte de Hira.\n\nÀ l'âge de 40 ans, durant le mois de Ramadan, l'ange Jibril lui apparut dans cette grotte et lui révéla les premiers versets du Coran : 'Lis au nom de ton Seigneur qui a créé...'. Cette nuit, appelée Laylat al-Qadr (la Nuit du Destin), marqua le début de sa mission prophétique.\n\nPendant 23 années, malgré les persécutions intenses, les tentatives d'assassinat, l'exil et les guerres défensives, il ne cessa jamais de transmettre le message d'Allah. Il enseigna l'unicité divine (Tawhid), la justice sociale, l'égalité entre les humains, la miséricorde envers toutes les créatures, et établit une société modèle à Médine basée sur la fraternité et la justice. Son dernier sermon au Mont Arafat résuma tous les enseignements de l'Islam. Il mourut en 632, laissant derrière lui une umma unie et le Coran complet."
  },
  {
    id: 2,
    name: "Abu Bakr As-Siddiq",
    arabic: "أبو بكر الصديق",
    title: "Le Véridique",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    category: "Compagnon",
    description: "Premier calife de l'Islam, premier homme à embrasser l'Islam, ami proche du Prophète ﷺ.",
    source: "Sahih Bukhari 3661, Sahih Muslim 2382",
    story: "Abu Bakr, riche marchand mecquois, fut le premier homme adulte libre à embrasser l'Islam sans hésitation. Son acceptation immédiate du message du Prophète ﷺ témoignait de sa foi profonde et de sa connaissance du caractère noble de Muhammad ﷺ.\n\nD'une générosité légendaire, il dépensa toute sa fortune pour la cause de l'Islam, rachetant et libérant des esclaves musulmans torturés comme Bilal. Le Prophète ﷺ dit : 'Aucune fortune ne m'a autant profité que celle d'Abu Bakr.'\n\nLors de l'Hégire vers Médine, alors que les Quraych offraient une récompense pour la capture du Prophète ﷺ, Abu Bakr l'accompagna dans sa périlleuse fuite. Dans la grotte de Thawr, quand les poursuivants s'approchèrent, Abu Bakr s'inquiéta. Le Prophète ﷺ le rassura : 'Ne t'afflige pas, Allah est avec nous.' Une araignée tissa sa toile et des pigeons nichèrent à l'entrée, trompant les ennemis.\n\nSon titre 'As-Siddiq' (le Véridique) lui fut donné lors de l'incident d'Al-Isra wa Al-Mi'raj. Quand les Quraych se moquèrent du voyage nocturne du Prophète ﷺ, Abu Bakr répondit avec une foi inébranlable : 'Si Muhammad l'a dit, c'est absolument vrai.'\n\nAprès la mort du Prophète ﷺ, en tant que premier calife (632-634), il affronta les tribus rebelles (Ridda), unifia la communauté musulmane ébranlée, et ordonna la compilation écrite du Coran. Humble et ascétique, il continua à traire ses propres chèvres même en tant que calife. Il mourut après seulement deux ans de califat, laissant un héritage de fidélité et de sagesse."
  },
  {
    id: 3,
    name: "Omar ibn Al-Khattab",
    arabic: "عمر بن الخطاب",
    title: "Al-Faruq",
    gradient: "from-blue-400 via-indigo-500 to-purple-600",
    category: "Compagnon",
    description: "Deuxième calife, connu pour sa justice exemplaire. Le Coran descendit en accord avec ses avis à plusieurs reprises.",
    source: "Sahih Bukhari 3684, Tirmidhi 3681",
    story: "Avant sa conversion, Omar était l'un des plus farouches opposants à l'Islam, connu pour sa force physique impressionnante et son caractère impétueux. Un jour, armé de son épée, il partit pour tuer le Prophète ﷺ. En chemin, on lui apprit que sa propre sœur et son beau-frère avaient embrassé l'Islam. Furieux, il se rendit chez eux et les frappa. Mais quand il entendit les versets du Coran qu'ils récitaient, son cœur se transforma. Il se rendit immédiatement auprès du Prophète ﷺ et prononça la shahada.\n\nSa conversion en l'an 6 de la mission prophétique fut un tournant décisif pour l'Islam. Le Prophète ﷺ avait prié : 'Ô Allah, fortifie l'Islam par l'un des deux Omar.' Après sa conversion, les musulmans purent prier ouvertement à la Ka'ba pour la première fois. Le Prophète ﷺ lui donna le titre d'Al-Faruq (celui qui distingue le vrai du faux).\n\nDurant son califat (634-644), Omar transforma l'État islamique en un empire s'étendant de la Perse à l'Égypte. Il établit le système de justice (Qada), créa le calendrier hégirien basé sur l'Hégire, institua le trésor public (Bayt al-Mal), et organisa des registres pour distribuer équitablement les richesses.\n\nMalgré sa position, Omar vivait dans une extrême simplicité. Il dormait sous un palmier sur une natte qui laissait des marques sur son corps. Il patrouillait les rues de Médine la nuit pour s'assurer du bien-être de son peuple. Il dit : 'Si un chien mourait de faim sur les rives de l'Euphrate, Omar en serait responsable devant Allah.'\n\nIl fut martyrisé en 644 par un esclave perse pendant qu'il dirigeait la prière de Fajr. Avant de mourir, il demanda à être enterré à côté du Prophète ﷺ et d'Abu Bakr."
  },
  {
    id: 4,
    name: "Uthman ibn Affan",
    arabic: "عثمان بن عفان",
    title: "Dhoul-Nourayn",
    gradient: "from-violet-400 via-purple-500 to-fuchsia-600",
    category: "Compagnon",
    description: "Troisième calife, celui aux deux lumières (épousa deux filles du Prophète). Compila le Coran en un seul mushaf.",
    source: "Sahih Bukhari 3695, Tirmidhi 3697",
    story: "Uthman fut surnommé 'Dhoul-Nourayn' (Celui aux deux lumières) car il épousa successivement deux filles du Prophète ﷺ. Extrêmement généreux, il finança l'armée de l'adversité (Jaysh al-Usrah). Son plus grand leg fut la compilation du Coran en un mushaf unifié envoyé dans toutes les provinces musulmanes, préservant ainsi la parole d'Allah pour l'éternité. Il fut assassiné en martyr alors qu'il récitait le Coran."
  },
  {
    id: 5,
    name: "Ali ibn Abi Talib",
    arabic: "علي بن أبي طالب",
    title: "Asadullah",
    gradient: "from-green-400 via-emerald-500 to-teal-600",
    category: "Compagnon",
    description: "Quatrième calife, cousin et gendre du Prophète ﷺ. Premier enfant à embrasser l'Islam. Connu pour sa bravoure et sa sagesse.",
    source: "Sahih Muslim 2408, Tirmidhi 3724",
    story: "Ali grandit dans la maison du Prophète ﷺ et fut le premier enfant à accepter l'Islam. Lors de l'Hégire, il dormit dans le lit du Prophète ﷺ risquant sa vie. Guerrier courageux, il reçut le titre 'Asadullah' (Lion d'Allah). Sa sagesse et ses jugements sont célèbres. Le Prophète ﷺ dit : 'Je suis la cité du savoir et Ali en est la porte.' Il épousa Fatima, fille du Prophète ﷺ, et fut le père de Hassan et Hussain."
  },
  {
    id: 6,
    name: "Khadija bint Khuwaylid",
    arabic: "خديجة بنت خويلد",
    title: "Mère des croyants",
    gradient: "from-pink-400 via-rose-500 to-red-500",
    category: "Compagnon",
    description: "Première femme du Prophète ﷺ, première femme à accepter l'Islam. Elle le soutint durant les moments les plus difficiles.",
    source: "Sahih Bukhari 3815, Sahih Muslim 2435",
    story: "Khadija était une femme d'affaires prospère et respectée. Elle proposa le mariage au Prophète ﷺ avant la révélation. Quand l'ange Jibril apparut pour la première fois, elle le rassura et le réconforta. Elle fut la première à accepter l'Islam et dépensa toute sa fortune pour soutenir la cause. Le Prophète ﷺ ne se remaria pas de son vivant. Jibril transmit le salam d'Allah à Khadija, lui annonçant une maison au Paradis faite de perles."
  },
  {
    id: 7,
    name: "Aisha bint Abi Bakr",
    arabic: "عائشة بنت أبي بكر",
    title: "La Savante",
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
    category: "Compagnon",
    description: "Épouse du Prophète ﷺ, grande érudite. Elle rapporta 2210 hadiths et enseigna de nombreux compagnons.",
    source: "Sahih Bukhari 3769, Sahih Muslim 2440",
    story: "Aisha était la fille d'Abu Bakr. Son intelligence et sa mémoire prodigieuse firent d'elle une des plus grandes érudites de l'Islam. Elle rapporta 2210 hadiths et les compagnons venaient la consulter pour des questions de jurisprudence. Le Prophète ﷺ reçut des révélations dans sa présence plus qu'avec aucune autre épouse. Elle corrigea même certains compagnons sur des questions religieuses et participa activement à l'enseignement de l'Islam."
  },
  {
    id: 8,
    name: "Bilal ibn Rabah",
    arabic: "بلال بن رباح",
    title: "Le Muezzin",
    gradient: "from-orange-400 via-amber-500 to-yellow-600",
    category: "Compagnon",
    description: "Premier muezzin de l'Islam. Esclave africain torturé pour sa foi, libéré par Abu Bakr. Sa voix appelait les croyants à la prière.",
    source: "Sahih Bukhari 3754, Ibn Sa'd - At-Tabaqat",
    story: "Bilal ibn Rabah était un esclave d'origine africaine (éthiopienne) appartenant à Umayya ibn Khalaf, l'un des plus cruels chefs de La Mecque. Quand Bilal embrassa l'Islam parmi les premiers convertis, il devint la cible de tortures atroces visant à lui faire renier sa foi.\n\nSon maître le traînait dans le désert brûlant de La Mecque à midi, le jetait sur le sable ardent et plaçait un rocher énorme sur sa poitrine, lui ordonnant de renier Allah et Muhammad. Sous cette torture insoutenable, Bilal ne prononçait qu'un seul mot : 'Ahad, Ahad' (Un, Un), affirmant l'unicité d'Allah. Sa foi inébranlable impressionna profondément Abu Bakr qui le racheta et le libéra.\n\nLibre, Bilal devint l'un des compagnons les plus proches du Prophète ﷺ. Sa voix mélodieuse et puissante le désigna naturellement comme le premier muezzin de l'Islam. Chaque jour, sa voix s'élevait pour appeler les croyants à la prière, un symbole vivant de la victoire de la foi sur l'oppression.\n\nLe Prophète ﷺ l'aimait profondément et le considérait comme un frère. Il dit : 'J'ai vu Bilal me précéder au Paradis.' Lors de la conquête de La Mecque, Bilal monta sur la Ka'ba purifiée des idoles et lança l'adhan, accomplissant ainsi un moment historique de victoire et de justice.\n\nAprès la mort du Prophète ﷺ en 632, Bilal fut si affligé qu'il ne put plus faire l'adhan à Médine, chaque appel à la prière ravivant son immense chagrin. Il partit pour la Syrie où il continua à servir l'Islam. Avant sa mort, il vit en rêve le Prophète ﷺ lui demandant de revenir le voir. Il retourna à Médine et, à la demande des compagnons, fit l'adhan une dernière fois. Tous les musulmans présents pleurèrent en entendant sa voix."
  },
  {
    id: 9,
    name: "Salah ad-Din Al-Ayyubi",
    arabic: "صلاح الدين الأيوبي",
    title: "Libérateur de Jérusalem",
    gradient: "from-red-400 via-orange-500 to-amber-600",
    category: "Héros",
    description: "Sultan d'Égypte et de Syrie, libéra Jérusalem en 1187. Connu pour sa bravoure, sa justice et sa générosité même envers ses ennemis.",
    source: "Chroniques historiques authentifiées - Al-Kamil fit-Tarikh d'Ibn Al-Athir",
    story: "Salah ad-Din unifia les musulmans et libéra Jérusalem des Croisés en 1187 après 88 ans d'occupation. Contrairement aux massacres des Croisés lors de leur conquête, Salah ad-Din fit preuve de miséricorde, permettant aux chrétiens de partir en paix moyennant une rançon symbolique. Il paya même pour ceux qui ne pouvaient pas. Sa générosité était légendaire : il mourut sans laisser assez d'argent pour ses funérailles, ayant tout donné en charité. Les Croisés eux-mêmes admiraient sa chevalerie."
  },
  {
    id: 10,
    name: "Imam Abu Hanifa",
    arabic: "الإمام أبو حنيفة",
    title: "Al-Imam Al-A'dham",
    gradient: "from-indigo-400 via-blue-500 to-cyan-600",
    category: "Savant",
    description: "Fondateur de l'école hanafite de jurisprudence. Grand érudit du 8ème siècle connu pour sa piété et son intelligence.",
    source: "Manaqib Abi Hanifa - Al-Khatib Al-Baghdadi",
    story: "Abu Hanifa (699-767) était un commerçant prospère de Kufa qui devint un des plus grands juristes de l'Islam. Il développa une méthodologie rigoureuse basée sur le Coran, la Sunna, le consensus et le raisonnement analogique. Extrêmement pieux, il passait ses nuits en prière et récita le Coran complet 7000 fois dans le lieu où il mourut. Il refusa les postes de juge offerts par les califes, préférant rester indépendant. Son école juridique est suivie par plus d'un tiers des musulmans aujourd'hui."
  },
  {
    id: 11,
    name: "Imam Malik ibn Anas",
    arabic: "الإمام مالك بن أنس",
    title: "Imam Dar Al-Hijra",
    gradient: "from-teal-400 via-emerald-500 to-green-600",
    category: "Savant",
    description: "Fondateur de l'école malikite. Auteur d'Al-Muwatta, un des premiers recueils de hadith. Imam de Médine.",
    source: "Tartib Al-Madarik - Al-Qadi 'Iyad",
    story: "Imam Malik (711-795) naquit et vécut à Médine. Il compila 'Al-Muwatta' (La Voie Aplanée), un des premiers et plus authentiques recueils de hadith. Il n'émettait de fatwa qu'après avoir dit 'Je ne sais pas' 40 fois sur des questions dont il doutait. Le calife lui offrit de faire d'Al-Muwatta le seul livre de référence, mais il refusa, disant : 'Les compagnons du Prophète ﷺ divergeaient et chacun avait raison.' Il fut fouetté pour avoir refusé de déclarer invalide le serment fait au nom d'Allah."
  },
  {
    id: 12,
    name: "Imam Ash-Shafi'i",
    arabic: "الإمام الشافعي",
    title: "Nasir As-Sunnah",
    gradient: "from-purple-400 via-violet-500 to-indigo-600",
    category: "Savant",
    description: "Fondateur de l'école shafiite. Il systématisa les fondements de la jurisprudence islamique (Usul al-Fiqh).",
    source: "Manaqib Ash-Shafi'i - Al-Bayhaqi",
    story: "Ash-Shafi'i (767-820) était un génie qui mémorisa le Coran à 7 ans et Al-Muwatta à 10 ans. Il étudia avec Malik à Médine puis voyagea pour acquérir le savoir. Il établit les fondements de la jurisprudence islamique dans son œuvre 'Ar-Risala'. Il dit : 'Ma preuve est dans mes arguments ; si un hadith sahih contredit mon avis, suivez le hadith, c'est mon avis.' Poète talentueux, il était aussi maître en langue arabe. Il mourut en Égypte où son mausolée est toujours visité."
  },
  {
    id: 13,
    name: "Imam Ahmad ibn Hanbal",
    arabic: "الإمام أحمد بن حنبل",
    title: "Imam Ahl As-Sunnah",
    gradient: "from-rose-400 via-pink-500 to-red-600",
    category: "Savant",
    description: "Fondateur de l'école hanbalite. Auteur du Musnad contenant 30 000 hadiths. Il endura la torture plutôt que de compromettre sa foi.",
    source: "Siyar A'lam An-Nubala - Adh-Dhahabi",
    story: "Ahmad ibn Hanbal (780-855) mémorisa le Coran jeune et voyagea pour collecter des hadiths, compilant son Musnad de 30 000 hadiths. Durant l'épreuve de la 'Mihna', le calife voulait imposer une croyance déviante sur le Coran créé. Ahmad refusa et fut emprisonné et torturé pendant des années. Il ne céda jamais, préservant ainsi la croyance correcte. Des centaines de milliers assistèrent à ses funérailles. Son intégrité et sa patience dans l'épreuve restent un exemple."
  },
  {
    id: 14,
    name: "Rabi'a Al-Adawiyya",
    arabic: "رابعة العدوية",
    title: "Sainte de Bassorah",
    gradient: "from-fuchsia-400 via-pink-500 to-rose-600",
    category: "Savant",
    description: "Grande mystique du 8ème siècle. Pionnière du concept d'amour divin pur dans le soufisme.",
    source: "Tadhkirat Al-Awliya - Farid ad-Din Attar",
    story: "Rabi'a (713-801) était une esclave affranchie qui consacra sa vie à l'adoration d'Allah. Elle rejeta de nombreuses propositions de mariage, dont celle du gouverneur, disant être mariée à Allah. Elle enseigna l'amour d'Allah pour Lui-même, pas par crainte de l'Enfer ou désir du Paradis. On rapporte qu'elle courut dans les rues avec de l'eau et du feu, disant : 'Je veux éteindre l'Enfer et brûler le Paradis pour qu'on adore Allah pour Lui seul.' Ses paroles sur l'amour divin influencèrent profondément le soufisme."
  }
];

type PrayerName = 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';

const PRAYER_ICONS: Record<PrayerName, any> = {
  Fajr: Sunrise,
  Dhuhr: Sun,
  Asr: Sun,
  Maghrib: Sunset,
  Isha: Moon
};

export default function HomePage() {
  const [dailyVerse, setDailyVerse] = useState(DAILY_VERSES[0]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string; remaining: number } | null>(null);
  const [selectedFigure, setSelectedFigure] = useState<typeof ISLAMIC_FIGURES[0] | null>(null);
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    // Changer le verset chaque jour
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setDailyVerse(DAILY_VERSES[dayOfYear % DAILY_VERSES.length]);
  }, []);

  useEffect(() => {
    // Mettre à jour l'heure chaque seconde
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simuler la prochaine prière (en attendant l'intégration API)
    const prayers = [
      { name: 'Fajr', time: '06:00' },
      { name: 'Dhuhr', time: '13:00' },
      { name: 'Asr', time: '16:00' },
      { name: 'Maghrib', time: '18:30' },
      { name: 'Isha', time: '20:00' }
    ];

    const now = currentTime;
    for (const prayer of prayers) {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerTime = new Date();
      prayerTime.setHours(hours, minutes, 0, 0);

      if (prayerTime > now) {
        setNextPrayer({
          name: prayer.name,
          time: prayer.time,
          remaining: Math.floor((prayerTime.getTime() - now.getTime()) / 1000 / 60)
        });
        return;
      }
    }
    // Si toutes les prières sont passées, la prochaine est Fajr demain
    setNextPrayer({ name: 'Fajr', time: '06:00', remaining: 0 });
  }, [currentTime]);

  const getPrayerIcon = () => {
    if (!nextPrayer) return Sun;
    return PRAYER_ICONS[nextPrayer.name as PrayerName] || Sun;
  };

  const formatTimeRemaining = (minutes: number) => {
    if (minutes === 0) return "Demain";
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hrs > 0) return `${hrs}h ${mins}min`;
    return `${mins} min`;
  };

  const PrayerIcon = getPrayerIcon();

  // Fonction pour lire l'histoire avec voix naturelle
  const handleReadStory = () => {
    if (!selectedFigure) return;

    // Si déjà en train de lire, arrêter
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    // Créer un nouvel utterance pour la lecture
    const utterance = new SpeechSynthesisUtterance(selectedFigure.story);

    // Configuration pour voix française naturelle
    utterance.lang = 'fr-FR';
    utterance.rate = 0.9; // Vitesse légèrement ralentie pour meilleure compréhension
    utterance.pitch = 1.0; // Ton normal
    utterance.volume = 1.0; // Volume maximum

    // Essayer de trouver une voix française
    const voices = window.speechSynthesis.getVoices();
    const frenchVoice = voices.find(voice => voice.lang.startsWith('fr'));
    if (frenchVoice) {
      utterance.voice = frenchVoice;
    }

    // Gérer les événements
    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);

    // Lancer la lecture
    window.speechSynthesis.speak(utterance);
  };

  // Arrêter la lecture si le modal se ferme
  useEffect(() => {
    if (!selectedFigure && isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    }
  }, [selectedFigure, isReading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-800 to-teal-900 relative overflow-hidden">
      {/* Fond décoratif islamique */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 text-[200px] text-white/30 font-arabic">☪</div>
        <div className="absolute bottom-20 left-10 text-[150px] text-white/30 font-arabic">🕌</div>
        <div className="absolute top-1/3 left-1/4 text-[180px] text-white/30 font-arabic rotate-12">✨</div>
        <div className="absolute top-2/3 right-1/4 text-[120px] text-white/30 font-arabic">⭐</div>
      </div>

      {/* Pattern géométrique islamique */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
      }}></div>

      <div className="relative z-10 pb-24">
        {/* Header Professionnel */}
        <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-600 text-white shadow-2xl backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Heure et Prochaine Prière */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg border border-white/20">
                <Clock className="w-7 h-7" />
                <div>
                  <p className="text-2xl font-bold tracking-wide">
                    {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="text-xs text-white/80">
                    {currentTime.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                </div>
              </div>

              {nextPrayer && (
                <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg border border-white/20">
                  <div className="bg-white/20 rounded-full p-2">
                    <PrayerIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70">Prochaine prière</p>
                    <p className="font-bold text-lg">{nextPrayer.name} - {nextPrayer.time}</p>
                    <p className="text-xs text-white/80">Dans {formatTimeRemaining(nextPrayer.remaining)}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <Link to={createPageUrl('Profile')}>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-4 py-3 hover:bg-white/25 transition-all shadow-lg border border-white/20">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <span className="font-medium">Profil</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Verset du Jour */}
        <Card className="mb-6 bg-white/95 backdrop-blur-md border-2 border-amber-200 shadow-2xl">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-2.5 shadow-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-none mb-3 shadow-sm">
                  Verset du jour
                </Badge>
                <p className="text-2xl font-arabic text-right mb-3 text-gray-800 leading-loose">
                  {dailyVerse.arabic}
                </p>
                <p className="text-gray-700 italic mb-2 text-sm">"{dailyVerse.french}"</p>
                <p className="text-xs text-amber-700 flex items-center gap-1 font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  {dailyVerse.source}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blocs Principaux - Taille réduite */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <Link to={createPageUrl('Quran')}>
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden relative border border-white/20 hover:border-emerald-400">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-800">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
                <div className="absolute bottom-0 right-0 text-[80px] text-white/10 leading-none">📖</div>
              </div>
              <CardContent className="p-3 relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-white">
                    <h3 className="font-bold text-base">Coran</h3>
                    <p className="text-sm font-arabic">القرآن</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl('Prayer')}>
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden relative border border-white/20 hover:border-purple-400">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-700 to-purple-800">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQyIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjIiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZDIpIi8+PC9zdmc+')] opacity-30"></div>
                <div className="absolute bottom-0 right-0 text-[80px] text-white/10 leading-none">🕌</div>
              </div>
              <CardContent className="p-3 relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 group-hover:scale-110 transition-transform">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-white">
                    <h3 className="font-bold text-base">Prière</h3>
                    <p className="text-sm font-arabic">الصلاة</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl('Tajweed')}>
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden relative border border-white/20 hover:border-blue-400">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-700 to-blue-800">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQzIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMCAwIEwgODAgMCBMIDgwIDgwIEwgMCA4MCBaIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4wOCIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkMykiLz48L3N2Zz4=')] opacity-20"></div>
                <div className="absolute bottom-0 right-0 text-[80px] text-white/10 leading-none">🎤</div>
              </div>
              <CardContent className="p-3 relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 group-hover:scale-110 transition-transform">
                    <Mic className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-white">
                    <h3 className="font-bold text-base">Réciter</h3>
                    <p className="text-sm font-arabic">التجويد</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl('Learn')}>
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden relative border border-white/20 hover:border-pink-400">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-rose-700 to-pink-800">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQ0IiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMzAgMCBMIDMwIDYwIE0gMCAzMCBMIDYwIDMwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4wNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkNCkiLz48L3N2Zz4=')] opacity-20"></div>
                <div className="absolute bottom-0 right-0 text-[80px] text-white/10 leading-none">🎓</div>
              </div>
              <CardContent className="p-3 relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-white">
                    <h3 className="font-bold text-base">Apprendre</h3>
                    <p className="text-sm font-arabic">العلم</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Petits Blocs - Ligne Compacte */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Link to={createPageUrl('Adhkar')}>
            <Card className="hover:shadow-lg transition-all border border-white/30 hover:border-rose-400 bg-gradient-to-br from-white/95 to-rose-50/95 backdrop-blur-sm">
              <CardContent className="p-3 flex flex-col items-center justify-center text-center gap-2">
                <div className="bg-gradient-to-br from-rose-400 to-pink-600 rounded-xl p-2.5 shadow-md">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Adhkar</h4>
                  <p className="text-xs text-gray-600">Invocations</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl('Dhikr')}>
            <Card className="hover:shadow-lg transition-all border border-white/30 hover:border-amber-400 bg-gradient-to-br from-white/95 to-amber-50/95 backdrop-blur-sm">
              <CardContent className="p-3 flex flex-col items-center justify-center text-center gap-2">
                <div className="bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl p-2.5 shadow-md">
                  <Hash className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Dhikr</h4>
                  <p className="text-xs text-gray-600">Compteur</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl('Names')}>
            <Card className="hover:shadow-lg transition-all border border-white/30 hover:border-violet-400 bg-gradient-to-br from-white/95 to-violet-50/95 backdrop-blur-sm">
              <CardContent className="p-3 flex flex-col items-center justify-center text-center gap-2">
                <div className="bg-gradient-to-br from-violet-400 to-purple-600 rounded-xl p-2.5 shadow-md">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">99 Noms</h4>
                  <p className="text-xs text-gray-600">D'Allah</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Grandes Figures de l'Islam - Carrousel de Cartes */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-2.5 shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">Grandes Figures de l'Islam</h2>
            </div>
            <Badge className="bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
              <Award className="w-3 h-3 mr-1" />
              Sources Authentiques
            </Badge>
          </div>

          {/* Carrousel de cartes carrées */}
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-4 px-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-white/10">
              {ISLAMIC_FIGURES.map((figure) => (
                <Card
                  key={figure.id}
                  className="flex-shrink-0 w-64 cursor-pointer hover:shadow-2xl transition-all duration-300 group border border-white/20 hover:border-amber-400 overflow-hidden"
                  onClick={() => setSelectedFigure(figure)}
                >
                  {/* Header avec gradient */}
                  <div className={`h-32 bg-gradient-to-br ${figure.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InN0YXJzMiIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJ3aGl0ZSIgb3BhY2l0eT0iMC4yIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3N0YXJzMikiLz48L3N2Zz4=')] opacity-40"></div>

                    {/* Badge catégorie */}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-white/90 backdrop-blur-sm text-gray-800 border-none text-xs">
                        {figure.category}
                      </Badge>
                    </div>

                    {/* Icône centrale */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {figure.category === 'Prophète' && <div className="text-6xl drop-shadow-lg">⭐</div>}
                      {figure.category === 'Compagnon' && <div className="text-6xl drop-shadow-lg">✨</div>}
                      {figure.category === 'Héros' && <div className="text-6xl drop-shadow-lg">🗡️</div>}
                      {figure.category === 'Savant' && <div className="text-6xl drop-shadow-lg">📚</div>}
                    </div>
                  </div>

                  {/* Contenu de la carte */}
                  <CardContent className="p-4 bg-white/95 backdrop-blur-sm">
                    <h3 className="font-bold text-gray-900 text-base mb-1">{figure.name}</h3>
                    <p className="text-lg font-arabic text-gray-700 mb-2">{figure.arabic}</p>
                    <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-none text-xs mb-2">
                      {figure.title}
                    </Badge>
                    <p className="text-xs text-gray-600 line-clamp-2">{figure.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Footer - Sources Authentiques */}
        <Card className="bg-white/95 backdrop-blur-md border-2 border-white/30 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-3 shadow-lg">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-xl mb-2 flex items-center gap-2">
                  Sources Vérifiées et Authentiques
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  <strong>Notre engagement :</strong> Toutes les informations présentes dans cette application proviennent
                  exclusivement de sources authentiques et vérifiées. Nous ne publions que la vérité selon les textes authentiques de l'Islam.
                </p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 px-3 py-1.5 rounded-full text-emerald-700 font-medium shadow-sm">
                    <BookOpen className="w-3.5 h-3.5" /> Le Saint Coran
                  </span>
                  <span className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 px-3 py-1.5 rounded-full text-emerald-700 font-medium shadow-sm">
                    <Award className="w-3.5 h-3.5" /> Sahih Bukhari & Muslim
                  </span>
                  <span className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 px-3 py-1.5 rounded-full text-emerald-700 font-medium shadow-sm">
                    <Users className="w-3.5 h-3.5" /> Savants reconnus
                  </span>
                  <span className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 px-3 py-1.5 rounded-full text-emerald-700 font-medium shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" /> Textes authentifiés
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>

      {/* Modal Histoire Complète */}
      {selectedFigure && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedFigure(null)}
        >
          <Card
            className="max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-40 bg-gradient-to-br ${selectedFigure.gradient} relative`}>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-6">
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-none mb-2">
                  {selectedFigure.category}
                </Badge>
                <h2 className="text-white text-3xl font-bold drop-shadow-lg">
                  {selectedFigure.name}
                </h2>
                <p className="text-white/90 text-3xl font-arabic mt-1">{selectedFigure.arabic}</p>
                <p className="text-white/90 text-lg mt-1">{selectedFigure.title}</p>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="mb-4">
                <Badge className="bg-emerald-100 text-emerald-700 border-none">
                  <Award className="w-3 h-3 mr-1" />
                  Source: {selectedFigure.source}
                </Badge>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                {selectedFigure.story}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => setSelectedFigure(null)}
                  className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  Fermer
                </button>
                <button
                  onClick={handleReadStory}
                  className={`flex items-center gap-2 ${isReading ? 'bg-gradient-to-r from-red-500 to-rose-600' : 'bg-gradient-to-r from-amber-500 to-orange-600'} text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all`}
                >
                  {isReading ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  {isReading ? 'Arrêter' : 'Écouter'}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
