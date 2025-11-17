# FROSTBITE

A bold, neobrutalist blog website for sharing notes, writing, recipes, and creative chaos. Built with vibrant colors, thick borders, smooth animations, and an unapologetically loud design philosophy.

![Version](https://img.shields.io/badge/version-0.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

## Table of Contents

- [Screenshots](#screenshots)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Customization Guide](#customization-guide)
- [How the System Works](#how-the-system-works)
- [Step-by-Step Guides](#step-by-step-guides)
- [Common Tasks Quick Reference](#common-tasks-quick-reference)
- [Animation Classes](#animation-classes)
- [Component Classes](#component-classes)
- [Accessibility](#accessibility)
- [SEO Optimization](#seo-optimization)
- [Performance](#performance)
- [Browser Support](#browser-support)
- [Troubleshooting](#troubleshooting)
- [Deployment & Hosting](#deployment--hosting)
- [FAQ](#faq)
- [Known Issues](#known-issues)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Screenshots

> Add screenshots of your live site here to showcase the design

## Live Demo

> Add your live demo URL here when deployed

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
- **[Three.js](https://threejs.org/)** - 3D graphics library for enhanced visual effects
- **Vanilla JavaScript** - No framework bloat, just modern ES6+

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v9.0.0 or higher) - Comes with Node.js
- A modern code editor (VS Code recommended)
- Git for version control

To check your installed versions:

```bash
node --version
npm --version
```

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

## Accessibility

FROSTBITE is designed with accessibility in mind:

### Current Features
- **Semantic HTML** - Proper heading hierarchy and semantic tags
- **Keyboard Navigation** - All interactive elements are keyboard accessible
- **Focus Indicators** - Visible focus states on all interactive elements
- **High Contrast** - Bold colors and thick borders ensure readability
- **Alt Text Ready** - Image placeholders ready for descriptive alt text

### Recommended Enhancements
- Add `prefers-reduced-motion` media query support to disable animations for users who prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- Add ARIA labels to navigation and interactive elements
- Ensure color contrast ratios meet WCAG AA standards (currently high contrast design supports this)
- Add skip-to-content link for keyboard users
- Test with screen readers (NVDA, JAWS, VoiceOver)

## SEO Optimization

Improve your site's search engine visibility:

### Meta Tags

Add to `<head>` in `index.html`:

```html
<!-- Primary Meta Tags -->
<meta name="title" content="FROSTBITE - Creative Chaos Blog">
<meta name="description" content="A bold neobrutalist blog featuring notes, writing, recipes, and creative projects. Where creativity meets chaos.">
<meta name="keywords" content="blog, neobrutalism, creative writing, recipes, design">
<meta name="author" content="Your Name">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://yourdomain.com/">
<meta property="og:title" content="FROSTBITE - Creative Chaos Blog">
<meta property="og:description" content="A bold neobrutalist blog featuring notes, writing, recipes, and creative projects.">
<meta property="og:image" content="https://yourdomain.com/og-image.png">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://yourdomain.com/">
<meta property="twitter:title" content="FROSTBITE - Creative Chaos Blog">
<meta property="twitter:description" content="A bold neobrutalist blog featuring notes, writing, recipes, and creative projects.">
<meta property="twitter:image" content="https://yourdomain.com/twitter-image.png">

<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="canonical" href="https://yourdomain.com/">
```

### Analytics Integration

Add Google Analytics (GA4):

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Or use Plausible for privacy-friendly analytics:

```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

### Sitemap

Create `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

### robots.txt

Create `public/robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

## Performance

### Current Optimizations

- **GSAP Animations** - GPU-accelerated transforms and opacity changes
- **ScrollTrigger** - Efficiently manages scroll listeners with throttling
- **Cursor Trail** - Uses `requestAnimationFrame` for smooth 60fps rendering
- **Tailwind CSS** - Purges unused CSS in production builds
- **Vite** - Tree-shaking and code splitting for minimal bundle size
- **Lazy Loading** - Images can be lazy-loaded for faster initial page load

### Performance Metrics

Expected Lighthouse scores (desktop):
- Performance: 90-100
- Accessibility: 85-95 (with accessibility enhancements)
- Best Practices: 90-100
- SEO: 90-100 (with meta tags)

### Bundle Size

Approximate production bundle sizes:
- JavaScript: ~150-200 KB (includes GSAP, Three.js)
- CSS: ~15-25 KB (purged Tailwind)
- Total: ~165-225 KB (gzipped)

### Optimization Tips

1. **Enable Compression** - Ensure your host serves gzip/brotli compression
2. **CDN Usage** - Use a CDN for global performance (Cloudflare, Vercel Edge)
3. **Image Optimization** - Use WebP format and proper sizing:
   ```html
   <img src="image.webp" alt="description" loading="lazy" width="800" height="600">
   ```
4. **Preload Critical Assets**:
   ```html
   <link rel="preload" href="/src/style.css" as="style">
   <link rel="preload" href="/src/main.js" as="script">
   ```
5. **Font Optimization** - Consider self-hosting Google Fonts for better performance

## Browser Support

- Chrome/Edge (latest, latest - 2 versions)
- Firefox (latest, latest - 2 versions)
- Safari (latest, latest - 2 versions)
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

### Browser-Specific Notes

- **Safari**: Ensure `-webkit-` prefixes for animations (handled by Autoprefixer)
- **Firefox**: GSAP animations fully supported
- **Older Browsers**: IE11 not supported (requires ES6+)

## Deployment & Hosting

### Prerequisites for All Platforms

First, build your site for production:

```bash
npm run build
```

This creates a `dist/` folder with optimized, production-ready files.

---

### Option 1: Deploy to Vercel (Recommended)

**Best for:** Easy deployment with automatic builds from Git

#### Method A: Deploy from Git (Recommended)

**Step 1:** Push your code to GitHub/GitLab/Bitbucket

**Step 2:** Go to [vercel.com](https://vercel.com) and sign in

**Step 3:** Click "Add New Project"

**Step 4:** Import your repository

**Step 5:** Configure build settings:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

**Step 6:** Click "Deploy"

Your site will be live in ~60 seconds at `your-project.vercel.app`!

#### Method B: Deploy with Vercel CLI

**Step 1:** Install Vercel CLI

```bash
npm install -g vercel
```

**Step 2:** Login to Vercel

```bash
vercel login
```

**Step 3:** Deploy

```bash
vercel
```

**Step 4:** For production deployment

```bash
vercel --prod
```

#### Custom Domain on Vercel

1. Go to your project dashboard on Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update your DNS records as instructed
5. Done! SSL certificate is automatic

---

### Option 2: Deploy to Netlify

**Best for:** Drag-and-drop simplicity or Git-based deployment

#### Method A: Drag and Drop (Easiest)

**Step 1:** Build your site

```bash
npm run build
```

**Step 2:** Go to [netlify.com](https://www.netlify.com) and sign in

**Step 3:** Drag and drop the `dist/` folder onto the Netlify dashboard

**Step 4:** Your site is live instantly!

#### Method B: Deploy from Git

**Step 1:** Push your code to GitHub/GitLab/Bitbucket

**Step 2:** Go to [netlify.com](https://www.netlify.com) and click "Add new site"

**Step 3:** Choose "Import an existing project"

**Step 4:** Connect to your Git provider

**Step 5:** Configure build settings:
- **Base directory**: (leave empty)
- **Build command**: `npm run build`
- **Publish directory**: `dist`

**Step 6:** Click "Deploy site"

#### Method C: Netlify CLI

**Step 1:** Install Netlify CLI

```bash
npm install -g netlify-cli
```

**Step 2:** Build and deploy

```bash
npm run build
netlify deploy
```

**Step 3:** For production deployment

```bash
netlify deploy --prod
```

#### Custom Domain on Netlify

1. Go to "Site settings" → "Domain management"
2. Click "Add custom domain"
3. Enter your domain name
4. Update DNS records as instructed
5. SSL is automatic and free

---

### Option 3: Deploy to GitHub Pages

**Best for:** Free hosting for open source projects

#### Step 1: Install gh-pages package

```bash
npm install -D gh-pages
```

#### Step 2: Add deploy script to `package.json`

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

#### Step 3: Update `vite.config.js` for GitHub Pages

```javascript
export default {
  base: '/your-repo-name/', // Replace with your repo name
  // ... rest of config
}
```

#### Step 4: Deploy

```bash
npm run deploy
```

#### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" → "Pages"
3. Under "Source", select branch: `gh-pages`
4. Click "Save"

Your site will be live at `https://yourusername.github.io/your-repo-name/`

#### Custom Domain on GitHub Pages

1. Add a file named `CNAME` in your `public/` folder with your domain
2. In `package.json`, update deploy script:
   ```json
   "deploy": "npm run build && echo 'yourdomain.com' > dist/CNAME && gh-pages -d dist"
   ```
3. In your DNS settings, add a CNAME record pointing to `yourusername.github.io`
4. In GitHub Settings → Pages, add your custom domain

---

### Option 4: Deploy to Cloudflare Pages

**Best for:** Global CDN performance and edge features

#### Step 1: Push to Git

Push your code to GitHub or GitLab

#### Step 2: Go to Cloudflare Pages

Visit [pages.cloudflare.com](https://pages.cloudflare.com)

#### Step 3: Create a project

1. Click "Create a project"
2. Connect to Git
3. Select your repository

#### Step 4: Configure build

- **Framework preset**: Vite
- **Build command**: `npm run build`
- **Build output directory**: `dist`

#### Step 5: Deploy

Click "Save and Deploy"

Your site will be live on `*.pages.dev` with global CDN!

---

### Option 5: Deploy to Render

**Best for:** Automatic deployments with free SSL

#### Step 1: Push to GitHub

Push your code to GitHub

#### Step 2: Create New Static Site

1. Go to [render.com](https://render.com)
2. Click "New +" → "Static Site"
3. Connect your repository

#### Step 3: Configure

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

#### Step 4: Deploy

Click "Create Static Site"

---

### Option 6: Traditional Web Hosting (cPanel, FTP)

**Best for:** Traditional shared hosting providers

#### Step 1: Build locally

```bash
npm run build
```

#### Step 2: Upload files

Using FTP client (FileZilla, Cyberduck, etc.):
1. Connect to your hosting server
2. Navigate to `public_html/` or your web root
3. Upload ALL files from the `dist/` folder
4. Make sure `index.html` is in the root

#### Step 3: Configure (if needed)

Create `.htaccess` file in root for clean URLs:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

### Option 7: Amazon S3 + CloudFront

**Best for:** Scalable static hosting on AWS

#### Step 1: Create S3 Bucket

```bash
aws s3 mb s3://your-bucket-name
```

#### Step 2: Build and upload

```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name
```

#### Step 3: Enable Static Website Hosting

```bash
aws s3 website s3://your-bucket-name --index-document index.html
```

#### Step 4: Set bucket policy for public access

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::your-bucket-name/*"
  }]
}
```

#### Step 5: (Optional) Add CloudFront CDN

Set up CloudFront distribution pointing to your S3 bucket for global performance.

---

### Option 8: Firebase Hosting

**Best for:** Google Cloud integration

#### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

#### Step 2: Login and initialize

```bash
firebase login
firebase init hosting
```

#### Step 3: Configure

- Choose "Use an existing project" or create new
- Set public directory to `dist`
- Configure as single-page app: Yes
- Set up automatic builds: Optional

#### Step 4: Deploy

```bash
npm run build
firebase deploy
```

---

## Post-Deployment Checklist

After deploying to any platform:

- [ ] Test all pages and sections
- [ ] Verify all animations work
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Test form submissions (if connected to backend)
- [ ] Verify custom domain SSL certificate
- [ ] Test in different browsers
- [ ] Check console for errors
- [ ] Verify images and fonts load
- [ ] Test scroll performance

---

## Updating Your Site

### For Git-based deployments (Vercel, Netlify, Cloudflare)

Just push to your repository:

```bash
git add .
git commit -m "Update content"
git push
```

Your site will automatically rebuild and deploy!

### For manual deployments

1. Make your changes
2. Build: `npm run build`
3. Upload new `dist/` folder contents
4. Clear browser cache to see changes

---

## Environment Variables

If you need environment variables:

### Vercel
Add in dashboard: Settings → Environment Variables

### Netlify
Add in dashboard: Site settings → Environment variables

### Local `.env` file
Create `.env` file in root:

```env
VITE_API_KEY=your-key-here
```

Access in code:
```javascript
const apiKey = import.meta.env.VITE_API_KEY
```

---

## FAQ

### General Questions

**Q: Can I use FROSTBITE for commercial projects?**
A: Yes! FROSTBITE is licensed under MIT, allowing commercial use.

**Q: Do I need to know React or Vue to use this?**
A: No! FROSTBITE uses vanilla JavaScript. Just HTML, CSS, and JS knowledge is enough.

**Q: Can I remove the animations?**
A: Absolutely. Simply delete the animation classes from HTML and the corresponding GSAP code in `src/main.js`.

**Q: How do I add a blog post?**
A: Add a new article card in the Writing section of `index.html` (around line 172-237). Copy an existing card structure.

**Q: Is this mobile-friendly?**
A: Yes! The site is fully responsive with a mobile menu and mobile-first design approach.

**Q: Can I use a different CSS framework instead of Tailwind?**
A: Yes, but you'll need to rewrite the utility classes. The custom CSS in `src/style.css` is framework-agnostic.

### Technical Questions

**Q: Why is Three.js in the dependencies but not used?**
A: Three.js is included for future 3D enhancements. You can use it for background effects or remove it to reduce bundle size: `npm uninstall three`

**Q: How do I change the font?**
A: Update the Google Fonts import in `src/style.css` and change the `--font-space` variable in the `@theme` block.

**Q: Can I add more pages?**
A: Yes! Create new HTML files and link to them, or use a router like [Page.js](https://visionmedia.github.io/page.js/) for SPA functionality.

**Q: How do I integrate a CMS?**
A: You can integrate headless CMS options like Contentful, Sanity, or Strapi by fetching data via their APIs in `src/main.js`.

**Q: The build is failing. What should I do?**
A: Check the [Troubleshooting](#troubleshooting) section. Common fixes: delete `node_modules` and reinstall, clear Vite cache, check for syntax errors.

**Q: How do I add a contact form that actually works?**
A: The current form is static. Integrate with:
- [Formspree](https://formspree.io/) - Easiest, no backend needed
- [Netlify Forms](https://www.netlify.com/products/forms/) - If hosting on Netlify
- Your own backend API with fetch/axios

**Q: Can I use this with TypeScript?**
A: Yes! Rename `main.js` to `main.ts`, add TypeScript config, and install types: `npm install -D typescript @types/three`

## Known Issues

Current known issues and limitations:

### Performance
- **Large Number of Animations** - On low-end devices, many simultaneous GSAP animations may impact performance
  - **Workaround**: Reduce animation quantity or disable on mobile

- **Cursor Trail on Mobile** - Cursor trail effect uses mouse events, not optimized for touch
  - **Status**: Consider disabling on mobile devices

### Browser Compatibility
- **Safari < 14** - Some CSS custom properties may not work correctly
  - **Workaround**: Test thoroughly and add fallbacks if supporting older Safari

### Accessibility
- **Animation Sensitivity** - No `prefers-reduced-motion` support yet
  - **Status**: Planned for future release

- **Color Contrast** - Some color combinations may not meet WCAG AAA standards
  - **Status**: Currently meets AA standards

### Feature Limitations
- **Contact Form** - Static form with no backend integration
  - **Workaround**: See FAQ for integration options

- **Three.js Unused** - Included but not yet integrated
  - **Status**: Planned for future 3D background effects
  - **Workaround**: Remove if not needed: `npm uninstall three`

### Reporting New Issues

Found a new issue? Please [report it on GitHub](https://github.com/yourusername/frostbite/issues) with detailed information.

## Roadmap

Future enhancements planned for FROSTBITE:

### Version 1.0 (Upcoming)
- [ ] Add `prefers-reduced-motion` support
- [ ] Integrate Three.js for 3D background effects
- [ ] Dark mode toggle
- [ ] Blog post template generator script
- [ ] Improved mobile performance optimizations

### Version 1.1
- [ ] Multiple color theme presets (dark mode, pastel, cyberpunk)
- [ ] Animation speed controls in UI
- [ ] RSS feed generation for blog posts
- [ ] Search functionality for content
- [ ] Tag filtering system

### Version 2.0
- [ ] CMS integration templates (Contentful, Sanity)
- [ ] Static site generation (SSG) support
- [ ] MDX support for blog posts
- [ ] Comment system integration options
- [ ] Social sharing optimization

### Community Requests
- [ ] More animation presets
- [ ] Additional section templates
- [ ] Page transition effects
- [ ] Print stylesheet
- [ ] Internationalization (i18n) support

Want to contribute to the roadmap? [Open a feature request](https://github.com/yourusername/frostbite/issues) or submit a PR!

## Contributing

Contributions are welcome! Whether it's bug fixes, new features, or improvements to documentation.

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/frostbite.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Test your changes locally with `npm run dev`
   - Ensure the build works with `npm run build`

4. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe your changes
   - Link any related issues
   - Add screenshots for visual changes

### Contribution Guidelines

- **Code Style**: Follow the existing patterns (Tailwind utilities, GSAP animations)
- **Commits**: Use clear, descriptive commit messages
- **Testing**: Test on multiple browsers and devices
- **Documentation**: Update README if adding new features
- **Respect the Design**: Keep the neobrutalist aesthetic consistent

### Areas for Contribution

- Accessibility improvements (ARIA labels, keyboard navigation)
- New animation patterns
- Additional color schemes/themes
- Performance optimizations
- Bug fixes
- Documentation improvements
- New section templates

### Reporting Issues

Found a bug? [Open an issue](https://github.com/yourusername/frostbite/issues) with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information
- Screenshots if applicable

## License

MIT License

Copyright (c) 2025 FROSTBITE Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## Acknowledgments

- **[GSAP](https://greensock.com/)** - For the amazing animation library
- **[Tailwind CSS](https://tailwindcss.com/)** - For the utility-first CSS framework
- **[Vite](https://vitejs.dev/)** - For the blazing-fast build tool
- **Neobrutalism Design Movement** - For the bold design inspiration

---

Built with chaos and love - 2025

**FROSTBITE** - Where Creativity Meets Chaos
