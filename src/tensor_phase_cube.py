#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
QSOL-IMC φ = π/2 Tensor Phase Cube Simulation
Author: Trent Slade / QSOL-KCB
Repo: https://github.com/QSOLKCB/QAI-UFT
License: MIT
"""

import numpy as np

def tensor_phase_cube(size=6, phi=np.pi/2, tau_steps=200, freq=1.0, seed=42):
    """
    Simulate a φ=π/2 self-dual tensor lattice over time τ.

    Args:
        size (int): lattice dimension (N×N×N)
        phi (float): phase lock angle (default π/2)
        tau_steps (int): number of temporal evolution steps
        freq (float): base oscillation frequency
        seed (int): RNG seed for deterministic runs

    Returns:
        np.ndarray: (τ, N, N, N) complex tensor field
    """
    np.random.seed(seed)
    ψ = np.zeros((tau_steps, size, size, size), dtype=np.complex128)

    # coordinate grid
    x, y, z = np.meshgrid(
        np.linspace(-1, 1, size),
        np.linspace(-1, 1, size),
        np.linspace(-1, 1, size),
        indexing="ij"
    )

    # orthogonal resonance seed
    base = np.exp(1j * (x + y + z) * phi)

    for τ in range(tau_steps):
        t = τ / tau_steps
        ψ[τ] = base * np.exp(1j * (phi * np.sin(2*np.pi*freq*t)))
        ψ[τ] *= np.exp(-1j * phi)  # enforce self-duality

    return ψ


if __name__ == "__main__":
    cube = tensor_phase_cube()
    print("Tensor Phase Cube shape:", cube.shape)
    print("Sample amplitude:", np.abs(cube[0, 3, 3, 3]))
    print("Sample phase:", np.angle(cube[0, 3, 3, 3]))
