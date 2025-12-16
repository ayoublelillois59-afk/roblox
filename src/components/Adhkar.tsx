import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AdhkarItem {
  id: number;
  category: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
  repeat?: number;
}

const adhkarData: AdhkarItem[] = [
  {
    id: 1,
    category: "Matin",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
    transliteration: "Asbahna wa asbahal-mulku lillah, walhamdu lillah",
    translation: "Nous voici au matin et le royaume appartient à Allah, et la louange est à Allah",
    reference: "Muslim 2723",
    repeat: 1
  },
  {
    id: 2,
    category: "Matin",
    arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    transliteration: "Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilaykan-nushur",
    translation: "Ô Allah, par Toi nous entrons dans le matin, par Toi nous entrons dans la soirée, par Toi nous vivons, par Toi nous mourrons, et vers Toi est la résurrection",
    reference: "At-Tirmidhi 3391",
    repeat: 1
  },
  {
    id: 3,
    category: "Soir",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
    transliteration: "Amsayna wa amsal-mulku lillah, walhamdu lillah",
    translation: "Nous voici au soir et le royaume appartient à Allah, et la louange est à Allah",
    reference: "Muslim 2723",
    repeat: 1
  },
  {
    id: 4,
    category: "Après la prière",
    arabic: "سُبْحَانَ اللهِ",
    transliteration: "SubhanAllah",
    translation: "Gloire à Allah",
    reference: "Bukhari 843, Muslim 595",
    repeat: 33
  },
  {
    id: 5,
    category: "Après la prière",
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdulillah",
    translation: "Louange à Allah",
    reference: "Bukhari 843, Muslim 595",
    repeat: 33
  },
  {
    id: 6,
    category: "Après la prière",
    arabic: "اللهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    translation: "Allah est le Plus Grand",
    reference: "Bukhari 843, Muslim 595",
    repeat: 34
  }
];

export default function Adhkar() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");

  const categories = ["Tous", ...Array.from(new Set(adhkarData.map(item => item.category)))];

  const filteredAdhkar = selectedCategory === "Tous"
    ? adhkarData
    : adhkarData.filter(item => item.category === selectedCategory);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Adhkar List */}
      <div className="space-y-4">
        {filteredAdhkar.map((adhkar) => (
          <div key={adhkar.id} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleExpand(adhkar.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                  {adhkar.category}
                </span>
                {adhkar.repeat && adhkar.repeat > 1 && (
                  <span className="text-sm font-medium text-gray-500">
                    ×{adhkar.repeat}
                  </span>
                )}
              </div>

              <p className="text-2xl font-arabic text-right mb-4 leading-loose text-gray-800">
                {adhkar.arabic}
              </p>

              {expandedId === adhkar.id ? (
                <ChevronUp className="w-5 h-5 text-gray-400 mx-auto" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 mx-auto" />
              )}
            </div>

            {expandedId === adhkar.id && (
              <div className="px-6 pb-6 pt-0 space-y-4 border-t bg-gray-50">
                <div className="pt-4">
                  <p className="text-sm font-medium text-gray-500 mb-2">Translittération</p>
                  <p className="text-gray-700 italic">{adhkar.transliteration}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Traduction</p>
                  <p className="text-gray-700">{adhkar.translation}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Référence</p>
                  <p className="text-sm text-emerald-700 font-medium">{adhkar.reference}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
