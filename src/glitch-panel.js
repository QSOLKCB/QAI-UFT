/**
 * Glitch Control Panel - Interactive Logic
 * Ready for WebSocket/Serial Bridge Integration
 */

// State management
const state = {
  feedbackLoop: false,
  lucidity: 0.75,
  fractalizationDepth: 3,
  colorPhase: 180,
  asciiMode: 'OFF',
  isMinimized: false
};

// ASCII characters for noise
const ASCIIChars = '░▒▓█▄▀■□●○◆◇△▲';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initControls();
  initCanvas();
  updateSystemState();
  
  // Set initial ASCII mode
  setASCIIMode('OFF');
});

// Initialize all controls
function initControls() {
  // Minimize button
  const minimizeBtn = document.querySelector('[data-action="toggle-minimize"]');
  minimizeBtn?.addEventListener('click', toggleMinimize);

  // Feedback loop toggle
  const feedbackInput = document.getElementById('feedback-input');
  feedbackInput?.addEventListener('change', (e) => {
    state.feedbackLoop = e.target.checked;
    updateFeedbackState();
    updateSystemState();
    broadcastState('feedback-loop', state.feedbackLoop);
  });

  // Lucidity slider
  const luciditySlider = document.querySelector('[data-param="lucidity"]');
  luciditySlider?.addEventListener('input', (e) => {
    state.lucidity = parseFloat(e.target.value);
    document.querySelector('[data-display="lucidity"]').textContent = state.lucidity.toFixed(2);
    updateSystemState();
    broadcastState('lucidity', state.lucidity);
  });

  // Fractalization depth slider
  const fractalSlider = document.querySelector('[data-param="fractal-depth"]');
  fractalSlider?.addEventListener('input', (e) => {
    state.fractalizationDepth = parseInt(e.target.value);
    document.querySelector('[data-display="fractal-depth"]').textContent = state.fractalizationDepth;
    updateSystemState();
    broadcastState('fractal-depth', state.fractalizationDepth);
  });

  // Color phase slider
  const colorSlider = document.querySelector('[data-param="color-phase"]');
  colorSlider?.addEventListener('input', (e) => {
    state.colorPhase = parseInt(e.target.value);
    document.querySelector('[data-display="color-phase"]').textContent = state.colorPhase + '°';
    updateColorIndicator();
    broadcastState('color-phase', state.colorPhase);
  });

  // ASCII mode buttons
  const modeButtons = document.querySelectorAll('.mode-button');
  modeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const mode = e.target.getAttribute('data-mode');
      setASCIIMode(mode);
      broadcastState('ascii-mode', mode);
    });
  });

  // Initialize color indicator
  updateColorIndicator();
}

// Toggle minimize
function toggleMinimize() {
  state.isMinimized = !state.isMinimized;
  const panel = document.querySelector('.glitch-control-panel');
  const btn = document.querySelector('[data-action="toggle-minimize"]');
  
  if (state.isMinimized) {
    panel.classList.add('minimized');
    btn.textContent = '□';
  } else {
    panel.classList.remove('minimized');
    btn.textContent = '−';
  }
}

// Update feedback loop state
function updateFeedbackState() {
  const switchEl = document.querySelector('.switch');
  switchEl?.setAttribute('data-state', state.feedbackLoop ? 'on' : 'off');
}

// Set ASCII mode
function setASCIIMode(mode) {
  state.asciiMode = mode;
  const buttons = document.querySelectorAll('.mode-button');
  buttons.forEach(btn => {
    btn.setAttribute('data-active', btn.getAttribute('data-mode') === mode);
  });
}

// Update color indicator
function updateColorIndicator() {
  const indicator = document.querySelector('.color-indicator');
  const hue = state.colorPhase;
  const gradient = `linear-gradient(90deg, 
    hsl(${hue}, 80%, 60%), 
    hsl(${(hue + 60) % 360}, 80%, 60%), 
    hsl(${(hue + 120) % 360}, 80%, 60%)
  )`;
  indicator.style.background = gradient;
  indicator.style.boxShadow = `0 0 10px hsla(${hue}, 80%, 60%, 0.5)`;
}

// Calculate and update system state
function updateSystemState() {
  let systemState = 'stable';
  
  if (state.feedbackLoop || state.lucidity < 0.3 || state.fractalizationDepth > 6) {
    systemState = 'chaos';
  } else if (!state.feedbackLoop && state.lucidity > 0.6) {
    systemState = 'stable';
  } else {
    systemState = 'transition';
  }

  // Update LED
  const ledLight = document.querySelector('.led-light');
  ledLight.className = 'led-light led-' + systemState;

  // Update state display
  const stateValue = document.querySelector('.state-value');
  stateValue.setAttribute('data-state', systemState);
  stateValue.textContent = systemState.toUpperCase();

  // Update data attribute for external systems
  document.querySelector('[data-state]')?.setAttribute('data-state', systemState);

  return systemState;
}

// Canvas visualization
let animationFrame;
let frameCount = 0;
const shapes = [];

function initCanvas() {
  const canvas = document.getElementById('hallucination_output');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Initialize shapes
  for (let i = 0; i < 5; i++) {
    shapes.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: 40 + i * 10,
      rotation: 0,
      rotationSpeed: (i + 1) * 0.01,
      type: ['triangle', 'circle', 'hexagon'][i % 3]
    });
  }

  // Start animation
  animate(canvas, ctx);
}

function animate(canvas, ctx) {
  frameCount++;

  const chaos = state.feedbackLoop ? 1 : 0;
  const stability = state.lucidity;
  const fractalIntensity = state.fractalizationDepth / 9;
  const hueShift = state.colorPhase;
  const baseHue = chaos ? (180 + hueShift) % 360 : hueShift;

  // Clear with fade
  ctx.fillStyle = `rgba(0, 0, 30, ${0.2 + chaos * 0.3})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw fractal geometry
  for (let i = 0; i < state.fractalizationDepth; i++) {
    const shape = shapes[i % shapes.length];
    const scale = 1 - i * 0.1;
    
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(shape.rotation);
    ctx.scale(scale, scale);

    // Distortion
    const distort = (1 - stability) * 20 * chaos;
    ctx.translate(
      Math.sin(frameCount * 0.05) * distort,
      Math.cos(frameCount * 0.05) * distort
    );

    // Draw shape
    ctx.strokeStyle = `hsla(${(baseHue + i * 40) % 360}, 80%, 60%, ${0.3 + stability * 0.4})`;
    ctx.lineWidth = 2;
    drawShape(ctx, shape, fractalIntensity);

    ctx.restore();

    // Update rotation
    shape.rotation += shape.rotationSpeed * (1 + chaos);
  }

  // Waveform
  ctx.strokeStyle = `hsla(${baseHue}, 100%, 60%, ${stability * 0.8})`;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let x = 0; x < canvas.width; x += 3) {
    const y = canvas.height / 2 + 
              Math.sin(x * 0.05 + frameCount * 0.05) * 15 * (1 + chaos) +
              Math.sin(x * 0.1 + frameCount * 0.03) * 10 * fractalIntensity;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // ASCII noise
  if (state.asciiMode !== 'OFF') {
    const density = state.asciiMode === 'LOW' ? 20 : 10;
    ctx.fillStyle = `hsla(${baseHue}, 100%, 70%, ${state.asciiMode === 'LOW' ? 0.3 : 0.6})`;
    ctx.font = '8px monospace';
    
    for (let y = 0; y < canvas.height; y += density) {
      for (let x = 0; x < canvas.width; x += density) {
        if (Math.random() > stability) {
          const char = ASCIIChars[Math.floor(Math.random() * ASCIIChars.length)];
          ctx.fillText(char, x, y);
        }
      }
    }
  }

  // Glitch effect
  if (state.feedbackLoop && Math.random() > 0.85) {
    const y = Math.random() * canvas.height;
    const h = 20;
    const imageData = ctx.getImageData(0, y, canvas.width, h);
    ctx.putImageData(imageData, (Math.random() - 0.5) * 30, y);
  }

  animationFrame = requestAnimationFrame(() => animate(canvas, ctx));
}

function drawShape(ctx, shape, fractalIntensity) {
  ctx.beginPath();
  
  if (shape.type === 'circle') {
    ctx.arc(0, 0, shape.size, 0, Math.PI * 2);
  } else if (shape.type === 'triangle') {
    ctx.moveTo(0, -shape.size);
    ctx.lineTo(shape.size, shape.size);
    ctx.lineTo(-shape.size, shape.size);
    ctx.closePath();
  } else if (shape.type === 'hexagon') {
    const sides = 6;
    for (let i = 0; i <= sides; i++) {
      const angle = (i / sides) * Math.PI * 2;
      const x = Math.cos(angle) * shape.size * (1 + Math.sin(frameCount * 0.03) * fractalIntensity * 0.3);
      const y = Math.sin(angle) * shape.size * (1 + Math.cos(frameCount * 0.03) * fractalIntensity * 0.3);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
  }
  
  ctx.stroke();
}

// WebSocket/Serial Bridge Integration
function broadcastState(param, value) {
  // Emit custom event for external systems to listen to
  const event = new CustomEvent('glitch-panel-update', {
    detail: {
      parameter: param,
      value: value,
      timestamp: Date.now(),
      fullState: { ...state }
    }
  });
  document.dispatchEvent(event);

  // Log for debugging (remove in production)
  console.log(`[Glitch Panel] ${param}:`, value);

  // Example WebSocket integration (uncomment and configure)
  /*
  if (window.glitchWebSocket && window.glitchWebSocket.readyState === WebSocket.OPEN) {
    window.glitchWebSocket.send(JSON.stringify({
      type: 'parameter-update',
      parameter: param,
      value: value,
      state: state
    }));
  }
  */

  // Example Serial integration (uncomment and configure)
  /*
  if (window.serialPort && window.serialPort.writable) {
    const encoder = new TextEncoder();
    const writer = window.serialPort.writable.getWriter();
    const message = `${param}:${value}\n`;
    writer.write(encoder.encode(message));
    writer.releaseLock();
  }
  */
}

// External API for programmatic control
window.GlitchPanel = {
  setState: (newState) => {
    Object.assign(state, newState);
    updateSystemState();
    updateColorIndicator();
  },
  getState: () => ({ ...state }),
  subscribe: (callback) => {
    document.addEventListener('glitch-panel-update', (e) => callback(e.detail));
  }
};
