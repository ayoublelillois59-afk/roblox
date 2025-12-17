import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen, Clock, Mic, GraduationCap, Heart, Hash, Star,
  Users, Sparkles, Award, ChevronRight, Volume2, Compass,
  Sun, Sunrise, Sunset, Moon, User
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
    story: "Muhammad ﷺ est né à La Mecque en l'an 570. Orphelin dès son plus jeune âge, il fut élevé par son grand-père puis par son oncle Abou Talib. Connu pour sa droiture et son honnêteté, il fut surnommé 'Al-Amin' (le digne de confiance). À l'âge de 40 ans, il reçut la première révélation dans la grotte de Hira. Il passa 23 années à transmettre le message d'Allah, enseignant l'unicité divine, la justice, la miséricorde et la compassion."
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
    story: "Abu Bakr fut le premier homme libre à accepter l'Islam. D'une fidélité inébranlable, il accompagna le Prophète ﷺ lors de l'Hégire. Lors de l'incident d'Al-Isra wa Al-Mi'raj, quand certains doutaient, Abu Bakr dit : 'Si Muhammad l'a dit, c'est vrai', lui valant le titre d'As-Siddiq (le Véridique). Il devint le premier calife après la mort du Prophète ﷺ et unifia la communauté musulmane."
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
    story: "Omar était connu pour sa force et son caractère ferme avant l'Islam. Sa conversion transforma l'Islam, permettant aux musulmans de prier publiquement à la Ka'ba. Comme calife, il établit un système judiciaire équitable, créa le calendrier hégirien, et étendit l'État islamique. Il dormait sous un arbre avec une simple natte comme lit. Umar dit : 'Si un chien mourait de faim sur les rives de l'Euphrate, Omar en serait responsable devant Allah.'"
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
    story: "Bilal était un esclave africain qui embrassa l'Islam à ses débuts. Son maître le tortura horriblement sous le soleil brûlant avec une pierre énorme sur sa poitrine. Il ne disait qu''Ahad, Ahad' (Un, Un - affirmant l'unicité d'Allah). Abu Bakr le racheta et le libéra. Le Prophète ﷺ le choisit comme premier muezzin. Sa voix magnifique appelait les croyants à la prière. Après la mort du Prophète ﷺ, il ne put plus faire l'adhan tant son chagrin était grand."
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Header Professionnel */}
      <div className="bg-gradient-to-r from-[#0d9488] via-teal-600 to-emerald-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Heure et Prochaine Prière */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3">
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
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3">
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
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3 hover:bg-white/20 transition-all">
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
        <Card className="mb-6 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 border-amber-200 shadow-md">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-2.5 shadow-md">
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

        {/* Blocs Principaux - Compacts et Professionnels */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <Link to={createPageUrl('Quran')}>
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-emerald-300 overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 h-full">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 rounded-xl p-2.5 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-white">
                    <h3 className="font-bold text-lg">Coran</h3>
                    <p className="text-xl font-arabic">القرآن</p>
                  </div>
                </div>
                <div className="text-xs text-white/90 space-y-1 mt-3">
                  <p className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5" /> Lire & écouter
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5" /> 5 récitateurs
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl('Prayer')}>
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-300 overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-600 h-full">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 rounded-xl p-2.5 group-hover:scale-110 transition-transform">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-white">
                    <h3 className="font-bold text-lg">Prière</h3>
                    <p className="text-xl font-arabic">الصلاة</p>
                  </div>
                </div>
                <div className="text-xs text-white/90 space-y-1 mt-3">
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Horaires précis
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" /> Direction Qibla
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl('Tajweed')}>
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-300 overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-600 h-full">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 rounded-xl p-2.5 group-hover:scale-110 transition-transform">
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-white">
                    <h3 className="font-bold text-lg">Tajweed</h3>
                    <p className="text-xl font-arabic">التجويد</p>
                  </div>
                </div>
                <div className="text-xs text-white/90 space-y-1 mt-3">
                  <p className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" /> Correction IA
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Tafsir complet
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl('Learn')}>
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-pink-300 overflow-hidden bg-gradient-to-br from-pink-500 to-rose-600 h-full">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 rounded-xl p-2.5 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-white">
                    <h3 className="font-bold text-lg">Apprendre</h3>
                    <p className="text-xl font-arabic">العلم</p>
                  </div>
                </div>
                <div className="text-xs text-white/90 space-y-1 mt-3">
                  <p className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Coran & Arabe
                  </p>
                  <p className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" /> Tajweed
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Grandes Figures de l'Islam - Carrousel Horizontal */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg p-2">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Grandes Figures de l'Islam</h2>
            </div>
            <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-none">
              Sources Authentiques
            </Badge>
          </div>

          {/* Carrousel */}
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-gray-200">
              {ISLAMIC_FIGURES.map((figure) => (
                <Card
                  key={figure.id}
                  className="flex-shrink-0 w-72 cursor-pointer hover:shadow-2xl transition-all duration-300 group border-2 hover:border-teal-400"
                  onClick={() => setSelectedFigure(figure)}
                >
                  <div className={`h-32 bg-gradient-to-br ${figure.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all"></div>
                    <div className="absolute bottom-3 left-4 right-4">
                      <p className="text-white text-sm font-medium mb-1">{figure.category}</p>
                      <h3 className="text-white font-bold text-lg drop-shadow-lg">{figure.name}</h3>
                      <p className="text-white/90 text-2xl font-arabic mt-1">{figure.arabic}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Badge className="mb-2 bg-teal-100 text-teal-700 border-none text-xs">
                      {figure.title}
                    </Badge>
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {figure.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs text-teal-600 font-medium">Lire l'histoire complète</p>
                      <ChevronRight className="w-4 h-4 text-teal-600" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Petits Blocs - Ligne Compacte */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Link to={createPageUrl('Adhkar')}>
            <Card className="hover:shadow-lg transition-all border-2 hover:border-rose-300 bg-gradient-to-br from-white to-rose-50">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="bg-gradient-to-br from-rose-400 to-pink-600 rounded-xl p-3 shadow-md">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Adhkar</h4>
                  <p className="text-xs text-gray-500">Invocations</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl('Dhikr')}>
            <Card className="hover:shadow-lg transition-all border-2 hover:border-amber-300 bg-gradient-to-br from-white to-amber-50">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl p-3 shadow-md">
                  <Hash className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Dhikr</h4>
                  <p className="text-xs text-gray-500">Compteur</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl('Names')}>
            <Card className="hover:shadow-lg transition-all border-2 hover:border-violet-300 bg-gradient-to-br from-white to-violet-50">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="bg-gradient-to-br from-violet-400 to-purple-600 rounded-xl p-3 shadow-md">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">99 Noms</h4>
                  <p className="text-xs text-gray-500">D'Allah</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Footer - Sources Authentiques */}
        <Card className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-200 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-3 shadow-md">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-emerald-900 text-xl mb-2 flex items-center gap-2">
                  Sources Vérifiées et Authentiques
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                </h3>
                <p className="text-sm text-emerald-800 leading-relaxed mb-3">
                  <strong>Notre engagement :</strong> Toutes les informations présentes dans cette application proviennent
                  exclusivement de sources authentiques et vérifiées. Nous ne publions que la vérité selon les textes authentiques de l'Islam.
                </p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-full text-emerald-700 font-medium">
                    <BookOpen className="w-3.5 h-3.5" /> Le Saint Coran
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-full text-emerald-700 font-medium">
                    <Award className="w-3.5 h-3.5" /> Sahih Bukhari & Muslim
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-full text-emerald-700 font-medium">
                    <Users className="w-3.5 h-3.5" /> Savants reconnus
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-full text-emerald-700 font-medium">
                    <Sparkles className="w-3.5 h-3.5" /> Textes authentifiés
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
                <button className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all">
                  <Volume2 className="w-4 h-4" />
                  Écouter
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
