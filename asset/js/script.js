/* =========================================================
   Krissanachai Sararam — Portfolio behaviour
   ========================================================= */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* ── EMAIL (no plaintext address in the HTML or repo) ── */
  // Assembled at runtime so the address never appears as a plain string
  // that email-harvesting bots can scrape. Links fall back to #contact.
  const TO = ["krissanachai.s", ["nso", "mail", "go", "th"].join(".")].join(
    String.fromCharCode(64),
  );
  $$("[data-email]").forEach((a) => (a.href = "mailto:" + TO));
  $$("[data-email-text]").forEach((el) => (el.textContent = TO));

  /* ── THEME TOGGLE ── */
  (function theme() {
    const root = document.documentElement;
    const btn = $("#themeToggle");
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    // Track the mode here rather than reading data-theme, which lags behind
    // while a view transition is still pending.
    let current = saved || (prefersDark ? "dark" : "light");
    apply(current);

    function apply(mode) {
      root.setAttribute("data-theme", mode);
      if (btn) {
        btn.innerHTML =
          mode === "dark"
            ? '<i class="bi bi-sun-fill"></i>'
            : '<i class="bi bi-moon-stars-fill"></i>';
        btn.setAttribute(
          "aria-label",
          mode === "dark" ? "Switch to light mode" : "Switch to dark mode",
        );
      }
    }
    if (btn) {
      btn.addEventListener("click", () => {
        const next = (current = current === "dark" ? "light" : "dark");
        localStorage.setItem("theme", next);
        if (!document.startViewTransition || reduceMotion) {
          apply(next);
          return;
        }
        // Circular reveal expanding from the toggle button.
        const r = btn.getBoundingClientRect();
        const x = r.left + r.width / 2;
        const y = r.top + r.height / 2;
        const end = Math.hypot(
          Math.max(x, innerWidth - x),
          Math.max(y, innerHeight - y),
        );
        root.classList.add("no-trans");
        const t = document.startViewTransition(() => apply(next));
        // ready rejects if the browser skips the transition (e.g. hidden tab);
        // the theme is still applied by the callback above.
        t.ready.then(() =>
          root.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${end}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 650,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              pseudoElement: "::view-transition-new(root)",
            },
          ),
        )
          .catch(() => {});
        t.finished
          .finally(() => root.classList.remove("no-trans"))
          .catch(() => {});
      });
    }
  })();

  /* ── SCROLL PROGRESS BAR ── */
  (function progress() {
    const bar = $("#scroll-progress");
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  })();

  /* ── MOBILE NAV ── */
  (function mobileNav() {
    const hamBtn = $("#hamBtn");
    const mobileNav = $("#mobileNav");
    if (!hamBtn || !mobileNav) return;
    const close = () => {
      mobileNav.classList.remove("open");
      hamBtn.innerHTML = '<i class="bi bi-list"></i>';
    };
    hamBtn.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("open");
      hamBtn.innerHTML = open
        ? '<i class="bi bi-x-lg"></i>'
        : '<i class="bi bi-list"></i>';
    });
    $$("a", mobileNav).forEach((a) => a.addEventListener("click", close));
  })();

  /* ── SCROLL REVEAL ── */
  (function reveal() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      items.forEach((el) => el.classList.add("v"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("v");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    items.forEach((el) => io.observe(el));
  })();

  /* ── SCROLLSPY (active nav link) ── */
  (function scrollspy() {
    const links = $$(".nav-links a");
    if (!links.length || !("IntersectionObserver" in window)) return;
    const map = {};
    links.forEach((l) => {
      const id = l.getAttribute("href");
      if (id && id.startsWith("#")) map[id.slice(1)] = l;
    });
    const sections = Object.keys(map)
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            links.forEach((l) => l.classList.remove("active"));
            const link = map[e.target.id];
            if (link) link.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
  })();

  /* ── HERO SLIDESHOW ── */
  (function slideshow() {
    const slides = $$("#heroSlideshow .hs-slide");
    const dots = $$("#slideDots .slide-dot");
    if (slides.length < 2) return;
    let cur = 0;
    let timer;
    function goTo(n) {
      slides[cur].classList.remove("active");
      dots[cur] && dots[cur].classList.remove("active");
      cur = n;
      slides[cur].classList.add("active");
      dots[cur] && dots[cur].classList.add("active");
    }
    const next = () => goTo((cur + 1) % slides.length);
    const start = () => (timer = setInterval(next, 3800));
    dots.forEach((d, i) =>
      d.addEventListener("click", () => {
        goTo(i);
        clearInterval(timer);
        start();
      }),
    );
    start();
  })();

  /* ── ROTATING ROLE (typewriter) ── */
  (function role() {
    const el = $("#heroRole");
    if (!el) return;
    const words = [
      "นักวิชาการคอมพิวเตอร์ปฏิบัติการ",
      "Full-Stack Web Developer",
      "Data & Statistics Enthusiast",
      "LINE · Telegram · Discord Bot Dev",
      "e-Government Builder",
    ];
    const caret = '<span class="caret"></span>';
    if (reduceMotion) {
      el.innerHTML = words[0] + caret;
      return;
    }
    let w = 0,
      c = 0,
      deleting = false;
    function tick() {
      const word = words[w];
      c += deleting ? -1 : 1;
      el.innerHTML = word.slice(0, c) + caret;
      let delay = deleting ? 45 : 85;
      if (!deleting && c === word.length) {
        delay = 1600;
        deleting = true;
      } else if (deleting && c === 0) {
        deleting = false;
        w = (w + 1) % words.length;
        delay = 350;
      }
      setTimeout(tick, delay);
    }
    tick();
  })();

  /* ── COUNT-UP STATS ── */
  (function counters() {
    const nums = $$("[data-count]");
    if (!nums.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      nums.forEach((n) => (n.textContent = fmt(n)));
      return;
    }
    function fmt(n) {
      const t = +n.dataset.count;
      return (n.dataset.prefix || "") + t + (n.dataset.suffix || "");
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const target = +el.dataset.count;
          const dur = 1400;
          const t0 = performance.now();
          function step(now) {
            const p = Math.min((now - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent =
              (el.dataset.prefix || "") +
              Math.round(target * eased) +
              (el.dataset.suffix || "");
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          io.unobserve(el);
        });
      },
      { threshold: 0.5 },
    );
    nums.forEach((n) => io.observe(n));
  })();

  /* ── CARD TILT + SPOTLIGHT ── */
  (function tilt() {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;
    $$(".card-base").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        card.style.setProperty("--mx", x + "px");
        card.style.setProperty("--my", y + "px");
        const rx = ((y / r.height - 0.5) * -5).toFixed(2);
        const ry = ((x / r.width - 0.5) * 5).toFixed(2);
        card.style.transform = `translateY(-4px) perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  })();

  /* ── BACK TO TOP ── */
  (function toTop() {
    const btn = $("#to-top");
    if (!btn) return;
    const onScroll = () =>
      btn.classList.toggle("show", window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    btn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }),
    );
    onScroll();
  })();

  /* ── CONTACT FORM (mailto fallback) ── */
  const form = $("#contactForm");
  if (form) form.addEventListener("submit", handleForm);
  function handleForm(e) {
    e.preventDefault();
    const f = e.target;
    const btn = f.querySelector(".form-btn");
    const name = f.querySelector("input[type=text]").value;
    const mail = f.querySelector("input[type=email]").value;
    const body = f.querySelector("textarea").value;
    window.location.href =
      "mailto:" +
      TO +
      "?subject=" +
      encodeURIComponent("Hello from " + name) +
      "&body=" +
      encodeURIComponent(body + "\n\nReply to: " + mail);
    const original = btn.innerHTML;
    btn.innerHTML = "&#10003; ส่งเรียบร้อย";
    btn.style.background = "#4caf2a";
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = "";
      f.reset();
    }, 3000);
  }

  /* ── FOOTER YEAR ── */
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
})();
