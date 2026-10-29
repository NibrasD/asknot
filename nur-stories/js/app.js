/* Nūr Stories — app engine. Works for any edition loaded into window.NUR. */
(function () {
  'use strict';
  var N = window.NUR, U = N.ui, S = N.story, LS = N.lesson;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var app = $('#app');

  /* ---------- saved progress ---------- */
  var st = { panels: 0, first: null, tries: 0, picked: null, colored: false, practice: false, days: [], lit: false };
  try { var s0 = JSON.parse(localStorage.getItem(N.storeKey) || 'null'); if (s0) for (var k in s0) st[k] = s0[k]; } catch (e) {}
  function save() { try { localStorage.setItem(N.storeKey, JSON.stringify(st)); } catch (e) {} }

  var step = -1; // -1 = landing
  var EXT = ['.webp', '.jpg', '.png'];

  /* ---------- helpers ---------- */
  function toast(t) { var e = $('#toast'); e.textContent = t; e.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(function () { e.classList.remove('on'); }, 2800); }
  function confetti() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for (var i = 0; i < 24; i++) { var s = document.createElement('span'); s.className = 'cf'; s.textContent = ['⭐', '✨', '🌙', '🏮'][i % 4]; s.style.left = Math.random() * 100 + 'vw'; s.style.animationDelay = Math.random() * 0.7 + 's'; document.body.appendChild(s); setTimeout(function (x) { x.remove(); }, 3400, s); }
  }
  function img(name, alt) {
    // tries .webp → .jpg → .png; shows a clear placeholder until the artwork is added
    return '<img class="pic" src="' + N.imgDir + name + EXT[0] + '" data-name="' + name + '" data-i="0" alt="' + (alt || '').replace(/"/g, '&quot;') + '" onerror="NurImgFallback(this)">';
  }
  window.NurImgFallback = function (el) {
    var i = +el.dataset.i + 1;
    if (i < EXT.length) { el.dataset.i = i; el.src = N.imgDir + el.dataset.name + EXT[i]; return; }
    var ph = document.createElement('div'); ph.className = 'ph';
    ph.innerHTML = '<span>🎨</span><b>' + U.imgSoon + '</b><small>' + N.imgDir.replace('../', '') + el.dataset.name + '</small>';
    el.replaceWith(ph);
  };
  function bubbles(p) {
    var o = '';
    if (p.say) o += '<span class="say' + (p.say.big ? ' big' : '') + '" style="--x:' + p.say.x + '%;--y:' + p.say.y + '%">' + p.say.t + '</span>';
    (p.think || []).forEach(function (t) { o += '<span class="say think" style="--x:' + t.x + '%;--y:' + t.y + '%">' + t.t + '</span>'; });
    return o;
  }
  function frame(name, alt, p) { return '<div class="frame">' + img(name, alt) + (p ? bubbles(p) : '') + '</div>'; }
  function canGo(j) { return j <= 2 || st.picked === 'good'; }

  /* ---------- landing ---------- */
  function landing() {
    step = -1; var L = N.landing;
    var parent = st.first == null ? '<p class="muted">' + L.parentsEmpty + '</p>' :
      '<p class="badge ' + (st.first ? 'ok' : 'warn') + '">' + (st.first ? L.parentsFirst : L.parentsSecond) + '</p>';
    app.innerHTML =
      '<header class="nav"><a class="brand" href="../index.html">🏮 ' + N.brand + '</a></header>' +
      '<section class="hero"><div><p class="kicker">' + L.kicker + '</p><h1>' + L.title + '</h1><p class="lead">' + L.sub + '</p>' +
      '<div class="pills">' + L.pills.map(function (x) { return '<span>' + x + '</span>'; }).join('') + '</div>' +
      '<div class="ctas"><button class="btn gold" data-go="0">' + L.start + ' — «' + S.title + '»</button><a class="btn ghost" href="#parents">' + L.parents + '</a></div></div>' +
      '<div class="hero-art">' + frame('cover', S.title) + '</div></section>' +
      '<section class="sec"><h2>' + L.how + '</h2><div class="how">' + L.howSteps.map(function (h, i) { return '<div class="card"><i>' + h[0] + '</i><b>' + (i + 1) + '. ' + h[1] + '</b><span>' + h[2] + '</span></div>'; }).join('') + '</div></section>' +
      '<section class="sec" id="parents"><h2>' + L.parentsTitle + '</h2><div class="paper">' + parent +
      '<ul class="talk">' + L.talk.map(function (t) { return '<li>💬 ' + t + '</li>'; }).join('') + '</ul><p class="muted small">' + L.disclaimer + '</p></div></section>' +
      '<footer class="foot">' + L.foot + '</footer>';
    scrollTo(0, 0);
  }

  /* ---------- lesson shell ---------- */
  function draw() {
    var done = [st.panels >= S.panels.length, st.picked === 'good', st.picked === 'good', st.whySeen, st.colored, st.practice, st.days.length >= 7];
    app.innerHTML =
      '<div class="top"><button class="btn small ghost" data-home>‹ ' + U.home + '</button><h2>' + S.title + ' · <span>' + S.manner + '</span></h2></div>' +
      '<nav class="steps">' + U.steps.map(function (s, j) { return '<button class="sp' + (j === step ? ' on' : '') + (done[j] ? ' dn' : '') + '" data-go="' + j + '"><b>' + (j + 1) + '</b> <em>' + s + '</em></button>'; }).join('') + '</nav>' +
      '<main class="pg">' + body() + '</main>' +
      '<div class="nv"><button class="btn ghost" data-go="' + (step - 1) + '">' + U.back + '</button>' +
      '<button class="btn gold" ' + (step === 6 ? 'data-home' : 'data-go="' + (step + 1) + '"') + '>' + (step === 6 ? U.finish : U.next) + '</button></div>';
    after();
  }
  function go(j) {
    if (j < 0) return landing();
    if (j > 6) return;
    if (!canGo(j)) { toast(U.pickFirst); if (step !== 1) { step = 1; draw(); } return; }
    step = j; if (j === 3) { st.whySeen = true; save(); }
    draw(); scrollTo(0, 0);
  }

  function body() {
    switch (step) {
      case 0: // story
        var n = S.panels.length, k = Math.max(1, Math.min(st.panels || 1, n));
        return '<span class="chip">' + S.place + '</span><h2>' + S.title + '</h2><p class="hint">' + U.readHint + '</p><div class="strip">' +
          S.panels.map(function (p, j) { return '<figure class="pn' + (j < k ? '' : ' hid') + '" id="pn' + j + '">' + frame(p.img, p.text, p) + '<figcaption><i>' + (j + 1) + '</i><span>' + p.text + '</span></figcaption></figure>'; }).join('') +
          '</div><div class="act" id="cact"' + (k >= n ? ' hidden' : '') + '><button class="btn" data-np>' + U.nextPanel + '</button><button class="btn ghost" data-all>' + U.showAll + '</button></div>' +
          '<div class="ask" id="ask"' + (k >= n ? '' : ' hidden') + '>🤔 ' + S.ask + '</div>';
      case 1: // choose
        var good = S.good, A = good === 'A' ? 'good' : 'bad', B = good === 'A' ? 'bad' : 'good';
        return '<h2>' + U.chooseTitle + '</h2><p class="hint">' + U.chooseHint + '</p><div class="pick">' +
          [[A, U.choiceA], [B, U.choiceB]].map(function (c) { var ch = S.choices[c[0]]; return '<button class="opt' + (st.picked === c[0] ? ' sel' : '') + '" data-pick="' + c[0] + '"><span class="tag">' + c[1] + '</span>' + frame(ch.img, ch.label, { say: { t: ch.say, x: 50, y: 6 } }) + '<span class="lbl">' + ch.label + '</span></button>'; }).join('') + '</div>';
      case 2: // compare with the Qur'an
        if (!st.picked) return '<p class="hint">' + U.pickFirst + '</p>';
        var ok = st.picked === 'good', ch2 = S.choices[st.picked];
        return '<h2>' + U.compareTitle + '</h2><div class="cmp"><div class="mine"><p class="muted">' + U.youChose + '</p>' + frame(ch2.img, ch2.label, { say: { t: ch2.say, x: 50, y: 6 } }) + '<b>' + ch2.label + '</b></div>' +
          '<div class="quran"><p class="muted">' + LS.ref + '</p><p class="ayah" lang="ar" dir="rtl">' + LS.ayahFocus + '</p>' + (LS.translation ? '<p class="tr">' + LS.translation.replace(/<\/?b>/g, '') + '</p>' : '') +
          '<p class="verdict ' + (ok ? 'ok' : 'warn') + '">' + (ok ? '✅ ' : '🤍 ') + (ok ? S.compare.good : S.compare.bad) + '</p>' +
          (ok ? '<button class="btn gold" data-go="3">' + U.toWhy + '</button>' : '<button class="btn" data-go="1">' + U.tryAgain + '</button>') + '</div></div>';
      case 3: // why
        return '<h2>' + U.toWhy + '</h2><div class="ayah-box"><p class="ayah full" lang="ar" dir="rtl"><span class="dim">' + LS.ayahBefore + '</span><mark>' + LS.ayahFocus + '</mark></p><p class="ref">' + LS.ref + '</p></div>' +
          '<div class="rv"><audio controls preload="none" src="' + LS.audio + '"></audio><a class="btn ghost small" href="' + LS.quranCom + '" target="_blank" rel="noopener">Quran.com ↗</a></div>' +
          (LS.translation ? '<details class="rs" open><summary>' + U.translation + '</summary><p>' + LS.translation + '</p><span class="src">' + LS.translationSrc + '</span>' + (LS.translit ? '<p class="translit">' + LS.translit + '</p><span class="src">' + LS.translitNote + '</span>' : '') + '</details>' : '') +
          '<details class="rs" open><summary>' + U.meaning + '</summary><p class="kid">' + LS.meaningKid + '</p><p>' + LS.meaning + '</p></details>' +
          '<details class="rs"><summary>' + U.words + '</summary>' + LS.words.map(function (w) { return '<p class="word"><b lang="ar" dir="rtl">' + w[0] + '</b> — ' + w[1] + '</p>'; }).join('') + '</details>' +
          '<h3>' + U.reasons + '</h3>' + LS.reasons.map(function (r) { return '<details class="rs"><summary><i>' + r[0] + '</i>' + r[1] + '</summary><p>' + r[2] + '</p><span class="src">' + r[3] + '</span></details>'; }).join('') +
          '<p class="hint">' + U.srcNote + '</p>';
      case 4: // color
        return '<div class="print-area"><h2>' + U.colorTitle + '</h2><p>' + U.colorHint + '</p><div class="color-wrap">' +
          ['good', 'bad'].map(function (c) { return '<div class="cv" data-k="' + c + '"><canvas></canvas><span class="lbl">' + S.choices[c].label + '</span></div>'; }).join('') + '</div></div>' +
          '<div class="pal">' + PAL.map(function (c) { return '<button class="sw' + (c === pal ? ' on' : '') + '" data-c="' + c + '" style="background:' + c + '" aria-label="' + c + '"></button>'; }).join('') + '</div>' +
          '<div class="act"><button class="btn ghost" data-undo>' + U.undo + '</button><button class="btn ghost" data-clear>' + U.clear + '</button><button class="btn gold" data-check>' + U.check + '</button><button class="btn ghost" data-print>' + U.print + '</button></div><p class="msg" id="msg"></p>';
      case 5: // practice
        var P = LS.practice;
        return '<h2>' + U.steps[5] + '</h2><p>' + P.prompt + '</p>' + P.items.map(function (x, j) { return '<div class="it" id="it' + j + '"><span>' + x[0] + '</span><span class="ops">' + P.opts.map(function (o) { return '<button data-ans="' + j + '" data-o="' + o + '"' + (ans[j] === o ? ' class="on"' : '') + '>' + o + '</button>'; }).join('') + '</span></div>'; }).join('') +
          '<div class="act"><button class="btn gold" data-prac>' + U.practiceCheck + '</button></div><p class="msg" id="msg"></p>';
      default: // mission
        var full = st.days.length >= 7;
        return '<h2>' + U.steps[6] + '</h2><p>' + LS.mission + '</p><div class="days">' + U.missionDays.map(function (d, i) { return '<button data-day="' + (i + 1) + '"' + (st.days.indexOf(i + 1) > -1 ? ' class="on"' : '') + '>' + d + '</button>'; }).join('') + '</div>' +
          '<svg class="star' + (full ? ' on' : '') + '" viewBox="0 0 100 100"><polygon points="50,4 61,37 96,37 68,58 79,92 50,72 21,92 32,58 4,37 39,37"/></svg><p class="hint">' + (full ? U.starEarned : U.daysLeft(st.days.length)) + '</p>';
    }
  }

  /* ---------- coloring (flood fill on the line-art images) ---------- */
  var PAL = ['#e63946', '#f77f00', '#fcbf49', '#52b788', '#2a9d8f', '#4895ef', '#7b2cbf', '#f28ab2', '#8d5a3b', '#f2d7b6', '#b5b5b5', '#ffffff'], GRAY = '#b5b5b5', pal = PAL[0];
  var cvs = {}, hist = [], ans = {};
  function hex(c) { return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)]; }
  function setupColor() {
    [].forEach.call(document.querySelectorAll('.cv'), function (box) {
      var k = box.dataset.k, cv = box.querySelector('canvas'), ctx = cv.getContext('2d', { willReadFrequently: true }), im = new Image(), i = 0;
      cvs[k] = { cv: cv, ctx: ctx, fills: { gray: 0, color: 0 }, ok: false };
      im.onload = function () {
        cv.width = im.naturalWidth; cv.height = im.naturalHeight; ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height); ctx.drawImage(im, 0, 0);
        try { ctx.getImageData(0, 0, 1, 1); cvs[k].ok = true; cvs[k].base = ctx.getImageData(0, 0, cv.width, cv.height); } catch (e) { $('#msg').textContent = U.colorNoServer; }
      };
      im.onerror = function () { i++; if (i < EXT.length) im.src = N.imgDir + k + '-line' + EXT[i]; else { box.querySelector('canvas').replaceWith(Object.assign(document.createElement('div'), { className: 'ph', innerHTML: '<span>🖍️</span><b>' + U.imgSoon + '</b><small>' + N.imgDir.replace('../', '') + k + '-line</small>' })); } };
      im.src = N.imgDir + k + '-line' + EXT[0];
      cv.addEventListener('click', function (ev) {
        var c = cvs[k]; if (!c.ok) return;
        var r = cv.getBoundingClientRect(), x = Math.floor((ev.clientX - r.left) * cv.width / r.width), y = Math.floor((ev.clientY - r.top) * cv.height / r.height);
        hist.push([k, c.ctx.getImageData(0, 0, cv.width, cv.height), pal === GRAY ? 'gray' : 'color']); if (hist.length > 25) hist.shift();
        if (fill(c.ctx, x, y, hex(pal))) c.fills[pal === GRAY ? 'gray' : 'color']++; else hist.pop();
      });
    });
  }
  function fill(ctx, x, y, rgb) {
    var w = ctx.canvas.width, h = ctx.canvas.height, d = ctx.getImageData(0, 0, w, h), a = d.data, i0 = (y * w + x) * 4;
    var t = [a[i0], a[i0 + 1], a[i0 + 2]];
    if (t[0] + t[1] + t[2] < 240) return false; // clicked on a dark outline
    if (Math.abs(t[0] - rgb[0]) + Math.abs(t[1] - rgb[1]) + Math.abs(t[2] - rgb[2]) < 10) return false;
    var tol = 70, seen = new Uint8Array(w * h), stack = [x, y];
    function same(i) { return Math.abs(a[i] - t[0]) + Math.abs(a[i + 1] - t[1]) + Math.abs(a[i + 2] - t[2]) < tol; }
    while (stack.length) {
      var py = stack.pop(), px = stack.pop(), p = py * w + px;
      if (px < 0 || py < 0 || px >= w || py >= h || seen[p]) continue;
      seen[p] = 1; var i = p * 4; if (!same(i)) continue;
      a[i] = rgb[0]; a[i + 1] = rgb[1]; a[i + 2] = rgb[2]; a[i + 3] = 255;
      stack.push(px + 1, py, px - 1, py, px, py + 1, px, py - 1);
    }
    ctx.putImageData(d, 0, 0); return true;
  }

  /* ---------- events ---------- */
  function after() {
    if (step === 4) setupColor();
  }
  app.addEventListener('click', function (e) {
    var b = e.target.closest('button,a'); if (!b) return;
    var D = b.dataset;
    if ('home' in D) return landing();
    if (D.go != null) { e.preventDefault(); return go(+D.go); }
    if ('np' in D) { var n = S.panels.length, k = Math.max(1, st.panels || 1); if (k < n) { var el = $('#pn' + k); el.classList.remove('hid'); el.classList.add('new'); st.panels = k + 1; save(); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); } return ends(); }
    if ('all' in D) { [].forEach.call(document.querySelectorAll('.pn'), function (x) { x.classList.remove('hid'); }); st.panels = S.panels.length; save(); return ends(); }
    if (D.pick) {
      st.tries++; if (st.first == null) st.first = D.pick === 'good';
      st.picked = D.pick; save(); if (D.pick === 'good') confetti(); return go(2);
    }
    if (D.c != null) { pal = D.c; [].forEach.call(document.querySelectorAll('.sw'), function (x) { x.classList.toggle('on', x === b); }); return; }
    if ('undo' in D) { var h = hist.pop(); if (h) { cvs[h[0]].ctx.putImageData(h[1], 0, 0); cvs[h[0]].fills[h[2]]--; } return; }
    if ('clear' in D) { for (var key in cvs) if (cvs[key].base) { cvs[key].ctx.putImageData(cvs[key].base, 0, 0); cvs[key].fills = { gray: 0, color: 0 }; } hist = []; return; }
    if ('print' in D) return print();
    if ('check' in D) {
      var m = $('#msg'), G = cvs.good, B = cvs.bad;
      if (!G || !B || !G.ok || !B.ok) { m.className = 'msg x'; m.textContent = U.colorNoServer; return; }
      if (G.fills.color < 4) { m.className = 'msg x'; m.textContent = U.colorNeedGood; return; }
      if (B.fills.gray < 3) { m.className = 'msg x'; m.textContent = U.colorNeedGray; return; }
      st.colored = true; save(); m.className = 'msg g'; m.textContent = U.colorOk; confetti(); lantern(); return;
    }
    if (D.ans != null) { ans[D.ans] = D.o; [].forEach.call(b.parentNode.children, function (x) { x.classList.toggle('on', x === b); }); return; }
    if ('prac' in D) {
      var P = LS.practice, right = 0, msg = $('#msg');
      P.items.forEach(function (x, j) { var r = ans[j] === x[1]; $('#it' + j).className = 'it ' + (r ? 'ok' : 'no'); if (r) right++; });
      if (right === P.items.length) { st.practice = true; save(); msg.className = 'msg g'; msg.textContent = U.allRight; confetti(); lantern(); }
      else { msg.className = 'msg x'; msg.textContent = U.someWrong(right, P.items.length); }
      return;
    }
    if (D.day) { var d = +D.day, i = st.days.indexOf(d); if (i > -1) st.days.splice(i, 1); else st.days.push(d); save(); if (st.days.length >= 7) confetti(); return draw(); }
  });
  function ends() { if ((st.panels || 1) >= S.panels.length) { $('#cact').hidden = true; $('#ask').hidden = false; } }
  function lantern() { if (st.colored && st.practice && !st.lit) { st.lit = true; save(); toast(U.lanternLit); } }

  landing();
})();
