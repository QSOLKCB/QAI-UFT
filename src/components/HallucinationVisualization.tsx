import React, { useEffect, useRef } from 'react';

interface HallucinationVisualizationProps {
  lucidity: number;
  confidence: number;
  noiseGain: number;
  errorAmplification: number;
  feedbackLoop: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  hue: number;
}

interface GeometryShape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  type: 'triangle' | 'circle' | 'polygon';
  alpha: number;
  hue: number;
  distortion: number;
}

const shapes: GeometryShape[] = [];
const particles: Particle[] = [];

for (let i = 0; i < 5; i++) {
  shapes.push({
    x: Math.random() * 600 + 50,
    y: Math.random() * 400 + 50,
    size: Math.random() * 80 + 40,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.02,
    type: ['triangle', 'circle', 'polygon'][Math.floor(Math.random() * 3)] as any,
    alpha: 0.3 + Math.random() * 0.3,
    hue: Math.random() > 0.5 ? 140 : 300,
    distortion: 0
  });
}

for (let i = 0; i < 30; i++) {
  particles.push({
    x: Math.random() * 700,
    y: Math.random() * 500,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    size: Math.random() * 3 + 1,
    alpha: Math.random() * 0.8 + 0.2,
    hue: Math.random() > 0.5 ? 140 : 300
  });
}

export function HallucinationVisualization({
  lucidity,
  confidence,
  noiseGain,
  errorAmplification,
  feedbackLoop
}: HallucinationVisualizationProps) {
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

      // Calculate instability factors
      const instability = (100 - lucidity) / 100;
      const chaos = feedbackLoop ? 1.5 : 0.5;
      const noise = noiseGain / 100;
      const error = errorAmplification;

      // Clear with trail effect
      ctx.fillStyle = `rgba(0, 0, 0, ${0.1 + instability * 0.2})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add noise overlay
      if (noise > 0.1) {
        ctx.fillStyle = `rgba(0, 255, 100, ${noise * 0.05})`;
        for (let i = 0; i < 20; i++) {
          ctx.fillRect(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            2,
            2
          );
        }
      }

      // Update and draw particles
      particles.forEach(p => {
        p.x += p.vx * (1 + chaos * 0.5);
        p.y += p.vy * (1 + chaos * 0.5);

        if (feedbackLoop) {
          p.vx += (Math.random() - 0.5) * 0.5;
          p.vy += (Math.random() - 0.5) * 0.5;
        }

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${p.alpha * confidence})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw geometry shapes
      shapes.forEach(shape => {
        shape.rotation += shape.rotationSpeed * (1 + chaos);
        shape.distortion = instability * error * Math.sin(frame * 0.05);

        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);

        const distortX = Math.sin(frame * 0.03 + shape.x) * shape.distortion * 10;
        const distortY = Math.cos(frame * 0.03 + shape.y) * shape.distortion * 10;
        ctx.translate(distortX, distortY);

        // Chromatic aberration when feedback loop is on
        if (feedbackLoop) {
          // Red channel
          ctx.strokeStyle = `hsla(0, 100%, 50%, ${shape.alpha * 0.3})`;
          ctx.lineWidth = 2;
          drawShape(ctx, shape, -2, -2);

          // Cyan channel
          ctx.strokeStyle = `hsla(180, 100%, 50%, ${shape.alpha * 0.3})`;
          drawShape(ctx, shape, 2, 2);
        }

        // Main shape
        ctx.strokeStyle = `hsla(${shape.hue}, 100%, 60%, ${shape.alpha})`;
        ctx.lineWidth = 2;
        drawShape(ctx, shape, 0, 0);

        ctx.restore();
      });

      // Draw central waveform
      ctx.strokeStyle = `hsla(140, 100%, 60%, ${confidence * 0.8})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height / 2 + 
                  Math.sin(x * 0.02 + frame * 0.05) * 30 * (1 + instability) +
                  Math.sin(x * 0.05 + frame * 0.03) * 20 * chaos +
                  (Math.random() - 0.5) * noise * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Glitch effect
      if (feedbackLoop && Math.random() > 0.9) {
        const glitchY = Math.random() * canvas.height;
        const glitchHeight = Math.random() * 50 + 10;
        const imageData = ctx.getImageData(0, glitchY, canvas.width, glitchHeight);
        ctx.putImageData(imageData, (Math.random() - 0.5) * 20, glitchY);
      }

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [lucidity, confidence, noiseGain, errorAmplification, feedbackLoop]);

  return (
    <canvas
      ref={canvasRef}
      width={700}
      height={500}
      className="w-full h-full rounded-lg"
      style={{
        filter: feedbackLoop ? 'contrast(1.2) saturate(1.5)' : 'none',
        imageRendering: 'crisp-edges'
      }}
    />
  );
}

function drawShape(ctx: CanvasRenderingContext2D, shape: GeometryShape, offsetX: number, offsetY: number) {
  ctx.beginPath();
  
  if (shape.type === 'circle') {
    ctx.arc(offsetX, offsetY, shape.size, 0, Math.PI * 2);
  } else if (shape.type === 'triangle') {
    ctx.moveTo(offsetX, offsetY - shape.size);
    ctx.lineTo(offsetX + shape.size, offsetY + shape.size);
    ctx.lineTo(offsetX - shape.size, offsetY + shape.size);
    ctx.closePath();
  } else if (shape.type === 'polygon') {
    const sides = 6;
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2;
      const x = offsetX + Math.cos(angle) * shape.size;
      const y = offsetY + Math.sin(angle) * shape.size;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }
  
  ctx.stroke();
}
