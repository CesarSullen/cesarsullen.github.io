(() => {
  if (!("IntersectionObserver" in window)) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const TARGETS = [
    ".sec-head",
    ".page .intro",
    ".note",
    ".services .card",
    ".skill-grid li",
    ".carousel",
    ".dots",
    ".polaroid",
    ".journey h3",
    ".journey li",
    ".cta-body small",
    ".cta-body h2",
    ".cta-body p",
    ".cta-body .cbtn",
    ".tiles li",
    ".works li",
    ".donation-card",
    ".platform-card",
  ];

  const STAGGER_MS = 80;
  const MAX_STEPS = 5;

  const root = document.documentElement;
  const pending = [
    ...new Set(document.querySelectorAll(TARGETS.join(","))),
  ].filter((el) => {
    const r = el.getBoundingClientRect();
    const visibleAtLoad = r.bottom > 0 && r.top < innerHeight * 0.92;
    const alreadyPassed = r.bottom <= 0;
    return !visibleAtLoad && !alreadyPassed;
  });
  if (!pending.length) return;

  const done = (el) => {
    el.removeAttribute("data-reveal");
    el.classList.remove("is-revealed");
    el.style.removeProperty("--rd");
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const entering = entries
        .filter((e) => e.isIntersecting)
        .sort(
          (a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top ||
            a.boundingClientRect.left - b.boundingClientRect.left,
        );
      entering.forEach((e, i) => {
        const el = e.target;
        observer.unobserve(el);
        el.style.setProperty(
          "--rd",
          `${Math.min(i, MAX_STEPS) * STAGGER_MS}ms`,
        );
        el.classList.add("is-revealed");
        el.addEventListener("animationend", () => done(el), { once: true });
        setTimeout(() => done(el), 2200);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0 },
  );

  pending.forEach((el) => {
    el.setAttribute("data-reveal", "");
    observer.observe(el);
  });
  root.classList.add("reveal-ready");
})();
