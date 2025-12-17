import React from 'react';
import { Crown } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function PremiumBadge({ size = "sm", className }) {
  return (
    <div className={cn(
      "inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-semibold",
      size === "sm" && "text-xs",
      size === "md" && "text-sm",
      className
    )}>
      <Crown className={cn(size === "sm" ? "w-3 h-3" : "w-4 h-4")} />
      <span>Premium</span>
    </div>
  );
}
