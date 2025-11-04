import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface QutritStateDisplayProps {
  isSimulating: boolean;
}

const stateLabels = ['|0⟩', '|1⟩', '|2⟩'];
const stateColors = [
  'from-cyan-500 to-cyan-700',
  'from-purple-500 to-purple-700',
  'from-orange-500 to-orange-700'
];
const stateBorders = ['border-cyan-500', 'border-purple-500', 'border-orange-500'];

export function QutritStateDisplay({ isSimulating }: QutritStateDisplayProps) {
  const [states, setStates] = useState([
    { id: 1, state: 0, amplitude: 0.577, phase: 0 },
    { id: 2, state: 1, amplitude: 0.577, phase: 120 },
    { id: 3, state: 2, amplitude: 0.577, phase: 240 }
  ]);

  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setStates(prev => prev.map(s => ({
        ...s,
        amplitude: Math.random() * 0.8 + 0.2,
        phase: (s.phase + Math.random() * 10) % 360
      })));
    }, 200);

    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <Card className="p-6 bg-slate-900/50 border-cyan-900/30 backdrop-blur-sm">
      <div className="space-y-6">
        <div>
          <h3 className="text-cyan-100">Qutrit State Monitor</h3>
          <p className="text-cyan-400/60 text-sm">Real-time amplitude and phase visualization for ternary quantum states</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {states.map((qutrit, index) => (
            <div key={qutrit.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={`${stateBorders[index]} text-cyan-100`}>
                  State {stateLabels[index]}
                </Badge>
                <span className="text-xs text-cyan-400/60">Qutrit #{qutrit.id}</span>
              </div>

              {/* Amplitude Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-cyan-300">Amplitude</span>
                  <span className="text-cyan-400 tabular-nums">{qutrit.amplitude.toFixed(3)}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${stateColors[index]} transition-all duration-200`}
                    style={{ width: `${qutrit.amplitude * 100}%` }}
                  />
                </div>
              </div>

              {/* Phase Display */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-cyan-300">Phase</span>
                  <span className="text-cyan-400 tabular-nums">{qutrit.phase.toFixed(1)}°</span>
                </div>
                <div className="relative h-24 bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`w-16 h-16 rounded-full border-4 ${stateBorders[index]} relative transition-transform duration-200`}
                      style={{ transform: `rotate(${qutrit.phase}deg)` }}
                    >
                      <div className={`absolute top-1/2 left-1/2 w-1 h-8 bg-gradient-to-b ${stateColors[index]} origin-bottom -translate-x-1/2 -translate-y-full`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* State Vector */}
              <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                <p className="text-xs text-cyan-400/60 mb-1">State Vector</p>
                <code className="text-xs text-cyan-300 font-mono">
                  {qutrit.amplitude.toFixed(3)}e^(i·{(qutrit.phase * Math.PI / 180).toFixed(2)}π)
                </code>
              </div>
            </div>
          ))}
        </div>

        {/* Normalization Info */}
        <div className="pt-4 border-t border-cyan-900/30">
          <div className="flex items-center justify-between text-sm">
            <span className="text-cyan-300">Total Probability</span>
            <span className="text-cyan-400 tabular-nums">
              {states.reduce((sum, s) => sum + s.amplitude * s.amplitude, 0).toFixed(3)}
            </span>
          </div>
          <p className="text-xs text-cyan-400/50 mt-1">
            Σ|ψᵢ|² ≈ 1 (Normalized quantum state)
          </p>
        </div>
      </div>
    </Card>
  );
}
