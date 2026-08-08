/* AHN CONTENTS LaB — interactions */
(function () {
  "use strict";
  var header = document.querySelector(".site-header");
  var toTop = document.querySelector(".to-top");

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle("scrolled", y > 20);
    if (toTop) toTop.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = document.querySelector(".nav-toggle");
  if (toggle) toggle.addEventListener("click", function () { document.body.classList.toggle("nav-open"); });
  var backdrop = document.querySelector(".nav-backdrop");
  if (backdrop) backdrop.addEventListener("click", function () { document.body.classList.remove("nav-open"); });

  document.querySelectorAll(".nav-menu > li.has-sub > a").forEach(function (a) {
    a.addEventListener("click", function (e) {
      if (window.matchMedia("(max-width:960px)").matches) {
        e.preventDefault();
        a.parentElement.classList.toggle("open");
      }
    });
  });
  document.querySelectorAll(".nav-menu a").forEach(function (a) {
    a.addEventListener("click", function () {
      if (!a.parentElement.classList.contains("has-sub")) document.body.classList.remove("nav-open");
    });
  });

  if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  // reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // gallery lightbox
  var lb = document.querySelector(".lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    document.querySelectorAll(".gcard").forEach(function (c) {
      c.addEventListener("click", function () {
        var m = c.style.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
        if (m) { lbImg.src = m[1]; lb.classList.add("open"); }
      });
    });
    lb.addEventListener("click", function () { lb.classList.remove("open"); });
  }

  // section title underline draw
  var titles = document.querySelectorAll(".sec-title");
  if ("IntersectionObserver" in window && titles.length) {
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io2.unobserve(e.target); } });
    }, { threshold: 0.6 });
    titles.forEach(function (t) { io2.observe(t); });
  } else {
    titles.forEach(function (t) { t.classList.add("in"); });
  }
})();

// ===== performance carousel auto-advance =====
(function () {
  var c = document.getElementById("perfCarousel");
  if (!c) return;
  var paused = false;
  c.addEventListener("mouseenter", function () { paused = true; });
  c.addEventListener("mouseleave", function () { paused = false; });
  c.addEventListener("touchstart", function () { paused = true; }, { passive: true });
  setInterval(function () {
    if (paused) return;
    var slide = c.querySelector(".slide");
    if (!slide) return;
    var step = slide.getBoundingClientRect().width + 26;
    var max = c.scrollWidth - c.clientWidth - 4;
    if (c.scrollLeft >= max) c.scrollTo({ left: 0, behavior: "smooth" });
    else c.scrollBy({ left: step, behavior: "smooth" });
  }, 3500);
})();

// ===== intro splash (once per session) =====
(function () {
  var sp = document.getElementById("introSplash");
  if (!sp) return;
  try {
    if (sessionStorage.getItem("aclIntroShown")) { sp.remove(); return; }
    sessionStorage.setItem("aclIntroShown", "1");
  } catch (e) {}
  document.body.classList.add("intro-lock");
  setTimeout(function () {
    sp.classList.add("hide");
    document.body.classList.remove("intro-lock");
    setTimeout(function () { sp.remove(); }, 1200);
  }, 3200);
})();

// ===== cursor saturn follower (dark & sparkling) =====
(function () {
  if (window.matchMedia("(hover:none)").matches) return;
  var el = document.createElement("div");
  el.className = "cursor-saturn";
  el.innerHTML =
    '<svg width="34" height="34" viewBox="0 0 48 48" fill="none">' +
    '<defs><radialGradient id="satG" cx="35%" cy="30%" r="75%">' +
    '<stop offset="0%" stop-color="#4a4370"/><stop offset="55%" stop-color="#2a2547"/><stop offset="100%" stop-color="#14112a"/>' +
    '</radialGradient></defs>' +
    '<g transform="rotate(-18 24 24)">' +
    '<ellipse cx="24" cy="24" rx="21" ry="7.5" stroke="#8f83c9" stroke-width="1.6" opacity=".45"/>' +
    '<circle cx="24" cy="24" r="11" fill="url(#satG)"/>' +
    '<path d="M3 24a21 7.5 0 0 0 42 0" stroke="#b8a9e8" stroke-width="1.8" opacity=".85" fill="none"/>' +
    '<ellipse cx="24" cy="24" rx="16" ry="5.4" stroke="#6f639e" stroke-width="1" opacity=".4"/>' +
    '</g>' +
    '<circle class="spk s1" cx="9" cy="10" r="1.4" fill="#fff"/>' +
    '<circle class="spk s2" cx="40" cy="13" r="1.1" fill="#e4cf9a"/>' +
    '<circle class="spk s3" cx="37" cy="38" r="1.3" fill="#cfc3ff"/>' +
    '<circle class="spk s4" cx="10" cy="36" r="0.9" fill="#fff"/>' +
    '</svg>';
  document.body.appendChild(el);
  var mx = innerWidth / 2, my = innerHeight / 2, x = mx, y = my;
  addEventListener("mousemove", function (e) { mx = e.clientX + 20; my = e.clientY + 22; });
  addEventListener("mousedown", function () {
    el.classList.remove("clicked"); void el.offsetWidth; el.classList.add("clicked");
  });
  (function loop() {
    x += (mx - x) * 0.12; y += (my - y) * 0.12;
    el.style.transform = "translate(" + (x - 17) + "px," + (y - 17) + "px)";
    requestAnimationFrame(loop);
  })();
})();


// ===== intro splash starfield (stars are born one by one, then twinkle) =====
(function () {
  var cv = document.getElementById("isStars");
  if (!cv) return;
  var ctx = cv.getContext("2d");
  var stars = [], running = true, t0 = performance.now();
  function resize() {
    cv.width = innerWidth * devicePixelRatio;
    cv.height = innerHeight * devicePixelRatio;
  }
  resize(); addEventListener("resize", resize);
  var N = Math.min(220, Math.floor(innerWidth * innerHeight / 6000));
  for (var i = 0; i < N; i++) {
    stars.push({
      x: Math.random(), y: Math.random(),
      r: Math.random() < 0.12 ? 1.6 + Math.random() * 1.4 : 0.5 + Math.random() * 0.9,
      birth: Math.random() * 2000,             // appears within first 2s, one by one
      tw: 1.2 + Math.random() * 2.4,           // twinkle speed
      ph: Math.random() * Math.PI * 2,
      warm: Math.random() < 0.18               // a few warm-tinted stars
    });
  }
  function draw(now) {
    if (!running) return;
    var t = now - t0;
    var w = cv.width, h = cv.height, dpr = devicePixelRatio;
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var age = t - s.birth;
      if (age < 0) continue;
      var born = Math.min(age / 600, 1);                       // 0.6s fade-in
      var tw = 0.55 + 0.45 * Math.sin(t / 1000 * s.tw + s.ph); // twinkle
      var a = born * (0.25 + 0.75 * tw);
      var x = s.x * w, y = s.y * h, r = s.r * dpr * (0.85 + 0.3 * tw);
      ctx.globalAlpha = a;
      ctx.fillStyle = s.warm ? "#ffe9c4" : "#ffffff";
      ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
      if (s.r > 1.5) {                                          // bright stars: glow + cross flare
        ctx.globalAlpha = a * 0.35;
        var g = ctx.createRadialGradient(x, y, 0, x, y, r * 6);
        g.addColorStop(0, s.warm ? "rgba(255,230,190,.9)" : "rgba(200,215,255,.9)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, r * 6, 0, 6.2832); ctx.fill();
        ctx.globalAlpha = a * 0.55;
        ctx.strokeStyle = "#fff"; ctx.lineWidth = dpr * 0.6;
        ctx.beginPath();
        ctx.moveTo(x - r * 4, y); ctx.lineTo(x + r * 4, y);
        ctx.moveTo(x, y - r * 4); ctx.lineTo(x, y + r * 4);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    if (document.getElementById("introSplash")) requestAnimationFrame(draw);
    else running = false;
  }
  requestAnimationFrame(draw);
})();
