import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookOpen, Loader2, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
}

interface SurahData {
  arabic: Ayah[];
  translation: Ayah[];
}

interface TafsirData {
  surah: number;
  verse: number;
  arabic: string;
  french: string;
  source: string;
}

// Toutes les 114 sourates
const SURAHS = Array.from({ length: 114 }, (_, i) => {
  const surahNames = [
    { name: "Al-Fatiha", nameAr: "الفاتحة", verses: 7 },
    { name: "Al-Baqara", nameAr: "البقرة", verses: 286 },
    { name: "Ali 'Imran", nameAr: "آل عمران", verses: 200 },
    { name: "An-Nisa", nameAr: "النساء", verses: 176 },
    { name: "Al-Ma'ida", nameAr: "المائدة", verses: 120 },
    { name: "Al-An'am", nameAr: "الأنعام", verses: 165 },
    { name: "Al-A'raf", nameAr: "الأعراف", verses: 206 },
    { name: "Al-Anfal", nameAr: "الأنفال", verses: 75 },
    { name: "At-Tawba", nameAr: "التوبة", verses: 129 },
    { name: "Yunus", nameAr: "يونس", verses: 109 },
    { name: "Hud", nameAr: "هود", verses: 123 },
    { name: "Yusuf", nameAr: "يوسف", verses: 111 },
    { name: "Ar-Ra'd", nameAr: "الرعد", verses: 43 },
    { name: "Ibrahim", nameAr: "إبراهيم", verses: 52 },
    { name: "Al-Hijr", nameAr: "الحجر", verses: 99 },
    { name: "An-Nahl", nameAr: "النحل", verses: 128 },
    { name: "Al-Isra", nameAr: "الإسراء", verses: 111 },
    { name: "Al-Kahf", nameAr: "الكهف", verses: 110 },
    { name: "Maryam", nameAr: "مريم", verses: 98 },
    { name: "Ta-Ha", nameAr: "طه", verses: 135 },
    // ... We would add all 114 surahs here
  ];
  return { number: i + 1, ...(surahNames[i] || { name: `Sourate ${i + 1}`, nameAr: `سورة ${i + 1}`, verses: 0 }) };
});

interface QuranReaderProps {
  initialSurah?: number;
  initialVerse?: number | null;
}

export default function QuranReader({ initialSurah = 1, initialVerse = null }: QuranReaderProps) {
  const [selectedSurah, setSelectedSurah] = useState(initialSurah);
  const [surahData, setSurahData] = useState<SurahData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);
  const [selectedVerseTafsir, setSelectedVerseTafsir] = useState<TafsirData | null>(null);
  const [loadingTafsir, setLoadingTafsir] = useState(false);

  const currentSurah = SURAHS.find(s => s.number === selectedSurah) || SURAHS[0];

  useEffect(() => {
    fetchSurahData();
  }, [selectedSurah]);

  useEffect(() => {
    if (initialVerse && surahData) {
      setTimeout(() => {
        const element = document.getElementById(`verse-\${initialVerse}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('highlight-verse');
          setTimeout(() => element.classList.remove('highlight-verse'), 3000);
        }
      }, 500);
    }
  }, [initialVerse, surahData]);

  const fetchSurahData = async () => {
    setLoading(true);
    try {
      const [arabicRes, translationRes] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}`),
        fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}/fr.hamidullah`)
      ]);

      const arabicData = await arabicRes.json();
      const translationData = await translationRes.json();

      setSurahData({
        arabic: arabicData.data.ayahs,
        translation: translationData.data.ayahs
      });
    } catch (error) {
      console.error('Error fetching surah:', error);
    } finally {
      setLoading(false);
    }
  };

  const goToPreviousSurah = () => {
    if (selectedSurah > 1) {
      setSelectedSurah(selectedSurah - 1);
    }
  };

  const goToNextSurah = () => {
    if (selectedSurah < 114) {
      setSelectedSurah(selectedSurah + 1);
    }
  };

  const fetchVerseTafsir = async (surahNumber: number, verseNumber: number) => {
    setLoadingTafsir(true);
    try {
      // Tafsir en arabe et français
      const responses = await Promise.all([
        fetch(`https://api.quran.com/api/v4/quran/tafsirs/93?verse_key=\${surahNumber}:\${verseNumber}`), // Tafsir Al-Muyassar (arabe)
        fetch(`https://api.quran.com/api/v4/quran/tafsirs/171?verse_key=\${surahNumber}:\${verseNumber}`) // Tafsir français si dispo
      ]);

      const [arabicData, frenchData] = await Promise.all(responses.map(r => r.json()));

      let arabicTafsir = null;
      let frenchTafsir = null;

      if (arabicData.tafsirs && arabicData.tafsirs[0]) {
        arabicTafsir = arabicData.tafsirs[0].text;
      }

      if (frenchData.tafsirs && frenchData.tafsirs[0]) {
        frenchTafsir = frenchData.tafsirs[0].text;
      }

      // Si aucun tafsir disponible, on ne montre rien
      if (!arabicTafsir && !frenchTafsir) {
        setSelectedVerseTafsir(null);
        return;
      }

      setSelectedVerseTafsir({
        surah: surahNumber,
        verse: verseNumber,
        arabic: arabicTafsir,
        french: frenchTafsir,
        source: "Tafsir Al-Muyassar - Complexe du Roi Fahd"
      });
    } catch (error) {
      console.error('Error fetching tafsir:', error);
      setSelectedVerseTafsir(null);
    } finally {
      setLoadingTafsir(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-[#0d9488] to-[#0f766e] text-white border-none shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPreviousSurah}
              disabled={selectedSurah === 1}
              className="text-white hover:bg-white/20"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex-1 text-center">
              <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-sm mb-2">
                القرآن الكريم
              </div>
              <h2 className="text-3xl font-bold mb-1" style={{ fontFamily: 'serif' }}>
                {currentSurah.nameAr}
              </h2>
              <p className="text-white/90">
                Sourate {currentSurah.name} • {currentSurah.verses} versets
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={goToNextSurah}
              disabled={selectedSurah === 114}
              className="text-white hover:bg-white/20"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <Select value={String(selectedSurah)} onValueChange={(v) => setSelectedSurah(Number(v))}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SURAHS.map(surah => (
                <SelectItem key={surah.number} value={String(surah.number)}>
                  {surah.number}. {surah.name} - {surah.nameAr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
      </Card>

      {/* Controls */}
      <div className="flex justify-center">
        <Tabs value={showTranslation ? "both" : "arabic"} onValueChange={(v) => setShowTranslation(v === "both")}>
          <TabsList className="bg-[#0d9488]/10">
            <TabsTrigger value="arabic">Arabe seul</TabsTrigger>
            <TabsTrigger value="both">Arabe + Traduction</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      {loading ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-[#0d9488]" />
            <p className="text-gray-500">Chargement de la sourate...</p>
          </CardContent>
        </Card>
      ) : surahData ? (
        <div className="space-y-6">
          {/* Bismillah */}
          {selectedSurah !== 1 && selectedSurah !== 9 && (
            <Card className="bg-gradient-to-r from-[#0d9488]/5 to-emerald-50 border-[#0d9488]/20">
              <CardContent className="py-6 text-center">
                <p className="text-3xl font-serif text-[#0d9488]">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux
                </p>
              </CardContent>
            </Card>
          )}

          {/* Verses */}
          {surahData.arabic.map((verse, index) => (
            <Card
              key={verse.number}
              id={`verse-\${verse.numberInSurah}`}
              className="hover:shadow-lg transition-all scroll-mt-24"
            >
              <CardContent className="p-6">
                {/* Arabic */}
                <div className="mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0d9488] to-[#0f766e] flex items-center justify-center text-white font-bold flex-shrink-0">
                      {verse.numberInSurah}
                    </div>
                    <p className="text-2xl leading-loose text-right flex-1 font-serif" dir="rtl">
                      {verse.text}
                    </p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="flex-shrink-0">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => fetchVerseTafsir(selectedSurah, verse.numberInSurah)}>
                          <BookOpen className="w-4 h-4 mr-2" />
                          Voir le Tafsir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Translation */}
                {showTranslation && surahData.translation[index] && (
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-[#0d9488]">
                    <p className="text-gray-700 leading-relaxed">
                      {surahData.translation[index].text}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}

      {/* Tafsir Modal */}
      {selectedVerseTafsir && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in" onClick={() => setSelectedVerseTafsir(null)}>
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader className="border-b bg-gradient-to-r from-[#0d9488] to-[#0f766e] text-white">
              <CardTitle className="flex items-center justify-between">
                <span>Tafsir - Verset {selectedVerseTafsir.surah}:{selectedVerseTafsir.verse}</span>
                <Button variant="ghost" size="icon" onClick={() => setSelectedVerseTafsir(null)} className="text-white hover:bg-white/20">
                  ✕
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {loadingTafsir ? (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-[#0d9488]" />
                  <p className="text-gray-500">Chargement du tafsir...</p>
                </div>
              ) : (
                <>
                  {selectedVerseTafsir.arabic && (
                    <div className="mb-6">
                      <h3 className="font-bold text-gray-800 mb-2">التفسير بالعربية:</h3>
                      <div
                        className="prose prose-sm max-w-none text-gray-700 leading-relaxed text-right"
                        dir="rtl"
                        dangerouslySetInnerHTML={{ __html: selectedVerseTafsir.arabic }}
                      />
                    </div>
                  )}
                  {selectedVerseTafsir.french && (
                    <div className="mb-6">
                      <h3 className="font-bold text-gray-800 mb-2">Explication en français :</h3>
                      <div
                        className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: selectedVerseTafsir.french }}
                      />
                    </div>
                  )}
                  {selectedVerseTafsir.source && (
                    <div className="mt-6 pt-4 border-t">
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Source: {selectedVerseTafsir.source}
                      </p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Source */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-blue-800">
            <BookOpen className="w-4 h-4 inline mr-1" />
            Source: Quran.com API • Traduction: Muhammad Hamidullah • Tafsir: Al-Muyassar
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Approuvé par le Complexe du Roi Fahd pour l'impression du Saint Coran
          </p>
        </CardContent>
      </Card>

      <style>{`
        .highlight-verse {
          animation: highlight 3s ease-out;
        }

        @keyframes highlight {
          0%, 100% {
            background-color: transparent;
          }
          50% {
            background-color: rgba(13, 148, 136, 0.1);
          }
        }
      `}</style>
    </div>
  );
}
