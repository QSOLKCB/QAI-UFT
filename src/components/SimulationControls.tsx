import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface SimulationControlsProps {
  isSimulating: boolean;
  setIsSimulating: (value: boolean) => void;
  networkSize: number;
  setNetworkSize: (value: number) => void;
  coherence: number;
  setCoherence: (value: number) => void;
  entanglementDepth: number;
  setEntanglementDepth: (value: number) => void;
}

export function SimulationControls({
  isSimulating,
  setIsSimulating,
  networkSize,
  setNetworkSize,
  coherence,
  setCoherence,
  entanglementDepth,
  setEntanglementDepth
}: SimulationControlsProps) {
  const handleReset = () => {
    setIsSimulating(false);
    setNetworkSize(7);
    setCoherence(85);
    setEntanglementDepth(3);
  };

  return (
    <Card className="p-8 bg-slate-900/50 border-cyan-900/30 backdrop-blur-sm" id="simulation">
      <div className="space-y-6">
        <div>
          <h3 className="text-cyan-100">Simulation Controls</h3>
          <p className="text-cyan-400/60 text-sm">Configure and control quantum transport simulation parameters</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Network Size */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-cyan-200">Network Size</label>
              <span className="text-cyan-400 tabular-nums">{networkSize}</span>
            </div>
            <Slider
              value={[networkSize]}
              onValueChange={(value) => setNetworkSize(value[0])}
              min={3}
              max={12}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-cyan-400/50">Number of qutrit neurons per layer</p>
          </div>

          {/* Coherence */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-cyan-200">Coherence</label>
              <span className="text-cyan-400 tabular-nums">{coherence}%</span>
            </div>
            <Slider
              value={[coherence]}
              onValueChange={(value) => setCoherence(value[0])}
              min={0}
              max={100}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-cyan-400/50">Quantum state coherence level</p>
          </div>

          {/* Entanglement Depth */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-cyan-200">Entanglement Depth</label>
              <span className="text-cyan-400 tabular-nums">{entanglementDepth}</span>
            </div>
            <Slider
              value={[entanglementDepth]}
              onValueChange={(value) => setEntanglementDepth(value[0])}
              min={1}
              max={6}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-cyan-400/50">Number of hidden layers</p>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-4 pt-4 border-t border-cyan-900/30">
          <Button
            onClick={() => setIsSimulating(!isSimulating)}
            className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2"
          >
            {isSimulating ? (
              <>
                <Pause className="w-4 h-4" />
                Pause Simulation
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Simulation
              </>
            )}
          </Button>

          <Button
            onClick={handleReset}
            variant="outline"
            className="border-cyan-700 text-cyan-300 hover:bg-cyan-900/30 gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>

          <div className="ml-auto flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-green-400 animate-pulse' : 'bg-slate-600'}`} />
            <span className="text-sm text-cyan-400/60">
              {isSimulating ? 'Simulating' : 'Idle'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
