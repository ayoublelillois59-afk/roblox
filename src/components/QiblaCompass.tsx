import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation, Loader2 } from 'lucide-react';

export default function QiblaCompass() {
  const [loading, setLoading] = useState(false);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [currentHeading, setCurrentHeading] = useState(0);

  const findQibla = () => {
    setLoading(true);
    // Simulate finding Qibla
    setTimeout(() => {
      setQiblaDirection(120); // Example: 120 degrees for Paris
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-8">
          {/* Compass */}
          <div className="relative w-64 h-64 mx-auto mb-6">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              {/* Compass Circle */}
              <circle cx="100" cy="100" r="90" fill="white" stroke="#0d9488" strokeWidth="4" />

              {/* Cardinal Directions */}
              <text x="100" y="20" textAnchor="middle" className="text-xs font-bold fill-gray-700">N</text>
              <text x="180" y="105" textAnchor="middle" className="text-xs font-bold fill-gray-700">E</text>
              <text x="100" y="190" textAnchor="middle" className="text-xs font-bold fill-gray-700">S</text>
              <text x="20" y="105" textAnchor="middle" className="text-xs font-bold fill-gray-700">W</text>

              {/* Qibla Arrow */}
              <g transform={`rotate(${qiblaDirection} 100 100)`}>
                <polygon
                  points="100,40 110,100 100,90 90,100"
                  fill="#0d9488"
                  className="transition-all duration-500"
                />
              </g>

              {/* Center */}
              <circle cx="100" cy="100" r="8" fill="#0d9488" />
              <text x="100" y="135" textAnchor="middle" className="text-xl">🕋</text>
            </svg>
          </div>

          {/* Direction Info */}
          <div className="text-center mb-6">
            <p className="text-3xl font-bold text-[#0d9488] mb-2">{qiblaDirection}°</p>
            <p className="text-sm text-gray-600">Direction de la Qibla</p>
          </div>

          {/* Find Button */}
          <Button
            onClick={findQibla}
            disabled={loading}
            className="w-full bg-[#0d9488] hover:bg-[#0f766e]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Recherche...
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4 mr-2" />
                Trouver la Qibla
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
