import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Clock, BookOpen, GraduationCap, User } from 'lucide-react';
import { cn } from "@/lib/utils";
import { createPageUrl } from "@/utils";

interface NavItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  label: string;
  labelAr: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    name: 'Home',
    icon: Home,
    path: '/',
    label: 'Accueil',
    labelAr: 'الرئيسية'
  },
  {
    name: 'Prayer',
    icon: Clock,
    path: '/prayer',
    label: 'Prière',
    labelAr: 'الصلاة'
  },
  {
    name: 'Quran',
    icon: BookOpen,
    path: '/quran',
    label: 'Coran',
    labelAr: 'القرآن'
  },
  {
    name: 'Learn',
    icon: GraduationCap,
    path: '/learn',
    label: 'Apprendre',
    labelAr: 'التعلم'
  },
  {
    name: 'Profile',
    icon: User,
    path: '/profile',
    label: 'Profil',
    labelAr: 'الملف'
  }
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 safe-area-bottom">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center justify-center min-w-[60px] py-2 px-1 rounded-lg transition-all",
                  active
                    ? "text-[#0d9488]"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                )}
              >
                <div className={cn(
                  "relative",
                  active && "scale-110"
                )}>
                  <Icon className={cn(
                    "w-6 h-6 mb-1 transition-all",
                    active && "stroke-[2.5]"
                  )} />
                  {active && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#0d9488] rounded-full" />
                  )}
                </div>
                <span className={cn(
                  "text-xs font-medium transition-all",
                  active && "font-semibold"
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
