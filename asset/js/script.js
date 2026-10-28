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
            ? '<i class="ph ph-sun" aria-hidden="true"></i>'
            : '<i class="ph ph-moon-stars" aria-hidden="true"></i>';
        btn.setAttribute(
          "aria-label",
          mode === "dark" ? "เปลี่ยนเป็นธีมสว่าง" : "เปลี่ยนเป็นธีมมืด",
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
        // Crossfade between the two themes (timing set in CSS).
        root.classList.add("no-trans");
        const t = document.startViewTransition(() => apply(next));
        t.finished
          .finally(() => root.classList.remove("no-trans"))
          .catch(() => {});
      });
    }
  })();

  /* ── SCROLL PROGRESS BAR (transform only) ── */
  (function progress() {
    const bar = $("#scroll-progress");
    if (!bar) return;
    let queued = false;
    const update = () => {
      queued = false;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!queued) {
          queued = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true },
    );
    update();
  })();

  /* ── MOBILE NAV: full height panel ── */
  (function mobileNav() {
    const btn = $("#hamBtn");
    const panel = $("#mobileNav");
    if (!btn || !panel) return;
    const setOpen = (open) => {
      panel.classList.toggle("open", open);
      btn.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "ปิดเมนู" : "เปิดเมนู");
      panel.setAttribute("aria-hidden", String(!open));
      document.body.classList.toggle("menu-open", open);
      if (open) $("a", panel).focus({ preventScroll: true });
    };
    btn.addEventListener("click", () =>
      setOpen(!panel.classList.contains("open")),
    );
    $$("a", panel).forEach((a) =>
      a.addEventListener("click", () => setOpen(false)),
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && panel.classList.contains("open")) {
        setOpen(false);
        btn.focus();
      }
    });
    window
      .matchMedia("(min-width: 1024px)")
      .addEventListener("change", (m) => m.matches && setOpen(false));
  })();

  /* ── SCROLL REVEAL (once, via IntersectionObserver) ── */
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

  /* ── SCROLLSPY: mark the current section in both menus ── */
  (function scrollspy() {
    const links = $$(".nav-links a, .mobile-nav a");
    if (!links.length || !("IntersectionObserver" in window)) return;
    const ids = [...new Set(links.map((l) => l.getAttribute("href").slice(1)))];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((l) => {
            const on = l.getAttribute("href") === "#" + e.target.id;
            l.classList.toggle("active", on);
            if (on) l.setAttribute("aria-current", "true");
            else l.removeAttribute("aria-current");
          });
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
      "Full stack web developer",
      "Data and statistics",
      "LINE, Telegram and Discord bots",
      "Digital government systems",
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
    const fmt = (n, v) => (n.dataset.prefix || "") + v + (n.dataset.suffix || "");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      nums.forEach((n) => (n.textContent = fmt(n, +n.dataset.count)));
      return;
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
            el.textContent = fmt(el, Math.round(target * eased));
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

  /* ── CARD TILT (transform only) ── */
  (function tilt() {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;
    $$(".card-base").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const rx = (((e.clientY - r.top) / r.height - 0.5) * -5).toFixed(2);
        const ry = (((e.clientX - r.left) / r.width - 0.5) * 5).toFixed(2);
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
    const onScroll = () => btn.classList.toggle("show", window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    btn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }),
    );
    onScroll();
  })();

  /* ── CONTACT FORM: inline validation, then mailto ── */
  (function contactForm() {
    const form = $("#contactForm");
    if (!form) return;
    const status = $("#formStatus");
    const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const fields = [
      {
        el: $("#cfName"),
        check: (v) => (v ? "" : "กรอกชื่อของคุณ เพื่อให้ผมรู้ว่าจะตอบกลับใคร"),
      },
      {
        el: $("#cfEmail"),
        check: (v) =>
          !v
            ? "กรอกอีเมลที่ใช้ติดต่อกลับ"
            : EMAIL.test(v)
              ? ""
              : "รูปแบบอีเมลไม่ถูกต้อง ตัวอย่างเช่น name@example.com",
      },
      {
        el: $("#cfMsg"),
        check: (v) => (v ? "" : "เขียนข้อความที่อยากคุยอย่างน้อยหนึ่งประโยค"),
      },
    ];
    const show = (f, msg) => {
      const err = document.getElementById(f.el.getAttribute("aria-describedby"));
      f.el.setAttribute("aria-invalid", msg ? "true" : "false");
      err.textContent = msg;
      err.hidden = !msg;
    };
    fields.forEach((f) =>
      f.el.addEventListener("input", () => {
        if (f.el.getAttribute("aria-invalid") === "true")
          show(f, f.check(f.el.value.trim()));
      }),
    );
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let firstBad = null;
      fields.forEach((f) => {
        const msg = f.check(f.el.value.trim());
        show(f, msg);
        if (msg && !firstBad) firstBad = f.el;
      });
      if (firstBad) {
        status.textContent = "";
        firstBad.focus();
        return;
      }
      const [name, mail, body] = fields.map((f) => f.el.value.trim());
      window.location.href =
        "mailto:" +
        TO +
        "?subject=" +
        encodeURIComponent("Hello from " + name) +
        "&body=" +
        encodeURIComponent(body + "\n\nReply to: " + mail);
      // A mailto link only opens the visitor's mail app, so say exactly that.
      status.textContent =
        "เปิดโปรแกรมอีเมลพร้อมข้อความของคุณแล้ว กดส่งในโปรแกรมอีเมลเพื่อส่งถึงกฤษณชัย";
    });
  })();

  /* ── FOOTER YEAR ── */
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
})();
