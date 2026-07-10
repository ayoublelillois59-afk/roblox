import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { createPageUrl } from "@/utils";
import QiblaCompass from "@/components/QiblaCompass";

export default function QiblaPage() {
  return (
    <div className="min-h-screen bg-ivory pb-28">
      {/* Header */}
      <div className="bg-ivory-50/85 backdrop-blur-xl border-b border-hairline sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to={createPageUrl('Home')}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-800">اتجاه القبلة</h1>
            <p className="text-sm text-gray-500">Direction de la Qibla</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <QiblaCompass />

        {/* Info */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="font-semibold text-gray-800 mb-3">Comment utiliser la boussole ?</h3>
          <ol className="text-gray-600 text-sm space-y-2">
            <li className="flex items-start gap-2">
              <span className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
              <span>Autorisez l'accès à votre localisation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
              <span>Tenez votre téléphone à plat, parallèle au sol</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
              <span>Tournez-vous jusqu'à ce que l'aiguille pointe vers le haut</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
              <span>Vous êtes maintenant face à la Kaaba 🕋</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
