(function () {
  // language buttons: the head script already picked the language (#de / #en, saved choice, else the browser);
  // a click switches it on this page and is remembered for the other pages
  var root = document.documentElement;
  function setLang(l) {
    root.setAttribute("data-lang", l);
    root.setAttribute("lang", l);
    ["de", "en"].forEach(function (x) { document.getElementById("btn-" + x).setAttribute("aria-pressed", String(x === l)); });
    try { localStorage.setItem("fuota-lang", l); } catch (e) {}
    document.querySelectorAll("option[data-de]").forEach(function (o) { o.textContent = o.getAttribute("data-" + l); });
    var t = document.body.getAttribute("data-title-" + l);
    if (t) document.title = t;
    if (window.fuotaSim) window.fuotaSim.redraw();
    if (window.fuotaChain) window.fuotaChain.redraw();
  }
  document.querySelectorAll(".langs button").forEach(function (b) { b.addEventListener("click", function () { setLang(b.dataset.l); }); });
  window.addEventListener("hashchange", function () {
    var h = location.hash.slice(1), moved = window.fuotaMoved || {};
    if (moved[h]) location.replace(moved[h] + "#" + h);   // an old section link followed on the overview itself
    else if (h === "de" || h === "en") setLang(h);
  });
  setLang(root.getAttribute("data-lang") === "en" ? "en" : "de");
  // narrow screens: the page navigation is one row that scrolls sideways; show the current page in it
  var cur = document.querySelector("nav.pages a[aria-current]");
  if (cur) cur.parentNode.parentNode.scrollLeft = cur.offsetLeft - 16;
})();

(function () {
  // top bar: reading progress and the section in view; on wide screens a rail with the sections of this page,
  // shown once the page head has scrolled away
  var bar = document.querySelector(".bar");
  if (!bar) return;
  var prog = bar.querySelector(".progress"), here = bar.querySelector(".here"), rail = document.querySelector(".rail");
  var head = document.querySelector("main header.hero");
  var secs = [].slice.call(document.querySelectorAll("main section[id]"));
  function heading(s, l) {
    var h = s.querySelector('[lang="' + l + '"] h2') || s.querySelector("h2") || s.querySelector("h3");
    return h ? h.textContent.replace(/\s+/g, " ").trim() : "";
  }
  if (secs.length > 1) {
    var ol = document.createElement("ol");
    secs.forEach(function (s) {
      var a = document.createElement("a");
      a.href = "#" + s.id;
      ["de", "en"].forEach(function (l) {
        var t = document.createElement("span");
        t.lang = l;
        t.textContent = heading(s, l);
        a.appendChild(t);
      });
      var li = document.createElement("li");
      li.appendChild(a);
      ol.appendChild(li);
    });
    rail.appendChild(ol);
  }
  function tick() {
    var y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
    prog.style.width = (max > 0 ? 100 * y / max : 0) + "%";
    var cur = null, l = document.documentElement.getAttribute("data-lang") || "de";
    secs.forEach(function (s) { if (s.getBoundingClientRect().top < 120) cur = s; });
    here.textContent = cur && secs.length > 1 ? heading(cur, l) : "";
    rail.classList.toggle("on", secs.length > 1 && (!head || head.getBoundingClientRect().bottom < 0));
    rail.querySelectorAll("a").forEach(function (a) { a.classList.toggle("cur", !!cur && a.getAttribute("href") === "#" + cur.id); });
  }
  addEventListener("scroll", tick, { passive: true });
  addEventListener("resize", tick);
  document.querySelectorAll(".langs button").forEach(function (b) { b.addEventListener("click", function () { setTimeout(tick); }); });
  tick();
})();
