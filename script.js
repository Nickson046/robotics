/* =============================================
   Robotics Portfolio – script.js
   Nickson Mugerwa · Spring 2026
============================================= */

// ---- Particle canvas background ----
(function() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: 100 }, randomParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(96, 165, 250, ${p.alpha})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });

    // Draw faint lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.06 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  init();
  draw();
})();

// ---- Progress tracker ----
document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.progress');
  const fill       = document.getElementById('progressFill');
  const display    = document.getElementById('progressPercent');

  if (!checkboxes.length) return;

  // Load saved state
  checkboxes.forEach(box => {
    if (localStorage.getItem(box.id) === 'true') {
      box.checked = true;
    }
    box.addEventListener('change', () => {
      localStorage.setItem(box.id, box.checked);
      updateProgress();
    });
  });

  updateProgress();

  function updateProgress() {
    const total   = checkboxes.length;
    const checked = Array.from(checkboxes).filter(b => b.checked).length;
    const pct     = Math.round((checked / total) * 100);
    if (fill)   fill.style.width = pct + '%';
    if (display) display.textContent = pct + '%';
  }
});

// ---- Auto-mark task as complete when its page is visited ----
const page = window.location.pathname;
const taskMap = {
  'task1': 'week1', 'task2': 'week2', 'task3': 'week3', 'task4': 'week4',
  'task5': 'week5', 'task6': 'week6', 'task7': 'week7', 'task8': 'week8',
};
Object.entries(taskMap).forEach(([key, val]) => {
  if (page.includes(key)) localStorage.setItem(val, 'true');
});

// ---- Sticky nav scroll effect ----
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id], .hero-section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

if (navLinks.length && sections.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

// ---- Scroll reveal animations ----
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.task-card, .gp-card, .project-card, .stat, .skill-tag, .task-chip, .contact-card'
).forEach((el, i) => {
  el.classList.add('hidden');
  el.style.transitionDelay = (i * 0.05) + 's';
  revealObserver.observe(el);
});

// ---- Counter animation for stats ----
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

const statNums = document.querySelectorAll('.stat-num[data-target]');
if (statNums.length) {
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => statsObserver.observe(el));
}

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('open');
  });

  // Close when a link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('open');
    }
  });
}

// ---- Smooth section scroll for page task navs ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});