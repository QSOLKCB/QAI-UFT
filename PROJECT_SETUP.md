# QAI-UFT Resonance Lab Project Setup

This document explains how to set up the GitHub Project Board for the QAI-UFT Resonance Lab using the included `project.json` configuration file.

## Overview

The `project.json` file contains the complete definition for the **QAI-UFT Resonance Lab** GitHub Project, which transforms QAI-UFT from a static framework into a living, interactive Resonance Lab where users can explore, hear, and visualize unified-field harmonics.

## Project Structure

### Columns (5)

1. **🧩 Framework Stabilization (v1.1)** - Documentation and release preparation
2. **🎛️ Resonance Lab Web App** - Interactive web interface development
3. **🎶 Live Performance Mode** - Real-time performance integration
4. **🧠 Open Research Network** - Community and research collaboration
5. **🔄 Reflexive Feedback Loop** - Data collection and version planning

### Labels (6)

- `type:audio` - Audio/sound-related features
- `type:visual` - Visualization features
- `type:research` - Research and academic work
- `good first issue` - Beginner-friendly tasks
- `documentation` - Documentation improvements
- `help wanted` - Community help needed

## Setup Instructions

Since GitHub's CLI and API don't support importing complete project structures from JSON files, the project needs to be set up manually or programmatically. Here are the recommended approaches:

### Option 1: Manual Setup (Recommended for immediate use)

1. Navigate to the repository on GitHub
2. Click on the "Projects" tab
3. Click "New project"
4. Select "Board" as the project type
5. Name it "QAI-UFT Resonance Lab"
6. Add the description from `project.json`
7. Create the 5 columns as listed in the JSON
8. Add cards to each column based on the cards array in `project.json`
9. Set up the repository labels under Settings → Labels

### Option 2: Using GitHub CLI + Manual Configuration

```bash
# Create the project
gh project create \
  --owner QSOLKCB \
  --title "QAI-UFT Resonance Lab" \
  --body "Transform QAI-UFT from a static framework into a living, interactive Resonance Lab where users can explore, hear, and visualize unified-field harmonics."

# Then manually add columns and cards through the GitHub web interface
```

### Option 3: Using GitHub GraphQL API

For programmatic setup, use the GitHub GraphQL API with the ProjectsV2 schema. Reference the `project.json` file for the complete structure.

## Project Notes

The following notes are included in the project definition for guidance:

1. **Zenodo Integration**: Enable Zenodo auto-archive for every GitHub release
2. **Deployment**: Use GitHub Actions to deploy /lab to qinn.space
3. **Community**: Connect Discussions → Ideas for community concept threads
4. **Discussion Topics**: 
   - Field as Instrument
   - Microtonal Implementation Guide
   - Ancient Site Frequency Data
   - Quantum Visuals Pipeline

## Contributing

Once the project is set up, team members can:

- Move cards between columns as work progresses
- Add new cards for emerging tasks
- Use labels to categorize issues and PRs
- Link issues and PRs to project cards for automatic tracking

## Questions?

For questions about the project structure or setup, please refer to the `project.json` file or open an issue in the repository.
