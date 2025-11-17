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

---

## How the System Works

### The Styling Architecture

FROSTBITE uses a three-layer styling system:

1. **Tailwind CSS v4** - Provides utility classes (via `@import "tailwindcss"`)
2. **Custom Theme Variables** - Colors, shadows, fonts defined in `@theme` block
3. **Custom CSS Classes** - Component styles like `.brutal-card`, `.brutal-btn`

#### Flow of Styles

```
index.html
    ↓ (references)
src/style.css
    ↓ (imports)
@import "tailwindcss"  ← Tailwind utilities
    ↓
@theme { ... }         ← Your custom variables
    ↓
.brutal-card { ... }   ← Your custom components
```

### How Colors Work

Colors are defined once in `src/style.css` and used everywhere:

```css
/* 1. Define in theme */
@theme {
  --color-neo-pink: #FF6B9D;
}

/* 2. Use in custom CSS */
.my-element {
  background-color: var(--color-neo-pink);
}
```

```html
<!-- 3. Use in HTML with Tailwind -->
<div class="bg-neo-pink text-white">Hello</div>
```

### How Animations Work

Animations have two parts:

1. **CSS Classes** (in `src/style.css`) - Define initial state
2. **GSAP Triggers** (in `src/main.js`) - Animate on scroll

```css
/* CSS sets up the initial hidden state */
.slide-in-up {
  opacity: 0;
  transform: translateY(100px);
}
```

```javascript
// GSAP animates it when scrolled into view
gsap.from('.slide-in-up', {
  scrollTrigger: { trigger: element },
  y: 100,
  opacity: 0,
  duration: 1
});
```

---

## Step-by-Step Guides

### Adding a New Color

**Step 1:** Add color to theme in `src/style.css`

```css
@theme {
  --color-neo-pink: #FF6B9D;
  --color-neo-mint: #B4FFE4;  /* ← Add this */
}
```

**Step 2:** Use it in HTML

```html
<div class="bg-neo-mint text-black">
  New mint section!
</div>
```

**Step 3:** Or use in custom CSS

```css
.my-custom-element {
  background-color: var(--color-neo-mint);
}
```

That's it! No build step needed, just save and refresh.

---

### Adding a New Section

**Step 1:** Copy an existing section in `index.html`

```html
<!-- Find a section you like, e.g., Notes Section -->
<section id="notes" class="relative py-20 px-4 bg-neo-pink">
  <!-- ... content ... -->
</section>
```

**Step 2:** Paste and modify it

```html
<!-- Your new section -->
<section id="portfolio" class="relative py-20 px-4 bg-neo-mint">
  <div class="container mx-auto">
    <div class="slide-in-up mb-16">
      <h3 class="section-title text-white text-center">
        PORTFOLIO
      </h3>
      <p class="text-center text-2xl font-bold text-black mb-4">
        My awesome work
      </p>
    </div>

    <!-- Add your content here -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      <!-- Portfolio items -->
    </div>
  </div>
</section>
```

**Step 3:** Add navigation link

```html
<!-- In the nav section -->
<a href="#portfolio" class="brutal-btn bg-neo-mint text-black shadow-brutal">
  Portfolio
</a>
```

Done! The animations will automatically work.

---

### Adding a New Card

**Step 1:** Use the `.brutal-card` class

```html
<div class="brutal-card p-6 bg-white slide-in-up">
  <!-- Content here -->
</div>
```

**Step 2:** Add content and color accents

```html
<div class="brutal-card p-6 bg-white slide-in-up">
  <!-- Colored header -->
  <div class="bg-neo-purple border-4 border-black p-4 mb-4 inline-block">
    <span class="text-3xl font-bold font-mono text-white">01</span>
  </div>

  <!-- Title -->
  <h4 class="text-2xl font-bold mb-3 uppercase">Card Title</h4>

  <!-- Description -->
  <p class="text-gray-700 mb-4">
    Your description here...
  </p>

  <!-- Tags -->
  <div class="flex gap-2 flex-wrap">
    <span class="px-3 py-1 bg-neo-cyan border-2 border-black text-xs font-bold">
      #TAG
    </span>
  </div>
</div>
```

The brutal shadow and hover effect are automatic!

---

### Adding a New Animation

**Step 1:** Add CSS class in `src/style.css` (after line 102)

```css
.slide-in-bottom {
  opacity: 0;
  transform: translateY(-100px);  /* Negative = from top */
}
```

**Step 2:** Add GSAP trigger in `src/main.js` (after line 82)

```javascript
gsap.utils.toArray('.slide-in-bottom').forEach((element) => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    y: -100,  /* Match the CSS transform */
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });
});
```

**Step 3:** Use in HTML

```html
<div class="slide-in-bottom">
  This will slide down from the top!
</div>
```

---

### Adding a Custom Button Style

**Step 1:** Create button in HTML using existing classes

```html
<button class="brutal-btn bg-neo-orange text-white shadow-brutal-xl">
  My Button
</button>
```

**Step 2:** Or create a new button variant in `src/style.css`

```css
.brutal-btn-rounded {
  padding: 0.75rem 1.5rem;
  border: 4px solid black;
  border-radius: 9999px;  /* Fully rounded */
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.2s;
  cursor: pointer;
  box-shadow: var(--shadow-brutal);
}

.brutal-btn-rounded:hover {
  transform: scale(1.1);
}
```

**Step 3:** Use it

```html
<button class="brutal-btn-rounded bg-neo-green text-white">
  Rounded Button
</button>
```

---

### Removing Elements

#### Removing Floating Shapes

In `index.html`, delete lines 11-17:

```html
<!-- Delete this entire section -->
<div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
  <div class="absolute top-20 left-10 w-32 h-32 bg-neo-pink ..."></div>
  <!-- ... more shapes -->
</div>
```

#### Removing Cursor Trail

In `src/main.js`, delete lines 224-268:

```javascript
// Delete from "Cursor trail effect" comment to animateTrail()
```

#### Removing Progress Bar

In `src/main.js`, delete lines 270-294:

```javascript
// Delete from "Scroll progress indicator" to the ScrollTrigger.create block
```

#### Removing Glitch Effect

In `src/main.js`, delete lines 129-150:

```javascript
// Delete the titleGlitch function and setInterval
```

In `index.html`, remove `glitch` class from elements:

```html
<!-- Before -->
<h1 class="text-3xl md:text-5xl font-bold text-neo-cyan glitch">

<!-- After -->
<h1 class="text-3xl md:text-5xl font-bold text-neo-cyan">
```

---

## Common Tasks Quick Reference

### Change Background Color of a Section

```html
<!-- Change bg-neo-pink to any color -->
<section class="bg-neo-blue">  <!-- or bg-neo-green, bg-neo-yellow, etc. -->
```

### Change Text Color

```html
<!-- Use text-{color} -->
<h1 class="text-neo-cyan">Title</h1>
<p class="text-white">Paragraph</p>
<span class="text-black">Span</span>
```

### Change Border Thickness

```html
<!-- border-2, border-4, border-8 -->
<div class="border-4 border-black">Thick border</div>
<div class="border-2 border-black">Thin border</div>
```

### Change Padding/Spacing

```html
<!-- p-{size} for padding, m-{size} for margin -->
<div class="p-4">Small padding</div>
<div class="p-8">Medium padding</div>
<div class="p-12">Large padding</div>
```

### Make Text Bigger/Smaller

```html
<!-- text-{size} -->
<h1 class="text-4xl">Medium</h1>
<h1 class="text-6xl">Large</h1>
<h1 class="text-9xl">Huge</h1>
```

### Add Custom Shadow

```html
<!-- Use predefined shadows -->
<div class="shadow-brutal">8px offset</div>
<div class="shadow-brutal-lg">12px offset</div>
<div class="shadow-brutal-xl">16px offset</div>
```

---

## Troubleshooting

### Colors Not Working

**Problem:** `bg-neo-pink` doesn't apply color

**Solution:** Make sure color is defined in `@theme` block in `src/style.css`:

```css
@theme {
  --color-neo-pink: #FF6B9D;  /* Must exist here */
}
```

### Animations Not Triggering

**Problem:** `.slide-in-up` class doesn't animate

**Solutions:**
1. Check CSS class exists in `src/style.css`
2. Check GSAP code exists in `src/main.js`
3. Make sure element is within scrollable area
4. Clear browser cache and rebuild: `npm run build`

### Styles Not Updating

**Problem:** Changes to CSS not showing

**Solutions:**
1. Hard refresh browser: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Stop dev server and restart: `npm run dev`
3. Clear `node_modules/.vite` cache
4. Rebuild: `npm run build`

### Build Errors

**Problem:** `npm run build` fails

**Common Causes:**
1. Missing dependency: Run `npm install`
2. Syntax error in CSS: Check `src/style.css` for typos
3. Syntax error in JS: Check `src/main.js` for typos

### Mobile Menu Not Working

**Problem:** Menu button doesn't open menu

**Solution:** Check that IDs match in `index.html`:
- Button must have `id="mobile-menu-btn"`
- Menu must have `id="mobile-menu"`

---

## Pro Tips

### Working with Colors

- Use light colors for backgrounds
- Use dark colors (black) for text on light backgrounds
- Pair contrasting colors: pink + cyan, blue + yellow, green + purple

### Working with Animations

- Don't animate too many elements at once
- Use `animation-delay` to stagger elements:
  ```html
  <div class="slide-in-up" style="animation-delay: 0.1s;">Second item</div>
  <div class="slide-in-up" style="animation-delay: 0.2s;">Third item</div>
  ```
- Keep duration between 0.5s - 1.5s for best feel

### Working with Layout

- Use `container mx-auto` for centered content
- Use `max-w-7xl` to limit width on large screens
- Use responsive grids:
  ```html
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  ```

### Working with Spacing

- Consistent spacing: use multiples of 4 (p-4, p-8, p-12, p-16)
- Section padding: `py-20 px-4` is standard
- Card padding: `p-6` or `p-8` works well

---

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
