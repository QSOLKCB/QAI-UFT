import React, { useState, useEffect } from 'react';

interface StatusLineProps {
  feedbackLoop: boolean;
  confidence: number;
}

const statusMessages = [
  'interpreting self-noise…',
  'signal confidence: {confidence}%',
  'hallucination stable',
  'observer feedback corrupted',
  'pattern recognition nominal',
  'recursive loop detected',
  'sensory drift: minimal',
  'reality anchor holding',
  'perception matrix synchronized',
  'delusion threshold: acceptable'
];

export function StatusLine({ feedbackLoop, confidence }: StatusLineProps) {
  const [currentMessage, setCurrentMessage] = useState(statusMessages[0]);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage = statusMessages[Math.floor(Math.random() * statusMessages.length)];
      const message = randomMessage.replace('{confidence}', Math.floor(confidence * 100).toString());
      setCurrentMessage(message);

      // Trigger glitch effect occasionally
      if (feedbackLoop && Math.random() > 0.7) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 200);
      }
    }, feedbackLoop ? 2000 : 4000);

    return () => clearInterval(interval);
  }, [feedbackLoop, confidence]);

  const glitchText = (text: string) => {
    if (!glitch) return text;
    return text
      .split('')
      .map((char) => (Math.random() > 0.7 ? String.fromCharCode(33 + Math.floor(Math.random() * 94)) : char))
      .join('');
  };

  return (
    <div className="font-mono text-xs tracking-wide overflow-hidden">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
        <span
          className={`text-green-400/80 transition-all ${glitch ? 'text-magenta-500' : ''}`}
          style={{
            textShadow: glitch ? '2px 0 #0ff, -2px 0 #f0f' : 'none',
            transform: glitch ? 'translateX(2px)' : 'none'
          }}
        >
          {glitchText(currentMessage)}
        </span>
      </div>
    </div>
  );
}
