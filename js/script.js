// document.getElementById('year').textContent = new Date().getFullYear();

// Close mobile menu after clicking a navigation link
document.querySelectorAll('.navbar .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('nav');
    if (menu.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

/* ============================================
   INTERSECTION OBSERVER FOR SCROLL REVEALS
   ============================================ */

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Elements to observe and animate on scroll
const revealElements = document.querySelectorAll(
  '.section-label, .stack-card, .project-card, .arch-step, .metric, .cv-list, .cv-contact, .edu-item, .cv-project'
);

revealElements.forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

/* ============================================
   NUMBER COUNTER ANIMATION
   ============================================ */

function animateCounter(element, target, duration = 1000) {
  let current = 0;
  const increment = target / (duration / 16);

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Observe metric elements and start counter animation
const metricObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const strongElement = entry.target.querySelector('strong');
      if (strongElement && !strongElement.classList.contains('counted')) {
        const textContent = strongElement.textContent;
        const numberMatch = textContent.match(/\d+/);
        if (numberMatch) {
          strongElement.classList.add('counted');
          const target = parseInt(numberMatch[0]);
          animateCounter(strongElement, target, 1200);
        }
      }
      metricObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.metric').forEach(metric => {
  metricObserver.observe(metric);
});

/* ============================================
   SMOOTH SCROLL ENHANCEMENTS
   ============================================ */

// Add subtle parallax to hero background
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroBefore = document.querySelector('.hero:before');
  if (heroBefore) {
    heroBefore.style.transform = `translateY(${scrollY * 0.5}px)`;
  }
});

/* ============================================
   CODE WINDOW CURSOR EFFECT (Optional Enhancement)
   ============================================ */

// Add a cursor effect to the last visible line in code windows
function addCodeCursor() {
  const codeWindows = document.querySelectorAll('.code-body');
  codeWindows.forEach(window => {
    const lastLine = window.lastElementChild;
    if (lastLine) {
      const cursor = document.createElement('span');
      cursor.className = 'cursor-blink';
      cursor.textContent = '|';
      cursor.style.animation = 'cursor-blink 1s infinite';
      cursor.style.color = 'var(--green)';
      cursor.style.marginLeft = '3px';
      cursor.style.fontSize = '0.9em';
      lastLine.appendChild(cursor);
    }
  });
}

// Initialize cursor on load
window.addEventListener('load', addCodeCursor);

/* ============================================
   TOUCH DEVICE OPTIMIZATION
   ============================================ */

// Disable hover effects on touch devices
const isTouchDevice = () => {
  return (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0));
};

if (isTouchDevice()) {
  document.body.classList.add('touch-device');
}

/* ============================================
   PERFORMANCE OPTIMIZATION
   ============================================ */

// Debounce scroll events for better performance
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      ticking = false;
    });
    ticking = true;
  }
});