import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { createPageUrl } from "@/utils";
import AllahNames from "@/components/AllahNames";

export default function NamesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to={createPageUrl('Home')}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-800">أسماء الله الحسنى</h1>
            <p className="text-sm text-gray-500">Les 99 Noms d'Allah</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <AllahNames />

        {/* Hadith */}
        <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
          <p className="text-lg font-serif text-gray-800 mb-3">
            "إِنَّ لِلَّهِ تِسْعَةً وَتِسْعِينَ اسْمًا مِائَةً إِلَّا وَاحِدًا مَنْ أَحْصَاهَا دَخَلَ الْجَنَّةَ"
          </p>
          <p className="text-emerald-700 italic">
            "Allah a 99 noms, cent moins un. Quiconque les retient (les apprend et les comprend) entrera au Paradis."
          </p>
          <p className="text-sm text-emerald-600 mt-2">Sahih Bukhari & Muslim</p>
        </div>
      </div>
    </div>
  );
}
