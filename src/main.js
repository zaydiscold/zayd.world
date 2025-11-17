import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Close mobile menu when clicking a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// GSAP Scroll Animations
gsap.utils.toArray('.slide-in-up').forEach((element) => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none none',
    },
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });
});

gsap.utils.toArray('.slide-in-left').forEach((element) => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none none',
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });
});

gsap.utils.toArray('.slide-in-right').forEach((element) => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none none',
    },
    x: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });
});

gsap.utils.toArray('.fade-in').forEach((element) => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    duration: 1.2,
    ease: 'power2.out',
  });
});

// Parallax effect for floating shapes
gsap.utils.toArray('.floating').forEach((shape, index) => {
  gsap.to(shape, {
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
    y: (index + 1) * 200,
    rotation: (index + 1) * 90,
    ease: 'none',
  });
});

// Brutal cards stagger animation
gsap.utils.toArray('.brutal-card').forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    scale: 0.9,
    opacity: 0,
    duration: 0.6,
    delay: index * 0.1,
    ease: 'back.out(1.7)',
  });
});

// Glitch effect on title
const titleGlitch = () => {
  const title = document.querySelector('.glitch');
  if (title) {
    gsap.to(title, {
      textShadow: '2px 2px #FF6B9D, -2px -2px #4D96FF',
      duration: 0.1,
      repeat: 3,
      yoyo: true,
      ease: 'none',
      onComplete: () => {
        gsap.to(title, {
          textShadow: '0px 0px transparent',
          duration: 0.1,
        });
      },
    });
  }
};

// Trigger glitch effect randomly
setInterval(titleGlitch, 5000);

// Button hover effects with GSAP
document.querySelectorAll('.brutal-btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, {
      scale: 1.05,
      duration: 0.2,
      ease: 'power2.out',
    });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out',
    });
  });
});

// Stats counter animation
gsap.utils.toArray('.text-6xl').forEach((stat) => {
  const text = stat.textContent;

  // Only animate if it's a number
  if (text === '42' || text === '24/7' || text === '100%') {
    ScrollTrigger.create({
      trigger: stat,
      start: 'top 80%',
      onEnter: () => {
        gsap.from(stat, {
          textContent: 0,
          duration: 2,
          ease: 'power1.inOut',
          snap: { textContent: 1 },
        });
      },
    });
  } else if (text === '∞') {
    ScrollTrigger.create({
      trigger: stat,
      start: 'top 80%',
      onEnter: () => {
        gsap.from(stat, {
          scale: 0,
          rotation: 360,
          duration: 1.5,
          ease: 'elastic.out(1, 0.5)',
        });
      },
    });
  }
});

// Form input focus effects
document.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('focus', (e) => {
    gsap.to(e.target, {
      borderWidth: '6px',
      duration: 0.2,
      ease: 'power2.out',
    });
  });

  input.addEventListener('blur', (e) => {
    gsap.to(e.target, {
      borderWidth: '4px',
      duration: 0.2,
      ease: 'power2.out',
    });
  });
});

// Cursor trail effect (advanced)
let cursor = { x: 0, y: 0 };
const cursorTrail = [];

for (let i = 0; i < 5; i++) {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  trail.style.cssText = `
    position: fixed;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    background: rgba(255, 107, 157, ${0.8 - i * 0.15});
    border: 2px solid black;
    transform: translate(-50%, -50%);
  `;
  document.body.appendChild(trail);
  cursorTrail.push(trail);
}

document.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX;
  cursor.y = e.clientY;
});

function animateTrail() {
  let x = cursor.x;
  let y = cursor.y;

  cursorTrail.forEach((trail, index) => {
    const nextTrail = cursorTrail[index + 1] || cursorTrail[0];

    trail.style.left = x + 'px';
    trail.style.top = y + 'px';

    x += (nextTrail.offsetLeft - trail.offsetLeft) * 0.3;
    y += (nextTrail.offsetTop - trail.offsetTop) * 0.3;
  });

  requestAnimationFrame(animateTrail);
}

animateTrail();

// Scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 8px;
  background: linear-gradient(to right, #FF6B9D, #4D96FF, #FFD93D, #6BCB77);
  z-index: 9999;
  border-bottom: 4px solid black;
`;
document.body.appendChild(progressBar);

ScrollTrigger.create({
  trigger: 'body',
  start: 'top top',
  end: 'bottom bottom',
  onUpdate: (self) => {
    gsap.to(progressBar, {
      width: `${self.progress * 100}%`,
      duration: 0.1,
    });
  },
});

console.log('🎨 FROSTBITE - Where Creativity Meets Chaos! 🎨');
