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

## NumPy Implementation
```python
import numpy as np
from tensor_phase_cube import tensor_phase_cube

cube = tensor_phase_cube(size=6, tau_steps=200)
print("Tensor Phase Cube shape:", cube.shape)
