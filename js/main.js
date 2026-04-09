(function () {
  window.addEventListener("load", function () {
    let isReload = false;
    try {
      const entry = performance.getEntriesByType?.("navigation")?.[0];
      if (entry && entry.type === "reload") isReload = true;
    } catch (_) {}
    try {
      if (typeof performance !== "undefined" && performance.navigation && performance.navigation.type === 1) {
        isReload = true;
      }
    } catch (_) {}
    if (isReload && location.hash) {
      history.replaceState(null, "", location.pathname + location.search);
      window.scrollTo(0, 0);
    }
  });

  if (window.EASYID_I18N) {
    window.EASYID_I18N.init();
  }

  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", !open);
      if (open) {
        mobileNav.setAttribute("hidden", "");
      } else {
        mobileNav.removeAttribute("hidden");
      }
    });

    mobileNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.setAttribute("hidden", "");
      });
    });
  }

  /** Scroll spy: highlight the block under the marker + sync nav */
  (function initScrollSpy() {
    function spyTargets() {
      return [
        document.querySelector(".hero"),
        document.getElementById("pain"),
        document.getElementById("home-offer"),
        document.getElementById("giffgaff"),
        ...document.querySelectorAll(".section-modules article.module-card"),
        document.getElementById("pricing"),
        document.getElementById("scenarios"),
        document.getElementById("orders"),
        document.getElementById("agent"),
        document.getElementById("contact"),
      ].filter(Boolean);
    }

    function headerHeight() {
      const h = document.querySelector(".site-header");
      return h ? h.offsetHeight : 64;
    }

    function updateSpy() {
      const targets = spyTargets();
      if (!targets.length) return;

      const headerH = headerHeight();
      const marker = headerH + Math.max(48, (window.innerHeight - headerH) * 0.28);

      let activeEl = null;
      for (const el of targets) {
        const r = el.getBoundingClientRect();
        if (r.top <= marker && r.bottom > marker) activeEl = el;
      }
      if (!activeEl) {
        for (const el of targets) {
          const r = el.getBoundingClientRect();
          if (r.top <= marker) activeEl = el;
        }
      }

      document.querySelectorAll(".section-spy-active").forEach((n) => n.classList.remove("section-spy-active"));
      if (activeEl) activeEl.classList.add("section-spy-active");

      let navHash = null;
      if (activeEl) {
        if (activeEl.id === "home-offer") navHash = null;
        else if (activeEl.id === "giffgaff") navHash = "#giffgaff";
        else if (activeEl.classList.contains("module-card")) {
          navHash = activeEl.closest("#giffgaff") ? "#giffgaff" : "#solution-modules";
        } else if (activeEl.id && activeEl.id !== "pain") navHash = `#${activeEl.id}`;
      }

      document
        .querySelectorAll(".nav-main a.is-nav-active, .nav-cta.is-nav-active, #mobile-nav a.is-nav-active")
        .forEach((a) => a.classList.remove("is-nav-active"));

      if (navHash) {
        document.querySelectorAll(".nav-main a, #mobile-nav a, a.nav-cta").forEach((a) => {
          if (a.getAttribute("href") === navHash) {
            a.classList.add("is-nav-active");
          }
        });
      }
    }

    let ticking = false;
    function onScrollOrResize() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          updateSpy();
        });
      }
    }

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", updateSpy);
    } else {
      updateSpy();
    }
  })();
})();
