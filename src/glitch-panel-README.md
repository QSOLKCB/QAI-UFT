# Glitch Control Panel - Standalone Module

## 📦 Deliverables

This module provides a self-contained, pure HTML/CSS/JS implementation of the Glitch Control Panel for the Quantum AI Neural Network system.

### Files Included:
- `glitch-panel.html` - Semantic HTML structure
- `glitch-panel.css` - Pure CSS styling (no framework dependencies)
- `glitch-panel.js` - Interactive logic and WebSocket/Serial bridge ready
- `glitch-panel-README.md` - This documentation

---

## 🎛️ Components

### Interactive Controls:
1. **Feedback Loop Toggle** (`#feedback_toggle`)
   - ON/OFF switch for chaos mode
   - Data attribute: `data-control="feedback-loop"`

2. **Lucidity Slider** (`#lucidity_slider`)
   - Range: 0.00 - 1.00 (float)
   - Data attribute: `data-control="lucidity"`

3. **Fractalization Depth** (`#fractal_depth`)
   - Range: 1 - 9 (integer)
   - Data attribute: `data-control="fractal-depth"`

4. **Color Phase Shift** (`#color_phase`)
   - Range: 0° - 360° (degrees)
   - Data attribute: `data-control="color-phase"`
   - Includes live color preview gradient

5. **ASCII Mode Switch** (`#ascii_mode`)
   - Options: OFF / LOW / HIGH
   - Data attribute: `data-control="ascii-mode"`

6. **Live Canvas Preview** (`#hallucination_output`)
   - Real-time visualization
   - 280x200px canvas
   - Data attribute: `data-component="preview-canvas"`

### State Indicators:
- **3-State LED** - Visual system health indicator
  - 🟢 Green = Stable
  - 🟡 Amber = Transition
  - 🔴 Red = Chaos
  - Data attribute: `data-state="[stable|transition|chaos]"`

---

## 🎨 Visual Theme

- **Background**: Midnight blue → violet gradient
- **Accent Colors**: Cyber-aqua (#67e8f9), Violet (#7c3aed)
- **Effects**: Glow borders, bloom effects, subtle pulsing
- **Typography**: Monospace (Courier New)

---

## 🔌 Integration Guide

### WebSocket Integration

Uncomment the WebSocket section in `glitch-panel.js`:

```javascript
// Initialize WebSocket connection
window.glitchWebSocket = new WebSocket('ws://your-server:port');

window.glitchWebSocket.onopen = () => {
  console.log('Connected to Glitch Panel WebSocket');
};

window.glitchWebSocket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Handle incoming commands
  if (data.type === 'set-state') {
    window.GlitchPanel.setState(data.state);
  }
};
```

### Serial Bridge Integration

For Arduino/hardware control:

```javascript
// Request serial port
const port = await navigator.serial.requestPort();
await port.open({ baudRate: 9600 });

window.serialPort = port;

// Serial data format: "parameter:value\n"
// Example: "lucidity:0.75\n"
```

### Custom Events

Listen to parameter changes:

```javascript
document.addEventListener('glitch-panel-update', (e) => {
  console.log('Parameter:', e.detail.parameter);
  console.log('Value:', e.detail.value);
  console.log('Full State:', e.detail.fullState);
});
```

### Programmatic Control

Control the panel via JavaScript API:

```javascript
// Set state
window.GlitchPanel.setState({
  feedbackLoop: true,
  lucidity: 0.5,
  fractalizationDepth: 7,
  colorPhase: 270,
  asciiMode: 'HIGH'
});

// Get current state
const currentState = window.GlitchPanel.getState();

// Subscribe to changes
window.GlitchPanel.subscribe((detail) => {
  console.log('Update:', detail);
});
```

---

## 📡 Data Attributes Reference

All interactive elements include `data-*` attributes for external scripting:

| Element | Attribute | Values |
|---------|-----------|--------|
| Panel | `data-component` | `"glitch-panel"` |
| Canvas | `data-component` | `"preview-canvas"` |
| LED | `data-state` | `"stable"` \| `"transition"` \| `"chaos"` |
| Feedback Toggle | `data-control` | `"feedback-loop"` |
| Feedback Toggle | `data-state` | `"on"` \| `"off"` |
| Lucidity | `data-control` | `"lucidity"` |
| Lucidity | `data-value` | `0.00 - 1.00` |
| Fractal Depth | `data-control` | `"fractal-depth"` |
| Fractal Depth | `data-value` | `1 - 9` |
| Color Phase | `data-control` | `"color-phase"` |
| Color Phase | `data-value` | `0 - 360` |
| ASCII Mode | `data-control` | `"ascii-mode"` |
| ASCII Buttons | `data-mode` | `"OFF"` \| `"LOW"` \| `"HIGH"` |
| ASCII Buttons | `data-active` | `"true"` \| `"false"` |

---

## 🎯 System State Logic

The LED indicator and system state are calculated based on:

```javascript
if (feedbackLoop || lucidity < 0.3 || fractalizationDepth > 6) {
  systemState = 'chaos';  // 🔴 Red LED
} else if (!feedbackLoop && lucidity > 0.6) {
  systemState = 'stable'; // 🟢 Green LED
} else {
  systemState = 'transition'; // 🟡 Amber LED
}
```

---

## 🚀 Deployment

### Standalone Usage:
1. Open `glitch-panel.html` in a modern browser
2. All functionality works client-side
3. No build process required

### Embedding in Existing Projects:
1. Include CSS in `<head>`:
   ```html
   <link rel="stylesheet" href="glitch-panel.css">
   ```

2. Add HTML structure to your page

3. Include JS before closing `</body>`:
   ```html
   <script src="glitch-panel.js"></script>
   ```

### React Integration:
The React component version is available in the main project:
- `GlitchControlPanel.tsx` - Main component
- `GlitchPreviewCanvas.tsx` - Canvas visualization

---

## 🎬 Behavioral Notes

### Feedback Loop = ON:
- Visualization drifts into chaos
- Colors invert (hue shift + 180°)
- Geometry fractalizes
- Glitch effects intensify
- LED turns red (chaos state)

### Lucidity < 0.3:
- Unstable waveforms
- Increased distortion
- ASCII noise becomes visible
- System enters transition/chaos

### Fractalization Depth > 6:
- Multiple geometry layers
- Complex patterns emerge
- Performance may vary
- System complexity increases

### ASCII Mode:
- **OFF**: Clean visualization
- **LOW**: Sparse ASCII overlay (density: 20px)
- **HIGH**: Dense ASCII noise (density: 10px)

---

## 📱 Responsive Design

The panel automatically adjusts for mobile:
- **Desktop**: Fixed 320px width, bottom-right corner
- **Mobile**: Full width minus 48px margin
- **Minimized**: Auto-width (header only)

---

## 🛠️ Customization

### Change Position:
```css
.glitch-control-panel {
  /* Change from bottom-right to top-left */
  top: 24px;
  left: 24px;
  bottom: auto;
  right: auto;
}
```

### Adjust Colors:
```css
:root {
  --cyan-primary: #67e8f9;
  --violet-primary: #7c3aed;
  --blue-dark: #1e3a8a;
  --violet-dark: #4c1d95;
}
```

### Modify Canvas Size:
```html
<canvas id="hallucination_output" width="400" height="300"></canvas>
```

---

## 🔬 Technical Specifications

- **Pure HTML/CSS/JS** - No dependencies
- **Canvas API** - Hardware-accelerated rendering
- **60 FPS** target animation
- **Event-driven architecture** - Easy integration
- **Semantic markup** - Accessible and SEO-friendly
- **Data attributes** - External system ready

---

## 📋 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

Requires:
- Canvas 2D API
- CSS Custom Properties
- ES6+ JavaScript
- CustomEvent API

---

## 🐛 Troubleshooting

### Canvas not animating:
- Check browser console for errors
- Ensure `hallucination_output` ID is present
- Verify requestAnimationFrame support

### Controls not responding:
- Check data attributes match expected values
- Verify event listeners are attached
- Inspect console for JavaScript errors

### WebSocket not connecting:
- Uncomment WebSocket code in `glitch-panel.js`
- Update connection URL
- Check CORS and network policies

---

## 📄 License

MIT License - Free for commercial and personal use

---

## 🎓 Credits

Created for the **Quantum AI Neural Network Transport System**  
Built with Ternary Elegance principles  
Powered by Figma Make
