import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Compass, MapPin, RefreshCw, Navigation } from 'lucide-react';
import { cn } from "@/lib/utils";

const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

export default function QiblaCompass() {
  const [qiblaDirection, setQiblaDirection] = useState(null);
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const calculateQiblaDirection = (lat, lng) => {
    const lat1 = (lat * Math.PI) / 180;
    const lat2 = (KAABA_LAT * Math.PI) / 180;
    const lngDiff = ((KAABA_LNG - lng) * Math.PI) / 180;

    const y = Math.sin(lngDiff);
    const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(lngDiff);

    let qibla = (Math.atan2(y, x) * 180) / Math.PI;
    qibla = (qibla + 360) % 360;

    return qibla;
  };

  const getLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("La géolocalisation n'est pas supportée par votre navigateur");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        const direction = calculateQiblaDirection(latitude, longitude);
        setQiblaDirection(direction);
        setLoading(false);
      },
      (err) => {
        setError("Impossible d'obtenir votre position. Veuillez autoriser la géolocalisation.");
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const requestDeviceOrientation = async () => {
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          setPermissionGranted(true);
        }
      } catch (err) {
        console.log('Orientation permission error:', err);
      }
    } else {
      setPermissionGranted(true);
    }
  };

  useEffect(() => {
    const handleOrientation = (event) => {
      if (event.alpha !== null) {
        setDeviceHeading(event.alpha);
      }
    };

    if (permissionGranted) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [permissionGranted]);

  useEffect(() => {
    getLocation();
    requestDeviceOrientation();
  }, []);

  const needleRotation = qiblaDirection !== null
    ? qiblaDirection - deviceHeading
    : 0;

  const getDistanceToMecca = () => {
    if (!location) return null;
    const R = 6371;
    const dLat = ((KAABA_LAT - location.lat) * Math.PI) / 180;
    const dLon = ((KAABA_LNG - location.lng) * Math.PI) / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos((location.lat * Math.PI) / 180) * Math.cos((KAABA_LAT * Math.PI) / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-emerald-700 text-sm mb-4">
          <Compass className="w-4 h-4" />
          <span>Direction de la Qibla</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">القبلة</h2>
        <p className="text-gray-500">Orientez-vous vers La Mecque pour la prière</p>
      </div>

      {error ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={getLocation} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Réessayer
          </Button>
        </div>
      ) : loading ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Recherche de votre position...</p>
        </div>
      ) : (
        <>
          {/* Compass */}
          <div className="relative w-72 h-72 mx-auto mb-8">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-8 border-gray-100 shadow-inner" />

            {/* Cardinal directions */}
            <div className="absolute inset-4 rounded-full border-2 border-gray-200">
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-bold text-gray-400">N</span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-bold text-gray-400">S</span>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">O</span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">E</span>
            </div>

            {/* Degree markers */}
            <div className="absolute inset-0">
              {[...Array(36)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-3 bg-gray-300 left-1/2 -translate-x-1/2"
                  style={{
                    transform: `rotate(${i * 10}deg)`,
                    transformOrigin: '50% 144px'
                  }}
                />
              ))}
            </div>

            {/* Qibla Needle */}
            <div
              className="absolute inset-0 transition-transform duration-300"
              style={{ transform: `rotate(${needleRotation}deg)` }}
            >
              <div className="absolute left-1/2 top-8 -translate-x-1/2 flex flex-col items-center">
                <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-emerald-600" />
                <div className="w-1 h-24 bg-gradient-to-b from-emerald-600 to-emerald-400" />
              </div>
              <div className="absolute left-1/2 bottom-8 -translate-x-1/2 flex flex-col items-center">
                <div className="w-1 h-24 bg-gradient-to-t from-gray-400 to-gray-300" />
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[16px] border-t-gray-400" />
              </div>
            </div>

            {/* Center - Kaaba icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-2xl">🕋</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Direction</p>
              <p className="text-2xl font-bold text-emerald-700">
                {qiblaDirection !== null ? `${Math.round(qiblaDirection)}°` : '--'}
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Distance</p>
              <p className="text-2xl font-bold text-emerald-700">
                {getDistanceToMecca() ? `${getDistanceToMecca().toLocaleString()} km` : '--'}
              </p>
            </div>
          </div>

          {/* Refresh button */}
          <div className="text-center">
            <Button onClick={getLocation} variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Actualiser la position
            </Button>
          </div>

          {/* Mobile tip */}
          <p className="text-center text-xs text-gray-400 mt-4">
            💡 Sur mobile, tenez votre téléphone à plat pour une meilleure précision
          </p>
        </>
      )}
    </div>
  );
}
