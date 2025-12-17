import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QuranReaderProps {
  initialSurah: number;
  initialVerse: number | null;
}

const EXAMPLE_VERSES = [
  { number: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', translation: 'Au nom d\'Allah, le Tout Miséricordieux, le Très Miséricordieux.' },
  { number: 2, arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', translation: 'Louange à Allah, Seigneur de l\'univers.' },
  { number: 3, arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', translation: 'Le Tout Miséricordieux, le Très Miséricordieux,' },
];

export default function QuranReader({ initialSurah, initialVerse }: QuranReaderProps) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-[#0d9488] to-[#0f766e] text-white">
        <CardContent className="p-4 text-center">
          <h2 className="text-2xl font-bold">سورة الفاتحة</h2>
          <p className="text-sm opacity-90">Sourate Al-Fatiha</p>
        </CardContent>
      </Card>

      {/* Verses */}
      <div className="space-y-6">
        {EXAMPLE_VERSES.map((verse) => (
          <Card key={verse.number} className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 bg-[#0d9488] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {verse.number}
                </div>
                <p className="text-2xl font-serif text-right flex-1 leading-loose text-gray-800" dir="rtl">
                  {verse.arabic}
                </p>
              </div>
              <p className="text-gray-600 italic pl-11">{verse.translation}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Page précédente
        </Button>
        <span className="text-sm text-gray-600">Page {currentPage}</span>
        <Button variant="outline" onClick={() => setCurrentPage(p => p + 1)}>
          Page suivante
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
