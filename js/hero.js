/**
 * Wealth / 財 — Hero Banner
 * ============================================================
 * HOW TO INIT
 * ------------------------------------------------------------
 * 1. Include css/hero.css in <head>
 * 2. Place the hero markup (see index.html) in the page body
 * 3. Include this script before </body>:
 *      <script src="js/hero.js" defer></script>
 * 4. Auto-inits on DOMContentLoaded for #hero / .hero
 *
 * Optional programmatic init:
 *      WealthHero.init({
 *        root: '#hero',          // selector or Element
 *        particles: 28,          // sakura count (auto-scaled by viewport)
 *        parallax: true,         // mouse + scroll parallax
 *        reducedMotion: 'auto'   // 'auto' | true | false
 *      });
 *
 * Destroy / re-init:
 *      WealthHero.destroy();
 *      WealthHero.init();
 * ============================================================
 */

(function (global) {
  'use strict';

  var DEFAULTS = {
    root: '#hero',
    particles: null, // null = auto by width
    parallax: true,
    reducedMotion: 'auto',
  };

  var state = {
    root: null,
    canvas: null,
    ctx: null,
    petals: [],
    raf: 0,
    running: false,
    width: 0,
    height: 0,
    dpr: 1,
    mouseX: 0.5,
    mouseY: 0.5,
    targetMX: 0.5,
    targetMY: 0.5,
    scrollY: 0,
    prefersReduced: false,
    opts: null,
    bound: {},
    lastTs: 0,
  };

  /* —— Utilities —— */
  function qs(sel, ctx) {
    if (sel && sel.nodeType === 1) return sel;
    return (ctx || document).querySelector(sel);
  }

  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function prefersReducedMotion(flag) {
    if (flag === true) return true;
    if (flag === false) return false;
    return (
      typeof matchMedia === 'function' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  function particleCount(w) {
    if (w < 480) return 14;
    if (w < 900) return 22;
    return 32;
  }

  /* —— Sakura petal model —— */
  function createPetal(w, h, fromTop) {
    var size = rand(6, 14);
    return {
      x: rand(-20, w + 20),
      y: fromTop ? rand(-h * 0.2, -10) : rand(0, h),
      z: rand(0.35, 1), // depth for parallax + size scale
      size: size,
      rot: rand(0, Math.PI * 2),
      rotSpeed: rand(-0.02, 0.02),
      sway: rand(0, Math.PI * 2),
      swaySpeed: rand(0.008, 0.02),
      swayAmp: rand(12, 36),
      fall: rand(0.25, 0.85),
      opacity: rand(0.25, 0.7),
      // soft pink-ivory to pale rose (sakura on washi)
      hue: rand(350, 360),
      sat: rand(18, 42),
      lit: rand(78, 92),
      // slight ink-dust variant for variety
      ink: Math.random() < 0.12,
    };
  }

  function drawPetal(ctx, p) {
    var s = p.size * p.z;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = p.opacity * (0.55 + p.z * 0.45);

    // Two-lobed sakura petal silhouette
    ctx.beginPath();
    ctx.moveTo(0, s * 0.15);
    ctx.bezierCurveTo(s * 0.55, -s * 0.55, s * 0.85, s * 0.15, 0, s * 0.95);
    ctx.bezierCurveTo(-s * 0.85, s * 0.15, -s * 0.55, -s * 0.55, 0, s * 0.15);
    ctx.closePath();

    if (p.ink) {
      ctx.fillStyle = 'rgba(26, 26, 26, 0.22)';
    } else {
      ctx.fillStyle =
        'hsla(' + p.hue + ', ' + p.sat + '%, ' + p.lit + '%, 0.92)';
    }
    ctx.fill();

    // delicate center vein
    ctx.beginPath();
    ctx.moveTo(0, s * 0.2);
    ctx.quadraticCurveTo(s * 0.05, s * 0.5, 0, s * 0.85);
    ctx.strokeStyle = p.ink
      ? 'rgba(26, 26, 26, 0.12)'
      : 'rgba(194, 59, 34, 0.12)';
    ctx.lineWidth = 0.6;
    ctx.stroke();

    ctx.restore();
  }

  function resetPetal(p, w, h) {
    var next = createPetal(w, h, true);
    p.x = next.x;
    p.y = next.y;
    p.z = next.z;
    p.size = next.size;
    p.rot = next.rot;
    p.rotSpeed = next.rotSpeed;
    p.sway = next.sway;
    p.swaySpeed = next.swaySpeed;
    p.swayAmp = next.swayAmp;
    p.fall = next.fall;
    p.opacity = next.opacity;
    p.hue = next.hue;
    p.sat = next.sat;
    p.lit = next.lit;
    p.ink = next.ink;
  }

  /* —— Canvas lifecycle —— */
  function resize() {
    if (!state.canvas || !state.root) return;
    var rect = state.root.getBoundingClientRect();
    state.width = Math.max(1, Math.floor(rect.width));
    state.height = Math.max(1, Math.floor(rect.height));
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);

    state.canvas.width = Math.floor(state.width * state.dpr);
    state.canvas.height = Math.floor(state.height * state.dpr);
    state.canvas.style.width = state.width + 'px';
    state.canvas.style.height = state.height + 'px';

    state.ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

    // Rebuild petal field if empty or size jumped
    var target =
      state.opts.particles != null
        ? state.opts.particles
        : particleCount(state.width);

    if (state.prefersReduced) {
      state.petals = [];
      paintStaticWash();
      return;
    }

    if (state.petals.length !== target) {
      state.petals = [];
      for (var i = 0; i < target; i++) {
        state.petals.push(createPetal(state.width, state.height, false));
      }
    }
  }

  function paintStaticWash() {
    if (!state.ctx) return;
    var ctx = state.ctx;
    ctx.clearRect(0, 0, state.width, state.height);
    // quiet static dust for reduced-motion users
    ctx.globalAlpha = 0.08;
    for (var i = 0; i < 18; i++) {
      ctx.beginPath();
      ctx.arc(
        rand(0, state.width),
        rand(0, state.height * 0.7),
        rand(1, 2.5),
        0,
        Math.PI * 2
      );
      ctx.fillStyle = 'rgba(196, 163, 90, 0.9)';
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function tick(ts) {
    if (!state.running) return;
    state.raf = requestAnimationFrame(tick);

    var dt = state.lastTs ? Math.min(32, ts - state.lastTs) / 16.67 : 1;
    state.lastTs = ts;

    var ctx = state.ctx;
    var w = state.width;
    var h = state.height;
    if (!ctx || !w || !h) return;

    // Smooth mouse
    state.mouseX = lerp(state.mouseX, state.targetMX, 0.06 * dt);
    state.mouseY = lerp(state.mouseY, state.targetMY, 0.06 * dt);

    ctx.clearRect(0, 0, w, h);

    var mx = (state.mouseX - 0.5) * 18;
    var my = (state.mouseY - 0.5) * 10;

    for (var i = 0; i < state.petals.length; i++) {
      var p = state.petals[i];
      p.sway += p.swaySpeed * dt;
      p.rot += p.rotSpeed * dt;
      p.y += p.fall * p.z * 1.15 * dt;
      p.x +=
        Math.sin(p.sway) * (p.swayAmp * 0.02) * dt +
        mx * 0.015 * p.z * dt;

      var drawX = p.x + mx * p.z * 0.35;
      var drawY = p.y + my * p.z * 0.25;

      // temp shift for draw without mutating base heavily
      var ox = p.x;
      var oy = p.y;
      p.x = drawX;
      p.y = drawY;
      drawPetal(ctx, p);
      p.x = ox;
      p.y = oy;

      if (p.y > h + 30 || p.x < -40 || p.x > w + 40) {
        resetPetal(p, w, h);
      }
    }

    applyParallaxLayers();
  }

  /* —— Parallax on DOM layers —— */
  function applyParallaxLayers() {
    if (!state.opts.parallax || state.prefersReduced || !state.root) return;

    var mx = (state.mouseX - 0.5) * 2;
    var my = (state.mouseY - 0.5) * 2;
    var sy = state.scrollY;

    var seigaiha = state.root.querySelector('.hero__seigaiha');
    var far = state.root.querySelector('.hero__mountains--far');
    var near = state.root.querySelector('.hero__mountains--near');
    var content = state.root.querySelector('.hero__content');
    var rays = state.root.querySelector('.hero__rays');

    if (seigaiha) {
      seigaiha.style.transform =
        'translate3d(' + mx * -8 + 'px, ' + (sy * 0.04 + my * 4) + 'px, 0)';
    }
    if (far) {
      far.style.transform =
        'translate3d(' + mx * -12 + 'px, ' + (sy * 0.06 + my * 6) + 'px, 0)';
    }
    if (near) {
      near.style.transform =
        'translate3d(' + mx * -20 + 'px, ' + (sy * 0.1 + my * 8) + 'px, 0)';
    }
    if (content) {
      content.style.transform =
        'translate3d(' + mx * 6 + 'px, ' + (sy * 0.12 + my * -4) + 'px, 0)';
    }
    if (rays) {
      rays.style.transform =
        'translateX(-50%) translate3d(' +
        mx * 10 +
        'px, ' +
        my * 6 +
        'px, 0)';
    }
  }

  /* —— Events —— */
  function onPointerMove(e) {
    if (!state.root) return;
    var rect = state.root.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    var clientX = e.clientX;
    var clientY = e.clientY;
    if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    state.targetMX = clamp((clientX - rect.left) / rect.width, 0, 1);
    state.targetMY = clamp((clientY - rect.top) / rect.height, 0, 1);
  }

  function onScroll() {
    state.scrollY = window.scrollY || window.pageYOffset || 0;
    // Soft-hide scroll cue once user moves on
    var cue = state.root && state.root.querySelector('.hero__scroll');
    if (cue) {
      var fade = clamp(1 - state.scrollY / 180, 0, 1);
      cue.style.opacity = String(fade);
      cue.style.pointerEvents = fade < 0.1 ? 'none' : '';
    }
    if (!state.running) applyParallaxLayers();
  }

  function onResize() {
    resize();
  }

  function onVisibility() {
    if (document.hidden) {
      stopLoop();
    } else if (!state.prefersReduced) {
      startLoop();
    }
  }

  function onCtaClick(e) {
    var href = this.getAttribute('href');
    if (!href || href.charAt(0) !== '#') return;
    var target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    var reduce = prefersReducedMotion(state.opts.reducedMotion);
    target.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      block: 'start',
    });
  }

  /* —— Loop control —— */
  function startLoop() {
    if (state.running || state.prefersReduced) return;
    state.running = true;
    state.lastTs = 0;
    state.raf = requestAnimationFrame(tick);
  }

  function stopLoop() {
    state.running = false;
    if (state.raf) {
      cancelAnimationFrame(state.raf);
      state.raf = 0;
    }
  }

  /* —— Markup ensure canvas —— */
  function ensureCanvas(root) {
    var canvas = root.querySelector('.hero__canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.className = 'hero__canvas';
      canvas.setAttribute('aria-hidden', 'true');
      var motifs = root.querySelector('.hero__motifs');
      if (motifs) {
        root.insertBefore(canvas, motifs.nextSibling);
      } else {
        root.insertBefore(canvas, root.firstChild);
      }
    }
    return canvas;
  }

  /* —— Public API —— */
  function init(options) {
    destroy();

    var opts = {};
    var key;
    for (key in DEFAULTS) {
      if (Object.prototype.hasOwnProperty.call(DEFAULTS, key)) {
        opts[key] = DEFAULTS[key];
      }
    }
    if (options) {
      for (key in options) {
        if (Object.prototype.hasOwnProperty.call(options, key)) {
          opts[key] = options[key];
        }
      }
    }
    state.opts = opts;

    var root = qs(opts.root);
    if (!root) {
      if (typeof console !== 'undefined') {
        console.warn('[WealthHero] Root not found:', opts.root);
      }
      return null;
    }

    state.root = root;
    state.prefersReduced = prefersReducedMotion(opts.reducedMotion);
    state.canvas = ensureCanvas(root);
    state.ctx = state.canvas.getContext('2d');

    // Bind events
    state.bound.move = onPointerMove;
    state.bound.scroll = onScroll;
    state.bound.resize = onResize;
    state.bound.visibility = onVisibility;

    window.addEventListener('pointermove', state.bound.move, { passive: true });
    window.addEventListener('scroll', state.bound.scroll, { passive: true });
    window.addEventListener('resize', state.bound.resize, { passive: true });
    document.addEventListener('visibilitychange', state.bound.visibility);

    // Smooth-scroll CTAs inside hero
    var links = root.querySelectorAll('a[href^="#"]');
    state.bound.ctaHandlers = [];
    for (var i = 0; i < links.length; i++) {
      var handler = onCtaClick.bind(links[i]);
      links[i].addEventListener('click', handler);
      state.bound.ctaHandlers.push({ el: links[i], fn: handler });
    }

    resize();
    onScroll();

    if (!state.prefersReduced) {
      startLoop();
    } else {
      applyParallaxLayers();
    }

    root.setAttribute('data-hero-ready', 'true');
    return {
      root: root,
      destroy: destroy,
    };
  }

  function destroy() {
    stopLoop();

    if (state.bound.move) {
      window.removeEventListener('pointermove', state.bound.move);
    }
    if (state.bound.scroll) {
      window.removeEventListener('scroll', state.bound.scroll);
    }
    if (state.bound.resize) {
      window.removeEventListener('resize', state.bound.resize);
    }
    if (state.bound.visibility) {
      document.removeEventListener('visibilitychange', state.bound.visibility);
    }
    if (state.bound.ctaHandlers) {
      for (var i = 0; i < state.bound.ctaHandlers.length; i++) {
        var pair = state.bound.ctaHandlers[i];
        pair.el.removeEventListener('click', pair.fn);
      }
    }

    if (state.root) {
      state.root.removeAttribute('data-hero-ready');
      // Reset transforms
      var layers = state.root.querySelectorAll(
        '.hero__seigaiha, .hero__mountains, .hero__content, .hero__rays'
      );
      for (var j = 0; j < layers.length; j++) {
        layers[j].style.transform = '';
      }
      var cue = state.root.querySelector('.hero__scroll');
      if (cue) {
        cue.style.opacity = '';
        cue.style.pointerEvents = '';
      }
    }

    state.root = null;
    state.canvas = null;
    state.ctx = null;
    state.petals = [];
    state.bound = {};
    state.opts = null;
  }

  var api = {
    init: init,
    destroy: destroy,
    version: '1.0.0',
  };

  global.WealthHero = api;

  // Auto-init
  function autoInit() {
    var el = document.getElementById('hero') || document.querySelector('.hero');
    if (el) api.init({ root: el });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
})(typeof window !== 'undefined' ? window : this);
