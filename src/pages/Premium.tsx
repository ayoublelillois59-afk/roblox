import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Crown, BookOpen, MessageCircle,
  CheckCircle2, Star, Award, Target, Clock, Users, ArrowRight
} from 'lucide-react';
import { createPageUrl } from "@/utils";
import { cn } from "@/lib/utils";
import PremiumBadge from "@/components/PremiumBadge";

const ARABIC_READING_PROGRAM = {
  title: "Programme Complet : Lire l'Arabe en 3 Mois",
  duration: "12 semaines • 3-4h/semaine",
  modules: [
    {
      week: "Semaines 1-2",
      title: "L'Alphabet et les Formes des Lettres",
      lessons: [
        "Les 28 lettres de l'alphabet arabe",
        "Formes isolées, initiales, médianes et finales",
        "Reconnaissance visuelle et écriture",
        "Exercices de tracé guidés"
      ]
    },
    {
      week: "Semaines 3-4",
      title: "Les Voyelles Courtes (Harakât)",
      lessons: [
        "Fatha, Kasra, Damma",
        "Sukun et Shadda",
        "Lecture de syllabes simples",
        "Exercices audio avec correction"
      ]
    },
    {
      week: "Semaines 5-6",
      title: "Les Voyelles Longues et Tanwin",
      lessons: [
        "Madd avec Alif, Waw, Ya",
        "Tanwin (Fathatân, Kasratân, Dammatân)",
        "Lecture de mots courts",
        "Dictées audio"
      ]
    },
    {
      week: "Semaines 7-8",
      title: "Lettres Lunaires et Solaires",
      lessons: [
        "Al-Qamariyya et Al-Shamsiyya",
        "Règles de l'article 'Al'",
        "Lecture de phrases simples",
        "Textes coraniques basiques"
      ]
    },
    {
      week: "Semaines 9-10",
      title: "Hamza et Lettres Spéciales",
      lessons: [
        "Les différentes formes de Hamza",
        "Règles de Ta Marbuta",
        "Lecture fluide de paragraphes",
        "Introduction au Tajweed"
      ]
    },
    {
      week: "Semaines 11-12",
      title: "Perfectionnement et Lecture Coranique",
      lessons: [
        "Lecture des petites sourates (Juz Amma)",
        "Amélioration de la fluidité",
        "Exercices de lecture à voix haute",
        "Certification de niveau"
      ]
    }
  ],
  includes: [
    "60+ leçons vidéo HD avec professeur qualifié",
    "Exercices interactifs avec correction automatique",
    "Cahier d'écriture PDF téléchargeable",
    "Sessions de révision hebdomadaires",
    "Support par message privé",
    "Accès à vie au contenu",
    "Certificat de completion"
  ],
  sources: [
    "Méthodologie approuvée par l'Institut Al-Azhar",
    "Programme basé sur 'Al-Qa'ida Al-Noorania'",
    "Validé par des enseignants arabophones natifs"
  ]
};

const ARABIC_SPEAKING_PROGRAM = {
  title: "Programme Complet : Parler l'Arabe en 6 Mois",
  duration: "24 semaines • 5-6h/semaine",
  modules: [
    {
      week: "Mois 1",
      title: "Fondations et Prononciation",
      lessons: [
        "Alphabet et phonétique correcte",
        "Phrases de base quotidiennes",
        "Salutations et présentations",
        "Vocabulaire essentiel (200 mots)"
      ]
    },
    {
      week: "Mois 2",
      title: "Grammaire de Base et Conjugaison",
      lessons: [
        "Structure des phrases nominales",
        "Verbes au présent (Mudari')",
        "Verbes au passé (Madi)",
        "Pronoms et possessifs"
      ]
    },
    {
      week: "Mois 3",
      title: "Conversations Pratiques",
      lessons: [
        "À la mosquée : vocabulaire religieux",
        "Au marché et restaurant",
        "Directions et transport",
        "Famille et relations"
      ]
    },
    {
      week: "Mois 4",
      title: "Grammaire Intermédiaire",
      lessons: [
        "Verbes à l'impératif",
        "Négation et interrogation",
        "Adjectifs et descriptions",
        "Nombres et dates"
      ]
    },
    {
      week: "Mois 5",
      title: "Compréhension du Coran",
      lessons: [
        "Vocabulaire coranique fréquent",
        "Structure des versets",
        "Comprendre les traductions",
        "Étude de sourates courtes"
      ]
    },
    {
      week: "Mois 6",
      title: "Fluidité et Perfectionnement",
      lessons: [
        "Conversations avancées",
        "Débats et arguments",
        "Arabe classique vs dialectal",
        "Examen final oral"
      ]
    }
  ],
  includes: [
    "120+ leçons vidéo avec exercices oraux",
    "Sessions de conversation en direct (2x/semaine)",
    "Application mobile avec flashcards",
    "Groupe privé d'apprentissage",
    "Correction personnalisée de vos enregistrements",
    "Bibliothèque de 1000+ phrases audio",
    "Support prioritaire 7j/7",
    "Certificat CECRL niveau B1"
  ],
  sources: [
    "Programme conforme au CECRL",
    "Vocabulaire du 'Madinah Arabic Course'",
    "Grammaire de 'Al-Ajrumiyyah'",
    "Enseignants diplômés d'universités arabes"
  ]
};

export default function PremiumPage() {
  const [expandedProgram, setExpandedProgram] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d9488]/5 via-white to-[#0d9488]/5 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to={createPageUrl('Learn')}>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-6 h-6" />
              <h1 className="text-2xl font-bold">Programmes Premium</h1>
            </div>
            <p className="text-sm opacity-90">Formation complète et authentique</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 -mt-8">
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 shadow-xl">
          <CardContent className="p-8 text-center">
            <Crown className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Maîtrisez l'Arabe avec des Programmes Professionnels
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Programmes élaborés par des enseignants qualifiés, avec sources authentiques
              et méthodologie éprouvée. Apprenez à votre rythme avec un suivi personnalisé.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Sources vérifiées</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Certificats inclus</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Support 7j/7</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Programs Grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Choisissez votre programme
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Reading Program Card */}
          <Card className="overflow-hidden border-2 border-[#0d9488]/20 hover:shadow-2xl transition-all group">
            <CardHeader className="bg-gradient-to-br from-[#0d9488] to-[#0f766e] text-white p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <PremiumBadge size="md" className="mb-3" />
                  <CardTitle className="text-2xl mb-2">{ARABIC_READING_PROGRAM.title}</CardTitle>
                  <div className="flex items-center gap-3 text-sm opacity-90 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {ARABIC_READING_PROGRAM.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      Débutant → Lecteur
                    </span>
                  </div>
                </div>
                <BookOpen className="w-16 h-16 opacity-80 group-hover:scale-110 transition-transform" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1">97€</p>
                  <p className="text-sm opacity-90">Accès à vie</p>
                </div>
                <Button
                  className="bg-white text-[#0d9488] hover:bg-gray-100"
                  onClick={() => setExpandedProgram(expandedProgram === 'reading' ? null : 'reading')}
                >
                  {expandedProgram === 'reading' ? 'Masquer' : 'Voir le programme'}
                  <ArrowRight className={cn(
                    "w-4 h-4 ml-2 transition-transform",
                    expandedProgram === 'reading' && 'rotate-90'
                  )} />
                </Button>
              </div>
            </CardHeader>

            {expandedProgram === 'reading' && (
              <CardContent className="p-6 bg-gradient-to-b from-[#0d9488]/5 to-white">
                {/* Modules */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-lg text-gray-800">Programme détaillé</h3>
                  {ARABIC_READING_PROGRAM.modules.map((module, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-8 h-8 bg-[#0d9488] text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <Badge variant="outline" className="mb-1 text-xs">{module.week}</Badge>
                          <h4 className="font-semibold text-gray-800">{module.title}</h4>
                        </div>
                      </div>
                      <ul className="ml-11 space-y-1">
                        {module.lessons.map((lesson, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#0d9488] flex-shrink-0 mt-0.5" />
                            <span>{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Includes */}
                <div className="bg-emerald-50 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-emerald-800 mb-3">✨ Inclus dans le programme</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {ARABIC_READING_PROGRAM.includes.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-emerald-700">
                        <Star className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sources */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-blue-800 mb-2">📚 Sources authentiques</h4>
                  {ARABIC_READING_PROGRAM.sources.map((source, i) => (
                    <p key={i} className="text-sm text-blue-700">• {source}</p>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-4">
                  <Button className="flex-1 bg-[#0d9488] hover:bg-[#0f766e] h-12 text-lg">
                    <Crown className="w-5 h-5 mr-2" />
                    S'inscrire maintenant
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Speaking Program Card */}
          <Card className="overflow-hidden border-2 border-indigo-200 hover:shadow-2xl transition-all group">
            <CardHeader className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <PremiumBadge size="md" />
                    <Badge className="bg-white/20 text-white border-white/30 text-xs">
                      ⭐ Populaire
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl mb-2">{ARABIC_SPEAKING_PROGRAM.title}</CardTitle>
                  <div className="flex items-center gap-3 text-sm opacity-90 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {ARABIC_SPEAKING_PROGRAM.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      Débutant → Conversationnel
                    </span>
                  </div>
                </div>
                <MessageCircle className="w-16 h-16 opacity-80 group-hover:scale-110 transition-transform" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1">197€</p>
                  <p className="text-sm opacity-90">Accès à vie + Live sessions</p>
                </div>
                <Button
                  className="bg-white text-indigo-600 hover:bg-gray-100"
                  onClick={() => setExpandedProgram(expandedProgram === 'speaking' ? null : 'speaking')}
                >
                  {expandedProgram === 'speaking' ? 'Masquer' : 'Voir le programme'}
                  <ArrowRight className={cn(
                    "w-4 h-4 ml-2 transition-transform",
                    expandedProgram === 'speaking' && 'rotate-90'
                  )} />
                </Button>
              </div>
            </CardHeader>

            {expandedProgram === 'speaking' && (
              <CardContent className="p-6 bg-gradient-to-b from-indigo-50 to-white">
                {/* Modules */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-lg text-gray-800">Programme détaillé</h3>
                  {ARABIC_SPEAKING_PROGRAM.modules.map((module, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <Badge variant="outline" className="mb-1 text-xs">{module.week}</Badge>
                          <h4 className="font-semibold text-gray-800">{module.title}</h4>
                        </div>
                      </div>
                      <ul className="ml-11 space-y-1">
                        {module.lessons.map((lesson, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                            <span>{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Includes */}
                <div className="bg-purple-50 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-purple-800 mb-3">✨ Inclus dans le programme</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {ARABIC_SPEAKING_PROGRAM.includes.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-purple-700">
                        <Star className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sources */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-blue-800 mb-2">📚 Sources authentiques</h4>
                  {ARABIC_SPEAKING_PROGRAM.sources.map((source, i) => (
                    <p key={i} className="text-sm text-blue-700">• {source}</p>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-4">
                  <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 h-12 text-lg">
                    <Crown className="w-5 h-5 mr-2" />
                    S'inscrire maintenant
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Bundle Offer */}
        <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white border-4 border-amber-300">
          <CardContent className="p-8 text-center">
            <Badge className="bg-white text-orange-600 mb-4 text-sm px-4 py-1">
              🎁 OFFRE GROUPÉE -30%
            </Badge>
            <h3 className="text-3xl font-bold mb-3">Pack Complet : Lire + Parler</h3>
            <p className="text-lg mb-2 opacity-90">Les deux programmes ensemble</p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-2xl line-through opacity-70">294€</span>
              <span className="text-5xl font-bold">197€</span>
            </div>
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 h-14 px-8 text-lg">
              <Crown className="w-6 h-6 mr-2" />
              Économiser 97€ maintenant
            </Button>
            <p className="text-sm mt-4 opacity-80">
              ⏰ Offre limitée • Accès à vie • Garantie satisfait ou remboursé 30 jours
            </p>
          </CardContent>
        </Card>

        {/* Trust Section */}
        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Pourquoi choisir nos programmes ?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0d9488]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-[#0d9488]" />
                </div>
                <h4 className="font-semibold mb-2">Enseignants Qualifiés</h4>
                <p className="text-sm text-gray-600">
                  Diplômés d'universités islamiques reconnues (Al-Azhar, Médine)
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0d9488]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8 text-[#0d9488]" />
                </div>
                <h4 className="font-semibold mb-2">100% Authentique</h4>
                <p className="text-sm text-gray-600">
                  Toutes les sources sont vérifiées et approuvées par des savants
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0d9488]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-[#0d9488]" />
                </div>
                <h4 className="font-semibold mb-2">Communauté Active</h4>
                <p className="text-sm text-gray-600">
                  Rejoignez des milliers d'étudiants motivés et soutenez-vous mutuellement
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
