import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen, GraduationCap, Mic, CheckCircle2,
  Lock, Play, Trophy, Target, Clock, Crown, ArrowRight
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { createPageUrl } from "@/utils";
import PremiumBadge from "@/components/PremiumBadge";

const QURAN_PROGRAM = {
  title: "Mémorisation du Coran",
  titleAr: "حفظ القرآن",
  description: "Programme structuré pour mémoriser le Coran sourate par sourate",
  levels: [
    {
      id: 1,
      name: "Les Petites Sourates",
      description: "Juz' Amma - De An-Nâs à An-Nabâ'",
      surahs: [
        { number: 114, name: "An-Nas", nameAr: "الناس", verses: 6, difficulty: "facile" },
        { number: 113, name: "Al-Falaq", nameAr: "الفلق", verses: 5, difficulty: "facile" },
        { number: 112, name: "Al-Ikhlas", nameAr: "الإخلاص", verses: 4, difficulty: "facile" },
        { number: 111, name: "Al-Masad", nameAr: "المسد", verses: 5, difficulty: "facile" },
        { number: 110, name: "An-Nasr", nameAr: "النصر", verses: 3, difficulty: "facile" },
        { number: 109, name: "Al-Kafirun", nameAr: "الكافرون", verses: 6, difficulty: "facile" },
        { number: 108, name: "Al-Kawthar", nameAr: "الكوثر", verses: 3, difficulty: "facile" },
        { number: 107, name: "Al-Ma'un", nameAr: "الماعون", verses: 7, difficulty: "facile" },
      ],
      unlocked: true
    },
    {
      id: 2,
      name: "Sourates Intermédiaires",
      description: "Sourates courtes à moyennes",
      surahs: [
        { number: 67, name: "Al-Mulk", nameAr: "الملك", verses: 30, difficulty: "moyen" },
        { number: 36, name: "Ya-Sin", nameAr: "يس", verses: 83, difficulty: "moyen" },
        { number: 55, name: "Ar-Rahman", nameAr: "الرحمن", verses: 78, difficulty: "moyen" },
        { number: 56, name: "Al-Waqi'a", nameAr: "الواقعة", verses: 96, difficulty: "moyen" },
      ],
      unlocked: false
    },
    {
      id: 3,
      name: "Les Grandes Sourates",
      description: "Al-Baqara, Ali 'Imran et plus",
      surahs: [
        { number: 18, name: "Al-Kahf", nameAr: "الكهف", verses: 110, difficulty: "difficile" },
        { number: 2, name: "Al-Baqara", nameAr: "البقرة", verses: 286, difficulty: "difficile" },
        { number: 3, name: "Ali 'Imran", nameAr: "آل عمران", verses: 200, difficulty: "difficile" },
      ],
      unlocked: false
    }
  ]
};

const ARABIC_PROGRAM = {
  title: "Apprendre l'Arabe",
  titleAr: "تعلم العربية",
  description: "Apprenez à lire et comprendre l'arabe coranique",
  levels: [
    {
      id: 1,
      name: "L'Alphabet Arabe",
      description: "Les 28 lettres et leurs formes",
      lessons: [
        { id: 1, title: "Lettres ا ب ت ث", duration: "15 min", completed: false },
        { id: 2, title: "Lettres ج ح خ", duration: "15 min", completed: false },
        { id: 3, title: "Lettres د ذ ر ز", duration: "15 min", completed: false },
        { id: 4, title: "Lettres س ش ص ض", duration: "15 min", completed: false },
        { id: 5, title: "Lettres ط ظ ع غ", duration: "15 min", completed: false },
        { id: 6, title: "Lettres ف ق ك ل", duration: "15 min", completed: false },
        { id: 7, title: "Lettres م ن ه و ي", duration: "15 min", completed: false },
      ],
      unlocked: true
    },
    {
      id: 2,
      name: "Les Voyelles (Harakât)",
      description: "Fatha, Kasra, Damma et Sukun",
      lessons: [
        { id: 1, title: "Al-Fatha (الفتحة)", duration: "20 min", completed: false },
        { id: 2, title: "Al-Kasra (الكسرة)", duration: "20 min", completed: false },
        { id: 3, title: "Ad-Damma (الضمة)", duration: "20 min", completed: false },
        { id: 4, title: "As-Sukun (السكون)", duration: "20 min", completed: false },
        { id: 5, title: "Tanwin (التنوين)", duration: "25 min", completed: false },
      ],
      unlocked: false
    },
    {
      id: 3,
      name: "Lecture Basique",
      description: "Commencer à lire des mots simples",
      lessons: [
        { id: 1, title: "Mots de 2 lettres", duration: "20 min", completed: false },
        { id: 2, title: "Mots de 3 lettres", duration: "25 min", completed: false },
        { id: 3, title: "Phrases simples", duration: "30 min", completed: false },
      ],
      unlocked: false
    }
  ]
};

const TAJWEED_PROGRAM = {
  title: "Règles de Tajweed",
  titleAr: "أحكام التجويد",
  description: "Apprenez à réciter le Coran avec les règles de prononciation correctes",
  levels: [
    {
      id: 1,
      name: "Introduction au Tajweed",
      description: "Les bases essentielles",
      lessons: [
        { id: 1, title: "Qu'est-ce que le Tajweed?", duration: "10 min", completed: false },
        { id: 2, title: "Importance du Tajweed", duration: "15 min", completed: false },
        { id: 3, title: "Les points d'articulation (Makharij)", duration: "25 min", completed: false },
      ],
      unlocked: true
    },
    {
      id: 2,
      name: "Les Règles du Noun Sakin",
      description: "Izhar, Idgham, Iqlab, Ikhfa",
      lessons: [
        { id: 1, title: "Al-Izhar (الإظهار)", duration: "20 min", completed: false },
        { id: 2, title: "Al-Idgham (الإدغام)", duration: "25 min", completed: false },
        { id: 3, title: "Al-Iqlab (الإقلاب)", duration: "15 min", completed: false },
        { id: 4, title: "Al-Ikhfa (الإخفاء)", duration: "25 min", completed: false },
      ],
      unlocked: false
    },
    {
      id: 3,
      name: "Les Règles du Meem Sakin",
      description: "Idgham Shafawi, Ikhfa Shafawi, Izhar Shafawi",
      lessons: [
        { id: 1, title: "Idgham Shafawi", duration: "15 min", completed: false },
        { id: 2, title: "Ikhfa Shafawi", duration: "15 min", completed: false },
        { id: 3, title: "Izhar Shafawi", duration: "15 min", completed: false },
      ],
      unlocked: false
    },
    {
      id: 4,
      name: "Al-Madd (Prolongation)",
      description: "Les différents types de prolongation",
      lessons: [
        { id: 1, title: "Madd Tabii'i (naturel)", duration: "20 min", completed: false },
        { id: 2, title: "Madd Muttasil", duration: "20 min", completed: false },
        { id: 3, title: "Madd Munfasil", duration: "20 min", completed: false },
        { id: 4, title: "Madd Lazim", duration: "25 min", completed: false },
      ],
      unlocked: false
    }
  ]
};

export default function LearningPrograms() {
  const [activeProgram, setActiveProgram] = useState<"quran" | "arabic" | "tajweed">("quran");
  const [expandedLevel, setExpandedLevel] = useState<number | null>(1);

  const programs = {
    quran: QURAN_PROGRAM,
    arabic: ARABIC_PROGRAM,
    tajweed: TAJWEED_PROGRAM
  };

  const currentProgram = programs[activeProgram];

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'facile': return 'bg-green-100 text-green-700';
      case 'moyen': return 'bg-yellow-100 text-yellow-700';
      case 'difficile': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Program Selector */}
      <div className="grid grid-cols-3 gap-4">
        <Card
          className={cn(
            "p-4 cursor-pointer transition-all hover:shadow-lg",
            activeProgram === "quran" && "ring-2 ring-emerald-500 bg-emerald-50"
          )}
          onClick={() => setActiveProgram("quran")}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-sm">Mémorisation</h3>
            <p className="text-xs text-gray-500">Coran</p>
          </div>
        </Card>

        <Card
          className={cn(
            "p-4 cursor-pointer transition-all hover:shadow-lg",
            activeProgram === "arabic" && "ring-2 ring-blue-500 bg-blue-50"
          )}
          onClick={() => setActiveProgram("arabic")}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <GraduationCap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-sm">Arabe</h3>
            <p className="text-xs text-gray-500">Lecture</p>
          </div>
        </Card>

        <Card
          className={cn(
            "p-4 cursor-pointer transition-all hover:shadow-lg",
            activeProgram === "tajweed" && "ring-2 ring-purple-500 bg-purple-50"
          )}
          onClick={() => setActiveProgram("tajweed")}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Mic className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-sm">Tajweed</h3>
            <p className="text-xs text-gray-500">Récitation</p>
          </div>
        </Card>
      </div>

      {/* Program Header */}
      <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm mb-1">{currentProgram.titleAr}</p>
              <CardTitle className="text-2xl">{currentProgram.title}</CardTitle>
              <p className="text-emerald-100 mt-2">{currentProgram.description}</p>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8" />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Levels */}
      <div className="space-y-4">
        {currentProgram.levels.map((level) => (
          <Card
            key={level.id}
            className={cn(
              "overflow-hidden transition-all",
              !level.unlocked && "opacity-60"
            )}
          >
            <div
              className="p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setExpandedLevel(expandedLevel === level.id ? null : level.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    level.unlocked ? "bg-emerald-100" : "bg-gray-100"
                  )}>
                    {level.unlocked ? (
                      <Target className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <Lock className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{level.name}</h3>
                    <p className="text-sm text-gray-500">{level.description}</p>
                  </div>
                </div>
                <Badge variant="outline">
                  Niveau {level.id}
                </Badge>
              </div>
            </div>

            {expandedLevel === level.id && level.unlocked && (
              <CardContent className="border-t bg-gray-50">
                <div className="grid gap-2 pt-4">
                  {activeProgram === "quran" ? (
                    // Quran Surahs
                    'surahs' in level && level.surahs?.map((surah: any) => (
                      <div
                        key={surah.number}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                            <span className="text-emerald-700 font-semibold">{surah.number}</span>
                          </div>
                          <div>
                            <p className="font-medium">{surah.name}</p>
                            <p className="text-sm text-gray-500">{surah.nameAr} • {surah.verses} versets</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getDifficultyColor(surah.difficulty)}>
                            {surah.difficulty}
                          </Badge>
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            <Play className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Arabic/Tajweed Lessons
                    'lessons' in level && level.lessons?.map((lesson: any) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            lesson.completed ? "bg-emerald-100" : "bg-gray-100"
                          )}>
                            {lesson.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <span className="text-gray-600 font-semibold">{lesson.id}</span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{lesson.title}</p>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {lesson.duration}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={lesson.completed ? "outline" : "default"}
                          className={!lesson.completed ? "bg-emerald-600 hover:bg-emerald-700" : undefined}
                        >
                          {lesson.completed ? "Revoir" : "Commencer"}
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Premium Programs */}
      <Link to={createPageUrl('Premium')}>
        <Card className="bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 border-2 border-amber-300 hover:shadow-xl transition-all cursor-pointer group">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <PremiumBadge size="md" />
                  <Badge className="bg-white/90 text-amber-700">Nouveau</Badge>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Programmes Complets Premium
                </h3>
                <p className="text-white/90 mb-4">
                  • Apprendre à lire l'arabe en 3 mois<br/>
                  • Parler l'arabe couramment en 6 mois<br/>
                  • Enseignants qualifiés • Sources authentiques • Suivi personnalisé
                </p>
                <div className="flex items-center gap-2 text-white font-semibold">
                  <span>Découvrir les programmes</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
              <Crown className="w-16 h-16 text-white/80" />
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* Coming Soon Features */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Mic className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-800 mb-1">
                🎤 Correction de récitation (Bientôt)
              </h3>
              <p className="text-sm text-amber-700">
                Enregistrez votre récitation et recevez des corrections personnalisées
                basées sur les règles de Tajweed. Cette fonctionnalité sera bientôt disponible
                avec l'aide d'enseignants qualifiés.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
