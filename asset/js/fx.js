/* =========================================================
   Krissanachai Sararam — visual effects
   Every effect is skipped under prefers-reduced-motion; pointer
   effects only run on fine (mouse/trackpad) pointers.
   ========================================================= */
(function () {
  "use strict";

  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(pointer: fine)").matches;
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* ── HERO CONSTELLATION (interactive particle network) ── */
  (function constellation() {
    const cv = $("#heroFx");
    const hero = $("#hero");
    if (!cv || !hero || reduce) return;
    const ctx = cv.getContext("2d");
    const LINK = 120;
    const MLINK = 170;
    const mouse = { x: -9999, y: -9999 };
    let W = 0,
      H = 0,
      base = 0,
      pts = [],
      raf = 0,
      onScreen = true,
      c1 = "108,99,255",
      c2 = "168,85,247";

    const rgb = (v) => {
      v = v.trim().replace("#", "");
      if (v.length === 3) v = v.replace(/./g, "$&$&");
      const n = parseInt(v, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(",");
    };
    function readColors() {
      const cs = getComputedStyle(root);
      c1 = rgb(cs.getPropertyValue("--indigo"));
      c2 = rgb(cs.getPropertyValue("--indigo-2"));
    }
    const spawn = (x, y, vx, vy) => ({
      x,
      y,
      vx,
      vy,
      r: Math.random() * 1.8 + 0.6,
      alt: Math.random() < 0.5,
    });
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = hero.clientWidth;
      H = hero.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      base = Math.round(Math.min(fine ? 80 : 40, (W * H) / 16000));
      pts = Array.from({ length: base }, () =>
        spawn(
          Math.random() * W,
          Math.random() * H,
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4,
        ),
      );
    }
    function step() {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MLINK * MLINK) {
          const d = Math.sqrt(d2) || 1;
          p.vx += (dx / d) * 0.03;
          p.vy += (dy / d) * 0.03;
        }
        p.vx *= 0.985;
        p.vy *= 0.985;
        if (Math.hypot(p.vx, p.vy) < 0.12) {
          p.vx += (Math.random() - 0.5) * 0.06;
          p.vy += (Math.random() - 0.5) * 0.06;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        p.x = Math.max(0, Math.min(W, p.x));
        p.y = Math.max(0, Math.min(H, p.y));
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            ctx.strokeStyle = `rgba(${c1},${(1 - Math.sqrt(d2) / LINK) * 0.32})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < MLINK) {
          ctx.strokeStyle = `rgba(${c2},${(1 - md / MLINK) * 0.6})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
      for (const p of pts) {
        ctx.fillStyle = `rgba(${p.alt ? c2 : c1},0.85)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(step);
    }
    const run = () => {
      cancelAnimationFrame(raf);
      if (onScreen && !document.hidden) raf = requestAnimationFrame(step);
    };

    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });
    hero.addEventListener("pointerleave", () => {
      mouse.x = mouse.y = -9999;
    });
    // Click bursts a few new nodes out from the pointer.
    hero.addEventListener("pointerdown", (e) => {
      if (e.target.closest("a,button")) return;
      const r = hero.getBoundingClientRect();
      for (let i = 0; i < 8; i++) {
        const ang = (i / 8) * Math.PI * 2;
        pts.push(
          spawn(
            e.clientX - r.left,
            e.clientY - r.top,
            Math.cos(ang) * 2.4,
            Math.sin(ang) * 2.4,
          ),
        );
      }
      if (pts.length > base + 40) pts.splice(0, pts.length - base - 40);
    });

    new IntersectionObserver((es) => {
      onScreen = es[0].isIntersecting;
      run();
    }).observe(hero);
    document.addEventListener("visibilitychange", run);
    new MutationObserver(readColors).observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    let rt;
    new ResizeObserver(() => {
      clearTimeout(rt);
      rt = setTimeout(resize, 150);
    }).observe(hero);

    readColors();
    resize();
    run();
  })();

  /* ── SECTION TITLES: line-by-line mask reveal ── */
  (function titles() {
    const els = $$(".big-title, .about-title, .contact-title");
    els.forEach((el) => {
      // Content is the page's own static markup, split at <br>.
      const parts = el.innerHTML
        .split(/<br\s*\/?>/i)
        .map((s) => s.trim())
        .filter(Boolean);
      el.innerHTML = parts
        .map((p) => `<span class="line"><span class="line-in">${p}</span></span>`)
        .join("");
      el.classList.add("split-lines", "split-js");
    });
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.35 },
    );
    els.forEach((el) => io.observe(el));
  })();

  /* ── HERO PHOTO PARALLAX ── */
  (function parallax() {
    const hero = $("#hero");
    const photo = $("#heroSlideshow");
    if (!hero || !photo || reduce || !fine) return;
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      photo.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translate(${x * 12}px, ${y * 12}px)`;
    });
    hero.addEventListener("pointerleave", () => {
      photo.style.transform = "";
    });
  })();

  /* ── MAGNETIC BUTTONS ── */
  (function magnetic() {
    if (reduce || !fine) return;
    $$(".btn-primary, .nav-cta, .theme-toggle, .fsb, .git-link").forEach(
      (el) => {
        el.addEventListener("pointermove", (e) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - r.left - r.width / 2;
          const y = e.clientY - r.top - r.height / 2;
          el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
        });
        el.addEventListener("pointerleave", () => {
          el.style.transform = "";
        });
      },
    );
  })();

  /* ── CUSTOM CURSOR (dot + trailing ring) ── */
  (function cursor() {
    if (reduce || !fine) return;
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    ring.appendChild(document.createElement("span"));
    document.body.append(dot, ring);
    let mx = -100,
      my = -100,
      rx = -100,
      ry = -100;
    addEventListener(
      "pointermove",
      (e) => {
        if (e.pointerType !== "mouse") return;
        mx = e.clientX;
        my = e.clientY;
        dot.style.transform = `translate(${mx}px, ${my}px)`;
        root.classList.add("has-cursor");
      },
      { passive: true },
    );
    document.addEventListener("pointerleave", () =>
      root.classList.remove("has-cursor"),
    );
    document.addEventListener("pointerover", (e) => {
      ring.classList.toggle(
        "hover",
        !!e.target.closest("a, button, input, textarea, .card-base"),
      );
    });
    addEventListener("pointerdown", () => ring.classList.add("down"));
    addEventListener("pointerup", () => ring.classList.remove("down"));
    (function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    })();
  })();

  /* ── CLICK RIPPLE ── */
  (function ripple() {
    if (reduce) return;
    $$(".btn-primary, .nav-cta").forEach((el) =>
      el.addEventListener("pointerdown", (e) => {
        const r = el.getBoundingClientRect();
        const size = Math.max(r.width, r.height) * 2;
        const s = document.createElement("span");
        s.className = "ripple";
        s.style.width = s.style.height = size + "px";
        s.style.left = e.clientX - r.left - size / 2 + "px";
        s.style.top = e.clientY - r.top - size / 2 + "px";
        el.appendChild(s);
        s.addEventListener("animationend", () => s.remove());
      }),
    );
  })();

  /* ── NAV: elevate once scrolled ── */
  (function navShadow() {
    const nav = $("nav");
    if (!nav) return;
    const on = () => nav.classList.toggle("scrolled", window.scrollY > 12);
    addEventListener("scroll", on, { passive: true });
    on();
  })();

  /* ── TAGLINE: words light up one at a time on scroll (B11) ── */
  (function tagline() {
    const el = $("[data-words]");
    if (!el) return;
    // Thai has no spaces between words, so segment with Intl.Segmenter.
    const seg =
      "Segmenter" in Intl ? new Intl.Segmenter("th", { granularity: "word" }) : null;
    const split = (text) =>
      seg ? Array.from(seg.segment(text), (p) => p.segment) : text.split(/(\s+)/);
    for (const node of Array.from(el.childNodes)) {
      if (node.nodeType !== 3) continue;
      const frag = document.createDocumentFragment();
      for (const part of split(node.textContent)) {
        if (!part.trim()) {
          frag.appendChild(document.createTextNode(part.replace(/\s+/g, " ")));
          continue;
        }
        const w = document.createElement("span");
        w.className = "w";
        w.textContent = part;
        frag.appendChild(w);
      }
      node.replaceWith(frag);
    }
    const words = $$(".w", el);
    if (reduce) {
      words.forEach((w) => w.classList.add("on"));
      return;
    }
    let lit = 0;
    let queued = false;
    function update() {
      queued = false;
      const r = el.getBoundingClientRect();
      // Trigger line sits at 75% of the viewport height; words switch on
      // in reading order as the paragraph moves up past it.
      const p = (innerHeight * 0.75 - r.top) / (r.height + innerHeight * 0.25);
      const target = Math.min(words.length, Math.max(0, Math.floor(p * words.length)));
      while (lit < target) words[lit++].classList.add("on");
      if (lit >= words.length) removeEventListener("scroll", onScroll);
    }
    function onScroll() {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    }
    addEventListener("scroll", onScroll, { passive: true });
    update();
  })();
})();
