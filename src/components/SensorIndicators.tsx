import React, { useState, useEffect } from 'react';

interface SensorIndicatorsProps {
  feedbackLoop: boolean;
}

export function SensorIndicators({ feedbackLoop }: SensorIndicatorsProps) {
  const [voidFlicker, setVoidFlicker] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVoidFlicker(Math.random() > 0.7);
    }, feedbackLoop ? 300 : 1000);

    return () => clearInterval(interval);
  }, [feedbackLoop]);

  const sensors = [
    { name: 'AUDIO', active: true, color: 'bg-green-500' },
    { name: 'VIDEO', active: true, color: 'bg-green-500' },
    { name: 'SELF', active: true, color: 'bg-green-500' },
    { name: 'VOID', active: !voidFlicker, color: voidFlicker ? 'bg-red-500' : 'bg-green-500' }
  ];

  return (
    <div className="flex items-center gap-6 font-mono">
      {sensors.map((sensor) => (
        <div key={sensor.name} className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${sensor.color} ${
              sensor.active ? 'animate-pulse' : 'opacity-30'
            }`}
            style={{
              boxShadow: sensor.active
                ? `0 0 8px ${sensor.color === 'bg-green-500' ? '#22c55e' : '#ef4444'}`
                : 'none'
            }}
          />
          <span className={`text-xs tracking-wider ${sensor.active ? 'text-green-400' : 'text-red-400/60'}`}>
            {sensor.name}
          </span>
        </div>
      ))}
    </div>
  );
}
