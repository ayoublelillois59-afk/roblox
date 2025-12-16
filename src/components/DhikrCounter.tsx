import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RotateCcw, Plus, Minus } from 'lucide-react';

export default function DhikrCounter() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [history, setHistory] = useState<number[]>([]);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);

    // Vibration feedback on mobile
    if ('vibrate' in navigator && newCount % 33 === 0) {
      navigator.vibrate(100);
    }
  };

  const reset = () => {
    if (count > 0) {
      setHistory([count, ...history.slice(0, 9)]); // Keep last 10
    }
    setCount(0);
  };

  const changeTarget = (amount: number) => {
    const newTarget = Math.max(1, target + amount);
    setTarget(newTarget);
  };

  const progress = (count / target) * 100;

  return (
    <div className="space-y-6">
      {/* Main Counter */}
      <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-emerald-100">
        {/* Progress Ring */}
        <div className="relative w-64 h-64 mx-auto mb-6">
          <svg className="transform -rotate-90 w-64 h-64">
            {/* Background circle */}
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="#10b981"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 120}`}
              strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
            />
          </svg>

          {/* Counter Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl font-bold text-gray-800">{count}</span>
            <span className="text-sm text-gray-500 mt-1">/ {target}</span>
          </div>
        </div>

        {/* Target Selector */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => changeTarget(-1)}
            className="rounded-full"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium text-gray-600 min-w-[80px] text-center">
            Objectif: {target}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => changeTarget(1)}
            className="rounded-full"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={increment}
            className="flex-1 h-16 text-lg bg-emerald-600 hover:bg-emerald-700"
          >
            Compter
          </Button>
          <Button
            onClick={reset}
            variant="outline"
            size="icon"
            className="h-16 w-16"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>

        {/* Quick Targets */}
        <div className="mt-6 flex gap-2 justify-center">
          {[33, 99, 100].map((num) => (
            <Button
              key={num}
              variant={target === num ? "default" : "outline"}
              size="sm"
              onClick={() => setTarget(num)}
            >
              {num}
            </Button>
          ))}
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h3 className="font-semibold text-gray-800 mb-4">📊 Historique</h3>
          <div className="grid grid-cols-5 gap-2">
            {history.map((h, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-lg p-3 text-center"
              >
                <span className="text-lg font-semibold text-gray-700">{h}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
