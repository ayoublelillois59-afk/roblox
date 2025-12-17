import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { createPageUrl } from "@/utils";
import LearningPrograms from "@/components/LearningPrograms";

export default function LearnPage() {
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
            <h1 className="text-xl font-bold text-gray-800">تعلم</h1>
            <p className="text-sm text-gray-500">Programmes d'apprentissage</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <LearningPrograms />

        {/* Hadith */}
        <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-2xl p-6 text-center">
          <p className="text-lg font-serif text-gray-800 mb-3">
            "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ"
          </p>
          <p className="text-indigo-700 italic">
            "Le meilleur d'entre vous est celui qui apprend le Coran et l'enseigne"
          </p>
          <p className="text-sm text-indigo-600 mt-2">Sahih Bukhari</p>
        </div>
      </div>
    </div>
  );
}
