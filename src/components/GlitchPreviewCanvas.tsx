import React, { useEffect, useRef } from 'react';

interface GlitchPreviewCanvasProps {
  feedbackLoop: boolean;
  lucidity: number;
  fractalizationDepth: number;
  colorPhase: number;
  asciiMode: 'OFF' | 'LOW' | 'HIGH';
}

const ASCIIChars = '░▒▓█▄▀■□●○◆◇△▲';

export function GlitchPreviewCanvas({
  feedbackLoop,
  lucidity,
  fractalizationDepth,
  colorPhase,
  asciiMode
}: GlitchPreviewCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;

    const draw = () => {
      frameRef.current++;
      const frame = frameRef.current;

      const chaos = feedbackLoop ? 1 : 0;
      const stability = lucidity;
      const fractalIntensity = fractalizationDepth / 9;

      // Clear with fade effect
      ctx.fillStyle = `rgba(0, 0, 30, ${0.2 + chaos * 0.3})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Color inversion when feedback loop is active
      const hueShift = colorPhase;
      const baseHue = chaos ? (180 + hueShift) % 360 : hueShift;

      // Draw fractal geometry
      for (let i = 0; i < fractalizationDepth; i++) {
        const scale = 1 - i * 0.1;
        const rotation = frame * 0.01 * (i + 1) * (1 + chaos);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);
        ctx.scale(scale, scale);

        // Distortion
        const distort = (1 - stability) * 20 * chaos;
        ctx.translate(
          Math.sin(frame * 0.05) * distort,
          Math.cos(frame * 0.05) * distort
        );

        // Draw fractal shape
        ctx.strokeStyle = `hsla(${(baseHue + i * 40) % 360}, 80%, 60%, ${0.3 + stability * 0.4})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        const sides = 6;
        const radius = 40 + i * 10;
        for (let j = 0; j <= sides; j++) {
          const angle = (j / sides) * Math.PI * 2;
          const x = Math.cos(angle) * radius * (1 + Math.sin(frame * 0.03 + i) * fractalIntensity * 0.3);
          const y = Math.sin(angle) * radius * (1 + Math.cos(frame * 0.03 + i) * fractalIntensity * 0.3);
          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.restore();
      }

      // Waveform
      ctx.strokeStyle = `hsla(${baseHue}, 100%, 60%, ${stability * 0.8})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 3) {
        const y = canvas.height / 2 + 
                  Math.sin(x * 0.05 + frame * 0.05) * 15 * (1 + chaos) +
                  Math.sin(x * 0.1 + frame * 0.03) * 10 * fractalIntensity;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // ASCII noise overlay
      if (asciiMode !== 'OFF') {
        const density = asciiMode === 'LOW' ? 10 : 5;
        ctx.fillStyle = `hsla(${baseHue}, 100%, 70%, ${asciiMode === 'LOW' ? 0.3 : 0.6})`;
        ctx.font = '10px monospace';
        
        for (let y = 0; y < canvas.height; y += density) {
          for (let x = 0; x < canvas.width; x += density) {
            if (Math.random() > stability) {
              const char = ASCIIChars[Math.floor(Math.random() * ASCIIChars.length)];
              ctx.fillText(char, x, y);
            }
          }
        }
      }

      // Glitch effect
      if (feedbackLoop && Math.random() > 0.85) {
        const y = Math.random() * canvas.height;
        const h = 20;
        const imageData = ctx.getImageData(0, y, canvas.width, h);
        ctx.putImageData(imageData, (Math.random() - 0.5) * 30, y);
      }

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [feedbackLoop, lucidity, fractalizationDepth, colorPhase, asciiMode]);

  return (
    <canvas
      ref={canvasRef}
      width={280}
      height={200}
      id="hallucination_output"
      data-component="preview-canvas"
      className="w-full h-full rounded border border-cyan-500/30"
      style={{
        filter: feedbackLoop ? 'contrast(1.3) saturate(1.4)' : 'none',
        boxShadow: feedbackLoop ? '0 0 20px rgba(0, 255, 255, 0.3)' : 'none'
      }}
    />
  );
}
