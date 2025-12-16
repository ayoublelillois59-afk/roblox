export function createPageUrl(pageName: string): string {
  const routes: Record<string, string> = {
    'Home': '/',
    'Adhkar': '/adhkar',
    'Dhikr': '/dhikr',
    'Qibla': '/qibla',
    'Quran': '/quran',
    'PrayerTimes': '/prayer-times',
  };

  return routes[pageName] || '/';
}

export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
