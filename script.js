/* ================================================================
   script.js — Red Beacon Asset Management
   Sections:
     1. Navbar — solid background on scroll
     2. Hamburger — mobile menu toggle
     3. Smooth scroll — offset for fixed navbar
     4. Number counters — IntersectionObserver + requestAnimationFrame
     5. Testimonial carousel — auto-rotate, prev/next, dots
     6. Scroll fade-in — IntersectionObserver on .fade-in elements
     7. Form — client-side validation + async FormSubmit submission
     8. Footer year
   ================================================================ */

'use strict';

/* ================================================================
   1. NAVBAR — add .scrolled class when page scrolled > 40px
   ================================================================ */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function sync() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', sync, { passive: true });
  sync(); // run once so correct state is set on hard-reload mid-page
}());

/* ================================================================
   2. HAMBURGER MENU
   ================================================================ */
(function () {
  const btn    = document.getElementById('hamburger');
  const menu   = document.getElementById('nav-links');
  const navbar = document.getElementById('navbar');
  if (!btn || !menu) return;

  function setOpen(open) {
    menu.classList.toggle('open', open);
    btn.classList.toggle('active', open);
    btn.setAttribute('aria-expanded', String(open));
    // Give the navbar a solid bg while the mobile menu is expanded
    navbar.classList.toggle('scrolled', open || window.scrollY > 40);
  }

  btn.addEventListener('click', () => setOpen(!menu.classList.contains('open')));

  // Close when a nav link is clicked
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => setOpen(false));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) setOpen(false);
  });
}());

/* ================================================================
   3. SMOOTH SCROLL — offset scrollIntoView by navbar height
   ================================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();

    const navH = document.getElementById('navbar')?.offsetHeight ?? 72;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ================================================================
   4. NUMBER COUNTERS
   Triggered once when the stat enters the viewport (threshold 50%).
   ================================================================ */
(function () {
  const stats = document.querySelectorAll('.stat-number[data-target]');
  if (!stats.length) return;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target);
    const prefix   = el.dataset.prefix  ?? '';
    const suffix   = el.dataset.suffix  ?? '';
    const decimals = Number(el.dataset.decimals ?? 0);
    const duration = 2000;
    const start    = performance.now();

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = target * easeOutCubic(progress);
      el.textContent = prefix + value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target); // run once
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
}());

/* ================================================================
   5. TESTIMONIAL CAROUSEL
   Auto-rotates every 5 s; pauses on hover / focus.
   ================================================================ */
(function () {
  const track     = document.getElementById('carousel-track');
  const prevBtn   = document.getElementById('prev-btn');
  const nextBtn   = document.getElementById('next-btn');
  const dotBtns   = document.querySelectorAll('.carousel-dots .dot');
  const container = document.querySelector('.carousel-container');
  if (!track || !container) return;

  const totalSlides = track.querySelectorAll('.testimonial-card').length;
  let currentSlide  = 0;
  let timer;

  function goTo(index) {
    currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dotBtns.forEach((dot, i) => {
      const active = i === currentSlide;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-selected', String(active));
    });
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(currentSlide + 1), 5000);
  }

  function stopAuto() {
    clearInterval(timer);
  }

  // Button handlers — restart timer so manual interaction resets the 5-s clock
  prevBtn?.addEventListener('click', () => { goTo(currentSlide - 1); startAuto(); });
  nextBtn?.addEventListener('click', () => { goTo(currentSlide + 1); startAuto(); });

  // Dot handlers
  dotBtns.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index, 10));
      startAuto();
    });
  });

  // Pause while hovering / focusing within the carousel
  container.addEventListener('mouseenter', stopAuto);
  container.addEventListener('mouseleave', startAuto);
  container.addEventListener('focusin',    stopAuto);
  container.addEventListener('focusout',   startAuto);

  startAuto();
}());

/* ================================================================
   6. SCROLL FADE-IN ANIMATIONS
   Adds .visible to each .fade-in element when 15% is in view.
   ================================================================ */
(function () {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  elements.forEach(el => observer.observe(el));
}());

/* ================================================================
   7. CONTACT FORM
   ----------------------------------------------------------------
   Uses the FormSubmit /ajax/ endpoint which returns JSON.
   Replace "your-email@example.com" in index.html with your
   real email address — FormSubmit sends a one-time activation
   email on the first submission; click that link to enable it.
   ================================================================ */
(function () {
  const form      = document.getElementById('enquiry-form');
  if (!form) return;

  const submitBtn  = document.getElementById('submit-btn');
  const formMsg    = document.getElementById('form-msg');
  const btnText    = submitBtn.querySelector('.btn-text');
  const btnSpinner = submitBtn.querySelector('.btn-spinner');
  const btnLoading = submitBtn.querySelector('.btn-loading');

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* ── Helpers ── */

  function fieldError(fieldId, message) {
    const errorEl = document.getElementById(fieldId + '-error');
    const input   = document.getElementById(fieldId);
    if (errorEl) errorEl.textContent = message;
    if (input)   input.classList.toggle('field-invalid', Boolean(message));
  }

  function clearAllErrors() {
    ['name', 'email', 'investment'].forEach(id => fieldError(id, ''));
    formMsg.className   = '';
    formMsg.textContent = '';
  }

  function validate() {
    let ok = true;

    const name  = document.getElementById('name')?.value.trim()  ?? '';
    const email = document.getElementById('email')?.value.trim() ?? '';
    const inv   = document.getElementById('investment')?.value   ?? '';

    if (!name) {
      fieldError('name', 'Full name is required.');
      ok = false;
    }
    if (!email) {
      fieldError('email', 'Email address is required.');
      ok = false;
    } else if (!EMAIL_RE.test(email)) {
      fieldError('email', 'Please enter a valid email address.');
      ok = false;
    }
    if (!inv) {
      fieldError('investment', 'Please select an investment range.');
      ok = false;
    }

    return ok;
  }

  function setLoading(loading) {
    submitBtn.disabled  = loading;
    btnText.hidden      = loading;
    btnSpinner.hidden   = !loading;
    btnLoading.hidden   = !loading;
  }

  function showMsg(type, text) {
    formMsg.className   = type; // 'success' or 'error'
    formMsg.textContent = text;
    formMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ── Submit ── */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAllErrors();
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch(form.action, {
        method:  'POST',
        headers: { 'Accept': 'application/json' },
        body:    new FormData(form),
      });

      /* FormSubmit /ajax/ returns { success: "true", message: "..." } */
      const data = await response.json();

      if (response.ok && data.success === 'true') {
        showMsg('success',
          '✓ Thank you! Your message has been sent. We\'ll be in touch within one business day.');
        form.reset();
      } else {
        throw new Error(data.message ?? 'Submission rejected by server.');
      }
    } catch (err) {
      showMsg('error',
        '✗ Something went wrong — please try again or email us directly at info@redbeaconam.com.');
      console.error('[Form]', err);
    } finally {
      setLoading(false);
    }
  });

  /* Clear inline errors as the user types */
  ['name', 'email', 'investment'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => fieldError(id, ''));
  });
}());

/* ================================================================
   8. FOOTER YEAR
   ================================================================ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
