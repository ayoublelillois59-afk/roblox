import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Volume2, BookOpen } from 'lucide-react';
import { createPageUrl } from "@/utils";
import QuranPlayer from "@/components/QuranPlayer";
import QuranReader from "@/components/QuranReader";

export default function QuranPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSurah = parseInt(queryParams.get('surah') || '') || 1;
  const verseParam = parseInt(queryParams.get('verse') || '');
  const initialVerse = isNaN(verseParam) ? null : verseParam;
  const initialTab = queryParams.get('tab') || 'listen';

  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleFavorite = (surahNumber: number) => {
    setFavorites(prev =>
      prev.includes(surahNumber)
        ? prev.filter(n => n !== surahNumber)
        : [...prev, surahNumber]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d9488]/5 via-white to-[#0d9488]/5 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0d9488] to-[#0f766e] text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to={createPageUrl('Home')}>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold">القرآن الكريم</h1>
            <p className="text-sm opacity-90">Le Saint Coran</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-md">
            <TabsTrigger value="listen" className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              Écouter
            </TabsTrigger>
            <TabsTrigger value="read" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Lire
            </TabsTrigger>
          </TabsList>

          <TabsContent value="listen">
            <QuranPlayer favorites={favorites} onFavorite={handleFavorite} />
          </TabsContent>

          <TabsContent value="read">
            <QuranReader initialSurah={initialSurah} initialVerse={initialVerse} />
          </TabsContent>
        </Tabs>

        {activeTab === 'listen' && (
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border">
            <h3 className="font-semibold text-gray-800 mb-3">À propos des récitateurs</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Tous les récitateurs disponibles sont des Qaris reconnus mondialement pour leur
              maîtrise du Tajweed et leur belle voix. Les récitations proviennent de sources
              authentiques et vérifiées.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="bg-[#0d9488]/10 rounded-lg p-3 border border-[#0d9488]/20">
                <p className="font-medium text-[#0d9488]">Murattal</p>
                <p className="text-gray-600 text-xs">Récitation lente pour l'apprentissage</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <p className="font-medium text-blue-800">Mujawwad</p>
                <p className="text-blue-600 text-xs">Récitation mélodieuse</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
