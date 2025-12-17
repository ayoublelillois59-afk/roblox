import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Info } from 'lucide-react';
import { createPageUrl } from "@/utils";
import PrayerTimes from "@/components/PrayerTimes";

export default function PrayerPage() {
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
            <h1 className="text-xl font-bold text-gray-800">مواقيت الصلاة</h1>
            <p className="text-sm text-gray-500">Horaires de Prière</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <PrayerTimes />

        {/* Info Card */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">À propos des méthodes de calcul</h3>
                <p className="text-sm text-blue-700">
                  Les horaires sont calculés selon la méthode sélectionnée. En France,
                  l'UOIF (Union des Organisations Islamiques de France) est recommandée.
                  Les horaires peuvent varier légèrement selon la méthode choisie.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hadith */}
        <Card className="mt-4">
          <CardContent className="p-6 text-center">
            <p className="text-lg font-serif text-gray-800 mb-2">
              "الصَّلَاةُ عِمَادُ الدِّينِ"
            </p>
            <p className="text-gray-600 italic text-sm">
              "La prière est le pilier de la religion"
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
