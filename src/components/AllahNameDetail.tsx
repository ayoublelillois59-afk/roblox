import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, BookOpen, Heart } from 'lucide-react';
import { cn } from "@/lib/utils";

const NAME_DETAILS: Record<number, {
  explanation: string;
  virtue: string;
  source: string;
  usage: string;
}> = {
  1: {
    explanation: "Ar-Rahman est celui dont la miséricorde embrasse toute chose. C'est un attribut exclusif à Allah qui englobe tous les êtres, croyants et non-croyants, dans cette vie. Sa miséricorde précède Sa colère.",
    virtue: "Invoquer Allah par ce nom apporte la miséricorde divine dans tous les aspects de votre vie.",
    source: "Coran 55:1 - الرحمن (Ar-Rahman)",
    usage: "Récitez 'Ya Rahman' (يا رحمن) après chaque prière pour demander la miséricorde d'Allah."
  },
  2: {
    explanation: "Ar-Rahim est celui qui est particulièrement miséricordieux envers les croyants. Cette miséricorde est spécifique et éternelle, elle se manifeste surtout dans l'au-delà.",
    virtue: "Ce nom rappelle la miséricorde spéciale d'Allah envers ceux qui croient et font de bonnes œuvres.",
    source: "Coran 2:163",
    usage: "Invoquez ce nom pour demander pardon et miséricorde, particulièrement lors du repentir."
  },
  3: {
    explanation: "Al-Malik est le Roi absolu, le Souverain suprême de tous les mondes. Il possède la royauté éternelle et son royaume n'a ni début ni fin.",
    virtue: "Méditer sur ce nom rappelle que tout appartient à Allah et que nous ne sommes que Ses serviteurs.",
    source: "Coran 59:23",
    usage: "Récitez ce nom pour reconnaître la souveraineté absolue d'Allah dans toutes les situations."
  },
  4: {
    explanation: "Al-Quddus est le Saint, le Pur, celui qui est exempt de toute imperfection. Il est élevé au-dessus de tout défaut et de toute ressemblance avec Sa création.",
    virtue: "Ce nom purifie le cœur et l'âme de celui qui l'invoque avec sincérité.",
    source: "Coran 62:1",
    usage: "Invoquez ce nom lors des ablutions et avant la prière pour purifier votre intention."
  },
  5: {
    explanation: "As-Salam est la Paix absolue, la Source de toute sécurité et tranquillité. Il est exempt de tout mal et accorde la paix à Ses serviteurs.",
    virtue: "Invoquer ce nom apporte la paix intérieure et la sérénité dans les moments de trouble.",
    source: "Coran 59:23",
    usage: "Récitez 'Ya Salam' (يا سلام) pour trouver la paix intérieure dans les moments d'anxiété."
  }
};

const DEFAULT_DETAIL = {
  explanation: "Ce nom béni d'Allah mérite méditation et étude approfondie. Chaque nom d'Allah révèle un aspect de Sa perfection et de Sa grandeur.",
  virtue: "L'invocation de chaque nom d'Allah rapproche le croyant de son Créateur.",
  source: "Hadith: 'Allah a 99 noms, celui qui les retient entrera au Paradis' (Bukhari & Muslim)",
  usage: "Méditez sur ce nom et invoquez Allah par celui-ci dans vos prières."
};

interface AllahNameDetailProps {
  name: {
    number: number;
    arabic: string;
    transliteration: string;
    meaning: string;
  };
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function AllahNameDetail({ name, onClose, isFavorite, onToggleFavorite }: AllahNameDetailProps) {
  const detail = NAME_DETAILS[name.number] || DEFAULT_DETAIL;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom">
        <CardHeader className="border-b bg-gradient-to-r from-teal-50 to-emerald-50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0d9488] to-[#0f766e] rounded-xl flex items-center justify-center text-white font-bold">
                  {name.number}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleFavorite}
                  className={cn(
                    "transition-all",
                    isFavorite && "text-red-500"
                  )}
                >
                  <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
                </Button>
              </div>
              <CardTitle className="text-4xl font-serif text-[#0d9488] mb-2">
                {name.arabic}
              </CardTitle>
              <p className="text-xl text-gray-700 font-medium">{name.transliteration}</p>
              <p className="text-gray-600">{name.meaning}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Explication */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#0d9488]" />
              Explication
            </h3>
            <p className="text-gray-700 leading-relaxed">{detail.explanation}</p>
          </div>

          {/* Vertu */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-amber-800 mb-2">✨ Vertu</h3>
            <p className="text-amber-700">{detail.virtue}</p>
          </div>

          {/* Usage */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-emerald-800 mb-2">🤲 Comment l'invoquer</h3>
            <p className="text-emerald-700">{detail.usage}</p>
          </div>

          {/* Source */}
          <div className="border-t pt-4">
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Source: {detail.source}
            </p>
          </div>

          {/* Hadith */}
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-4 text-center border border-teal-100">
            <p className="text-lg font-serif text-gray-800 mb-2">
              "إِنَّ لِلَّهِ تِسْعَةً وَتِسْعِينَ اسْمًا"
            </p>
            <p className="text-sm text-gray-600 italic">
              "Allah a 99 noms, quiconque les retient entrera au Paradis"
            </p>
            <p className="text-xs text-gray-500 mt-1">Sahih Bukhari & Muslim</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
