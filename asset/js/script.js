// เพิ่ม interactive effect ให้กับปุ่ม social และ project card

document.addEventListener("DOMContentLoaded", function () {
  // Social links ripple effect
  document.querySelectorAll(".social-links a").forEach(function (link) {
    link.addEventListener("mousedown", function (e) {
      link.classList.add("active");
    });
    link.addEventListener("mouseup", function (e) {
      link.classList.remove("active");
    });
    link.addEventListener("mouseleave", function (e) {
      link.classList.remove("active");
    });
  });

  // Project card hover effect
  document.querySelectorAll(".project-card").forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      card.style.boxShadow = "0 4px 16px rgba(60,120,200,0.13)";
      card.style.transform = "translateY(-4px) scale(1.03)";
    });
    card.addEventListener("mouseleave", function () {
      card.style.boxShadow = "";
      card.style.transform = "";
    });
  });

  // Particle background effect
  function createParticles() {
    const canvas = document.createElement("canvas");
    canvas.id = "particles-bg";
    document.body.prepend(canvas);
    const ctx = canvas.getContext("2d");
    let w = window.innerWidth,
      h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    let particles = [];
    for (let i = 0; i < 38; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1.2 + Math.random() * 2.8,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        o: 0.12 + Math.random() * 0.18,
      });
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(58,123,213,${p.o})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
      }
      requestAnimationFrame(draw);
    }
    draw();
    window.addEventListener("resize", () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    });
  }

  createParticles();
});
