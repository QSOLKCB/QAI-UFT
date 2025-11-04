import React from 'react';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { Switch } from './ui/switch';

interface HallucinationControlsProps {
  lucidity: number;
  setLucidity: (value: number) => void;
  confidence: number;
  setConfidence: (value: number) => void;
  noiseGain: number;
  setNoiseGain: (value: number) => void;
  errorAmplification: number;
  setErrorAmplification: (value: number) => void;
  feedbackLoop: boolean;
  setFeedbackLoop: (value: boolean) => void;
  onPurgeMemory: () => void;
  purgeFailed: boolean;
}

export function HallucinationControls({
  lucidity,
  setLucidity,
  confidence,
  setConfidence,
  noiseGain,
  setNoiseGain,
  errorAmplification,
  setErrorAmplification,
  feedbackLoop,
  setFeedbackLoop,
  onPurgeMemory,
  purgeFailed
}: HallucinationControlsProps) {
  return (
    <div className="space-y-6 p-6 bg-black/80 border border-green-500/30 rounded-lg backdrop-blur-sm font-mono">
      <div className="text-center border-b border-green-500/20 pb-4">
        <h3 className="text-green-400 tracking-wider text-sm">CONTROL PANEL</h3>
      </div>

      {/* Lucidity Slider */}
      <div className="space-y-2" id="lucidity_slider">
        <div className="flex justify-between items-center">
          <label className="text-green-400 text-xs tracking-wide">LUCIDITY</label>
          <span className="text-green-300 text-xs tabular-nums">{lucidity.toFixed(0)}</span>
        </div>
        <Slider
          value={[lucidity]}
          onValueChange={([value]) => setLucidity(value)}
          min={0}
          max={100}
          step={1}
          className="slider-hallucination"
        />
      </div>

      {/* Confidence Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-green-400 text-xs tracking-wide">CONFIDENCE</label>
          <span className="text-green-300 text-xs tabular-nums">{confidence.toFixed(2)}</span>
        </div>
        <Slider
          value={[confidence * 100]}
          onValueChange={([value]) => setConfidence(value / 100)}
          min={0}
          max={100}
          step={1}
          className="slider-hallucination"
        />
      </div>

      {/* Noise Gain Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-green-400 text-xs tracking-wide">NOISE GAIN</label>
          <span className="text-green-300 text-xs tabular-nums">{noiseGain.toFixed(0)} dB</span>
        </div>
        <Slider
          value={[noiseGain]}
          onValueChange={([value]) => setNoiseGain(value)}
          min={0}
          max={100}
          step={1}
          className="slider-hallucination"
        />
      </div>

      {/* Error Amplification Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-green-400 text-xs tracking-wide">ERROR AMPLIFICATION</label>
          <span className="text-green-300 text-xs tabular-nums">{errorAmplification.toFixed(1)}×</span>
        </div>
        <Slider
          value={[errorAmplification * 10]}
          onValueChange={([value]) => setErrorAmplification(value / 10)}
          min={0}
          max={50}
          step={1}
          className="slider-hallucination"
        />
      </div>

      {/* Feedback Loop Toggle */}
      <div className="flex items-center justify-between p-3 bg-black/50 border border-green-500/20 rounded" id="feedback_toggle">
        <label className="text-green-400 text-xs tracking-wide">FEEDBACK LOOP</label>
        <Switch
          checked={feedbackLoop}
          onCheckedChange={setFeedbackLoop}
          className="data-[state=checked]:bg-magenta-600"
        />
      </div>

      {/* Purge Memory Button */}
      <Button
        onClick={onPurgeMemory}
        className={`w-full font-mono text-xs tracking-wider transition-all ${
          purgeFailed
            ? 'bg-red-600/80 hover:bg-red-700 border-red-500 text-white animate-pulse'
            : 'bg-black border border-green-500/50 text-green-400 hover:bg-green-950/50 hover:border-green-400'
        }`}
        variant="outline"
      >
        {purgeFailed ? '⚠ PURGE FAILED' : 'PURGE MEMORY'}
      </Button>
    </div>
  );
}
