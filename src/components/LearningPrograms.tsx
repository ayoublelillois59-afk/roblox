import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageCircle, Crown } from 'lucide-react';
import { createPageUrl } from "@/utils";

export default function LearningPrograms() {
  return (
    <div className="space-y-6">
      {/* Reading Program */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-[#0d9488] to-[#0f766e] text-white">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Apprendre à Lire l'Arabe
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600 mb-4">
            Programme complet pour maîtriser la lecture de l'arabe en 3 mois.
          </p>
          <Link to={createPageUrl('Premium')}>
            <Button className="w-full bg-[#0d9488] hover:bg-[#0f766e]">
              <Crown className="w-4 h-4 mr-2" />
              Voir le programme détaillé
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Speaking Program */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Apprendre à Parler l'Arabe
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600 mb-4">
            Programme complet pour parler l'arabe couramment en 6 mois.
          </p>
          <Link to={createPageUrl('Premium')}>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
              <Crown className="w-4 h-4 mr-2" />
              Voir le programme détaillé
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
