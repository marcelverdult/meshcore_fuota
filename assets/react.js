(function () {
  // Select text, then copy it as a quote with a link that highlights exactly that text (#:~:text=),
  // or open a prefilled GitHub issue. Feedback goes in issues, see README.
  var COPY = {"en": {"copy": "Copy with link", "issue": "Open GitHub issue", "toast": "Quote and link copied", "title": "Feedback on {section}", "body": "> {quote}\n\n[Read this passage on the page]({link})\n\n---\n\n(Write your comment here and delete this line.)\n", "hint": "Select any text to copy it with a link or open an issue."}, "de": {"copy": "Mit Link kopieren", "issue": "GitHub-Issue öffnen", "toast": "Zitat und Link kopiert", "title": "Rückmeldung zu {section}", "body": "> {quote}\n\n[Diese Stelle auf der Seite lesen]({link})\n\n---\n\n(Kommentar hier eintragen und diese Zeile löschen.)\n", "hint": "Text markieren, um ihn mit Link zu kopieren oder ein Issue zu eröffnen."}};
  var BASE = "https://marcelverdult.github.io/meshcore_fuota/" + (location.pathname.split("/").pop() || "").replace(/^index\.html$/, ""), REPO = "https://github.com/marcelverdult/meshcore_fuota/issues/new";
  var pop = document.querySelector(".react"), toast = document.querySelector(".toast"), wrap = document.querySelector(".wrap");
  var cur = null;
  function lang() { return document.documentElement.getAttribute("data-lang") || "de"; }
  // the element matching sel inside root whose nearest lang block is language l. A selector like [lang="en"] h2
  // is wrong here: <html lang="en"> is an ancestor of every heading, so it would also match the German one.
  function inLang(root, sel, l) {
    var all = root.querySelectorAll(sel), loose = null;
    for (var i = 0; i < all.length; i++) {
      var b = all[i].parentElement && all[i].parentElement.closest("[lang]");
      if (b && b !== document.documentElement) { if (b.getAttribute("lang") === l) return all[i]; }
      else if (!loose) loose = all[i];   // language-neutral heading, used only if no heading of l exists
    }
    return loose;
  }

  function enc(s) { return encodeURIComponent(s).replace(/-/g, "%2D").replace(/,/g, "%2C").replace(/&/g, "%26"); }
  function fragment(t) {
    var w = t.split(/\s+/);
    return w.length <= 10 ? enc(t) : enc(w.slice(0, 5).join(" ")) + "," + enc(w.slice(-5).join(" "));
  }
  function section(node) {
    var s = node.parentElement && node.parentElement.closest("section[id]");
    var h1 = inLang(document, "h1", lang());
    if (!s) return { id: "", title: h1 ? h1.textContent.trim() : "MeshCore FUOTA" };
    var h2 = inLang(s, "h2", lang());
    return { id: s.id, title: h2 ? h2.textContent.trim() : s.id };
  }
  function hide() { pop.hidden = true; cur = null; }
  function show() {
    var sel = getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) return hide();
    var t = sel.toString().replace(/\s+/g, " ").trim(), r = sel.getRangeAt(0);
    if (t.length < 3 || t.length > 600 || !wrap.contains(r.commonAncestorContainer)) return hide();
    if (r.commonAncestorContainer.parentElement && r.commonAncestorContainer.parentElement.closest("canvas,select,button,input,.controls,.chain-ctl")) return hide();
    var sec = section(r.startContainer), c = COPY[lang()];
    cur = { text: t, sec: sec, link: BASE + "#" + lang() + ":~:text=" + fragment(t) };
    pop.querySelector('[data-a="copy"] span').textContent = c.copy;
    pop.querySelector('[data-a="issue"] span').textContent = c.issue;
    var b = r.getBoundingClientRect(), below = matchMedia("(pointer:coarse)").matches;
    pop.hidden = false;
    var x = Math.min(Math.max(b.left + b.width / 2, pop.offsetWidth / 2 + 8), innerWidth - pop.offsetWidth / 2 - 8);
    var y = below || b.top < 120 ? b.bottom + 10 : b.top - pop.offsetHeight - 10;
    pop.style.left = (x + scrollX) + "px"; pop.style.top = (y + scrollY) + "px";
  }
  function flash(msg) { toast.textContent = msg; toast.classList.add("on"); clearTimeout(flash.t); flash.t = setTimeout(function () { toast.classList.remove("on"); }, 1800); }
  function quote(t) { return t.split("\n").map(function (l) { return "> " + l; }).join("\n"); }
  pop.addEventListener("mousedown", function (e) { e.preventDefault(); });
  pop.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b || !cur) return;
    var c = COPY[lang()];
    if (b.dataset.a === "copy") {
      var md = quote(cur.text) + "\n" + cur.sec.title + ": <" + cur.link + ">";
      (navigator.clipboard ? navigator.clipboard.writeText(md) : Promise.reject()).then(function () { flash(c.toast); }, function () { prompt("", md); });
    } else {
      var title = c.title.replace("{section}", cur.sec.title);
      var body = c.body.replace("{quote}", quote(cur.text).slice(2)).replace("{link}", cur.link);
      open(REPO + "?title=" + encodeURIComponent(title) + "&body=" + encodeURIComponent(body), "_blank", "noopener");
    }
    getSelection().removeAllRanges(); hide();
  });
  document.addEventListener("mouseup", function () { setTimeout(show, 0); });
  document.addEventListener("keyup", function (e) { if (e.key === "Escape") { hide(); return; } if (e.shiftKey) show(); });
  document.addEventListener("selectionchange", function () { if (matchMedia("(pointer:coarse)").matches) { clearTimeout(show.t); show.t = setTimeout(show, 400); } else if (getSelection().isCollapsed) hide(); });
  addEventListener("scroll", function () { if (!pop.hidden && matchMedia("(pointer:fine)").matches) show(); }, { passive: true });
})();
