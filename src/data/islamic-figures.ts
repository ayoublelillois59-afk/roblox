/**
 * Grandes figures de l'Islam — récits historiques authentiques avec sources.
 * Données extraites de l'ancien écran d'accueil.
 */

export interface IslamicFigure {
  id: number;
  name: string;
  arabic: string;
  title: string;
  gradient: string;
  category: string;
  description: string;
  source: string;
  story: string;
}

// Grandes figures de l'Islam - Personnages historiques authentiques
export const ISLAMIC_FIGURES: IslamicFigure[] = [
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
