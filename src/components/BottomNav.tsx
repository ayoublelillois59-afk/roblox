import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BookOpen, Moon, TrendingUp, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { id: 'home', label: 'Accueil', icon: Home, path: '/' },
  { id: 'quran', label: 'Coran', icon: BookOpen, path: '/quran' },
  { id: 'prayer', label: 'Prière', icon: Moon, path: '/prayer' },
  { id: 'progress', label: 'Progression', icon: TrendingUp, path: '/progression' },
  { id: 'profile', label: 'Profil', icon: User, path: '/profile' },
];

export default function BottomNav() {
  const location = useLocation();

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      <div className="mx-auto max-w-lg px-4 pb-3">
        <div className="flex items-center justify-around rounded-card border border-hairline bg-ivory-50/85 px-1 py-2 shadow-float backdrop-blur-xl">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.id}
                to={item.path}
                className="relative flex min-w-[56px] flex-col items-center gap-0.5 px-2 py-1.5"
              >
                {active && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-x-0 -top-0.5 bottom-0 rounded-tile bg-sand"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon
                  strokeWidth={1.75}
                  className={cn(
                    'relative z-10 h-[22px] w-[22px] transition-colors duration-200',
                    active ? 'text-forest' : 'text-faint'
                  )}
                />
                <span
                  className={cn(
                    'relative z-10 text-[10px] font-medium transition-colors duration-200',
                    active ? 'text-ink' : 'text-faint'
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
