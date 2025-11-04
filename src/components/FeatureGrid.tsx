import React from 'react';
import { Card } from './ui/card';
import { Layers, Zap, Shield, Cpu, Network, Binary } from 'lucide-react';

const features = [
  {
    icon: Layers,
    title: 'Ternary State Logic',
    description: 'Utilizes qutrits (|0⟩, |1⟩, |2⟩) instead of qubits for 50% higher information density per quantum node',
    color: 'text-cyan-400'
  },
  {
    icon: Zap,
    title: 'Superposition Routing',
    description: 'Enables quantum parallelism through simultaneous state processing across all three basis states',
    color: 'text-purple-400'
  },
  {
    icon: Shield,
    title: 'Coherence Protection',
    description: 'Advanced quantum noise correction and decoherence mitigation for stable state transfer',
    color: 'text-orange-400'
  },
  {
    icon: Cpu,
    title: 'Adaptive Gates',
    description: 'Ternary generalizations of Hadamard and rotation gates optimized for qutrit operations',
    color: 'text-cyan-400'
  },
  {
    icon: Network,
    title: 'Entanglement Network',
    description: 'Multi-layer quantum entanglement for enhanced correlation and information flow',
    color: 'text-purple-400'
  },
  {
    icon: Binary,
    title: 'Amplitude Encoding',
    description: 'Efficient data encoding using quantum state amplitudes for high-dimensional feature spaces',
    color: 'text-orange-400'
  }
];

export function FeatureGrid() {

  return (
    <section>
      <div className="text-center mb-8">
        <h3 className="text-cyan-100 mb-2">System Features</h3>
        <p className="text-cyan-400/60">Advanced capabilities of the Ternary Elegance Model</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="p-6 bg-slate-900/50 border-cyan-900/30 backdrop-blur-sm hover:border-cyan-700/50 transition-all duration-300 group"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className={`p-3 bg-slate-950/50 rounded-lg ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-cyan-100">{feature.title}</h4>
                <p className="text-cyan-400/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
