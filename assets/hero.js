(function () {
  // Hero: one repeater gets the release by cable, then neighbours pull it hop by hop over LoRa.
  // Old firmware = orange, new = teal; the ring around a repeater fills page by page while it pulls.
  // Time-based: state(t) is a pure function of the loop time, so every frame can be redrawn from scratch.
  var W = 1040, H = 230, G = 196, LOOP = 13, NS = "http://www.w3.org/2000/svg";
  // kind: roof (building w/h), mast (lattice), peak (mountain)
  var N = [
    { x: 70,  kind: "roof", w: 92,  h: 70 },
    { x: 190, kind: "mast", h: 120 },
    { x: 310, kind: "roof", w: 96,  h: 96 },
    { x: 440, kind: "roof", w: 100, h: 126 },   // seed
    { x: 570, kind: "roof", w: 92,  h: 64 },
    { x: 676, kind: "mast", h: 104 },
    { x: 830, kind: "peak", h: 128 },
    { x: 992, kind: "roof", w: 66,  h: 52 }
  ];
  var SEED = 3, PAGES = 4, T0 = 1.2, HOP = 1.9, PULL = 1.5;
  N.forEach(function (n, i) { n.hop = Math.abs(i - SEED); n.top = G - n.h; n.done = T0 + n.hop * HOP; });
  var LAST = Math.max.apply(null, N.map(function (n) { return n.done; }));

  function el(name, attrs, parent) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function arc(cx, cy, r, a0, a1) {   // angles in degrees, 0 = up, clockwise
    var p = function (a) { a = (a - 90) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
    var s = p(a0), e = p(a1);
    return "M" + s[0].toFixed(1) + " " + s[1].toFixed(1) + "A" + r + " " + r + " 0 " + (a1 - a0 > 180 ? 1 : 0) + " 1 " + e[0].toFixed(1) + " " + e[1].toFixed(1);
  }

  function build(host) {
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, class: "hero-svg", "aria-hidden": "true", focusable: "false" }, host);
    var bg = el("g", { class: "h-struct" }, svg);
    el("line", { x1: 0, y1: G, x2: W, y2: G, class: "h-ground" }, bg);
    N.forEach(function (n) {
      if (n.kind === "roof") {
        el("rect", { x: n.x - n.w / 2, y: n.top, width: n.w, height: n.h, rx: 1.5 }, bg);
        for (var r = 0; r < Math.floor(n.h / 26); r++) for (var c = 0; c < 2; c++)
          if ((r * 3 + c + n.x) % 4) el("rect", { x: n.x - n.w / 2 + 14 + c * (n.w - 36), y: n.top + 16 + r * 26, width: 6, height: 6, class: "h-win" }, bg);
      } else if (n.kind === "mast") {
        el("path", { d: "M" + (n.x - 14) + " " + G + "L" + n.x + " " + n.top + "L" + (n.x + 14) + " " + G }, bg);
        for (var y = n.top + 18; y < G - 6; y += 18) {
          var hw = 14 * (y - n.top) / n.h;
          el("line", { x1: n.x - hw, y1: y, x2: n.x + hw, y2: y }, bg);
        }
      } else {
        el("path", { d: "M" + (n.x - 120) + " " + G + "L" + (n.x - 40) + " " + (n.top + 40) + "L" + (n.x - 18) + " " + (n.top + 30) + "L" + n.x + " " + n.top +
          "L" + (n.x + 48) + " " + (n.top + 64) + "L" + (n.x + 66) + " " + (n.top + 58) + "L" + (n.x + 100) + " " + G }, bg);
        el("path", { d: "M" + (n.x - 18) + " " + (n.top + 30) + "L" + n.x + " " + (n.top + 12) + "L" + (n.x + 16) + " " + (n.top + 28), class: "h-snow" }, bg);
      }
    });
    var cable = el("path", { class: "h-cable", d: "M" + (N[SEED].x - 120) + " " + (G + 22) + "H" + (N[SEED].x - 40) + "V" + (N[SEED].top - 10) + "H" + (N[SEED].x - 16) }, svg);
    var len = cable.getTotalLength ? cable.getTotalLength() : 400;
    cable.style.strokeDasharray = len;
    N.forEach(function (n) {
      var g = el("g", { class: "h-node", transform: "translate(" + n.x + " " + (n.top - 12) + ")" }, svg);
      n.waves = [0, 1].map(function () { return el("path", { class: "h-wave" }, g); });
      n.segs = [];
      for (var p = 0; p < PAGES; p++) n.segs.push(el("path", { class: "h-seg", d: arc(0, 0, 21, p * 90 + 8, p * 90 + 82) }, g));
      el("line", { x1: 0, y1: -10, x2: 0, y2: -20, class: "h-ant" }, g);
      n.antTip = el("path", { class: "h-ant", d: "M-5 -22A6 6 0 0 1 5 -22" }, g);
      el("rect", { x: -15, y: -10, width: 30, height: 20, rx: 4, class: "h-box" }, g);
      n.led = el("circle", { cx: 0, cy: 0, r: 3, class: "h-led" }, g);
      n.g = g;
    });
    return { svg: svg, cable: cable, len: len };
  }

  function render(o, t) {
    var fade = t > LOOP - 0.8 ? Math.max(0, (LOOP - t) / 0.8) : t < 0.4 ? t / 0.4 : 1;
    o.svg.style.setProperty("--h-fade", fade.toFixed(3));
    var c = Math.min(1, Math.max(0, (t - 0.1) / (T0 - 0.2)));       // cable draws in, then fades out
    o.cable.style.strokeDashoffset = (o.len * (1 - c)).toFixed(1);
    o.cable.style.opacity = t < T0 + 0.6 ? 1 : Math.max(0, 1 - (t - T0 - 0.6) / 0.6);
    N.forEach(function (n) {
      var isNew = t >= n.done;
      n.g.classList.toggle("new", isNew);
      var pullStart = n.done - PULL, prog = n.hop === 0 ? (t >= n.done ? 1 : 0) : Math.min(1, Math.max(0, (t - pullStart) / PULL));
      var pages = n.hop === 0 ? (isNew ? PAGES : 0) : Math.floor(prog * PAGES + 1e-6);
      var ringOn = n.hop > 0 && t > pullStart - 0.2 && t < n.done + 0.9;
      n.segs.forEach(function (s, i) {
        s.classList.toggle("on", i < pages);
        s.style.opacity = ringOn ? 1 : 0;
      });
      // offer waves: busy while an unfinished neighbour pulls, then rare (Trickle)
      var busy = isNew && N.some(function (m) { return Math.abs(m.hop - n.hop) === 1 && m.hop > n.hop && t < m.done; });
      n.waves.forEach(function (w, i) {
        var period = busy ? 1.1 : 3.4, ph = ((t - n.done) / period - i / 2) % 1;
        var on = isNew && (busy || i === 0) && ph >= 0 && t - n.done > i * period / 2;
        var r = 14 + ph * 46;
        w.setAttribute("d", arc(0, -18, r.toFixed(1), -48, 48));
        w.style.opacity = on ? ((1 - ph) * (busy ? 0.7 : 0.35)).toFixed(3) : 0;
      });
    });
  }

  var hosts = [].slice.call(document.querySelectorAll(".hero-anim"));
  if (!hosts.length) return;
  var objs = hosts.map(build);
  var still = matchMedia("(prefers-reduced-motion: reduce)");
  var start = performance.now(), visible = true, paused = false;
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.fuotaSeen = e.isIntersecting; });
      visible = hosts.some(function (h) { return h.fuotaSeen; });
    });
    hosts.forEach(function (h) { h.fuotaSeen = true; io.observe(h); });
  }
  function frame(now) {
    if (still.matches) { objs.forEach(function (o) { render(o, LAST + 1); }); return; }
    if (visible && !paused) { var t = ((now - start) / 1000) % LOOP; objs.forEach(function (o) { render(o, t); }); }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  window.fuotaHero = { render: function (t) { paused = true; objs.forEach(function (o) { render(o, t); }); }, loop: LOOP };
})();
