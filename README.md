# QAI-UFT (Quantum AI Unified Field Framework)
# QSOL Unified Field Framework: Resonance as Embodied Physics


**DOI**:
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.17520187.svg)](https://doi.org/10.5281/zenodo.17520187)
**Author**: Trent Slade (QSOL Research Initiative)  
**License**: CC BY 4.0 
![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)

## Overview
This working paper and asset bundle align Unified Field concepts with acoustic/architectural practice and ritual performance. It includes a one-pager PDF, frequency mappings, and three visual encodings:
- Sexagesimal ring (base-60 phase)
- Trinary Digital DNA (base-3)
- Codon wheel (mod 64)

## Files
- `QSOL_UFT_Framework.pdf` — main document with visuals
- `archaeoacoustic_digital_dna_full.csv` — site frequencies + mappings
- `sexagesimal_ring_vivid.png`, `sexagesimal_ring_muted.png`
- `trinary_dna_vivid.png`, `trinary_dna_muted.png`
- `codon_wheel_vivid.png`, `codon_wheel_muted.png`
- `codon_cluster_report.txt` — repeated mod-64 bins

## How to Reproduce
1. Use the CSV as input for analysis or alternative plotting.
2. Map any new frequency `f` via:
   - `seg = f % 60`  (sexagesimal phase)
   - `codon = f % 64` (codon slot)
   - `trits = base3(f)` (Digital DNA string)
3. Look for clusters at segments ~10, 22, 44–55 and codon bins with repeats.

## Citation
Slade, T. (2025). *QSOL Unified Field Framework: Resonance as Embodied Physics*. Zenodo. https://doi.org/(assigned at publish)

---

## 🔗 Project Links

- 🌐 **Live Site:** [qainn.space](https://qainn.space)  
- 🧬 **Research Record:** [Zenodo DOI 10.5281/zenodo.17520187](https://doi.org/10.5281/zenodo.17520187)  
- 🧠 **QSOL Research Hub:** [QSOL-IMC GitHub Org](https://github.com/QSOLKCB)

---

## 🚀 Running the Code

```bash
npm i
npm run dev
This will install dependencies and start the development server.

🧩 Overview
QAI-UFT extends the Quantum AI Neural Network concept with:

Harmonic-field mapping modules based on Unified Field Theory analogies

Trinary and sexagesimal encoders for acoustic-frequency data

Visualization hooks for Figma exports and ritual-architecture layouts

Microtonal tuning utilities for sound synthesis and psychoacoustic modeling

The framework bridges scientific visualization, creative computation, and resonant field design — forming the software backbone of the QSOL Unified Field Framework: Resonance as Embodied Physics.

📜 License
Creative Commons Attribution 4.0 International (CC BY 4.0)
© 2025 Trent Slade (QSOL-IMC)

📣 Citation
If you reference this work in publications or projects, please cite:

Slade, T. (2025). QSOL Unified Field Framework: Resonance as Embodied Physics. Zenodo. https://doi.org/10.5281/zenodo.17520187

✴️ QSOL Motto
Small is Beautiful. Fast is Holy. Transparent by Design.
