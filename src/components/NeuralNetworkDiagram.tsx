import React, { useEffect, useRef } from 'react';
import { Card } from './ui/card';

interface NeuralNetworkDiagramProps {
  isSimulating: boolean;
  networkSize: number;
  entanglementDepth: number;
}

export function NeuralNetworkDiagram({ isSimulating, networkSize, entanglementDepth }: NeuralNetworkDiagramProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const layers = entanglementDepth + 2; // input + hidden + output
    const neuronsPerLayer = networkSize;

    // Pre-define colors to avoid recreation
    const colors = [
      'rgba(34, 211, 238, 0.8)',   // |0⟩ - cyan
      'rgba(168, 85, 247, 0.8)',   // |1⟩ - purple
      'rgba(251, 146, 60, 0.8)'    // |2⟩ - orange
    ];

    const glowColors = [
      'rgba(34, 211, 238, 0.4)',
      'rgba(168, 85, 247, 0.4)',
      'rgba(251, 146, 60, 0.4)'
    ];

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.fillStyle = 'rgba(2, 6, 23, 1)';
      ctx.fillRect(0, 0, width, height);

      const layerSpacing = width / (layers + 1);
      const neuronSpacing = height / (neuronsPerLayer + 1);

      // Store neuron positions
      const positions: { x: number; y: number; state: number }[][] = [];

      // Draw connections first
      for (let l = 0; l < layers; l++) {
        positions[l] = [];
        const x = layerSpacing * (l + 1);

        for (let n = 0; n < neuronsPerLayer; n++) {
          const y = neuronSpacing * (n + 1);
          const state = Math.floor((time * 10 + l + n) % 3);
          positions[l][n] = { x, y, state };

          // Draw connections to next layer
          if (l < layers - 1) {
            for (let nextN = 0; nextN < neuronsPerLayer; nextN++) {
              const nextX = layerSpacing * (l + 2);
              const nextY = neuronSpacing * (nextN + 1);

              const activation = isSimulating 
                ? Math.sin(time * 2 + l + n + nextN) * 0.5 + 0.5
                : 0.3;

              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(nextX, nextY);
              ctx.strokeStyle = `rgba(34, 211, 238, ${activation * 0.3})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }

      // Draw neurons
      for (let l = 0; l < layers; l++) {
        for (let n = 0; n < neuronsPerLayer; n++) {
          const { x, y, state } = positions[l][n];

          // Neuron glow
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
          gradient.addColorStop(0, glowColors[state]);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, 15, 0, Math.PI * 2);
          ctx.fill();

          // Neuron core
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fillStyle = colors[state];
          ctx.fill();

          // Pulse animation when simulating
          if (isSimulating) {
            const pulse = Math.sin(time * 3 + l + n) * 0.3 + 0.7;
            ctx.strokeStyle = colors[state];
            ctx.lineWidth = 2;
            ctx.globalAlpha = pulse * 0.5;
            ctx.beginPath();
            ctx.arc(x, y, 8 + pulse * 3, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Layer labels
      ctx.fillStyle = 'rgba(34, 211, 238, 0.6)';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      for (let l = 0; l < layers; l++) {
        const x = layerSpacing * (l + 1);
        const label = l === 0 ? 'Input' : l === layers - 1 ? 'Output' : `Hidden ${l}`;
        ctx.fillText(label, x, height - 10);
      }

      if (isSimulating) {
        time += 0.03;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isSimulating, networkSize, entanglementDepth]);

  return (
    <Card className="p-6 bg-slate-900/50 border-cyan-900/30 backdrop-blur-sm">
      <div className="space-y-4">
        <div>
          <h3 className="text-cyan-100">Ternary Quantum Neural Network</h3>
          <p className="text-cyan-400/60 text-sm">Qutrit-based neurons with superposition and entanglement routing</p>
        </div>
        
        <div className="relative aspect-square bg-slate-950/50 rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            className="w-full h-full"
          />
          
          <div className="absolute bottom-4 left-4 text-xs text-cyan-400/60">
            {networkSize} neurons per layer • {entanglementDepth + 2} total layers
          </div>
        </div>
      </div>
    </Card>
  );
}
