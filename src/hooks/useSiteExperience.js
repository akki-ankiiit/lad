import { useEffect } from "react";
import { createSiteExperience } from "../animations/referenceEngine";

let hasInitialized = false;

/** Scroll to an in-page section (About, Services, Our Works) through Lenis when active. */
export function scrollToHash(hash) {
  const target = hash && document.getElementById(hash.slice(1));
  if (!target) return;
  if (window.__lenis) window.__lenis.scrollTo(target, { duration: 1.6 });
  else target.scrollIntoView({ behavior: "smooth" });
}

/** Mount the original choreography only after React and the display fonts are ready. */
export function useSiteExperience(root) {
  useEffect(() => {
    let cancelled = false;
    let dispose;
    let timeout;
    let frame;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) root.current?.classList.add("reduce-motion");

    const ready = Promise.race([
      document.fonts.ready,
      new Promise((resolve) => {
        timeout = window.setTimeout(resolve, 3500);
      }),
    ]);

    ready.then(() => {
      if (cancelled) return;
      frame = requestAnimationFrame(() => {
        if (cancelled) return;
        const firstLoad = !hasInitialized;
        dispose = createSiteExperience({ initialLoad: firstLoad });
        hasInitialized = true;
        root.current?.setAttribute("data-experience-ready", "");
        if (window.location.hash) {
          // Wait until the intro has released the scroll lock, then glide to the section.
          const started = Date.now();
          const tryScroll = () => {
            const locked =
              document.documentElement.style.overflow === "hidden" ||
              window.__lenis?.isStopped;
            if (!locked && Date.now() - started > (firstLoad ? 1200 : 400))
              scrollToHash(window.location.hash);
            else if (Date.now() - started < 10000)
              timeout = window.setTimeout(tryScroll, 250);
          };
          timeout = window.setTimeout(tryScroll, 250);
        }
      });
    });

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
      dispose?.();
    };
  }, [root]);
}
