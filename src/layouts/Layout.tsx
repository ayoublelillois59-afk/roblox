import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BottomNav from '@/components/BottomNav';
import LoadingScreen from '@/pages/LoadingScreen';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading screen only on first load
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const showBottomNav = !location.pathname.includes('/premium') && !location.pathname.includes('/loading');

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap');

        :root {
          --font-arabic: 'Amiri', serif;
          --font-sans: 'Inter', sans-serif;
        }

        body {
          font-family: var(--font-sans);
        }

        .font-serif {
          font-family: var(--font-arabic);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }

        /* Smooth transitions */
        * {
          transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }

        /* Arabic text direction support */
        [dir="rtl"] {
          direction: rtl;
          text-align: right;
        }

        /* Main brand color */
        .brand-color {
          background-color: #0d9488;
        }

        /* Safe area for mobile devices */
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
      <main className={cn("pb-20", !showBottomNav && "pb-0")}>
        {children}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}
