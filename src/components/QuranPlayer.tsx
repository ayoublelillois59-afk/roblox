import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Heart } from 'lucide-react';

interface QuranPlayerProps {
  favorites: number[];
  onFavorite: (surahNumber: number) => void;
}

const SURAHS = [
  { number: 1, name: 'Al-Fatiha', nameAr: 'الفاتحة', verses: 7 },
  { number: 2, name: 'Al-Baqara', nameAr: 'البقرة', verses: 286 },
  { number: 18, name: 'Al-Kahf', nameAr: 'الكهف', verses: 110 },
  // Add more surahs as needed
];

export default function QuranPlayer({ favorites, onFavorite }: QuranPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [currentSurah, setCurrentSurah] = useState(SURAHS[0]);

  return (
    <div className="space-y-6">
      {/* Current Playing */}
      <Card className="bg-gradient-to-br from-[#0d9488] to-[#0f766e] text-white">
        <CardContent className="p-8 text-center">
          <p className="text-4xl font-serif mb-4">{currentSurah.nameAr}</p>
          <h3 className="text-2xl font-bold mb-2">{currentSurah.name}</h3>
          <p className="text-sm opacity-90 mb-6">{currentSurah.verses} versets</p>

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30"
              onClick={() => setPlaying(!playing)}
            >
              {playing ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30"
              onClick={() => onFavorite(currentSurah.number)}
            >
              <Heart
                className={`w-6 h-6 ${
                  favorites.includes(currentSurah.number) ? 'fill-current' : ''
                }`}
              />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Surah List */}
      <div className="space-y-3">
        {SURAHS.map((surah) => (
          <Card
            key={surah.number}
            className="cursor-pointer hover:shadow-lg transition-all"
            onClick={() => setCurrentSurah(surah)}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#0d9488] text-white rounded-full flex items-center justify-center font-bold">
                  {surah.number}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{surah.name}</h3>
                  <p className="text-sm text-gray-600">{surah.verses} versets</p>
                </div>
              </div>
              <p className="text-xl font-serif text-gray-800">{surah.nameAr}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
