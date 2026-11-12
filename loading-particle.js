(() => {
  const root = document.documentElement;

  const activateLoader = (loader) => {
    if (!loader) {
      return;
    }
    if (!loader.classList) {
      return;
    }
    loader.classList.add("is-active");
  };

  const isDarkSurface = location.pathname.includes("Phantopteryx-Toolbox");
  const theme = isDarkSurface
    ? {
        color: "#f4ead8",
        path: "rgba(244, 234, 216, 0.16)",
        shadow: "rgba(244, 234, 216, 0.16)",
        background: "#050505",
      }
    : {
        color: "#8b4513",
        path: "rgba(139, 69, 19, 0.16)",
        shadow: "rgba(139, 69, 19, 0.18)",
        background: "#f1ead8",
      };

  const settleDurationMs = 1100;
  const fadeDurationMs = 900;
  const routeFadeInMs = 420;
  const routeFlagKey = "portfolio:route-transition";

  // The full loading animation only plays when the site is entered fresh or
  // the page is refreshed. Navigation inside the site is a cross-document view
  // transition (see @view-transition below), with a short fade as the fallback
  // in browsers that do not support it.
  const consumeRouteFlag = () => {
    try {
      const value = sessionStorage.getItem(routeFlagKey);
      sessionStorage.removeItem(routeFlagKey);
      return value === "1";
    } catch (error) {
      return false;
    }
  };

  const cameFromSameSite = () => {
    try {
      return Boolean(document.referrer) && new URL(document.referrer).origin === location.origin;
    } catch (error) {
      return false;
    }
  };

  const navigationType = (() => {
    try {
      const entry = performance.getEntriesByType("navigation")[0];
      return entry ? entry.type : "navigate";
    } catch (error) {
      return "navigate";
    }
  })();

  const routedInternally = consumeRouteFlag();
  const useDirectTransition =
    navigationType !== "reload" &&
    (routedInternally || navigationType === "back_forward" || cameFromSameSite());
  const supportsCrossDocumentTransitions = "onpagereveal" in window;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const styleId = "lemniscate-loading-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @media (prefers-reduced-motion: no-preference) {
        @view-transition {
          navigation: auto;
        }
      }

      html.is-loading::after {
        content: none !important;
      }

      html.is-loading::before {
        background: transparent !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }

      html.is-loading body {
        visibility: visible !important;
        opacity: 1 !important;
        transform: none !important;
        animation: none !important;
      }

      html.is-revealed body {
        visibility: visible !important;
        opacity: 1 !important;
        transform: none !important;
        animation: none !important;
      }

      html.is-loading body > :not(.loading-particle),
      html.is-loading .topbar,
      html.is-loading .drawing,
      html.is-loading .text1,
      html.is-loading .text2,
      html.is-loading .text3,
      html.is-loading .quick-entry,
      html.is-loading .mobile-home,
      html.is-loading main,
      html.is-loading aside,
      html.is-loading button,
      html.is-loading .grid,
      html.is-loading .container {
        visibility: visible !important;
        opacity: 1 !important;
        animation: none !important;
        pointer-events: none !important;
      }

      html.is-loading .topbar,
      html.is-revealed .topbar {
        visibility: visible !important;
        opacity: 1 !important;
        transform: translateX(-50%) !important;
        animation: none !important;
      }

      html.is-loading .drawing,
      html.is-loading .text1,
      html.is-loading .text2,
      html.is-loading .text3,
      html.is-loading .mobile-home,
      html.is-loading main,
      html.is-loading aside,
      html.is-loading button,
      html.is-loading .grid,
      html.is-loading .container,
      html.is-revealed .drawing,
      html.is-revealed .text1,
      html.is-revealed .text2,
      html.is-revealed .text3,
      html.is-revealed .mobile-home,
      html.is-revealed main,
      html.is-revealed aside,
      html.is-revealed button,
      html.is-revealed .grid,
      html.is-revealed .container {
        visibility: visible !important;
        opacity: 1 !important;
        transform: none !important;
        animation: none !important;
      }

      html.is-loading .quick-entry,
      html.is-revealed .quick-entry {
        visibility: visible !important;
        opacity: 1 !important;
        transform: rotate(-1.5deg) !important;
        animation: none !important;
      }

      .loading-particle {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: grid;
        place-items: center;
        background: ${theme.background};
        color: ${theme.color};
        opacity: 1;
        visibility: visible;
        pointer-events: none;
      }

      .loading-route-mask {
        position: fixed;
        inset: 0;
        z-index: 10001;
        display: block;
        background: ${theme.background};
        pointer-events: none;
        animation: loadingMaskOut ${routeFadeInMs}ms ease both;
      }

      .loading-particle__frame {
        opacity: 0;
      }

      .loading-particle.is-active .loading-particle__frame {
        animation: loaderParticleIn 520ms ease forwards;
      }

      @media (prefers-reduced-motion: no-preference) {
        .loading-particle.is-active .loading-particle__frame {
          animation: loaderParticleIn 520ms ease forwards, lemniscateBreath 5000ms ease-in-out infinite;
        }
      }

      .loading-particle.is-exiting {
        animation: loadingMaskOut ${fadeDurationMs}ms ease forwards;
        animation-delay: ${settleDurationMs}ms;
      }

      .loading-particle__frame {
        width: clamp(150px, 20vmin, 240px);
        aspect-ratio: 1;
        display: grid;
        place-items: center;
        filter: drop-shadow(0 12px 26px ${theme.shadow});
        transform-origin: center;
      }

      .loading-particle svg {
        width: 100%;
        height: 100%;
        overflow: visible;
      }

      @keyframes lemniscateBreath {
        0%, 100% { transform: scale(0.94); }
        50% { transform: scale(1.06); }
      }

      @keyframes loaderParticleIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes loadingMaskOut {
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  const normalizeProgress = (progress) => ((progress % 1) + 1) % 1;

  const point = (progress, detailScale, config) => {
    const t = progress * Math.PI * 2;
    const scale = config.lemniscateA + detailScale * config.lemniscateBoost;
    const denom = 1 + Math.sin(t) ** 2;
    return {
      x: 50 + (scale * Math.cos(t)) / denom,
      y: 50 + (scale * Math.sin(t) * Math.cos(t)) / denom,
    };
  };

  const buildPath = (config, detailScale = 0.84, steps = 520) =>
    Array.from({ length: steps + 1 }, (_, index) => {
      const position = point(index / steps, detailScale, config);
      const command = index === 0 ? "M" : "L";
      return `${command} ${position.x.toFixed(2)} ${position.y.toFixed(2)}`;
    }).join(" ");

  const createLoader = () => {
    const loader = document.createElement("div");
    loader.className = "loading-particle";
    loader.setAttribute("aria-hidden", "true");
    loader.innerHTML = `
      <div class="loading-particle__frame">
        <svg viewBox="0 0 100 100" fill="none">
          <path class="loading-particle__path" stroke="${theme.path}" stroke-linecap="round" stroke-linejoin="round"></path>
          <g class="loading-particle__dots"></g>
        </svg>
      </div>
    `;
    document.body.prepend(loader);

    const SVG_NS = "http://www.w3.org/2000/svg";
    const config = {
      particleCount: 70,
      trailSpan: 0.4,
      durationMs: 2400,
      strokeWidth: 4.8,
      lemniscateA: 20,
      lemniscateBoost: 7,
    };
    const motionPath = buildPath(config);
    const path = loader.querySelector(".loading-particle__path");
    const dots = loader.querySelector(".loading-particle__dots");
    path.setAttribute("d", motionPath);
    path.setAttribute("stroke-width", String(config.strokeWidth));

    Array.from({ length: config.particleCount }, (_, index) => {
      const tailOffset = index / (config.particleCount - 1);
      const fade = Math.pow(1 - tailOffset, 0.56);
      const circle = document.createElementNS(SVG_NS, "circle");
      const motion = document.createElementNS(SVG_NS, "animateMotion");
      circle.setAttribute("fill", "currentColor");
      circle.setAttribute("r", (0.9 + fade * 2.7).toFixed(2));
      circle.setAttribute("opacity", (0.04 + fade * 0.96).toFixed(3));
      motion.setAttribute("path", motionPath);
      motion.setAttribute("dur", `${config.durationMs}ms`);
      motion.setAttribute("begin", `${(-tailOffset * config.trailSpan * config.durationMs) / 1000}s`);
      motion.setAttribute("repeatCount", "indefinite");
      motion.setAttribute("calcMode", "linear");
      circle.appendChild(motion);
      dots.appendChild(circle);
    });

    window.setTimeout(() => {
      requestAnimationFrame(() => {
        activateLoader(loader);
      });
    }, 180);

    return loader;
  };

  // Remember that the next page was reached from inside the site. The referrer
  // covers this on a server; the flag keeps it working from file:// too.
  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("a[href]");
    if (!link || link.target === "_blank" || link.origin !== location.origin) {
      return;
    }
    if (link.pathname === location.pathname && link.search === location.search) {
      return;
    }
    try {
      sessionStorage.setItem(routeFlagKey, "1");
    } catch (error) {
      // Storage unavailable: the next page falls back to the referrer check.
    }
  });

  const fadeIn = () => {
    const mask = document.createElement("div");
    mask.className = "loading-route-mask";
    mask.setAttribute("aria-hidden", "true");
    document.body.prepend(mask);
    const removeMask = () => mask.remove();
    mask.addEventListener("animationend", removeMask, { once: true });
    window.setTimeout(removeMask, routeFadeInMs + 200);
  };

  const whenBodyExists = (callback) => {
    if (document.body) {
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    }
  };

  // Runs before first paint (this script is loaded from <head>), so the view
  // transition captures the page in its revealed state.
  const mountDirect = () => {
    root.classList.remove("is-loading");
    root.classList.add("is-ready", "is-revealed");
    window.finishLoadingScreen = () => {};

    if (!supportsCrossDocumentTransitions && !prefersReducedMotion) {
      whenBodyExists(fadeIn);
    }
  };

  const mount = () => {
    if (!root.classList.contains("is-loading") || document.querySelector(".loading-particle")) {
      return;
    }

    let released = false;
    let removeTimer = 0;
    const loader = createLoader();

    const finish = () => {
      observer.disconnect();
      root.classList.remove("is-loading");
      root.classList.add("is-ready", "is-revealed");
      loader.remove();
      window.clearTimeout(removeTimer);
    };

    const releaseLoader = () => {
      if (released) {
        return;
      }

      released = true;
      loader.classList.add("is-exiting");
      removeTimer = window.setTimeout(finish, settleDurationMs + fadeDurationMs + 120);
    };

    window.finishLoadingScreen = () => {
      releaseLoader();
    };

    const observer = new MutationObserver(() => {
      if (!root.classList.contains("is-loading")) {
        releaseLoader();
      }
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    if (!root.classList.contains("is-loading")) {
      releaseLoader();
    }
  };

  if (useDirectTransition) {
    mountDirect();
  } else {
    whenBodyExists(mount);
  }
})();
