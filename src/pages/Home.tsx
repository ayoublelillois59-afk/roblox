import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BookOpen, Hash, Compass, Book, Clock } from 'lucide-react';

export default function HomePage() {
  const features = [
    { name: 'Adhkar', path: '/adhkar', icon: BookOpen, color: 'bg-emerald-500' },
    { name: 'Dhikr', path: '/dhikr', icon: Hash, color: 'bg-blue-500' },
    { name: 'Qibla', path: '/qibla', icon: Compass, color: 'bg-purple-500' },
    { name: 'Quran', path: '/quran', icon: Book, color: 'bg-amber-500' },
    { name: 'Prières', path: '/prayer-times', icon: Clock, color: 'bg-rose-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-emerald-800">☪️ Muslim Pro</h1>
          <p className="text-gray-600 mt-1">Votre compagnon spirituel quotidien</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((feature) => (
            <Link key={feature.name} to={feature.path}>
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800">{feature.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-12 bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
          <p className="text-2xl font-serif text-emerald-900 mb-3">
            "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا"
          </p>
          <p className="text-gray-700 italic">
            "La prière demeure, pour les croyants, une obligation à des temps déterminés"
          </p>
          <p className="text-sm text-gray-600 mt-2">Sourate An-Nisa (4:103)</p>
        </div>
      </main>
    </div>
  );
}
