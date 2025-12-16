import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { createPageUrl } from "@/utils";
import DhikrCounter from "@/components/DhikrCounter";

export default function DhikrPage() {
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
            <h1 className="text-xl font-bold text-gray-800">عداد الذكر</h1>
            <p className="text-sm text-gray-500">Compteur de Dhikr</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <DhikrCounter />

        {/* Hadith */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border text-center">
          <p className="text-xl font-serif text-gray-800 mb-3">
            "أَلَا بِذِكْرِ اللهِ تَطْمَئِنُّ الْقُلُوبُ"
          </p>
          <p className="text-gray-600 italic">
            "N'est-ce point par l'évocation d'Allah que se tranquillisent les cœurs ?"
          </p>
          <p className="text-sm text-gray-500 mt-2">Sourate Ar-Ra'd (13:28)</p>
        </div>
      </div>
    </div>
  );
}
