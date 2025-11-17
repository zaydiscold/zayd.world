# FROSTBITE

A bold, neobrutalist blog website for sharing notes, writing, recipes, and creative chaos. Built with vibrant colors, thick borders, smooth animations, and an unapologetically loud design philosophy.

## Features

### Neobrutalist Design Philosophy
- **Bold Color Palette**: Custom color system with 7 vibrant colors (pink, blue, yellow, purple, green, orange, cyan)
- **Thick Black Borders**: 4px borders on all interactive elements
- **Brutal Shadows**: Custom offset box shadows (8px, 12px, 16px) that move on hover
- **Sharp Edges**: No subtle rounded corners - geometric and bold
- **High Contrast**: Black text on bright backgrounds for maximum impact

### Advanced Animations
- **Scroll-Triggered Animations**: Elements slide in from different directions as you scroll
- **Parallax Floating Shapes**: Decorative shapes that move at different speeds
- **Glitch Effect**: Title randomly glitches every 5 seconds with color distortion
- **Card Stagger**: Cards animate in sequence with bounce effect
- **Cursor Trail**: Custom pink cursor trail follows your mouse
- **Scroll Progress Bar**: Gradient progress indicator at the top
- **Form Animations**: Input borders animate on focus/blur
- **Stats Counter**: Numbers animate when scrolled into view

### Content Sections
1. **Hero Section**: Eye-catching landing with neon glow effects
2. **Notes**: Grid layout for quick thoughts and ideas with tags
3. **Writing**: Long-form blog post previews with article cards
4. **Recipes**: Fun recipe cards with emojis, timing, and categories
5. **Stats**: Animated statistics showcasing your creative output
6. **Contact**: Form with animated inputs and social media links

### Responsive Design
- Mobile-first approach
- Collapsible mobile menu with smooth transitions
- Responsive grid layouts that adapt to all screen sizes
- Touch-optimized interactions
- Custom scrollbar styling

## Tech Stack

- **[Vite](https://vite.dev/)** - Lightning-fast build tool and dev server
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS with custom theme
- **[GSAP](https://greensock.com/gsap/)** - Professional-grade animation library
- **[GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)** - Scroll-based animations
- **Vanilla JavaScript** - No framework bloat, just modern ES6+

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The dev server opens at `http://localhost:5173` with hot-reload enabled.

### Production Build

```bash
npm run build
```

Generates optimized production bundle in `dist/`.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── index.html              Main HTML file with all sections
├── src/
│   ├── style.css          Tailwind + custom CSS with animations
│   └── main.js            GSAP animations and interactions
├── tailwind.config.js     Tailwind v4 theme configuration
├── postcss.config.js      PostCSS with Tailwind plugin
├── vite.config.js         Vite configuration
└── package.json           Dependencies and scripts
```

## Customization Guide

### Colors

Edit the color theme in `src/style.css`:

```css
@theme {
  --color-neo-pink: #FF6B9D;
  --color-neo-blue: #4D96FF;
  --color-neo-yellow: #FFD93D;
  --color-neo-purple: #A78BFA;
  --color-neo-green: #6BCB77;
  --color-neo-orange: #FF8551;
  --color-neo-cyan: #00D9FF;
}
```

### Shadows

Adjust shadow offsets in `src/style.css`:

```css
--shadow-brutal: 8px 8px 0px 0px #000;
--shadow-brutal-lg: 12px 12px 0px 0px #000;
--shadow-brutal-xl: 16px 16px 0px 0px #000;
```

### Fonts

Default fonts are Space Grotesk and Space Mono from Google Fonts. Change them in `src/style.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

@theme {
  --font-space: 'Your Font', sans-serif;
  --font-mono: 'Your Mono Font', monospace;
}
```

### Animation Timing

Adjust animation speeds in `src/main.js`:

```javascript
// Scroll animation duration
duration: 1,  // Change this value (in seconds)

// Glitch effect interval
setInterval(titleGlitch, 5000);  // Change 5000 to your preferred milliseconds
```

### Content

All content is directly in `index.html`. Edit sections to add your own:

- **Notes**: Line 110-151
- **Writing**: Line 172-237
- **Recipes**: Line 252-323
- **Contact**: Line 361-401

## Animation Classes

Use these classes in HTML to trigger scroll animations:

- `.slide-in-up` - Slides up from bottom
- `.slide-in-left` - Slides in from left
- `.slide-in-right` - Slides in from right
- `.fade-in` - Simple fade in
- `.floating` - Continuous floating animation
- `.glitch` - Glitch effect on hover/interval

## Component Classes

### Buttons
```html
<button class="brutal-btn bg-neo-pink text-white shadow-brutal">
  Click Me
</button>
```

### Cards
```html
<div class="brutal-card p-6 bg-white">
  Card content
</div>
```

### Section Titles
```html
<h2 class="section-title text-white">
  Section Name
</h2>
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Notes

- GSAP animations use GPU acceleration
- ScrollTrigger efficiently manages scroll listeners
- Cursor trail uses requestAnimationFrame for smooth 60fps
- Tailwind purges unused CSS in production
- All animations respect prefers-reduced-motion (can be added)

## Deployment

Build for production and deploy the `dist/` folder to:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop `dist/` folder
- **GitHub Pages**: Push `dist/` contents to `gh-pages` branch
- **Any static host**: Upload `dist/` contents

## License

Built with chaos and love - 2025

---

**FROSTBITE** - Where Creativity Meets Chaos
