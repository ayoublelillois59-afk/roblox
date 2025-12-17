import React from 'react';
import { Crown } from 'lucide-react';
import { cn } from "@/lib/utils";

interface PremiumBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function PremiumBadge({ size = 'sm', className }: PremiumBadgeProps) {
  const sizes = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-full font-semibold",
      sizes[size],
      className
    )}>
      <Crown className={iconSizes[size]} />
      <span>Premium</span>
    </div>
  );
}
