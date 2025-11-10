# Appendix: Tensor Phase Cube Simulation — φ = π / 2 Self-Dual Framework

## Overview
This appendix provides an executable example of the **Tensor Phase Cube**, the φ-locked tensor field introduced in the main *UFT Framework* paper.  
The model demonstrates how orthogonal phase symmetry (φ = π/2) produces self-dual harmonic stability across real (x), conjugate (ψ), and temporal (τ) dimensions.

---

## Mathematical Foundation
\[
T(x, ψ, τ) = e^{iφ(x + ψ)} \, e^{iφ \sin(2π f τ)}
\]

where  
- \(φ = π/2\) defines orthogonality (quadrature symmetry)  
- \(f\) is the base resonance frequency  
- \(τ\) is the evolution axis (temporal coherence)

Invariance under φ-rotation:

\[
T^\* = e^{i(π/2)} T \Rightarrow |T|^2 = \text{constant}
\]

Thus, total field energy remains conserved — information is phase-shifted, not lost.

---

````markdown
## NumPy Implementation
```python
import numpy as np
from tensor_phase_cube import tensor_phase_cube

cube = tensor_phase_cube(size=6, tau_steps=200)
print("Tensor Phase Cube shape:", cube.shape)
````

---

## Interpretation

| Axis        | Domain          | Function                        |
| ----------- | --------------- | ------------------------------- |
| **x**       | Real geometry   | Differential structure of space |
| **ψ**       | Conjugate field | Imaginary dual (phase symmetry) |
| **τ**       | Temporal domain | Coherence and evolution         |
| **φ = π/2** | Coupling phase  | Locks system into resonance     |

Each tensor node (T_i) behaves as a **harmonic oscillator** coupled via φ-phase symmetry, forming a *Spectral Algebraic manifold* — an audible geometry of truth.

---

## Usage

```bash
$ python src/tensor_phase_cube.py
Tensor Phase Cube shape: (200, 6, 6, 6)
Sample amplitude: 1.0
Sample phase: 1.57079632679
```
