import React from 'react';
import { Atom, Zap, Network } from 'lucide-react';

export function QuantumHeader() {
  return (
    <header className="border-b border-cyan-900/30 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Atom className="w-8 h-8 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
              <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-30" />
            </div>
            <div>
              <h2 className="text-cyan-100">Quantum Transport System</h2>
              <p className="text-cyan-400/60 text-sm">Ternary Elegance Architecture</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#transport" className="text-cyan-300 hover:text-cyan-100 transition-colors flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Transport</span>
            </a>
            <a href="#network" className="text-cyan-300 hover:text-cyan-100 transition-colors flex items-center gap-2">
              <Network className="w-4 h-4" />
              <span>Neural Network</span>
            </a>
            <a href="#simulation" className="text-cyan-300 hover:text-cyan-100 transition-colors">
              Simulation
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
