# Zayd.world

An interactive 3D portfolio prototype where a stylised explorer jogs across a rotating globe. Each region on the globe maps to a zone in the portfolio, powering playful navigation without sacrificing clarity or performance.

## Tech Stack

- [Vite](https://vite.dev/) for lightning-fast bundling and dev tooling.
- [Three.js](https://threejs.org/) for all 3D rendering, lighting, and camera work.
- [GSAP](https://greensock.com/gsap/) (placeholder) for future animation polish.
- Vanilla DOM overlay for UI panels so 3D and content can evolve independently.

## Getting Started

```bash
npm install
npm run dev
```

The dev server opens on `http://localhost:5173`. Any change inside `src/` or `public/` will hot-reload.

Run `npm run build` to generate a production bundle in `dist/`.

## Project Structure

```
public/                 Static assets served as-is
  ├── assets/           Textures, models, audio (placeholders today)
  └── styles/           Global, non-bundled CSS
src/                    Main application code
  ├── app.js            Bootstraps renderer, scene, and systems
  ├── main.js           Entry point that instantiates the app
  ├── components/       Modular 3D + UI systems (globe, avatar, UI overlay, controls)
  ├── locations/        Self-contained “location” capsules with copy + theming
  ├── utils/            Helpers such as physics smoothing + asset loaders
  └── shaders/          Reserved for custom GLSL (empty for now)
```

Key modules ship with clear seams so visuals/content can be swapped:

- `components/Globe.js` owns all planet visuals.
- `components/Avatar.js` encapsulates the traveller and movement flavour.
- `components/Zones.js` links rotation to content zones exported from `locations/`.
- `components/UI.js` handles the overlay copy based on the active zone.
- `components/Controls.js` is input-agnostic, exposing rotation deltas.

## Roadmap Highlights

1. Replace placeholder meshes with Blender-authored models and custom materials.
2. Expand `src/locations` entries to feed richer content (links, media, actions).
3. Add GSAP timelines for avatar run cycles, camera easing, and UI transitions.
4. Implement mobile-specific affordances (touch joystick, reduced post-processing).
5. Integrate deployment workflow (Vercel or Netlify) with domain routing for `zayd.world`.

## Asset Workflow

All external assets land in `public/assets/` so they can be versioned and hot-swapped without touching the render logic. Use the helper in `utils/loader.js` for asynchronous texture/model loading and cache reuse.

---

The current build is intentionally lightweight: it gets the scene, controls, zones, and overlay in place. From here we can iterate quickly on visuals, motion language, and portfolio content.
