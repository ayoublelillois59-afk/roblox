import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { createPageUrl } from "@/utils";
import Adhkar from "@/components/Adhkar";

export default function AdhkarPage() {
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
            <h1 className="text-xl font-bold text-gray-800">الأذكار</h1>
            <p className="text-sm text-gray-500">Invocations Authentiques</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Adhkar />

        {/* Info */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h3 className="font-semibold text-amber-800 mb-2">📚 Sources Authentiques</h3>
          <p className="text-sm text-amber-700">
            Toutes les invocations présentées sont issues des recueils authentiques
            (Sahih Bukhari, Sahih Muslim, Sunan At-Tirmidhi, etc.) avec leurs références précises.
            Les traductions sont vérifiées par des savants qualifiés.
          </p>
        </div>
      </div>
    </div>
  );
}
