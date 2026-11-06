/* MARK 4 IOP TREASURER: page behavior.
   Edit dates in config.js, cards in ideas.js, and Spanish/French wording in i18n.js, not here. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var IDEAS = window.IDEAS || [];
  var DICT = window.I18N || {};

  /* =====================================================================
     LANGUAGE
     English lives in index.html (and ideas.js). Spanish and French live in i18n.js.
     The page remembers the choice, and ?lang=es or ?lang=fr in a link opens it in that language.
     ===================================================================== */
  var LANGS = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" }
  ];
  var lang = "en";
  var enText = {}, enAttr = {};
  var textNodes = document.querySelectorAll("[data-i18n]");
  var attrNodes = document.querySelectorAll("[data-i18n-attr]");
  var metaDesc = document.querySelector('meta[name="description"]');

  /* Capture the English straight from the page, so it is always the fallback */
  Array.prototype.forEach.call(textNodes, function (n) { enText[n.getAttribute("data-i18n")] = n.innerHTML; });
  Array.prototype.forEach.call(attrNodes, function (n) {
    n.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
      var p = pair.split(":");
      enAttr[p[1]] = n.getAttribute(p[0]);
    });
  });
  enText["meta.title"] = document.title;
  enText["meta.description"] = metaDesc ? metaDesc.getAttribute("content") : "";

  function t(key, vars) {
    var s = DICT[lang] && DICT[lang][key];
    if (s == null) s = enText[key];
    if (s == null) s = enAttr[key];
    if (s == null && DICT.en) s = DICT.en[key];
    if (s == null) s = key;
    if (vars) s = s.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; });
    return s;
  }

  /* A card field in the current language, falling back to English */
  function field(obj, name) {
    var tr = obj[lang];
    return tr && tr[name] != null && tr[name] !== "" ? tr[name] : obj[name];
  }

  function plain(title) { return String(title).replace(/\*/g, ""); }

  /* ---------- Voting date state (US Eastern window) ---------- */
  var opens = new Date(S.voteOpens);
  var closes = new Date(S.voteCloses);
  var now = new Date();
  var state = now < opens ? "before" : now <= closes ? "open" : "closed";

  /* =====================================================================
     NEWS-TICKER VOTING BANNER
     ===================================================================== */
  var banner = document.getElementById("banner");
  var track = document.getElementById("ticker-track");
  var pauseBtn = document.getElementById("banner-pause");
  var bannerTag = document.getElementById("banner-tag");
  var bannerText = document.getElementById("banner-text");
  var tickerMessage = "";

  /* One continuous message, repeated end to start with a gap of space (no separators). */
  function makeGroup(reps) {
    var g = document.createElement("div");
    g.className = "ticker-group";
    for (var r = 0; r < reps; r++) {
      var it = document.createElement("div");
      it.className = "ticker-item";
      it.textContent = tickerMessage;
      g.appendChild(it);
    }
    return g;
  }

  /* Two identical groups, each at least as wide as the screen, slide left by exactly one group: a seamless loop. */
  function buildTicker() {
    if (!track || !banner) return;
    track.innerHTML = "";
    var probe = makeGroup(1);
    track.appendChild(probe);
    var w = probe.getBoundingClientRect().width || 1;
    var reps = Math.max(1, Math.ceil((window.innerWidth * 1.15) / w));
    track.innerHTML = "";
    var g1 = makeGroup(reps), g2 = makeGroup(reps);
    track.appendChild(g1);
    track.appendChild(g2);
    var gw = g1.getBoundingClientRect().width || w;
    track.style.setProperty("--dur", Math.max(20, gw / 80) + "s");   // about 80 pixels per second
  }

  function updatePauseLabel() {
    if (!pauseBtn || !banner) return;
    var paused = banner.classList.contains("paused");
    pauseBtn.setAttribute("aria-label", t(paused ? "banner.resume" : "banner.pause"));
  }

  function applyBanner() {
    if (!banner) return;
    banner.setAttribute("data-state", state);
    if (bannerTag) bannerTag.textContent = t("news." + state + ".tag");
    if (bannerText) bannerText.innerHTML = t("news." + state + ".text");
    tickerMessage = t("news." + state + ".message");
    banner.classList.add("is-live");
    buildTicker();
    updatePauseLabel();
  }

  if (banner) {
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(buildTicker);   // re-measure once the headline font loads
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(buildTicker, 200); });
    if (pauseBtn) {
      pauseBtn.hidden = false;
      pauseBtn.addEventListener("click", function () {
        var paused = banner.classList.toggle("paused");
        pauseBtn.setAttribute("aria-pressed", paused ? "true" : "false");
        updatePauseLabel();
      });
    }
  }

  /* =====================================================================
     TAGLINE: size it to fill the pill (one line when readable, otherwise two balanced lines)
     ===================================================================== */
  var hook = document.querySelector(".hook");
  var hookText = hook && hook.querySelector(".hook-text");
  function fitHook() {
    if (!hook || !hookText) return;
    hook.classList.remove("fit");
    hook.style.fontSize = "";
    var cs = getComputedStyle(hook);
    var avail = hook.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    hook.classList.add("fit");
    hook.style.fontSize = "100px";
    var w = hookText.getBoundingClientRect().width || 1;
    var size = Math.floor((100 * avail / w) * 0.99 * 10) / 10;
    if (size >= 26) {
      hook.style.fontSize = Math.min(size, 54) + "px";
    } else {
      /* Too narrow for one line: wrap onto balanced lines and size the text so those lines fill the pill */
      hook.classList.remove("fit");
      var two = Math.floor((100 * avail * 1.8 / w) * 10) / 10;
      hook.style.fontSize = Math.max(22, Math.min(two, 46)) + "px";
    }
  }
  fitHook();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitHook);
  var ht;
  window.addEventListener("resize", function () { clearTimeout(ht); ht = setTimeout(fitHook, 150); });

  /* =====================================================================
     IDEA WHEEL
     ===================================================================== */
  var NS = "http://www.w3.org/2000/svg";
  var wheel = document.getElementById("wheel");
  var stage = document.getElementById("wheel-stage");
  var ctrl = document.getElementById("wheel-ctrl");
  var dotsBox = document.getElementById("dots");
  var countEl = document.getElementById("wheel-count");
  var liveEl = document.getElementById("wheel-live");
  var prevBtn = document.getElementById("prev");
  var nextBtn = document.getElementById("next");
  var narrow = window.matchMedia("(max-width: 760px)");

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  function step(dl, label, text) {
    var row = document.createElement("div");
    row.appendChild(el("dt", "", label));
    row.appendChild(el("dd", "", text));
    dl.appendChild(row);
  }

  function iconSvg(name) {
    var id = document.getElementById("ic-" + name) ? name : "bulb";
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("class", "art-icon");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var use = document.createElementNS(NS, "use");
    use.setAttribute("href", "#ic-" + id);
    svg.appendChild(use);
    return svg;
  }

  function buildCard(idea) {
    var isNew = idea.kind === "new";
    var card = el("article", "card slide");
    card.setAttribute("data-kind", idea.kind);
    if (idea.accent) card.setAttribute("data-accent", idea.accent);
    card.setAttribute("role", "group");
    card.setAttribute("aria-roledescription", t("wheel.slide"));

    var art = el("div", "art");
    art.appendChild(iconSvg(idea.icon));
    card.appendChild(art);

    var top = el("div", "card-top");
    top.appendChild(el("span", "tag " + (isNew ? "tag-new" : "tag-cont"), t(isNew ? "card.new" : "card.cont")));
    top.appendChild(el("span", "horizon", t(isNew ? "card.start" : "card.long")));
    card.appendChild(top);

    var h3 = el("h3", "display");
    String(field(idea, "title")).split("*").forEach(function (part, i) {
      if (!part) return;
      if (i % 2) h3.appendChild(el("span", "emph", part)); else h3.appendChild(document.createTextNode(part));
    });
    card.appendChild(h3);
    card.appendChild(el("p", "blurb", field(idea, "blurb")));

    var dl = el("dl", "steps");
    var why = field(idea, "why");
    if (why) step(dl, t("card.why"), why);
    if (isNew && idea.detail) {
      step(dl, t("card.plan"), field(idea, "detail"));
    } else if (isNew) {
      step(dl, t("card.now"), field(idea, "now"));
      step(dl, t("card.later"), field(idea, "later"));
    } else {
      step(dl, t("card.mine"), field(idea, "mine"));
    }
    card.appendChild(dl);

    var baton = field(idea, "baton");
    if (baton) card.appendChild(el("p", "baton", baton));

    return card;
  }

  var items = [], slides = [], dots = [], active = 0;

  function layout() {
    var n = slides.length;
    if (!n) return;
    var half = Math.floor(n / 2);
    var maxVis = narrow.matches ? 1 : 2;
    slides.forEach(function (s, i) {
      var off = i - active;
      if (off > half) off -= n; else if (off < -half) off += n;
      var a = Math.abs(off);
      var scale = Math.max(1 - a * 0.1, 0.7);
      s.style.transform = "translateX(" + (off * 80) + "%) translateY(" + (a * a * 6) + "px) rotate(" + (off * 3) + "deg) scale(" + scale + ")";
      s.style.opacity = a > maxVis ? 0 : a === 0 ? 1 : a === 1 ? 0.85 : 0.5;
      s.style.zIndex = 20 - a;
      s.style.pointerEvents = a > maxVis ? "none" : "auto";
      s.setAttribute("aria-hidden", a === 0 ? "false" : "true");
      s.classList.toggle("is-active", a === 0);
      var links = s.querySelectorAll("a");
      for (var k = 0; k < links.length; k++) links[k].tabIndex = a === 0 ? 0 : -1;
    });
    dots.forEach(function (d, i) {
      if (i === active) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current");
    });
    if (countEl) countEl.textContent = t("wheel.count", { n: active + 1, total: n });
  }

  function goTo(i, announce) {
    var n = slides.length;
    if (!n) return;
    active = ((i % n) + n) % n;
    layout();
    if (announce && liveEl) {
      var it = items[active];
      liveEl.textContent = t(it.kind === "new" ? "live.new" : "live.cont", { n: active + 1, total: n, title: plain(field(it, "title")) });
    }
  }

  function renderWheel(keepPosition) {
    if (!wheel || !stage || !IDEAS.length) return;
    var was = active;
    items = IDEAS.slice();
    stage.innerHTML = "";
    dotsBox.innerHTML = "";
    wheel.setAttribute("aria-roledescription", t("wheel.carousel"));
    slides = items.map(function (idea, i) {
      var c = buildCard(idea);
      c.setAttribute("aria-label", t("slide.aria", { n: i + 1, total: items.length, title: plain(field(idea, "title")) }));
      stage.appendChild(c);
      return c;
    });
    dots = items.map(function (idea, i) {
      var d = el("button", "dot" + (idea.accent ? " dot-" + idea.accent : ""));
      d.type = "button";
      d.setAttribute("aria-label", t("dot.aria", { n: i + 1, title: plain(field(idea, "title")) }));
      d.addEventListener("click", function () { goTo(i, true); });
      dotsBox.appendChild(d);
      return d;
    });
    if (ctrl) ctrl.hidden = items.length < 2;
    active = keepPosition ? Math.min(was, items.length - 1) : 0;
    layout();
  }

  if (wheel && stage && IDEAS.length) {
    if (prevBtn) prevBtn.addEventListener("click", function () { goTo(active - 1, true); });
    if (nextBtn) nextBtn.addEventListener("click", function () { goTo(active + 1, true); });

    wheel.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); goTo(active - 1, true); }
      else if (e.key === "ArrowRight") { e.preventDefault(); goTo(active + 1, true); }
      else if (e.key === "Home") { e.preventDefault(); goTo(0, true); }
      else if (e.key === "End") { e.preventDefault(); goTo(slides.length - 1, true); }
    });

    /* Swipe / drag to spin, and click a side card to bring it to the middle */
    var startX = null, startY = null, dragged = false;
    wheel.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      startX = e.clientX; startY = e.clientY; dragged = false;
    });
    wheel.addEventListener("pointerup", function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX, dy = e.clientY - startY;
      startX = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
        dragged = true;
        goTo(dx < 0 ? active + 1 : active - 1, true);
      }
    });
    wheel.addEventListener("pointercancel", function () { startX = null; });
    wheel.addEventListener("pointerleave", function () { startX = null; });
    wheel.addEventListener("click", function (e) {
      if (dragged) { dragged = false; e.preventDefault(); return; }
      var s = e.target.closest ? e.target.closest(".slide") : null;
      if (s && !s.classList.contains("is-active")) goTo(slides.indexOf(s), true);
    });

    if (narrow.addEventListener) narrow.addEventListener("change", layout);
    else if (narrow.addListener) narrow.addListener(layout);
  }

  /* =====================================================================
     APPLY A LANGUAGE TO THE WHOLE PAGE
     ===================================================================== */
  var langBox = document.getElementById("lang");
  var langBtn = document.getElementById("lang-btn");
  var langMenu = document.getElementById("lang-menu");
  var langCode = document.getElementById("lang-code");

  function langName(code) {
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i].code === code) return LANGS[i].name;
    return code;
  }

  function validLang(code) {
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i].code === code) return true;
    return false;
  }

  function applyLang(code, first) {
    if (!validLang(code) || (code !== "en" && !DICT[code])) code = "en";
    lang = code;
    document.documentElement.setAttribute("lang", code);

    if (!(first && code === "en")) {
      Array.prototype.forEach.call(textNodes, function (n) { n.innerHTML = t(n.getAttribute("data-i18n")); });
      Array.prototype.forEach.call(attrNodes, function (n) {
        n.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
          var p = pair.split(":");
          n.setAttribute(p[0], t(p[1]));
        });
      });
      document.title = t("meta.title");
      if (metaDesc) metaDesc.setAttribute("content", t("meta.description"));
    }

    if (langCode) langCode.textContent = code.toUpperCase();
    if (langBtn) langBtn.setAttribute("aria-label", t("lang.aria", { name: langName(code) }));
    if (langMenu) {
      Array.prototype.forEach.call(langMenu.querySelectorAll("button[data-lang]"), function (b) {
        if (b.getAttribute("data-lang") === code) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current");
      });
    }

    applyBanner();
    renderWheel(!first);
    fitHook();
    /* Text changed length: measure again once the browser has laid it out */
    window.requestAnimationFrame(function () { fitHook(); buildTicker(); });
  }

  function saveLang(code) {
    try { window.localStorage.setItem("lang", code); } catch (e) { /* private mode: just don't remember */ }
    try {
      var url = new URL(window.location.href);
      if (code === "en") url.searchParams.delete("lang"); else url.searchParams.set("lang", code);
      window.history.replaceState(null, "", url.toString());
    } catch (e) { /* some browsers block this for local files */ }
  }

  function initialLang() {
    var fromUrl = null, saved = null;
    try { fromUrl = new URL(window.location.href).searchParams.get("lang"); } catch (e) { /* ignore */ }
    if (fromUrl && validLang(fromUrl.toLowerCase())) return fromUrl.toLowerCase();
    try { saved = window.localStorage.getItem("lang"); } catch (e) { /* ignore */ }
    if (saved && validLang(saved)) return saved;
    return "en";
  }

  /* ---------- Language menu ---------- */
  function menuOpen() { return langMenu && !langMenu.hidden; }
  function openMenu() {
    if (!langMenu) return;
    langMenu.hidden = false;
    langBtn.setAttribute("aria-expanded", "true");
  }
  function closeMenu(returnFocus) {
    if (!langMenu || langMenu.hidden) return;
    langMenu.hidden = true;
    langBtn.setAttribute("aria-expanded", "false");
    if (returnFocus) langBtn.focus();
  }

  if (langBox && langBtn && langMenu) {
    langBox.hidden = false;   // the button only appears when JavaScript is running
    langBtn.addEventListener("click", function () {
      if (menuOpen()) closeMenu(false); else openMenu();
    });
    langMenu.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("button[data-lang]") : null;
      if (!b) return;
      var code = b.getAttribute("data-lang");
      applyLang(code, false);
      saveLang(code);
      closeMenu(true);
    });
    document.addEventListener("click", function (e) {
      if (menuOpen() && !langBox.contains(e.target)) closeMenu(false);
    });
    langBox.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menuOpen()) { e.preventDefault(); closeMenu(true); return; }
      if (!menuOpen() && e.target === langBtn && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        e.preventDefault(); openMenu();
        var cur = langMenu.querySelector("button[aria-current]") || langMenu.querySelector("button");
        if (cur) cur.focus();
        return;
      }
      if (menuOpen() && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        e.preventDefault();
        var btns = Array.prototype.slice.call(langMenu.querySelectorAll("button"));
        var i = btns.indexOf(document.activeElement);
        i = e.key === "ArrowDown" ? (i + 1) % btns.length : (i - 1 + btns.length) % btns.length;
        btns[i].focus();
      }
    });
    /* Tabbing out of the menu closes it */
    langBox.addEventListener("focusout", function (e) {
      if (menuOpen() && e.relatedTarget && !langBox.contains(e.relatedTarget)) closeMenu(false);
    });
  }

  applyLang(initialLang(), true);

  /* =====================================================================
     HIGHLIGHT THE CURRENT SECTION IN THE NAV
     ===================================================================== */
  var navEl = document.querySelector(".nav");
  var links = document.querySelectorAll(".nav a, .nav-cta");
  var map = {};
  links.forEach(function (a) {
    var id = (a.getAttribute("href") || "").replace("#", "");
    var sec = id && document.getElementById(id);
    if (sec) map[id] = a;
  });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute("aria-current"); });
        var a = map[e.target.id];
        if (a) {
          a.setAttribute("aria-current", "true");
          /* keep the current link visible when the nav scrolls sideways on a phone */
          if (navEl && a.parentNode === navEl && navEl.scrollWidth > navEl.clientWidth) {
            var target = a.offsetLeft - (navEl.clientWidth - a.offsetWidth) / 2;
            if (navEl.scrollTo) navEl.scrollTo({ left: Math.max(0, target), behavior: "smooth" }); else navEl.scrollLeft = Math.max(0, target);
          }
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { io.observe(document.getElementById(id)); });
  }
})();
