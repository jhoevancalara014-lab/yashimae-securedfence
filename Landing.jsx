@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=Oswald:wght@500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* ─── CSS Variables ─────────────────────────────────────────── */
:root {
  --bg: #F4F4F0;
  --fg: #0A0A0A;
  --primary: #FF4500;
  --primary-dark: #CC3700;
  --surface: #FFFFFF;
  --muted: #5C5F66;
  --secondary: #E5E5E0;
  --border: 2px solid var(--fg);
  --transition: 150ms ease;
  --radius: 0;
}

/* ─── Base Reset ─────────────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
  /* Better font rendering on mobile */
  text-rendering: optimizeLegibility;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
  font-family: 'IBM Plex Sans', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* Prevent horizontal scroll on mobile */
  overflow-x: hidden;
}

/* ─── Typography ─────────────────────────────────────────────── */
::selection { background: var(--primary); color: #fff; }

.font-display {
  font-family: 'Oswald', 'Space Grotesk', sans-serif;
  letter-spacing: -0.02em;
}

.font-mono-label {
  font-family: 'IBM Plex Sans', sans-serif;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--muted);
}

/* ─── Brutal UI Components ───────────────────────────────────── */
.brutal-card {
  background: var(--surface);
  border: var(--border);
  border-radius: var(--radius);
  transition: transform 200ms ease, box-shadow 200ms ease;
}

/* Only apply hover effects on non-touch devices */
@media (hover: hover) {
  .brutal-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px var(--fg);
  }
}

.brutal-shadow { box-shadow: 6px 6px 0px var(--fg); }
.brutal-shadow-orange { box-shadow: 6px 6px 0px var(--primary); }

/* Buttons — touch-friendly tap targets (min 44px) */
.brutal-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--primary);
  color: #fff;
  border: var(--border);
  border-radius: var(--radius);
  padding: 0.75rem 1.5rem;
  min-height: 44px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-family: 'IBM Plex Sans', sans-serif;
  cursor: pointer;
  transition: transform var(--transition), box-shadow var(--transition), background var(--transition);
  /* Prevent double-tap zoom on mobile */
  touch-action: manipulation;
  /* No text selection on buttons */
  user-select: none;
  -webkit-user-select: none;
}

@media (hover: hover) {
  .brutal-btn:hover {
    background: var(--primary-dark);
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0px var(--fg);
  }
}

.brutal-btn:active {
  transform: translate(0, 0);
  box-shadow: none;
  background: var(--primary-dark);
}

.brutal-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

.brutal-btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: transparent;
  color: var(--fg);
  border: var(--border);
  border-radius: var(--radius);
  padding: 0.75rem 1.5rem;
  min-height: 44px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: all var(--transition);
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
}

@media (hover: hover) {
  .brutal-btn-outline:hover {
    background: var(--fg);
    color: #fff;
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0px var(--primary);
  }
}

.brutal-btn-outline:active {
  background: var(--fg);
  color: #fff;
}

/* Inputs — mobile-friendly font size (prevents iOS zoom) */
.brutal-input {
  width: 100%;
  border: var(--border);
  border-radius: var(--radius);
  background: #fff;
  padding: 0.75rem 1rem;
  /* 16px minimum to prevent auto-zoom on iOS */
  font-size: 1rem;
  font-family: 'IBM Plex Sans', sans-serif;
  transition: box-shadow var(--transition), border-color var(--transition);
  /* Better tap target */
  min-height: 44px;
  -webkit-appearance: none;
  appearance: none;
}

.brutal-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 4px 4px 0px var(--primary);
}

/* ─── Decorative ─────────────────────────────────────────────── */
.section-divider { height: 2px; background: var(--fg); }

.tape-stripe {
  background-image: repeating-linear-gradient(
    45deg,
    var(--fg) 0,
    var(--fg) 12px,
    var(--primary) 12px,
    var(--primary) 24px
  );
  height: 18px;
  width: 100%;
}

/* ─── Chat Bubbles ───────────────────────────────────────────── */
.chat-bubble-customer {
  background: var(--primary);
  color: #fff;
  border: var(--border);
  border-radius: var(--radius);
  padding: 0.5rem 0.75rem;
  max-width: 80%;
  /* Better word wrapping */
  overflow-wrap: break-word;
  word-break: break-word;
}

.chat-bubble-admin {
  background: var(--fg);
  color: #fff;
  border: var(--border);
  border-radius: var(--radius);
  padding: 0.5rem 0.75rem;
  max-width: 80%;
  overflow-wrap: break-word;
  word-break: break-word;
}

/* ─── Scrollbar ──────────────────────────────────────────────── */
.scrollbar-thin::-webkit-scrollbar { width: 6px; height: 6px; }
.scrollbar-thin::-webkit-scrollbar-track { background: var(--secondary); }
.scrollbar-thin::-webkit-scrollbar-thumb { background: var(--fg); }
/* Firefox */
.scrollbar-thin { scrollbar-width: thin; scrollbar-color: var(--fg) var(--secondary); }

/* ─── Utility: Safe areas (notch phones) ─────────────────────── */
.safe-bottom { padding-bottom: env(safe-area-inset-bottom, 0); }
.safe-top { padding-top: env(safe-area-inset-top, 0); }

/* ─── Focus visibility (accessibility) ──────────────────────── */
:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
}

/* ─── Image optimization ─────────────────────────────────────── */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* ─── Tailwind base overrides ────────────────────────────────── */
@layer base {
  :root {
    --background: 60 11% 95%;
    --foreground: 0 0% 4%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 4%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 4%;
    --primary: 16 100% 50%;
    --primary-foreground: 0 0% 100%;
    --secondary: 60 11% 89%;
    --secondary-foreground: 0 0% 4%;
    --muted: 60 5% 84%;
    --muted-foreground: 220 5% 38%;
    --accent: 16 100% 50%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 84% 50%;
    --destructive-foreground: 0 0% 100%;
    --border: 0 0% 4%;
    --input: 0 0% 4%;
    --ring: 16 100% 50%;
    --radius: 0;
  }
}

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground; }
}

/* ─── Responsive helpers ─────────────────────────────────────── */
/* Fluid type scale */
@media (max-width: 640px) {
  .font-display { letter-spacing: -0.01em; }
}

/* Prevent overflow from long words/emails on mobile */
.break-anywhere {
  overflow-wrap: anywhere;
  word-break: break-word;
}
