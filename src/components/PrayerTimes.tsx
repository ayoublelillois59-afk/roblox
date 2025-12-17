import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Sunrise, Sun, Sunset, Moon, Clock } from 'lucide-react';

const PRAYER_TIMES = [
  { name: 'Fajr', time: '06:30', icon: Sunrise, color: 'from-blue-400 to-blue-600' },
  { name: 'Dhuhr', time: '13:15', icon: Sun, color: 'from-yellow-400 to-yellow-600' },
  { name: 'Asr', time: '16:45', icon: Sun, color: 'from-orange-400 to-orange-600' },
  { name: 'Maghrib', time: '19:10', icon: Sunset, color: 'from-pink-400 to-pink-600' },
  { name: 'Isha', time: '20:30', icon: Moon, color: 'from-indigo-400 to-indigo-600' },
];

export default function PrayerTimes() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-4">
      {/* Location */}
      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">📍 Paris, France</h3>
            <p className="text-sm text-gray-600">
              {currentTime.toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <Clock className="w-6 h-6 text-[#0d9488]" />
        </CardContent>
      </Card>

      {/* Prayer Times */}
      <div className="space-y-3">
        {PRAYER_TIMES.map((prayer) => {
          const Icon = prayer.icon;
          return (
            <Card key={prayer.name} className="overflow-hidden hover:shadow-lg transition-all">
              <CardContent className="p-0">
                <div className="flex items-center">
                  <div className={`bg-gradient-to-br ${prayer.color} p-4 text-white`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1 p-4 flex items-center justify-between">
                    <h3 className="font-bold text-lg text-gray-800">{prayer.name}</h3>
                    <p className="text-2xl font-mono font-bold text-[#0d9488]">{prayer.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
