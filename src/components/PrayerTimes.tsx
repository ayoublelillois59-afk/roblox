import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Sun, Sunrise, Sunset, Moon, RefreshCw, MapPin, Building2, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import MosqueSelector from "@/components/MosqueSelector";
import QiblaCompass from "@/components/QiblaCompass";
import { Mosque } from '@/entities';

type PrayerName = 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';

const PRAYER_INFO: Record<PrayerName, { icon: any; name: string; nameAr: string; color: string }> = {
  Fajr: { icon: Sunrise, name: "Fajr", nameAr: "الفجر", color: "from-indigo-500 to-purple-600" },
  Sunrise: { icon: Sun, name: "Shurûq", nameAr: "الشروق", color: "from-orange-400 to-yellow-500" },
  Dhuhr: { icon: Sun, name: "Dhuhr", nameAr: "الظهر", color: "from-yellow-400 to-orange-500" },
  Asr: { icon: Sun, name: "'Asr", nameAr: "العصر", color: "from-orange-500 to-red-500" },
  Maghrib: { icon: Sunset, name: "Maghrib", nameAr: "المغرب", color: "from-red-500 to-purple-600" },
  Isha: { icon: Moon, name: "'Isha", nameAr: "العشاء", color: "from-purple-600 to-indigo-800" }
};

const CALCULATION_METHODS = [
  { id: 2, name: "Islamic Society of North America (ISNA)" },
  { id: 3, name: "Muslim World League" },
  { id: 4, name: "Umm Al-Qura University, Makkah" },
  { id: 5, name: "Egyptian General Authority" },
  { id: 12, name: "Union des Organisations Islamiques de France" },
];

interface NextPrayer {
  name: string;
  time: string;
  remaining: number | null;
}

interface Location {
  lat: number;
  lng: number;
}

interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

const getPrayerInfo = (prayerName: string) => {
  return PRAYER_INFO[prayerName as PrayerName] || {
    icon: Clock,
    name: prayerName,
    nameAr: prayerName,
    color: "from-emerald-600 to-emerald-700"
  };
};

export default function PrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [method, setMethod] = useState("12");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<NextPrayer | null>(null);
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null);
  const [activeTab, setActiveTab] = useState("auto");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchPrayerTimes = async (lat: number, lng: number) => {
    try {
      setLoading(true);
      const date = new Date();
      const dateStr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=${method}`
      );
      const data = await response.json();

      if (data.code === 200) {
        setPrayerTimes(data.data.timings);
        setError(null);
      } else {
        throw new Error('Erreur API');
      }
    } catch (err) {
      setError("Impossible de récupérer les horaires de prière");
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("La géolocalisation n'est pas supportée");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        fetchPrayerTimes(latitude, longitude);
      },
      () => {
        setError("Veuillez autoriser la géolocalisation");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (location) {
      fetchPrayerTimes(location.lat, location.lng);
    }
  }, [method]);

  const handleMosqueSelect = (mosque: Mosque | null) => {
    setSelectedMosque(mosque);
    if (mosque?.prayer_times) {
      setPrayerTimes(mosque.prayer_times as PrayerTimings);
      setError(null);
      setActiveTab("mosque");
    } else {
      setSelectedMosque(null);
      if (location) {
        fetchPrayerTimes(location.lat, location.lng);
      }
      setActiveTab("auto");
    }
  };

  useEffect(() => {
    if (prayerTimes) {
      const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
      const now = currentTime;

      for (const prayer of prayers) {
        const [hours, minutes] = prayerTimes[prayer].split(':').map(Number);
        const prayerTime = new Date();
        prayerTime.setHours(hours, minutes, 0, 0);

        if (prayerTime > now) {
          setNextPrayer({
            name: prayer,
            time: prayerTimes[prayer],
            remaining: Math.floor((prayerTime.getTime() - now.getTime()) / 1000 / 60)
          });
          return;
        }
      }

      // If all prayers passed, next is Fajr tomorrow
      setNextPrayer({
        name: 'Fajr',
        time: prayerTimes.Fajr,
        remaining: null
      });
    }
  }, [prayerTimes, currentTime]);

  const formatTimeRemaining = (minutes: number | null) => {
    if (minutes === null) return "Demain";
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hrs > 0) return `${hrs}h ${mins}min`;
    return `${mins} min`;
  };

  if (error) {
    return (
      <Card className="p-8 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-red-500" />
        </div>
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={getLocation} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Réessayer
        </Button>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="p-8 text-center">
        <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Chargement des horaires...</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Qibla Quick Access */}
      <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-none shadow-lg cursor-pointer hover:shadow-xl transition-all" onClick={() => {
        const qiblaSection = document.getElementById('qibla-finder');
        if (qiblaSection) {
          qiblaSection.scrollIntoView({ behavior: 'smooth' });
        }
      }}>
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">Trouver la Qibla</h3>
              <p className="text-sm opacity-90">Direction de La Mecque</p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6" />
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="auto">
            <MapPin className="w-4 h-4 mr-2" />
            Ma Position
          </TabsTrigger>
          <TabsTrigger value="mosque">
            <Building2 className="w-4 h-4 mr-2" />
            Ma Mosquée
          </TabsTrigger>
        </TabsList>

        <TabsContent value="auto" className="space-y-6 mt-6">
          {/* Next Prayer Card */}
      {nextPrayer && (
        <div className={cn(
          "bg-gradient-to-r rounded-3xl p-6 text-white shadow-xl",
          getPrayerInfo(nextPrayer.name).color
        )}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Prochaine prière</p>
              <h3 className="text-3xl font-bold mb-1">
                {getPrayerInfo(nextPrayer.name).nameAr} - {getPrayerInfo(nextPrayer.name).name}
              </h3>
              <p className="text-xl">{nextPrayer.time}</p>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2">
                {React.createElement(getPrayerInfo(nextPrayer.name).icon, { className: "w-8 h-8" })}
              </div>
              <p className="text-sm text-white/80">
                Dans {formatTimeRemaining(nextPrayer.remaining)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Method Selector */}
      <div className="flex items-center gap-4">
        <Select value={method} onValueChange={setMethod}>
          <SelectTrigger className="flex-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CALCULATION_METHODS.map(m => (
              <SelectItem key={m.id} value={String(m.id)}>{m.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" onClick={getLocation}>
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      {/* All Prayer Times */}
      <div className="grid gap-3">
        {Object.entries(PRAYER_INFO).map(([key, info]) => {
          const isNext = nextPrayer?.name === key;
          const Icon = info.icon;

          return (
            <div
              key={key}
              className={cn(
                "flex items-center justify-between p-4 rounded-2xl transition-all",
                isNext
                  ? "bg-emerald-50 border-2 border-emerald-200"
                  : "bg-gray-50 hover:bg-gray-100"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                  info.color
                )}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{info.name}</p>
                  <p className="text-sm text-gray-500">{info.nameAr}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn(
                  "text-xl font-bold",
                  isNext ? "text-emerald-700" : "text-gray-700"
                )}>
                  {prayerTimes?.[key] || '--:--'}
                </p>
                {isNext && (
                  <p className="text-xs text-emerald-600">Prochaine</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Current Time */}
      <div className="text-center text-gray-500 text-sm">
        <Clock className="w-4 h-4 inline mr-2" />
        {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        {' • '}
        {currentTime.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
      </div>
        </TabsContent>

        <TabsContent value="mosque" className="space-y-6 mt-6">
          <MosqueSelector
            selectedMosqueId={selectedMosque?.id || null}
            onSelectMosque={handleMosqueSelect}
          />

          {selectedMosque && prayerTimes && (
            <>
              {/* Next Prayer Card */}
              {nextPrayer && (
                <div className={cn(
                  "bg-gradient-to-r rounded-3xl p-6 text-white shadow-xl",
                  getPrayerInfo(nextPrayer.name).color
                )}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm mb-1">Prochaine prière</p>
                      <h3 className="text-3xl font-bold mb-1">
                        {getPrayerInfo(nextPrayer.name).nameAr} - {getPrayerInfo(nextPrayer.name).name}
                      </h3>
                      <p className="text-xl">{nextPrayer.time}</p>
                      <p className="text-sm mt-2 text-white/80">
                        📍 {selectedMosque?.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2">
                        {React.createElement(getPrayerInfo(nextPrayer.name).icon, { className: "w-8 h-8" })}
                      </div>
                      <p className="text-sm text-white/80">
                        Dans {formatTimeRemaining(nextPrayer.remaining)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* All Prayer Times */}
              <div className="grid gap-3">
                {Object.entries(PRAYER_INFO).map(([key, info]) => {
                  const isNext = nextPrayer?.name === key;
                  const Icon = info.icon;

                  return (
                    <div
                      key={key}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl transition-all",
                        isNext
                          ? "bg-[#0E5648]/10 border-2 border-[#0E5648]/30"
                          : "bg-gray-50 hover:bg-gray-100"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                          info.color
                        )}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{info.name}</p>
                          <p className="text-sm text-gray-500">{info.nameAr}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={cn(
                          "text-xl font-bold",
                          isNext ? "text-[#0E5648]" : "text-gray-700"
                        )}>
                          {prayerTimes?.[key] || '--:--'}
                        </p>
                        {isNext && (
                          <p className="text-xs text-[#0E5648]">Prochaine</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* Qibla Finder Section */}
      <div id="qibla-finder" className="scroll-mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-[#0E5648]" />
          Direction de la Qibla
        </h3>
        <QiblaCompass />
      </div>
    </div>
  );
}
