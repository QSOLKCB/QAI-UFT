import React, { useEffect, useRef } from 'react';
import { Card } from './ui/card';

interface TransportVisualizationProps {
  isSimulating: boolean;
  networkSize: number;
  coherence: number;
}

export function TransportVisualization({ isSimulating, networkSize, coherence }: TransportVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Ternary state colors (pre-calculate with current coherence)
      const alpha = coherence / 100;
      const colors = [
        `rgba(34, 211, 238, ${alpha})`,   // |0⟩ - cyan
        `rgba(168, 85, 247, ${alpha})`,   // |1⟩ - purple
        `rgba(251, 146, 60, ${alpha})`    // |2⟩ - orange
      ];

      // Draw quantum transport particles
      const particles = networkSize * 3;
      for (let i = 0; i < particles; i++) {
        const angle = (i / particles) * Math.PI * 2 + time * 0.5;
        const radius = 100 + Math.sin(time + i) * 30;
        const x = width / 2 + Math.cos(angle) * radius;
        const y = height / 2 + Math.sin(angle) * radius;

        const stateIndex = i % 3;

        // Draw particle
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = colors[stateIndex];
        ctx.fill();

        // Draw glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
        gradient.addColorStop(0, colors[stateIndex]);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();

        // Draw entanglement lines
        if (i > 0 && i % 3 === 0) {
          const prevAngle = ((i - 1) / particles) * Math.PI * 2 + time * 0.5;
          const prevX = width / 2 + Math.cos(prevAngle) * (100 + Math.sin(time + i - 1) * 30);
          const prevY = height / 2 + Math.sin(prevAngle) * (100 + Math.sin(time + i - 1) * 30);

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(prevX, prevY);
          ctx.strokeStyle = `rgba(34, 211, 238, ${0.2 * coherence / 100})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw central nucleus
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 20, 0, Math.PI * 2);
      const centralGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, 20);
      centralGradient.addColorStop(0, 'rgba(168, 85, 247, 0.8)');
      centralGradient.addColorStop(1, 'rgba(168, 85, 247, 0.1)');
      ctx.fillStyle = centralGradient;
      ctx.fill();

      if (isSimulating) {
        time += 0.02;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isSimulating, networkSize, coherence]);

  return (
    <Card className="p-6 bg-slate-900/50 border-cyan-900/30 backdrop-blur-sm">
      <div className="space-y-4">
        <div>
          <h3 className="text-cyan-100">Quantum Transport Layer</h3>
          <p className="text-cyan-400/60 text-sm">Real-time visualization of qutrit state transfer and entanglement</p>
        </div>
        
        <div className="relative aspect-square bg-slate-950/50 rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            className="w-full h-full"
          />
          
          <div className="absolute top-4 right-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-cyan-400" />
              <span className="text-cyan-300">|0⟩ State</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-purple-400" />
              <span className="text-purple-300">|1⟩ State</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-orange-400" />
              <span className="text-orange-300">|2⟩ State</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
