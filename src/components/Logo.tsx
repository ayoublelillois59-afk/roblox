import React from 'react';

export default function Logo() {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0d9488] to-[#0f766e] flex items-center justify-center mx-auto mb-2 shadow-lg">
        <span className="text-2xl text-white">☪</span>
      </div>
      <h1 className="text-xl font-bold text-gray-800">Nour Al-Islam</h1>
      <p className="text-xs text-gray-600">نور الإسلام</p>
    </div>
  );
}
