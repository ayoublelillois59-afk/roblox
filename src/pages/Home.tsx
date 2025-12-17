import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen, Clock, Mic, GraduationCap, Heart, Hash, Star,
  Users, Sparkles, Award, ChevronRight, Volume2, Compass
} from 'lucide-react';
import { createPageUrl } from "@/utils";
import Logo from "@/components/Logo";

// Versets du jour
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

export default function HomePage() {
  const [dailyVerse, setDailyVerse] = useState(DAILY_VERSES[0]);

  useEffect(() => {
    // Changer le verset chaque jour
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setDailyVerse(DAILY_VERSES[dayOfYear % DAILY_VERSES.length]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d9488]/5 via-white to-[#0d9488]/10 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0d9488] to-[#0f766e] text-white">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <Logo size="md" showText={true} />
            <Link to={createPageUrl('Profile')}>
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 hover:bg-white/30 transition-colors">
                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">👤</span>
                </div>
                <span className="text-sm font-medium">Mon Profil</span>
              </div>
            </Link>
          </div>

          <h1 className="text-2xl font-bold mb-1">السلام عليكم</h1>
          <p className="text-white/90 text-sm">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
          <p className="text-white/80 text-sm mt-1">Votre compagnon pour approfondir votre foi</p>
        </div>
      </div>

      {/* Verset du Jour */}
      <div className="max-w-6xl mx-auto px-6 -mt-6">
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-amber-500 rounded-full p-2">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <Badge className="bg-amber-500 text-white border-none mb-2">Verset du jour</Badge>
                <p className="text-2xl font-arabic text-right mb-3 text-gray-800 leading-relaxed">
                  {dailyVerse.arabic}
                </p>
                <p className="text-gray-700 italic mb-2">"{dailyVerse.french}"</p>
                <p className="text-sm text-amber-700 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {dailyVerse.source}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blocs Principaux */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Coran */}
          <Link to={createPageUrl('Quran')}>
            <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:shadow-xl transition-all group cursor-pointer overflow-hidden h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Coran</h3>
                    <p className="text-3xl font-arabic">القرآن</p>
                  </div>
                  <div className="bg-white/20 rounded-full p-4 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-8 h-8" />
                  </div>
                </div>
                <div className="space-y-2 text-sm text-white/90">
                  <p className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4" /> Lire & écouter
                  </p>
                  <p className="flex items-center gap-2">
                    <Mic className="w-4 h-4" /> 5 récitateurs disponibles
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Prière */}
          <Link to={createPageUrl('Prayer')}>
            <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white hover:shadow-xl transition-all group cursor-pointer overflow-hidden h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Prière</h3>
                    <p className="text-3xl font-arabic">الصلاة</p>
                  </div>
                  <div className="bg-white/20 rounded-full p-4 group-hover:scale-110 transition-transform">
                    <Clock className="w-8 h-8" />
                  </div>
                </div>
                <div className="space-y-2 text-sm text-white/90">
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Horaires précis
                  </p>
                  <p className="flex items-center gap-2">
                    <Compass className="w-4 h-4" /> Direction Qibla
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Tajweed */}
          <Link to={createPageUrl('Tajweed')}>
            <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white hover:shadow-xl transition-all group cursor-pointer overflow-hidden h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Tajweed</h3>
                    <p className="text-3xl font-arabic">التجويد</p>
                  </div>
                  <div className="bg-white/20 rounded-full p-4 group-hover:scale-110 transition-transform">
                    <Mic className="w-8 h-8" />
                  </div>
                </div>
                <div className="space-y-2 text-sm text-white/90">
                  <p className="flex items-center gap-2">
                    <Award className="w-4 h-4" /> Correction IA
                  </p>
                  <p className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Traduction & Tafsir
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Apprendre */}
          <Link to={createPageUrl('Learn')}>
            <Card className="bg-gradient-to-br from-pink-500 to-rose-600 text-white hover:shadow-xl transition-all group cursor-pointer overflow-hidden h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Apprendre</h3>
                    <p className="text-3xl font-arabic">العلم</p>
                  </div>
                  <div className="bg-white/20 rounded-full p-4 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                </div>
                <div className="space-y-2 text-sm text-white/90">
                  <p className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> Programme Coran
                  </p>
                  <p className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" /> L'arabe & Tajweed
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Sections Recommandées */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sourate Al-Kahf */}
          <Link to={createPageUrl('Quran') + '?surah=18'}>
            <Card className="hover:shadow-lg transition-all border-2 border-emerald-100 cursor-pointer">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-emerald-100 rounded-2xl p-3">
                  <BookOpen className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">Sourate Al-Kahf</h3>
                  <p className="text-sm text-gray-500">Recommandée le vendredi</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </CardContent>
            </Card>
          </Link>

          {/* Adhkar du Soir */}
          <Link to={createPageUrl('Adhkar')}>
            <Card className="hover:shadow-lg transition-all border-2 border-pink-100 cursor-pointer">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-pink-100 rounded-2xl p-3">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">Adhkar du Soir</h3>
                  <p className="text-sm text-gray-500">Invocations authentiques</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Petits Blocs */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-3 gap-4">
          <Link to={createPageUrl('Adhkar')}>
            <Card className="text-center hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-rose-50 to-pink-50 border-rose-100">
              <CardContent className="p-4">
                <div className="bg-rose-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-rose-600" />
                </div>
                <h4 className="font-semibold text-gray-800 text-sm">Adhkar</h4>
                <p className="text-xs text-gray-500 mt-1">Invocations</p>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl('Dhikr')}>
            <Card className="text-center hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100">
              <CardContent className="p-4">
                <div className="bg-amber-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Hash className="w-6 h-6 text-amber-600" />
                </div>
                <h4 className="font-semibold text-gray-800 text-sm">Dhikr</h4>
                <p className="text-xs text-gray-500 mt-1">Compteur</p>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl('Names')}>
            <Card className="text-center hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-violet-50 to-purple-50 border-violet-100">
              <CardContent className="p-4">
                <div className="bg-violet-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-violet-600" />
                </div>
                <h4 className="font-semibold text-gray-800 text-sm">99 Noms</h4>
                <p className="text-xs text-gray-500 mt-1">D'Allah</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Grandes Figures de l'Islam */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-[#0d9488]" />
          <h2 className="text-xl font-bold text-gray-800">Grandes Figures de l'Islam</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { name: 'Prophètes', icon: '⭐', color: 'from-yellow-400 to-amber-500' },
            { name: 'Compagnons', icon: '👥', color: 'from-blue-400 to-indigo-500' },
            { name: 'Savants', icon: '👑', color: 'from-purple-400 to-pink-500' },
            { name: 'Histoires', icon: '🎵', color: 'from-green-400 to-emerald-500' },
            { name: 'Leçons', icon: '📚', color: 'from-red-400 to-rose-500' },
            { name: 'Biographies', icon: '📖', color: 'from-cyan-400 to-teal-500' },
            { name: 'Héros', icon: '⚔️', color: 'from-orange-400 to-red-500' }
          ].map((item) => (
            <Card key={item.name} className="hover:shadow-lg transition-all cursor-pointer">
              <CardContent className="p-3 text-center">
                <div className={`bg-gradient-to-br ${item.color} rounded-2xl w-12 h-12 flex items-center justify-center mx-auto mb-2 text-white text-xl`}>
                  {item.icon}
                </div>
                <p className="text-xs font-medium text-gray-700">{item.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer - Sources vérifiées */}
      <div className="max-w-6xl mx-auto px-6 mt-12 mb-6">
        <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-emerald-800">Sources Vérifiées et Authentiques</h3>
            </div>
            <p className="text-sm text-emerald-700 max-w-2xl mx-auto">
              Toutes les informations présentes dans cette application proviennent de sources authentiques et vérifiées :
              Le Saint Coran, Sahih Bukhari, Sahih Muslim, et les avis de savants reconnus.
              Nous nous engageons à ne diffuser que la vérité selon les textes authentiques de l'Islam.
            </p>
            <div className="flex items-center justify-center gap-6 mt-4 text-xs text-emerald-600">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" /> Coran
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-3 h-3" /> Hadith Sahih
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" /> Savants reconnus
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
