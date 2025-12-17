export function createPageUrl(pageName: string): string {
  const routes: Record<string, string> = {
    'Home': '/',
    'Adhkar': '/adhkar',
    'Dhikr': '/dhikr',
    'Learn': '/learn',
    'Names': '/names',
    'Prayer': '/prayer',
    'Premium': '/premium',
    'Qibla': '/qibla',
    'Quran': '/quran',
    'Settings': '/settings',
    'Tajweed': '/tajweed',
    'Profile': '/profile',
    'LoadingScreen': '/loading',
  };

  return routes[pageName] || '/';
}

export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
