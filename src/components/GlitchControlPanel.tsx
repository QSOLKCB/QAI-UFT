import React, { useState } from 'react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { GlitchPreviewCanvas } from './GlitchPreviewCanvas';

type ASCIIMode = 'OFF' | 'LOW' | 'HIGH';
type SystemState = 'stable' | 'transition' | 'chaos';

export function GlitchControlPanel() {
  const [feedbackLoop, setFeedbackLoop] = useState(false);
  const [lucidity, setLucidity] = useState(0.75);
  const [fractalizationDepth, setFractalizationDepth] = useState(3);
  const [colorPhase, setColorPhase] = useState(180);
  const [asciiMode, setAsciiMode] = useState<ASCIIMode>('OFF');
  const [isMinimized, setIsMinimized] = useState(false);

  // Calculate system state based on parameters
  const getSystemState = (): SystemState => {
    if (!feedbackLoop && lucidity > 0.6) return 'stable';
    if (feedbackLoop || lucidity < 0.3 || fractalizationDepth > 6) return 'chaos';
    return 'transition';
  };

  const systemState = getSystemState();

  const stateColors = {
    stable: { bg: 'bg-green-500', shadow: '0 0 12px rgba(34, 197, 94, 0.8)' },
    transition: { bg: 'bg-amber-500', shadow: '0 0 12px rgba(245, 158, 11, 0.8)' },
    chaos: { bg: 'bg-red-500', shadow: '0 0 12px rgba(239, 68, 68, 0.8)' }
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 transition-all duration-300"
      style={{ width: isMinimized ? 'auto' : '320px' }}
    >
      <Card 
        className="bg-gradient-to-br from-blue-950 via-violet-950 to-blue-900 border-2 border-cyan-400/40 shadow-2xl overflow-hidden"
        style={{
          boxShadow: '0 0 40px rgba(34, 211, 238, 0.3), inset 0 0 60px rgba(139, 92, 246, 0.1)'
        }}
      >
        {/* Header */}
        <div className="bg-black/40 border-b border-cyan-500/30 p-3 flex items-center justify-between backdrop-blur-sm">
          <div className="flex items-center gap-3">
            {/* Status LED */}
            <div
              className={`w-3 h-3 rounded-full ${stateColors[systemState].bg} animate-pulse`}
              style={{ boxShadow: stateColors[systemState].shadow }}
              data-state={systemState}
              aria-label={`System state: ${systemState}`}
            />
            <h3 className="font-mono tracking-wide text-cyan-300 text-sm uppercase">
              Glitch Control Panel
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-6 w-6 p-0 text-cyan-400 hover:bg-cyan-500/20"
          >
            {isMinimized ? '□' : '−'}
          </Button>
        </div>

        {!isMinimized && (
          <div className="p-4 space-y-4">
            {/* Live Preview */}
            <div className="space-y-2">
              <label className="text-cyan-300 text-xs font-mono tracking-wider uppercase">
                Hallucination Output
              </label>
              <div className="bg-black/60 p-2 rounded border border-cyan-500/20">
                <GlitchPreviewCanvas
                  feedbackLoop={feedbackLoop}
                  lucidity={lucidity}
                  fractalizationDepth={fractalizationDepth}
                  colorPhase={colorPhase}
                  asciiMode={asciiMode}
                />
              </div>
            </div>

            {/* Feedback Loop Toggle */}
            <div 
              className="flex items-center justify-between p-3 bg-black/30 border border-cyan-500/20 rounded"
              id="feedback_toggle"
              data-control="feedback-loop"
            >
              <label className="text-cyan-300 text-xs font-mono tracking-wider uppercase">
                Feedback Loop
              </label>
              <Switch
                checked={feedbackLoop}
                onCheckedChange={setFeedbackLoop}
                data-state={feedbackLoop ? 'on' : 'off'}
                className="data-[state=checked]:bg-violet-600"
              />
            </div>

            {/* Lucidity Slider */}
            <div className="space-y-2" id="lucidity_slider" data-control="lucidity">
              <div className="flex justify-between items-center">
                <label className="text-cyan-300 text-xs font-mono tracking-wider uppercase">
                  Lucidity
                </label>
                <span className="text-cyan-200 text-xs font-mono tabular-nums">
                  {lucidity.toFixed(2)}
                </span>
              </div>
              <Slider
                value={[lucidity * 100]}
                onValueChange={([value]) => setLucidity(value / 100)}
                min={0}
                max={100}
                step={1}
                className="glitch-slider"
                data-value={lucidity}
              />
            </div>

            {/* Fractalization Depth Slider */}
            <div className="space-y-2" id="fractal_depth" data-control="fractal-depth">
              <div className="flex justify-between items-center">
                <label className="text-cyan-300 text-xs font-mono tracking-wider uppercase">
                  Fractalization Depth
                </label>
                <span className="text-cyan-200 text-xs font-mono tabular-nums">
                  {fractalizationDepth}
                </span>
              </div>
              <Slider
                value={[fractalizationDepth]}
                onValueChange={([value]) => setFractalizationDepth(value)}
                min={1}
                max={9}
                step={1}
                className="glitch-slider"
                data-value={fractalizationDepth}
              />
            </div>

            {/* Color Phase Shift */}
            <div className="space-y-2" id="color_phase" data-control="color-phase">
              <div className="flex justify-between items-center">
                <label className="text-cyan-300 text-xs font-mono tracking-wider uppercase">
                  Color Phase Shift
                </label>
                <span className="text-cyan-200 text-xs font-mono tabular-nums">
                  {colorPhase}°
                </span>
              </div>
              <Slider
                value={[colorPhase]}
                onValueChange={([value]) => setColorPhase(value)}
                min={0}
                max={360}
                step={5}
                className="glitch-slider"
                data-value={colorPhase}
              />
              {/* Color indicator */}
              <div 
                className="h-2 rounded-full"
                style={{
                  background: `linear-gradient(90deg, hsl(${colorPhase}, 80%, 60%), hsl(${(colorPhase + 60) % 360}, 80%, 60%), hsl(${(colorPhase + 120) % 360}, 80%, 60%))`,
                  boxShadow: `0 0 10px hsla(${colorPhase}, 80%, 60%, 0.5)`
                }}
              />
            </div>

            {/* ASCII Mode Switch */}
            <div className="space-y-2" id="ascii_mode" data-control="ascii-mode">
              <label className="text-cyan-300 text-xs font-mono tracking-wider uppercase">
                ASCII Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['OFF', 'LOW', 'HIGH'] as ASCIIMode[]).map((mode) => (
                  <Button
                    key={mode}
                    onClick={() => setAsciiMode(mode)}
                    variant={asciiMode === mode ? 'default' : 'outline'}
                    size="sm"
                    className={`font-mono text-xs transition-all ${
                      asciiMode === mode
                        ? 'bg-violet-600 text-white border-violet-400 shadow-lg shadow-violet-500/50'
                        : 'bg-black/40 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-400/50'
                    }`}
                    data-mode={mode}
                    data-active={asciiMode === mode}
                  >
                    {mode}
                  </Button>
                ))}
              </div>
            </div>

            {/* System State Indicator */}
            <div className="p-3 bg-black/40 border border-cyan-500/20 rounded text-center">
              <div className="text-xs font-mono tracking-wider">
                <span className="text-cyan-400/60">SYSTEM STATE: </span>
                <span 
                  className={`uppercase ${
                    systemState === 'stable' ? 'text-green-400' :
                    systemState === 'transition' ? 'text-amber-400' :
                    'text-red-400'
                  }`}
                  style={{
                    textShadow: systemState === 'chaos' ? '0 0 8px rgba(239, 68, 68, 0.8)' : 'none'
                  }}
                >
                  {systemState}
                </span>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
