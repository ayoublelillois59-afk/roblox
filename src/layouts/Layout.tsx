import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BottomNav from '@/components/BottomNav';
import LoadingScreen from '@/pages/LoadingScreen';
import { recordVisit } from '@/services/stats';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    recordVisit();
    // Écran d'accueil uniquement au premier chargement
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  const hideNav =
    location.pathname.includes('/premium') || location.pathname.includes('/loading');

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-ivory">
      <main>{children}</main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
