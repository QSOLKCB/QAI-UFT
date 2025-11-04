import React, { useState } from 'react';
import { QuantumHeader } from './components/QuantumHeader';
import { TransportVisualization } from './components/TransportVisualization';
import { NeuralNetworkDiagram } from './components/NeuralNetworkDiagram';
import { SimulationControls } from './components/SimulationControls';
import { FeatureGrid } from './components/FeatureGrid';
import { QutritStateDisplay } from './components/QutritStateDisplay';
import { TernaryEleganceInfo } from './components/TernaryEleganceInfo';
import { HallucinationMachine } from './components/HallucinationMachine';
import { GlitchControlPanel } from './components/GlitchControlPanel';
import { QSOLUploadDashboard } from './components/QSOLUploadDashboard';

export default function App() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [networkSize, setNetworkSize] = useState(7);
  const [coherence, setCoherence] = useState(85);
  const [entanglementDepth, setEntanglementDepth] = useState(3);

  return (
    <div className="dark min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <QuantumHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-12">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            Quantum AI Neural Network
          </h1>
          <p className="text-cyan-100 max-w-3xl mx-auto">
            Advanced quantum transport system powered by Ternary Elegance Model, 
            utilizing qutrit-based information flow for enhanced neural network computation
          </p>
        </section>

        {/* Main Visualization */}
        <section className="grid lg:grid-cols-2 gap-8">
          <TransportVisualization 
            isSimulating={isSimulating}
            networkSize={networkSize}
            coherence={coherence}
          />
          <NeuralNetworkDiagram 
            isSimulating={isSimulating}
            networkSize={networkSize}
            entanglementDepth={entanglementDepth}
          />
        </section>

        {/* Qutrit State Display */}
        <QutritStateDisplay isSimulating={isSimulating} />

        {/* Simulation Controls */}
        <SimulationControls
          isSimulating={isSimulating}
          setIsSimulating={setIsSimulating}
          networkSize={networkSize}
          setNetworkSize={setNetworkSize}
          coherence={coherence}
          setCoherence={setCoherence}
          entanglementDepth={entanglementDepth}
          setEntanglementDepth={setEntanglementDepth}
        />

        {/* Features Grid */}
        <FeatureGrid />

        {/* Ternary Elegance Info */}
        <TernaryEleganceInfo />

        {/* Hallucination Machine */}
        <HallucinationMachine />

        {/* QSOL Upload Dashboard */}
        <QSOLUploadDashboard />
      </main>

      {/* Glitch Control Panel - Floating */}
      <GlitchControlPanel />

      {/* Footer */}
      <footer className="border-t border-cyan-900/30 bg-slate-950/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8 space-y-6">
          <div className="text-center text-cyan-400/60">
            <p>Quantum Transport System • Ternary Elegance Model • Powered by Qutrit Architecture</p>
          </div>
          
          {/* PayPal Donation Section */}
          <div className="text-center space-y-3 relative z-10">
            <p className="text-cyan-300/80">Support this project</p>
            <form action="https://www.paypal.com/donate" method="post" target="_top" className="inline-block">
              <input type="hidden" name="business" value="deefiveothree@gmail.com" />
              <input type="hidden" name="no_recurring" value="0" />
              <input type="hidden" name="currency_code" value="USD" />
              <input 
                type="image" 
                src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" 
                name="submit" 
                title="PayPal - The safer, easier way to pay online!" 
                alt="Donate with PayPal button"
                className="border-0 cursor-pointer hover:opacity-80 transition-opacity"
              />
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}
