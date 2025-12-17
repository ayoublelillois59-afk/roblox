import React, { useState } from 'react';
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Globe, CheckCircle2, Search, Plus } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function MosqueSelector({ selectedMosqueId, onSelectMosque }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const { data: mosques = [], isLoading } = useQuery({
    queryKey: ['mosques'],
    queryFn: () => base44.entities.Mosque.list(),
  });

  const filteredMosques = mosques.filter(m =>
    m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Rechercher une mosquée..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter
        </Button>
      </div>

      {showAddForm && (
        <Card className="bg-[#0d9488]/5 border-[#0d9488]/20">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-2">
              Pour ajouter votre mosquée, contactez-nous avec les informations suivantes :
            </p>
            <ul className="text-sm text-gray-600 space-y-1 mb-3">
              <li>• Nom complet de la mosquée</li>
              <li>• Adresse complète</li>
              <li>• Horaires de prière affichés</li>
              <li>• Contact de la mosquée (optionnel)</li>
            </ul>
            <Button className="w-full bg-[#0d9488] hover:bg-[#0f766e]">
              Contacter l'équipe
            </Button>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-4 border-[#0d9488] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : filteredMosques.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Aucune mosquée trouvée</p>
            <p className="text-sm mt-1">Ajoutez la première mosquée de votre ville</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredMosques.map((mosque) => (
            <Card
              key={mosque.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                selectedMosqueId === mosque.id && "ring-2 ring-[#0d9488] bg-[#0d9488]/5"
              )}
              onClick={() => onSelectMosque(mosque)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800">{mosque.name}</h3>
                      {mosque.verified && (
                        <Badge variant="outline" className="text-xs bg-[#0d9488]/10 text-[#0d9488] border-[#0d9488]/20">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Vérifiée
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      {mosque.address && (
                        <p className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          {mosque.address}, {mosque.city}
                        </p>
                      )}
                      {mosque.phone && (
                        <p className="flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          {mosque.phone}
                        </p>
                      )}
                      {mosque.jumua_time && (
                        <Badge variant="outline" className="text-xs">
                          Jumua: {mosque.jumua_time}
                        </Badge>
                      )}
                    </div>
                  </div>
                  {selectedMosqueId === mosque.id && (
                    <div className="w-8 h-8 bg-[#0d9488] rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedMosqueId && (
        <Button
          variant="outline"
          onClick={() => onSelectMosque(null)}
          className="w-full"
        >
          Utiliser ma position
        </Button>
      )}
    </div>
  );
}
