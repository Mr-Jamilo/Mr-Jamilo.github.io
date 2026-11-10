(() => {
  const items = document.querySelectorAll("[data-reveal]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    let index = 0;
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.setProperty("--reveal-delay", `${index * 90}ms`);
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
      index += 1;
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  items.forEach((el) => observer.observe(el));
})();
