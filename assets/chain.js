(function () {
  // Replay of the measured chain run (bench, 10 % budget, SF7): [seconds, node, kind, a, b] from the logs of A, B, C.
  // kinds: O offer (a = pages), R request (a = block, b = fragments asked), D data sent (a = fragment), r data received,
  // M manifest checked, P page checked (a = page), C complete, X image rebuilt and reboot, S serving again, K confirmed.
  var EV = [[0.0,0,"O",4,0],[1.9,1,"R",0,2],[2.2,0,"D",0,0],[2.9,1,"r",0,0],[8.6,0,"D",1,0],[8.9,1,"M",0,0],[8.9,1,"r",1,0],[9.6,1,"R",0,14],[11.1,0,"D",2,0],[11.7,1,"r",2,0],[14.0,1,"O",0,0],[16.2,2,"R",0,2],[17.3,1,"D",0,0],[17.5,0,"D",3,0],[17.9,2,"r",0,0],[18.6,1,"r",3,0],[23.7,1,"D",1,0],[23.9,0,"D",4,0],[24.0,2,"M",0,0],[24.0,2,"r",1,0],[24.7,1,"r",4,0],[24.9,2,"R",0,14],[30.3,0,"D",5,0],[31.0,1,"r",5,0],[33.2,2,"O",0,0],[36.8,0,"D",6,0],[37.4,1,"r",6,0],[43.2,0,"D",7,0],[43.8,1,"r",7,0],[49.1,2,"O",0,0],[49.6,0,"D",8,0],[50.3,1,"r",8,0],[53.3,0,"K",0,0],[54.8,2,"R",0,14],[56.0,0,"D",9,0],[56.7,1,"r",9,0],[62.5,0,"D",10,0],[63.8,1,"r",10,0],[68.9,0,"D",11,0],[69.5,1,"r",11,0],[75.3,0,"D",12,0],[76.0,1,"r",12,0],[79.4,2,"O",0,0],[81.7,0,"D",13,0],[82.6,1,"r",13,0],[84.7,2,"R",0,14],[88.1,0,"D",14,0],[88.8,1,"r",14,0],[94.6,0,"D",15,0],[95.2,1,"r",15,0],[95.7,1,"R",1,16],[101.0,0,"D",16,0],[101.6,1,"r",16,0],[107.4,0,"D",17,0],[108.1,1,"r",17,0],[113.8,0,"D",18,0],[114.5,1,"r",18,0],[114.6,2,"R",0,14],[120.3,0,"D",19,0],[120.9,1,"r",19,0],[126.7,0,"D",20,0],[127.3,1,"r",20,0],[133.1,0,"D",21,0],[133.8,1,"r",21,0],[139.5,0,"D",22,0],[140.2,1,"r",22,0],[144.5,2,"R",0,14],[145.9,0,"D",23,0],[146.6,1,"r",23,0],[151.5,1,"O",0,0],[152.4,0,"D",24,0],[153.0,1,"r",24,0],[158.8,0,"D",25,0],[159.4,1,"P",0,0],[159.4,1,"r",25,0],[160.3,1,"O",1,0],[161.4,2,"R",0,14],[162.4,1,"D",2,0],[163.1,2,"r",2,0],[165.2,0,"D",26,0],[165.9,1,"r",26,0],[168.8,1,"D",3,0],[169.5,2,"r",3,0],[171.6,0,"D",27,0],[172.3,1,"r",27,0],[175.2,1,"D",4,0],[175.9,2,"r",4,0],[178.0,0,"D",28,0],[178.7,1,"r",28,0],[181.6,1,"D",5,0],[182.3,2,"r",5,0],[184.5,0,"D",29,0],[185.1,1,"r",29,0],[188.0,1,"D",6,0],[188.7,2,"r",6,0],[190.9,0,"D",30,0],[191.5,1,"r",30,0],[194.4,1,"D",7,0],[195.1,2,"r",7,0],[197.3,0,"D",31,0],[198.0,1,"r",31,0],[200.8,1,"R",2,16],[202.2,1,"D",8,0],[202.9,2,"r",8,0],[203.7,0,"D",32,0],[204.4,1,"r",32,0],[208.6,1,"D",9,0],[209.3,2,"r",9,0],[210.2,0,"D",33,0],[210.8,1,"r",33,0],[215.0,1,"D",10,0],[215.7,2,"r",10,0],[216.6,0,"D",34,0],[217.2,1,"r",34,0],[221.4,1,"D",11,0],[222.1,2,"r",11,0],[223.0,0,"D",35,0],[223.7,1,"r",35,0],[227.8,1,"D",12,0],[228.5,2,"r",12,0],[229.4,0,"D",36,0],[230.1,1,"r",36,0],[234.2,1,"D",13,0],[234.9,2,"r",13,0],[235.8,0,"D",37,0],[236.5,1,"r",37,0],[240.6,1,"D",14,0],[241.3,2,"r",14,0],[242.3,0,"D",38,0],[242.9,1,"r",38,0],[247.0,1,"D",15,0],[247.7,2,"r",15,0],[248.4,2,"R",1,16],[248.7,0,"D",39,0],[249.3,1,"r",39,0],[253.4,1,"D",16,0],[254.1,2,"r",16,0],[255.1,0,"D",40,0],[255.8,1,"r",40,0],[259.8,1,"D",17,0],[260.5,2,"r",17,0],[261.5,0,"D",41,0],[262.2,1,"r",41,0],[266.2,1,"D",18,0],[266.9,2,"r",18,0],[268.0,0,"D",42,0],[268.6,1,"r",42,0],[272.7,1,"D",19,0],[273.3,2,"r",19,0],[274.4,0,"D",43,0],[275.0,1,"r",43,0],[279.1,1,"D",20,0],[279.7,2,"r",20,0],[280.8,0,"D",44,0],[281.5,1,"r",44,0],[285.5,1,"D",21,0],[286.1,2,"r",21,0],[287.2,0,"D",45,0],[287.9,1,"r",45,0],[291.9,1,"D",22,0],[292.5,2,"r",22,0],[293.6,0,"D",46,0],[294.3,1,"r",46,0],[298.3,1,"D",23,0],[298.9,2,"r",23,0],[300.1,0,"D",47,0],[300.7,1,"r",47,0],[304.7,1,"R",3,16],[306.1,1,"D",24,0],[306.5,0,"D",48,0],[306.7,2,"r",24,0],[307.5,1,"P",1,0],[307.5,1,"r",48,0],[308.6,2,"O",0,0],[312.9,0,"D",49,0],[313.6,1,"r",49,0],[313.8,1,"O",2,0],[314.8,2,"R",1,7],[315.8,1,"D",25,0],[316.4,2,"P",0,0],[316.4,2,"r",25,0],[317.1,2,"O",1,0],[319.3,0,"D",50,0],[320.0,1,"r",50,0],[322.2,1,"D",26,0],[322.8,2,"r",26,0],[325.8,0,"D",51,0],[326.4,1,"r",51,0],[328.6,1,"D",27,0],[329.2,2,"r",27,0],[332.2,0,"D",52,0],[332.8,1,"r",52,0],[335.0,1,"D",28,0],[335.6,2,"r",28,0],[338.6,0,"D",53,0],[339.3,1,"r",53,0],[341.4,1,"D",29,0],[342.0,2,"r",29,0],[345.0,0,"D",54,0],[345.7,1,"r",54,0],[347.8,1,"D",30,0],[348.4,2,"r",30,0],[351.4,0,"D",55,0],[352.1,1,"r",55,0],[354.2,1,"D",31,0],[354.8,2,"r",31,0],[355.7,2,"R",2,16],[357.9,0,"D",56,0],[358.5,1,"r",56,0],[360.6,1,"D",32,0],[361.2,2,"r",32,0],[364.3,0,"D",57,0],[364.9,1,"r",57,0],[367.0,1,"D",33,0],[367.6,2,"r",33,0],[370.7,0,"D",58,0],[371.4,1,"r",58,0],[373.4,1,"D",34,0],[374.0,2,"r",34,0],[377.1,0,"D",59,0],[377.8,1,"r",59,0],[379.8,1,"D",35,0],[380.4,2,"r",35,0],[383.6,0,"D",60,0],[384.2,1,"r",60,0],[386.2,1,"D",36,0],[390.0,0,"D",61,0],[390.6,1,"r",61,0],[392.6,1,"D",37,0],[393.2,2,"r",37,0],[396.4,0,"D",62,0],[397.1,1,"r",62,0],[399.0,1,"D",38,0],[399.6,2,"r",38,0],[402.8,0,"D",63,0],[403.5,1,"r",63,0],[405.4,1,"R",4,9],[406.8,1,"D",39,0],[407.4,2,"r",39,0],[409.2,0,"D",64,0],[409.9,1,"r",64,0],[413.2,1,"D",40,0],[413.8,2,"r",40,0],[415.7,0,"D",65,0],[416.3,1,"r",65,0],[419.6,1,"D",41,0],[420.2,2,"r",41,0],[422.1,0,"D",66,0],[422.7,1,"r",66,0],[426.0,1,"D",42,0],[426.7,2,"r",42,0],[428.5,0,"D",67,0],[429.2,1,"r",67,0],[432.4,1,"D",43,0],[433.1,2,"r",43,0],[434.9,0,"D",68,0],[435.6,1,"r",68,0],[438.8,1,"D",44,0],[439.5,2,"r",44,0],[441.4,0,"D",69,0],[442.0,1,"r",69,0],[445.2,1,"D",45,0],[445.9,2,"r",45,0],[447.8,0,"D",70,0],[448.4,1,"r",70,0],[451.6,1,"D",46,0],[452.3,2,"r",46,0],[454.2,0,"D",71,0],[454.9,1,"P",2,0],[454.9,1,"r",71,0],[458.0,1,"D",47,0],[458.7,2,"r",47,0],[460.6,0,"D",72,0],[460.8,1,"P",3,0],[460.8,1,"r",72,0],[463.2,2,"R",2,1],[464.4,1,"C",0,0],[474.6,2,"R",2,1],[474.6,0,"O",4,0],[477.7,1,"D",36,0],[477.7,1,"X",0,0],[478.3,2,"r",36,0],[478.8,2,"R",3,16],[508.9,2,"R",3,16],[513.2,0,"O",4,0],[521.0,1,"S",0,0],[528.6,1,"O",4,0],[529.2,2,"R",3,16],[530.6,1,"D",48,0],[531.2,2,"P",1,0],[531.2,2,"r",48,0],[531.8,2,"O",2,0],[537.0,1,"D",49,0],[537.6,2,"r",49,0],[543.4,1,"D",50,0],[544.0,2,"r",50,0],[549.8,1,"D",51,0],[550.4,2,"r",51,0],[556.2,1,"D",52,0],[556.8,2,"r",52,0],[562.6,1,"D",53,0],[563.2,2,"r",53,0],[569.0,1,"D",54,0],[569.6,2,"r",54,0],[575.4,1,"D",55,0],[576.0,2,"r",55,0],[580.3,1,"K",0,0],[581.8,1,"D",56,0],[582.4,2,"r",56,0],[588.2,1,"D",57,0],[588.8,2,"r",57,0],[594.6,1,"D",58,0],[595.2,2,"r",58,0],[601.0,1,"D",59,0],[601.6,2,"r",59,0],[607.4,1,"D",60,0],[608.0,2,"r",60,0],[613.8,1,"D",61,0],[614.4,2,"r",61,0],[620.2,1,"D",62,0],[620.8,2,"r",62,0],[626.6,1,"D",63,0],[627.2,2,"r",63,0],[627.6,2,"R",4,9],[633.0,1,"D",64,0],[634.0,2,"r",64,0],[639.4,1,"D",65,0],[640.0,2,"r",65,0],[645.8,1,"D",66,0],[646.5,2,"r",66,0],[652.2,1,"D",67,0],[652.9,2,"r",67,0],[658.6,1,"D",68,0],[659.3,2,"r",68,0],[665.0,1,"D",69,0],[665.7,2,"r",69,0],[671.4,1,"D",70,0],[672.1,2,"r",70,0],[677.8,1,"D",71,0],[678.5,2,"P",2,0],[678.5,2,"r",71,0],[684.2,1,"D",72,0],[684.4,2,"P",3,0],[684.4,2,"r",72,0],[684.7,2,"C",0,0],[686.1,0,"O",4,0],[698.0,2,"X",0,0],[698.0,2,"O",4,0],[738.6,1,"O",4,0],[741.1,2,"S",0,0],[749.9,2,"O",4,0],[766.7,2,"O",4,0]];
  var cv = document.getElementById("chainCv");
  if (!cv || !EV.length) return;
  var ctx = cv.getContext("2d"), END = EV[EV.length - 1][0] + 6, t = 170, playing = false, last = 0, focus = -1;
  var MF = 2, PATCH_FR = 71, NAMES = ["A", "B", "C"], pageOf = [], perPage = [0, 0, 0, 0];
  for (var j = 0; j < PATCH_FR; j++) { var pg = Math.floor(j * 176 / 4096); pageOf.push(pg); perPage[pg]++; }
  var el = function (id) { return document.getElementById(id); };
  function lang() { return document.documentElement.getAttribute("data-lang") || "de"; }
  function col(n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }
  function mmss(s) { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }
  // who hears whom in the chain: A and B, B and C
  function targets(i, k) { if (i !== 1) return [1]; if (k === "R") return [0]; if (k === "D") return [2]; return [0, 2]; }
  function describe(e) {
    var de = lang() === "de", n = NAMES[e[1]], k = e[2], a = e[3], b = e[4], to = NAMES[targets(e[1], k)[0]];
    switch (k) {
      case "O": return de ? n + " bietet an: Kampagne mit " + a + " von 4 Seiten geprüft" : n + " offers the campaign with " + a + " of 4 pages checked";
      case "R": return a === 0 && b <= 2
        ? (de ? n + " fragt " + to + " nach dem Manifest" : n + " asks " + to + " for the manifest")
        : (de ? n + " fragt " + to + " nach Block " + a + ": " + b + " Fragmente fehlen" : n + " asks " + to + " for block " + a + ": " + b + " fragments missing");
      case "D": return de ? n + " sendet " + to + " Fragment " + a + (a < MF ? " (Manifest)" : "") : n + " sends fragment " + a + (a < MF ? " (manifest)" : "") + " to " + to;
      case "M": return de ? n + ": Manifest komplett, Signatur und Felder geprüft" : n + ": manifest complete, signature and fields checked";
      case "P": return de ? n + ": Seite " + a + " komplett, Hash stimmt, ab jetzt gibt " + n + " sie weiter" : n + ": page " + a + " complete, hash checks out, " + n + " passes it on from now";
      case "C": return de ? n + ": alle Seiten da, Patch-Hash stimmt, baut das neue Image" : n + ": all pages here, patch hash checks out, building the new image";
      case "X": return de ? n + ": Image gebaut (12 s), Neustart, Stage-0 tauscht" : n + ": image built (12 s), reboot, Stage-0 swaps";
      case "S": return de ? n + ": läuft v3 und bietet den Patch weiter an" : n + ": runs v3 and keeps offering the patch";
      case "K": return de ? n + ": Probestart bestätigt" : n + ": test boot confirmed";
    }
    return "";
  }
  function stateAt(tt, upto) {
    var st = [0, 1, 2].map(function (i) {
      return { mfGot: i === 0 ? MF : 0, mf: i === 0, fill: i === 0 ? perPage.slice() : [0, 0, 0, 0], pages: i === 0 ? [1, 1, 1, 1] : [0, 0, 0, 0],
               got: {}, phase: i === 0 ? "seed" : "wait" };
    });
    for (var x = 0; x < EV.length && EV[x][0] <= tt && (upto < 0 || x <= upto); x++) {
      var e = EV[x], s = st[e[1]];
      if (e[2] === "r" && !s.got[e[3]]) { s.got[e[3]] = 1; if (e[3] < MF) s.mfGot++; else s.fill[pageOf[e[3] - MF]]++; }
      if ((e[2] === "r" || e[2] === "R") && s.phase === "wait") s.phase = "pull";
      if (e[2] === "M") s.mf = true;
      if (e[2] === "P") s.pages[e[3]] = 1;
      if (e[2] === "C") s.phase = "build";
      if (e[2] === "X") s.phase = "swap";
      if (e[2] === "S" && e[1] !== 0) s.phase = "done";
    }
    return st;
  }
  var PHASE = { de: { seed: "Seed, läuft v3", wait: "wartet, läuft v1", pull: "holt den Patch", build: "baut neues Image", swap: "Tausch und Neustart", done: "läuft v3, bietet an" },
                en: { seed: "seed, runs v3", wait: "waiting, runs v1", pull: "pulling the patch", build: "building new image", swap: "swap and reboot", done: "runs v3, offering" } };
  function speed() { return +el("cspeed").value; }
  function draw() {
    var box = cv.parentElement, w = box.clientWidth, h = box.clientHeight, dpr = window.devicePixelRatio || 1;
    if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var c = { bg: col("--surface"), line: col("--line"), muted: col("--muted"), fg: col("--fg"), panel: col("--panel"), acc: col("--accent"),
              offer: col("--pk-offer"), req: col("--pk-req"), data: col("--pk-data"), ok: col("--pk-ok") };
    ctx.fillStyle = c.bg; ctx.fillRect(0, 0, w, h);
    var xs = [w * 0.15, w * 0.5, w * 0.85], y = 74, R = 24, de = lang() === "de";
    ctx.strokeStyle = c.line; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(xs[0] + R, y); ctx.lineTo(xs[1] - R, y); ctx.moveTo(xs[1] + R, y); ctx.lineTo(xs[2] - R, y); ctx.stroke();
    var vis = 0.9 * speed();   // a packet stays visible 0.9 s of wall time, whatever the speed
    for (var x = 0; x < EV.length; x++) {
      var e = EV[x];
      if (e[0] > t) break;
      if (focus >= 0 && x !== focus) continue;   // stepping: only the current event, half way
      if ((focus < 0 && t - e[0] > vis) || "ORD".indexOf(e[2]) < 0) continue;
      var f = focus >= 0 ? 0.5 : (t - e[0]) / vis, from = xs[e[1]];
      if (e[2] === "O") {
        ctx.strokeStyle = c.offer; ctx.lineWidth = 2.5; ctx.globalAlpha = 1 - f;
        ctx.beginPath(); ctx.arc(from, y, R + 4 + f * (w * 0.35 - R), 0, 7); ctx.stroke(); ctx.globalAlpha = 1;
      } else {
        var to = xs[targets(e[1], e[2])[0]];
        ctx.fillStyle = e[2] === "R" ? c.req : c.data;
        ctx.beginPath(); ctx.arc(from + (to - from) * f, y + (e[2] === "R" ? -9 : 9), 6, 0, 7); ctx.fill();
      }
    }
    var st = stateAt(t, focus);
    ctx.textAlign = "center";
    for (var i = 0; i < 3; i++) {
      var s = st[i], cx = xs[i];
      ctx.fillStyle = s.phase === "done" || s.phase === "seed" ? c.acc : c.panel;
      ctx.strokeStyle = s.phase === "swap" || s.phase === "build" ? c.muted : c.acc; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx, y, R, 0, 7); ctx.fill(); ctx.stroke();
      ctx.fillStyle = s.phase === "done" || s.phase === "seed" ? c.bg : c.fg;
      ctx.font = "700 16px Archivo, IBM Plex Sans, sans-serif"; ctx.fillText(NAMES[i], cx, y + 6);
      ctx.fillStyle = c.muted; ctx.font = "12px IBM Plex Mono, monospace";
      ctx.fillText(PHASE[de ? "de" : "en"][s.phase], cx, y + R + 20);
      // progress strip: 2 manifest cells, then 4 page cells
      var bw = Math.min(w * 0.27, 230), x0 = cx - bw / 2, by = y + R + 34, cell = (bw - 8 - 5 * 4) / 5;
      for (var m = 0; m < MF; m++) {
        var have = m < s.mfGot;
        ctx.fillStyle = s.mf ? c.ok : have ? c.data : c.panel;
        ctx.fillRect(x0 + m * (cell / 2 + 2), by, cell / 2, 16);
      }
      for (var p = 0; p < 4; p++) {
        var px = x0 + cell + 8 + p * (cell + 4);
        ctx.fillStyle = c.panel; ctx.fillRect(px, by, cell, 16);
        if (s.pages[p]) { ctx.fillStyle = c.ok; ctx.fillRect(px, by, cell, 16); ctx.fillStyle = c.bg; ctx.font = "700 12px IBM Plex Sans, sans-serif"; ctx.fillText("✓", px + cell / 2, by + 12); }
        else if (s.fill[p]) { ctx.fillStyle = c.data; ctx.fillRect(px, by, cell * s.fill[p] / perPage[p], 16); }
      }
      ctx.fillStyle = c.muted; ctx.font = "10.5px IBM Plex Mono, monospace";
      ctx.fillText(de ? "Manifest | Seiten 0 bis 3" : "manifest | pages 0 to 3", cx, by + 31);
    }
    ctx.textAlign = "start";
    el("ctout").textContent = mmss(t) + " / " + mmss(END);
    el("ct").value = Math.round(1000 * t / END);
    var lines = [];
    for (var z = 0; z < EV.length && EV[z][0] <= t && (focus < 0 || z <= focus); z++) if (EV[z][2] !== "r") lines.push(EV[z]);
    lines = lines.slice(-7);
    var kc = { O: "var(--pk-offer)", R: "var(--pk-req)", D: "var(--pk-data)", P: "var(--pk-ok)", M: "var(--pk-ok)" };
    el("clog").innerHTML = lines.map(function (e, i) {
      var dot = kc[e[2]] ? '<span class="k" style="background:' + kc[e[2]] + '"></span>' : '<span class="k"></span>';
      return "<div" + (i === lines.length - 1 ? ' class="cur"' : "") + ">" + dot + '<span class="t">' + mmss(e[0]) + "</span>" + describe(e) + "</div>";
    }).join("");
  }
  function updBtn() {
    el("cplay").innerHTML = playing ? '<span lang="de">Anhalten</span><span lang="en">Pause</span>' : '<span lang="de">Abspielen</span><span lang="en">Play</span>';
  }
  function frame(ts) {
    if (!playing) return;
    var dt = last ? (ts - last) / 1000 : 0; last = ts;
    t = Math.min(END, t + dt * speed());
    draw();
    if (t >= END) { playing = false; updBtn(); return; }
    requestAnimationFrame(frame);
  }
  el("cplay").addEventListener("click", function () {
    if (!playing && t >= END) t = 0;
    focus = -1;
    playing = !playing; last = 0; updBtn();
    if (playing) requestAnimationFrame(frame);
  });
  el("ct").addEventListener("input", function () { playing = false; focus = -1; updBtn(); t = END * el("ct").value / 1000; draw(); });
  // step through the run one event at a time (receptions are shown through the progress bars, not as steps)
  function step(dir) {
    playing = false; updBtn();
    var i;
    if (dir > 0) { i = focus >= 0 ? focus + 1 : 0; while (i < EV.length && (EV[i][2] === "r" || (focus < 0 && t > 0 && EV[i][0] <= t))) i++; }
    else { i = focus >= 0 ? focus - 1 : EV.length - 1; while (i >= 0 && (EV[i][2] === "r" || (focus < 0 && EV[i][0] >= t))) i--; }
    if (i < 0 || i >= EV.length) return;
    focus = i; t = EV[i][0]; draw();
  }
  el("cnext").addEventListener("click", function () { step(1); });
  el("cprev").addEventListener("click", function () { step(-1); });
  el("chainBox").addEventListener("keydown", function (ev) {
    if (ev.key === "ArrowRight") { step(1); ev.preventDefault(); }
    if (ev.key === "ArrowLeft") { step(-1); ev.preventDefault(); }
  });
  el("cspeed").addEventListener("change", draw);
  window.addEventListener("resize", draw);
  if (window.matchMedia) window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", draw);
  window.fuotaChain = { redraw: draw };
  draw();
})();
