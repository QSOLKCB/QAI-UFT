import React from 'react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

export function TernaryEleganceInfo() {
  return (
    <section>
      <div className="text-center mb-8">
        <h3 className="text-cyan-100 mb-2">Ternary Elegance Model</h3>
        <p className="text-cyan-400/60">Deep dive into quantum transport architecture and algorithms</p>
      </div>

      <Card className="p-8 bg-slate-900/50 border-cyan-900/30 backdrop-blur-sm">
        <Tabs defaultValue="architecture" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-950/50">
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="algorithm">Algorithm</TabsTrigger>
            <TabsTrigger value="encoding">Encoding</TabsTrigger>
          </TabsList>

          <TabsContent value="architecture" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-cyan-100 mb-3">Quantum Transport Architecture</h4>
                <p className="text-cyan-300/80 leading-relaxed">
                  The Ternary Elegance Model leverages qutrit-based quantum states to achieve superior 
                  information density compared to traditional qubit systems. Each quantum neuron operates 
                  in a 3-dimensional Hilbert space, enabling richer state representations.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950/50 rounded-lg border border-cyan-900/20">
                  <Badge variant="outline" className="border-cyan-500 text-cyan-300 mb-3">
                    Input Layer
                  </Badge>
                  <p className="text-sm text-cyan-400/70">
                    Encodes classical or quantum data into qutrit states using amplitude, 
                    angle, or basis encoding schemes
                  </p>
                </div>

                <div className="p-4 bg-slate-950/50 rounded-lg border border-purple-900/20">
                  <Badge variant="outline" className="border-purple-500 text-purple-300 mb-3">
                    Hidden Layers
                  </Badge>
                  <p className="text-sm text-cyan-400/70">
                    Apply ternary rotation gates and create entanglement between qutrit neurons 
                    for quantum parallel processing
                  </p>
                </div>

                <div className="p-4 bg-slate-950/50 rounded-lg border border-orange-900/20">
                  <Badge variant="outline" className="border-orange-500 text-orange-300 mb-3">
                    Transport Layer
                  </Badge>
                  <p className="text-sm text-cyan-400/70">
                    Manages coherent transfer of quantum information between layers while 
                    maintaining entanglement
                  </p>
                </div>

                <div className="p-4 bg-slate-950/50 rounded-lg border border-cyan-900/20">
                  <Badge variant="outline" className="border-cyan-500 text-cyan-300 mb-3">
                    Output Layer
                  </Badge>
                  <p className="text-sm text-cyan-400/70">
                    Performs qutrit measurements to extract classical predictions or quantum states 
                    for downstream tasks
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="algorithm" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-cyan-100 mb-3">Quantum Transport Algorithm</h4>
                <p className="text-cyan-300/80 leading-relaxed mb-6">
                  The transport algorithm orchestrates qutrit state evolution through the neural network, 
                  maintaining quantum properties while enabling efficient information flow.
                </p>
              </div>

              <div className="p-6 bg-slate-950/50 rounded-lg border border-cyan-900/20 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="text-cyan-200 mb-1">Initialize Quantum Register</p>
                    <code className="text-xs text-cyan-400/70 font-mono block">
                      |ψ⟩ = |0⟩₁ ⊗ |0⟩₂ ⊗ ... ⊗ |0⟩ₙ
                    </code>
                    <p className="text-xs text-cyan-400/60 mt-1">
                      Initialize n qutrits in ground state |0⟩
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="text-cyan-200 mb-1">Apply Ternary Rotation Gates</p>
                    <code className="text-xs text-cyan-400/70 font-mono block">
                      R(θ, φ) = exp(-i(θX + φZ))
                    </code>
                    <p className="text-xs text-cyan-400/60 mt-1">
                      Rotate qutrit states based on learned weights θ and φ
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="text-cyan-200 mb-1">Create Entanglement</p>
                    <code className="text-xs text-cyan-400/70 font-mono block">
                      CTRL-U(i,j) |ψ⟩ → entangled state
                    </code>
                    <p className="text-xs text-cyan-400/60 mt-1">
                      Apply controlled-unitary gates between qutrit pairs
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white">
                    4
                  </div>
                  <div className="flex-1">
                    <p className="text-cyan-200 mb-1">Transport & Measurement</p>
                    <code className="text-xs text-cyan-400/70 font-mono block">
                      M|ψ⟩ → classical output
                    </code>
                    <p className="text-xs text-cyan-400/60 mt-1">
                      Propagate through layers and measure output qutrits
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="encoding" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-cyan-100 mb-3">Data Encoding Schemes</h4>
                <p className="text-cyan-300/80 leading-relaxed mb-6">
                  Multiple encoding methods transform classical data into quantum states for processing 
                  by the ternary neural network.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 bg-slate-950/50 rounded-lg border border-cyan-900/20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    <h5 className="text-cyan-200">Basis Encoding</h5>
                  </div>
                  <p className="text-sm text-cyan-400/70 mb-3">
                    Maps classical states directly to computational basis states
                  </p>
                  <div className="space-y-1 text-xs font-mono text-cyan-300/80">
                    <div>0 → |0⟩</div>
                    <div>1 → |1⟩</div>
                    <div>2 → |2⟩</div>
                  </div>
                </div>

                <div className="p-5 bg-slate-950/50 rounded-lg border border-purple-900/20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                    <h5 className="text-purple-200">Amplitude Encoding</h5>
                  </div>
                  <p className="text-sm text-cyan-400/70 mb-3">
                    Encodes data in state amplitudes for high-dimensional features
                  </p>
                  <div className="text-xs font-mono text-cyan-300/80">
                    |ψ⟩ = α|0⟩ + β|1⟩ + γ|2⟩ where |α|² + |β|² + |γ|² = 1
                  </div>
                </div>

                <div className="p-5 bg-slate-950/50 rounded-lg border border-orange-900/20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                    <h5 className="text-orange-200">Angle Encoding</h5>
                  </div>
                  <p className="text-sm text-cyan-400/70 mb-3">
                    Uses rotation angles to represent continuous values
                  </p>
                  <div className="text-xs font-mono text-cyan-300/80">
                    R(θ)|0⟩ where θ = 2π × (feature_value / max_value)
                  </div>
                </div>
              </div>

              <div className="p-4 bg-cyan-950/20 rounded-lg border border-cyan-700/30">
                <p className="text-sm text-cyan-300/90">
                  <span className="text-cyan-200">Information Advantage:</span> Ternary encoding 
                  provides log₂(3) ≈ 1.585 bits per qutrit vs 1 bit per qubit, a 58.5% improvement 
                  in information density.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </section>
  );
}
