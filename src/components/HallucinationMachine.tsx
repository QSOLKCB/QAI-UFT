import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { HallucinationVisualization } from './HallucinationVisualization';
import { HallucinationControls } from './HallucinationControls';
import { SensorIndicators } from './SensorIndicators';
import { StatusLine } from './StatusLine';

export function HallucinationMachine() {
  const [lucidity, setLucidity] = useState(75);
  const [confidence, setConfidence] = useState(0.65);
  const [noiseGain, setNoiseGain] = useState(25);
  const [errorAmplification, setErrorAmplification] = useState(1.5);
  const [feedbackLoop, setFeedbackLoop] = useState(false);
  const [purgeFailed, setPurgeFailed] = useState(false);
  const [titleGlitch, setTitleGlitch] = useState(false);
  const [calibrationMode, setCalibrationMode] = useState(true);

  // Title glitch animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleGlitch(Math.random() > 0.8);
      setCalibrationMode(prev => !prev);
    }, feedbackLoop ? 500 : 2000);

    return () => clearInterval(interval);
  }, [feedbackLoop]);

  const handlePurgeMemory = () => {
    setPurgeFailed(true);
    setTimeout(() => {
      setPurgeFailed(false);
    }, 2000);
  };

  return (
    <section className="relative" id="hallucination_machine">
      {/* Background scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-green-500 to-transparent animate-pulse" 
             style={{ backgroundSize: '100% 4px', backgroundRepeat: 'repeat' }} />
      </div>

      <Card className="relative bg-black border-2 border-green-500/40 shadow-[0_0_30px_rgba(34,197,94,0.2)] overflow-hidden">
        {/* CRT Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-magenta-500/5 pointer-events-none" />
        
        {/* Header */}
        <div className="border-b border-green-500/30 p-6 bg-black/60 backdrop-blur-sm">
          <div className="text-center space-y-2">
            <h2 
              className={`font-mono tracking-[0.3em] transition-all duration-100 ${
                titleGlitch 
                  ? 'text-magenta-500 text-shadow-glitch' 
                  : 'text-green-400'
              }`}
              style={{
                textShadow: titleGlitch 
                  ? '2px 0 #0ff, -2px 0 #f0f, 0 0 20px #0f0' 
                  : '0 0 10px rgba(34, 197, 94, 0.5)',
                transform: titleGlitch ? 'translateX(2px)' : 'none'
              }}
            >
              HALLUCINATION MACHINE
            </h2>
            <div className="text-xs font-mono tracking-wider">
              <span className={`transition-opacity ${calibrationMode ? 'opacity-100' : 'opacity-0'}`}>
                {calibrationMode ? '[ CALIBRATION MODE ]' : '[ SELF-OSCILLATION ]'}
              </span>
              <span className={`absolute transition-opacity ${!calibrationMode ? 'opacity-100' : 'opacity-0'}`}>
                {!calibrationMode ? '[ SELF-OSCILLATION ]' : '[ CALIBRATION MODE ]'}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Sensor Indicators */}
          <div className="flex justify-center pb-4">
            <SensorIndicators feedbackLoop={feedbackLoop} />
          </div>

          {/* Central Visualization and Controls */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Visualization */}
            <div className="lg:col-span-2">
              <Card className="bg-black border border-green-500/30 p-4 relative overflow-hidden" id="core_viz">
                {/* Noise overlay */}
                {feedbackLoop && (
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
                      animation: 'noise 0.2s infinite'
                    }}
                  />
                )}
                
                <HallucinationVisualization
                  lucidity={lucidity}
                  confidence={confidence}
                  noiseGain={noiseGain}
                  errorAmplification={errorAmplification}
                  feedbackLoop={feedbackLoop}
                />

                {/* Scanline overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 197, 94, 0.1) 2px, rgba(34, 197, 94, 0.1) 4px)'
                  }}
                />
              </Card>
            </div>

            {/* Controls */}
            <div>
              <HallucinationControls
                lucidity={lucidity}
                setLucidity={setLucidity}
                confidence={confidence}
                setConfidence={setConfidence}
                noiseGain={noiseGain}
                setNoiseGain={setNoiseGain}
                errorAmplification={errorAmplification}
                setErrorAmplification={setErrorAmplification}
                feedbackLoop={feedbackLoop}
                setFeedbackLoop={setFeedbackLoop}
                onPurgeMemory={handlePurgeMemory}
                purgeFailed={purgeFailed}
              />
            </div>
          </div>

          {/* Status Line */}
          <div className="border-t border-green-500/20 pt-4">
            <StatusLine feedbackLoop={feedbackLoop} confidence={confidence} />
          </div>
        </div>

        {/* Chromatic aberration edge effect */}
        {feedbackLoop && (
          <div className="absolute inset-0 pointer-events-none border-4 border-transparent"
               style={{
                 boxShadow: 'inset 2px 2px 0 rgba(255, 0, 255, 0.3), inset -2px -2px 0 rgba(0, 255, 255, 0.3)'
               }} />
        )}
      </Card>

      <style jsx>{`
        @keyframes noise {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
        }
      `}</style>
    </section>
  );
}
