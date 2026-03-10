# Non-Boring Gradients

> **Beautiful gradients, instantly.** A premium gradient studio that generates, customises, saves, and exports production-ready gradients — all in your browser, zero backend required.

![Stack](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Stack](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)
![Stack](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat-square&logo=framer)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## What is this?

Most gradient generators spit out the same tired purple-to-pink blobs. **Non-Boring Gradients** is different. It uses colour harmony rules — analogous, complementary, pastel, sunset, neon — to generate palettes that are actually good, then lets you tweak every detail, preview the result live, copy the code in one click, and export a PNG. The whole thing runs client-side with no external API calls.

Think of it as a tiny design tool that lives in your browser.

---

## Features at a glance

### Smart generation
Hit **"✦ Surprise Me"** and the app picks one of five colour harmony strategies at random, generates a 2–4 colour palette, assigns a poetic name ("Electric Aurora", "Cosmic Bloom"), and applies it instantly. Every result is guaranteed to look good because the maths behind it is sound.

### Full customisation
Once you have a base you like, dial it in:
- **Gradient type** — switch between Linear, Radial, and Conic with a segmented control. The angle slider appears only when it's relevant (linear/conic), and hides itself otherwise.
- **Color stops** — up to 4 stops. Each stop shows its hex value and opens an inline colour picker (powered by `react-colorful`) on click. Add or remove stops on the fly; the minimum is always 2 so the gradient is never invalid.
- **Angle** — a smooth 0–360° range slider for linear gradients. The current angle is displayed live in a styled badge.
- **Animated** — toggles a smooth, looping shift animation on linear gradients (CSS background-position keyframes under the hood). Automatically disabled for radial/conic since it doesn't apply there.
- **Grain Texture** — overlays a subtle film-grain noise layer for an analogue, tactile feel.

### Live preview
The preview panel is a 16:9 hero card with:
- A soft ambient glow behind it (a blurred, lower-opacity copy of the gradient) that makes the whole thing feel alive.
- A glass-morphism name pill in the top-left corner.
- Chip badges in the bottom-right showing the active type and any effects (animated, grain).
- Smooth cross-fade transitions when the gradient changes.

### Save & revisit
- **Save Gradient** stores the current gradient to `localStorage`, so it survives page refreshes and browser restarts.
- The **Gradient Library** panel shows all saved gradients as clickable cards — load one back instantly, or delete it.
- The **Gradient History** panel tracks your last 8 generated/loaded gradients for the current session, so you can always go back to something you accidentally moved on from.

### One-click export
The Export panel gives you three things:
- **CSS snippet** — a copy-ready `background: ...` property value (linear, radial, or conic CSS).
- **Tailwind classes** — the closest `bg-gradient-to-*`, `from-*`, `via-*`, `to-*` utility string, mapped by finding the nearest Tailwind colour token to each hex value.
- **PNG download** — exports the preview card as a 2× high-DPI PNG using `html-to-image`. The grain overlay is temporarily hidden during export so you get a clean image.

Toast notifications confirm every clipboard copy and download.

---

## Tech stack

- **React 19** — UI framework
- **Vite 7** — build tool & dev server
- **Framer Motion 12** — animations
- **react-colorful** — colour picker
- **html-to-image** — PNG export
- **Vanilla CSS** — styling with CSS variables

---

*Built with React + Vite + a healthy obsession with gradients.*
