import React from 'react';
import { cn } from "@/lib/utils";

export default function Logo({ size = "md", showText = true }) {
  const sizes = {
    sm: { container: "w-8 h-8", text: "text-sm" },
    md: { container: "w-12 h-12", text: "text-lg" },
    lg: { container: "w-16 h-16", text: "text-2xl" },
  };

  return (
    <div className="flex items-center gap-3">
      <div className={cn(
        "rounded-2xl bg-gradient-to-br from-[#0d9488] to-[#0f766e] flex items-center justify-center shadow-lg",
        sizes[size].container
      )}>
        <div className="text-white font-serif font-bold" style={{ fontSize: size === 'sm' ? '1rem' : size === 'md' ? '1.5rem' : '2rem' }}>
          ☪
        </div>
      </div>
      {showText && (
        <div>
          <h1 className={cn("font-bold text-gray-800", sizes[size].text)}>
            Nour Al-Islam
          </h1>
          <p className="text-xs text-gray-500">نور الإسلام</p>
        </div>
      )}
    </div>
  );
}
