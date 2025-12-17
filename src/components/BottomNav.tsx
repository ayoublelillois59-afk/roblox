import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Clock, GraduationCap, Settings } from 'lucide-react';
import { createPageUrl } from "@/utils";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: 'settings', label: 'Réglages', icon: Settings, page: 'Settings' },
  { id: 'home', label: 'Accueil', icon: Home, page: 'Home' },
  { id: 'quran', label: 'Coran', icon: BookOpen, page: 'Quran' },
  { id: 'prayer', label: 'Prière', icon: Clock, page: 'Prayer' },
  { id: 'learn', label: 'Apprendre', icon: GraduationCap, page: 'Learn' },
];

export default function BottomNav() {
  const location = useLocation();

  const isActive = (page: string) => {
    return location.pathname === createPageUrl(page);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const active = isActive(item.page);

            return (
              <Link
                key={item.id}
                to={createPageUrl(item.page)}
                className={cn(
                  "flex flex-col items-center py-3 px-4 min-w-[64px] transition-colors relative",
                  active
                    ? "text-[#0d9488]"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                <Icon className={cn(
                  "w-6 h-6 mb-1 transition-transform",
                  active && "scale-110"
                )} />
                <span className="text-xs font-medium">{item.label}</span>
                {active && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#0d9488] rounded-t-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
