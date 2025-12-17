import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const ALLAH_NAMES = [
  { number: 1, arabic: 'الرَّحْمَنُ', transliteration: 'Ar-Rahman', meaning: 'Le Tout Miséricordieux' },
  { number: 2, arabic: 'الرَّحِيمُ', transliteration: 'Ar-Rahim', meaning: 'Le Très Miséricordieux' },
  { number: 3, arabic: 'الْمَلِكُ', transliteration: 'Al-Malik', meaning: 'Le Souverain' },
  { number: 4, arabic: 'الْقُدُّوسُ', transliteration: 'Al-Quddus', meaning: 'Le Pur' },
  { number: 5, arabic: 'السَّلاَمُ', transliteration: 'As-Salam', meaning: 'La Paix' },
  // Add more names as needed
];

export default function AllahNames() {
  const [selectedName, setSelectedName] = useState(ALLAH_NAMES[0]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {ALLAH_NAMES.map((name) => (
          <Card
            key={name.number}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedName.number === name.number
                ? 'border-[#0d9488] border-2 bg-[#0d9488]/5'
                : ''
            }`}
            onClick={() => setSelectedName(name)}
          >
            <CardContent className="p-4 text-center">
              <div className="text-xs text-gray-500 mb-1">{name.number}</div>
              <div className="text-2xl font-serif text-gray-800 mb-1">{name.arabic}</div>
              <div className="text-xs text-gray-600">{name.transliteration}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Name Details */}
      <Card className="bg-gradient-to-br from-[#0d9488]/10 to-emerald-50">
        <CardContent className="p-8 text-center">
          <div className="text-6xl font-serif text-[#0d9488] mb-4">{selectedName.arabic}</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedName.transliteration}</h3>
          <p className="text-lg text-gray-700 mb-4">{selectedName.meaning}</p>
          <p className="text-sm text-gray-600">
            🔢 Nom #{selectedName.number} parmi les 99 Noms d'Allah
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
